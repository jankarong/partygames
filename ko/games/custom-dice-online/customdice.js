const translations = {
    "title": "커스텀 주사위 온라인 - 무료 맞춤형 디지털 주사위 생성기",
    "h1": "커스텀 주사위 온라인",
    "lead": "당신이 규칙을 정하는 궁극의 무료 디지털 주사위 굴리기!",
    "roll": "주사위 굴리기!",
    "customize": "주사위 맞춤 설정",
    "configure": "주사위 구성",
    "add_dice": "새 주사위 추가",
    "reset": "점으로 재설정",
    "placeholder": "면 추가 (예: 키스, 6, 🍕)...",
    "dice_label": "주사위",
    "seo_description": "온라인에서 무료로 자신만의 커스텀 주사위를 만들고 굴려보세요. 숫자, 텍스트, 이모지를 추가할 수 있습니다. 보드 게임이나 의사 결정에 완벽합니다.",
    "seo_keywords": "커스텀 주사위 온라인, 가상 주사위, 디지털 주사위, 무료 주사위",
    "why_title": "왜 우리의 커스텀 주사위를 사용해야 할까요?",
    "why_p": "우리의 <strong>커스텀 주사위 온라인</strong> 생성기는 게이머와 교사를 위한 가장 유연한 도구입니다.",
    "features_title": "주요 기능",
    "feature1": "<strong>완전 무료:</strong> 가입이나 결제가 필요 없습니다.",
    "feature2": "<strong>무제한 옵션:</strong> 원하는 만큼 면을 추가하세요.",
    "feature3": "<strong>텍스트 및 숫자:</strong> 숫자, 단어, 이모지 모두 가능합니다.",
    "feature4": "<strong>멀티 주사위 지원:</strong> 여러 개의 주사위를 한 번에 굴리세요.",
    "feature5": "<strong>즉각적인 결과:</strong> 부드러운 애니메이션.",
    "how_title": "커스텀 주사위 만드는 법",
    "step1": "<strong>\"주사위 맞춤 설정\"</strong> 버튼을 클릭하세요.",
    "step2": "기존 주사위를 편집하거나 새 주사위를 추가하세요.",
    "step3": "텍스트를 입력하고 엔터를 누르세요.",
    "step4": "제거하려면 \"X\"를 클릭하세요.",
    "step5": "<strong>\"주사위 굴리기!\"</strong> 버튼을 누르세요!",
    "perfect_title": "모든 상황에 완벽함",
    "perfect_p": "<strong>커스텀 주사위 온라인</strong> 도구는 다음에 적합합니다:",
    "usage1": "<strong>보드 게임:</strong> 잃어버린 주사위 대체.",
    "usage2": "<strong>교육:</strong> 학생 무작위 추첨.",
    "usage3": "<strong>의사 결정:</strong> 오늘 뭐 먹지? 고민 해결!",
    "usage4": "<strong>롤플레잉:</strong> D&D용 특수 주사위.",
    "faq_title": "자주 묻는 질문",
    "q1": "주사위 데이터가 저장되나요?",
    "a1": "네! 설정은 브라우저의 로컬 스토리지에 자동으로 저장됩니다.",
    "q2": "이모지를 사용할 수 있나요?",
    "a2": "당연하죠! 이모지를 복사해서 붙여넣으세요.",
    "nav_name": "커스텀 주사위"
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
