let gameState = {
    players: [],
    currentPlayer: 0,
    civilianWord: '',
    undercoverWord: '',
    eliminatedPlayers: new Set(),
    selectedCategories: ['Food & Drink', 'Animals', 'Objects', 'Jobs & Roles', 'Entertainment', 'Nature & Weather'],
    wordsByCategory: {
        'Food & Drink': [
            ['Pizza', 'Burger'],
            ['Coffee', 'Tea'],
            ['Soda', 'Juice'],
            ['Apple', 'Orange'],
            ['Candy Bar', 'Granola Bar'],
            ['Hot Sauce', 'Ketchup'],
            ['Muffin', 'Cupcake'],
            ['Bread', 'Toast'],
            ['Milk', 'Cream'],
            ['Ice Cream', 'Cake'],
            ['Bacon', 'Ham'],
            ['Soup', 'Salad'],
            ['Cookie', 'Brownie'],
            ['Espresso', 'Latte'],
            ['Sandwich', 'Wrap'],
            ['Pasta', 'Rice'],
            ['Cheese', 'Butter'],
            ['Ramen', 'Pho'],
            ['Water', 'Soda'],
            ['Chicken', 'Fish'],
            ['Banana', 'Grape'],
            ['Yogurt', 'Pudding'],
            ['Donut', 'Bagel'],
            ['Honey', 'Sugar'],
            ['Steak', 'Pork'],
            ['Wine', 'Beer'],
            ['Cereal', 'Oatmeal'],
            ['Noodles', 'Spaghetti'],
            ['Egg', 'Omelet'],
            ['Pickle', 'Olive']
        ],
        'Animals': [
            ['Cat', 'Dog'],
            ['Lion', 'Tiger'],
            ['Puppy', 'Bunny'],
            ['Bird', 'Fish'],
            ['Cow', 'Horse'],
            ['Goldfish', 'Guppy'],
            ['Peacock', 'Turkey'],
            ['Otter', 'Beaver'],
            ['Mouse', 'Rat'],
            ['Duck', 'Goose'],
            ['Bear', 'Wolf'],
            ['Crab', 'Lobster'],
            ['Snake', 'Lizard'],
            ['Goat', 'Sheep'],
            ['Eagle', 'Hawk'],
            ['Frog', 'Toad'],
            ['Monkey', 'Ape'],
            ['Deer', 'Elk'],
            ['Butterfly', 'Moth'],
            ['Bee', 'Wasp'],
            ['Pig', 'Boar'],
            ['Chicken', 'Rooster'],
            ['Elephant', 'Rhino'],
            ['Zebra', 'Donkey'],
            ['Whale', 'Dolphin'],
            ['Shark', 'Ray'],
            ['Turtle', 'Tortoise'],
            ['Owl', 'Crow'],
            ['Fox', 'Raccoon'],
            ['Squirrel', 'Chipmunk']
        ],
        'Objects': [
            ['Phone', 'Tablet'],
            ['Chair', 'Sofa'],
            ['Book', 'Magazine'],
            ['Pen', 'Pencil'],
            ['Car', 'Bus'],
            ['Watch', 'Clock'],
            ['Bag', 'Backpack'],
            ['Cup', 'Glass'],
            ['Key', 'Lock'],
            ['Shoes', 'Boots'],
            ['Hat', 'Cap'],
            ['Camera', 'Phone'],
            ['Lamp', 'Candle'],
            ['Mirror', 'Window'],
            ['Plate', 'Bowl'],
            ['Spoon', 'Fork'],
            ['Towel', 'Cloth'],
            ['Pillow', 'Blanket'],
            ['Remote', 'Controller'],
            ['Wallet', 'Purse'],
            ['Bicycle', 'Motorcycle'],
            ['Computer', 'Laptop'],
            ['TV', 'Monitor'],
            ['Fridge', 'Freezer'],
            ['Microwave', 'Oven'],
            ['Brush', 'Comb'],
            ['Knife', 'Scissors'],
            ['Umbrella', 'Raincoat'],
            ['Bottle', 'Can'],
            ['Box', 'Bag']
        ],
        'Jobs & Roles': [
            ['Teacher', 'Student'],
            ['Doctor', 'Nurse'],
            ['Chef', 'Waiter'],
            ['Police', 'Guard'],
            ['Driver', 'Pilot'],
            ['Singer', 'Dancer'],
            ['Writer', 'Editor'],
            ['Farmer', 'Gardener'],
            ['Artist', 'Designer'],
            ['Judge', 'Lawyer'],
            ['Banker', 'Cashier'],
            ['Actor', 'Director'],
            ['Mechanic', 'Engineer'],
            ['Manager', 'Boss'],
            ['Clerk', 'Secretary'],
            ['Soldier', 'Captain'],
            ['Dentist', 'Therapist'],
            ['Barber', 'Stylist'],
            ['Mailman', 'Delivery'],
            ['Cleaner', 'Janitor'],
            ['Librarian', 'Bookkeeper'],
            ['Photographer', 'Model'],
            ['Salesman', 'Customer'],
            ['Builder', 'Architect'],
            ['Scientist', 'Researcher'],
            ['Musician', 'Composer'],
            ['Journalist', 'Reporter'],
            ['Accountant', 'Auditor'],
            ['Translator', 'Interpreter'],
            ['Coach', 'Trainer']
        ],
        'Entertainment': [
            ['Movie', 'TV Show'],
            ['Music', 'Song'],
            ['Game', 'Sport'],
            ['Party', 'Dance'],
            ['Book', 'Story'],
            ['Theater', 'Cinema'],
            ['Concert', 'Show'],
            ['Comedy', 'Drama'],
            ['Magic', 'Trick'],
            ['Cartoon', 'Anime'],
            ['Festival', 'Carnival'],
            ['Quiz', 'Contest'],
            ['Hobby', 'Activity'],
            ['Joke', 'Prank'],
            ['Performance', 'Act'],
            ['Radio', 'Podcast'],
            ['Karaoke', 'Singing'],
            ['Chess', 'Checkers'],
            ['Puzzle', 'Riddle'],
            ['Racing', 'Running'],
            ['Swimming', 'Diving'],
            ['Bowling', 'Golf'],
            ['Tennis', 'Badminton'],
            ['Basketball', 'Football'],
            ['Baseball', 'Soccer'],
            ['Painting', 'Drawing'],
            ['Cooking', 'Baking'],
            ['Reading', 'Writing'],
            ['Shopping', 'Browsing'],
            ['Traveling', 'Hiking']
        ],
        'Nature & Weather': [
            ['Sun', 'Moon'],
            ['Rain', 'Snow'],
            ['Tree', 'Flower'],
            ['Mountain', 'Hill'],
            ['Ocean', 'Lake'],
            ['Wind', 'Breeze'],
            ['Cloud', 'Sky'],
            ['River', 'Stream'],
            ['Beach', 'Desert'],
            ['Forest', 'Garden'],
            ['Rock', 'Stone'],
            ['Fire', 'Ice'],
            ['Star', 'Planet'],
            ['Valley', 'Canyon'],
            ['Island', 'Coast'],
            ['Thunder', 'Lightning'],
            ['Fog', 'Mist'],
            ['Sunset', 'Sunrise'],
            ['Spring', 'Summer'],
            ['Winter', 'Autumn'],
            ['Grass', 'Moss'],
            ['Leaf', 'Branch'],
            ['Pond', 'Pool'],
            ['Field', 'Meadow'],
            ['Cave', 'Tunnel'],
            ['Cliff', 'Ridge'],
            ['Volcano', 'Earthquake'],
            ['Tide', 'Wave'],
            ['Sand', 'Dirt'],
            ['Rainbow', 'Aurora']
        ],
        'Funny': [
            ['Banana', 'Cucumber'],
            ['Bath', 'Shower'],
            ['Belly', 'Butt'],
            ['Cake', 'Poop'],
            ['Candy', 'Medicine'],
            ['Condom', 'Balloon'],
            ['Fart', 'Burp'],
            ['Finger', 'Toe'],
            ['Hair', 'Fur'],
            ['Kiss', 'Slap'],
            ['Lipstick', 'Crayon'],
            ['Massage', 'Tickle'],
            ['Milk', 'Sweat'],
            ['Mustache', 'Eyebrow'],
            ['Nipple', 'Bellybutton'],
            ['Nose', 'Butt'],
            ['Pajamas', 'Underwear'],
            ['Panties', 'Shorts'],
            ['Pillow', 'Boob'],
            ['Soap', 'Shampoo'],
            ['Socks', 'Gloves'],
            ['Sweater', 'Bra'],
            ['Toilet Paper', 'Napkin'],
            ['Toothbrush', 'Hairbrush'],
            ['Toothpaste', 'Cream'],
            ['Underwear', 'Bikini'],
            ['Lick', 'Suck'],
            ['Tickle', 'Poke'],
            ['Squirt', 'Spray'],
            ['Squeeze', 'Pinch']
        ]
    }
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
        // Get selected category from dropdown
        const selectedCategory = document.getElementById('categorySelect').value;

        let availableWordPairs = [];

        if (selectedCategory === 'all') {
            // Combine all categories
            Object.values(gameState.wordsByCategory).forEach(categoryPairs => {
                availableWordPairs = availableWordPairs.concat(categoryPairs);
            });
        } else {
            // Use specific category
            if (gameState.wordsByCategory[selectedCategory]) {
                availableWordPairs = gameState.wordsByCategory[selectedCategory];
            }
        }

        if (availableWordPairs.length === 0) {
            alert('No word pairs available for the selected category!');
            return;
        }

        const wordPair = availableWordPairs[Math.floor(Math.random() * availableWordPairs.length)];
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

    // Remove previous event listeners
    const newFlipCard = flipCard.cloneNode(true);
    flipCard.parentNode.replaceChild(newFlipCard, flipCard);

    // Add new click event listener for simple toggle
    newFlipCard.addEventListener('click', function () {
        this.classList.toggle('flipped');
    });

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
    const originalWordsByCategory = gameState.wordsByCategory;
    gameState = {
        players: [],
        currentPlayer: 0,
        civilianWord: '',
        undercoverWord: '',
        eliminatedPlayers: new Set(),
        selectedCategories: ['Food & Drink', 'Animals', 'Objects', 'Jobs & Roles', 'Entertainment', 'Nature & Weather', 'Funny'],
        wordsByCategory: originalWordsByCategory
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
