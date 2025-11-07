// Logique du jeu Kings Cup (Version française)
class KingsCupGame {
    constructor() {
        this.deck = [];
        this.drawnCards = [];
        this.kingsDrawn = 0;
        this.gameOver = false;
        this.cupContents = [];
        this.currentPlayer = 1;
        this.gameCount = 0;

        // Règles des cartes et actions
        this.cardRules = {
            'A': {
                name: 'Cascade',
                description: 'Tous les joueurs commencent à boire et ne peuvent pas s\'arrêter jusqu\'à ce que la personne avant eux s\'arrête ! Tourne dans le sens horaire à partir du tireur.',
                action: '🌊 Commencez la cascade ! Tout le monde boit continuellement jusqu\'à ce que la personne avant vous s\'arrête !'
            },
            '2': {
                name: 'Quelqu\'un',
                description: 'Choisissez quelqu\'un pour boire. Pointez vers n\'importe quel joueur et il doit prendre une gorgée.',
                action: '👉 Choisissez quelqu\'un pour boire ! Pointez vers un joueur et il prend une gorgée !'
            },
            '3': {
                name: 'Moi',
                description: 'Vous buvez ! La personne qui a tiré cette carte doit prendre une gorgée.',
                action: '🍻 Vous buvez ! Prenez une gorgée vous-même !'
            },
            '4': {
                name: 'Sol',
                description: 'Tous les joueurs doivent toucher le sol immédiatement. Le dernier joueur à toucher le sol boit.',
                action: '⬇️ Tout le monde touche le sol maintenant ! Le dernier boit !'
            },
            '5': {
                name: 'Garçons',
                description: 'Tous les garçons/hommes boivent ensemble. Chaque joueur masculin prend une gorgée en même temps.',
                action: '👦 Tous les garçons boivent ensemble ! Les gars prennent une gorgée !'
            },
            '6': {
                name: 'Filles',
                description: 'Toutes les filles boivent ensemble. Chaque joueuse féminine prend une gorgée en même temps.',
                action: '👧 Toutes les filles boivent ensemble ! Les filles prennent une gorgée !'
            },
            '7': {
                name: 'Ciel',
                description: 'Chaque joueur pointe vers le ciel/plafond immédiatement. Le dernier joueur à pointer vers le haut boit.',
                action: '☝️ Tout le monde pointe vers le ciel maintenant ! Le dernier boit !'
            },
            '8': {
                name: 'Copain',
                description: 'Choisissez un compagnon de boisson. Quand vous buvez, il doit aussi boire. Cette association dure jusqu\'à ce que quelqu\'un d\'autre tire un 8.',
                action: '👫 Choisissez votre compagnon ! Quand vous buvez, il boit aussi jusqu\'au prochain 8 !'
            },
            '9': {
                name: 'Rime',
                description: 'Dites un mot, puis tout le monde prend à tour de rôle des mots qui riment. La première personne qui ne peut pas trouver une rime ou répète un mot doit relever un défi.',
                action: '🎵 Commencez avec un mot ! Tout le monde prend des tours qui riment. Pas de répétitions !'
            },
            '10': {
                name: 'Catégories',
                description: 'Nommez une catégorie (comme les animaux, les couleurs, etc.), puis tout le monde prend à tour de rôle des éléments de cette catégorie. La première personne qui ne peut pas en trouver une doit relever un défi.',
                action: '📝 Choisissez une catégorie ! Tout le monde nomme des éléments. Vous n\'en trouvez pas ? Relevez un défi !'
            },
            'J': {
                name: 'Faire une Règle',
                description: 'Créez une nouvelle règle que tout le monde doit respecter pour le reste du jeu. Soyez créatif ! Exemples : "Pas de pointage", "Parlez avec un accent", "Ne pas dire les noms".',
                action: '📜 Créez une règle que tout le monde doit respecter ! Soyez créatif ! (p. ex., "Pas de pointage", "Parlez avec des voix drôles")'
            },
            'Q': {
                name: 'Questions',
                description: 'Vous ne pouvez poser que des questions aux autres joueurs. Quiconque répond (au lieu de poser une question en retour) boit. Cela continue jusqu\'à ce que quelqu\'un d\'autre tire une Reine.',
                action: '❓ Vous ne pouvez poser que des questions ! Quiconque répond (au lieu de poser une question en retour) boit !'
            },
            'K': {
                name: 'Coupe des Rois',
                description: 'Versez une partie de votre verre dans la Coupe des Rois au centre. Si c\'est le 4e Roi, vous devez boire toute la Coupe des Rois et le jeu se termine !',
                action: '👑 Versez votre verre dans la Coupe des Rois ! C\'est le {kingNumber}e Roi !'
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

        // Afficher les recommandations de jeu après 5 cartes
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

        // Supprimer les classes d'animation existantes
        playingCard.classList.remove('sliding-in', 'ready', 'flipping', 'bounce-in', 'sparkling');
        cardFront.classList.remove('revealing');
        cardBack.classList.remove('flipping-out');

        // Pour la première carte, glissez simplement dedans
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

        // Pour toutes les cartes suivantes, utilisez l'animation flip
        playingCard.classList.add('flipping');
        cardBack.style.display = 'block';
        cardBack.classList.add('flipping-out');

        // Mettre à jour le contenu au milieu du flip
        setTimeout(() => {
            this.updateCardContent(card);
            cardFront.classList.add('revealing');
            cardBack.style.display = 'none';
        }, 600);

        // Terminez l'animation et ajoutez des effets
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

        // Effets spéciaux pour les Rois
        if (card.value === 'K') {
            playingCard.classList.add('king-special', 'sparkling');
            setTimeout(() => {
                playingCard.classList.remove('king-special');
                // Garder le scintillement pour les Rois
            }, 1000);
        }

        // Effets spéciaux pour les As et les cartes de face
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
                actionDescription = '4e Roi ! Vous devez boire toute la Coupe des Rois ! Fin du jeu ! 🍻';
            } else {
                actionDescription = `Versez votre verre dans la Coupe des Rois ! C\'est le ${this.getOrdinal(this.kingsDrawn)}e Roi !`;
            }
        }

        ruleText.innerHTML = actionDescription;
    }

