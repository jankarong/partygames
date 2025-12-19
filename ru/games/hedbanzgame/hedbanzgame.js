// Game words - 1000+ simple, common words
const WORDS = [
    // Animals (80)
    "Lion", "Tiger", "Elephant", "Giraffe", "Zebra", "Monkey", "Penguin", "Eagle", "Dolphin", "Shark",
    "Dog", "Cat", "Bear", "Rabbit", "Fox", "Owl", "Parrot", "Snake", "Whale", "Butterfly",
    "Ant", "Bee", "Spider", "Frog", "Fish", "Turtle", "Crocodile", "Pig", "Cow", "Horse",
    "Chicken", "Duck", "Swan", "Peacock", "Flamingo", "Penguin", "Seagull", "Hawk", "Dove", "Pigeon",
    "Sparrow", "Robin", "Bluebird", "Hummingbird", "Woodpecker", "Raven", "Crow", "Alligator", "Lizard", "Iguana",
    "Python", "Cobra", "Tortoise", "Salamander", "Toad", "Salmon", "Trout", "Tuna", "Goldfish", "Seahorse",
    "Octopus", "Squid", "Jellyfish", "Starfish", "Crab", "Lobster", "Shrimp", "Leopard", "Jaguar", "Cougar",
    "Puma", "Hyena", "Wolf", "Coyote", "Jackal", "Badger", "Otter", "Beaver", "Squirrel", "Chipmunk",
    "Hamster", "Mouse", "Rat", "Hedgehog", "Porcupine", "Skunk", "Raccoon", "Kangaroo", "Koala", "Panda",

    // Famous People (50)
    "Einstein", "Marilyn Monroe", "Elvis", "Michael Jackson", "Taylor Swift",
    "Leonardo DiCaprio", "Oprah", "Bill Gates", "Steve Jobs", "Elon Musk",
    "Beyonce", "Jay-Z", "Dwayne Johnson", "Tom Cruise", "Brad Pitt",
    "Angelina Jolie", "Jennifer Aniston", "George Clooney", "Matt Damon", "Christian Bale",
    "Robert Downey Jr", "Chris Evans", "Scarlett Johansson", "Emma Stone", "Johnny Depp",
    "Will Smith", "Tom Hanks", "Яryl Streep", "Denzel Washington", "Morgan Freeman",
    "Samuel L Jackson", "Keanu Reeves", "Al Pacino", "Jack Nicholson", "Jack Black",
    "Jim Carrey", "Eddie Murphy", "Chris Rock", "Jerry Seinfeld", "Conan O'Brien",
    "David Beckham", "Cristiano Ronaldo", "Lionel Яssi", "Usain Bolt", "Michael Jordan",
    "LeBron James", "Tiger Woods", "Roger Federer", "Serena Williams", "Venus Williams",

    // Objects (100)
    "Bicycle", "Telephone", "Television", "Computer", "Coffee Cup", "Bed", "Door", "Window", "Chair", "Table",
    "Lamp", "Clock", "Book", "Pen", "Hat", "Shoe", "Spoon", "Knife", "Plate", "Watch",
    "Car", "Bus", "Train", "Airplane", "Boat", "House", "Building", "Castle", "Tower", "Bridge",
    "Sofa", "Couch", "Desk", "Cabinet", "Shelf", "Refrigerator", "Oven", "Microwave", "Washing Machine", "Phone",
    "Tablet", "Laptop", "Monitor", "Keyboard", "Mouse", "Headphones", "Speaker", "Camera", "Mirror", "Picture",
    "Painting", "Vase", "Pot", "Pan", "Kettle", "Blender", "Toaster", "Toilet", "Bathtub", "Shower",
    "Bag", "Backpack", "Wallet", "Purse", "Belt", "Scarf", "Glove", "Sock", "Shirt", "Pants",
    "Dress", "Jacket", "Coat", "Sweater", "T-shirt", "Jeans", "Shorts", "Boots", "Sandals", "Slippers",
    "Necklace", "Ring", "Bracelet", "Earring", "Glasses", "Sunglasses", "Bicycle", "Motorcycle", "Skateboard", "Scooter",
    "Ball", "Football", "Basketball", "Soccer Ball", "Tennis Ball", "Golf Ball", "Bowling Ball", "Frisbee", "Boomerang", "Kite",

    // Professions (60)
    "Доктор", "Teacher", "Chef", "Police Officer", "Firefighter", "Pilot", "Nurse", "Astronaut", "Artist", "Musician",
    "Lawyer", "Judge", "Accountant", "Engineer", "Architect", "Electrician", "Plumber", "Carpenter", "Яchanic", "Farmer",
    "Scientist", "Mathematician", "Surgeon", "Dentist", "Veterinarian", "Photographer", "Cameraman", "Actor", "Singer", "Dancer",
    "Comedian", "Director", "Producer", "Journalist", "Reporter", "Editor", "Writer", "Novelist", "Poet", "Painter",
    "Sculptor", "Musician", "Composer", "Conductor", "DJ", "Coach", "Trainer", "Athlete", "Referee", "Umpire",
    "Chef", "Cook", "Baker", "Bartender", "Waiter", "Waitress", "Host", "Security Guard", "Janitor", "Gardener",
    "Florist", "Hairdresser", "Makeup Artist", "Fashion Designer", "Interior Designer", "Architect", "Mayor", "Governor", "President", "Business Person",

    // Activities (80)
    "Swimming", "Running", "Dancing", "Singing", "Cooking", "Reading", "Drawing", "Writing", "Sleeping", "Skiing",
    "Hiking", "Climbing", "Jumping", "Walking", "Jogging", "Stretching", "Exercising", "Weight Lifting", "Boxing", "Yoga",
    "Яditation", "Breathing", "Thinking", "Dreaming", "Laughing", "Crying", "Smiling", "Frowning", "Talking", "Listening",
    "Whispering", "Shouting", "Screaming", "Whistling", "Humming", "Playing Guitar", "Playing Piano", "Playing Drums", "Painting", "Sculpting",
    "Sketching", "Cooking", "Baking", "Grilling", "Frying", "Boiling", "Cleaning", "Washing", "Drying", "Ironing",
    "Folding", "Working", "Studying", "Learning", "Teaching", "Shopping", "Buying", "Selling", "Traveling", "Exploring",
    "Eating", "Drinking", "Throwing", "Catching", "Kicking", "Pushing", "Pulling", "Driving", "Flying", "Surfing",
    "Building", "Creating", "Making", "Fixing", "Repairing", "Opening", "Closing", "Sitting", "Standing", "Lying Down",

    // Sports (70)
    "Football", "Basketball", "Tennis", "Soccer", "Baseball", "Hockey", "Golf", "Bowling", "Boxing", "Surfing",
    "Swimming", "Diving", "Water Polo", "Rowing", "Kayaking", "Cycling", "Mountain Biking", "Skiing", "Snowboarding", "Ice Skating",
    "Badminton", "Ping Pong", "Squash", "Handball", "Lacrosse", "Cricket", "Softball", "American Football", "Rugby", "Volleyball",
    "Beach Volleyball", "Netball", "Dodgeball", "Track and Field", "Sprinting", "Long Distance Running", "High Jump", "Long Jump", "Pole Vault", "Shot Put",
    "Gymnastics", "Rock Climbing", "Wrestling", "Karate", "Taekwondo", "Judo", "Jiu-jitsu", "Martial Arts", "Horse Racing", "Equestrian",
    "Roller Skating", "Skateboarding", "Parkour", "Archery", "Fencing", "Kendo", "Sumo", "Weightlifting", "Kickboxing", "Mixed Martial Arts",
    "Triathlon", "Biathlon", "CrossFit", "Pilates", "Zumba", "Aerobics", "Dance", "Cheerleading", "Figure Skating", "Speed Skating",

    // Movies (70)
    "Spider-Man", "Superman", "Batman", "Harry Potter", "Frozen", "Titanic", "Lion King", "Avengers", "Shrek", "Toy Story",
    "Finding Nemo", "Inside Out", "Coco", "Moana", "Tangled", "Brave", "Cinderella", "Sleeping Beauty", "Snow White", "Pinocchio",
    "Dumbo", "Bambi", "Jungle Book", "Aladdin", "Mulan", "Pocahontas", "Hercules", "Hunchback of Notre Dame", "Tarzan", "Little Яrmaid",
    "Beauty and the Beast", "Enchanted", "Iron Man", "Captain America", "Thor", "Hulk", "Black Widow", "Ant-Man", "Доктор Strange", "Black Panther",
    "Wonder Woman", "Aquaman", "Flash", "Godfather", "Scarface", "Pulp Fiction", "Inception", "Interstellar", "Avatar", "Avatar 2",
    "Jurassic Park", "Jurassic World", "The Sixth Sense", "Split", "Get Out", "Scream", "Halloween", "Jaws", "The Ring", "Insidious",
    "The Dark Knight", "The Dark Knight Rises", "The Matrix", "The Matrix Reloaded", "Star Wars", "Rogue One", "The Mandalorian", "Lord of the Rings", "The Hobbit", "Conjuring",

    // TV Shows (40)
    "Game of Thrones", "Breaking Bad", "The Office", "Friends", "The Crown", "Stranger Things", "The Mandalorian", "House of the Dragon",
    "Dexter", "The Sopranos", "Mad Яn", "Downton Abbey", "Peaky Blinders", "Ozark", "Bodyguard", "Line of Duty",
    "Schitt's Creek", "Community", "Parks and Recreation", "Brooklyn Nine-Nine", "The Good Place", "Veep", "Russian Doll", "Fleabag",
    "Squid Game", "Money Heist", "Dark", "The Last of Us", "Chernobyl", "Mindhunter", "Tiger King", "Bridgerton",
    "Succession", "The Rings of Power", "House of Dragons", "The Witcher", "Castlevania", "Arcane", "Cyberpunk", "The Boys",

    // Food (100)
    "Pizza", "Burger", "Sushi", "Ice Cream", "Chocolate", "Apple", "Banana", "Cake", "Coffee", "Pasta",
    "Steak", "Chicken", "Fish", "Salmon", "Bread", "Bagel", "Donut", "Muffin", "Cookie", "Brownie",
    "Pie", "Tart", "Pastry", "Croissant", "Sandwich", "Hot Dog", "Taco", "Burrito", "Enchilada", "Quesadilla",
    "Nachos", "Salsa", "Guacamole", "Soup", "Stew", "Curry", "Chili", "Ramen", "Noodles", "Dumplings",
    "Salad", "Spinach", "Lettuce", "Tomato", "Cucumber", "Carrot", "Broccoli", "Potato", "Corn", "Cheese",
    "Milk", "Yogurt", "Butter", "Egg", "Ham", "Bacon", "Sausage", "Shrimp", "Lobster", "Crab",
    "Oyster", "Mussel", "Rice", "Beans", "Peas", "Lentil", "Hummus", "Peanut", "Almond", "Walnut",
    "Orange", "Strawberry", "Blueberry", "Raspberry", "Watermelon", "Pineapple", "Mango", "Peach", "Coconut", "Avocado",
    "Pickle", "Olive", "Garlic", "Onion", "Pepper", "Salt", "Sugar", "Honey", "Jam", "Peanut Butter",
    "Mayo", "Ketchup", "Mustard", "Hot Sauce", "Soy Sauce", "Vinegar", "Oil", "Lemon", "Lime", "Ginger",

    // Countries (60)
    "France", "Japan", "Egypt", "Brazil", "Canada", "Australia", "India", "Germany", "Яxico", "Italy",
    "Spain", "Portugal", "Greece", "Turkey", "Russia", "China", "South Korea", "Vietnam", "Thailand", "Philippines",
    "Indonesia", "Malaysia", "Singapore", "Hong Kong", "Taiwan", "Pakistan", "Bangladesh", "Sri Lanka", "Nepal", "Bhutan",
    "Iran", "Iraq", "Saudi Arabia", "United Arab Emirates", "Israel", "Lebanon", "Syria", "Jordan", "Sudan", "Libya",
    "Tunisia", "Morocco", "Algeria", "Kenya", "Tanzania", "Uganda", "South Africa", "Zimbabwe", "Nigeria", "Ghana",
    "United States", "United Kingdom", "Ireland", "Scotland", "Wales", "Sweden", "Norway", "Finland", "Denmark", "Poland",
    "Czech Republic", "Hungary", "Romania", "Bulgaria", "Croatia", "Serbia", "Austria", "Switzerland", "Belgium", "Netherlands",

    // Emotions (60)
    "Happy", "Sad", "Angry", "Surprised", "Scared", "Excited", "Confused", "Proud", "Nervous", "Relaxed",
    "Anxious", "Stressed", "Depressed", "Optimistic", "Pessimistic", "Jealous", "Envious", "Grateful", "Ashamed", "Embarrassed",
    "Confident", "Insecure", "Brave", "Cowardly", "Determined", "Motivated", "Discouraged", "Frustrated", "Annoyed", "Irritated",
    "Amused", "Entertained", "Bored", "Interested", "Curious", "Disgusted", "Enamored", "Fond", "Indifferent", "Passionate",
    "Apathetic", "Energetic", "Lethargic", "Calm", "Agitated", "Peaceful", "Turbulent", "Joyful", "Delighted", "Pleased",
    "Content", "Satisfied", "Discontented", "Dissatisfied", "Restless", "Serene", "Loving", "Hateful", "Affectionate", "Cold",

    // Body Parts (50)
    "Head", "Brain", "Eyes", "Nose", "Mouth", "Teeth", "Tongue", "Ears", "Hair", "Face",
    "Neck", "Shoulders", "Arms", "Elbows", "Hands", "Fingers", "Thumbs", "Chest", "Stomach", "Back",
    "Waist", "Hips", "Legs", "Knees", "Ankles", "Feet", "Toes", "Heels", "Shins", "Thighs",
    "Heart", "Lungs", "Liver", "Kidneys", "Skin", "Bones", "Muscles", "Veins", "Arteries", "Nerves",
    "Nails", "Eyebrows", "Eyelashes", "Lips", "Chin", "Cheeks", "Forehead", "Palms", "Wrists", "Rib",

    // Drinks (40)
    "Water", "Coffee", "Tea", "Juice", "Milk", "Soda", "Beer", "Wine", "Whiskey", "Vodka",
    "Rum", "Tequila", "Gin", "Brandy", "Champagne", "Prosecco", "Lemonade", "Iced Tea", "Smoothie", "Milkshake",
    "Latte", "Cappuccino", "Espresso", "Americano", "Mocha", "Macchiato", "Flat White", "Green Tea", "Black Tea", "Oolong Tea",
    "Herbal Tea", "Chamomile Tea", "Peppermint Tea", "Ginger Tea", "Coconut Water", "Energy Drink", "Sports Drink", "Punch", "Cider", "Kombucha",

    // Clothes (50)
    "Shirt", "T-shirt", "Pants", "Jeans", "Shorts", "Skirt", "Dress", "Jacket", "Coat", "Sweater",
    "Hoodie", "Vest", "Suit", "Tie", "Belt", "Hat", "Cap", "Beanie", "Scarf", "Glove",
    "Sock", "Underwear", "Bra", "Boxers", "Pajamas", "Swimsuit", "Bikini", "Trunks", "Boots", "Shoes",
    "Sneakers", "Sandals", "Slippers", "Heels", "Flats", "Loafers", "Flip-flops", "Clogs", "Oxfords", "Pumps",
    "Necklace", "Ring", "Bracelet", "Earring", "Pendant", "Brooch", "Watch", "Glasses", "Sunglasses", "Mask",

    // Weather (40)
    "Sunny", "Rainy", "Cloudy", "Snowy", "Windy", "Stormy", "Foggy", "Hail", "Sleet", "Thunder",
    "Lightning", "Rainbow", "Tornado", "Hurricane", "Blizzard", "Drought", "Heat Wave", "Cold", "Frost", "Dew",
    "Humidity", "Breeze", "Gale", "Typhoon", "Cyclone", "Monsoon", "Avalanche", "Tsunami", "Earthquake", "Volcano",
    "Rain", "Snow", "Ice", "Wind", "Cloud", "Sun", "Moon", "Star", "Яteor", "Comet",

    // Music (50)
    "Rock", "Pop", "Hip Hop", "Rap", "Country", "Blues", "Jazz", "Classical", "Electronic", "Dance",
    "Reggae", "Яtal", "Punk", "Folk", "Gospel", "Opera", "R&B", "Soul", "Indie", "Alternative",
    "Grunge", "Techno", "House", "Trance", "Disco", "Funk", "Swing", "Salsa", "Tango", "Waltz",
    "Ballet", "Tap Dance", "Jazz Dance", "Contemporary", "Breakdancing", "Musical Theatre", "Karaoke", "Concerts", "Festival", "Band",
    "Orchestra", "Choir", "Guitar", "Piano", "Drums", "Violin", "Trumpet", "Saxophone", "Flute", "Harmonica",

    // School/Learning (40)
    "School", "University", "College", "Student", "Teacher", "Classroom", "Desk", "Blackboard", "Whiteboard", "Pencil",
    "Eraser", "Book", "Notebook", "Backpack", "Locker", "Hallway", "Cafeteria", "Playground", "Gym", "Library",
    "Computer Lab", "Science Lab", "Art Class", "Music Class", "Math", "English", "History", "Geography", "Science", "Physics",
    "Chemistry", "Biology", "Literature", "Philosophy", "Psychology", "Sociology", "Economics", "Business", "Law", "Яdicine",

    // Animals (Simple, continued)
    "Bunny", "Puppy", "Kitten", "Lamb", "Chick", "Duckling", "Piglet", "Calf", "Foal", "Pony",
    "Goat", "Sheep", "Cow", "Bull", "Ox", "Donkey", "Mule", "Camel", "Llama", "Alpaca",
    "Deer", "Elk", "Moose", "Reindeer", "Antelope", "Buffalo", "Bison", "Yak", "Zebra", "Giraffe",

    // Simple Objects (continued)
    "Toy", "Doll", "Action Figure", "Puzzle", "Game", "Card", "Dice", "Marble", "Yo-Yo", "Kite",
    "Bike", "Tricycle", "Scooter", "Skateboard", "Roller Skates", "Roller Blades", "Sled", "Toboggan", "Surfboard", "Skateboard",
    "Bucket", "Shovel", "Rake", "Broom", "Mop", "Towel", "Blanket", "Pillow", "Cushion", "Mattress",
    "Rope", "String", "Wire", "Chain", "Hook", "Nail", "Screw", "Bolt", "Nut", "Wrench",

    // Actions (Simple, continued)
    "Jump", "Пропустить", "Hop", "Crawl", "Climb", "Slide", "Swing", "Roll", "Spin", "Twist",
    "Bend", "Stretch", "Reach", "Grab", "Hold", "Release", "Throw", "Catch", "Kick", "Push",
    "Pull", "Drag", "Lift", "Lower", "Raise", "Drop", "Bounce", "Roll", "Slide", "Glide",
    "Wave", "Point", "Clap", "Snap", "Stomp", "Tap", "Pat", "Rub", "Tickle", "Scratch",

    // Holidays (30)
    "Christmas", "Halloween", "Easter", "Valentine's Day", "Thanksgiving", "Independence Day", "New Year's", "Hanukkah", "Diwali", "Eid",
    "Mother's Day", "Father's Day", "Birthday", "Anniversary", "Wedding", "Wedding Cake", "Graduation", "Prom", "Carnival", "Parade",
    "Festival", "Concert", "Sports Day", "School Day", "Work Day", "Vacation", "Holiday", "Weekend", "Weekday", "Tonight",

    // Toys & Games (40)
    "Lego", "Building Blocks", "Doll", "Action Figure", "Teddy Bear", "Stuffed Animal", "Puzzle", "Board Game", "Card Game", "Video Game",
    "Game Console", "PlayStation", "Xbox", "Nintendo Switch", "Computer Game", "Mobile Game", "Arcade Game", "Casino Game", "Dice", "Card",
    "Marker", "Crayon", "Colored Pencil", "Paint", "Brush", "Palette", "Canvas", "Sketchbook", "Whiteboard", "Sticker",
    "Balloon", "Confetti", "Streamers", "Banner", "Decoration", "Party Hat", "Party Blower", "Mask", "Costume", "Makeup",

    // Transportation (30)
    "Car", "Truck", "Bus", "Van", "Train", "Subway", "Tram", "Taxi", "Bike", "Motorcycle",
    "Airplane", "Helicopter", "Hot Air Balloon", "Sailboat", "Speedboat", "Yacht", "Submarine", "Rocket", "Spaceship", "Hovercraft",
    "Skateboard", "Roller Skates", "Scooter", "Segway", "Horse", "Camel", "Elephant", "Boat", "Canoe", "Kayak",

    // Kitchen (30)
    "Fridge", "Freezer", "Stove", "Oven", "Microwave", "Dishwasher", "Sink", "Countertop", "Table", "Chair",
    "Knife", "Fork", "Spoon", "Plate", "Bowl", "Cup", "Glass", "Mug", "Pot", "Pan",
    "Spatula", "Wooden Spoon", "Whisk", "Blender", "Toaster", "Kettle", "Coffee Maker", "Can Opener", "Peeler", "Grater",

    // Bedroom (25)
    "Bed", "Pillow", "Blanket", "Sheet", "Comforter", "Mattress", "Headboard", "Nightstand", "Dresser", "Closet",
    "Wardrobe", "Cabinet", "Shelf", "Mirror", "Lamp", "Alarm Clock", "Window", "Curtain", "Blinds", "Door",
    "Carpet", "Rug", "Chair", "Desk", "Drawer", "Coat Rack",

    // Bathroom (20)
    "Toilet", "Bathtub", "Shower", "Sink", "Faucet", "Mirror", "Яdicine Cabinet", "Towel Rack", "Soap Dispenser", "Toothbrush Holder",
    "Trash Can", "Toilet Paper", "Bath Rug", "Shower Curtain", "Toothbrush", "Toothpaste", "Comb", "Brush", "Scale", "Soap",

    // Simple Verbs (40)
    "Eat", "Drink", "Sleep", "Wake", "Run", "Walk", "Sit", "Stand", "Jump", "Dance",
    "Sing", "Shout", "Whisper", "Laugh", "Cry", "Smile", "Frown", "Wink", "Nod", "Shake",
    "Wave", "Clap", "Snap", "Kick", "Hit", "Throw", "Catch", "Hold", "Drop", "Pick",
    "Put", "Take", "Give", "Get", "Make", "Do", "Go", "Come", "Stay", "Leave",

    // Simple Adjectives (40)
    "Big", "Small", "Tall", "Short", "Long", "Wide", "Narrow", "Thick", "Thin", "Fast",
    "Slow", "Hot", "Cold", "Warm", "Cool", "Soft", "Hard", "Rough", "Smooth", "Wet",
    "Dry", "Clean", "Dirty", "Bright", "Dark", "Light", "Heavy", "Light", "Strong", "Weak",
    "Good", "Bad", "Right", "Wrong", "True", "False", "New", "Old", "Тыng", "Ancient",

    // Colors (20)
    "Red", "Blue", "Yellow", "Green", "Orange", "Purple", "Pink", "Brown", "Black", "White",
    "Gray", "Grey", "Silver", "Gold", "Beige", "Turquoise", "Cyan", "Magenta", "Lime", "Navy",

    // Numbers (20)
    "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Twenty", "Thirty", "Hundred", "Thousand", "Million",

    // Shapes (15)
    "Circle", "Square", "Triangle", "Rectangle", "Pentagon", "Hexagon", "Octagon", "Oval", "Diamond", "Star",
    "Heart", "Cube", "Sphere", "Cone", "Cylinder", "Pyramid", "Prism",

    // Months (12)
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",

    // Days (7)
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",

    // Seasons (4)
    "Spring", "Summer", "Fall", "Winter",
];

