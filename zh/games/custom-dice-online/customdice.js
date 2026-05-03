const translations = {
    "title": "自定义在线骰子 - 免费自定义数字骰子生成器",
    "h1": "自定义在线骰子",
    "lead": "定义规则的终极免费数字骰子！",
    "roll": "摇骰子！",
    "customize": "自定义骰子",
    "configure": "配置您的骰子",
    "add_dice": "添加新骰子",
    "reset": "重置为点数",
    "placeholder": "添加面（例如：亲亲, 6, 🍕）...",
    "dice_label": "骰子",
    "seo_description": "免费在线创建和滚动您自己的自定义骰子。添加数字、文本或表情符号到您的虚拟骰子。非常适合棋盘游戏、决策和课堂活动。完全可定制且适合移动设备。",
    "seo_keywords": "自定义在线骰子, 虚拟骰子, 可定制骰子, 数字骰子滚动器, 在线文本骰子, 随机决策器, 免费在线骰子",
    "why_title": "为什么使用我们的自定义在线骰子？",
    "why_p": "我们的<strong>自定义在线骰子</strong>生成器旨在成为游戏玩家、教师和决策者最灵活的工具。无论您需要标准的6面骰子，还是带有抽奖名字的骰子，或者是“吃什么”的决策骰子，我们的工具都能轻松处理。",
    "features_title": "自定义在线骰子的关键功能",
    "feature1": "<strong>完全免费：</strong> 无需注册或付费即可使用我们的虚拟骰子。",
    "feature2": "<strong>无限选项：</strong> 为您的骰子添加任意数量的面。",
    "feature3": "<strong>文本和数字：</strong> 您的骰子可以包含数字、文字甚至表情符号。",
    "feature4": "<strong>多骰子支持：</strong> 添加多个骰子并一次性滚动。",
    "feature5": "<strong>即时结果：</strong> 流畅的动画提供真实的滚动体验。",
    "how_title": "如何创建您自己的自定义骰子",
    "step1": "点击<strong>“自定义骰子”</strong>按钮打开设置。",
    "step2": "编辑现有骰子或点击<strong>“添加新骰子”</strong>添加更多。",
    "step3": "在输入框中添加您的自定义文本或数字，然后按回车。",
    "step4": "点击任何选项旁边的“X”将其删除。",
    "step5": "点击<strong>“摇骰子！”</strong>按钮查看您的随机结果！",
    "perfect_title": "适合各种场合",
    "perfect_p": "<strong>自定义在线骰子</strong>工具非常适合各种场景：",
    "usage1": "<strong>棋盘游戏：</strong> 更换丢失的骰子或为自定义规则创建特殊骰子。",
    "usage2": "<strong>教育：</strong> 教师可以用它进行随机学生选择或数学游戏。",
    "usage3": "<strong>决策：</strong> 无法决定看什么或吃什么？让自定义骰子来决定！",
    "usage4": "<strong>角色扮演：</strong> 为您的 D&D 或桌面游戏创建专用骰子。",
    "faq_title": "常见问题",
    "q1": "我的自定义骰子数据会被保存吗？",
    "a1": "是的！您的<strong>自定义在线骰子</strong>设置会自动保存在浏览器的本地存储中，以便您下次访问时随时使用。",
    "q2": "我可以在骰子上使用表情符号吗？",
    "a2": "当然可以！您可以将表情符号粘贴到选项字段中，创建有趣的视觉骰子。",
    "nav_name": "自定义骰子"
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
