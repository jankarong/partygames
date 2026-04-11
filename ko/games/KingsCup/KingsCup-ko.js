// Kings Cup Game Logic - Korean Version
class KingsCupGame {
    constructor() {
        this.deck = [];
        this.drawnCards = [];
        this.kingsDrawn = 0;
        this.gameOver = false;
        this.cupContents = [];
        this.currentPlayer = 1;
        this.gameCount = 0;
        
        // Card rules and actions in Korean
        this.cardRules = {
            'A': {
                name: '워터폴 (Waterfall)',
                description: '전원 마시기 시작! 앞 사람이 마시는 걸 멈출 때까지 계속 마셔야 합니다. 카드를 뽑은 사람부터 시계 방향으로 진행합니다.',
                action: '🌊 워터폴 시작! 전원 시원하게 마셔주세요! 앞 사람이 멈출 때까지 멈추면 안 됩니다!'
            },
            '2': {
                name: '지목 (You)',
                description: '마실 사람 한 명을 지목합니다. 지목당한 사람은 한 잔 마십니다.',
                action: '👉 한 명을 지목하세요! 지목당한 사람이 기분 좋게 한 잔 마십니다.'
            },
            '3': {
                name: '나 (Me)',
                description: '카드를 뽑은 자기 자신이 마십니다.',
                action: '🍻 나 당첨! 내가 시원하게 한 잔 마십니다.'
            },
            '4': {
                name: '바닥 (Floor)',
                description: '전원 최대한 빨리 바닥을 짚습니다. 가장 늦게 짚은 사람이 마십니다.',
                action: '⬇️ 바닥! 가장 늦게 바닥을 짚은 사람이 한 잔 마십니다!'
            },
            '5': {
                name: '남자 (Guys)',
                description: '방 안의 모든 남자가 마십니다.',
                action: '👦 모든 남자분들, 즐겁게 한 잔 건배!'
            },
            '6': {
                name: '여자 (Girls)',
                description: '방 안의 모든 여자가 마십니다.',
                action: '👧 모든 여자분들, 즐겁게 한 잔 건배!'
            },
            '7': {
                name: '하늘 (Heaven)',
                description: '전원 최대한 빨리 손을 위로 듭니다. 가장 늦게 든 사람이 마십니다.',
                action: '☝️ 하늘! 가장 늦게 손을 번쩍 든 사람이 한 잔 마십니다!'
            },
            '8': {
                name: '메이트 (Mate)',
                description: '함께 마실 짝꿍을 한 명 정합니다. 당신이 마셔야 할 때마다 그 짝꿍도 함께 마셔야 합니다. 이 관계는 다음 8이 나올 때까지 유지됩니다.',
                action: '👫 함께할 메이트를 정하세요! 당신이 마실 때마다 메이트도 함께 마십니다!'
            },
            '9': {
                name: '라임 (Rhyme)',
                description: '단어 하나를 제시하고 돌아가며 운을 맞춥니다. 말이 막히거나 같은 단어를 말하면 마십니다.',
                action: '🎵 제시어에 맞춰 운을 띄워주세요! 막히는 사람이 한 잔 마시는 거 아시죠?'
            },
            '10': {
                name: '카테고리 (Categories)',
                description: '카테고리(예: 동물, 브랜드 등)를 하나 정합니다. 해당 카테고리에 맞는 단어를 말하지 못하거나 중복되면 마십니다.',
                action: '📝 카테고리를 정하고 돌아가며 말하세요! 못 말하는 사람이 한 잔!'
            },
            'J': {
                name: '규칙 만들기 (Make a Rule)',
                description: '게임 끝까지 유효한 새로운 규칙을 하나 만듭니다 (예: 실명 부르지 않기, 반말하기 등). 규칙을 어기는 사람이 마십니다.',
                action: '📜 모두가 지켜야 할 센스 있는 규칙을 하나 만드세요! 규칙을 깨는 사람이 마십니다!'
            },
            'Q': {
                name: '질문 (Questions)',
                description: '당신은 이제 질문왕입니다. 다른 플레이어에게 질문만 할 수 있고, 대답을 대신 질문으로 받지 못하고 말을 한 사람이 마십니다. 다음 퀸이 나올 때까지 유효합니다.',
                action: '❓ 이제부터 질문만 가능합니다! 대답하는 사람은 무조건 한 잔!'
            },
            'K': {
                name: '킹스컵 (Kings Cup)',
                description: '가운데 컵에 본인의 술을 조금 따릅니다. 4번째 킹 카드를 뽑은 사람은 컵에 담긴 모든 술을 마셔야 합니다.',
                action: '👑 가운데 컵에 술을 조금 따르세요! {kingNumber}번째 킹입니다.'
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
        
        // Show game recommendations after 5 cards
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
        
        // Remove any existing animation classes
        playingCard.classList.remove('sliding-in', 'ready', 'flipping', 'bounce-in', 'sparkling');
        cardFront.classList.remove('revealing');
        cardBack.classList.remove('flipping-out');
        
        // For the first card, just slide in
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
        
        // For all subsequent cards, use flip animation
        playingCard.classList.add('flipping');
        cardBack.style.display = 'block';
        cardBack.classList.add('flipping-out');
        
        // Update content at the middle of the flip
        setTimeout(() => {
            this.updateCardContent(card);
            cardFront.classList.add('revealing');
            cardBack.style.display = 'none';
        }, 600);
        
        // Complete the animation and add effects
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
        
        // Special effects for Kings
        if (card.value === 'K') {
            playingCard.classList.add('king-special', 'sparkling');
            setTimeout(() => {
                playingCard.classList.remove('king-special');
                // Keep sparkling for Kings
            }, 1000);
        }
        
        // Special effects for Aces and face cards
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
                actionDescription = '4번째 킹! 컵에 담긴 모든 술을 마셔야 합니다! 게임 종료! 🍻';
            } else {
                actionDescription = `가운데 컵에 술을 조금 따르세요! ${this.getOrdinal(this.kingsDrawn)} 킹입니다!`;
            }
        }
        
        ruleText.innerHTML = actionDescription;
    }

