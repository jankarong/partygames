// 国王杯游戏逻辑 (中文版)
class KingsCupGame {
    constructor() {
        this.deck = [];
        this.drawnCards = [];
        this.kingsDrawn = 0;
        this.gameOver = false;
        this.cupContents = [];
        this.currentPlayer = 1;
        this.gameCount = 0;
        
        // 牌张规则和动作 (中文本土化)
        this.cardRules = {
            'A': {
                name: '瀑布',
                description: '所有人开始喝酒，不能停止直到前一个人停止！从抽牌者开始按顺时针方向进行。',
                action: '🌊 开始瀑布！所有人连续喝酒，直到你前面的人停止为止！'
            },
            '2': {
                name: '指定',
                description: '选择任意一人喝酒。指向任何玩家，他们必须喝一口。',
                action: '👉 选择一个人喝酒！指向一位玩家，让他们喝一口！'
            },
            '3': {
                name: '自己',
                description: '你要喝酒！抽到这张牌的人必须喝一口。',
                action: '🍻 你要喝酒！自己喝一口！'
            },
            '4': {
                name: '摸地',
                description: '所有人必须立即摸地板。最后摸到地板的人要喝酒。',
                action: '⬇️ 所有人快摸地板！最慢的人喝酒！'
            },
            '5': {
                name: '男生',
                description: '所有男生一起喝酒。每位男性玩家同时喝一口。',
                action: '👦 所有男生一起喝酒！男生们喝一口！'
            },
            '6': {
                name: '女生',
                description: '所有女生一起喝酒。每位女性玩家同时喝一口。',
                action: '👧 所有女生一起喝酒！女生们喝一口！'
            },
            '7': {
                name: '指天',
                description: '所有人立即指向天空/天花板。最后指向上方的人要喝酒。',
                action: '☝️ 所有人快指向天空！最慢的人喝酒！'
            },
            '8': {
                name: '伙伴',
                description: '选择一个酒友。无论何时你喝酒，他们也必须喝。这种伙伴关系持续到其他人抽到8为止。',
                action: '👫 选择你的酒友！当你喝酒时，他们也要跟着喝，直到下一张8被抽到！'
            },
            '9': {
                name: '押韵',
                description: '说一个词，然后大家轮流说押韵的词。第一个想不出押韵词或重复用词的人接受挑战。',
                action: '🎵 开始说一个词！大家轮流押韵。不能重复！'
            },
            '10': {
                name: '分类',
                description: '说出一个分类（如动物、颜色等），然后大家轮流说出该分类中的物品。第一个想不出的人接受挑战。',
                action: '📝 选择一个分类！大家轮流说出分类中的物品。想不出的就接受挑战！'
            },
            'J': {
                name: '制定规则',
                description: '制定一个新规则，所有人在游戏剩余时间都必须遵守。发挥创意！例如："不能用手指"、"说话要带口音"、"不能说名字"。',
                action: '📜 制定一个所有人都必须遵守的规则！发挥创意！（例如："不能用手指"、"说话要搞笑声音"）'
            },
            'Q': {
                name: '问题',
                description: '你只能向其他玩家问问题。任何回答（而不是反问）的人都要喝酒。这持续到其他人抽到皇后为止。',
                action: '❓ 你只能问问题！任何回答（而不是反问）的人都要喝酒！'
            },
            'K': {
                name: '国王杯',
                description: '将一些你的饮品倒入中央的国王杯。如果这是第4张国王，你必须喝完整个国王杯，游戏结束！',
                action: '👑 将你的饮品倒入国王杯！这是第{kingNumber}张国王！'
            }
        };

        this.suits = ['♠', '♥', '♦', '♣'];
        this.suitClasses = ['spades', 'hearts', 'diamonds', 'clubs'];
        
        this.initializeGame();
    }

    initializeGame() {
        this.createDeck();
        this.shuffleDeck();
        this.updateDisplay();
    }

    createDeck() {
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        this.deck = [];
        
        for (let suit of this.suits) {
            for (let value of values) {
                this.deck.push({
                    value: value,
                    suit: suit,
                    suitClass: this.suitClasses[this.suits.indexOf(suit)]
                });
            }
        }
    }

    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    drawCard() {
        if (this.deck.length === 0 || this.gameOver) {
            return null;
        }

        const card = this.deck.pop();
        this.drawnCards.push(card);
        
        if (card.value === 'K') {
            this.kingsDrawn++;
            if (this.kingsDrawn === 4) {
                this.gameOver = true;
            }
        }

        this.displayCard(card);
        this.showCardAction(card);
        this.updateDisplay();
        
        // 5张牌后显示游戏推荐
        if (this.drawnCards.length === 5 && window.GameNavigationAPI) {
            setTimeout(() => {
                window.GameNavigationAPI.showRecommendations();
            }, 3000);
        }

        return card;
    }

