const translations = {
    "title": "Eigene Würfel Online - Kostenloser anpassbarer digitaler Würfelgenerator",
    "h1": "Eigene Würfel Online",
    "lead": "Der ultimative kostenlose digitale Würfelroller, bei dem SIE die Regeln bestimmen!",
    "roll": "Würfeln!",
    "customize": "Würfel anpassen",
    "configure": "Konfigurieren Sie Ihre Würfel",
    "add_dice": "Neuen Würfel hinzufügen",
    "reset": "Auf Punkte zurücksetzen",
    "placeholder": "Seite hinzufügen (z.B. Kuss, 6, 🍕)...",
    "dice_label": "Würfel",
    "seo_description": "Erstellen und rollen Sie Ihre eigenen benutzerdefinierten Würfel kostenlos online. Fügen Sie Zahlen, Text oder Emojis zu Ihren virtuellen Würfeln hinzu. Perfekt für Brettspiele, Entscheidungsfindungen und Unterrichtsaktivitäten.",
    "seo_keywords": "eigene würfel online, virtuelle würfel, anpassbare würfel, digitaler würfelroller, textwürfel online, kostenloser würfel",
    "why_title": "Warum unsere Online-Würfel nutzen?",
    "why_p": "Unser Generator für <strong>eigene Würfel online</strong> ist das flexibelste Werkzeug für Spieler, Lehrer und Entscheider.",
    "features_title": "Hauptmerkmale von Eigene Würfel Online",
    "feature1": "<strong>Völlig kostenlos:</strong> Keine Registrierung erforderlich.",
    "feature2": "<strong>Unbegrenzte Optionen:</strong> Fügen Sie so viele Seiten hinzu, wie Sie möchten.",
    "feature3": "<strong>Text & Zahlen:</strong> Ihre Würfel können Zahlen, Wörter oder Emojis enthalten.",
    "feature4": "<strong>Multi-Würfel-Unterstützung:</strong> Mehrere Würfel gleichzeitig rollen.",
    "feature5": "<strong>Sofortige Ergebnisse:</strong> Realistische Animationen.",
    "how_title": "So erstellen Sie Ihre eigenen Würfel",
    "step1": "Klicken Sie auf <strong>\"Würfel anpassen\"</strong>.",
    "step2": "Bearbeiten Sie vorhandene Würfel oder fügen Sie neue hinzu.",
    "step3": "Geben Sie Text ein und drücken Sie Enter.",
    "step4": "Klicken Sie auf \"X\" zum Entfernen.",
    "step5": "Klicken Sie auf <strong>\"Würfeln!\"</strong>.",
    "perfect_title": "Perfekt für jede Gelegenheit",
    "perfect_p": "Das Tool <strong>Eigene Würfel Online</strong> ist ideal für:",
    "usage1": "<strong>Brettspiele:</strong> Verlorene Würfel ersetzen.",
    "usage2": "<strong>Bildung:</strong> Zufällige Schülerauswahl.",
    "usage3": "<strong>Entscheidungen:</strong> Was essen oder schauen?",
    "usage4": "<strong>Rollenspiele:</strong> Spezialwürfel für D&D.",
    "faq_title": "Häufig gestellte Fragen",
    "q1": "Werden meine Daten gespeichert?",
    "a1": "Ja! Ihre Einstellungen werden lokal im Browser gespeichert.",
    "q2": "Kann ich Emojis verwenden?",
    "a2": "Absolut! Kopieren Sie einfach Emojis in die Felder.",
    "nav_name": "Eigene Würfel"
};

