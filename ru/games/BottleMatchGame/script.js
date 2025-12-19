// Конфигурация игры
const LEVELS = [
    { level: 1, length: 3, colors: ['red', 'blue', 'green', 'yellow'] },
    { level: 2, length: 4, colors: ['red', 'blue', 'green', 'yellow'] },
    { level: 3, length: 4, colors: ['red', 'blue', 'green', 'yellow', 'purple', 'orange'] },
    { level: 4, length: 5, colors: ['red', 'blue', 'green', 'yellow', 'purple', 'orange'] },
    { level: 5, length: 5, colors: ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'brown', 'pink'] }
];

const COLOR_NAMES = {
    red: 'Красный', blue: 'Синий', green: 'Зелёный', yellow: 'Жёлтый',
    purple: 'Фиолетовый', orange: 'Оранжевый', brown: 'Коричневый', pink: 'Розовый'
};

// Состояние игры
let currentLevel = 0;
let secretSequence = [];
let currentGuess = [];
let guessHistory = [];
let gameStartTime = 0;
let levelStartTime = 0;
let totalAttempts = 0;
let selectedBottleIndex = -1;

// Звуковые функции
function playPlaceSound() {
    const sound = document.getElementById('place-sound');
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log('Воспроизведение звука не удалось:', e));
    }
}

function playSuccessSound() {
    const sound = document.getElementById('success-sound');
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log('Воспроизведение звука не удалось:', e));
    }
}

function playFailSound() {
    const sound = document.getElementById('fail-sound');
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log('Воспроизведение звука не удалось:', e));
    }
}

// Механизм защиты от дубликатов - глобальное хранилище для всех использованных последовательностей
let previouslyUsedSequences = [];

// Вспомогательные функции
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

