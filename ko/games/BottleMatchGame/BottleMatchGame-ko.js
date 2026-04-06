// Korean Localization for Bottle Match Game
const TRANSLATIONS = {
    colors: {
        red: '빨강',
        blue: '파랑',
        green: '초록',
        yellow: '노랑',
        purple: '보라',
        orange: '주황',
        brown: '갈색',
        pink: '분홍'
    },
    ui: {
        level: '스테이지',
        length: '길이',
        colorCount: '색상 수',
        attempts: '도전 횟수',
        secretSequence: '정답 순서',
        dragInstruction: '병을 클릭하여 선택하거나 드래그하여 배치하세요:',
        clickInstruction: '색상을 클릭하여 채워주세요:',
        submitBtn: '예상 제출',
        clearBtn: '지우기',
        showSecretBtn: '정답 보기',
        previousGuesses: '이전 기록:',
        congratulations: '🎉 모든 스테이지 클리어!',
        result: '결과',
        totalTime: '총 소요 시간:',
        totalAttempts: '총 도전 횟수:',
        avgAttempts: '스테이지당 평균:',
        seconds: '초',
        playAgain: '다시 하기',
        howToPlay: '게임 방법',
        rules: '기본 규칙',
        steps: '진행 방법',
        features: '특징',
        tips: '팁'
    },
    messages: {
        completeGuess: '모든 병을 색상으로 채워주세요.',
        levelComplete: '스테이지 클리어!',
        feedbackTitle: '판정 결과',
        correctPosColor: '위치와 색상 모두 일치:',
        correctColorWrongPos: '색상만 일치:',
        keepGuessing: '정답에 가까워지고 있습니다. 조금만 더!',
        nextLevel: '다음 스테이지',
        continue: '계속하기'
    }
};

const COLOR_NAMES = {
    red: TRANSLATIONS.colors.red,
    blue: TRANSLATIONS.colors.blue,
    green: TRANSLATIONS.colors.green,
    yellow: TRANSLATIONS.colors.yellow,
    purple: TRANSLATIONS.colors.purple,
    orange: TRANSLATIONS.colors.orange,
    brown: TRANSLATIONS.colors.brown,
    pink: TRANSLATIONS.colors.pink
};

// Game Configuration
const LEVELS = [
    { level: 1, length: 3, colors: ['red', 'blue', 'green', 'yellow'] },
    { level: 2, length: 4, colors: ['red', 'blue', 'green', 'yellow'] },
    { level: 3, length: 4, colors: ['red', 'blue', 'green', 'yellow', 'purple', 'orange'] },
    { level: 4, length: 5, colors: ['red', 'blue', 'green', 'yellow', 'purple', 'orange'] },
    { level: 5, length: 5, colors: ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'brown', 'pink'] }
];

// Game State
let currentLevelIdx = 0;
let secretSequence = [];
let currentGuess = [];
let guessHistory = [];
let gameStartTime = 0;
let levelStartTime = 0;
let totalAttempts = 0;
let selectedBottleIndex = -1;
let previouslyUsedSequences = [];

// Sound Functions
function playPlaceSound() {
    const sound = document.getElementById('place-sound');
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log('Sound play failed:', e));
    }
}

function playSuccessSound() {
    const sound = document.getElementById('success-sound');
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log('Sound play failed:', e));
    }
}

function playFailSound() {
    const sound = document.getElementById('fail-sound');
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log('Sound play failed:', e));
    }
}

// Utility Functions
function isSequenceUsed(sequence) {
    const seqStr = sequence.join(',');
    return previouslyUsedSequences.includes(seqStr);
}

function addToUsedSequences(sequence) {
    const seqStr = sequence.join(',');
    if (!previouslyUsedSequences.includes(seqStr)) {
        previouslyUsedSequences.push(seqStr);
    }
}

