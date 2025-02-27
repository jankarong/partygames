let gameState = {
    players: [],
    currentPlayer: 0,
    civilianWord: '',
    undercoverWord: '',
    eliminatedPlayers: new Set(),
    wordPairs: [
        // Food & Drink
        ['Pancake', 'Crepe'],
        ['Burger', 'Sloppy Joe'],
        ['Soda', 'Juice'],
        ['Taco', 'Burrito'],
        ['Candy Bar', 'Granola Bar'],
        ['Hot Sauce', 'Ketchup'],
        ['Muffin', 'Cupcake'],
        ['Nachos', 'Quesadilla'],
        ['Milk', 'Cream'],
        ['Toast', 'Crouton'],
        ['Bacon', 'Ham'],
        ['Jelly', 'Jam'],
        ['Pretzel', 'Cracker'],
        ['Espresso', 'Latte'],
        ['S\'more', 'Brownie'],
        ['Chili', 'Salsa'],
        ['Pickle', 'Olive'],
        ['Dumpling', 'Wonton'],
        ['Ramen', 'Pho'],
        ['Bagel', 'Donut'],

        // Animals
        ['Puppy', 'Bunny'],
        ['Crow', 'Raven'],
        ['Goldfish', 'Guppy'],
        ['Coyote', 'Hyena'],
        ['Peacock', 'Turkey'],
        ['Otter', 'Beaver'],
        ['Skunk', 'Porcupine'],
        ['Camel', 'Llama'],
        ['Parakeet', 'Canary'],
        ['Crab', 'Lobster'],
        ['Hedgehog', 'Mole'],
        ['Goat', 'Sheep'],
        ['Ferret', 'Weasel'],
        ['Pigeon', 'Seagull'],
        ['Koala', 'Sloth'],
        ['Cheetah', 'Leopard'],
        ['Butterfly', 'Moth'],
        ['Gorilla', 'Chimp'],
        ['Salamander', 'Newt'],
        ['Bison', 'Buffalo'],

        // Objects
        ['Sock', 'Slipper'],
        ['Mitten', 'Glove'],
        ['Couch', 'Recliner'],
        ['Fridge', 'Freezer'],
        ['Comb', 'Brush'],
        ['Umbrella', 'Hoodie'],
        ['Laptop', 'Monitor'],
        ['Purse', 'Fanny Pack'],
        ['Broom', 'Mop'],
        ['Flashlight', 'Lantern'],
        ['Headphones', 'Earbuds'],
        ['Tent', 'Hammock'],
        ['Marker', 'Crayon'],
        ['Rug', 'Mat'],
        ['Fan', 'Heater'],
        ['Chalk', 'Charcoal'],
        ['Suitcase', 'Duffel'],
        ['Scarf', 'Bandana'],
        ['Kite', 'Balloon'],
        ['Stapler', 'Tape'],

        // Jobs & Roles
        ['Clown', 'Magician'],
        ['Mailman', 'Courier'],
        ['Librarian', 'Bookseller'],
        ['Plumber', 'Electrician'],
        ['DJ', 'Drummer'],
        ['Vet', 'Zookeeper'],
        ['Waiter', 'Host'],
        ['Photographer', 'Model'],
        ['Referee', 'Coach'],
        ['Pirate', 'Sailor'],
        ['Lifeguard', 'Swimmer'],
        ['Blogger', 'Vlogger'],
        ['Carpenter', 'Painter'],
        ['Cowboy', 'Rancher'],
        ['Spy', 'Hacker'],

        // Entertainment
        ['Meme', 'GIF'],
        ['Prank', 'Stunt'],
        ['Sitcom', 'Sketch'],
        ['Board Game', 'Video Game'],
        ['TikTok', 'Reel'],
        ['Podcast', 'Audiobook'],
        ['Circus', 'Carnival'],
        ['Trivia', 'Quiz'],
        ['Concert', 'Karaoke'],
        ['Zombie', 'Vampire'],
        ['Flash Mob', 'Parade'],
        ['Puppet', 'Marionette'],
        ['Bingo', 'Lottery'],
        ['Cosplay', 'Costume'],
        ['Firework', 'Sparkler'],

        // Nature & Weather
        ['Puddle', 'Mud'],
        ['Creek', 'Ditch'],
        ['Tornado', 'Dust Devil'],
        ['Cactus', 'Succulent'],
        ['Rainbow', 'Sunset'],
        ['Wave', 'Ripple'],
        ['Icicle', 'Frost'],
        ['Volcano', 'Geyser'],
        ['Pebble', 'Boulder'],
        ['Thunder', 'Echo']
    ]
};

