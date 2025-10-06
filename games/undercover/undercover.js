let gameState = {
    players: [],
    currentPlayer: 0,
    civilianWord: '',
    undercoverWord: '',
    eliminatedPlayers: new Set(),
    selectedCategories: ['Food & Drink', 'Animals', 'Objects', 'Jobs & Roles', 'Entertainment', 'Nature & Weather'],
    premiumCategories: ['Funny', 'Sports & Fitness', 'Technology & Digital', 'Travel & Places', 'Relationships', 'Brands & Companies', 'Historical Figures'],
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
        ],
        'Sports & Fitness': [
            ['Yoga', 'Pilates'],
            ['Marathon', 'Sprint'],
            ['Gym', 'Fitness Center'],
            ['Treadmill', 'Bike'],
            ['Dumbbells', 'Barbells'],
            ['Pushup', 'Situp'],
            ['Protein Shake', 'Energy Drink'],
            ['Yoga Mat', 'Exercise Mat'],
            ['Running Shoes', 'Training Shoes'],
            ['Squat', 'Lunge'],
            ['Cardio', 'Strength Training'],
            ['Personal Trainer', 'Coach'],
            ['Stretching', 'Warming Up'],
            ['Bench Press', 'Chest Press'],
            ['Burpee', 'Jump Squat'],
            ['Plank', 'Bridge'],
            ['Cycling', 'Spinning'],
            ['CrossFit', 'Boot Camp'],
            ['Boxing', 'Kickboxing'],
            ['Jump Rope', 'Skipping'],
            ['Pull Up', 'Chin Up'],
            ['Deadlift', 'Clean and Jerk'],
            ['Sports Bra', 'Tank Top'],
            ['Water Bottle', 'Shaker'],
            ['Resistance Band', 'Weight Belt'],
            ['Foam Roller', 'Massage Ball'],
            ['Fitness Tracker', 'Smartwatch'],
            ['Recovery', 'Rest Day'],
            ['Muscle Gain', 'Weight Loss'],
            ['Rep', 'Set'],
            ['Jogging', 'Running'],
            ['Abs', 'Core'],
            ['Biceps', 'Triceps'],
            ['Rowing', 'Kayaking'],
            ['Climbing', 'Bouldering'],
            ['Zumba', 'Aerobics'],
            ['HIIT', 'Circuit Training'],
            ['Kettlebell', 'Medicine Ball'],
            ['Leg Press', 'Calf Raise'],
            ['Shoulder Press', 'Lateral Raise'],
            ['Crunch', 'Leg Raise'],
            ['Mountain Climber', 'High Knees'],
            ['Wall Sit', 'Squat Hold'],
            ['Rowing Machine', 'Elliptical'],
            ['Protein Bar', 'Energy Bar'],
            ['Pre-Workout', 'Post-Workout'],
            ['Bulk', 'Cut'],
            ['Gym Bag', 'Duffel Bag'],
            ['Sneakers', 'Cleats'],
            ['Sweatband', 'Headband']
        ],
        'Technology & Digital': [
            ['Smartphone', 'Tablet'],
            ['WiFi', 'Bluetooth'],
            ['App', 'Software'],
            ['Email', 'Text Message'],
            ['Social Media', 'Platform'],
            ['Streaming', 'Download'],
            ['Cloud Storage', 'Hard Drive'],
            ['Password', 'PIN'],
            ['Screenshot', 'Screen Recording'],
            ['Hashtag', 'Mention'],
            ['Like', 'Share'],
            ['Follower', 'Subscriber'],
            ['Notification', 'Alert'],
            ['Emoji', 'Sticker'],
            ['Video Call', 'Voice Call'],
            ['Browser', 'Search Engine'],
            ['Website', 'Web Page'],
            ['Upload', 'Download'],
            ['Login', 'Sign In'],
            ['Update', 'Upgrade'],
            ['Bug', 'Glitch'],
            ['AI', 'Machine Learning'],
            ['VR', 'AR'],
            ['Cryptocurrency', 'Bitcoin'],
            ['NFT', 'Digital Art'],
            ['Podcast', 'Audiobook'],
            ['E-book', 'PDF'],
            ['USB', 'SD Card'],
            ['Router', 'Modem'],
            ['Firewall', 'Antivirus'],
            ['Backup', 'Restore'],
            ['Cache', 'Cookies'],
            ['Spam', 'Junk Mail'],
            ['Folder', 'Directory'],
            ['File', 'Document'],
            ['Copy', 'Paste'],
            ['Save', 'Export'],
            ['Keyboard', 'Mouse'],
            ['Touchscreen', 'Trackpad'],
            ['Charger', 'Power Bank'],
            ['Laptop', 'Desktop'],
            ['SSD', 'HDD'],
            ['RAM', 'Memory'],
            ['CPU', 'Processor'],
            ['GPU', 'Graphics Card'],
            ['Pixel', 'Resolution'],
            ['Refresh Rate', 'Frame Rate'],
            ['Bandwidth', 'Speed'],
            ['Server', 'Host'],
            ['Domain', 'URL']
        ],
        'Travel & Places': [
            ['Airport', 'Train Station'],
            ['Hotel', 'Hostel'],
            ['Passport', 'Visa'],
            ['Suitcase', 'Backpack'],
            ['Flight', 'Journey'],
            ['Tourist', 'Traveler'],
            ['Vacation', 'Holiday'],
            ['Cruise', 'Yacht'],
            ['Camping', 'Glamping'],
            ['Museum', 'Gallery'],
            ['Monument', 'Landmark'],
            ['City', 'Town'],
            ['Capital', 'Metropolis'],
            ['Restaurant', 'Cafe'],
            ['Bar', 'Pub'],
            ['Mall', 'Market'],
            ['Park', 'Plaza'],
            ['Zoo', 'Aquarium'],
            ['Temple', 'Church'],
            ['Casino', 'Resort'],
            ['Beach Resort', 'Ski Resort'],
            ['Souvenir', 'Gift'],
            ['Map', 'GPS'],
            ['Tour Guide', 'Travel Agent'],
            ['Boarding Pass', 'Ticket'],
            ['Check-in', 'Check-out'],
            ['Jet Lag', 'Time Zone'],
            ['Foreign Currency', 'Exchange Rate'],
            ['Duty Free', 'Tax Refund'],
            ['Itinerary', 'Travel Plan'],
            ['Taxi', 'Uber'],
            ['Bus', 'Tram'],
            ['Subway', 'Metro'],
            ['Ferry', 'Boat'],
            ['Rental Car', 'Lease'],
            ['Motel', 'Inn'],
            ['Airbnb', 'Homestay'],
            ['Boutique Hotel', 'Luxury Hotel'],
            ['Buffet', 'A la Carte'],
            ['Street Food', 'Food Court'],
            ['Viewpoint', 'Observation Deck'],
            ['Beach', 'Coastline'],
            ['Mountain', 'Peak'],
            ['Valley', 'Gorge'],
            ['Desert', 'Oasis'],
            ['Rainforest', 'Jungle'],
            ['Cathedral', 'Mosque'],
            ['Palace', 'Castle'],
            ['Statue', 'Sculpture'],
            ['Bridge', 'Tower']
        ],
        'Relationships': [
            ['Boyfriend', 'Girlfriend'],
            ['Husband', 'Wife'],
            ['Dating', 'Courting'],
            ['First Date', 'Blind Date'],
            ['Love', 'Crush'],
            ['Valentine', 'Anniversary'],
            ['Proposal', 'Engagement'],
            ['Wedding', 'Marriage'],
            ['Honeymoon', 'Vacation'],
            ['Romance', 'Passion'],
            ['Flirting', 'Teasing'],
            ['Breakup', 'Divorce'],
            ['Ex', 'Former'],
            ['Single', 'Available'],
            ['Commitment', 'Relationship'],
            ['Trust', 'Loyalty'],
            ['Jealousy', 'Envy'],
            ['Argument', 'Fight'],
            ['Makeup', 'Reconcile'],
            ['Soulmate', 'Twin Flame'],
            ['Friend Zone', 'Rejected'],
            ['Chemistry', 'Connection'],
            ['Red Flag', 'Deal Breaker'],
            ['Toxic', 'Unhealthy'],
            ['Supportive', 'Caring'],
            ['Cheating', 'Affair'],
            ['Long Distance', 'Remote'],
            ['Exclusive', 'Committed'],
            ['Casual', 'Serious'],
            ['Moving In', 'Cohabiting'],
            ['Partner', 'Significant Other'],
            ['Bae', 'Sweetheart'],
            ['Fiancé', 'Fiancée'],
            ['Newlyweds', 'Just Married'],
            ['Date Night', 'Quality Time'],
            ['Kiss', 'Hug'],
            ['Hold Hands', 'Cuddle'],
            ['Compliment', 'Flattery'],
            ['Gift', 'Surprise'],
            ['Flowers', 'Chocolates'],
            ['Love Letter', 'Text Message'],
            ['Miss You', 'Thinking of You'],
            ['Butterflies', 'Heart Racing'],
            ['Spark', 'Vibe'],
            ['Talking Stage', 'Getting to Know'],
            ['Official', 'Going Steady'],
            ['Open Relationship', 'Polyamory'],
            ['Trial Separation', 'Break'],
            ['Closure', 'Moving On'],
            ['Rebound', 'Fling']
        ],
        'Brands & Companies': [
            ['Apple', 'Samsung'],
            ['Nike', 'Adidas'],
            ['McDonald\'s', 'Burger King'],
            ['Coca-Cola', 'Pepsi'],
            ['Starbucks', 'Costa'],
            ['Google', 'Bing'],
            ['Facebook', 'Instagram'],
            ['YouTube', 'TikTok'],
            ['Amazon', 'eBay'],
            ['Netflix', 'Disney+'],
            ['Spotify', 'Apple Music'],
            ['PlayStation', 'Xbox'],
            ['iPhone', 'Android'],
            ['Windows', 'Mac'],
            ['Tesla', 'BMW'],
            ['Mercedes', 'Audi'],
            ['Toyota', 'Honda'],
            ['Ford', 'Chevrolet'],
            ['IKEA', 'HomeDepot'],
            ['Walmart', 'Target'],
            ['Louis Vuitton', 'Gucci'],
            ['Rolex', 'Omega'],
            ['Mastercard', 'Visa'],
            ['Uber', 'Lyft'],
            ['Airbnb', 'Booking.com'],
            ['Subway', 'Chipotle'],
            ['KFC', 'Popeyes'],
            ['Pizza Hut', 'Domino\'s'],
            ['H&M', 'Zara'],
            ['Lego', 'Playmobil'],
            ['Twitter', 'X'],
            ['WhatsApp', 'Telegram'],
            ['Zoom', 'Teams'],
            ['Slack', 'Discord'],
            ['Reddit', 'Tumblr'],
            ['Twitch', 'Mixer'],
            ['Snapchat', 'BeReal'],
            ['LinkedIn', 'Indeed'],
            ['PayPal', 'Venmo'],
            ['Stripe', 'Square'],
            ['FedEx', 'UPS'],
            ['DHL', 'USPS'],
            ['Porsche', 'Ferrari'],
            ['Lamborghini', 'Bugatti'],
            ['Lexus', 'Infiniti'],
            ['Volkswagen', 'Mazda'],
            ['Chanel', 'Dior'],
            ['Prada', 'Versace'],
            ['Armani', 'Burberry'],
            ['Cartier', 'Tiffany']
        ],
        'Historical Figures': [
            ['Napoleon', 'Caesar'],
            ['Einstein', 'Newton'],
            ['Gandhi', 'Mandela'],
            ['Lincoln', 'Washington'],
            ['Shakespeare', 'Dickens'],
            ['Beethoven', 'Mozart'],
            ['Leonardo da Vinci', 'Michelangelo'],
            ['Picasso', 'Van Gogh'],
            ['Marie Curie', 'Rosalind Franklin'],
            ['Cleopatra', 'Nefertiti'],
            ['Churchill', 'Roosevelt'],
            ['Joan of Arc', 'Boudica'],
            ['Marco Polo', 'Columbus'],
            ['Darwin', 'Galileo'],
            ['Socrates', 'Plato'],
            ['Alexander the Great', 'Genghis Khan'],
            ['Queen Victoria', 'Queen Elizabeth'],
            ['Martin Luther King', 'Rosa Parks'],
            ['Helen Keller', 'Anne Frank'],
            ['Mother Teresa', 'Princess Diana'],
            ['Karl Marx', 'Adam Smith'],
            ['Freud', 'Jung'],
            ['Tesla', 'Edison'],
            ['Wright Brothers', 'Lindbergh'],
            ['Armstrong', 'Aldrin'],
            ['Homer', 'Virgil'],
            ['Buddha', 'Confucius'],
            ['Aristotle', 'Archimedes'],
            ['Copernicus', 'Kepler'],
            ['Voltaire', 'Rousseau'],
            ['Mozart', 'Bach'],
            ['Rembrandt', 'Vermeer'],
            ['Dante', 'Petrarch'],
            ['Frederick the Great', 'Peter the Great'],
            ['Catherine the Great', 'Elizabeth I'],
            ['Hannibal', 'Scipio'],
            ['Sun Tzu', 'Machiavelli'],
            ['Henry VIII', 'Louis XIV'],
            ['Charlemagne', 'Otto the Great'],
            ['Saladin', 'Richard the Lionheart'],
            ['Attila the Hun', 'Tamerlane'],
            ['Spartacus', 'Braveheart'],
            ['Harriet Tubman', 'Sojourner Truth'],
            ['Susan B. Anthony', 'Elizabeth Cady Stanton'],
            ['Florence Nightingale', 'Clara Barton'],
            ['Amelia Earhart', 'Bessie Coleman'],
            ['Christopher Columbus', 'Vasco da Gama'],
            ['Magellan', 'Cook'],
            ['Lewis and Clark', 'Shackleton'],
            ['Neil Armstrong', 'Yuri Gagarin']
        ]
    }
};

