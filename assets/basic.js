const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('.status');
const resetButton = document.querySelector('.reset-btn');
const backBtn = document.getElementById('back-btn');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6] 
];

function handleCellClick(e) {
  const clickedCell = e.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (gameState[clickedCellIndex] !== '' || checkWinner()) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  if (checkWinner()) {
    statusDisplay.textContent = `${currentPlayer} wins!`;
    return;
  }

  if (checkTie()) {
    statusDisplay.textContent = 'It\'s a tie!';
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (currentPlayer === 'O') {
    makeComputerMove();
  } else {
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
  }
}

function makeComputerMove() {
  const emptyCells = gameState.reduce((acc, cell, index) => {
    if (cell === '') {
      acc.push(index);
    }
    return acc;
  }, []);

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const computerMove = emptyCells[randomIndex];

  gameState[computerMove] = 'O';
  cells[computerMove].textContent = 'O';

  if (checkWinner()) {
    statusDisplay.textContent = `${currentPlayer} wins!`;
    return;
  }

  if (checkTie()) {
    statusDisplay.textContent = 'It\'s a tie!';
    return;
  }

  currentPlayer = 'X';
  statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
}

function checkWinner() {
  return winningConditions.some(combination => {
    return combination.every(index => gameState[index] === currentPlayer);
  });
}

function checkTie() {
  return gameState.every(cell => cell !== '');
}

function resetGame() {
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

backBtn.addEventListener('click', () => {
  window.location.href = '../index.html'; 
});