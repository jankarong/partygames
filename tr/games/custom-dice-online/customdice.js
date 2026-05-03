const translations = {
    "title": "Özel Zar Çevrimiçi - Ücretsiz Özelleştirilebilir Dijital Zar Oluşturucu",
    "h1": "Özel Zar Çevrimiçi",
    "lead": "Kuralları SİZİN belirlediğiniz nihai ücretsiz dijital zar sallayıcı!",
    "roll": "Zarları Sallay!",
    "customize": "Zarları Özelleştir",
    "configure": "Zarlarınızı Yapılandırın",
    "add_dice": "Yeni Zar Ekle",
    "reset": "Noktalara Sıfırla",
    "placeholder": "Yüz ekle (örn. Öpücük, 6, 🍕)...",
    "dice_label": "Zar",
    "seo_description": "Kendi özel zarlarınızı çevrimiçi olarak ücretsiz oluşturun ve sallayın. Sayılar, metinler veya emojiler ekleyin.",
    "seo_keywords": "özel zar çevrimiçi, sanal zar, dijital zar, ücretsiz zar",
    "why_title": "Neden Bizim Özel Zarımızı Kullanmalısınız?",
    "why_p": "<strong>Özel zar çevrimiçi</strong> oluşturucumuz, oyuncular ve öğretmenler için en esnek araçtır.",
    "features_title": "Temel Özellikler",
    "feature1": "<strong>Tamamen Ücretsiz:</strong> Kayıt gerekmez.",
    "feature2": "<strong>Sınırsız Seçenek:</strong> İstediğiniz kadar yüz ekleyin.",
    "feature3": "<strong>Metin ve Sayılar:</strong> Sayılar, kelimeler veya emojiler.",
    "feature4": "<strong>Çoklu Zar Desteği:</strong> Hepsini aynı anda sallayın.",
    "feature5": "<strong>Anında Sonuçlar:</strong> Akıcı animasyonlar.",
    "how_title": "Kendi Özel Zarınızı Nasıl Oluşturursunuz?",
    "step1": "<strong>\"Zarları Özelleştir\"</strong> butonuna tıklayın.",
    "step2": "Mevcut zarları düzenleyin veya yeni ekleyin.",
    "step3": "Metninizi girin ve Enter'a basın.",
    "step4": "Kaldırmak için \"X\"e tıklayın.",
    "step5": "<strong>\"Zarları Sallay!\"</strong> butonuna basın!",
    "perfect_title": "Her Durum İçin Mükemmel",
    "perfect_p": "<strong>Özel zar çevrimiçi</strong> aracı şunlar için mükemmeldir:",
    "usage1": "<strong>Masa Oyunları:</strong> Kayıp zarları değiştirin.",
    "usage2": "<strong>Eğitim:</strong> Rastgele öğrenci seçimi.",
    "usage3": "<strong>Karar Verme:</strong> Ne yiyeceğinize karar veremiyor musunuz?",
    "usage4": "<strong>Rol Yapma:</strong> D&D için özel zarlar.",
    "faq_title": "Sıkça Sorulan Sorular",
    "q1": "Zar verilerim kaydediliyor mu?",
    "a1": "Evet! Ayarlarınız tarayıcınızın yerel depolama alanına kaydedilir.",
    "q2": "Zarlarda emoji kullanabilir miyim?",
    "a2": "Kesinlikle! Seçenek alanlarına emoji yapıştırabilirsiniz.",
    "nav_name": "Özel Zar"
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
