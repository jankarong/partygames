// Default options
const defaultActions = [
    "Kiss",
    "Nibble",
    "Caress",
    "Massage",
    "Lick",
    "Blow",
    "Stroke",
    "Touch",
    "Tease"
];

const defaultWheres = [
    "Neck",
    "Ears",
    "Lips",
    "Chest",
    "Back",
    "Thighs",
    "Waist",
    "Shoulders",
    "Inner Arms"
];

const defaultTimes = [
    "5 seconds",
    "10 seconds",
    "15 seconds",
    "20 seconds",
    "25 seconds",
    "30 seconds"
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
    actionDice.querySelector('.dice-text').textContent = 'Rolling...';
    whereDice.querySelector('.dice-text').textContent = 'Rolling...';
    timeDice.querySelector('.dice-text').textContent = 'Rolling...';
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
        resultDiv.textContent = `${action} ${where} for ${time}`;

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
    // Check if user is premium before opening settings
    const isPremium = await isPremiumUser();
    if (!isPremium) {
        showPremiumModal();
        return;
    }
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

    const defaultValue = type === 'time' ? '30 seconds' : 'New Option';
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
        // 如果出错，使用默认值
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

// 将需要的函数暴露到全局作用域
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
