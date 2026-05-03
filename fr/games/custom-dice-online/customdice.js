const translations = {
    "title": "Dés Personnalisés en Ligne - Générateur de dés numériques personnalisables gratuits",
    "h1": "Dés Personnalisés en Ligne",
    "lead": "Le lanceur de dés numérique gratuit ultime où VOUS définissez les règles !",
    "roll": "Lancer les dés !",
    "customize": "Personnaliser les dés",
    "configure": "Configurez vos dés",
    "add_dice": "Ajouter un nouveau dé",
    "reset": "Réinitialiser aux points",
    "placeholder": "Ajouter une face (ex: Bisou, 6, 🍕)...",
    "dice_label": "Dé",
    "seo_description": "Créez et lancez vos propres dés personnalisés en ligne gratuitement. Ajoutez des chiffres, du texte ou des emojis. Parfait pour les jeux de société et les décisions.",
    "seo_keywords": "dés personnalisés en ligne, dés virtuels, dés personnalisables, lanceur de dés numérique, dés gratuits",
    "why_title": "Pourquoi utiliser nos dés personnalisés ?",
    "why_p": "Notre générateur de <strong>dés personnalisés en ligne</strong> est l'outil le plus flexible pour les joueurs et les enseignants.",
    "features_title": "Caractéristiques principales",
    "feature1": "<strong>Entièrement gratuit :</strong> Pas d'inscription requise.",
    "feature2": "<strong>Options illimitées :</strong> Ajoutez autant de faces que vous voulez.",
    "feature3": "<strong>Texte & Chiffres :</strong> Chiffres, mots ou emojis.",
    "feature4": "<strong>Multi-dés :</strong> Lancez plusieurs dés à la fois.",
    "feature5": "<strong>Résultats instantanés :</strong> Animations fluides.",
    "how_title": "Comment créer vos propres dés",
    "step1": "Cliquez sur <strong>\"Personnaliser les dés\"</strong>.",
    "step2": "Modifiez ou ajoutez des dés.",
    "step3": "Entrez votre texte et appuyez sur Entrée.",
    "step4": "Cliquez sur \"X\" pour supprimer.",
    "step5": "Cliquez sur <strong>\"Lancer les dés !\"</strong>.",
    "perfect_title": "Parfait pour toutes les occasions",
    "perfect_p": "L'outil <strong>dés personnalisés en ligne</strong> est parfait pour :",
    "usage1": "<strong>Jeux de société :</strong> Remplacer des dés perdus.",
    "usage2": "<strong>Éducation :</strong> Sélection aléatoire d'élèves.",
    "usage3": "<strong>Prise de décision :</strong> Que manger ce soir ?",
    "usage4": "<strong>Jeux de rôle :</strong> Dés spéciaux pour D&D.",
    "faq_title": "Questions fréquemment posées",
    "q1": "Mes données sont-elles sauvegardées ?",
    "a1": "Oui ! Vos paramètres sont enregistrés dans le stockage local de votre navigateur.",
    "q2": "Puis-je utiliser des emojis ?",
    "a2": "Absolument ! Copiez-collez des emojis dans les champs.",
    "nav_name": "Dés Personnalisés"
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
