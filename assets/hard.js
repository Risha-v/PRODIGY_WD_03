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
  const bestMove = getBestMove();
  gameState[bestMove] = 'O';
  cells[bestMove].textContent = 'O';

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

function getBestMove() {
  let bestScore = -Infinity;
  let bestMove;

  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i] === '') {
      gameState[i] = 'O';
      const score = minimax(gameState, 0, false);
      gameState[i] = '';
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}

function minimax(board, depth, isMaximizing) {
  const result = checkWinner();
  if (result !== null) {
    return result === 'X' ? -10 + depth : 10 - depth;
  }

  if (checkTie()) {
    return 0;
  }

  if (isMaximizing) { 
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = 'O';
        const score = minimax(board, depth + 1, false);
        board[i] = '';
        bestScore = Math.max(bestScore, score);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = 'X';
        const score = minimax(board, depth + 1, true);
        board[i] = '';
        bestScore = Math.min(bestScore, score);
      }
    }
    return bestScore;
  }
}

function checkWinner() {
  for (const combination of winningConditions) {
    const [a, b, c] = combination;
    if (
      gameState[a] !== '' &&
      gameState[a] === gameState[b] &&
      gameState[b] === gameState[c]
    ) {
      return gameState[a];
    }
  }
  return null;
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