    displayCard(card) {
        const playingCard = document.getElementById('playingCard');
        const cardFront = document.getElementById('cardFront');
        const cardBack = document.getElementById('cardBack');
        
        // 移除现有动画类
        playingCard.classList.remove('sliding-in', 'ready', 'flipping', 'bounce-in', 'sparkling');
        cardFront.classList.remove('revealing');
        cardBack.classList.remove('flipping-out');
        
        // 第一张牌，直接滑入
        if (this.drawnCards.length === 1) {
            this.updateCardContent(card);
            playingCard.classList.add('sliding-in');
            setTimeout(() => {
                playingCard.classList.remove('sliding-in');
                playingCard.classList.add('ready');
                this.addSpecialEffects(card);
            }, 600);
            return;
        }
        
        // 后续牌张，使用翻转动画
        playingCard.classList.add('flipping');
        cardBack.style.display = 'block';
        cardBack.classList.add('flipping-out');
        
        // 翻转中间更新内容
        setTimeout(() => {
            this.updateCardContent(card);
            cardFront.classList.add('revealing');
            cardBack.style.display = 'none';
        }, 600);
        
        // 完成动画并添加效果
        setTimeout(() => {
            playingCard.classList.remove('flipping');
            cardFront.classList.remove('revealing');
            playingCard.classList.add('bounce-in');
            
            setTimeout(() => {
                playingCard.classList.remove('bounce-in');
                if (!this.gameOver) {
                    playingCard.classList.add('ready');
                }
                this.addSpecialEffects(card);
            }, 800);
        }, 1200);
    }
    
    addSpecialEffects(card) {
        const playingCard = document.getElementById('playingCard');
        
        // 国王特殊效果
        if (card.value === 'K') {
            playingCard.classList.add('king-special', 'sparkling');
            setTimeout(() => {
                playingCard.classList.remove('king-special');
                // 国王保持闪烁
            }, 1000);
        }
        
        // A和人头牌特殊效果
        if (['A', 'J', 'Q'].includes(card.value)) {
            playingCard.classList.add('sparkling');
            setTimeout(() => {
                playingCard.classList.remove('sparkling');
            }, 3000);
        }
    }

    updateCardContent(card) {
        const cardValue = document.getElementById('cardValue');
        const cardSuit = document.getElementById('cardSuit');
        const cardValueSmall = document.getElementById('cardValueSmall');
        const cardSuitSmall = document.getElementById('cardSuitSmall');
        const ruleName = document.getElementById('ruleName');
        const ruleText = document.getElementById('ruleText');
        
        cardValue.textContent = card.value;
        cardSuit.textContent = card.suit;
        cardSuit.className = card.suitClass;
        cardValueSmall.textContent = card.value;
        cardSuitSmall.textContent = card.suit;
        cardSuitSmall.className = card.suitClass;
        
        const rule = this.cardRules[card.value];
        ruleName.textContent = `${card.value} - ${rule.name}`;
        
        let actionDescription = rule.action;
        if (card.value === 'K') {
            if (this.kingsDrawn === 4) {
                actionDescription = '第四张国王！你必须喝完整个国王杯！游戏结束！🍻';
            } else {
                actionDescription = `将你的饮品倒入国王杯！这是第${this.getChineseOrdinal(this.kingsDrawn)}张国王！`;
            }
        }
        
        ruleText.innerHTML = actionDescription;
    }

    showCardAction(card) {
        const playingCard = document.getElementById('playingCard');
        
        if (card.value === 'K') {
            this.addToKingsCup(card);
        }
        
        // 显示适当的按钮
        document.getElementById('nextButton').style.display = this.gameOver ? 'none' : 'inline-block';
        document.getElementById('resetButton').style.display = 'inline-block';
        
        if (this.gameOver) {
            this.showGameOver();
        }
    }

    addToKingsCup(card) {
        this.cupContents.push(`${card.value}${card.suit}`);
        this.updateKingsCup();
        
        if (this.kingsDrawn === 4) {
            // 游戏结束 - 第四张国王
            const kingCards = this.cupContents.map(card => 
                `<span class="king-card">${card}</span>`
            ).join('');
            document.getElementById('cupContents').innerHTML = 
                `<div style="margin-bottom: 0.5rem;"><strong>游戏结束！</strong></div>${kingCards}`;
        }
    }

    updateKingsCup() {
        const cupContents = document.getElementById('cupContents');
        if (this.cupContents.length === 0) {
            cupContents.textContent = '空杯';
        } else if (this.kingsDrawn < 4) {
            const kingCards = this.cupContents.map(card => 
                `<span class="king-card">${card}</span>`
            ).join('');
            cupContents.innerHTML = kingCards;
        }
    }

