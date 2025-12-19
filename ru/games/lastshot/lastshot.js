class LastShotGame {
    constructor() {
        this.chambers = [];
        this.currentChamber = 0;
        this.shotsInPool = 0;
        this.blankChambers = 5;
        this.bulletChambers = 1;
        this.gameActive = false;
        this.totalChambers = 0;

        // Инициализация аудио
        this.hollowClickSound = new Audio('./hollow-click.mp3');
        this.bangSound = new Audio('./bang.mp3');
        this.setupAudio();
    }

    setupAudio() {
        // Установка начальных уровней громкости
        this.hollowClickSound.volume = 0.7;
        this.bangSound.volume = 0.8;

        // Предзагрузка аудиофайлов
        this.hollowClickSound.preload = 'auto';
        this.bangSound.preload = 'auto';

        // Состояние аудио
        this.isMuted = false;
        this.volume = 0.75; // 75%
    }

    playSound(soundType) {
        if (this.isMuted) return;

        try {
            if (soundType === 'hollow') {
                this.hollowClickSound.volume = this.volume * 0.7;
                this.hollowClickSound.currentTime = 0; // Сброс в начало
                this.hollowClickSound.play().catch(e => console.log('Ошибка воспроизведения аудио:', e));
            } else if (soundType === 'bang') {
                this.bangSound.volume = this.volume * 0.8;
                this.bangSound.currentTime = 0; // Сброс в начало
                this.bangSound.play().catch(e => console.log('Ошибка воспроизведения аудио:', e));
            }
        } catch (error) {
            console.log('Ошибка аудио:', error);
        }
    }

    setVolume(volume) {
        this.volume = volume / 100; // Преобразование процентов в десятичное число
        this.hollowClickSound.volume = this.volume * 0.7;
        this.bangSound.volume = this.volume * 0.8;
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        const muteButton = document.getElementById('muteButton');
        if (this.isMuted) {
            muteButton.textContent = '🔇 Звук ВЫКЛ';
            muteButton.classList.remove('btn-secondary');
            muteButton.classList.add('btn-dark');
        } else {
            muteButton.textContent = '🔊 Звук ВКЛ';
            muteButton.classList.remove('btn-dark');
            muteButton.classList.add('btn-secondary');
        }
    }

    startNewRound() {
        this.blankChambers = parseInt(document.getElementById('blankChambers').value);
        this.bulletChambers = parseInt(document.getElementById('bulletChambers').value);
        this.totalChambers = this.blankChambers + this.bulletChambers;

        if (this.totalChambers > 100) {
            alert('Максимум 100 патронов! Пожалуйста, уменьшите количество холостых патронов.');
            return;
        }

        if (this.blankChambers < 1) {
            alert('Нужен хотя бы 1 холостой патрон!');
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
        this.announce('Игра готова! Первый игрок, нажми Пробел для выстрела.');
    }

    shuffleChambers() {
        // Использование crypto.getRandomValues для лучшей случайности, если доступно
        const getRandomValue = () => {
            if (window.crypto && window.crypto.getRandomValues) {
                const array = new Uint32Array(1);
                window.crypto.getRandomValues(array);
                return array[0] / (0xffffffff + 1);
            }
            return Math.random();
        };

        // Тасовка Фишера-Йейтса с улучшенным источником случайности
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
                resultText.textContent = '🔘 ХОЛОСТОЙ! Ты в безопасности... пока что.';
                resultDisplay.className = 'result-display safe';
                addShotButton.style.display = 'inline-block';

                setTimeout(() => {
                    addShotButton.style.display = 'none';
                    triggerButton.disabled = false;
                }, 3000);
            } else {
                this.playSound('bang');
                this.handleBulletChamber();
                resultText.textContent = `💥 ПУЛЯ! Выпей все ${this.shotsInPool} шотов!`;
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
        resultText.textContent = `🥃 Шот добавлен! Теперь в банке ${this.shotsInPool} шотов.`;

        setTimeout(() => {
            if (this.gameActive && this.currentChamber < this.chambers.length) {
                resultText.textContent = 'Следующий игрок! Нажми "Нажать на курок".';
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

        // Для большого количества патронов показываем прогресс вместо отдельных патронов
        if (this.totalChambers > 6) {
            cylinder.innerHTML = `
                <div class="chamber-progress">
                    <div class="progress-text">Патрон ${this.currentChamber + 1}/${this.totalChambers}</div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${(this.currentChamber / this.totalChambers) * 100}%"></div>
                    </div>
                </div>
            `;
        } else {
            // Оставляем оригинальный визуал с 6 патронами для малого количества
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
            resultText.textContent = '💥 Повезло! В банке нет шотов! Готов к новому раунду?';
        } else {
            resultText.textContent = `💥 Игра окончена! Выпей ${this.shotsInPool} шотов и начни новый раунд, когда будешь готов!`;
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
        document.getElementById('resultText').textContent = 'Игра готова! Первый игрок, нажми "Нажать на курок"!';
        this.announce('Игра готова! Первый игрок, нажми Пробел для выстрела.');
        document.getElementById('resultDisplay').className = 'result-display';
        document.getElementById('triggerButton').style.display = 'inline-block';
        document.getElementById('triggerButton').disabled = false;
        document.getElementById('newRoundButton').style.display = 'none';
    }

    startNewRoundInGame() {
        // Использовать те же настройки, что и в текущей игре
        this.chambers = [];
        this.currentChamber = 0;
        this.shotsInPool = 0;
        this.gameActive = true;

        // Пересоздать патроны с той же конфигурацией
        for (let i = 0; i < this.blankChambers; i++) {
            this.chambers.push('blank');
        }
        for (let i = 0; i < this.bulletChambers; i++) {
            this.chambers.push('bullet');
        }

        this.shuffleChambers();
        this.updateUI();
        this.updateCylinderDisplay();

        // Обновить UI для нового раунда
        document.getElementById('resultText').textContent = 'Новый раунд начат! Первый игрок, нажми "Нажать на курок"!';
        this.announce('Новый раунд начат! Нажми Пробел для выстрела.');
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

    // Слушатель события слайдера громкости
    document.getElementById('volumeSlider').addEventListener('input', function () {
        game.setVolume(this.value);
    });

    // Клавиатурные сочетания
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