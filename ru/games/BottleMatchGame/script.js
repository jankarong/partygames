// Game Configuration
const LEVELS = [
    { level: 1, length: 3, colors: ['red', 'blue', 'green', 'yellow'] },
    { level: 2, length: 4, colors: ['red', 'blue', 'green', 'yellow'] },
    { level: 3, length: 4, colors: ['red', 'blue', 'green', 'yellow', 'purple', 'orange'] },
    { level: 4, length: 5, colors: ['red', 'blue', 'green', 'yellow', 'purple', 'orange'] },
    { level: 5, length: 5, colors: ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'brown', 'pink'] }
];

const COLOR_NAMES = {
    red: 'Red', blue: 'Blue', green: 'Green', yellow: 'Yellow',
    purple: 'Purple', orange: 'Orange', brown: 'Brown', pink: 'Pink'
};

// Game State
let currentLevel = 0;
let secretSequence = [];
let currentGuess = [];
let guessHistory = [];
let gameStartTime = 0;
let levelStartTime = 0;
let totalAttempts = 0;
let selectedBottleIndex = -1;

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

// Anti-duplicate mechanism - global storage for all used sequences
let previouslyUsedSequences = [];

// Utility Functions
function arrayEquals(a, b) {
    return a.length === b.length && a.every((val, i) => val === b[i]);
}

function sequenceToString(sequence) {
    return sequence.join(',');
}

function isSequenceUsed(sequence) {
    const seqStr = sequenceToString(sequence);
    return previouslyUsedSequences.includes(seqStr);
}

function addToUsedSequences(sequence) {
    const seqStr = sequenceToString(sequence);
    if (!previouslyUsedSequences.includes(seqStr)) {
        previouslyUsedSequences.push(seqStr);
    }
}

// Generate unique sequence (anti-duplicate + no repeated colors)
function generateUniqueSequence(length, colors) {
    let sequence;
    let attempts = 0;
    const maxAttempts = 1000; // Prevent infinite loop

    do {
        sequence = [];
        const availableColors = [...colors]; // Copy colors array

        // Ensure no repeated colors in sequence
        for (let i = 0; i < length; i++) {
            if (availableColors.length === 0) {
                // If not enough colors available, restart
                break;
            }
            const randomIndex = Math.floor(Math.random() * availableColors.length);
            const selectedColor = availableColors[randomIndex];
            sequence.push(selectedColor);
            availableColors.splice(randomIndex, 1); // Remove selected color
        }

        attempts++;
    } while ((sequence.length !== length || isSequenceUsed(sequence)) && attempts < maxAttempts);

    if (attempts >= maxAttempts) {
        console.warn('Unable to generate unique sequence, all combinations may have been used');
        // Clear used sequence history and restart
        previouslyUsedSequences = [];
        console.log('Sequence history cleared, regenerating');

        // Retry generation once
        sequence = [];
        const availableColors = [...colors];
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * availableColors.length);
            const selectedColor = availableColors[randomIndex];
            sequence.push(selectedColor);
            availableColors.splice(randomIndex, 1);
        }
    }

    addToUsedSequences(sequence);
    return sequence;
}

// Feedback calculation function (simplified Mastermind)
function getFeedback(guess, secret) {
    let blackPegs = 0; // Correct position and color
    let whitePegs = 0; // Correct color but wrong position

    const secretCopy = [...secret];
    const guessCopy = [...guess];

    // Calculate black pegs (correct position and color)
    for (let i = guessCopy.length - 1; i >= 0; i--) {
        if (guessCopy[i] === secretCopy[i]) {
            blackPegs++;
            secretCopy.splice(i, 1);
            guessCopy.splice(i, 1);
        }
    }

    // Calculate white pegs (correct color but wrong position)
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
    const level = LEVELS[currentLevel];
    document.getElementById('current-level').textContent = level.level;
    document.getElementById('sequence-length').textContent = level.length;
    document.getElementById('color-count').textContent = level.colors.length;
    document.getElementById('attempts').textContent = guessHistory.length;
}