function startGame() {
    const playerCount = parseInt(document.getElementById('playerCount').value);
    const undercoverCount = parseInt(document.getElementById('undercoverCount').value);
    const whiteCount = parseInt(document.getElementById('whiteCount').value);
    const useCustomWords = document.getElementById('useCustomWords').checked;

    if (undercoverCount + whiteCount >= playerCount) {
        alert('Too many undercover and Mr. White players!');
        return;
    }

    // Initialize players
    gameState.players = Array(playerCount).fill('Civilian');

    // Set words based on custom input or random selection
    if (useCustomWords) {
        const civilianWord = document.getElementById('customCivilianWord').value.trim();
        const undercoverWord = document.getElementById('customUndercoverWord').value.trim();

        if (!civilianWord || !undercoverWord) {
            alert('Please enter both civilian and undercover words');
            return;
        }

        gameState.civilianWord = civilianWord;
        gameState.undercoverWord = undercoverWord;
    } else {
        const wordPair = gameState.wordPairs[Math.floor(Math.random() * gameState.wordPairs.length)];
        gameState.civilianWord = wordPair[0];
        gameState.undercoverWord = wordPair[1];
    }

    // Assign undercover players
    for (let i = 0; i < undercoverCount; i++) {
        let index;
        do {
            index = Math.floor(Math.random() * playerCount);
        } while (gameState.players[index] !== 'Civilian');
        gameState.players[index] = 'Undercover';
    }

    // Assign Mr. White players
    for (let i = 0; i < whiteCount; i++) {
        let index;
        do {
            index = Math.floor(Math.random() * playerCount);
        } while (gameState.players[index] !== 'Civilian');
        gameState.players[index] = 'Mr. White';
    }

    document.getElementById('setup-section').classList.add('hidden');
    document.getElementById('word-section').classList.remove('hidden');
    showWord();
}

function showWord() {
    const playerNum = gameState.currentPlayer + 1;
    document.getElementById('currentPlayer').textContent = playerNum;

    let word;
    const playerRole = gameState.players[gameState.currentPlayer];
    if (playerRole === 'Civilian') {
        word = gameState.civilianWord;
    } else if (playerRole === 'Undercover') {
        word = gameState.undercoverWord;
    } else { // Mr. White
        word = 'Blank Card';
    }

    document.getElementById('wordDisplay').textContent = word;

    // Reset flip card state
    const flipCard = document.querySelector('.flip-card');
    flipCard.classList.remove('flipped');

    // Remove previous click event listener
    flipCard.onclick = null;

    // Add new click event listener
    let hasBeenFlipped = false;
    flipCard.onclick = function () {
        if (!hasBeenFlipped) {
            this.classList.add('flipped');
            hasBeenFlipped = true;
        }
    };

    // Always show "Next Player" button
    document.querySelector('button[onclick="nextPlayer()"]').style.display = 'inline-block';
}

function nextPlayer() {
    gameState.currentPlayer++;
    if (gameState.currentPlayer >= gameState.players.length) {
        startVoting();
        return;
    }
    showWord();
}

function startVoting() {
    document.getElementById('word-section').classList.add('hidden');
    document.getElementById('game-section').classList.remove('hidden');
    updatePlayerList();
}

function updatePlayerList() {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';

    gameState.players.forEach((role, index) => {
        const playerNum = index + 1;
        const isEliminated = gameState.eliminatedPlayers.has(index);
        const playerDiv = document.createElement('div');
        playerDiv.className = `player ${isEliminated ? 'eliminated' : ''}`;

        // Create radio button for non-eliminated players
        if (!isEliminated) {
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'playerVote';
            radio.value = index;
            radio.id = `player${playerNum}`;
            playerDiv.appendChild(radio);

            const label = document.createElement('label');
            label.htmlFor = `player${playerNum}`;
            label.textContent = ` Player ${playerNum}`;
            playerDiv.appendChild(label);
        } else {
            playerDiv.textContent = `Player ${playerNum} (Eliminated)`;
        }

        playerList.appendChild(playerDiv);
    });
}

function eliminatePlayer() {
    const selectedPlayer = document.querySelector('input[name="playerVote"]:checked');
    if (!selectedPlayer) {
        alert('Please select a player to eliminate!');
        return;
    }

    const eliminatedIndex = parseInt(selectedPlayer.value);
    gameState.eliminatedPlayers.add(eliminatedIndex);

    const remainingPlayers = gameState.players.filter((_, index) =>
        !gameState.eliminatedPlayers.has(index)
    ).length;

    const remainingCivilians = gameState.players.filter((role, index) =>
        !gameState.eliminatedPlayers.has(index) && role === 'Civilian'
    ).length;

    const remainingUndercover = gameState.players.filter((role, index) =>
        !gameState.eliminatedPlayers.has(index) && role === 'Undercover'
    ).length;

    updatePlayerList();

    // Check for winners
    if (remainingPlayers === 2) {
        // Hide eliminate button when game is over
        document.querySelector('button[onclick="eliminatePlayer()"]').style.display = 'none';
        
        if (remainingUndercover === 0) {
            alert('Civilians win! All undercover players have been eliminated!');
        } else if (remainingUndercover === 2) {
            alert('Undercover players win! The last two players are both undercover!');
        } else if (remainingUndercover === 1 && remainingCivilians === 1) {
            alert('Undercover player wins! They have successfully infiltrated to the end!');
        }
    }
}

function resetGame() {
    const originalWordPairs = gameState.wordPairs;
    gameState = {
        players: [],
        currentPlayer: 0,
        civilianWord: '',
        undercoverWord: '',
        eliminatedPlayers: new Set(),
        wordPairs: originalWordPairs
    };

    // Show eliminate button again when game resets
    document.querySelector('button[onclick="eliminatePlayer()"]').style.display = 'inline-block';
    
    document.getElementById('game-section').classList.add('hidden');
    document.getElementById('word-section').classList.add('hidden');
    document.getElementById('setup-section').classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', function () {
    const useCustomWordsCheckbox = document.getElementById('useCustomWords');
    const customWordsSection = document.getElementById('customWordsSection');

    useCustomWordsCheckbox.addEventListener('change', function () {
        customWordsSection.style.display = this.checked ? 'block' : 'none';
    });
});
