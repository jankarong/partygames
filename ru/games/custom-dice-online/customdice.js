const translations = {
    "title": "Настраиваемые кубики онлайн - Бесплатный настраиваемый генератор цифровых кубиков",
    "h1": "Настраиваемые кубики онлайн",
    "lead": "Лучший бесплатный цифровой кубик, где ВЫ определяете правила!",
    "roll": "Бросить кубики!",
    "customize": "Настроить кубики",
    "configure": "Настройте свои кубики",
    "add_dice": "Добавить новый кубик",
    "reset": "Сбросить к точкам",
    "placeholder": "Добавить грань (напр. Поцелуй, 6, 🍕)...",
    "dice_label": "Кубик",
    "seo_description": "Создавайте и бросайте свои собственные настраиваемые кубики онлайн бесплатно. Добавляйте числа, текст или эмодзи.",
    "seo_keywords": "настраиваемые кубики онлайн, виртуальные кубики, цифровые кубики, бесплатные кубики",
    "why_title": "Почему стоит использовать наши кубики?",
    "why_p": "Наш генератор <strong>настраиваемых кубиков онлайн</strong> — самый гибкий инструмент.",
    "features_title": "Основные характеристики",
    "feature1": "<strong>Полностью бесплатно:</strong> Регистрация не требуется.",
    "feature2": "<strong>Безграничные возможности:</strong> Любое количество граней.",
    "feature3": "<strong>Текст и числа:</strong> Числа, слова или эмодзи.",
    "feature4": "<strong>Поддержка нескольких кубиков:</strong> Бросайте всё сразу.",
    "feature5": "<strong>Мгновенный результат:</strong> Плавная анимация.",
    "how_title": "Как создать свои кубики",
    "step1": "Нажмите кнопку <strong>\"Настроить кубики\"</strong>.",
    "step2": "Редактируйте старые или добавьте новые.",
    "step3": "Введите текст и нажмите Enter.",
    "step4": "Нажмите \"X\" для удаления.",
    "step5": "Нажмите <strong>\"Бросить кубики!\"</strong>.",
    "perfect_title": "Идеально для любого случая",
    "perfect_p": "Инструмент <strong>настраиваемые кубики онлайн</strong> идеален для:",
    "usage1": "<strong>Настольные игры:</strong> Замена потерянных кубиков.",
    "usage2": "<strong>Образование:</strong> Случайный выбор ученика.",
    "usage3": "<strong>Принятие решений:</strong> Что поесть или посмотреть?",
    "usage4": "<strong>Ролевые игры:</strong> Специальные кубики для D&D.",
    "faq_title": "Часто задаваемые вопросы",
    "q1": "Сохраняются ли данные?",
    "a1": "Да! Ваши настройки сохраняются локально в браузере.",
    "q2": "Можно ли использовать эмодзи?",
    "a2": "Конечно! Просто вставьте эмодзи в поле.",
    "nav_name": "Свои Кубики"
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
