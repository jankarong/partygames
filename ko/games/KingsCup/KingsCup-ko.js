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
                action: '🌊 워터폴 시작! 앞 사람이 멈출 때까지 멈추지 말고 마셔주세요!'
            },
            '2': {
                name: '지목 (You)',
                description: '마실 사람 한 명을 지목합니다. 지목당한 사람은 한 잔 마십니다.',
                action: '👉 한 명을 지목하세요! 지목당한 사람이 한 잔 마십니다.'
            },
            '3': {
                name: '나 (Me)',
                description: '카드를 뽑은 자기 자신이 마십니다.',
                action: '🍻 축하합니다(?) 본인이 시원하게 한 잔 마셔주세요!'
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
                name: '여자 (Chicks)',
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
                description: '함께 마실 짝꿍을 한 명 정합니다. 당신이 마셔야 할 때마다 그 짝꿍도 함께 마셔야 합니다.',
                action: '👫 함께할 메이트를 정하세요! 다음 8이 나올 때까지 당신과 메이트는 운명공동체입니다.'
            },
            '9': {
                name: '라임 (Rhyme)',
                description: '단어 하나를 제시하고 돌아가며 운을 맞춥니다. 말이 막히거나 같은 단어를 말하면 마십니다.',
                action: '🎵 제시어에 맞춰 운을 띄워주세요! 막히는 사람이 한 잔 마십니다.'
            },
            '10': {
                name: '카테고리 (Category)',
                description: '카테고리(예: 소주 브랜드, 걸그룹 이름 등)를 하나 정합니다. 해당 카테고리에 맞는 단어를 말하지 못하는 사람이 마십니다.',
                action: '📝 카테고리를 정하고 돌아가며 말하세요! 틀린 사람이 한 잔!'
            },
            'J': {
                name: '규칙 만들기 (Make a Rule)',
                description: '게임 끝까지 유효한 새로운 규칙을 하나 만듭니다 (예: 이름 부르지 않기, 반말 금지 등). 규칙을 어기는 사람이 마십니다.',
                action: '📜 모두가 지켜야 할 새로운 규칙을 하나 만드세요! 규칙을 깨는 사람이 마십니다!'
            },
            'Q': {
                name: '질문 (Question Master)',
                description: '당신은 이제 질문왕입니다. 누군가 당신의 질문에 대답하면 그 사람이 마십니다. 다음 퀸이 나올 때까지 유효합니다.',
                action: '❓ 당신의 질문에 대답하는 사람은 무조건 한 잔! 대답하지 말고 질문으로만 대답하게 하세요.'
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
        if (this.deck.length === 0 || this.gameOver) return null;

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
        
        playingCard.classList.remove('ready', 'bounce-in', 'flipping');
        
        setTimeout(() => {
            this.updateCardContent(card);
            playingCard.classList.add('flipping');
            
            setTimeout(() => {
                playingCard.classList.remove('flipping');
                playingCard.classList.add('bounce-in');
                if (!this.gameOver) {
                    playingCard.classList.add('ready');
                }
            }, 800);
        }, 10);
    }

    updateCardContent(card) {
        const cardValue = document.getElementById('cardValue');
        const cardSuit = document.getElementById('cardSuit');
        const cardValueSmall = document.getElementById('cardValueSmall');
        const cardSuitSmall = document.getElementById('cardSuitSmall');
        const ruleName = document.getElementById('ruleName');
        const ruleText = document.getElementById('ruleText');
        
        if (!cardValue) return;

        cardValue.textContent = card.value;
        cardSuit.textContent = card.suit;
        cardSuit.className = `card-suit ${card.suitClass}`;
        cardValueSmall.textContent = card.value;
        cardSuitSmall.textContent = card.suit;
        cardSuitSmall.className = `card-suit-small ${card.suitClass}`;
        
        const rule = this.cardRules[card.value];
        ruleName.textContent = `${card.value} - ${rule.name}`;
        
        let actionDescription = rule.action;
        if (card.value === 'K') {
            if (this.kingsDrawn === 4) {
                actionDescription = '4번째 킹! 컵에 담긴 모든 술을 마셔야 합니다! 게임 종료! 🍻';
            } else {
                actionDescription = rule.action.replace('{kingNumber}', this.kingsDrawn);
            }
        }
        
        ruleText.innerHTML = actionDescription;
    }

    showCardAction(card) {
        if (card.value === 'K') {
            this.addToKingsCup(card);
        }
        
        const nextBtn = document.getElementById('nextButton');
        const resetBtn = document.getElementById('resetButton');
        if (nextBtn) nextBtn.style.display = this.gameOver ? 'none' : 'inline-block';
        if (resetBtn) resetBtn.style.display = 'inline-block';
        
        if (this.gameOver) this.showGameOver();
    }

    addToKingsCup(card) {
        this.cupContents.push(`${card.value}${card.suit}`);
        this.updateKingsCup();
    }

    updateKingsCup() {
        const cupContents = document.getElementById('cupContents');
        if (!cupContents) return;
        
        if (this.cupContents.length === 0) {
            cupContents.textContent = '비어있음';
        } else {
            const kingCards = this.cupContents.map(card => 
                `<span class="king-card badge bg-danger m-1">${card}</span>`
            ).join('');
            cupContents.innerHTML = kingCards;
        }
    }

    showGameOver() {
        const ruleName = document.getElementById('ruleName');
        const ruleText = document.getElementById('ruleText');
        
        if (ruleName) ruleName.innerHTML = '🎉 게임 종료! 🎉';
        if (ruleText) ruleText.innerHTML = `
            4개의 킹이 모두 나타났습니다!<br>
            🏆 마지막 킹을 뽑은 사람이 가운데 컵을 모두 마십니다!<br>
            고생하셨습니다! 즐거운 시간 되세요!
        `;
    }

    nextCard() {
        this.currentPlayer++;
        const nextBtn = document.getElementById('nextButton');
        if (nextBtn) nextBtn.style.display = 'none';
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
        
        const ruleName = document.getElementById('ruleName');
        const ruleText = document.getElementById('ruleText');
        if (ruleName) ruleName.textContent = '카드 뽑기';
        if (ruleText) ruleText.textContent = '화면을 클릭하여 첫 번째 카드를 뽑으세요!';
        
        const nextBtn = document.getElementById('nextButton');
        const resetBtn = document.getElementById('resetButton');
        if (nextBtn) nextBtn.style.display = 'none';
        if (resetBtn) resetBtn.style.display = 'none';
        
        this.initializeGame();
    }

    updateDisplay() {
        const leftEl = document.getElementById('cardsLeft');
        const drawnEl = document.getElementById('kingsDrawn');
        if (leftEl) leftEl.textContent = this.deck.length;
        if (drawnEl) drawnEl.textContent = this.kingsDrawn;
        this.updateKingsCup();
    }
}

let game;
document.addEventListener('DOMContentLoaded', function() {
    game = new KingsCupGame();
});

function drawCard() {
    if (game && !game.gameOver) {
        game.drawCard();
    }
}

function nextCard() {
    if (game) game.nextCard();
}

function resetGame() {
    if (game) game.resetGame();
}