    showCardAction(card) {
        const playingCard = document.getElementById('playingCard');

        if (card.value === 'K') {
            this.addToKingsCup(card);
        }

        // Afficher les boutons appropriés
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
            // Fin du jeu - 4e roi tiré
            const kingCards = this.cupContents.map(card =>
                `<span class="king-card">${card}</span>`
            ).join('');
            document.getElementById('cupContents').innerHTML =
                `<div style="margin-bottom: 0.5rem;"><strong>Fin du jeu !</strong></div>${kingCards}`;
        }
    }

    updateKingsCup() {
        const cupContents = document.getElementById('cupContents');
        if (this.cupContents.length === 0) {
            cupContents.textContent = 'Vide';
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

        ruleName.innerHTML = '🎉 Fin du jeu ! 🎉';
        ruleText.innerHTML = `
            Les 4 Rois ont tous été tirés !<br>
            🏆 Le dernier Roi doit boire la Coupe des Rois !<br>
            🎊 Merci d'avoir joué !
        `;

        // Ajouter l'animation de célébration
        setTimeout(() => {
            document.querySelector('.cup-container').classList.add('celebrate');
        }, 500);
    }

    nextCard() {
        this.currentPlayer++;

        // Masquer les boutons de contrôle
        document.getElementById('nextButton').style.display = 'none';

        if (!this.gameOver) {
            // Tirez directement la carte suivante
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

        // Réinitialiser l'affichage
        const playingCard = document.getElementById('playingCard');
        playingCard.className = 'playing-card ready';

        document.getElementById('nextButton').style.display = 'none';
        document.getElementById('resetButton').style.display = 'none';

        // Réinitialiser le contenu de la carte
        const ruleName = document.getElementById('ruleName');
        const ruleText = document.getElementById('ruleText');
        const cardValue = document.getElementById('cardValue');
        const cardSuit = document.getElementById('cardSuit');
        const cardValueSmall = document.getElementById('cardValueSmall');
        const cardSuitSmall = document.getElementById('cardSuitSmall');

        ruleName.textContent = 'Tirer une carte';
        ruleText.textContent = 'Cliquez pour tirer votre première carte !';
        cardValue.textContent = '?';
        cardSuit.textContent = '🃏';
        cardValueSmall.textContent = '?';
        cardSuitSmall.textContent = '🃏';

        // Supprimer les classes de costume
        cardSuit.className = '';
        cardSuitSmall.className = '';

        // Supprimer la classe de célébration
        document.querySelector('.cup-container').classList.remove('celebrate');

        this.initializeGame();
    }

    updateDisplay() {
        document.getElementById('cardsLeft').textContent = this.deck.length;
        document.getElementById('kingsDrawn').textContent = this.kingsDrawn;
        this.updateKingsCup();
    }

    getOrdinal(number) {
        const ordinals = ['', '1er', '2e', '3e', '4e'];
        return ordinals[number] || `${number}e`;
    }
}

// Initialiser le jeu
let game;

// Attendre le chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    game = new KingsCupGame();
});

// Fonctions de jeu appelées par les boutons HTML
function drawCard() {
    if (game && !game.gameOver) {
        const playingCard = document.getElementById('playingCard');

        // Empêcher le double-clic pendant les animations
        if (playingCard.classList.contains('sliding-in') ||
            playingCard.classList.contains('flipping') ||
            playingCard.classList.contains('bounce-in')) {
            return;
        }

        const card = game.drawCard();
        if (card) {
            // Ajouter un effet sonore (facultatif)
            if (card.value === 'K') {
                setTimeout(() => playKingSound(), 600); // Jouer après le début de l'animation de flip
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

// Fonctions d'effet sonore améliorées
function playCardSound() {
    // Créer un son de retournement de carte plus agréable
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Créer plusieurs oscillateurs pour un son plus riche
        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Son de retournement de carte - effet whoosh
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
        // Ignorer les erreurs audio - tous les navigateurs ne supportent pas l'API Web Audio
    }
}

function playKingSound() {
    // Son spécial pour les Rois
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Son de trompette royale
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(554.37, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.2);
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime + 0.3);

        gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        // Ignorer les erreurs audio
    }
}

// Contrôles au clavier
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

// Ajouter des info-bulles utiles
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter la fonctionnalité d'info-bulle si nécessaire
    const playingCard = document.getElementById('playingCard');
    if (playingCard) {
        playingCard.title = 'Cliquez pour tirer une carte (ou appuyez sur Espace)';
    }

    const nextButton = document.getElementById('nextButton');
    if (nextButton) {
        nextButton.title = 'Tirez la prochaine carte (ou appuyez sur Espace)';
    }

    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
        resetButton.title = 'Commencez une nouvelle partie (ou appuyez sur R)';
    }
});

// Exporter pour d'éventuels tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KingsCupGame };
}
