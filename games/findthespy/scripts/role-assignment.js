document.addEventListener('DOMContentLoaded', () => {
    const roleCard = document.querySelector('.role-card');
    const gotItButton = document.getElementById('gotIt');
    const currentPlayerSpan = document.getElementById('currentPlayer');
    const roleText = document.getElementById('roleText');
    const wordText = document.getElementById('wordText');
    const gameTimer = document.getElementById('gameTimer');
    const startTimerButton = document.getElementById('startTimer');
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');

    // 从 sessionStorage 获取游戏设置
    const gameSettings = JSON.parse(sessionStorage.getItem('gameSettings'));
    const hasTimeLimit = gameSettings.timeLimit > 0;
    const totalPlayers = gameSettings.playerCount;
    let timeLeft = gameSettings.timeLimit * 60; // 转换为秒

    let currentPlayer = 1;
    let gameData = {
        roles: generateRoles(gameSettings),
        words: gameSettings.words
    };

    // 生成角色数组
    function generateRoles(settings) {
        let roles = [];
        // 添加间谍
        for (let i = 0; i < settings.spyCount; i++) {
            roles.push('Spy');
        }
        // 添加空白角色
        for (let i = 0; i < settings.blankCount; i++) {
            roles.push('Blank');
        }
        // 添加平民
        const civilianCount = settings.playerCount - settings.spyCount - settings.blankCount;
        for (let i = 0; i < civilianCount; i++) {
            roles.push('Civilian');
        }
        return shuffleArray(roles);
    }

    // 洗牌函数
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // 点击卡片显示角色
    roleCard.addEventListener('click', (e) => {
        if (e.target.id !== 'gotIt') {
            roleCard.classList.add('is-flipped');
            const playerRole = gameData.roles[currentPlayer - 1];
            roleText.textContent = playerRole;

            // 根据角色显示不同的词
            if (playerRole === 'Spy') {
                wordText.textContent = gameData.words.spy;
            } else if (playerRole === 'Blank') {
                wordText.textContent = '(No Word)';
            } else {
                wordText.textContent = gameData.words.regular;
            }
        }
    });

    // 修改计时器显示
    function showGameInstructions() {
        roleCard.style.display = 'none';
        gameTimer.style.display = 'block';

        if (!hasTimeLimit) {
            document.querySelector('.timer__display').style.display = 'none';
            startTimerButton.textContent = 'Start Game';
        } else {
            updateTimerDisplay();
        }

        setTimeout(() => {
            gameTimer.classList.add('show');
        }, 100);
    }

    // 更新计时器显示
    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }

    // Got it 按钮处理
    gotItButton.addEventListener('click', () => {
        if (currentPlayer < totalPlayers) {
            currentPlayer++;
            currentPlayerSpan.textContent = currentPlayer;
            roleCard.classList.remove('is-flipped');
        } else {
            showGameInstructions();
        }
    });

    // 计时器功能
    let timerInterval;

    startTimerButton.addEventListener('click', () => {
        startTimerButton.style.display = 'none';

        if (hasTimeLimit) {
            timerInterval = setInterval(() => {
                timeLeft--;
                updateTimerDisplay();
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    alert('Time\'s up!');
                }
            }, 1000);
        }
    });

    // 添加返回按钮处理
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        // 如果计时器在运行，清除它
        if (timerInterval) {
            clearInterval(timerInterval);
        }

        // 提示用户确认
        if (currentPlayer > 1) {
            if (confirm('Are you sure you want to go back? Current game progress will be lost.')) {
                window.location.href = 'findthespy.html';
            }
        } else {
            window.location.href = 'findthespy.html';
        }
    });
}); 