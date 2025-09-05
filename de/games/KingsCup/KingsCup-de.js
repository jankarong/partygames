/**
 * Kings Cup Spiel - Deutsche Version
 * Ein klassisches Trinkspiel für Gruppen
 */

class KingsCupGame {
    constructor() {
        this.deck = this.createDeck();
        this.currentCard = null;
        this.gameStarted = false;
        this.kingCount = 0;
        this.gameEnded = false;
        
        this.cardRules = {
            'A': {
                name: 'Ass - Wasserfall',
                rule: 'Alle trinken gleichzeitig. Du bestimmst wann alle aufhören dürfen.',
                icon: '🌊'
            },
            '2': {
                name: '2 - Du',
                rule: 'Du suchst eine Person aus, die trinken muss.',
                icon: '👉'
            },
            '3': {
                name: '3 - Ich',
                rule: 'Du musst trinken.',
                icon: '🍺'
            },
            '4': {
                name: '4 - Alle Jungs',
                rule: 'Alle männlichen Spieler müssen trinken.',
                icon: '👦'
            },
            '5': {
                name: '5 - Alle Mädels',
                rule: 'Alle weiblichen Spieler müssen trinken.',
                icon: '👧'
            },
            '6': {
                name: '6 - Daumen',
                rule: 'Lege deinen Daumen auf den Tisch. Alle anderen müssen das auch machen. Der Langsamste trinkt.',
                icon: '👍'
            },
            '7': {
                name: '7 - Himmel',
                rule: 'Alle zeigen nach oben. Der Langsamste trinkt.',
                icon: '☝️'
            },
            '8': {
                name: '8 - Kumpel',
                rule: 'Such dir einen Trinkpartner aus. Wenn einer von euch trinken muss, müssen beide trinken.',
                icon: '🤝'
            },
            '9': {
                name: '9 - Reim',
                rule: 'Such ein Wort aus. Alle müssen reihum ein Wort finden, das sich darauf reimt. Wer keins findet, trinkt.',
                icon: '🎵'
            },
            '10': {
                name: '10 - Kategorie',
                rule: 'Such eine Kategorie aus (z.B. Automarken). Alle müssen reihum etwas aus dieser Kategorie nennen. Wer nichts weiß, trinkt.',
                icon: '📝'
            },
            'J': {
                name: 'Bube - Regel',
                rule: 'Du darfst eine neue Regel aufstellen, die für den Rest des Spiels gilt.',
                icon: '⚖️'
            },
            'Q': {
                name: 'Dame - Fragestunde',
                rule: 'Du darfst niemandem mehr eine Frage beantworten. Wer dir eine Frage stellt, muss trinken.',
                icon: '❓'
            },
            'K': {
                name: 'König - Kings Cup',
                rule: 'Gieße etwas von deinem Getränk in den Kings Cup in der Mitte. Beim 4. König muss derjenige den ganzen Cup austrinken!',
                icon: '👑'
            }
        };

        this.specialMessages = {
            firstKing: 'Der erste König! Gieße etwas in den Kings Cup! 👑',
            secondKing: 'Zweiter König! Noch zwei bis zum großen Finale! 👑👑',
            thirdKing: 'Dritter König! Der nächste muss den Cup austrinken! 👑👑👑',
            fourthKing: 'VIERTER KÖNIG! 👑👑👑👑\nDu musst den gesamten Kings Cup austrinken!\nDas Spiel ist beendet!'
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateUI();
    }

    createDeck() {
        const suits = ['♠️', '♥️', '♦️', '♣️'];
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const deck = [];

        for (let suit of suits) {
            for (let rank of ranks) {
                deck.push({ rank, suit });
            }
        }

        return this.shuffleDeck(deck);
    }

    shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    startGame() {
        if (this.gameEnded) {
            this.resetGame();
        }
        
        this.gameStarted = true;
        this.updateStartButton();
        this.drawCard();
    }

    resetGame() {
        this.deck = this.createDeck();
        this.currentCard = null;
        this.gameStarted = false;
        this.kingCount = 0;
        this.gameEnded = false;
        
        document.getElementById('currentCard').innerHTML = '';
        document.getElementById('cardRule').innerHTML = '';
        document.getElementById('cardsRemaining').textContent = '52';
        document.getElementById('kingsDrawn').textContent = '0';
        
        this.updateStartButton();
    }

    drawCard() {
        if (this.deck.length === 0 || this.gameEnded) {
            this.endGame();
            return;
        }

        this.currentCard = this.deck.pop();
        this.displayCard();
        this.applyRule();
        this.updateGameStats();

        // Prüfe auf Könige
        if (this.currentCard.rank === 'K') {
            this.kingCount++;
            this.handleKing();
        }
    }

    displayCard() {
        const cardElement = document.getElementById('currentCard');
        const suitColor = (this.currentCard.suit === '♥️' || this.currentCard.suit === '♦️') ? 'red' : 'black';
        
        cardElement.innerHTML = `
            <div class="playing-card" style="color: ${suitColor}">
                <div class="card-rank">${this.currentCard.rank}</div>
                <div class="card-suit">${this.currentCard.suit}</div>
            </div>
        `;
    }

    applyRule() {
        const rule = this.cardRules[this.currentCard.rank];
        const ruleElement = document.getElementById('cardRule');
        
        ruleElement.innerHTML = `
            <div class="rule-content">
                <h3>${rule.icon} ${rule.name}</h3>
                <p>${rule.rule}</p>
            </div>
        `;
    }

    handleKing() {
        const messageElement = document.getElementById('kingMessage');
        let message = '';

        switch(this.kingCount) {
            case 1:
                message = this.specialMessages.firstKing;
                break;
            case 2:
                message = this.specialMessages.secondKing;
                break;
            case 3:
                message = this.specialMessages.thirdKing;
                break;
            case 4:
                message = this.specialMessages.fourthKing;
                this.gameEnded = true;
                setTimeout(() => this.endGame(), 3000);
                break;
        }

        if (message) {
            messageElement.innerHTML = `<div class="king-message show">${message}</div>`;
            
            // Nachricht nach 5 Sekunden ausblenden (außer bei Spielende)
            if (this.kingCount < 4) {
                setTimeout(() => {
                    messageElement.innerHTML = '';
                }, 5000);
            }
        }
    }

    updateGameStats() {
        document.getElementById('cardsRemaining').textContent = this.deck.length;
        document.getElementById('kingsDrawn').textContent = this.kingCount;
    }

    updateStartButton() {
        const button = document.getElementById('drawButton');
        if (!this.gameStarted) {
            button.textContent = 'Spiel starten';
            button.className = 'btn btn-success btn-lg';
        } else if (this.gameEnded) {
            button.textContent = 'Neues Spiel';
            button.className = 'btn btn-primary btn-lg';
        } else {
            button.textContent = 'Karte ziehen';
            button.className = 'btn btn-warning btn-lg';
        }
    }

    endGame() {
        this.gameEnded = true;
        this.updateStartButton();
        
        if (this.kingCount === 4) {
            // Spiel durch 4. König beendet
            this.showGameEndModal('Spiel beendet!', 'Der vierte König wurde gezogen! Derjenige muss den Kings Cup austrinken!');
        } else {
            // Alle Karten aufgebraucht
            this.showGameEndModal('Alle Karten gezogen!', 'Das Spiel ist zu Ende. Niemand musste den Kings Cup trinken!');
        }
    }

    showGameEndModal(title, message) {
        const modal = document.createElement('div');
        modal.className = 'game-end-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>${title}</h2>
                <p>${message}</p>
                <button onclick="this.closest('.game-end-modal').remove()" class="btn btn-primary">OK</button>
            </div>
        `;
        document.body.appendChild(modal);

        // Modal nach 10 Sekunden automatisch schließen
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 10000);
    }

    bindEvents() {
        const drawButton = document.getElementById('drawButton');
        const rulesToggle = document.getElementById('rulesToggle');
        const rulesContent = document.getElementById('rulesContent');

        drawButton.addEventListener('click', () => {
            if (!this.gameStarted || this.gameEnded) {
                this.startGame();
            } else {
                this.drawCard();
            }
        });

        rulesToggle.addEventListener('click', () => {
            rulesContent.classList.toggle('show');
            const icon = rulesToggle.querySelector('i');
            if (rulesContent.classList.contains('show')) {
                icon.className = 'fas fa-chevron-up';
            } else {
                icon.className = 'fas fa-chevron-down';
            }
        });

        // Tastatur-Unterstützung
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && this.gameStarted && !this.gameEnded) {
                e.preventDefault();
                this.drawCard();
            }
        });
    }

    updateUI() {
        this.updateStartButton();
        this.updateGameStats();
    }
}

// Spiel-Tipps und Varianten
const gameTips = [
    "Tipp: Stellt den Kings Cup in die Mitte des Tisches, wo jeder gut rankommt!",
    "Variante: Bei 'Kumpel' könnt ihr auch Trinkketten bilden!",
    "Tipp: Macht klare Regeln aus, bevor ihr anfangt (z.B. wie viel getrunken wird).",
    "Variante: Anstatt zu trinken könnt ihr auch andere Aufgaben erfüllen!",
    "Tipp: Spielt verantwortungsvoll und kennt eure Grenzen!",
    "Variante: Bei 'Kategorie' könnt ihr auch schwierigere Kategorien wählen!",
    "Tipp: Haltet Wasser bereit und macht Pausen wenn nötig.",
    "Variante: Macht aus 'Reim' ein Geschwindigkeitsspiel!"
];

// Zufällige Spieltipps anzeigen
function showRandomTip() {
    const tipElement = document.getElementById('gameTip');
    if (tipElement) {
        const randomTip = gameTips[Math.floor(Math.random() * gameTips.length)];
        tipElement.textContent = randomTip;
    }
}

// Spiel initialisieren wenn Seite geladen ist
let kingsCupGame;

document.addEventListener('DOMContentLoaded', function() {
    kingsCupGame = new KingsCupGame();
    
    // Zufälligen Tipp alle 30 Sekunden anzeigen
    showRandomTip();
    setInterval(showRandomTip, 30000);
});

// Funktionen für globale Verfügbarkeit
window.KingsCupGame = KingsCupGame;
window.showRandomTip = showRandomTip;

// Spiel-Ende für Navigation API verfügbar machen
window.onKingsCupGameEnd = function() {
    if (window.GameNavigationAPI && window.GameNavigationAPI.onGameEnd) {
        window.GameNavigationAPI.onGameEnd();
    }
};