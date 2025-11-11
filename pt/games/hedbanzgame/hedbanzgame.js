// Game state
let gameState = {
    currentPlayer: 1,
    remainingPlayers: 2,
    totalPlayers: 2,
    cards: [
        // Speech related
        "Say 'Ah'",
        "Say 'Hmm'",
        "Say 'Oh'",
        "Say 'Hey'",
        "Say 'Ha'",
        "Say 'Hehe'",
        "Say 'Haha'",
        "Say 'Wow'",
        "Say 'Yeah'",
        "Say 'Really?'",
        "Say 'Right'",
        "Say 'True'",
        "Say 'No way'",
        "Say 'Cool'",
        "Say 'Okay'",
        // Body actions
        "Touch head",
        "Touch nose",
        "Blink eyes",
        "Stretch",
        "Touch ears",
        "Nod head",
        "Shake head",
        "Pat shoulders",
        "Raise hand",
        "Touch chin",
        "Rub eyes",
        "Touch cheeks",
        "Scratch head",
        "Touch forehead",
        "Touch back of head",
        "Touch neck",
        "Touch arm",
        "Touch wrist",
        "Touch palm",
        "Touch fingers",
        "Touch belly",
        "Touch knee",
        "Touch ankle",
        "Touch shoulder",
        "Touch elbow",
        "Shake leg",
        "Wiggle foot",
        "Rotate neck",
        "Rotate wrist",
        "Roll eyes",
        "Blow hair",
        "Purse lips",
        "Bite lip",
        "Lick lips",
        "Sniff"
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
    
    // Display card content
    currentCardDiv.innerHTML = `<p>${drawnCard}</p>`;
    
    // Update button states
    drawCardBtn.disabled = true;
    nextPlayerBtn.disabled = false;
    gameState.isCardDrawn = true;
});

// Next player button event
nextPlayerBtn.addEventListener('click', () => {
    if (gameState.remainingPlayers > 1) {
        gameState.remainingPlayers--;
    } else {
        // Game over, reset game
        resetGame();
        return;
    }
    
    // Update current player
    gameState.currentPlayer = (gameState.currentPlayer % gameState.totalPlayers) + 1;
    
    // Reset card display
    currentCardDiv.innerHTML = '<p>Your card will appear here</p>';
    
    // Update button states
    drawCardBtn.disabled = false;
    nextPlayerBtn.disabled = true;
    gameState.isCardDrawn = false;
    
    // Update display
    updateDisplay();
});

// Update display function
function updateDisplay() {
    currentPlayerSpan.textContent = gameState.currentPlayer;
    remainingPlayersSpan.textContent = gameState.remainingPlayers;
}

// Reset game function
function resetGame() {
    // Show setup screen, hide game area
    gameSetupDiv.style.display = 'block';
    gameAreaDiv.style.display = 'none';
    
    // Reset game state
    gameState = {
        currentPlayer: 1,
        remainingPlayers: gameState.totalPlayers,
        totalPlayers: gameState.totalPlayers,
        cards: [
            // Speech related
            "Say 'Ah'",
            "Say 'Hmm'",
            "Say 'Oh'",
            "Say 'Hey'",
            "Say 'Ha'",
            "Say 'Hehe'",
            "Say 'Haha'",
            "Say 'Wow'",
            "Say 'Yeah'",
            "Say 'Really?'",
            "Say 'Right'",
            "Say 'True'",
            "Say 'No way'",
            "Say 'Cool'",
            "Say 'Okay'",
            // Body actions
            "Touch head",
            "Touch nose",
            "Blink eyes",
            "Stretch",
            "Touch ears",
            "Nod head",
            "Shake head",
            "Pat shoulders",
            "Raise hand",
            "Touch chin",
            "Rub eyes",
            "Touch cheeks",
            "Scratch head",
            "Touch forehead",
            "Touch back of head",
            "Touch neck",
            "Touch arm",
            "Touch wrist",
            "Touch palm",
            "Touch fingers",
            "Touch belly",
            "Touch knee",
            "Touch ankle",
            "Touch shoulder",
            "Touch elbow",
            "Shake leg",
            "Wiggle foot",
            "Rotate neck",
            "Rotate wrist",
            "Roll eyes",
            "Blow hair",
            "Purse lips",
            "Bite lip",
            "Lick lips",
            "Sniff"
        ],
        usedCards: [],
        isCardDrawn: false
    };
    
    currentCardDiv.innerHTML = '<p>Your card will appear here</p>';
    drawCardBtn.disabled = false;
    nextPlayerBtn.disabled = true;
    updateDisplay();
    alert('Game Over! Choose number of players to start a new game');
}
