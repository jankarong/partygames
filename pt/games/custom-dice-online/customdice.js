const translations = {
    "title": "Dados Personalizados Online - Gerador de Dados Digitais Customizáveis Grátis",
    "h1": "Dados Personalizados Online",
    "lead": "O simulador de dados digital gratuito onde VOCÊ define as regras!",
    "roll": "Jogar Dados!",
    "customize": "Personalizar Dados",
    "configure": "Configure seus Dados",
    "add_dice": "Adicionar Novo Dado",
    "reset": "Resetar para Pontos",
    "placeholder": "Adicionar face (ex: Beijo, 6, 🍕)...",
    "dice_label": "Dado",
    "seo_description": "Crie e lance seus próprios dados personalizados online gratuitamente. Adicione números, texto ou emojis. Perfeito para jogos de tabuleiro e decisões.",
    "seo_keywords": "dados personalizados online, dados virtuais, simulador de dados, dados grátis",
    "why_title": "Por que usar nossos dados personalizados?",
    "why_p": "Nosso gerador de <strong>dados personalizados online</strong> é a ferramenta mais flexível para jogadores e professores.",
    "features_title": "Principais Características",
    "feature1": "<strong>Totalmente Grátis :</strong> Sem necessidade de registro.",
    "feature2": "<strong>Opções Ilimitadas :</strong> Adicione quantas faces desejar.",
    "feature3": "<strong>Texto e Números :</strong> Números, palavras ou emojis.",
    "feature4": "<strong>Suporte a Vários Dados :</strong> Jogue vários dados de uma vez.",
    "feature5": "<strong>Resultados Instantâneos :</strong> Animações realistas.",
    "how_title": "Como criar seus próprios dados",
    "step1": "Clique em <strong>\"Personalizar Dados\"</strong>.",
    "step2": "Edite ou adicione novos dados.",
    "step3": "Digite o texto e aperte Enter.",
    "step4": "Clique no \"X\" para remover.",
    "step5": "Clique em <strong>\"Jogar Dados!\"</strong>.",
    "perfect_title": "Perfeito para Qualquer Ocasião",
    "perfect_p": "A ferramenta de <strong>dados personalizados online</strong> é ideal para:",
    "usage1": "<strong>Jogos de Tabuleiro :</strong> Substituir dados perdidos.",
    "usage2": "<strong>Educação :</strong> Seleção aleatória de alunos.",
    "usage3": "<strong>Decisões :</strong> O que comer ou assistir?",
    "usage4": "<strong>RPG :</strong> Dados especiais para suas sessões.",
    "faq_title": "Perguntas Frequentes",
    "q1": "Meus dados são salvos?",
    "a1": "Sim! Suas configurações são salvas no armazenamento local do navegador.",
    "q2": "Posso usar emojis?",
    "a2": "Com certeza! Você pode colar emojis nos campos.",
    "nav_name": "Dados Personalizados"
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
