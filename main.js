const board = document.getElementById("board");
const faces = [];

const cross = "X";
const circle = "O";
let player = cross;

//get all faces in the board into the array
for (let i = 0; i < 9; i++) {
	faces.push(document.getElementById(`${i}`));
	faces[i].onclick = () => {
		clickFace(faces[i]);
	};
}

//event for when the user clicks on the face
function clickFace(face) {
	if (isEmptyFace(face)) {
		confirmPlayerInput(face);

		switchPlayer();
	} else {
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
