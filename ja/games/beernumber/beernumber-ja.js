document.addEventListener('DOMContentLoaded', () => {
    const guessInput = document.getElementById('guessInput');
    const submitGuess = document.getElementById('submitGuess');
    const message = document.getElementById('message');
    const history = document.getElementById('history');
    const beerFill = document.getElementById('beer-fill');
    const beerMug = document.querySelector('.beer-mug');
    const beerMouth = document.querySelector('.beer-mouth');
    const beerEyes = document.querySelectorAll('.beer-eye');

    let targetNumber;
    let guesses = [];
    let isGameOver = false;
    let lastGuess = null;

    function initGame() {
        targetNumber = Math.floor(Math.random() * 100) + 1;
        guesses = [];
        isGameOver = false;
        lastGuess = null;
        message.textContent = '';
        message.className = 'alert d-none';
        beerFill.style.height = '0%';
        updateBeerFace('neutral');
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
            <div class="guess-history-title">挑戦回数: ${guesses.length}</div>
            <div class="history-list">
                ${guesses.map(num => `<span class="history-item">${num}</span>`).join('')}
            </div>
        `;
    }

    function updateBeerFace(expression) {
        beerMug.classList.remove('happy', 'sad', 'excited', 'thinking');
        if (expression === 'sad') {
            beerMouth.style.borderRadius = '15px 15px 0 0';
            beerMouth.style.height = '15px';
            beerMouth.style.borderTop = '3px solid #1a2b47';
            beerMouth.style.borderBottom = 'none';
        } else if (expression === 'excited') {
            beerMouth.style.borderRadius = '50%';
            beerMouth.style.height = '20px';
            beerMouth.style.width = '20px';
            beerMouth.style.border = '3px solid #1a2b47';
        } else {
            beerMouth.style.borderRadius = '0 0 15px 15px';
            beerMouth.style.height = '15px';
            beerMouth.style.width = '30px';
            beerMouth.style.borderTop = 'none';
            beerMouth.style.borderBottom = '3px solid #1a2b47';
            beerMouth.style.borderLeft = 'none';
            beerMouth.style.borderRight = 'none';
        }
    }

    function startBlinking() {
        setInterval(() => {
            if (Math.random() > 0.7) {
                beerEyes.forEach(eye => {
                    eye.style.height = '1px';
                    setTimeout(() => { eye.style.height = '12px'; }, 150);
                });
            }
        }, 3000);
    }

    function updateBeerFill(guess) {
        if (guess === targetNumber) {
            beerFill.style.height = '100%';
            updateBeerFace('excited');
            return;
        }
        const distance = Math.abs(guess - targetNumber);
        let fillPercentage = Math.max(10, Math.max(0, 100 - (distance / 50) * 100));
        beerFill.style.height = `${fillPercentage}%`;
        if (lastGuess !== null) {
            const lastDistance = Math.abs(lastGuess - targetNumber);
            updateBeerFace(distance < lastDistance ? 'happy' : 'sad');
        } else {
            updateBeerFace(fillPercentage > 50 ? 'happy' : 'sad');
        }
        lastGuess = guess;
    }

    function handleGuess() {
        const guess = parseInt(guessInput.value);
        if (isNaN(guess) || guess < 1 || guess > 100) {
            message.textContent = '1から100までの有効な数字を入れてください。';
            message.className = 'alert alert-danger';
            updateBeerFace('sad');
            return;
        }

        guesses.push(guess);
        updateHistory();
        updateBeerFill(guess);

        if (guess === targetNumber) {
            message.textContent = `正解！ 🍻 ${guesses.length}回で ${targetNumber} を当てました！`;
            message.className = 'alert alert-success';
            isGameOver = true;
            beerFill.classList.add('bubbling');
            updateBeerFace('excited');
            setTimeout(() => {
                initGame();
                beerFill.classList.remove('bubbling');
            }, 3000);
        } else if (guess < targetNumber) {
            message.textContent = '低すぎます！ もっと上です。🍺';
            message.className = 'alert alert-warning';
        } else {
            message.textContent = '高すぎます！ もう少し下です。🍺';
            message.className = 'alert alert-warning';
        }
        guessInput.value = '';
        guessInput.focus();
    }

    submitGuess.addEventListener('click', handleGuess);
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleGuess();
    });
    beerMug.addEventListener('mouseover', () => {
        if (!isGameOver) updateBeerFace('thinking');
    });
    beerMug.addEventListener('mouseout', () => {
        if (!isGameOver) updateBeerFace('neutral');
    });

    startBlinking();
    initGame();
});