document.addEventListener('DOMContentLoaded', () => {
    let diceList = JSON.parse(localStorage.getItem('customDiceList')) || [
        { id: Date.now(), name: translations.dice_label + ' 1', options: ['1', '2', '3', '4', '5', '6'] },
        { id: Date.now() + 1, name: translations.dice_label + ' 2', options: ['1', '2', '3', '4', '5', '6'] },
        { id: Date.now() + 2, name: translations.dice_label + ' 3', options: ['1', '2', '3', '4', '5', '6'] }
    ];

    const diceArea = document.getElementById('diceArea');
    const rollButton = document.getElementById('rollButton');
    const configButton = document.getElementById('configButton');
    const settingsPanel = document.getElementById('settingsPanel');
    const diceConfigContainer = document.getElementById('diceConfigContainer');
    const addDiceButton = document.getElementById('addDiceButton');

    function getDiceHTML(value) {
        const num = parseInt(value);
        if (!isNaN(num) && num >= 1 && num <= 6 && value.toString().length === 1) {
            const pipPositions = {
                1: ['d'],
                2: ['a', 'g'],
                3: ['a', 'd', 'g'],
                4: ['a', 'b', 'f', 'g'],
                5: ['a', 'b', 'd', 'f', 'g'],
                6: ['a', 'b', 'c', 'e', 'f', 'g']
            };
            const pips = pipPositions[num].map(pos => `<span class="pip pip-${pos}"></span>`).join('');
            return `<div class="dice-face">${pips}</div>`;
        }
        return value;
    }

    function renderDice() {
        diceArea.innerHTML = '';
        diceList.forEach(dice => {
            const diceEl = document.createElement('div');
            diceEl.className = 'dice';
            diceEl.id = `dice-${dice.id}`;
            diceEl.innerHTML = getDiceHTML(dice.options[0] || '?');
            diceArea.appendChild(diceEl);
        });
    }

    function renderConfig() {
        diceConfigContainer.innerHTML = '';
        diceList.forEach((dice, index) => {
            const configItem = document.createElement('div');
            configItem.className = 'dice-config-item';
            configItem.innerHTML = `
                <i class="fas fa-trash remove-dice" data-id="${dice.id}"></i>
                <h4>${translations.dice_label} ${index + 1}</h4>
                <div class="options-list" id="options-${dice.id}">
                    ${dice.options.map((opt, i) => `
                        <span class="option-tag">${opt} <i class="fas fa-times" data-dice-id="${dice.id}" data-opt-index="${i}"></i></span>
                    `).join('')}
                    <div class="input-group-custom">
                        <input type="text" class="add-option-input" placeholder="${translations.placeholder}" data-id="${dice.id}">
                        <button class="add-btn" data-id="${dice.id}"><i class="fas fa-plus"></i></button>
                    </div>
                </div>
            `;
            diceConfigContainer.appendChild(configItem);
        });
    }

    function saveAndRefresh() {
        localStorage.setItem('customDiceList', JSON.stringify(diceList));
        renderDice();
        renderConfig();
    }

    rollButton.addEventListener('click', () => {
        const diceEls = document.querySelectorAll('.dice');
        diceEls.forEach((el, index) => {
            el.classList.add('rolling');
            
            let rollCount = 0;
            const maxRolls = 10;
            const interval = setInterval(() => {
                const options = diceList[index].options;
                const value = options[Math.floor(Math.random() * options.length)];
                el.innerHTML = getDiceHTML(value);
                rollCount++;
                
                if (rollCount >= maxRolls) {
                    clearInterval(interval);
                    el.classList.remove('rolling');
                }
            }, 50);
        });
    });

    configButton.addEventListener('click', () => {
        settingsPanel.style.display = settingsPanel.style.display === 'none' ? 'block' : 'none';
    });

    addDiceButton.addEventListener('click', () => {
        diceList.push({
            id: Date.now(),
            name: `${translations.dice_label} ${diceList.length + 1}`,
            options: ['1', '2', '3', '4', '5', '6']
        });
        saveAndRefresh();
    });

    document.getElementById('resetDiceButton').addEventListener('click', () => {
        diceList = [
            { id: Date.now(), name: translations.dice_label + ' 1', options: ['1', '2', '3', '4', '5', '6'] },
            { id: Date.now() + 1, name: translations.dice_label + ' 2', options: ['1', '2', '3', '4', '5', '6'] },
            { id: Date.now() + 2, name: translations.dice_label + ' 3', options: ['1', '2', '3', '4', '5', '6'] }
        ];
        saveAndRefresh();
    });

    diceConfigContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-dice')) {
            const id = parseInt(e.target.dataset.id);
            diceList = diceList.filter(d => d.id !== id);
            saveAndRefresh();
        } else if (e.target.classList.contains('fa-times')) {
            const diceId = parseInt(e.target.dataset.diceId);
            const optIndex = parseInt(e.target.dataset.optIndex);
            const dice = diceList.find(d => d.id === diceId);
            dice.options.splice(optIndex, 1);
            saveAndRefresh();
        } else if (e.target.closest('.add-btn')) {
            const btn = e.target.closest('.add-btn');
            const id = parseInt(btn.dataset.id);
            const input = diceConfigContainer.querySelector(`.add-option-input[data-id="${id}"]`);
            const val = input.value.trim();
            if (val) {
                const dice = diceList.find(d => d.id === id);
                dice.options.push(val);
                input.value = '';
                saveAndRefresh();
            }
        }
    });

    diceConfigContainer.addEventListener('keypress', (e) => {
        if (e.target.classList.contains('add-option-input') && e.key === 'Enter') {
            const id = parseInt(e.target.dataset.id);
            const val = e.target.value.trim();
            if (val) {
                const dice = diceList.find(d => d.id === id);
                dice.options.push(val);
                e.target.value = '';
                saveAndRefresh();
            }
        }
    });

    renderDice();
    renderConfig();
});