function generateUniqueSequence(length, colors) {
    let sequence;
    let attempts = 0;
    const maxAttempts = 1000;

    do {
        sequence = [];
        const availableColors = [...colors];
        for (let i = 0; i < length; i++) {
            if (availableColors.length === 0) break;
            const randomIndex = Math.floor(Math.random() * availableColors.length);
            sequence.push(availableColors[randomIndex]);
            availableColors.splice(randomIndex, 1);
        }
        attempts++;
    } while ((sequence.length !== length || isSequenceUsed(sequence)) && attempts < maxAttempts);

    addToUsedSequences(sequence);
    return sequence;
}

function getFeedback(guess, secret) {
    let blackPegs = 0;
    let whitePegs = 0;
    const secretCopy = [...secret];
    const guessCopy = [...guess];

    for (let i = guessCopy.length - 1; i >= 0; i--) {
        if (guessCopy[i] === secretCopy[i]) {
            blackPegs++;
            secretCopy.splice(i, 1);
            guessCopy.splice(i, 1);
        }
    }

    for (let i = 0; i < guessCopy.length; i++) {
        const index = secretCopy.indexOf(guessCopy[i]);
        if (index !== -1) {
            whitePegs++;
            secretCopy.splice(index, 1);
        }
    }
    return { black: blackPegs, white: whitePegs };
}

// UI Functions
function updateLevelInfo() {
    const config = LEVELS[currentLevelIdx];
    const levelEl = document.getElementById('current-level');
    const lengthEl = document.getElementById('sequence-length');
    const colorEl = document.getElementById('color-count');
    const attemptsEl = document.getElementById('attempts');

    if (levelEl) levelEl.textContent = config.level;
    if (lengthEl) lengthEl.textContent = config.length;
    if (colorEl) colorEl.textContent = config.colors.length;
    if (attemptsEl) attemptsEl.textContent = guessHistory.length;
}

function createBottleElement(color, index = -1, isGuess = false) {
    const bottle = document.createElement('div');
    bottle.className = `bottle ${color} rounded-4 shadow-sm d-flex align-items-center justify-content-center text-white fw-bold`;
    bottle.textContent = COLOR_NAMES[color] || '';
    if (!isGuess && index !== -1) bottle.onclick = () => selectColor(color);
    return bottle;
}

function renderCurrentGuess() {
    const container = document.getElementById('current-guess');
    if (!container) return;
    container.innerHTML = '';
    const config = LEVELS[currentLevelIdx];

    const guessBottlesContainer = document.createElement('div');
    guessBottlesContainer.className = 'd-flex justify-content-center gap-2 mb-4';

    for (let i = 0; i < config.length; i++) {
        const bottle = document.createElement('div');
        const color = currentGuess[i];
        bottle.className = `bottle ${color || ''} rounded-4 shadow-sm d-flex align-items-center justify-content-center fw-bold cursor-pointer`;
        if (selectedBottleIndex === i) bottle.classList.add('border', 'border-primary', 'border-4');
        
        bottle.style.width = '60px';
        bottle.style.height = '100px';
        bottle.style.backgroundColor = color ? '' : '#f8f9fa';
        bottle.style.border = color ? 'none' : '2px dashed #dee2e6';
        bottle.style.color = color ? 'white' : '#adb5bd';
        
        bottle.textContent = color ? COLOR_NAMES[color] : (i + 1);
        
        bottle.onclick = () => selectPosition(i);
        
        // Drag and drop for mobile/desktop
        bottle.draggable = !!color;
        bottle.ondragstart = (e) => {
            e.dataTransfer.setData('text/plain', i);
            bottle.classList.add('opacity-50');
        };
        bottle.ondragend = () => bottle.classList.remove('opacity-50');
        bottle.ondragover = (e) => e.preventDefault();
        bottle.ondrop = (e) => {
            e.preventDefault();
            const fromIdx = e.dataTransfer.getData('text/plain');
            if (fromIdx !== "" && fromIdx != i) {
                const temp = currentGuess[fromIdx];
                currentGuess[fromIdx] = currentGuess[i];
                currentGuess[i] = temp;
                renderCurrentGuess();
            }
        };

        guessBottlesContainer.appendChild(bottle);
    }
    container.appendChild(guessBottlesContainer);

    // Color Palette
    const paletteTitle = document.createElement('p');
    paletteTitle.className = 'text-muted small mb-2';
    paletteTitle.textContent = TRANSLATIONS.ui.clickInstruction;
    container.appendChild(paletteTitle);

    const paletteContainer = document.createElement('div');
    paletteContainer.className = 'd-flex justify-content-center flex-wrap gap-2';
    
    config.colors.forEach(color => {
        const btn = document.createElement('button');
        btn.className = `btn ${color} rounded-circle shadow-sm border-0`;
        btn.style.width = '45px';
        btn.style.height = '45px';
        btn.onclick = () => selectColor(color);
        paletteContainer.appendChild(btn);
    });
    container.appendChild(paletteContainer);
}

