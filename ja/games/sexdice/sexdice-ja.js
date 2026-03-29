// Sex Dice Game Logic - Japanese Version
const sexDiceTranslations = {
    defaultActions: ["キスする", "軽く噛む", "撫でる", "マッサージする", "舐める", "息を吹きかける", "愛撫する", "触れる", "焦らす"],
    defaultWheres: ["首筋", "耳", "唇", "胸", "背中", "太もも", "ウエスト", "肩", "腕の内側"],
    defaultTimes: ["5秒間", "10秒間", "15秒間", "20秒間", "25秒間", "30秒間"],
    messages: {
        rolling: "回転中...",
        resultPrefix: "",
        resultSuffix: "を",
        resultTimeSuffix: "の間",
        saveNotification: "保存しました",
        newOption: "新しい項目",
    }
};

class SexDiceGame {
    constructor() {
        this.actions = this.load('diceActions', sexDiceTranslations.defaultActions);
        this.wheres = this.load('diceWheres', sexDiceTranslations.defaultWheres);
        this.times = this.load('diceTimes', sexDiceTranslations.defaultTimes);
        
        this.actionDice = document.getElementById('actionDice');
        this.whereDice = document.getElementById('whereDice');
        this.timeDice = document.getElementById('timeDice');
        this.rollButton = document.getElementById('rollButton');
        this.resultDiv = document.getElementById('result');
        this.settingsPanel = document.getElementById('settingsPanel');
        this.saveNotification = document.getElementById('saveNotification');
        
        this.setupEventListeners();
        this.renderAllOptions();
    }

    load(key, defaultValue) {
        const saved = localStorage.getItem(key + '_ja');
        return saved ? JSON.parse(saved) : [...defaultValue];
    }

    save() {
        localStorage.setItem('diceActions_ja', JSON.stringify(this.actions));
        localStorage.setItem('diceWheres_ja', JSON.stringify(this.wheres));
        localStorage.setItem('diceTimes_ja', JSON.stringify(this.times));
    }

    setupEventListeners() {
        this.rollButton.onclick = () => this.roll();
        document.getElementById('settingsButton').onclick = () => this.settingsPanel.classList.add('open');
        document.querySelector('.close-button').onclick = () => this.settingsPanel.classList.remove('open');
    }

    roll() {
        this.rollButton.disabled = true;
        [this.actionDice, this.whereDice, this.timeDice].forEach(d => {
            d.classList.add('rolling');
            d.querySelector('.dice-text').textContent = sexDiceTranslations.messages.rolling;
        });

        setTimeout(() => {
            const a = this.actions[Math.floor(Math.random() * this.actions.length)];
            const w = this.wheres[Math.floor(Math.random() * this.wheres.length)];
            const t = this.times[Math.floor(Math.random() * this.times.length)];

            this.actionDice.querySelector('.dice-text').textContent = a;
            this.whereDice.querySelector('.dice-text').textContent = w;
            this.timeDice.querySelector('.dice-text').textContent = t;
            this.resultDiv.textContent = `${w}${sexDiceTranslations.messages.resultSuffix} ${a} (${t}${sexDiceTranslations.messages.resultTimeSuffix})`;

            [this.actionDice, this.whereDice, this.timeDice].forEach(d => d.classList.remove('rolling'));
            this.rollButton.disabled = false;
        }, 1000);
    }

    renderOptions(list, containerId, type) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        list.forEach((opt, i) => {
            const div = document.createElement('div');
            div.className = 'dice-option';
            div.innerHTML = `<input type="text" value="${opt}"><span class="delete-btn">×</span>`;
            div.querySelector('input').onchange = (e) => { list[i] = e.target.value; };
            div.querySelector('.delete-btn').onclick = () => { list.splice(i, 1); this.renderAllOptions(); };
            container.appendChild(div);
        });
    }

    renderAllOptions() {
        this.renderOptions(this.actions, 'actionOptions', 'action');
        this.renderOptions(this.wheres, 'whereOptions', 'where');
        this.renderOptions(this.times, 'timeOptions', 'time');
    }

    addOption(type) {
        if (type === 'action') this.actions.push(sexDiceTranslations.messages.newOption);
        else if (type === 'where') this.wheres.push(sexDiceTranslations.messages.newOption);
        else this.times.push("10秒間");
        this.renderAllOptions();
    }

    saveChanges() {
        this.save();
        this.saveNotification.classList.add('show');
        setTimeout(() => this.saveNotification.classList.remove('show'), 2000);
    }

    resetToDefault() {
        this.actions = [...sexDiceTranslations.defaultActions];
        this.wheres = [...sexDiceTranslations.defaultWheres];
        this.times = [...sexDiceTranslations.defaultTimes];
        this.save();
        this.renderAllOptions();
    }
}

window.addEventListener('load', () => {
    const game = new SexDiceGame();
    window.addOption = (t) => game.addOption(t);
    window.saveChanges = () => game.saveChanges();
    window.resetToDefault = () => game.resetToDefault();
});
