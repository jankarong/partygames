// Default options
const defaultActions = [
    "Поцелуй",
    "Покусай",
    "Погладь",
    "Помассируй",
    "Оближи",
    "Подуй",
    "Поласкай",
    "Потрогай",
    "Подразни"
];

const defaultWheres = [
    "Шею",
    "Уши",
    "Губы",
    "Грудь",
    "Спину",
    "Бёдра",
    "Талию",
    "Плечи",
    "Внутреннюю часть рук"
];

const defaultTimes = [
    "5 секунд",
    "10 секунд",
    "15 секунд",
    "20 секунд",
    "25 секунд",
    "30 секунд"
];

let actions = [...defaultActions];
let wheres = [...defaultWheres];
let times = [...defaultTimes];

// Initialize elements
let actionDice, whereDice, timeDice, rollButton, resultDiv;
let settingsButton, settingsPanel, actionOptions, whereOptions, timeOptions, saveNotification;

// Initialize DOM elements after page load
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
    console.log('Rolling dice...');

    // Add rolling animation class
    actionDice.classList.add('rolling');
    whereDice.classList.add('rolling');
    timeDice.classList.add('rolling');

    // Disable roll button during animation
    rollButton.disabled = true;

    // Remove previous results
    actionDice.querySelector('.dice-text').textContent = 'Бросаем...';
    whereDice.querySelector('.dice-text').textContent = 'Бросаем...';
    timeDice.querySelector('.dice-text').textContent = 'Бросаем...';
    resultDiv.textContent = '';

    // Wait for animation to complete
    setTimeout(() => {
        // Get random options
        const action = getRandomItem(actions);
        const where = getRandomItem(wheres);
        const time = getRandomItem(times);

        // Update dice text
        actionDice.querySelector('.dice-text').textContent = action;
        whereDice.querySelector('.dice-text').textContent = where;
        timeDice.querySelector('.dice-text').textContent = time;

        // Show result
        resultDiv.textContent = `${action} ${where} в течение ${time}`;

        // Remove rolling animation class
        actionDice.classList.remove('rolling');
        whereDice.classList.remove('rolling');
        timeDice.classList.remove('rolling');

        // Re-enable roll button
        rollButton.disabled = false;
    }, 1000);
}

// Check if user has premium access
async function isPremiumUser() {
    // Use the global authManager to check premium status
    if (window.authManager) {
        return await window.authManager.checkUserPremiumStatus();
    }
    return false;
}

// Show premium modal
function showPremiumModal() {
    const modal = document.getElementById('premium-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

// Close premium modal
function closePremiumModal() {
    const modal = document.getElementById('premium-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Settings Panel Functions
async function toggleSettings() {
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

// Track changes before saving
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

    const defaultValue = type === 'time' ? '30 секунд' : 'Новая опция';
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
        const savedActions = localStorage.getItem('diceActions');
        const savedWheres = localStorage.getItem('diceWheres');
        const savedTimes = localStorage.getItem('diceTimes');

        actions = savedActions ? JSON.parse(savedActions) : defaultActions;
        wheres = savedWheres ? JSON.parse(savedWheres) : defaultWheres;
        times = savedTimes ? JSON.parse(savedTimes) : defaultTimes;
    } catch (error) {
        console.error('Error loading settings:', error);
        // Если произошла ошибка, используем значения по умолчанию
        actions = [...defaultActions];
        wheres = [...defaultWheres];
        times = [...defaultTimes];
    }
}

function saveSettings() {
    try {
        localStorage.setItem('diceActions', JSON.stringify(actions));
        localStorage.setItem('diceWheres', JSON.stringify(wheres));
        localStorage.setItem('diceTimes', JSON.stringify(times));
    } catch (error) {
        console.error('Error saving settings:', error);
    }
}

// Экспортируем необходимые функции в глобальную область видимости
window.toggleSettings = toggleSettings;
window.closeSettings = closeSettings;
window.closePremiumModal = closePremiumModal;
window.addOption = addOption;
window.updateOption = updateOption;
window.removeOption = removeOption;
window.resetToDefault = resetToDefault;
window.saveChanges = saveChanges;

// Initialize everything when the page loads
window.addEventListener('load', () => {
    console.log('Page loaded, initializing...');
    initializeElements();
    loadSettings();
    renderAllOptions();

    // Add event listeners
    rollButton.addEventListener('click', rollDice);
    settingsButton.addEventListener('click', toggleSettings);

    // Add click outside listener to close settings
    document.addEventListener('click', (e) => {
        if (settingsPanel.classList.contains('open') &&
            !settingsPanel.contains(e.target) &&
            !settingsButton.contains(e.target)) {
            closeSettings();
        }
    });
});