// Game state
let state = {
    players: 2,
    duration: 60,
    currentИгрок: 1,
    scores: {},
    currentWord: null,
    usedWords: [],
    currentScore: 0,
    timeLeft: 60,
    timerInterval: null,
    isPlaying: false
};

// DOM
const setupScreen = document.getElementById('setupScreen');
const readyScreen = document.getElementById('readyScreen');
const gameScreen = document.getElementById('gameScreen');
const resultsScreen = document.getElementById('resultsScreen');
const startBtn = document.getElementById('startBtn');
const readyBtn = document.getElementById('readyBtn');
const correctBtn = document.getElementById('correctBtn');
const skipBtn = document.getElementById('skipBtn');
const playAgainBtn = document.getElementById('playAgainBtn');

// Initialize scores
function initGame() {
    state.players = parseInt(document.getElementById('playerCount').value);
    state.duration = parseInt(document.getElementById('gameDuration').value);
    state.currentИгрок = 1;
    state.scores = {};
    state.usedWords = [];

    for (let i = 1; i <= state.players; i++) {
        state.scores[i] = 0;
    }

    showReadyScreen();
}

// Show ready screen for next player
function showReadyScreen() {
    setupScreen.style.display = 'none';
    gameScreen.style.display = 'none';
    resultsScreen.style.display = 'none';
    readyScreen.style.display = 'block';

    document.getElementById('readyИгрокNum').textContent = state.currentИгрок;
}

