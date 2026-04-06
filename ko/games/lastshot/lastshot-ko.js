// Last Shot Game Logic - Korean Version
const lastShotTranslations = {
    messages: {
        soundOff: '🔇 소리 끄기',
        soundOn: '🔊 소리 켜기',
        maxChambers: '최대 100칸까지 설정 가능합니다. 빈 칸 수를 조절해 주세요.',
        minChambers: '최소 1개 이상의 빈 칸이 필요합니다!',
        readyClick: '준비 완료! 방아쇠를 당겨 게임을 시작하세요.',
        blank: '세이프! 😅 이번에는 운이 좋았네요.',
        bullet: '당첨! 💥 적립된 ',
        shots: '잔을 모두 마셔주세요!',
        shotAdded: '🥃 1잔이 적립되었습니다!',
        poolHas: '현재 적립량:',
        nextTurn: '다음 차례입니다! 방아쇠를 당기세요.',
        lucky: '💥 위기탈출! 적립된 술이 없네요. 다음 라운드로 진행할까요?',
        gameOver: '💥 라운드 종료!',
        drinkAndStart: '잔을 시원하게 비우고, 다음 라운드를 준비하세요!',
        newRound: '새 라운드',
        pullTrigger: '방아쇠 당기기'
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
        
        // Audio placeholders (assuming files exist or will be handled by UI)
        this.hollowClickSound = new Audio('hollow-click.mp3');
        this.bangSound = new Audio('bang.mp3');
        this.isMuted = false;
        this.volume = 0.75;
    }

    playSound(soundType) {
        if (this.isMuted) return;
        try {
            const sound = soundType === 'hollow' ? this.hollowClickSound : this.bangSound;
            sound.volume = this.volume;
            sound.currentTime = 0;
            sound.play().catch(e => console.log('Audio play failed:', e));
        } catch (error) { console.log('Audio error:', error); }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        const muteButton = document.getElementById('muteButton');
        if (muteButton) muteButton.innerHTML = `<i class="fas fa-volume-${this.isMuted ? 'mute' : 'up'} me-2"></i>${this.isMuted ? lastShotTranslations.messages.soundOff : lastShotTranslations.messages.soundOn}`;
    }

    startNewRound() {
        const blankInput = document.getElementById('blankChambers');
        this.blankChambers = blankInput ? parseInt(blankInput.value) : 5;
        this.bulletChambers = 1; 
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

        if (triggerButton) triggerButton.disabled = true;
        this.animateRevolver();

        setTimeout(() => {
            if (chamber === 'blank') {
                this.playSound('hollow');
                if (resultText) resultText.textContent = lastShotTranslations.messages.blank;
                if (resultDisplay) resultDisplay.className = 'result-display p-4 rounded-4 bg-success text-white shadow-sm mb-4';
                if (addShotButton) addShotButton.style.display = 'inline-block';
                
                setTimeout(() => {
                    if (addShotButton) addShotButton.style.display = 'none';
                    if (triggerButton) triggerButton.disabled = false;
                    if (this.gameActive && resultText) resultText.textContent = lastShotTranslations.messages.nextTurn;
                }, 2000);
            } else {
                this.playSound('bang');
                this.gameActive = false;
                if (resultText) resultText.textContent = `${lastShotTranslations.messages.bullet} ${this.shotsInPool} ${lastShotTranslations.messages.shots}`;
                if (resultDisplay) resultDisplay.className = 'result-display p-4 rounded-4 bg-danger text-white shadow-lg mb-4';
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
        const resultText = document.getElementById('resultText');
        if (resultText) resultText.textContent = `${lastShotTranslations.messages.shotAdded} (${lastShotTranslations.messages.poolHas} ${this.shotsInPool}잔)`;
    }

    animateRevolver() {
        const cylinder = document.getElementById('revolverCylinder');
        if (cylinder) {
            cylinder.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            cylinder.style.transform = `rotate(${Math.random() * 360 + 360}deg)`;
        }
    }

    updateCylinderDisplay() {
        const cylinder = document.getElementById('revolverCylinder');
        if (!cylinder) return;
        
        cylinder.innerHTML = '';
        const centerX = 150 / 2;
        const centerY = 150 / 2;
        const radius = 50;
        
        for (let i = 0; i < this.totalChambers; i++) {
            const chamber = document.createElement('div');
            chamber.className = 'cylinder-chamber-visual position-absolute rounded-circle';
            chamber.style.width = '20px';
            chamber.style.height = '20px';
            chamber.style.backgroundColor = '#666';
            
            const angle = (i / this.totalChambers) * (Math.PI * 2);
            const x = centerX + radius * Math.cos(angle) - 10;
            const y = centerY + radius * Math.sin(angle) - 10;
            
            chamber.style.left = `${x}px`;
            chamber.style.top = `${y}px`;
            
            if (i === this.currentChamber && this.gameActive) {
                chamber.style.backgroundColor = '#ffc107'; // Active
                chamber.classList.add('glow');
            } else if (i < this.currentChamber) {
                chamber.style.backgroundColor = this.chambers[i] === 'blank' ? '#28a745' : '#dc3545';
            }
            
            cylinder.appendChild(chamber);
        }
    }

    endRound() {
        this.gameActive = false;
        const resultText = document.getElementById('resultText');
        if (resultText) {
            if (this.shotsInPool === 0) resultText.textContent = lastShotTranslations.messages.lucky;
            else resultText.textContent = `${lastShotTranslations.messages.gameOver} ${this.shotsInPool}${lastShotTranslations.messages.drinkAndStart}`;
        }
        
        const triggerButton = document.getElementById('triggerButton');
        const newRoundButton = document.getElementById('newRoundButton');
        if (triggerButton) triggerButton.style.display = 'none';
        if (newRoundButton) newRoundButton.style.display = 'inline-block';
    }

    updateUI() {
        const shotEl = document.getElementById('shotsInPool');
        const chamberEl = document.getElementById('chambersLeft');
        if (shotEl) shotEl.textContent = this.shotsInPool;
        if (chamberEl) chamberEl.textContent = this.chambers.length - this.currentChamber;
    }

    showGameSection() {
        const setup = document.getElementById('gameSetup');
        const gameSect = document.getElementById('gameSection');
        if (setup) setup.style.display = 'none';
        if (gameSect) gameSect.style.display = 'block';
        
        const resultText = document.getElementById('resultText');
        const resultDisplay = document.getElementById('resultDisplay');
        const triggerButton = document.getElementById('triggerButton');
        const newRoundButton = document.getElementById('newRoundButton');
        
        if (resultText) resultText.textContent = lastShotTranslations.messages.readyClick;
        if (resultDisplay) resultDisplay.className = 'result-display p-4 rounded-4 bg-light border mb-4';
        if (triggerButton) {
            triggerButton.style.display = 'inline-block';
            triggerButton.disabled = false;
        }
        if (newRoundButton) newRoundButton.style.display = 'none';
    }

    resetGame() {
        const setup = document.getElementById('gameSetup');
        const gameSect = document.getElementById('gameSection');
        if (setup) setup.style.display = 'block';
        if (gameSect) gameSect.style.display = 'none';
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
    const slider = document.getElementById('volumeSlider');
    if (slider) slider.addEventListener('input', function() { game.volume = this.value / 100; });
});