function createBottleElement(color, index = -1, isGuess = false) {
    const bottle = document.createElement('div');
    bottle.className = `bottle ${color}`;
    bottle.textContent = COLOR_NAMES[color];

    if (!isGuess) {
        bottle.onclick = () => selectBottle(index, color);
    }

    return bottle;
}

function renderCurrentGuess() {
    const container = document.getElementById('current-guess');
    container.innerHTML = '';

    const level = LEVELS[currentLevel];

    // Create guess area title
    const guessTitle = document.createElement('h4');
    guessTitle.textContent = 'Drag bottles to swap positions, or click to select:';
    guessTitle.style.marginBottom = '15px';
    container.appendChild(guessTitle);

    // Create guess bottles container
    const guessBottlesContainer = document.createElement('div');
    guessBottlesContainer.className = 'bottles-container';
    guessBottlesContainer.style.marginBottom = '20px';

    for (let i = 0; i < level.length; i++) {
        const bottle = document.createElement('div');
        bottle.className = `bottle ${currentGuess[i] || ''}`;
        bottle.textContent = currentGuess[i] ? COLOR_NAMES[currentGuess[i]] : (i + 1);
        bottle.style.backgroundColor = currentGuess[i] ? '' : '#e2e8f0';
        bottle.style.color = currentGuess[i] ? 'white' : '#4a5568';
        bottle.dataset.index = i;

        if (selectedBottleIndex === i) {
            bottle.classList.add('selected');
        }

        // Add drag functionality
        if (currentGuess[i]) {
            bottle.draggable = true;
            bottle.ondragstart = (e) => handleDragStart(e, i);
            bottle.ondragend = (e) => handleDragEnd(e);
        }

        // Add drop functionality
        bottle.ondragover = (e) => handleDragOver(e);
        bottle.ondrop = (e) => handleDrop(e, i);
        bottle.ondragenter = (e) => handleDragEnter(e);
        bottle.ondragleave = (e) => handleDragLeave(e);

        bottle.onclick = () => selectPosition(i);
        guessBottlesContainer.appendChild(bottle);
    }

    container.appendChild(guessBottlesContainer);

    // Add color selection area
    const colorPalette = document.createElement('div');
    colorPalette.style.marginTop = '20px';
    colorPalette.innerHTML = '<h4>Click a color to select:</h4>';

    const colorsContainer = document.createElement('div');
    colorsContainer.className = 'bottles-container';

    level.colors.forEach(color => {
        const bottle = createBottleElement(color);
        bottle.onclick = () => selectColor(color);

        // Add drag functionality for color palette bottles
        bottle.draggable = true;
        bottle.ondragstart = (e) => handleColorDragStart(e, color);
        bottle.ondragend = (e) => handleDragEnd(e);

        colorsContainer.appendChild(bottle);
    });

    colorPalette.appendChild(colorsContainer);
    container.appendChild(colorPalette);
}

function selectPosition(index) {
    selectedBottleIndex = selectedBottleIndex === index ? -1 : index;
    renderCurrentGuess();
}

function selectColor(color) {
    if (selectedBottleIndex >= 0) {
        currentGuess[selectedBottleIndex] = color;
        playPlaceSound();
        selectedBottleIndex = -1;
        renderCurrentGuess();
        updateSubmitButton();
    }
}

function selectBottle(index, color) {
    if (selectedBottleIndex >= 0 && selectedBottleIndex !== index) {
        // Swap bottle positions
        const temp = currentGuess[selectedBottleIndex];
        currentGuess[selectedBottleIndex] = currentGuess[index];
        currentGuess[index] = temp;
        selectedBottleIndex = -1;
        renderCurrentGuess();
    } else {
        selectedBottleIndex = selectedBottleIndex === index ? -1 : index;
        renderCurrentGuess();
    }
}

// Drag functionality handlers
let dragSourceIndex = -1;
let dragSourceColor = null;