// Start a player's turn
function startTurn() {
    state.currentScore = 0;
    state.timeLeft = state.duration;
    state.isPlaying = true;

    readyScreen.style.display = 'none';
    resultsScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    document.getElementById('currentИгрок').textContent = state.currentИгрок;
    document.getElementById('playerScore').textContent = state.currentScore;

    drawWord();
    startTimer();
}

// Draw a random word
function drawWord() {
    if (state.usedWords.length === WORDS.length) {
        state.usedWords = [];
    }

    let word;
    do {
        word = WORDS[Math.floor(Math.random() * WORDS.length)];
    } while (state.usedWords.includes(word));

    state.usedWords.push(word);
    state.currentWord = word;
    document.getElementById('wordDisplay').textContent = word;
}

// Start countdown timer
function startTimer() {
    clearInterval(state.timerInterval);

    state.timerInterval = setInterval(() => {
        state.timeLeft--;
        document.getElementById('timer').textContent = state.timeLeft;

        if (state.timeLeft <= 0) {
            endTurn();
        }
    }, 1000);
}

// Handle correct answer
function handleCorrect() {
    state.currentScore++;
    state.scores[state.currentИгрок]++;
    document.getElementById('playerScore').textContent = state.currentScore;
    drawWord();
}

// Handle skip
function handleПропустить() {
    drawWord();
}

