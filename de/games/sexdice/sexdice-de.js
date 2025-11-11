// Standardoptionen
const defaultActions = [
    "Küssen",
    "Knabbern",
    "Streicheln",
    "Massieren",
    "Lecken",
    "Blasen",
    "Streichen",
    "Berühren",
    "Necken"
];

const defaultWheres = [
    "Nacken",
    "Ohren",
    "Lippen",
    "Brust",
    "Rücken",
    "Oberschenkel",
    "Taille",
    "Schultern",
    "Innere Arme"
];

const defaultTimes = [
    "5 Sekunden",
    "10 Sekunden",
    "15 Sekunden",
    "20 Sekunden",
    "25 Sekunden",
    "30 Sekunden"
];

let actions = [...defaultActions];
let wheres = [...defaultWheres];
let times = [...defaultTimes];

// Elemente initialisieren
let actionDice, whereDice, timeDice, rollButton, resultDiv;
let settingsButton, settingsPanel, actionOptions, whereOptions, timeOptions, saveNotification;

// DOM-Elemente nach dem Laden der Seite initialisieren
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
    console.log('Würfeln...');

    // Rolling-Animation-Klasse hinzufügen
    actionDice.classList.add('rolling');
    whereDice.classList.add('rolling');
    timeDice.classList.add('rolling');

    // Würfelbutton während der Animation deaktivieren
    rollButton.disabled = true;

    // Vorherige Ergebnisse entfernen
    actionDice.querySelector('.dice-text').textContent = 'Würfeln...';
    whereDice.querySelector('.dice-text').textContent = 'Würfeln...';
    timeDice.querySelector('.dice-text').textContent = 'Würfeln...';
    resultDiv.textContent = '';

    // Auf Abschluss der Animation warten
    setTimeout(() => {
        // Zufällige Optionen abrufen
        const action = getRandomItem(actions);
        const where = getRandomItem(wheres);
        const time = getRandomItem(times);

        // Würfeltext aktualisieren
        actionDice.querySelector('.dice-text').textContent = action;
        whereDice.querySelector('.dice-text').textContent = where;
        timeDice.querySelector('.dice-text').textContent = time;

        // Ergebnis anzeigen
        resultDiv.textContent = `${action} ${where} für ${time}`;

        // Rolling-Animation-Klasse entfernen
        actionDice.classList.remove('rolling');
        whereDice.classList.remove('rolling');
        timeDice.classList.remove('rolling');

        // Würfelbutton wieder aktivieren
        rollButton.disabled = false;
    }, 1000);
}

// Prüfen, ob Benutzer Premium-Zugang hat
async function isPremiumUser() {
    // Verwenden Sie den globalen authManager, um den Premium-Status zu prüfen
    if (window.authManager) {
        return await window.authManager.checkUserPremiumStatus();
    }
    return false;
}

// Premium-Modal anzeigen
function showPremiumModal() {
    const modal = document.getElementById('premium-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

// Premium-Modal schließen
function closePremiumModal() {
    const modal = document.getElementById('premium-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Einstellungspanel-Funktionen
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

// Änderungen vor dem Speichern verfolgen
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

    const defaultValue = type === 'time' ? '30 Sekunden' : 'Neue Option';
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
        const savedActions = localStorage.getItem('diceActions-de');
        const savedWheres = localStorage.getItem('diceWheres-de');
        const savedTimes = localStorage.getItem('diceTimes-de');

        actions = savedActions ? JSON.parse(savedActions) : defaultActions;
        wheres = savedWheres ? JSON.parse(savedWheres) : defaultWheres;
        times = savedTimes ? JSON.parse(savedTimes) : defaultTimes;
    } catch (error) {
        console.error('Fehler beim Laden der Einstellungen:', error);
        // Falls ein Fehler auftritt, Standardwerte verwenden
        actions = [...defaultActions];
        wheres = [...defaultWheres];
        times = [...defaultTimes];
    }
}

function saveSettings() {
    try {
        localStorage.setItem('diceActions-de', JSON.stringify(actions));
        localStorage.setItem('diceWheres-de', JSON.stringify(wheres));
        localStorage.setItem('diceTimes-de', JSON.stringify(times));
    } catch (error) {
        console.error('Fehler beim Speichern der Einstellungen:', error);
    }
}

// Erforderliche Funktionen für den globalen Scope verfügbar machen
window.toggleSettings = toggleSettings;
window.closeSettings = closeSettings;
window.closePremiumModal = closePremiumModal;
window.addOption = addOption;
window.updateOption = updateOption;
window.removeOption = removeOption;
window.resetToDefault = resetToDefault;
window.saveChanges = saveChanges;

// Alles beim Laden der Seite initialisieren
window.addEventListener('load', () => {
    console.log('Seite geladen, initialisiere...');
    initializeElements();
    loadSettings();
    renderAllOptions();

    // Event-Listener hinzufügen
    rollButton.addEventListener('click', rollDice);
    settingsButton.addEventListener('click', toggleSettings);

    // Klick-außerhalb-Listener hinzufügen, um Einstellungen zu schließen
    document.addEventListener('click', (e) => {
        if (settingsPanel.classList.contains('open') &&
            !settingsPanel.contains(e.target) &&
            !settingsButton.contains(e.target)) {
            closeSettings();
        }
    });
});
