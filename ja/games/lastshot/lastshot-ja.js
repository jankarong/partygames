// Last Shot Game Logic - Japanese Version
const lastShotTranslations = {
    messages: {
        soundOff: '🔇 音声オフ',
        soundOn: '🔊 音声オン',
        maxChambers: '最大100室までです。空室の数を減らしてください。',
        minChambers: '空室を最低1つ入れてください！',
        readyKeyboard: '準備完了！ 最初の人はスペースキーで引いてください。',
        readyClick: '準備完了！ 最初の人は「引き金を引く」を押してください。',
        blank: '🔘 空室！ 今回はセーフです。',
        bullet: '💥 弾！ たまった',
        shots: '杯を飲んで！',
        shotAdded: '🥃 1杯追加！',
        poolHas: '現在のプールは',
        nextTurn: '次の人の番です！ 「引き金を引く」を押してください。',
        lucky: '💥 危機一髪！ プールは0杯です。次のラウンドへ行きますか？',
        gameOver: '💥 ゲーム終了！',
        drinkAndStart: '杯飲んで、落ち着いたら新しいラウンドへ！',
        newRound: '新しいラウンド',
        pullTrigger: '引き金を引く'
    }
};

class LastShotGame {
    constructor() {
        this.chambers = [];
        this.currentChamber = 0;
        this.shotsInPool = 0;
        this.blankChambers = 5;
        this.bulletChambers = 1;
        this.gameActive = false;
        this.totalChambers = 0;
        this.hollowClickSound = new Audio('./hollow-click.mp3');
        this.bangSound = new Audio('./bang.mp3');
        this.isMuted = false;
        this.volume = 0.75;
    }

    playSound(soundType) {
        if (this.isMuted) return;
        try {
            const sound = soundType === 'hollow' ? this.hollowClickSound : this.bangSound;
            sound.volume = this.volume * (soundType === 'hollow' ? 0.7 : 0.8);
            sound.currentTime = 0;
            sound.play().catch(e => console.log('Audio play failed:', e));
        } catch (error) { console.log('Audio error:', error); }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        const muteButton = document.getElementById('muteButton');
        muteButton.textContent = this.isMuted ? lastShotTranslations.messages.soundOff : lastShotTranslations.messages.soundOn;
    }

    startNewRound() {
        this.blankChambers = parseInt(document.getElementById('blankChambers').value);
        this.bulletChambers = 1; // Always 1 for Japanese version logic
        this.totalChambers = this.blankChambers + this.bulletChambers;

        if (this.totalChambers > 100) { alert(lastShotTranslations.messages.maxChambers); return; }
        if (this.blankChambers < 1) { alert(lastShotTranslations.messages.minChambers); return; }

        this.chambers = Array(this.blankChambers).fill('blank').concat(Array(this.bulletChambers).fill('bullet'));
        this.currentChamber = 0;
        this.shotsInPool = 0;
        this.gameActive = true;
        this.shuffleChambers();
        this.updateUI();
        this.showGameSection();
        this.updateCylinderDisplay();
    }