    showCardAction(card) {
        const playingCard = document.getElementById('playingCard');
        
        if (card.value === 'K') {
            this.addToKingsCup(card);
        }
        
        // Show appropriate buttons
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
            // Game over - fourth king drawn
            const kingCards = this.cupContents.map(card => 
                `<span class="king-card">${card}</span>`
            ).join('');
            document.getElementById('cupContents').innerHTML = 
                `<div style="margin-bottom: 0.5rem;"><strong>게임 종료!</strong></div>${kingCards}`;
        }
    }

    updateKingsCup() {
        const cupContents = document.getElementById('cupContents');
        if (this.cupContents.length === 0) {
            cupContents.textContent = '비어있음';
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
        
        ruleName.innerHTML = '🎉 게임 종료! 🎉';
        ruleText.innerHTML = `
            4개의 킹이 모두 나타났습니다!<br>
            🏆 마지막 킹을 뽑은 사람이 가운데 컵을 모두 마십니다!<br>
            🎊 플레이해 주셔서 감사합니다!
        `;
        
        // Add celebration animation
        setTimeout(() => {
            document.querySelector('.cup-container').classList.add('celebrate');
        }, 500);
    }

    nextCard() {
        this.currentPlayer++;
        
        // Hide control buttons
        document.getElementById('nextButton').style.display = 'none';
        
        if (!this.gameOver) {
            // Directly draw the next card
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
        
        // Reset display
        const playingCard = document.getElementById('playingCard');
        playingCard.className = 'playing-card ready';
        
        document.getElementById('nextButton').style.display = 'none';
        document.getElementById('resetButton').style.display = 'none';
        
        // Reset card content
        const ruleName = document.getElementById('ruleName');
        const ruleText = document.getElementById('ruleText');
        const cardValue = document.getElementById('cardValue');
        const cardSuit = document.getElementById('cardSuit');
        const cardValueSmall = document.getElementById('cardValueSmall');
        const cardSuitSmall = document.getElementById('cardSuitSmall');
        
        ruleName.textContent = '카드 뽑기';
        ruleText.textContent = '화면을 클릭하여 첫 번째 카드를 뽑으세요!';
        cardValue.textContent = '?';
        cardSuit.textContent = '🃏';
        cardValueSmall.textContent = '?';
        cardSuitSmall.textContent = '🃏';
        
        // Remove suit classes
        cardSuit.className = '';
        cardSuitSmall.className = '';
        
        // Remove celebration class
        document.querySelector('.cup-container').classList.remove('celebrate');
        
        this.initializeGame();
    }

    updateDisplay() {
        document.getElementById('cardsLeft').textContent = this.deck.length;
        document.getElementById('kingsDrawn').textContent = this.kingsDrawn;
        this.updateKingsCup();
    }

    getOrdinal(number) {
        const ordinals = ['', '첫 번째', '두 번째', '세 번째', '네 번째'];
        return ordinals[number] || `${number}번째`;
    }
}

// Initialize game
let game;

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    game = new KingsCupGame();
});

// Game functions called by HTML buttons
function drawCard() {
    if (game && !game.gameOver) {
        const playingCard = document.getElementById('playingCard');
        
        // Prevent double clicking during animations
        if (playingCard.classList.contains('sliding-in') ||
            playingCard.classList.contains('flipping') ||
            playingCard.classList.contains('bounce-in')) {
            return;
        }
        
        const card = game.drawCard();
        if (card) {
            // Add draw sound effect (optional)
            if (card.value === 'K') {
                setTimeout(() => playKingSound(), 600); // Play after flip animation starts
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

// Enhanced sound effect functions
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

// Keyboard controls
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

// Tooltips
document.addEventListener('DOMContentLoaded', function() {
    const playingCard = document.getElementById('playingCard');
    if (playingCard) {
        playingCard.title = '클릭하여 카드를 뽑으세요 (또는 스페이스바)';
    }
    
    const nextButton = document.getElementById('nextButton');
    if (nextButton) {
        nextButton.title = '다음 카드 뽑기 (또는 스페이스바)';
    }
    
    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
        resetButton.title = '새 게임 시작 (또는 R키)';
    }
});
