// Kings Cup Game Logic - Japanese Version
class KingsCupGame {
    constructor() {
        this.deck = [];
        this.drawnCards = [];
        this.kingsDrawn = 0;
        this.gameOver = false;
        this.cupContents = [];
        this.currentPlayer = 1;
        this.gameCount = 0;
        
        // Card rules and actions in Japanese
        this.cardRules = {
            'A': {
                name: 'ウォーターフォール',
                description: '全員飲み始めます。前の人が止まるまで止められません！カードを引いた人から時計回りに進みます。',
                action: '🌊 ウォーターフォール開始！ 前の人が止まるまで飲み続けてください！'
            },
            '2': {
                name: 'あなた',
                description: '誰か一人を指名して飲ませます。指をさされた人が一口飲みます。',
                action: '👉 指名した人に飲ませてください！ 誰かを選んでください！'
            },
            '3': {
                name: '自分',
                description: '自分が飲みます。カードを引いた本人が一口飲みます。',
                action: '🍻 あなたが飲みます！ 一口どうぞ！'
            },
            '4': {
                name: '床',
                description: '全員ですぐに床を触ります。最後に触った人が一口飲みます。',
                action: '⬇️ 全員床を触って！ 最後の人が飲みます！'
            },
            '5': {
                name: '男子',
                description: '男性プレイヤー全員が飲みます。全員で一斉に一口飲みます。',
                action: '👦 男子全員で乾杯！ 一口飲んでください！'
            },
            '6': {
                name: '女子',
                description: '女性プレイヤー全員が飲みます。全員で一斉に一口飲みます。',
                action: '👧 女子全員で乾杯！ 一口飲んでください！'
            },
            '7': {
                name: '空',
                description: '全員ですぐに空（天井）を指差します。最後に指差した人が飲みます。',
                action: '☝️ 全員空を指差して！ 最後の人が飲みます！'
            },
            '8': {
                name: '相棒',
                description: '飲み仲間の「相棒」を一人選びます。あなたが飲むとき、相棒も一緒に飲まなければなりません。',
                action: '👫 相棒を一人選んでください！ 次の「8」が出るまで二人は運命共同体です！'
            },
            '9': {
                name: '韻踏み/しりとり',
                description: 'お題を決め、順番に韻を踏むか、しりとりをします。詰まった人や繰り返した人が飲みます。',
                action: '🎵 順番に言葉を繋いで！ 詰まったら負けです！'
            },
            '10': {
                name: 'カテゴリー',
                description: 'カテゴリー（動物、色など）を決め、順番に答えます。答えられなかった人が飲みます。',
                action: '📝 カテゴリーを決めて順番に答えて！ 答えられなかったら一口！'
            },
            'J': {
                name: '新ルール',
                description: '全員が従わなければならない新しいルールをひとつ作ります。クリエイティブに！（例：名前を呼んではいけない、など）',
                action: '📜 新しいルールをひとつ作ってください！ 全員がそれに従います！'
            },
            'Q': {
                name: '質問攻め',
                description: '他の人に質問しかできません。質問に答え（返さ）てしまった人が飲みます。次のクイーンが出るまで続きます。',
                action: '❓ 質問だけで会話を繋いで！ 普通に答えてしまったら負け！'
            },
            'K': {
                name: 'キングスカップ',
                description: '中央のキングスカップに自分の飲み物を少し注ぎます。4枚目のキングを引いた人は、カップの中身をすべて飲み干します！',
                action: '👑 中央のカップに注いでください！ {kingNumber} 枚目のキングです！'
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
        
        return card;
    }

    displayCard(card) {
        const playingCard = document.getElementById('playingCard');
        const cardFront = document.getElementById('cardFront');
        const cardBack = document.getElementById('cardBack');
        
        playingCard.classList.remove('sliding-in', 'ready', 'flipping', 'bounce-in', 'sparkling');
        cardFront.classList.remove('revealing');
        cardBack.classList.remove('flipping-out');
        
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
        
        playingCard.classList.add('flipping');
        cardBack.style.display = 'block';
        cardBack.classList.add('flipping-out');
        
        setTimeout(() => {
            this.updateCardContent(card);
            cardFront.classList.add('revealing');
            cardBack.style.display = 'none';
        }, 600);
        
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
        if (card.value === 'K') {
            playingCard.classList.add('king-special', 'sparkling');
            setTimeout(() => {
                playingCard.classList.remove('king-special');
            }, 1000);
        }
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
                actionDescription = '4枚目のキング！ キングスカップをすべて飲み干してください！ ゲーム終了！ 🍻';
            } else {
                actionDescription = `中央のカップに注いでください！これが ${this.kingsDrawn} 枚目のキングです！`;
            }
        }
        
        ruleText.innerHTML = actionDescription;
    }