    shuffleChambers() {
        for (let i = this.chambers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.chambers[i], this.chambers[j]] = [this.chambers[j], this.chambers[i]];
        }
    }

    pullTrigger() {
        if (!this.gameActive || this.currentChamber >= this.chambers.length) return;
        const chamber = this.chambers[this.currentChamber];
        const triggerButton = document.getElementById('triggerButton');
        const resultDisplay = document.getElementById('resultDisplay');
        const resultText = document.getElementById('resultText');
        const addShotButton = document.getElementById('addShotButton');

        triggerButton.disabled = true;
        this.animateRevolver();

        setTimeout(() => {
            if (chamber === 'blank') {
                this.playSound('hollow');
                resultText.textContent = lastShotTranslations.messages.blank;
                resultDisplay.className = 'result-display safe';
                addShotButton.style.display = 'inline-block';
                setTimeout(() => {
                    addShotButton.style.display = 'none';
                    triggerButton.disabled = false;
                    if (this.gameActive) resultText.textContent = lastShotTranslations.messages.nextTurn;
                }, 2500);
            } else {
                this.playSound('bang');
                this.gameActive = false;
                resultText.textContent = `${lastShotTranslations.messages.bullet} ${this.shotsInPool} ${lastShotTranslations.messages.shots}`;
                resultDisplay.className = 'result-display danger';
                setTimeout(() => { this.endRound(); }, 3000);
            }
            this.currentChamber++;
            this.updateUI();
            this.updateCylinderDisplay();
        }, 1000);
    }

    addShot() {
        this.shotsInPool++;
        this.updateUI();
        document.getElementById('resultText').textContent = `${lastShotTranslations.messages.shotAdded} ${lastShotTranslations.messages.poolHas} ${this.shotsInPool} 杯`;
    }

    animateRevolver() {
        const cylinder = document.getElementById('revolverCylinder');
        cylinder.style.transform = 'rotate(60deg)';
        setTimeout(() => { cylinder.style.transform = 'rotate(0deg)'; }, 500);
    }

    updateCylinderDisplay() {
        const cylinder = document.getElementById('revolverCylinder');
        if (this.totalChambers > 6) {
            cylinder.innerHTML = `<div class="chamber-progress"><div class="progress-text">${this.currentChamber + 1}/${this.totalChambers}</div><div class="progress-bar-container"><div class="progress-bar" style="width: ${(this.currentChamber / this.totalChambers) * 100}%"></div></div></div>`;
        } else {
            cylinder.innerHTML = '';
            for (let i = 0; i < 6; i++) {
                const chamber = document.createElement('div');
                chamber.className = 'cylinder-chamber';
                chamber.style.display = i < this.totalChambers ? 'block' : 'none';
                if (i === this.currentChamber && this.gameActive) chamber.classList.add('current');
                else if (i < this.currentChamber) chamber.classList.add(this.chambers[i] === 'blank' ? 'fired-blank' : 'fired-bullet');
                cylinder.appendChild(chamber);
            }
        }
    }

    endRound() {
        this.gameActive = false;
        const resultText = document.getElementById('resultText');
        if (this.shotsInPool === 0) resultText.textContent = lastShotTranslations.messages.lucky;
        else resultText.textContent = `${lastShotTranslations.messages.gameOver} ${this.shotsInPool} ${lastShotTranslations.messages.drinkAndStart}`;
        document.getElementById('triggerButton').style.display = 'none';
        document.getElementById('newRoundButton').style.display = 'inline-block';
    }

    updateUI() {
        document.getElementById('shotsInPool').textContent = this.shotsInPool;
        document.getElementById('chambersLeft').textContent = this.chambers.length - this.currentChamber;
    }

    showGameSection() {
        document.getElementById('gameSetup').style.display = 'none';
        document.getElementById('gameSection').style.display = 'block';
        document.getElementById('resultText').textContent = lastShotTranslations.messages.readyClick;
        document.getElementById('resultDisplay').className = 'result-display';
        document.getElementById('triggerButton').style.display = 'inline-block';
        document.getElementById('triggerButton').disabled = false;
        document.getElementById('newRoundButton').style.display = 'none';
    }

    resetGame() {
        document.getElementById('gameSetup').style.display = 'block';
        document.getElementById('gameSection').style.display = 'none';
    }
}

const game = new LastShotGame();
function startNewRound() { game.startNewRound(); }
function pullTrigger() { game.pullTrigger(); }
function addShot() { game.addShot(); }
function resetGame() { game.resetGame(); }
function toggleMute() { game.toggleMute(); }
function startNewRoundFromGame() { game.startNewRound(); }

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('volumeSlider').addEventListener('input', function() { game.volume = this.value / 100; });
});
