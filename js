const board = document.getElementById('board');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let gameActive = true;
let cells = ['', '', '', '', '', '', '', '', ''];

function renderBoard() {
  board.innerHTML = '';
  cells.forEach((cell, index) => {
    const cellBtn = document.createElement('button');
    cellBtn.classList.add('cell');
    cellBtn.textContent = cell;
    cellBtn.addEventListener('click', () => makeMove(index));
    board.appendChild(cellBtn);
  });
}

function makeMove(index) {
  if (!gameActive || cells[index]) return;
  cells[index] = currentPlayer;
  renderBoard();
  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
    gameActive = false;
  } else if (!cells.includes('')) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return wins.some(combo => 
    cells[combo[0]] &&
    cells[combo[0]] === cells[combo[1]] &&
    cells[combo[0]] === cells[combo[2]]
  );
}

function restartGame() {
  cells = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

renderBoard();
