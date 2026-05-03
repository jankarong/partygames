const translations = {
    "title": "Dadu Kustom Online - Generator Dadu Digital Gratis yang Dapat Dikustomisasi",
    "h1": "Dadu Kustom Online",
    "lead": "Pelempar dadu digital gratis terbaik di mana ANDA yang menentukan aturannya!",
    "roll": "Lempar Dadu!",
    "customize": "Kustomisasi Dadu",
    "configure": "Konfigurasi Dadu Anda",
    "add_dice": "Tambah Dadu Baru",
    "reset": "Reset ke Titik",
    "placeholder": "Tambah sisi (misal: Cium, 6, 🍕)...",
    "dice_label": "Dadu",
    "seo_description": "Buat dan lempar dadu kustom Anda sendiri secara online gratis. Tambahkan angka, teks, atau emoji. Sempurna untuk permainan papan dan pengambilan keputusan.",
    "seo_keywords": "dadu kustom online, dadu virtual, pelempar dadu digital, dadu gratis",
    "why_title": "Mengapa Menggunakan Dadu Kustom Kami?",
    "why_p": "Generator <strong>dadu kustom online</strong> kami dirancang untuk menjadi alat paling fleksibel bagi gamer dan guru.",
    "features_title": "Fitur Utama",
    "feature1": "<strong>Sepenuhnya Gratis:</strong> Tidak perlu pendaftaran.",
    "feature2": "<strong>Opsi Tanpa Batas:</strong> Tambah sisi sebanyak yang Anda mau.",
    "feature3": "<strong>Teks & Angka:</strong> Angka, kata-kata, atau emoji.",
    "feature4": "<strong>Dukungan Multi-Dadu:</strong> Lempar banyak dadu sekaligus.",
    "feature5": "<strong>Hasil Instan:</strong> Animasi yang halus.",
    "how_title": "Cara Membuat Dadu Kustom Sendiri",
    "step1": "Klik tombol <strong>\"Kustomisasi Dadu\"</strong>.",
    "step2": "Edit dadu yang ada atau tambah yang baru.",
    "step3": "Masukkan teks kustom Anda dan tekan Enter.",
    "step4": "Klik \"X\" untuk menghapus opsi.",
    "step5": "Tekan tombol <strong>\"Lempar Dadu!\"</strong>.",
    "perfect_title": "Sempurna Untuk Segala Acara",
    "perfect_p": "Alat <strong>dadu kustom online</strong> sangat cocok untuk:",
    "usage1": "<strong>Permainan Papan:</strong> Ganti dadu yang hilang.",
    "usage2": "<strong>Pendidikan:</strong> Pemilihan siswa secara acak.",
    "usage3": "<strong>Pengambilan Keputusan:</strong> Bingung mau makan apa?",
    "usage4": "<strong>Roleplaying:</strong> Dadu khusus untuk sesi D&D.",
    "faq_title": "Pertanyaan Umum",
    "q1": "Apakah data dadu saya disimpan?",
    "a1": "Ya! Pengaturan Anda disimpan di penyimpanan lokal browser Anda.",
    "q2": "Bisakah saya menggunakan emoji?",
    "a2": "Tentu saja! Anda bisa menempelkan emoji ke kolom opsi.",
    "nav_name": "Dadu Kustom"
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
