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

        console.log('Novo jogo iniciado. Número alvo:', targetNumber);
    }

    // Update the guess history display
    function updateHistory() {
        if (guesses.length === 0) {
            history.innerHTML = '';
            return;
        }

        history.innerHTML = `
            <div class="guess-history-title">Número de tentativas: ${guesses.length}</div>
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
                beerMouth.style.borderLeft = 'none';
                beerMouth.style.borderRight = 'none';
        }
    }

    // Make the beer eyes blink occasionally
    function startBlinking() {
        setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance to blink
                beerEyes.forEach(eye => {
                    eye.style.height = '1px';
                    setTimeout(() => {
                        eye.style.height = '12px';
                    }, 150);
                });
            }
        }, 3000);
    }

    // Calculate how full the beer mug should be based on how close the guess is
    function updateBeerFill(guess) {
        // If game is over (correct guess), fill to 100%
        if (guess === targetNumber) {
            beerFill.style.height = '100%';
            updateBeerFace('excited');
            return;
        }

        // Calculate how close the guess is to the target
        const distance = Math.abs(guess - targetNumber);
        const maxDistance = 50; // Maximum reasonable distance

        // Calculate fill percentage (closer = more fill)
        // The formula ensures that being off by maxDistance or more = 0% fill
        // Being off by 0 = 100% fill
        let fillPercentage = Math.max(0, 100 - (distance / maxDistance) * 100);

        // Ensure minimum fill of 10% after first guess
        fillPercentage = Math.max(10, fillPercentage);

        // Apply the fill height
        beerFill.style.height = `${fillPercentage}%`;

        // Update beer face based on how close the guess is
        if (fillPercentage > 80) {
            updateBeerFace('happy');
        } else if (fillPercentage > 50) {
            updateBeerFace('neutral');
        } else {
            updateBeerFace('sad');
        }

        // If this is not the first guess, show thinking face if getting closer
        if (lastGuess !== null) {
            const lastDistance = Math.abs(lastGuess - targetNumber);
            const currentDistance = Math.abs(guess - targetNumber);

            if (currentDistance < lastDistance) {
                // Getting warmer
                updateBeerFace('happy');
            } else {
                // Getting colder
                updateBeerFace('sad');
            }
        }

        // Update last guess
        lastGuess = guess;
    }

    // Handle a guess submission
    function handleGuess() {
        // Get the guess value
        const guess = parseInt(guessInput.value);

        // Validate input
        if (isNaN(guess) || guess < 1 || guess > 100) {
            message.textContent = 'Por favor, insira um número válido entre 1 e 100!';
            message.className = 'alert alert-danger';
            updateBeerFace('sad');
            return;
        }

        // Add to guesses array
        guesses.push(guess);
        updateHistory();

        // Update beer fill based on guess
        updateBeerFill(guess);

        // Check if guess is correct
        if (guess === targetNumber) {
            message.textContent = `Parabéns! 🍻 Você encontrou o número ${targetNumber} em ${guesses.length} tentativas!`;
            message.className = 'alert alert-success';
            isGameOver = true;

            // Add bubbling animation to beer
            beerFill.classList.add('bubbling');

            // Show excited face
            updateBeerFace('excited');

            // Start a new game after 3 seconds
            setTimeout(() => {
                initGame();
                beerFill.classList.remove('bubbling');
            }, 3000);
        }
        // Provide hint if guess is too low
        else if (guess < targetNumber) {
            message.textContent = 'Muito baixo! Sua cerveja precisa de mais preenchimento! 🍺';
            message.className = 'alert alert-warning';
        }
        // Provide hint if guess is too high
        else {
            message.textContent = 'Muito alto! Você está transbordando a caneca! 🍺';
            message.className = 'alert alert-warning';
        }

        // Clear input and focus for next guess
        guessInput.value = '';
        guessInput.focus();
    }

    // Event listeners
    submitGuess.addEventListener('click', handleGuess);

    // Allow Enter key to submit guess
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleGuess();
    });

    // Make beer mug interactive
    beerMug.addEventListener('mouseover', () => {
        if (!isGameOver) {
            updateBeerFace('thinking');
        }
    });

    beerMug.addEventListener('mouseout', () => {
        if (!isGameOver) {
            updateBeerFace('neutral');
        }
    });

    // Start blinking animation
    startBlinking();

    // Initialize the game when page loads
    initGame();
});
