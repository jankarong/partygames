document.addEventListener('DOMContentLoaded', () => {
    // 游戏元素
    const guessInput = document.getElementById('guessInput');
    const submitGuess = document.getElementById('submitGuess');
    const message = document.getElementById('message');
    const history = document.getElementById('history');
    const beerFill = document.getElementById('beer-fill');
    const beerMug = document.querySelector('.beer-mug');
    const beerMouth = document.querySelector('.beer-mouth');
    const beerEyes = document.querySelectorAll('.beer-eye');

    // 游戏变量
    let targetNumber;
    let guesses = [];
    let isGameOver = false;
    let maxFillHeight = 100; // 最大填充百分比
    let lastGuess = null;

    // 初始化游戏
    function initGame() {
        // 生成1到100之间的随机数字
        targetNumber = Math.floor(Math.random() * 100) + 1;

        // 重置游戏状态
        guesses = [];
        isGameOver = false;
        lastGuess = null;

        // 重置UI元素
        message.textContent = '';
        message.className = 'alert d-none';
        beerFill.style.height = '0%';

        // 重置啤酒表情
        updateBeerFace('neutral');

        // 更新历史显示
        updateHistory();

        // 聚焦输入框
        guessInput.value = '';
        guessInput.focus();

        console.log('新一轮开始，目标数字：', targetNumber);
    }

    // 更新猜测历史显示
    function updateHistory() {
        if (guesses.length === 0) {
            history.innerHTML = '';
            return;
        }

        history.innerHTML = `
            <div class="guess-history-title">已猜 ${guesses.length} 次</div>
            <div class="history-list">
                ${guesses.map(num => `<span class="history-item">${num}</span>`).join('')}
            </div>
        `;
    }

    // 更新啤酒杯表情
    function updateBeerFace(expression) {
        // 重置所有表情
        beerMug.classList.remove('happy', 'sad', 'excited', 'thinking');

        // 设置新表情
        switch (expression) {
            case 'happy':
                beerMouth.style.borderRadius = '0 0 15px 15px';
                beerMouth.style.height = '15px';
                beerMouth.style.borderTop = 'none';
                beerMouth.style.borderBottom = '3px solid #1a2b47';
                break;
            case 'sad':
                beerMouth.style.borderRadius = '15px 15px 0 0';
                beerMouth.style.height = '15px';
                beerMouth.style.borderTop = '3px solid #1a2b47';
                beerMouth.style.borderBottom = 'none';
                break;
            case 'excited':
                beerMouth.style.borderRadius = '50%';
                beerMouth.style.height = '20px';
                beerMouth.style.width = '20px';
                beerMouth.style.borderTop = '3px solid #1a2b47';
                beerMouth.style.borderBottom = '3px solid #1a2b47';
                beerMouth.style.borderLeft = '3px solid #1a2b47';
                beerMouth.style.borderRight = '3px solid #1a2b47';
                break;
            case 'thinking':
                beerMouth.style.borderRadius = '0';
                beerMouth.style.height = '3px';
                beerMouth.style.width = '20px';
                beerMouth.style.borderTop = 'none';
                beerMouth.style.borderBottom = '3px solid #1a2b47';
                break;
            default: // neutral
                beerMouth.style.borderRadius = '0 0 15px 15px';
                beerMouth.style.height = '15px';
                beerMouth.style.width = '30px';
                beerMouth.style.borderTop = 'none';
                beerMouth.style.borderBottom = '3px solid #1a2b47';
                beerMouth.style.borderLeft = 'none';
                beerMouth.style.borderRight = 'none';
        }
    }

    // 让啤酒眼睛偶尔眨眼
    function startBlinking() {
        setInterval(() => {
            if (Math.random() > 0.7) { // 30%的眨眼概率
                beerEyes.forEach(eye => {
                    eye.style.height = '1px';
                    setTimeout(() => {
                        eye.style.height = '12px';
                    }, 150);
                });
            }
        }, 3000);
    }

    // 根据猜测与目标的接近程度计算啤酒杯的填充量
    function updateBeerFill(guess) {
        // 如果游戏结束（正确猜测），填充到100%
        if (guess === targetNumber) {
            beerFill.style.height = '100%';
            updateBeerFace('excited');
            return;
        }

        // 计算猜测与目标的接近程度
        const distance = Math.abs(guess - targetNumber);
        const maxDistance = 50; // 最大合理距离

        // 计算填充百分比（越接近 = 更多填充）
        // 公式确保偏差maxDistance或更多 = 0%填充
        // 偏差0 = 100%填充
        let fillPercentage = Math.max(0, 100 - (distance / maxDistance) * 100);

        // 确保第一次猜测后最少填充10%
        fillPercentage = Math.max(10, fillPercentage);

        // 应用填充高度
        beerFill.style.height = `${fillPercentage}%`;

        // 根据猜测的接近程度更新啤酒表情
        if (fillPercentage > 80) {
            updateBeerFace('happy');
        } else if (fillPercentage > 50) {
            updateBeerFace('neutral');
        } else {
            updateBeerFace('sad');
        }

        // 如果这不是第一次猜测，如果越来越接近则显示思考表情
        if (lastGuess !== null) {
            const lastDistance = Math.abs(lastGuess - targetNumber);
            const currentDistance = Math.abs(guess - targetNumber);

            if (currentDistance < lastDistance) {
                // 越来越接近
                updateBeerFace('happy');
            } else {
                // 越来越远
                updateBeerFace('sad');
            }
        }

        // 更新上次猜测
        lastGuess = guess;
    }

    // 处理猜测提交
    function handleGuess() {
        // 获取猜测值
        const guess = parseInt(guessInput.value);

        // 验证输入
        if (isNaN(guess) || guess < 1 || guess > 100) {
            message.textContent = '请输入1-100之间的数字哦！';
            message.className = 'alert alert-danger';
            updateBeerFace('sad');
            return;
        }

        // 添加到猜测数组
        guesses.push(guess);
        updateHistory();

        // 根据猜测更新啤酒填充
        updateBeerFill(guess);

        // 检查猜测是否正确
        if (guess === targetNumber) {
            message.textContent = `太棒了！🍻 你用${guesses.length}次就猜中了${targetNumber}！`;
            message.className = 'alert alert-success';
            isGameOver = true;

            // 为啤酒添加冒泡动画
            beerFill.classList.add('bubbling');

            // 显示兴奋表情
            updateBeerFace('excited');

            // 3秒后开始新一轮
            setTimeout(() => {
                initGame();
                beerFill.classList.remove('bubbling');
            }, 3000);
        }
        // 猜小了的提示
        else if (guess < targetNumber) {
            message.textContent = '太小了！再大一点哦！🍺';
            message.className = 'alert alert-warning';
        }
        // 猜大了的提示
        else {
            message.textContent = '太大了！再小一点哦！🍺';
            message.className = 'alert alert-warning';
        }

        // 清除输入框，准备下次猜测
        guessInput.value = '';
        guessInput.focus();
    }

    // 事件监听器
    submitGuess.addEventListener('click', handleGuess);

    // 按回车键也能猜数字
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleGuess();
    });

    // 鼠标悬停在啤酒杯上的效果
    beerMug.addEventListener('mouseover', () => {
        if (!isGameOver) {
            updateBeerFace('thinking');
        }
    });

    beerMug.addEventListener('mouseout', () => {
        if (!isGameOver) {
            updateBeerFace('neutral');
        }
    });

    // 启动眨眼动画
    startBlinking();

    // 页面加载完毕开始游戏
    initGame();
});