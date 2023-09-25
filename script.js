const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.querySelector('button');
const playerSelect = document.getElementById('player-select');

let currentPlayer = 'X';
let gameOver = false;
let botPlayer = 'O';
let againstBot = false;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function initGame() {
    currentPlayer = 'X';
    gameOver = false;
    message.textContent = `Ruch gracza ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = '');
}

initGame();

function makeMove(index) {
    if (gameOver || cells[index].textContent !== '') return;

    cells[index].textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        message.textContent = `Gracz ${currentPlayer} wygrał!`;
        gameOver = true;
    } else if ([...cells].every(cell => cell.textContent !== '')) {
        message.textContent = 'Remis!';
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Ruch gracza ${currentPlayer}`;
        if (againstBot && currentPlayer === botPlayer && !gameOver) {
            setTimeout(makeBotMove, 1000);
        }
    }
}

function checkWin(player) {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent === player && cells[b].textContent === player && cells[c].textContent === player) {
            cells[a].style.color = 'red';
            cells[b].style.color = 'red';
            cells[c].style.color = 'red';
            return true;
        }
    }
    return false;
}

function resetBoard() {
    cells.forEach(cell => cell.textContent = '');
    cells.forEach(cell => cell.style.color = 'black');
    initGame();
}

resetButton.addEventListener('click', resetBoard);

function makeBotMove() {
    if (currentPlayer === botPlayer && !gameOver) {
        let emptyCells = [...cells].filter(cell => cell.textContent === '');
        if (emptyCells.length > 0) {
            let randomIndex = Math.floor(Math.random() * emptyCells.length);
            let cell = emptyCells[randomIndex];
            cell.textContent = botPlayer;
            currentPlayer = 'X';
            if (checkWin(botPlayer)) {
                message.textContent = `Gracz ${botPlayer} wygrał!`;
                gameOver = true;
            } else if ([...cells].every(cell => cell.textContent !== '')) {
                message.textContent = 'Remis!';
                gameOver = true;
            } else {
                message.textContent = `Ruch gracza ${currentPlayer}`;
            }
        }
    }
}

playerSelect.addEventListener('change', () => {
    if (playerSelect.value === 'bot') {
        againstBot = true;
        botPlayer = 'O';
        message.textContent = `Ruch gracza X`;
        initGame();
        makeBotMove();
    } else {
        againstBot = false;
        botPlayer = '';
        initGame();
    }
});