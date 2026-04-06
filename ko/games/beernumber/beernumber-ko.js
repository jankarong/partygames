// Beer Number (Number Guessing) Game Logic - Korean Version
document.addEventListener('DOMContentLoaded', () => {
    const guessInput = document.getElementById('guessInput');
    const submitGuess = document.getElementById('submitGuess');
    const message = document.getElementById('message');
    const history = document.getElementById('history');
    const beerFill = document.getElementById('beer-fill');
    
    // UI elements for animations
    const beerMug = document.querySelector('.beer-mug');
    const beerMouth = document.querySelector('.beer-mouth');
    const beerEyes = document.querySelectorAll('.beer-eye');

    let targetNumber;
    let guesses = [];
    let isGameOver = false;
    let lastGuess = null;

    const TRANSLATIONS = {
        invalid: '1에서 100 사이의 숫자를 올바르게 입력해 주세요.',
        correct: (count, num) => `정답입니다! 🍻 ${count}번 만에 ${num}을(를) 맞히셨네요!`,
        low: '너무 낮습니다! UP! 👆 더 높은 숫자를 불러보세요. 🍺',
        high: '너무 높습니다! DOWN! 👇 더 낮은 숫자를 불러보세요. 🍺',
        historyTitle: '도전 기록:',
        attempts: '회'
    };

    function initGame() {
        targetNumber = Math.floor(Math.random() * 100) + 1;
        guesses = [];
        isGameOver = false;
        lastGuess = null;
        
        if (message) {
            message.textContent = '';
            message.classList.add('d-none');
            message.className = 'alert d-none rounded-4 fw-bold text-center py-3';
        }
        
        if (beerFill) beerFill.style.height = '0%';
        updateBeerFace('neutral');
        updateHistory();
        
        if (guessInput) {
            guessInput.value = '';
            guessInput.focus();
        }
    }

    function updateHistory() {
        if (!history) return;
        if (guesses.length === 0) {
            history.innerHTML = '';
            return;
        }
        const historyList = guesses.slice().reverse().map(num => `<span class="badge bg-light text-dark m-1 p-2 border">${num}</span>`).join('');
        history.innerHTML = `
            <div class="mb-2 fw-bold text-primary small">${TRANSLATIONS.historyTitle} ${guesses.length}${TRANSLATIONS.attempts}</div>
            <div class="d-flex flex-wrap justify-content-center">${historyList}</div>
        `;
    }

    function updateBeerFace(expression) {
        if (!beerMouth) return;
        
        // Simple expression management via styles
        if (expression === 'happy') {
            beerMouth.style.borderRadius = '0 0 15px 15px';
            beerMouth.style.height = '15px';
            beerMouth.style.width = '30px';
            beerMouth.style.borderBottom = '3px solid #333';
        } else if (expression === 'sad') {
            beerMouth.style.borderRadius = '15px 15px 0 0';
            beerMouth.style.height = '10px';
            beerMouth.style.width = '20px';
            beerMouth.style.borderTop = '3px solid #333';
        } else if (expression === 'excited') {
            beerMouth.style.borderRadius = '50%';
            beerMouth.style.height = '20px';
            beerMouth.style.width = '20px';
            beerMouth.style.border = '3px solid #333';
        } else {
            beerMouth.style.borderRadius = '0';
            beerMouth.style.height = '2px';
            beerMouth.style.width = '25px';
            beerMouth.style.borderBottom = '3px solid #333';
        }
    }

    function updateBeerFill(guess) {
        if (!beerFill) return;
        
        if (guess === targetNumber) {
            beerFill.style.height = '100%';
            updateBeerFace('excited');
            return;
        }
        
        const distance = Math.abs(guess - targetNumber);
        const fillPercentage = Math.max(5, 100 - distance);
        beerFill.style.height = `${fillPercentage}%`;
        
        if (lastGuess !== null) {
            const lastDistance = Math.abs(lastGuess - targetNumber);
            updateBeerFace(distance < lastDistance ? 'happy' : 'sad');
        } else {
            updateBeerFace('thinking');
        }
        lastGuess = guess;
    }

    function handleGuess() {
        if (isGameOver) return;
        
        const guess = parseInt(guessInput.value);
        if (isNaN(guess) || guess < 1 || guess > 100) {
            message.textContent = TRANSLATIONS.invalid;
            message.className = 'alert alert-danger rounded-4 fw-bold text-center py-3 show';
            message.classList.remove('d-none');
            updateBeerFace('sad');
            return;
        }

        guesses.push(guess);
        updateHistory();
        updateBeerFill(guess);

        if (guess === targetNumber) {
            message.textContent = TRANSLATIONS.correct(guesses.length, targetNumber);
            message.className = 'alert alert-success rounded-4 fw-bold text-center py-3 show';
            message.classList.remove('d-none');
            isGameOver = true;
            
            // Celebration effect
            setTimeout(() => {
                const restart = confirm("축하합니다! 다시 시작하시겠습니까?");
                if (restart) initGame();
            }, 1000);
            
        } else if (guess < targetNumber) {
            message.textContent = TRANSLATIONS.low;
            message.className = 'alert alert-warning rounded-4 fw-bold text-center py-3 show';
            message.classList.remove('d-none');
        } else {
            message.textContent = TRANSLATIONS.high;
            message.className = 'alert alert-warning rounded-4 fw-bold text-center py-3 show';
            message.classList.remove('d-none');
        }
        
        if (guessInput) {
            guessInput.value = '';
            guessInput.focus();
        }
    }

    if (submitGuess) submitGuess.addEventListener('click', handleGuess);
    if (guessInput) {
        guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleGuess();
        });
    }

    initGame();
});
