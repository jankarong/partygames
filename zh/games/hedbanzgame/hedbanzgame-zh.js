// 游戏状态
let gameState = {
    currentPlayer: 1,
    remainingPlayers: 2,
    totalPlayers: 2,
    cards: [
        // 语言相关
        "说'啊'",
        "说'嗯'",
        "说'哦'",
        "说'嘿'",
        "说'哈'",
        "说'嘿嘿'",
        "说'哈哈'",
        "说'哇'",
        "说'耶'",
        "说'真的吗？'",
        "说'对'",
        "说'是的'",
        "说'不可能'",
        "说'酷'",
        "说'好的'",
        "说'不是吧'",
        "说'我觉得'",
        "说'应该'",
        "说'可能'",
        "说'当然'",
        "说'确实'",
        "说'没错'",
        "说'对吧'",
        "说'是吧'",
        // 身体动作
        "摸头",
        "摸鼻子",
        "眨眼",
        "伸懒腰",
        "摸耳朵",
        "点头",
        "摇头",
        "拍肩膀",
        "举手",
        "摸下巴",
        "揉眼睛",
        "摸脸颊",
        "挠头",
        "摸额头",
        "摸后脑勺",
        "摸脖子",
        "摸胳膊",
        "摸手腕",
        "摸手心",
        "摸手指",
        "摸肚子",
        "摸膝盖",
        "摸脚踝",
        "摸肩膀",
        "摸胳膊肘",
        "抖腿",
        "晃脚",
        "转脖子",
        "转手腕",
        "翻白眼",
        "吹头发",
        "撅嘴",
        "咬嘴唇",
        "舔嘴唇",
        "闻东西",
        "打哈欠",
        "咳嗽",
        "清嗓子",
        "叹气",
        "深呼吸",
        "鼓掌",
        "打响指",
        "比OK手势",
        "比赞手势",
        "比耶手势",
        "做切割手势",
        "做拜拜手势",
        "做嘘手势",
        "托腮",
        "抱胳膊",
        "双手合十",
        "握拳",
        "伸出食指",
        "伸出中指",
        "做心形手势",
        "做爱心手势"
    ],
    usedCards: [],
    isCardDrawn: false
};

// DOM元素
const gameSetupDiv = document.getElementById('gameSetup');
const gameAreaDiv = document.getElementById('gameArea');
const playerCountSelect = document.getElementById('playerCount');
const startGameBtn = document.getElementById('startGame');
const drawCardBtn = document.getElementById('drawCard');
const nextPlayerBtn = document.getElementById('nextPlayer');
const currentPlayerSpan = document.getElementById('currentPlayer');
const remainingPlayersSpan = document.getElementById('remainingPlayers');
const currentCardDiv = document.querySelector('.current-card');

// 开始游戏按钮事件
startGameBtn.addEventListener('click', () => {
    const selectedPlayers = parseInt(playerCountSelect.value);
    gameState.totalPlayers = selectedPlayers;
    gameState.remainingPlayers = selectedPlayers;
    gameState.currentPlayer = 1;
    
    // 隐藏设置界面，显示游戏区域
    gameSetupDiv.style.display = 'none';
    gameAreaDiv.style.display = 'block';
    
    // 更新显示
    updateDisplay();
});

// 抽取卡片按钮事件
drawCardBtn.addEventListener('click', () => {
    if (gameState.cards.length === 0) {
        // 如果所有卡片都用完了，重新洗牌
        gameState.cards = [...gameState.usedCards];
        gameState.usedCards = [];
    }

    // 随机抽取一张卡片
    const randomIndex = Math.floor(Math.random() * gameState.cards.length);
    const drawnCard = gameState.cards.splice(randomIndex, 1)[0];
    gameState.usedCards.push(drawnCard);
    
    // 显示卡片内容
    currentCardDiv.innerHTML = `
        <div class="forbidden-action">
            <h3>⚠️ 禁忌动作</h3>
            <div class="action-text">${drawnCard}</div>
            <p class="warning-text">避免做这个动作！</p>
        </div>
    `;
    
    // 更新按钮状态
    drawCardBtn.disabled = true;
    nextPlayerBtn.disabled = false;
    gameState.isCardDrawn = true;
});