    showGameOver() {
        const playingCard = document.getElementById('playingCard');
        const ruleName = document.getElementById('ruleName');
        const ruleText = document.getElementById('ruleText');
        
        playingCard.classList.add('game-over');
        
        ruleName.innerHTML = '🎉 游戏结束！🎉';
        ruleText.innerHTML = `
            所有4张国王都被抽完了！<br>
            🏆 最后一张国王必须喝完国王杯！<br>
            🎊 感谢游玩！
        `;
        
        // 添加庆祝动画
        setTimeout(() => {
            document.querySelector('.cup-container').classList.add('celebrate');
        }, 500);
    }

    nextCard() {
        this.currentPlayer++;
        
        // 隐藏控制按钮
        document.getElementById('nextButton').style.display = 'none';
        
        if (!this.gameOver) {
            // 直接抽取下一张牌
            this.drawCard();
        }
    }

    resetGame() {
        this.deck = [];
        this.drawnCards = [];
        this.kingsDrawn = 0;
        this.gameOver = false;
        this.cupContents = [];
        this.currentPlayer = 1;
        this.gameCount++;
        
        // 重置显示
        const playingCard = document.getElementById('playingCard');
        playingCard.className = 'playing-card ready';
        
        document.getElementById('nextButton').style.display = 'none';
        document.getElementById('resetButton').style.display = 'none';
        
        // 重置牌张内容
        const ruleName = document.getElementById('ruleName');
        const ruleText = document.getElementById('ruleText');
        const cardValue = document.getElementById('cardValue');
        const cardSuit = document.getElementById('cardSuit');
        const cardValueSmall = document.getElementById('cardValueSmall');
        const cardSuitSmall = document.getElementById('cardSuitSmall');
        
        ruleName.textContent = '抽取牌张';
        ruleText.textContent = '点击抽取你的第一张牌！';
        cardValue.textContent = '?';
        cardSuit.textContent = '🃏';
        cardValueSmall.textContent = '?';
        cardSuitSmall.textContent = '🃏';
        
        // 移除花色类
        cardSuit.className = '';
        cardSuitSmall.className = '';
        
        // 移除庆祝类
        document.querySelector('.cup-container').classList.remove('celebrate');
        
        this.initializeGame();
    }

    updateDisplay() {
        document.getElementById('cardsLeft').textContent = this.deck.length;
        document.getElementById('kingsDrawn').textContent = this.kingsDrawn;
        this.updateKingsCup();
    }

    getChineseOrdinal(number) {
        const ordinals = ['', '一', '二', '三', '四'];
        return ordinals[number] || `第${number}`;
    }
}

// 初始化游戏
let game;

// 等待DOM加载
document.addEventListener('DOMContentLoaded', function() {
    game = new KingsCupGame();
});

// HTML按钮调用的游戏函数
function drawCard() {
    if (game && !game.gameOver) {
        const playingCard = document.getElementById('playingCard');
        
        // 动画期间防止双击
        if (playingCard.classList.contains('sliding-in') ||
            playingCard.classList.contains('flipping') ||
            playingCard.classList.contains('bounce-in')) {
            return;
        }
        
        const card = game.drawCard();
        if (card) {
            // 添加抽牌音效（可选）
            if (card.value === 'K') {
                setTimeout(() => playKingSound(), 600); // 翻转动画开始后播放
            } else {
                playCardSound();
            }
        }
    }
}

function nextCard() {
    if (game) {
        game.nextCard();
    }
}

function resetGame() {
    if (game) {
        game.resetGame();
    }
}

// 增强音效函数
function playCardSound() {
    // 创建更悦耳的翻牌音效
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // 创建多个振荡器以获得更丰富的声音
        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // 翻牌音效 - 嗖嗖声效果
        oscillator1.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator1.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.2);
        
        oscillator2.frequency.setValueAtTime(300, audioContext.currentTime);
        oscillator2.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
        
        oscillator1.start(audioContext.currentTime);
        oscillator1.stop(audioContext.currentTime + 0.2);
        oscillator2.start(audioContext.currentTime);
        oscillator2.stop(audioContext.currentTime + 0.2);
    } catch (e) {
        // 忽略音频错误 - 不是所有浏览器都支持Web Audio API
    }
}

function playKingSound() {
    // 国王特殊音效
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // 皇家号角音效
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(554.37, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.2);
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        // 忽略音频错误
    }
}

// 键盘控制
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !game.gameOver) {
        event.preventDefault();
        if (document.getElementById('nextButton').style.display !== 'none') {
            nextCard();
        } else {
            drawCard();
        }
    } else if (event.code === 'KeyR') {
        resetGame();
    }
});

// 添加有用的提示
document.addEventListener('DOMContentLoaded', function() {
    // 需要时添加提示功能
    const playingCard = document.getElementById('playingCard');
    if (playingCard) {
        playingCard.title = '点击抽取牌张（或按空格键）';
    }
    
    const nextButton = document.getElementById('nextButton');
    if (nextButton) {
        nextButton.title = '抽取下一张牌（或按空格键）';
    }
    
    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
        resetButton.title = '开始新游戏（或按R键）';
    }
});

// 导出用于可能的测试
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KingsCupGame };
}