// Default options (Indonesian)
const defaultActions = [
    "Cium",
    "Gigit ringan",
    "Elus",
    "Pijat",
    "Jilat",
    "Tiup",
    "Usap",
    "Sentuh",
    "Godaan"
];

const defaultWheres = [
    "Leher",
    "Telinga",
    "Bibir",
    "Dada",
    "Punggung",
    "Paha",
    "Pinggang",
    "Bahu",
    "Lengan Dalam"
];

const defaultTimes = [
    "5 detik",
    "10 detik",
    "15 detik",
    "20 detik",
    "25 detik",
    "30 detik"
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
    // Add rolling animation class
    actionDice.classList.add('rolling');
    whereDice.classList.add('rolling');
    timeDice.classList.add('rolling');

    // Disable roll button during animation
    rollButton.disabled = true;

    // Remove previous results
    actionDice.querySelector('.dice-text').textContent = 'Mengocok...';
    whereDice.querySelector('.dice-text').textContent = 'Mengocok...';
    timeDice.querySelector('.dice-text').textContent = 'Mengocok...';
    resultDiv.textContent = '';

    // Wait for animation to complete
    setTimeout(() => {
        const action = getRandomItem(actions);
        const where = getRandomItem(wheres);
        const time = getRandomItem(times);

        // Update dice text
        actionDice.querySelector('.dice-text').textContent = action;
        whereDice.querySelector('.dice-text').textContent = where;
        timeDice.querySelector('.dice-text').textContent = time;

        // Show result
        resultDiv.textContent = `${action} ${where} selama ${time}`;

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
        deleteBtn.textContent = 'x';
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

    const defaultValue = type === 'time' ? '30 detik' : 'Opsi Baru';
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
        const savedActions = localStorage.getItem('diceActionsId');
        const savedWheres = localStorage.getItem('diceWheresId');
        const savedTimes = localStorage.getItem('diceTimesId');

        actions = savedActions ? JSON.parse(savedActions) : defaultActions;
        wheres = savedWheres ? JSON.parse(savedWheres) : defaultWheres;
        times = savedTimes ? JSON.parse(savedTimes) : defaultTimes;
    } catch (error) {
        console.error('Error loading settings:', error);
        actions = [...defaultActions];
        wheres = [...defaultWheres];
        times = [...defaultTimes];
    }
}

function saveSettings() {
    try {
        localStorage.setItem('diceActionsId', JSON.stringify(actions));
        localStorage.setItem('diceWheresId', JSON.stringify(wheres));
        localStorage.setItem('diceTimesId', JSON.stringify(times));
    } catch (error) {
        console.error('Error saving settings:', error);
    }
}

// Expose functions globally
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
    initializeElements();
    loadSettings();
    renderAllOptions();

    rollButton.addEventListener('click', rollDice);
    settingsButton.addEventListener('click', toggleSettings);

    document.addEventListener('click', (e) => {
        if (settingsPanel.classList.contains('open') &&
            !settingsPanel.contains(e.target) &&
            !settingsButton.contains(e.target)) {
            closeSettings();
        }
    });
});