function selectPosition(index) {
    selectedBottleIndex = (selectedBottleIndex === index) ? -1 : index;
    renderCurrentGuess();
}

function selectColor(color) {
    let targetIdx = selectedBottleIndex;
    if (targetIdx === -1) {
        // Find first empty
        targetIdx = currentGuess.findIndex(c => !c);
        if (targetIdx === -1) targetIdx = 0; // Replace first if all full
    }
    
    currentGuess[targetIdx] = color;
    playPlaceSound();
    selectedBottleIndex = -1;
    renderCurrentGuess();
    updateSubmitButton();
}

function updateSubmitButton() {
    const btn = document.getElementById('submit-guess');
    if (!btn) return;
    const config = LEVELS[currentLevelIdx];
    const isFull = currentGuess.length === config.length && currentGuess.every(c => c);
    btn.disabled = !isFull;
}

function renderGuessHistory() {
    const container = document.getElementById('guess-history');
    if (!container) return;
    container.innerHTML = '';
    
    guessHistory.slice().reverse().forEach((entry) => {
        const row = document.createElement('div');
        row.className = 'd-flex align-items-center justify-content-between mb-2 p-2 bg-light rounded-3';
        
        const guessBox = document.createElement('div');
        guessBox.className = 'd-flex gap-1';
        entry.guess.forEach(color => {
            const dot = document.createElement('div');
            dot.className = `rounded-circle ${color}`;
            dot.style.width = '20px';
            dot.style.height = '20px';
            guessBox.appendChild(dot);
        });
        
        const feedbackBox = document.createElement('div');
        feedbackBox.className = 'd-flex gap-1';
        for (let i = 0; i < entry.feedback.black; i++) {
            const peg = document.createElement('div');
            peg.className = 'rounded-circle bg-dark';
            peg.style.width = '12px';
            peg.style.height = '12px';
            feedbackBox.appendChild(peg);
        }
        for (let i = 0; i < entry.feedback.white; i++) {
            const peg = document.createElement('div');
            peg.className = 'rounded-circle border bg-white';
            peg.style.width = '12px';
            peg.style.height = '12px';
            feedbackBox.appendChild(peg);
        }
        
        row.appendChild(guessBox);
        row.appendChild(feedbackBox);
        container.appendChild(row);
    });
}

