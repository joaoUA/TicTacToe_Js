const board = document.getElementById("board");
const faces = [];
const result = document.getElementById("result-container");
const resultText = document.getElementById("result");

const cross = "X";
const circle = "O";
let player = cross;
let plays = 0;

const playing = Symbol("playing");
const endDraw = Symbol("endDraw");
const endCross = Symbol("endCross");
const endCircle = Symbol("endCircle");
let gameState = playing;

//get all faces in the board into the array
for (let i = 0; i < 9; i++) {
	faces.push(document.getElementById(`${i}`));
	faces[i].onclick = () => {
		onFaceClick(faces[i]);
	};
}

//event for when the user clicks on the face
function onFaceClick(face) {
	if (gameState !== playing) return;

	if (isEmptyFace(face)) {
		plays++;
		confirmPlayerInput(face);
		gameState = checkForWinState(face);

		if (gameState === playing) switchPlayer();
		else displayResult();
	}
}

function switchPlayer() {
	player === cross ? (player = circle) : (player = cross);
}
function isEmptyFace(face) {
	return face.innerHTML === "";
}
function confirmPlayerInput(face) {
	face.innerText = player;
	face.classList.add(player === cross ? "cross" : "circle");
}

function checkForWinState(face) {
	let faceId = face.id;
	let cond = face.innerText;
	let win = true;

	//Check for row
	let row = Math.floor(faceId / 3);
	for (let i = row * 3; i < row * 3 + 3; i++) {
		win = isWinCondition(cond, faces[i]);
		if (!win) break;
	}
	if (win) return cond === "X" ? endCross : endCircle;

	//Check for column
	win = true;
	let col = faceId % 3;
	for (let i = col; i < 9; i += 3) {
		win = isWinCondition(cond, faces[i]);
		if (!win) break;
	}
	if (win) return cond === "X" ? endCross : endCircle;

	//Check Diagonal - Top left to Bottom right [0, 4, 8]
	win = true;
	for (let i = 0; i < 9; i += 4) {
		win = isWinCondition(cond, faces[i]);
		if (!win) break;
	}
	if (win) return cond === "X" ? endCross : endCircle;

	//Check Diagonal - Top Right to Bottom left [2, 4, 6]
	win = true;
	for (let i = 2; i < 7; i += 2) {
		win = isWinCondition(cond, faces[i]);
		if (!win) break;
	}
	if (win) return cond === "X" ? endCross : endCircle;

	//Check for draw
	if (plays === 9) return endDraw;

	return playing;
}

function isWinCondition(condition, check) {
	return condition === check.innerText;
}

//Show Result
function displayResult() {
	result.style.display = "block";

	switch (gameState) {
		case endDraw:
			resultText.innerText = "DRAW";
			break;
		case endCross:
		case endCircle:
			resultText.innerText = `${player} WON`;
			break;
		default:
			break;
	}
}

//RESET
const resetBtn = document.getElementById("game-reset-btn");
resetBtn.onclick = () => {
	resetGameState();
};
function resetGameState() {
	plays = 0;
	player = cross;
	gameState = playing;

	faces.forEach((face) => {
		face.innerText = "";
		face.classList = "face";
	});
	result.style.display = "none";
}
