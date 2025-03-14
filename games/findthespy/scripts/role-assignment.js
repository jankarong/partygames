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
    const restartGameButton = document.getElementById('restartGame');
    const tapHint = document.getElementById('tapHint');

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
        // 如果点击的是Got it按钮，不要处理卡片翻转
        if (e.target.closest('#gotIt')) {
            return;
        }
        // 确保卡片当前是正面朝上（未翻转）
        if (!roleCard.classList.contains('is-flipped')) {
            roleCard.classList.add('is-flipped');
            const playerRole = gameData.roles[currentPlayer - 1];

            // 根据角色显示词语，但不显示角色身份
            if (playerRole === 'Spy') {
                wordText.textContent = gameData.words.spy;
            } else if (playerRole === 'Blank') {
                wordText.textContent = '(No Word)';
            } else {
                wordText.textContent = gameData.words.regular;
            }
        }
    });

    // Got it 按钮处理
    gotItButton.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        if (currentPlayer < totalPlayers) {
            currentPlayer++;
            currentPlayerSpan.textContent = currentPlayer;
            roleCard.classList.remove('is-flipped');
            wordText.textContent = '';
        } else {
            showGameInstructions();
        }
    });

    // 修改计时器显示
    function showGameInstructions() {
        roleCard.style.display = 'none';
        gameTimer.classList.add('is-visible');
        if (!hasTimeLimit) {
            gameTimer.classList.add('no-time-limit');
        }
    }

    // 更新计时器显示
    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }

    // Timer related elements
    let timerInterval;

    // Start timer function
    function startTimer(duration) {
        timeLeft = duration * 60; // Convert minutes to seconds
        startTimerButton.style.display = 'none';
        restartGameButton.style.display = 'block';

        timerInterval = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;

            minutesDisplay.textContent = minutes.toString().padStart(2, '0');
            secondsDisplay.textContent = seconds.toString().padStart(2, '0');

            if (timeLeft <= 0) {
                endGame();
            } else {
                timeLeft--;
            }
        }, 1000);
    }

    // End game function
    function endGame() {
        clearInterval(timerInterval);
        alert("Time's up! Game Over!");
        document.querySelector('.game-instructions').innerHTML = '<h2>Game Over!</h2><p>Time to vote for who you think is the spy!</p>';
        gameTimer.classList.add('game-started');
        restartGameButton.classList.remove('is-hidden');
    }

    // Event listeners
    startTimerButton.addEventListener('click', () => {
        if (hasTimeLimit) {
            startTimer(gameSettings.timeLimit);
        } else {
            document.querySelector('.game-instructions').innerHTML = '<h2>Game Started!</h2><p>Discuss and vote for who you think is the spy when ready!</p>';
            gameTimer.classList.add('game-started');
            restartGameButton.classList.remove('is-hidden');
        }
    });

    restartGameButton.addEventListener('click', () => {
        window.location.href = 'findthespy.html';
    });

    // Back button functionality
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