// 下一位玩家按钮事件
nextPlayerBtn.addEventListener('click', () => {
    if (gameState.remainingPlayers > 1) {
        gameState.remainingPlayers--;
    } else {
        // 游戏结束，重置游戏
        resetGame();
        return;
    }
    
    // 更新当前玩家
    gameState.currentPlayer = (gameState.currentPlayer % gameState.totalPlayers) + 1;
    
    // 重置卡片显示
    currentCardDiv.innerHTML = '<p>你的卡片将在这里显示</p>';
    
    // 更新按钮状态
    drawCardBtn.disabled = false;
    nextPlayerBtn.disabled = true;
    gameState.isCardDrawn = false;
    
    // 更新显示
    updateDisplay();
});

// 更新显示函数
function updateDisplay() {
    currentPlayerSpan.textContent = gameState.currentPlayer;
    remainingPlayersSpan.textContent = gameState.remainingPlayers;
}

// 重置游戏函数
function resetGame() {
    // 显示设置界面，隐藏游戏区域
    gameSetupDiv.style.display = 'block';
    gameAreaDiv.style.display = 'none';
    
    // 重置游戏状态
    gameState = {
        currentPlayer: 1,
        remainingPlayers: gameState.totalPlayers,
        totalPlayers: gameState.totalPlayers,
        cards: [
            // 语言相关
            "说'啊'",
            "说'嗯'",
            "说'哦'",
            "说'嘿'",
            "说'哈'",
            "说'嘿嘿'",
            "说'哈哈'",
            "说'哇'",
            "说'耶'",
            "说'真的吗？'",
            "说'对'",
            "说'是的'",
            "说'不可能'",
            "说'酷'",
            "说'好的'",
            "说'不是吧'",
            "说'我觉得'",
            "说'应该'",
            "说'可能'",
            "说'当然'",
            "说'确实'",
            "说'没错'",
            "说'对吧'",
            "说'是吧'",
            // 身体动作
            "摸头",
            "摸鼻子",
            "眨眼",
            "伸懒腰",
            "摸耳朵",
            "点头",
            "摇头",
            "拍肩膀",
            "举手",
            "摸下巴",
            "揉眼睛",
            "摸脸颊",
            "挠头",
            "摸额头",
            "摸后脑勺",
            "摸脖子",
            "摸胳膊",
            "摸手腕",
            "摸手心",
            "摸手指",
            "摸肚子",
            "摸膝盖",
            "摸脚踝",
            "摸肩膀",
            "摸胳膊肘",
            "抖腿",
            "晃脚",
            "转脖子",
            "转手腕",
            "翻白眼",
            "吹头发",
            "撅嘴",
            "咬嘴唇",
            "舔嘴唇",
            "闻东西",
            "打哈欠",
            "咳嗽",
            "清嗓子",
            "叹气",
            "深呼吸",
            "鼓掌",
            "打响指",
            "比OK手势",
            "比赞手势",
            "比耶手势",
            "做切割手势",
            "做拜拜手势",
            "做嘘手势",
            "托腮",
            "抱胳膊",
            "双手合十",
            "握拳",
            "伸出食指",
            "伸出中指",
            "做心形手势",
            "做爱心手势"
        ],
        usedCards: [],
        isCardDrawn: false
    };
    
    currentCardDiv.innerHTML = '<p>你的卡片将在这里显示</p>';
    drawCardBtn.disabled = false;
    nextPlayerBtn.disabled = true;
    updateDisplay();
    alert('游戏结束！选择玩家人数开始新游戏');
}