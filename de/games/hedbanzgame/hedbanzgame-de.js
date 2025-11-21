// Game state
let gameState = {
    currentPlayer: 1,
    remainingPlayers: 2,
    totalPlayers: 2,
    cards: [
        // Sprache
        "Sag 'Ah'",
        "Sag 'Hmm'",
        "Sag 'Oh'",
        "Sag 'Hey'",
        "Sag 'Ha'",
        "Sag 'Hehe'",
        "Sag 'Haha'",
        "Sag 'Wow'",
        "Sag 'Ja'",
        "Sag 'Wirklich?'",
        "Sag 'Richtig'",
        "Sag 'Wahr'",
        "Sag 'Auf keinen Fall'",
        "Sag 'Cool'",
        "Sag 'Okay'",
        // Körperaktionen
        "Kopf berühren",
        "Nase berühren",
        "Augen blinzeln",
        "Dehnen",
        "Ohren berühren",
        "Kopf nicken",
        "Kopf schütteln",
        "Schultern klopfen",
        "Hand heben",
        "Kinn berühren",
        "Augen reiben",
        "Wangen berühren",
        "Kopf kratzen",
        "Stirn berühren",
        "Hinterkopf berühren",
        "Nacken berühren",
        "Arm berühren",
        "Handgelenk berühren",
        "Handfläche berühren",
        "Finger berühren",
        "Bauch berühren",
        "Knie berühren",
        "Knöchel berühren",
        "Schulter berühren",
        "Ellbogen berühren",
        "Bein schütteln",
        "Fuß wackeln",
        "Nacken drehen",
        "Handgelenk drehen",
        "Mit Augen rollen",
        "Haare blasen",
        "Lippen spitzen",
        "Lippe beißen",
        "Lippen lecken",
        "Schnüffeln"
    ],
    usedCards: [],
    isCardDrawn: false
};

// DOM elements
const gameSetupDiv = document.getElementById('gameSetup');
const gameAreaDiv = document.getElementById('gameArea');
const playerCountSelect = document.getElementById('playerCount');
const startGameBtn = document.getElementById('startGame');
const drawCardBtn = document.getElementById('drawCard');
const nextPlayerBtn = document.getElementById('nextPlayer');
const currentPlayerSpan = document.getElementById('currentPlayer');
const remainingPlayersSpan = document.getElementById('remainingPlayers');
const currentCardDiv = document.querySelector('.current-card');

// Start game button event
startGameBtn.addEventListener('click', () => {
    const selectedPlayers = parseInt(playerCountSelect.value);
    gameState.totalPlayers = selectedPlayers;
    gameState.remainingPlayers = selectedPlayers;
    gameState.currentPlayer = 1;

    // Hide setup screen, show game area
    gameSetupDiv.style.display = 'none';
    gameAreaDiv.style.display = 'block';

    // Update display
    updateDisplay();
});

// Draw card button event
drawCardBtn.addEventListener('click', () => {
    if (gameState.cards.length === 0) {
        // If all cards are used, reshuffle
        gameState.cards = [...gameState.usedCards];
        gameState.usedCards = [];
    }

    // Randomly draw a card
    const randomIndex = Math.floor(Math.random() * gameState.cards.length);
    const drawnCard = gameState.cards.splice(randomIndex, 1)[0];
    gameState.usedCards.push(drawnCard);

    // Display the card
    currentCardDiv.textContent = drawnCard;
    gameState.isCardDrawn = true;

    // Enable next player button
    nextPlayerBtn.disabled = false;
    drawCardBtn.disabled = true;
});

// Next player button event
nextPlayerBtn.addEventListener('click', () => {
    gameState.currentPlayer++;

    if (gameState.currentPlayer > gameState.totalPlayers) {
        gameState.currentPlayer = 1;
    }

    // Reset card drawn flag
    gameState.isCardDrawn = false;
    currentCardDiv.textContent = 'Drücke "Karte ziehen"';

    // Disable next player button, enable draw card button
    nextPlayerBtn.disabled = true;
    drawCardBtn.disabled = false;

    // Update display
    updateDisplay();
});

function updateDisplay() {
    currentPlayerSpan.textContent = gameState.currentPlayer;
    remainingPlayersSpan.textContent = gameState.totalPlayers;
}

// Initialize display
updateDisplay();
