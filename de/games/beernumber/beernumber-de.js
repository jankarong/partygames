document.addEventListener('DOMContentLoaded', () => {
    // Game elements
    const guessInput = document.getElementById('guessInput');
    const submitGuess = document.getElementById('submitGuess');
    const message = document.getElementById('message');
    const history = document.getElementById('history');
    const beerFill = document.getElementById('beer-fill');
    const beerMug = document.querySelector('.beer-mug');
    const beerMouth = document.querySelector('.beer-mouth');
    const beerEyes = document.querySelectorAll('.beer-eye');

    // Game variables
    let targetNumber;
    let guesses = [];
    let isGameOver = false;
    let maxFillHeight = 100; // Maximum fill percentage
    let lastGuess = null;

    // Initialize the game
    function initGame() {
        // Generate a random number between 1 and 100
        targetNumber = Math.floor(Math.random() * 100) + 1;

        // Reset game state
        guesses = [];
        isGameOver = false;
        lastGuess = null;

        // Reset UI elements
        message.textContent = '';
        message.className = 'alert d-none';
        beerFill.style.height = '0%';

        // Reset beer face
        updateBeerFace('neutral');

        // Update history display
        updateHistory();

        // Focus on input field
        guessInput.value = '';
        guessInput.focus();

        console.log('Neues Spiel gestartet. Zielzahl:', targetNumber);
    }

    // Update the guess history display
    function updateHistory() {
        if (guesses.length === 0) {
            history.innerHTML = '';
            return;
        }

        history.innerHTML = `
            <div class="guess-history-title">Anzahl der Versuche: ${guesses.length}</div>
            <div class="history-list">
                ${guesses.map(num => `<span class="history-item">${num}</span>`).join('')}
            </div>
        `;
    }

    // Update the beer mug face expression
    function updateBeerFace(expression) {
        // Reset all expressions
        beerMug.classList.remove('happy', 'sad', 'excited', 'thinking');

        // Set the new expression
        switch (expression) {
            case 'happy':
                beerMouth.style.borderRadius = '0 0 15px 15px';
                beerMouth.style.height = '15px';
                beerMouth.style.borderTop = 'none';
                beerMouth.style.borderBottom = '3px solid #1a2b47';
                break;
            case 'sad':
                beerMouth.style.borderRadius = '15px 15px 0 0';
                beerMouth.style.height = '15px';
                beerMouth.style.borderTop = '3px solid #1a2b47';
                beerMouth.style.borderBottom = 'none';
                break;
            case 'excited':
                beerMouth.style.borderRadius = '50%';
                beerMouth.style.height = '20px';
                beerMouth.style.width = '20px';
                beerMouth.style.borderTop = '3px solid #1a2b47';
                beerMouth.style.borderBottom = '3px solid #1a2b47';
                beerMouth.style.borderLeft = '3px solid #1a2b47';
                beerMouth.style.borderRight = '3px solid #1a2b47';
                break;
            case 'thinking':
                beerMouth.style.borderRadius = '0';
                beerMouth.style.height = '3px';
                beerMouth.style.width = '20px';
                beerMouth.style.borderTop = 'none';
                beerMouth.style.borderBottom = '3px solid #1a2b47';
                break;
            default: // neutral
                beerMouth.style.borderRadius = '0 0 15px 15px';
                beerMouth.style.height = '15px';
                beerMouth.style.width = '30px';
                beerMouth.style.borderTop = 'none';
                beerMouth.style.borderBottom = '3px solid #1a2b47';
        }
    }

    // Update the beer mug fill height
    function updateBeerFill() {
        const fillPercentage = Math.min(100, (guesses.length / 10) * 100); // Fills at 10 guesses
        beerFill.style.height = fillPercentage + '%';
    }

    // Submit guess button event
    submitGuess.addEventListener('click', checkGuess);
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkGuess();
    });

    function checkGuess() {
        const guess = parseInt(guessInput.value);

        // Validation
        if (isNaN(guess) || guess < 1 || guess > 100) {
            message.textContent = 'Bitte geben Sie eine Zahl zwischen 1 und 100 ein!';
            message.className = 'alert alert-warning';
            guessInput.value = '';
            guessInput.focus();
            return;
        }

        // Check if already guessed
        if (guesses.includes(guess)) {
            message.textContent = 'Du hast diese Zahl bereits geraten!';
            message.className = 'alert alert-info';
            guessInput.value = '';
            guessInput.focus();
            return;
        }

        // Add guess to array
        guesses.push(guess);
        lastGuess = guess;

        // Update beer fill
        updateBeerFill();

        // Check the guess
        if (guess === targetNumber) {
            // Won
            message.textContent = `🎉 Richtig! Die Zahl war ${targetNumber}! Du hast es in ${guesses.length} Versuchen geschafft!`;
            message.className = 'alert alert-success';
            updateBeerFace('happy');
            submitGuess.disabled = true;
            guessInput.disabled = true;
            isGameOver = true;
        } else if (guess < targetNumber) {
            message.textContent = '📈 Höher!';
            message.className = 'alert alert-info';
            updateBeerFace('thinking');
        } else {
            message.textContent = '📉 Tiefer!';
            message.className = 'alert alert-info';
            updateBeerFace('thinking');
        }

        // Update history
        updateHistory();

        // Clear input
        guessInput.value = '';
        guessInput.focus();
    }

    // Create reset button
    function createResetButton() {
        const resetDiv = document.createElement('div');
        resetDiv.className = 'text-center mt-3';
        resetDiv.innerHTML = `<button id="resetGame" class="btn btn-primary">Neues Spiel starten</button>`;

        const container = document.querySelector('.game-section');
        container.appendChild(resetDiv);

        document.getElementById('resetGame').addEventListener('click', () => {
            // Reset button state
            submitGuess.disabled = false;
            guessInput.disabled = false;

            // Restart game
            initGame();
        });
    }

    // Initialize the game on page load
    initGame();
    createResetButton();
});