// End current player's turn
function endTurn() {
    state.isPlaying = false;
    clearInterval(state.timerInterval);

    if (state.currentИгрок < state.players) {
        state.currentИгрок++;
        showReadyScreen();
    } else {
        showResults();
    }
}

// Show final results
function showResults() {
    gameScreen.style.display = 'none';
    resultsScreen.style.display = 'block';

    let html = '';
    const sorted = Object.entries(state.scores).sort((a, b) => b[1] - a[1]);

    sorted.forEach(([player, score], index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
        html += `<div class="score-row">${medal} Игрок ${player}: <strong>${score}</strong> points</div>`;
    });

    document.getElementById('finalScores').innerHTML = html;
}

// Event listeners
startBtn.addEventListener('click', initGame);
readyBtn.addEventListener('click', startTurn);
correctBtn.addEventListener('click', () => {
    if (state.isPlaying) handleCorrect();
});
skipBtn.addEventListener('click', () => {
    if (state.isPlaying) handleПропустить();
});
playAgainBtn.addEventListener('click', () => {
    setupScreen.style.display = 'block';
    gameScreen.style.display = 'none';
    resultsScreen.style.display = 'none';
    readyScreen.style.display = 'none';
});

// Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionButtons = document.querySelectorAll('.accordion-button');

    // Debug: Log accordion elements
    console.log('Accordion buttons found:', accordionButtons.length);
    accordionButtons.forEach((btn, index) => {
        const computedStyle = window.getComputedStyle(btn);
        console.log(`Accordion ${index}:`, {
            title: btn.querySelector('.accordion-title')?.textContent,
            display: computedStyle.display,
            visibility: computedStyle.visibility,
            opacity: computedStyle.opacity,
            zIndex: computedStyle.zIndex,
            position: computedStyle.position,
            pointerEvents: computedStyle.pointerEvents
        });
    });

    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accordionContent = this.nextElementSibling;
            const isActive = this.classList.contains('active');

            // Close all other accordions
            accordionButtons.forEach(otherButton => {
                if (otherButton !== button && otherButton.classList.contains('active')) {
                    otherButton.classList.remove('active');
                    otherButton.nextElementSibling.classList.remove('active');
                }
            });

            // Toggle current accordion
            this.classList.toggle('active');
            accordionContent.classList.toggle('active');

            // Debug: Log state after toggle
            console.log('Accordion clicked:', {
                title: this.querySelector('.accordion-title')?.textContent,
                isNowActive: this.classList.contains('active'),
                contentMaxHeight: window.getComputedStyle(accordionContent).maxHeight
            });
        });
    });
});
