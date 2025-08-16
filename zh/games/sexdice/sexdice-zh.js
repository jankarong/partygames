// 默认选项
const defaultActions = [
    "亲吻",
    "轻咬",
    "爱抚",
    "按摩",
    "轻拍",
    "吹气",
    "抚摸",
    "触摸",
    "挑逗"
];

const defaultWheres = [
    "脖子",
    "耳朵",
    "嘴唇",
    "胸部",
    "背部",
    "大腿",
    "腰部",
    "肩膀",
    "手臂内侧"
];

const defaultTimes = [
    "5秒",
    "10秒",
    "15秒",
    "20秒",
    "25秒",
    "30秒"
];

let actions = [...defaultActions];
let wheres = [...defaultWheres];
let times = [...defaultTimes];

// 初始化元素
let actionDice, whereDice, timeDice, rollButton, resultDiv;
let settingsButton, settingsPanel, actionOptions, whereOptions, timeOptions, saveNotification;

// 页面加载后初始化DOM元素
function initializeElements() {
    actionDice = document.getElementById('actionDice');
    whereDice = document.getElementById('whereDice');
    timeDice = document.getElementById('timeDice');
    rollButton = document.getElementById('rollButton');
    resultDiv = document.getElementById('result');
    settingsButton = document.getElementById('settingsButton');
    settingsPanel = document.getElementById('settingsPanel');
    actionOptions = document.getElementById('actionOptions');
    whereOptions = document.getElementById('whereOptions');
    timeOptions = document.getElementById('timeOptions');
    saveNotification = document.getElementById('saveNotification');
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function rollDice() {
    console.log('掷骰子中...');

    // 添加滚动动画类
    actionDice.classList.add('rolling');
    whereDice.classList.add('rolling');
    timeDice.classList.add('rolling');

    // 动画期间禁用掷骰子按钮
    rollButton.disabled = true;

    // 移除之前的结果
    actionDice.querySelector('.dice-text').textContent = '掷骰中...';
    whereDice.querySelector('.dice-text').textContent = '掷骰中...';
    timeDice.querySelector('.dice-text').textContent = '掷骰中...';
    resultDiv.textContent = '';

    // 等待动画完成
    setTimeout(() => {
        // 获取随机选项
        const action = getRandomItem(actions);
        const where = getRandomItem(wheres);
        const time = getRandomItem(times);

        // 更新骰子文本
        actionDice.querySelector('.dice-text').textContent = action;
        whereDice.querySelector('.dice-text').textContent = where;
        timeDice.querySelector('.dice-text').textContent = time;

        // 显示结果
        resultDiv.textContent = `${action}${where}持续${time}`;

        // 移除滚动动画类
        actionDice.classList.remove('rolling');
        whereDice.classList.remove('rolling');
        timeDice.classList.remove('rolling');

        // 重新启用掷骰子按钮
        rollButton.disabled = false;
    }, 1000);
}

// 设置面板函数
function toggleSettings() {
    settingsPanel.classList.toggle('open');
}

function closeSettings() {
    settingsPanel.classList.remove('open');
}

function showSaveNotification() {
    saveNotification.classList.add('show');
    setTimeout(() => {
        saveNotification.classList.remove('show');
    }, 2000);
}

function resetToDefault() {
    actions = [...defaultActions];
    wheres = [...defaultWheres];
    times = [...defaultTimes];
    saveSettings();
    renderAllOptions();
}

// 保存前跟踪更改
let pendingChanges = false;

function renderOptions(options, containerId, type) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'dice-option';

        const input = document.createElement('input');
        input.type = 'text';
        input.value = option;
        input.addEventListener('change', () => {
            updateOption(type, index, input.value);
            pendingChanges = true;
        });

        const deleteBtn = document.createElement('span');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '×';
        deleteBtn.addEventListener('click', (e) => handleDeleteClick(e, type, index));
        deleteBtn.addEventListener('mousedown', (e) => e.preventDefault());

        optionDiv.appendChild(input);
        optionDiv.appendChild(deleteBtn);
        container.appendChild(optionDiv);
    });
}

function handleDeleteClick(e, type, index) {
    e.preventDefault();
    e.stopPropagation();
    removeOption(type, index);
    return false;
}

function updateOption(type, index, value) {
    if (value.trim()) {
        const optionsMap = {
            'action': actions,
            'where': wheres,
            'time': times
        };
        optionsMap[type][index] = value.trim();
    }
}

function removeOption(type, index) {
    const optionsMap = {
        'action': actions,
        'where': wheres,
        'time': times
    };
    optionsMap[type].splice(index, 1);
    renderAllOptions();
    pendingChanges = true;
}

function addOption(type) {
    const optionsMap = {
        'action': actions,
        'where': wheres,
        'time': times
    };

    const defaultValue = type === 'time' ? '30秒' : '新选项';
    optionsMap[type].push(defaultValue);
    renderAllOptions();
    pendingChanges = true;
}

function saveChanges() {
    if (pendingChanges) {
        saveSettings();
        showSaveNotification();
        pendingChanges = false;
    }
}

function renderAllOptions() {
    renderOptions(actions, 'actionOptions', 'action');
    renderOptions(wheres, 'whereOptions', 'where');
    renderOptions(times, 'timeOptions', 'time');
}

function loadSettings() {
    try {
        const savedActions = localStorage.getItem('diceActions-zh');
        const savedWheres = localStorage.getItem('diceWheres-zh');
        const savedTimes = localStorage.getItem('diceTimes-zh');

        actions = savedActions ? JSON.parse(savedActions) : defaultActions;
        wheres = savedWheres ? JSON.parse(savedWheres) : defaultWheres;
        times = savedTimes ? JSON.parse(savedTimes) : defaultTimes;
    } catch (error) {
        console.error('加载设置时出错：', error);
        // 如果出错，使用默认值
        actions = [...defaultActions];
        wheres = [...defaultWheres];
        times = [...defaultTimes];
    }
}

function saveSettings() {
    try {
        localStorage.setItem('diceActions-zh', JSON.stringify(actions));
        localStorage.setItem('diceWheres-zh', JSON.stringify(wheres));
        localStorage.setItem('diceTimes-zh', JSON.stringify(times));
    } catch (error) {
        console.error('保存设置时出错：', error);
    }
}

// 将需要的函数暴露到全局作用域
window.toggleSettings = toggleSettings;
window.closeSettings = closeSettings;
window.addOption = addOption;
window.updateOption = updateOption;
window.removeOption = removeOption;
window.resetToDefault = resetToDefault;
window.saveChanges = saveChanges;

// 页面加载时初始化所有内容
window.addEventListener('load', () => {
    console.log('页面已加载，正在初始化...');
    initializeElements();
    loadSettings();
    renderAllOptions();

    // 添加事件监听器
    rollButton.addEventListener('click', rollDice);
    settingsButton.addEventListener('click', toggleSettings);

    // 添加点击外部监听器以关闭设置
    document.addEventListener('click', (e) => {
        if (settingsPanel.classList.contains('open') &&
            !settingsPanel.contains(e.target) &&
            !settingsButton.contains(e.target)) {
            closeSettings();
        }
    });
});