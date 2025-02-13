document.addEventListener('DOMContentLoaded', () => {
    const guessInput = document.getElementById('guessInput');
    const submitGuess = document.getElementById('submitGuess');
    const message = document.getElementById('message');
    const history = document.getElementById('history');

    let targetNumber;
    let guesses = [];
    let isGameOver = false;

    function initGame() {
        targetNumber = Math.floor(Math.random() * 100) + 1;
        guesses = [];
        isGameOver = false;
        message.textContent = '';
        message.className = 'message';
        updateHistory();
        guessInput.value = '';
        guessInput.focus();
    }

    function updateHistory() {
        if (guesses.length === 0) {
            history.innerHTML = '';
            return;
        }

        history.innerHTML = `
            <div class="guess-history-title">Number of guesses: ${guesses.length}</div>
            <div class="history-list">
                ${guesses.map(num => `<span class="history-item">${num}</span>`).join('')}
            </div>
        `;
    }

    function handleGuess() {
        const guess = parseInt(guessInput.value);
        if (isNaN(guess) || guess < 1 || guess > 100) {
            message.textContent = 'Please enter a valid number between 1 and 100!';
            message.className = 'message hint';
            return;
        }

        guesses.push(guess);
        updateHistory();

        if (guess === targetNumber) {
            message.textContent = `Congratulations! You found the number ${targetNumber} in ${guesses.length} tries!`;
            message.className = 'message correct';
            // 等待1.5秒后自动开始新游戏
            setTimeout(initGame, 1500);
        } else if (guess < targetNumber) {
            message.textContent = 'Too low, try again!';
            message.className = 'message hint';
        } else {
            message.textContent = 'Too high, try again!';
            message.className = 'message hint';
        }

        guessInput.value = '';
        guessInput.focus();
    }

    submitGuess.addEventListener('click', handleGuess);
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleGuess();
    });

    // Initialize the game
    initGame();
});
