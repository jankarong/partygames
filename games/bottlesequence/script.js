// 游戏配置
const LEVELS = [
    { level: 1, length: 3, colors: ['red', 'blue', 'green', 'yellow'] },
    { level: 2, length: 4, colors: ['red', 'blue', 'green', 'yellow'] },
    { level: 3, length: 4, colors: ['red', 'blue', 'green', 'yellow', 'purple', 'orange'] },
    { level: 4, length: 5, colors: ['red', 'blue', 'green', 'yellow', 'purple', 'orange'] },
    { level: 5, length: 5, colors: ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'brown', 'pink'] }
];

const COLOR_NAMES = {
    red: '红', blue: '蓝', green: '绿', yellow: '黄',
    purple: '紫', orange: '橙', brown: '棕', pink: '粉'
};

// 游戏状态
let currentLevel = 0;
let secretSequence = [];
let currentGuess = [];
let guessHistory = [];
let gameStartTime = 0;
let levelStartTime = 0;
let totalAttempts = 0;
let selectedBottleIndex = -1;

// 防重复机制 - 全局存储所有使用过的序列
let previouslyUsedSequences = [];

// 工具函数
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

// 生成唯一序列（防重复机制 + 无重复颜色）
function generateUniqueSequence(length, colors) {
    let sequence;
    let attempts = 0;
    const maxAttempts = 1000; // 防止无限循环

    do {
        sequence = [];
        const availableColors = [...colors]; // 复制颜色数组

        // 确保序列中没有重复颜色
        for (let i = 0; i < length; i++) {
            if (availableColors.length === 0) {
                // 如果可用颜色不够，重新开始
                break;
            }
            const randomIndex = Math.floor(Math.random() * availableColors.length);
            const selectedColor = availableColors[randomIndex];
            sequence.push(selectedColor);
            availableColors.splice(randomIndex, 1); // 移除已选择的颜色
        }

        attempts++;
    } while ((sequence.length !== length || isSequenceUsed(sequence)) && attempts < maxAttempts);

    if (attempts >= maxAttempts) {
        console.warn('无法生成唯一序列，可能所有组合都已使用');
        // 清空已使用序列历史，重新开始
        previouslyUsedSequences = [];
        console.log('已清空序列历史，重新生成');

        // 重新尝试生成一次
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

// 反馈计算函数（简化版Mastermind）
function getFeedback(guess, secret) {
    let blackPegs = 0; // 位置和颜色都正确
    let whitePegs = 0; // 颜色正确但位置错误

    const secretCopy = [...secret];
    const guessCopy = [...guess];

    // 计算黑色钉子（位置和颜色都正确）
    for (let i = guessCopy.length - 1; i >= 0; i--) {
        if (guessCopy[i] === secretCopy[i]) {
            blackPegs++;
            secretCopy.splice(i, 1);
            guessCopy.splice(i, 1);
        }
    }

    // 计算白色钉子（颜色正确但位置错误）
    for (let i = 0; i < guessCopy.length; i++) {
        const index = secretCopy.indexOf(guessCopy[i]);
        if (index !== -1) {
            whitePegs++;
            secretCopy.splice(index, 1);
        }
    }

    return { black: blackPegs, white: whitePegs };
}

// UI函数
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

    // 创建猜测区域标题
    const guessTitle = document.createElement('h4');
    guessTitle.textContent = '拖拽瓶子调换位置，或点击选择位置：';
    guessTitle.style.marginBottom = '15px';
    container.appendChild(guessTitle);

    // 创建猜测瓶子容器
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

        // 添加拖拽功能
        if (currentGuess[i]) {
            bottle.draggable = true;
            bottle.ondragstart = (e) => handleDragStart(e, i);
            bottle.ondragend = (e) => handleDragEnd(e);
        }

        // 添加放置功能
        bottle.ondragover = (e) => handleDragOver(e);
        bottle.ondrop = (e) => handleDrop(e, i);
        bottle.ondragenter = (e) => handleDragEnter(e);
        bottle.ondragleave = (e) => handleDragLeave(e);

        bottle.onclick = () => selectPosition(i);
        guessBottlesContainer.appendChild(bottle);
    }

    container.appendChild(guessBottlesContainer);

    // 添加颜色选择区域
    const colorPalette = document.createElement('div');
    colorPalette.style.marginTop = '20px';
    colorPalette.innerHTML = '<h4>点击颜色选择瓶子：</h4>';

    const colorsContainer = document.createElement('div');
    colorsContainer.className = 'bottles-container';

    level.colors.forEach(color => {
        const bottle = createBottleElement(color);
        bottle.onclick = () => selectColor(color);
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
        selectedBottleIndex = -1;
        renderCurrentGuess();
        updateSubmitButton();
    }
}

function selectBottle(index, color) {
    if (selectedBottleIndex >= 0 && selectedBottleIndex !== index) {
        // 交换瓶子位置
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

// 拖拽功能处理函数
let dragSourceIndex = -1;

function handleDragStart(e, index) {
    dragSourceIndex = index;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    dragSourceIndex = -1;
    // 清除所有拖拽样式
    document.querySelectorAll('.bottle').forEach(bottle => {
        bottle.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
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

    if (dragSourceIndex !== -1 && dragSourceIndex !== targetIndex) {
        // 交换瓶子位置
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

        // 添加黑色钉子
        for (let i = 0; i < entry.feedback.black; i++) {
            const peg = document.createElement('div');
            peg.className = 'peg black';
            feedback.appendChild(peg);
        }

        // 添加白色钉子
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

// 反馈弹窗函数
function showFeedbackPopup(feedback, isCorrect = false) {
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    overlay.onclick = closeFeedbackPopup;

    // 创建弹窗
    const popup = document.createElement('div');
    popup.className = `feedback-popup ${isCorrect ? 'success-feedback' : ''}`;
    popup.id = 'feedback-popup';

    const title = isCorrect ? '🎉 恭喜答对了！' : '📊 本次猜测反馈';

    // 计算关卡用时
    const levelTime = Math.floor((Date.now() - levelStartTime) / 1000);

    popup.innerHTML = `
        <h3>${title}</h3>
        <div class="feedback-details">
            <div class="feedback-item">
                <span><span class="feedback-icon">⚫</span>位置和颜色都正确：</span>
                <strong style="color: #2d3748; font-size: 1.3em;">${feedback.black} 个</strong>
            </div>
            ${isCorrect ? `
            <div style="margin-top: 20px; padding: 15px; background: #f0fff4; border-radius: 8px; border: 2px solid #9ae6b4;">
                <h4 style="color: #38a169; margin-bottom: 10px;">关卡 ${LEVELS[currentLevel].level} 完成！</h4>
                <div style="display: flex; justify-content: space-between; margin: 8px 0;">
                    <span>🎯 猜测次数：</span>
                    <strong style="color: #2d3748;">${guessHistory.length} 次</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 8px 0;">
                    <span>⏱️ 用时：</span>
                    <strong style="color: #2d3748;">${levelTime} 秒</strong>
                </div>
            </div>
            ` : `
            <div style="margin-top: 15px; color: #4a5568;">
                <small>继续猜测，您距离答案越来越近了！</small>
            </div>
            `}
        </div>
        <button class="close-btn" onclick="closeFeedbackPopup()">
            ${isCorrect ? '进入下一关' : '继续游戏'}
        </button>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    // 如果答对了，设置自动关闭并进入下一关
    if (isCorrect) {
        setTimeout(() => {
            closeFeedbackPopup();
            nextLevel();
        }, 4000); // 延长到4秒让玩家看清统计信息
    }
}

function closeFeedbackPopup() {
    const popup = document.getElementById('feedback-popup');
    const overlay = document.querySelector('.popup-overlay');

    if (popup) popup.remove();
    if (overlay) overlay.remove();
}

// 游戏逻辑
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

    console.log(`关卡 ${level.level} 开始，秘密序列:`, secretSequence);
}

function submitGuess() {
    const level = LEVELS[currentLevel];

    if (currentGuess.length !== level.length || !currentGuess.every(color => color)) {
        alert('请完成您的猜测序列！');
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

    // 检查是否猜对
    const isCorrect = feedback.black === level.length;

    // 显示反馈弹窗
    setTimeout(() => {
        showFeedbackPopup(feedback, isCorrect);
    }, 300);

    if (!isCorrect) {
        // 保留玩家的猜测序列，不重置
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

    // 不清空 previouslyUsedSequences，保持防重复机制

    document.getElementById('game-area').style.display = 'block';
    document.querySelector('.level-info').style.display = 'block';
    document.getElementById('completion-screen').style.display = 'none';

    startLevel();
}

// 初始化游戏
function initGame() {
    gameStartTime = Date.now();
    startLevel();
}

// 页面加载完成后启动游戏
window.onload = initGame;