// Генерация уникальной последовательности (без дубликатов + без повторяющихся цветов)
function generateUniqueSequence(length, colors) {
    let sequence;
    let attempts = 0;
    const maxAttempts = 1000; // Предотвращение бесконечного цикла

    do {
        sequence = [];
        const availableColors = [...colors]; // Копия массива цветов

        // Гарантировать отсутствие повторяющихся цветов в последовательности
        for (let i = 0; i < length; i++) {
            if (availableColors.length === 0) {
                // Если недостаточно доступных цветов, перезапустить
                break;
            }
            const randomIndex = Math.floor(Math.random() * availableColors.length);
            const selectedColor = availableColors[randomIndex];
            sequence.push(selectedColor);
            availableColors.splice(randomIndex, 1); // Удалить выбранный цвет
        }

        attempts++;
    } while ((sequence.length !== length || isSequenceUsed(sequence)) && attempts < maxAttempts);

    if (attempts >= maxAttempts) {
        console.warn('Невозможно сгенерировать уникальную последовательность, возможно, использованы все комбинации');
        // Очистить историю использованных последовательностей и перезапустить
        previouslyUsedSequences = [];
        console.log('История последовательностей очищена, перегенерация');

        // Повторная попытка генерации
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

// Функция расчета обратной связи (упрощенная Mastermind)
function getFeedback(guess, secret) {
    let blackPegs = 0; // Правильная позиция и цвет
    let whitePegs = 0; // Правильный цвет, но неправильная позиция

    const secretCopy = [...secret];
    const guessCopy = [...guess];

    // Подсчет черных колышков (правильная позиция и цвет)
    for (let i = guessCopy.length - 1; i >= 0; i--) {
        if (guessCopy[i] === secretCopy[i]) {
            blackPegs++;
            secretCopy.splice(i, 1);
            guessCopy.splice(i, 1);
        }
    }

    // Подсчет белых колышков (правильный цвет, но неправильная позиция)
    for (let i = 0; i < guessCopy.length; i++) {
        const index = secretCopy.indexOf(guessCopy[i]);
        if (index !== -1) {
            whitePegs++;
            secretCopy.splice(index, 1);
        }
    }

    return { black: blackPegs, white: whitePegs };
}

// Функции интерфейса
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

    // Создать заголовок области угадывания
    const guessTitle = document.createElement('h4');
    guessTitle.textContent = 'Перетащите бутылки для обмена позиций или нажмите для выбора:';
    guessTitle.style.marginBottom = '15px';
    container.appendChild(guessTitle);

    // Создать контейнер для бутылок угадывания
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

        // Добавить функцию перетаскивания
        if (currentGuess[i]) {
            bottle.draggable = true;
            bottle.ondragstart = (e) => handleDragStart(e, i);
            bottle.ondragend = (e) => handleDragEnd(e);
        }

        // Добавить функцию сброса
        bottle.ondragover = (e) => handleDragOver(e);
        bottle.ondrop = (e) => handleDrop(e, i);
        bottle.ondragenter = (e) => handleDragEnter(e);
        bottle.ondragleave = (e) => handleDragLeave(e);

        bottle.onclick = () => selectPosition(i);
        guessBottlesContainer.appendChild(bottle);
    }

    container.appendChild(guessBottlesContainer);

    // Добавить область выбора цвета
    const colorPalette = document.createElement('div');
    colorPalette.style.marginTop = '20px';
    colorPalette.innerHTML = '<h4>Нажмите на цвет для выбора:</h4>';

    const colorsContainer = document.createElement('div');
    colorsContainer.className = 'bottles-container';

    level.colors.forEach(color => {
        const bottle = createBottleElement(color);
        bottle.onclick = () => selectColor(color);

        // Добавить функцию перетаскивания для бутылок цветовой палитры
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
        // Обмен позициями бутылок
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

// Обработчики функций перетаскивания
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
    // Очистить все стили перетаскивания
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

    // Если перетаскивание из цветовой палитры
    if (dragSourceColor !== null) {
        currentGuess[targetIndex] = dragSourceColor;
        playPlaceSound();
        renderCurrentGuess();
        updateSubmitButton();
    }
    // Если перетаскивание из позиций угадывания
    else if (dragSourceIndex !== -1 && dragSourceIndex !== targetIndex) {
        // Обмен позициями бутылок
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

        // Добавить черные колышки
        for (let i = 0; i < entry.feedback.black; i++) {
            const peg = document.createElement('div');
            peg.className = 'peg black';
            feedback.appendChild(peg);
        }

        // Добавить белые колышки
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

// Функция всплывающего окна обратной связи
function showFeedbackPopup(feedback, isCorrect = false) {
    // Воспроизвести звук успеха или неудачи
    if (isCorrect) {
        playSuccessSound();
    } else {
        playFailSound();
    }

    // Создать оверлей
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    overlay.onclick = closeFeedbackPopup;

    // Создать всплывающее окно
    const popup = document.createElement('div');
    popup.className = `feedback-popup ${isCorrect ? 'success-feedback' : ''}`;
    popup.id = 'feedback-popup';

    const title = isCorrect ? '🎉 Поздравляем!' : '📊 Обратная связь';

    // Рассчитать время уровня
    const levelTime = Math.floor((Date.now() - levelStartTime) / 1000);

    popup.innerHTML = `
        <h3>${title}</h3>
        <div class="feedback-details">
            <div class="feedback-item">
                <span><span class="feedback-icon">⚫</span>Правильная позиция и цвет:</span>
                <strong style="color: #2d3748; font-size: 1.3em;">${feedback.black}</strong>
            </div>
            ${isCorrect ? `
            <div style="margin-top: 20px; padding: 15px; background: #f0fff4; border-radius: 8px; border: 2px solid #9ae6b4;">
                <h4 style="color: #38a169; margin-bottom: 10px;">Уровень ${LEVELS[currentLevel].level} пройден!</h4>
                <div style="display: flex; justify-content: space-between; margin: 8px 0;">
                    <span>🎯 Попытки:</span>
                    <strong style="color: #2d3748;">${guessHistory.length}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 8px 0;">
                    <span>⏱️ Время:</span>
                    <strong style="color: #2d3748;">${levelTime} секунд</strong>
                </div>
            </div>
            ` : `
            <div style="margin-top: 15px; color: #4a5568;">
                <small>Продолжайте угадывать, вы приближаетесь!</small>
            </div>
            `}
        </div>
        <button class="close-btn" onclick="closeFeedbackPopup()">
            ${isCorrect ? 'Следующий уровень' : 'Продолжить'}
        </button>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    // Если правильно, автоматически закрыть и перейти к следующему уровню
    if (isCorrect) {
        setTimeout(() => {
            closeFeedbackPopup();
            nextLevel();
        }, 4000); // Увеличено до 4 секунд, чтобы игрок увидел статистику
    }
}

function closeFeedbackPopup() {
    const popup = document.getElementById('feedback-popup');
    const overlay = document.querySelector('.popup-overlay');

    if (popup) popup.remove();
    if (overlay) overlay.remove();
}

// Игровая логика
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

    console.log(`Уровень ${level.level} начат, секретная последовательность:`, secretSequence);
}

function submitGuess() {
    const level = LEVELS[currentLevel];

    if (currentGuess.length !== level.length || !currentGuess.every(color => color)) {
        alert('Пожалуйста, завершите вашу последовательность!');
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

    // Проверить, правильно ли
    const isCorrect = feedback.black === level.length;

    // Показать всплывающее окно обратной связи
    setTimeout(() => {
        showFeedbackPopup(feedback, isCorrect);
    }, 300);

    if (!isCorrect) {
        // Сохранить последовательность игрока, не сбрасывать
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

    // Не очищать previouslyUsedSequences, сохранить механизм защиты от дубликатов

    document.getElementById('game-area').style.display = 'block';
    document.querySelector('.level-info').style.display = 'block';
    document.getElementById('completion-screen').style.display = 'none';

    startLevel();
}

// Инициализация игры
function initGame() {
    gameStartTime = Date.now();
    startLevel();
}

// Начать игру после загрузки страницы
window.onload = initGame;