function handleDragStart(e, index) {
    dragSourceIndex = index;
    dragSourceColor = null;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
}

function handleColorDragStart(e, color) {
    dragSourceIndex = -1;
    dragSourceColor = color;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    dragSourceIndex = -1;
    dragSourceColor = null;
    // Clear all drag styles
    document.querySelectorAll('.bottle').forEach(bottle => {
        bottle.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = dragSourceColor !== null ? 'copy' : 'move';
    return false;
}

function handleDragEnter(e) {
    e.target.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.target.classList.remove('drag-over');
}

function handleDrop(e, targetIndex) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    e.target.classList.remove('drag-over');

    // If dragging from color palette
    if (dragSourceColor !== null) {
        currentGuess[targetIndex] = dragSourceColor;
        playPlaceSound();
        renderCurrentGuess();
        updateSubmitButton();
    }
    // If dragging from guess positions
    else if (dragSourceIndex !== -1 && dragSourceIndex !== targetIndex) {
        // Swap bottle positions
        const temp = currentGuess[dragSourceIndex];
        currentGuess[dragSourceIndex] = currentGuess[targetIndex];
        currentGuess[targetIndex] = temp;

        renderCurrentGuess();
        updateSubmitButton();
    }

    return false;
}

function updateSubmitButton() {
    const level = LEVELS[currentLevel];
    const canSubmit = currentGuess.length === level.length &&
                    currentGuess.every(color => color);
    document.getElementById('submit-guess').disabled = !canSubmit;
}

function renderGuessHistory() {
    const container = document.getElementById('guess-history');
    container.innerHTML = '';

    guessHistory.forEach((entry, index) => {
        const row = document.createElement('div');
        row.className = 'guess-row';

        const guessBottles = document.createElement('div');
        guessBottles.className = 'guess-bottles';

        entry.guess.forEach(color => {
            const bottle = createBottleElement(color, -1, true);
            bottle.className = `guess-bottle bottle ${color}`;
            guessBottles.appendChild(bottle);
        });

        const feedback = document.createElement('div');
        feedback.className = 'feedback';

        // Add black pegs
        for (let i = 0; i < entry.feedback.black; i++) {
            const peg = document.createElement('div');
            peg.className = 'peg black';
            feedback.appendChild(peg);
        }

        // Add white pegs
        for (let i = 0; i < entry.feedback.white; i++) {
            const peg = document.createElement('div');
            peg.className = 'peg white';
            feedback.appendChild(peg);
        }

        row.appendChild(guessBottles);
        row.appendChild(feedback);
        container.appendChild(row);
    });
}

// Feedback popup function
function showFeedbackPopup(feedback, isCorrect = false) {
    // Play success or fail sound
    if (isCorrect) {
        playSuccessSound();
    } else {
        playFailSound();
    }

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    overlay.onclick = closeFeedbackPopup;

    // Create popup
    const popup = document.createElement('div');
    popup.className = `feedback-popup ${isCorrect ? 'success-feedback' : ''}`;
    popup.id = 'feedback-popup';

    const title = isCorrect ? '🎉 Congratulations!' : '📊 Guess Feedback';

    // Calculate level time
    const levelTime = Math.floor((Date.now() - levelStartTime) / 1000);

    popup.innerHTML = `
        <h3>${title}</h3>
        <div class="feedback-details">
            <div class="feedback-item">
                <span><span class="feedback-icon">⚫</span>Correct position and color:</span>
                <strong style="color: #2d3748; font-size: 1.3em;">${feedback.black}</strong>
            </div>
            ${isCorrect ? `
            <div style="margin-top: 20px; padding: 15px; background: #f0fff4; border-radius: 8px; border: 2px solid #9ae6b4;">
                <h4 style="color: #38a169; margin-bottom: 10px;">Level ${LEVELS[currentLevel].level} Complete!</h4>
                <div style="display: flex; justify-content: space-between; margin: 8px 0;">
                    <span>🎯 Attempts:</span>
                    <strong style="color: #2d3748;">${guessHistory.length}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 8px 0;">
                    <span>⏱️ Time:</span>
                    <strong style="color: #2d3748;">${levelTime} seconds</strong>
                </div>
            </div>
            ` : `
            <div style="margin-top: 15px; color: #4a5568;">
                <small>Keep guessing, you're getting closer!</small>
            </div>
            `}
        </div>
        <button class="close-btn" onclick="closeFeedbackPopup()">
            ${isCorrect ? 'Дальше Level' : 'Continue'}
        </button>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    // If correct, auto-close and proceed to next level
    if (isCorrect) {
        setTimeout(() => {
            closeFeedbackPopup();
            nextLevel();
        }, 4000); // Extended to 4 seconds to let player see stats
    }
}

function closeFeedbackPopup() {
    const popup = document.getElementById('feedback-popup');
    const overlay = document.querySelector('.popup-overlay');

    if (popup) popup.remove();
    if (overlay) overlay.remove();
}

// Game Logic
function startLevel() {
    const level = LEVELS[currentLevel];
    secretSequence = generateUniqueSequence(level.length, level.colors);
    currentGuess = [];
    guessHistory = [];
    selectedBottleIndex = -1;
    levelStartTime = Date.now();

    updateLevelInfo();
    renderCurrentGuess();
    renderGuessHistory();
    updateSubmitButton();

    document.getElementById('secret-display').style.display = 'none';

    console.log(`Level ${level.level} started, secret sequence:`, secretSequence);
}

function submitGuess() {
    const level = LEVELS[currentLevel];

    if (currentGuess.length !== level.length || !currentGuess.every(color => color)) {
        alert('Please complete your guess sequence!');
        return;
    }

    const feedback = getFeedback(currentGuess, secretSequence);

    guessHistory.push({
        guess: [...currentGuess],
        feedback: feedback
    });

    totalAttempts++;
    updateLevelInfo();
    renderGuessHistory();

    // Check if correct
    const isCorrect = feedback.black === level.length;

    // Show feedback popup
    setTimeout(() => {
        showFeedbackPopup(feedback, isCorrect);
    }, 300);

    if (!isCorrect) {
        // Keep player's guess sequence, don't reset
        selectedBottleIndex = -1;
        renderCurrentGuess();
        updateSubmitButton();
    }
}

function nextLevel() {
    currentLevel++;

    if (currentLevel >= LEVELS.length) {
        showCompletionScreen();
    } else {
        startLevel();
    }
}

function showCompletionScreen() {
    const totalTime = Math.floor((Date.now() - gameStartTime) / 1000);
    const avgAttempts = (totalAttempts / LEVELS.length).toFixed(1);

    document.getElementById('total-time').textContent = totalTime;
    document.getElementById('total-attempts').textContent = totalAttempts;
    document.getElementById('avg-attempts').textContent = avgAttempts;

    document.getElementById('game-area').style.display = 'none';
    document.querySelector('.level-info').style.display = 'none';
    document.getElementById('completion-screen').style.display = 'block';
}

function clearGuess() {
    currentGuess = [];
    selectedBottleIndex = -1;
    renderCurrentGuess();
    updateSubmitButton();
}

function showSecret() {
    const secretText = secretSequence.map(color => COLOR_NAMES[color]).join(' - ');
    document.getElementById('secret-sequence').textContent = secretText;
    document.getElementById('secret-display').style.display = 'block';
}

function restartGame() {
    currentLevel = 0;
    totalAttempts = 0;
    gameStartTime = Date.now();

    // Don't clear previouslyUsedSequences, keep anti-duplicate mechanism

    document.getElementById('game-area').style.display = 'block';
    document.querySelector('.level-info').style.display = 'block';
    document.getElementById('completion-screen').style.display = 'none';

    startLevel();
}

// Initialize Game
function initGame() {
    gameStartTime = Date.now();
    startLevel();
}

// Start game after page loads
window.onload = initGame;