    showCardAction(card) {
        if (card.value === 'K') {
            this.addToKingsCup(card);
        }
        
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
            const kingCards = this.cupContents.map(card => 
                `<span class="king-card">${card}</span>`
            ).join('');
            document.getElementById('cupContents').innerHTML = 
                `<div style="margin-bottom: 0.5rem;"><strong>ゲーム終了！</strong></div>${kingCards}`;
        }
    }

    updateKingsCup() {
        const cupContents = document.getElementById('cupContents');
        if (this.cupContents.length === 0) {
            cupContents.textContent = '空';
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
        
        ruleName.innerHTML = '🎉 ゲーム終了！ 🎉';
        ruleText.innerHTML = `
            4枚のキングがすべて出ました！<br>
            🏆 最後のキングを引いた人がカップを飲み干します！<br>
            🎊 遊んでくれてありがとう！
        `;
        
        setTimeout(() => {
            document.querySelector('.cup-container').classList.add('celebrate');
        }, 500);
    }

    nextCard() {
        this.currentPlayer++;
        document.getElementById('nextButton').style.display = 'none';
        if (!this.gameOver) {
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
        
        const playingCard = document.getElementById('playingCard');
        playingCard.className = 'playing-card ready';
        
        document.getElementById('nextButton').style.display = 'none';
        document.getElementById('resetButton').style.display = 'none';
        
        const ruleName = document.getElementById('ruleName');
        const ruleText = document.getElementById('ruleText');
        const cardValue = document.getElementById('cardValue');
        const cardSuit = document.getElementById('cardSuit');
        const cardValueSmall = document.getElementById('cardValueSmall');
        const cardSuitSmall = document.getElementById('cardSuitSmall');
        
        ruleName.textContent = 'カードを引く';
        ruleText.textContent = 'クリックして最初のカードを引いてください！';
        cardValue.textContent = '?';
        cardSuit.textContent = '🃏';
        cardValueSmall.textContent = '?';
        cardSuitSmall.textContent = '🃏';
        
        cardSuit.className = '';
        cardSuitSmall.className = '';
        document.querySelector('.cup-container').classList.remove('celebrate');
        
        this.initializeGame();
    }

    updateDisplay() {
        document.getElementById('cardsLeft').textContent = this.deck.length;
        document.getElementById('kingsDrawn').textContent = this.kingsDrawn;
        this.updateKingsCup();
    }
}

let game;
document.addEventListener('DOMContentLoaded', function() {
    game = new KingsCupGame();
});

function drawCard() {
    if (game && !game.gameOver) {
        const playingCard = document.getElementById('playingCard');
        if (playingCard.classList.contains('sliding-in') ||
            playingCard.classList.contains('flipping') ||
            playingCard.classList.contains('bounce-in')) {
            return;
        }
        const card = game.drawCard();
        if (card) {
            if (card.value === 'K') {
                setTimeout(() => playKingSound(), 600);
            } else {
                playCardSound();
            }
        }
    }
}

function nextCard() {
    if (game) { game.nextCard(); }
}

function resetGame() {
    if (game) { game.resetGame(); }
}

function playCardSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(audioContext.destination);
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
    } catch (e) {}
}

function playKingSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(554.37, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.2);
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {}
}

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
