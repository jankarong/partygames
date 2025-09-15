class LastShotGame {
    constructor() {
        this.chambers = [];
        this.currentChamber = 0;
        this.shotsInPool = 0;
        this.blankChambers = 5;
        this.bulletChambers = 1;
        this.gameActive = false;
        this.totalChambers = 0;

        // Initialize audio
        this.hollowClickSound = new Audio('./hollow-click.mp3');
        this.bangSound = new Audio('./bang.mp3');
        this.setupAudio();
    }

    setupAudio() {
        // Set initial volume levels
        this.hollowClickSound.volume = 0.7;
        this.bangSound.volume = 0.8;

        // Preload audio files
        this.hollowClickSound.preload = 'auto';
        this.bangSound.preload = 'auto';

        // Audio state
        this.isMuted = false;
        this.volume = 0.75; // 75%
    }

    playSound(soundType) {
        if (this.isMuted) return;

        try {
            if (soundType === 'hollow') {
                this.hollowClickSound.volume = this.volume * 0.7;
                this.hollowClickSound.currentTime = 0; // Reset to beginning
                this.hollowClickSound.play().catch(e => console.log('Audio play failed:', e));
            } else if (soundType === 'bang') {
                this.bangSound.volume = this.volume * 0.8;
                this.bangSound.currentTime = 0; // Reset to beginning
                this.bangSound.play().catch(e => console.log('Audio play failed:', e));
            }
        } catch (error) {
            console.log('Audio error:', error);
        }
    }

    setVolume(volume) {
        this.volume = volume / 100; // Convert percentage to decimal
        this.hollowClickSound.volume = this.volume * 0.7;
        this.bangSound.volume = this.volume * 0.8;
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        const muteButton = document.getElementById('muteButton');
        if (this.isMuted) {
            muteButton.textContent = '🔇 声音关闭';
            muteButton.classList.remove('btn-secondary');
            muteButton.classList.add('btn-dark');
        } else {
            muteButton.textContent = '🔊 声音开启';
            muteButton.classList.remove('btn-dark');
            muteButton.classList.add('btn-secondary');
        }
    }

    startNewRound() {
        this.blankChambers = parseInt(document.getElementById('blankChambers').value);
        this.bulletChambers = parseInt(document.getElementById('bulletChambers').value);
        this.totalChambers = this.blankChambers + this.bulletChambers;

        if (this.totalChambers > 100) {
            alert('Maximum 100 chambers allowed! Please reduce the number of blank chambers.');
            return;
        }

        if (this.blankChambers < 1) {
            alert('You need at least 1 blank chamber!');
            return;
        }

        this.chambers = [];
        this.currentChamber = 0;
        this.shotsInPool = 0;
        this.gameActive = true;

        for (let i = 0; i < this.blankChambers; i++) {
            this.chambers.push('blank');
        }
        for (let i = 0; i < this.bulletChambers; i++) {
            this.chambers.push('bullet');
        }

        this.shuffleChambers();
        this.updateUI();
        this.showGameSection();
        this.updateCylinderDisplay();
        this.announce('Game ready! First player, press Space to pull.');
    }

    shuffleChambers() {
        // Use crypto.getRandomValues for better randomness if available
        const getRandomValue = () => {
            if (window.crypto && window.crypto.getRandomValues) {
                const array = new Uint32Array(1);
                window.crypto.getRandomValues(array);
                return array[0] / (0xffffffff + 1);
            }
            return Math.random();
        };

        // Fisher-Yates shuffle with better random source
        for (let i = this.chambers.length - 1; i > 0; i--) {
            const j = Math.floor(getRandomValue() * (i + 1));
            [this.chambers[i], this.chambers[j]] = [this.chambers[j], this.chambers[i]];
        }

    }

    pullTrigger() {
        if (!this.gameActive || this.currentChamber >= this.chambers.length) {
            return;
        }

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
                this.handleBlankChamber();
                resultText.textContent = '🔘 空弹！你现在安全了...';
                resultDisplay.className = 'result-display safe';
                addShotButton.style.display = 'inline-block';

                setTimeout(() => {
                    addShotButton.style.display = 'none';
                    triggerButton.disabled = false;
                }, 3000);
            } else {
                this.playSound('bang');
                this.handleBulletChamber();
                resultText.textContent = `💥 实弹！喝掉所有 ${this.shotsInPool} 杯酒！`;
                resultDisplay.className = 'result-display danger';

                setTimeout(() => {
                    this.endRound();
                }, 3000);
            }

            this.currentChamber++;
            this.updateUI();
            this.updateCylinderDisplay();
        }, 1000);
    }

    announce(message) {
        const live = document.getElementById('resultText');
        if (live) {
            live.textContent = message;
        }
    }

    handleBlankChamber() {
        const chambers = document.querySelectorAll('.cylinder-chamber');
        if (chambers[this.currentChamber]) {
            chambers[this.currentChamber].classList.add('fired-blank');
        }
    }

    handleBulletChamber() {
        const chambers = document.querySelectorAll('.cylinder-chamber');
        if (chambers[this.currentChamber]) {
            chambers[this.currentChamber].classList.add('fired-bullet');
        }
        this.gameActive = false;
    }

    addShot() {
        this.shotsInPool++;
        this.updateUI();

        const resultText = document.getElementById('resultText');
        resultText.textContent = `🥃 已添加酒！酒池现在有 ${this.shotsInPool} 杯。`;

        setTimeout(() => {
            if (this.gameActive && this.currentChamber < this.chambers.length) {
                resultText.textContent = '下一位玩家的回合！点击"扣扳机"。';
            }
        }, 2000);
    }

    animateRevolver() {
        const cylinder = document.getElementById('revolverCylinder');
        cylinder.style.transform = 'rotate(60deg)';

        setTimeout(() => {
            cylinder.style.transform = 'rotate(0deg)';
        }, 500);
    }

    updateCylinderDisplay() {
        const cylinder = document.getElementById('revolverCylinder');

        // For larger numbers of chambers, show progress instead of individual chambers
        if (this.totalChambers > 6) {
            cylinder.innerHTML = `
                <div class="chamber-progress">
                    <div class="progress-text">Chamber ${this.currentChamber + 1}/${this.totalChambers}</div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${(this.currentChamber / this.totalChambers) * 100}%"></div>
                    </div>
                </div>
            `;
        } else {
            // Keep the original 6-chamber visual for smaller counts
            cylinder.innerHTML = `
                <div class="cylinder-chamber" data-chamber="0"></div>
                <div class="cylinder-chamber" data-chamber="1"></div>
                <div class="cylinder-chamber" data-chamber="2"></div>
                <div class="cylinder-chamber" data-chamber="3"></div>
                <div class="cylinder-chamber" data-chamber="4"></div>
                <div class="cylinder-chamber" data-chamber="5"></div>
            `;

            const chambers = document.querySelectorAll('.cylinder-chamber');
            chambers.forEach((chamber, index) => {
                chamber.className = 'cylinder-chamber';
                chamber.style.display = index < this.totalChambers ? 'block' : 'none';

                if (index === this.currentChamber && this.gameActive) {
                    chamber.classList.add('current');
                } else if (index < this.currentChamber) {
                    if (this.chambers[index] === 'blank') {
                        chamber.classList.add('fired-blank');
                    } else {
                        chamber.classList.add('fired-bullet');
                    }
                }
            });
        }
    }

    endRound() {
        this.gameActive = false;
        const resultText = document.getElementById('resultText');
        const triggerButton = document.getElementById('triggerButton');
        const newRoundButton = document.getElementById('newRoundButton');

        if (this.shotsInPool === 0) {
            resultText.textContent = '💥 幸运逃脱！酒池里没有酒！准备新回合吗？';
        } else {
            resultText.textContent = `💥 游戏结束！喝掉 ${this.shotsInPool} 杯酒，准备好后开始新回合！`;
        }

        triggerButton.style.display = 'none';
        newRoundButton.style.display = 'inline-block';
    }

    updateUI() {
        document.getElementById('shotsInPool').textContent = this.shotsInPool;
        document.getElementById('chambersLeft').textContent = this.chambers.length - this.currentChamber;
    }

    showGameSection() {
        document.getElementById('gameSetup').style.display = 'none';
        document.getElementById('gameSection').style.display = 'block';
        document.getElementById('resultText').textContent = '游戏准备就绪！第一位玩家，点击"扣扳机"！';
        this.announce('Game ready! First player, press Space to pull.');
        document.getElementById('resultDisplay').className = 'result-display';
        document.getElementById('triggerButton').style.display = 'inline-block';
        document.getElementById('triggerButton').disabled = false;
        document.getElementById('newRoundButton').style.display = 'none';
    }

    startNewRoundInGame() {
        // Use the same settings as current game
        this.chambers = [];
        this.currentChamber = 0;
        this.shotsInPool = 0;
        this.gameActive = true;

        // Recreate chambers with same configuration
        for (let i = 0; i < this.blankChambers; i++) {
            this.chambers.push('blank');
        }
        for (let i = 0; i < this.bulletChambers; i++) {
            this.chambers.push('bullet');
        }

        this.shuffleChambers();
        this.updateUI();
        this.updateCylinderDisplay();

        // Update UI for new round
        document.getElementById('resultText').textContent = '新回合开始！第一位玩家，点击"扣扳机"！';
        this.announce('New round started! Press Space to pull.');
        document.getElementById('resultDisplay').className = 'result-display';
        document.getElementById('triggerButton').style.display = 'inline-block';
        document.getElementById('triggerButton').disabled = false;
        document.getElementById('newRoundButton').style.display = 'none';
    }

    showSetupSection() {
        document.getElementById('gameSetup').style.display = 'block';
        document.getElementById('gameSection').style.display = 'none';
    }

    resetGame() {
        this.showSetupSection();
    }
}

const game = new LastShotGame();

function startNewRound() {
    game.startNewRound();
}

function pullTrigger() {
    game.pullTrigger();
}

function addShot() {
    game.addShot();
}

function resetGame() {
    game.resetGame();
}

function toggleMute() {
    game.toggleMute();
}

function startNewRoundFromGame() {
    game.startNewRoundInGame();
}


window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('blankChambers').addEventListener('input', function () {
        const value = parseInt(this.value);
        if (value < 1) this.value = 1;
        if (value > 99) this.value = 99;
    });

    // Volume slider event listener
    document.getElementById('volumeSlider').addEventListener('input', function () {
        game.setVolume(this.value);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable)) {
            return;
        }
        if (e.code === 'Space') {
            e.preventDefault();
            const btn = document.getElementById('triggerButton');
            if (btn && btn.style.display !== 'none' && !btn.disabled) {
                pullTrigger();
            }
        } else if (e.key.toLowerCase() === 'n') {
            const btn = document.getElementById('newRoundButton');
            if (btn && btn.style.display !== 'none') {
                startNewRoundFromGame();
            }
        } else if (e.key.toLowerCase() === 'r') {
            resetGame();
        }
    });
});