// Check if user has premium access
async function isPremiumUser() {
    // Use the global authManager to check premium status
    if (window.authManager) {
        return await window.authManager.checkUserPremiumStatus();
    }
    return false;
}

async function startGame() {
    const playerCount = parseInt(document.getElementById('playerCount').value);
    const undercoverCount = parseInt(document.getElementById('undercoverCount').value);
    const whiteCount = parseInt(document.getElementById('whiteCount').value);
    const useCustomWords = document.getElementById('useCustomWords').checked;
    const selectedCategory = document.getElementById('categorySelect').value;

    // Check if selected category requires premium (including 'all')
    if (selectedCategory === 'all' || gameState.premiumCategories.includes(selectedCategory)) {
        const isPremium = await isPremiumUser();
        if (!isPremium) {
            showPremiumModal();
            return;
        }
    }

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


// Show premium modal
function showPremiumModal() {
    document.getElementById('premium-modal').classList.remove('hidden');
}

// Close premium modal
function closePremiumModal() {
    document.getElementById('premium-modal').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', function () {
    const useCustomWordsCheckbox = document.getElementById('useCustomWords');
    const customWordsSection = document.getElementById('customWordsSection');

    useCustomWordsCheckbox.addEventListener('change', function () {
        customWordsSection.style.display = this.checked ? 'block' : 'none';
    });
});
