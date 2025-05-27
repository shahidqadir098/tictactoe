const board = document.getElementById("gameBoard");
const statusText = document.getElementById("status");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popupMessage");

let cells = Array(9).fill(null);
let currentPlayer = "X";
let isGameActive = true;

function createBoard() {
  board.innerHTML = '';
  cells.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", index);
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  });
  updateStatus();
}

function handleCellClick(event) {
  const index = event.target.getAttribute("data-index");
  if (!isGameActive || cells[index]) return;

  cells[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWin()) {
    showPopup(`🎉 Congratulations! Player ${currentPlayer} wins!`);
    isGameActive = false;
  } else if (cells.every(cell => cell)) {
    showPopup("🤝 It's a draw!");
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
  }
}

function checkWin() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function updateStatus() {
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
  cells.fill(null);
  currentPlayer = "X";
  isGameActive = true;
  createBoard();
  popup.style.display = "none";
}

function showPopup(message) {
  popupMessage.textContent = message;
  popup.style.display = "block";
}

function closePopup() {
  restartGame(); // Also hides popup and restarts the game
}

createBoard();
