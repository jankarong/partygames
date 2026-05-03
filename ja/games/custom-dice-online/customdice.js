const translations = {
    "title": "カスタムダイスオンライン - 無料のカスタマイズ可能なデジタルダイスジェネレーター",
    "h1": "カスタムダイスオンライン",
    "lead": "あなたがルールを決める、究極の無料デジタルダイスローラー！",
    "roll": "ダイスを振る！",
    "customize": "ダイスをカスタマイズ",
    "configure": "ダイスの設定",
    "add_dice": "新しいダイスを追加",
    "reset": "ドットに戻す",
    "placeholder": "面を追加（例：キス, 6, 🍕）...",
    "dice_label": "ダイス",
    "seo_description": "無料で自分専用のカスタムダイスをオンラインで作成して振ることができます。数字、テキスト、絵文字を追加可能。ボードゲームや意思決定に最適。",
    "seo_keywords": "カスタムダイスオンライン, 仮想ダイス, カスタマイズ可能なダイス, デジタルダイス",
    "why_title": "なぜ当サイトのカスタムダイスを使うのか？",
    "why_p": "当サイトの<strong>カスタムダイスオンライン</strong>ジェネレーターは、ゲーマーや教師にとって最も柔軟なツールです。",
    "features_title": "主な特徴",
    "feature1": "<strong>完全に無料：</strong> 登録や支払いは不要です。",
    "feature2": "<strong>無制限のオプション：</strong> 好きなだけ面を追加できます。",
    "feature3": "<strong>テキストと数字：</strong> 数字、単語、絵文字も使えます。",
    "feature4": "<strong>マルチダイス対応：</strong> 複数のダイスを一度に振れます。",
    "feature5": "<strong>即時の結果：</strong> スムーズなアニメーション。",
    "how_title": "カスタムダイスの作り方",
    "step1": "<strong>「ダイスをカスタマイズ」</strong>ボタンをクリック。",
    "step2": "既存のダイスを編集するか、新しいダイスを追加。",
    "step3": "入力ボックスにテキストを入力してEnterキー。",
    "step4": "「X」をクリックして削除。",
    "step5": "<strong>「ダイスを振る！」</strong>ボタンをクリック！",
    "perfect_title": "あらゆるシーンに最適",
    "perfect_p": "<strong>カスタムダイスオンライン</strong>は以下のような場面で役立ちます：",
    "usage1": "<strong>ボードゲーム：</strong> なくしたダイスの代わりに。",
    "usage2": "<strong>教育：</strong> 生徒のランダム指名に。",
    "usage3": "<strong>意思決定：</strong> 晩ご飯に迷ったときに。",
    "usage4": "<strong>ロールプレイング：</strong> D&Dの特殊なダイスとして。",
    "faq_title": "よくある質問",
    "q1": "ダイスのデータは保存されますか？",
    "a1": "はい！ブラウザのローカルストレージに自動的に保存されます。",
    "q2": "絵文字は使えますか？",
    "a2": "もちろんです！絵文字をコピーして貼り付けることができます。",
    "nav_name": "カスタムダイス"
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
