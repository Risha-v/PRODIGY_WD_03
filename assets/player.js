
const cells = [];
const status = document.getElementById('status');
const gameBoard = document.getElementById('game-board');
const resetBtn = document.getElementById('reset-btn');
const backBtn = document.getElementById('back-btn');
let currentPlayer = 'X';
let gameActive = true;


for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', cellClicked);
    cells.push(cell);
    gameBoard.appendChild(cell);
}

function cellClicked(e) {
    if (gameActive && e.target.textContent === '') {
        e.target.textContent = currentPlayer;
        checkWin();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (cells[a].textContent === currentPlayer &&
            cells[b].textContent === currentPlayer &&
            cells[c].textContent === currentPlayer) {
            status.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
    }

    if (cells.every(cell => cell.textContent !== '')) {
        status.textContent = "It's a tie!";
        gameActive = false;
    }
}

resetBtn.addEventListener('click', resetGame);

function resetGame() {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
    status.textContent = '';
}

backBtn.addEventListener('click', () => {
    window.location.href = '../index.html'; 
});