// Король чаши Game Logic
class KingsCupGame {
    constructor() {
        this.deck = [];
        this.drawnCards = [];
        this.kingsDrawn = 0;
        this.gameOver = false;
        this.cupContents = [];
        this.currentИгрок = 1;
        this.gameCount = 0;
        
        // Card rules and actions
        this.cardRules = {
            'A': {
                name: 'Водопад',
                description: 'Everyone starts drinking and can\'t stop until the person before them stops! Goes clockwise from the card drawer.',
                action: '🌊 Start the waterfall! Все пьют continuously until the person before you stops!'
            },
            '2': {
                name: 'Ты',
                description: 'Choose someone to drink. Point to any player and they must take a sip.',
                action: '👉 Choose someone to drink! Point to a player and they take a sip!'
            },
            '3': {
                name: 'Я',
                description: 'Ты drink! The person who drew this card must take a sip.',
                action: '🍻 Ты drink! Take a sip yourself!'
            },
            '4': {
                name: 'Пол',
                description: 'Everyone must touch the floor immediately. Last person to touch the floor drinks.',
                action: '⬇️ Everyone touch the floor now! Last person drinks!'
            },
            '5': {
                name: 'Парни',
                description: 'All guys/boys drink together. Every male player takes a sip at the same time.',
                action: '👦 All guys drink together! Boys take a sip!'
            },
            '6': {
                name: 'Девочки',
                description: 'Все девочки пьют together. Every female player takes a sip at the same time.',
                action: '👧 Все девочки пьют together! Ladies take a sip!'
            },
            '7': {
                name: 'Рай',
                description: 'Everyone points to the sky/ceiling immediately. Last person to point up drinks.',
                action: '☝️ Everyone point to heaven now! Last person drinks!'
            },
            '8': {
                name: 'Напарник',
                description: 'Choose a drinking buddy. Whenever you drink, they must drink too. This partnership lasts until someone else draws an 8.',
                action: '👫 Choose your drinking mate! When you drink, they drink too until the next 8 is drawn!'
            },
            '9': {
                name: 'Рифма',
                description: 'Say a word, then everyone takes turns saying words that rhyme. First person who can\'t think of a rhyme or repeats a word does a challenge.',
                action: '🎵 Start with a word! Everyone take turns rhyming. No repeats!'
            },
            '10': {
                name: 'Категории',
                description: 'Name a category (like animals, colors, etc.), then everyone takes turns naming items in that category. First person who can\'t think of one does a challenge.',
                action: '📝 Pick a category! Everyone name items. Can\'t think of one? Do a challenge!'
            },
            'J': {
                name: 'Make a Rule',
                description: 'Create a new rule that everyone must follow for the rest of the game. Be creative! Examples: "No pointing", "Speak in accents", "No saying names".',
                action: '📜 Make a rule everyone must follow! Get creative! (e.g., "No pointing", "Speak in funny voices")'
            },
            'Q': {
                name: 'Вопросы',
                description: 'Ты can only ask questions to other players. Anyone who answers (instead of asking back) drinks. This continues until someone else draws a Queen.',
                action: '❓ Ты can only ask questions! Anyone who answers (instead of asking back) drinks!'
            },
            'K': {
                name: 'Король чаши',
                description: 'Pour some of your drink into the Король чаши in the center. If this is the 4th King, you must drink the entire Король чаши and the game ends!',
                action: '👑 Pour your drink into the Король чаши! This is the {kingNumber} King!'
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
                actionDescription = 'Fourth King! Ты must drink the entire Король чаши! Game Over! 🍻';
            } else {
                actionDescription = `Pour your drink into the Король чаши! This is the ${this.getOrdinal(this.kingsDrawn)} King!`;
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
                `<div style="margin-bottom: 0.5rem;"><strong>Game Over!</strong></div>${kingCards}`;
        }
    }

    updateKingsCup() {
        const cupContents = document.getElementById('cupContents');
        if (this.cupContents.length === 0) {
            cupContents.textContent = 'Пусто';
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
        
        ruleName.innerHTML = '🎉 Game Over! 🎉';
        ruleText.innerHTML = `
            All 4 Kings have been drawn!<br>
            🏆 The final King must drink the Король чаши!<br>
            🎊 Thanks for playing!
        `;
        
        // Add celebration animation
        setTimeout(() => {
            document.querySelector('.cup-container').classList.add('celebrate');
        }, 500);
    }

    nextCard() {
        this.currentИгрок++;
        
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
        this.currentИгрок = 1;
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
        
        ruleName.textContent = 'Вытянуть карту';
        ruleText.textContent = 'Нажмите, чтобы вытянуть первую карту!';
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
        const ordinals = ['', '1st', '2nd', '3rd', '4th'];
        return ordinals[number] || `${number}th`;
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
    // Create a more pleasant card flip sound
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create multiple oscillators for a richer sound
        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Card flip sound - swoosh effect
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
        // Ignore audio errors - not all browsers support Web Audio API
    }
}

function playKingSound() {
    // Special sound for Kings
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Royal trumpet-like sound
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(554.37, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.2);
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        // Ignore audio errors
    }
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

// Add helpful tooltips
document.addEventListener('DOMContentLoaded', function() {
    // Add tooltip functionality if needed
    const playingCard = document.getElementById('playingCard');
    if (playingCard) {
        playingCard.title = 'Click to draw a card (or press Space)';
    }
    
    const nextButton = document.getElementById('nextButton');
    if (nextButton) {
        nextButton.title = 'Draw next card (or press Space)';
    }
    
    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
        resetButton.title = 'Start a new game (or press R)';
    }
});

// Export for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KingsCupGame };
}