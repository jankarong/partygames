// État du jeu
let gameState = {
    currentPlayer: 1,
    remainingPlayers: 2,
    totalPlayers: 2,
    cards: [
        // Actions verbales
        "Dis 'Ah'",
        "Dis 'Hmm'",
        "Dis 'Oh'",
        "Dis 'Hey'",
        "Dis 'Ha'",
        "Dis 'Hehe'",
        "Dis 'Haha'",
        "Dis 'Wow'",
        "Dis 'Ouais'",
        "Dis 'Vraiment ?'",
        "Dis 'D'accord'",
        "Dis 'Vrai'",
        "Dis 'Pas possible'",
        "Dis 'Cool'",
        "Dis 'Bien sûr'",
        // Actions du corps
        "Touche ta tête",
        "Touche ton nez",
        "Cligne des yeux",
        "Étire-toi",
        "Touche tes oreilles",
        "Fais un signe de tête",
        "Secoue la tête",
        "Tape tes épaules",
        "Lève la main",
        "Touche ton menton",
        "Frotte tes yeux",
        "Touche tes joues",
        "Gratte ta tête",
        "Touche ton front",
        "Touche l'arrière de ta tête",
        "Touche ton cou",
        "Touche ton bras",
        "Touche ton poignet",
        "Touche ta paume",
        "Touche tes doigts",
        "Touche ton ventre",
        "Touche ton genou",
        "Touche ta cheville",
        "Touche ton épaule",
        "Touche ton coude",
        "Secoue ta jambe",
        "Remue ton pied",
        "Fais tourner ton cou",
        "Fais tourner ton poignet",
        "Roule les yeux",
        "Souffle dans tes cheveux",
        "Pince tes lèvres",
        "Mords ta lèvre",
        "Lèche tes lèvres",
        "Renifle"
    ],
    usedCards: [],
    isCardDrawn: false
};

// Éléments DOM
const gameSetupDiv = document.getElementById('gameSetup');
const gameAreaDiv = document.getElementById('gameArea');
const playerCountSelect = document.getElementById('playerCount');
const startGameBtn = document.getElementById('startGame');
const drawCardBtn = document.getElementById('drawCard');
const nextPlayerBtn = document.getElementById('nextPlayer');
const currentPlayerSpan = document.getElementById('currentPlayer');
const remainingPlayersSpan = document.getElementById('remainingPlayers');
const currentCardDiv = document.querySelector('.current-card');

// Événement du bouton de démarrage
startGameBtn.addEventListener('click', () => {
    const selectedPlayers = parseInt(playerCountSelect.value);
    gameState.totalPlayers = selectedPlayers;
    gameState.remainingPlayers = selectedPlayers;
    gameState.currentPlayer = 1;

    // Masquer l'écran de configuration, afficher la zone de jeu
    gameSetupDiv.style.display = 'none';
    gameAreaDiv.style.display = 'block';

    // Mettre à jour l'affichage
    updateDisplay();
});

// Événement du bouton de tirage de carte
drawCardBtn.addEventListener('click', () => {
    if (gameState.cards.length === 0) {
        // Si toutes les cartes sont utilisées, remélanger
        gameState.cards = [...gameState.usedCards];
        gameState.usedCards = [];
    }

    // Tirer aléatoirement une carte
    const randomIndex = Math.floor(Math.random() * gameState.cards.length);
    const drawnCard = gameState.cards.splice(randomIndex, 1)[0];
    gameState.usedCards.push(drawnCard);

    // Afficher le contenu de la carte
    currentCardDiv.innerHTML = `<p>${drawnCard}</p>`;

    // Mettre à jour l'état des boutons
    drawCardBtn.disabled = true;
    nextPlayerBtn.disabled = false;
    gameState.isCardDrawn = true;
});

// Événement du bouton joueur suivant
nextPlayerBtn.addEventListener('click', () => {
    if (gameState.remainingPlayers > 1) {
        gameState.remainingPlayers--;
    } else {
        // Fin du jeu, réinitialiser
        resetGame();
        return;
    }

    // Mettre à jour le joueur actuel
    gameState.currentPlayer = (gameState.currentPlayer % gameState.totalPlayers) + 1;

    // Réinitialiser l'affichage de la carte
    currentCardDiv.innerHTML = '<p>Ta carte apparaîtra ici</p>';

    // Mettre à jour l'état des boutons
    drawCardBtn.disabled = false;
    nextPlayerBtn.disabled = true;
    gameState.isCardDrawn = false;

    // Mettre à jour l'affichage
    updateDisplay();
});

// Fonction de mise à jour de l'affichage
function updateDisplay() {
    currentPlayerSpan.textContent = gameState.currentPlayer;
    remainingPlayersSpan.textContent = gameState.remainingPlayers;
}

// Fonction de réinitialisation du jeu
function resetGame() {
    // Afficher l'écran de configuration, masquer la zone de jeu
    gameSetupDiv.style.display = 'block';
    gameAreaDiv.style.display = 'none';

    // Réinitialiser l'état du jeu
    gameState = {
        currentPlayer: 1,
        remainingPlayers: 2,
        totalPlayers: 2,
        cards: [
            // Actions verbales
            "Dis 'Ah'",
            "Dis 'Hmm'",
            "Dis 'Oh'",
            "Dis 'Hey'",
            "Dis 'Ha'",
            "Dis 'Hehe'",
            "Dis 'Haha'",
            "Dis 'Wow'",
            "Dis 'Ouais'",
            "Dis 'Vraiment ?'",
            "Dis 'D'accord'",
            "Dis 'Vrai'",
            "Dis 'Pas possible'",
            "Dis 'Cool'",
            "Dis 'Bien sûr'",
            // Actions du corps
            "Touche ta tête",
            "Touche ton nez",
            "Cligne des yeux",
            "Étire-toi",
            "Touche tes oreilles",
            "Fais un signe de tête",
            "Secoue la tête",
            "Tape tes épaules",
            "Lève la main",
            "Touche ton menton",
            "Frotte tes yeux",
            "Touche tes joues",
            "Gratte ta tête",
            "Touche ton front",
            "Touche l'arrière de ta tête",
            "Touche ton cou",
            "Touche ton bras",
            "Touche ton poignet",
            "Touche ta paume",
            "Touche tes doigts",
            "Touche ton ventre",
            "Touche ton genou",
            "Touche ta cheville",
            "Touche ton épaule",
            "Touche ton coude",
            "Secoue ta jambe",
            "Remue ton pied",
            "Fais tourner ton cou",
            "Fais tourner ton poignet",
            "Roule les yeux",
            "Souffle dans tes cheveux",
            "Pince tes lèvres",
            "Mords ta lèvre",
            "Lèche tes lèvres",
            "Renifle"
        ],
        usedCards: [],
        isCardDrawn: false
    };
}

// Exporter pour les tests potentiels
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { gameState };
}