function showFeedbackPopup(feedback, isCorrect = false) {
    if (isCorrect) playSuccessSound(); else playFailSound();
    
    const levelTime = Math.floor((Date.now() - levelStartTime) / 1000);
    const title = isCorrect ? TRANSLATIONS.messages.levelComplete : TRANSLATIONS.messages.feedbackTitle;
    
    const overlay = document.createElement('div');
    overlay.className = 'position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center';
    overlay.style.zIndex = '2000';
    
    const modal = document.createElement('div');
    modal.className = 'bg-white rounded-4 p-4 shadow-lg text-center mx-3';
    modal.style.maxWidth = '300px';
    
    modal.innerHTML = `
        <h3 class="fw-bold mb-3 ${isCorrect ? 'text-success' : ''}">${title}</h3>
        <div class="mb-4">
            <div class="d-flex justify-content-between mb-2">
                <span class="small text-muted">${TRANSLATIONS.messages.correctPosColor}</span>
                <span class="fw-bold">⚫ ${feedback.black}</span>
            </div>
            <div class="d-flex justify-content-between">
                <span class="small text-muted">${TRANSLATIONS.messages.correctColorWrongPos}</span>
                <span class="fw-bold">⚪ ${feedback.white}</span>
            </div>
        </div>
        ${isCorrect ? `<p class="small text-muted mb-3">${levelTime}${TRANSLATIONS.ui.seconds} 만에 클리어!</p>` : ''}
        <button class="btn btn-primary w-100 rounded-pill fw-bold" id="close-popup-btn">
            ${isCorrect ? TRANSLATIONS.messages.nextLevel : TRANSLATIONS.messages.continue}
        </button>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    const closeBtn = modal.querySelector('#close-popup-btn');
    closeBtn.onclick = () => {
        document.body.removeChild(overlay);
        if (isCorrect) nextLevel();
    };
}

function startLevel() {
    const config = LEVELS[currentLevelIdx];
    secretSequence = generateUniqueSequence(config.length, config.colors);
    currentGuess = new Array(config.length).fill(null);
    guessHistory = [];
    selectedBottleIndex = -1;
    levelStartTime = Date.now();
    
    updateLevelInfo();
    renderCurrentGuess();
    renderGuessHistory();
    updateSubmitButton();
    
    const secretEl = document.getElementById('secret-display');
    if (secretEl) secretEl.style.display = 'none';
}

function submitGuess() {
    const config = LEVELS[currentLevelIdx];
    const feedback = getFeedback(currentGuess, secretSequence);
    guessHistory.push({ guess: [...currentGuess], feedback: feedback });
    totalAttempts++;
    
    updateLevelInfo();
    renderGuessHistory();
    
    const isCorrect = feedback.black === config.length;
    showFeedbackPopup(feedback, isCorrect);
    
    if (!isCorrect) {
        selectedBottleIndex = -1;
        renderCurrentGuess();
        updateSubmitButton();
    }
}

function nextLevel() {
    currentLevelIdx++;
    if (currentLevelIdx >= LEVELS.length) {
        showCompletionScreen();
    } else {
        startLevel();
    }
}

function showCompletionScreen() {
    const totalTime = Math.floor((Date.now() - gameStartTime) / 1000);
    const avgAttempts = (totalAttempts / LEVELS.length).toFixed(1);
    
    const timeEl = document.getElementById('total-time');
    const attemptsEl = document.getElementById('total-attempts');
    const avgEl = document.getElementById('avg-attempts');
    
    if (timeEl) timeEl.textContent = totalTime;
    if (attemptsEl) attemptsEl.textContent = totalAttempts;
    if (avgEl) avgEl.textContent = avgAttempts;
    
    const gameArea = document.getElementById('game-area');
    const levelInfo = document.querySelector('.level-info');
    const completionScreen = document.getElementById('completion-screen');
    
    if (gameArea) gameArea.style.display = 'none';
    if (levelInfo) levelInfo.style.display = 'none';
    if (completionScreen) completionScreen.style.display = 'block';
}

function clearGuess() {
    const config = LEVELS[currentLevelIdx];
    currentGuess = new Array(config.length).fill(null);
    selectedBottleIndex = -1;
    renderCurrentGuess();
    updateSubmitButton();
}

function showSecret() {
    const secretText = secretSequence.map(color => COLOR_NAMES[color]).join(' - ');
    const secretSeqEl = document.getElementById('secret-sequence');
    const secretDisplayEl = document.getElementById('secret-display');
    
    if (secretSeqEl) secretSeqEl.textContent = secretText;
    if (secretDisplayEl) secretDisplayEl.style.display = 'block';
}

function restartGame() {
    currentLevelIdx = 0;
    totalAttempts = 0;
    gameStartTime = Date.now();
    
    const gameArea = document.getElementById('game-area');
    const levelInfo = document.querySelector('.level-info');
    const completionScreen = document.getElementById('completion-screen');
    
    if (gameArea) gameArea.style.display = 'block';
    if (levelInfo) levelInfo.style.display = 'block';
    if (completionScreen) completionScreen.style.display = 'none';
    
    startLevel();
}

// Global exposure
window.submitGuess = submitGuess;
window.clearGuess = clearGuess;
window.showSecret = showSecret;
window.restartGame = restartGame;

window.onload = () => {
    gameStartTime = Date.now();
    startLevel();
};
