// Game data - Portuguese (PT-BR) Version
const gameData = {
    currentType: null,
    currentDifficulty: null,
    questions: {
        soft: {
            truth: [
                // Light and Fun
                "If you could turn into an animal, what would it be?",
                "What was your weirdest childhood fantasy?",
                "What's your favorite emoji?",
                "If you were invisible for a day, what would you do?",
                "What's your favorite movie quote?",
                "What's the most boring thing you've ever done?",
                "What's your favorite childhood memory?",
                "What's the thing you're most proud of?",
                "What's your biggest fear?",
                "What's your favorite cartoon character?",
                "What skill do you wish you could learn?",
                "What's your favorite season?",
                "What's your favorite time of day?",
                "What pet would you want to have?",
                "What's your favorite weather?",
                "What theme park would you most like to visit?",
                "What's your favorite snack?",
                "What job would you want to try for a day?",
                "What's your favorite smell?",
                "What kind of house would you want to live in?",
                
                // Creative Imagination
                "If you could have any superpower, what would it be?",
                "If you could time travel, what would you change?",
                "If you could be any celebrity for a day, who would you choose?",
                "Who's your favorite fictional character?",
                "If you could invent a new food, what would it be?",
                "What's your favorite holiday and why?",
                "If you could live in any movie or TV show world, which would it be?",
                "What's your dream travel destination?",
                "If you could change one thing about the world, what would it be?",
                "What's your favorite childhood game?",
                "If you could create a new holiday, what would it be?",
                "If you could chat with any historical figure, who would you choose?",
                "If you could own any magical item, what would it be?",
                "If you could be the main character in any book, which would you choose?",
                "If you could build a dream house, what would it look like?",
                "If you could make a movie, what genre would it be?",
                "If you could open any type of store, what would it be?",
                "If you could design a game, what type would it be?",
                "If you could have a robot assistant, what would you want it to do?",
                "If you could create a new sport, what would it be?",
                
                // Daily Preferences
                "What's your favorite food?",
                "What's your favorite drink?",
                "What's your favorite color?",
                "What's your favorite music genre?",
                "What's your favorite sport?",
                "What's your favorite book?",
                "What's your favorite movie?",
                "What's your favorite TV show?",
                "What's your favorite game?",
                "What's your favorite social media platform?",
                "What's your favorite fruit?",
                "What's your favorite vegetable?",
                "What's your favorite beverage?",
                "What's your favorite dessert?",
                "What's your favorite breakfast?",
                "What's your favorite dinner?",
                "What's your favorite fast food?",
                "What's your favorite ice cream flavor?",
                "What type of coffee do you like?",
                "What's your favorite tea?",
                
                // Friendly Personal Questions
                "What do you like most about yourself?",
                "What wish do you want to come true?",
                "Who are you most grateful to?",
                "What's the happiest thing that happened to you?",
                "What's the most surprising thing that happened to you?",
                "What instrument would you like to learn?",
                "What language would you like to master?",
                "What country would you like to visit?",
                "Who would you most like to meet?",
                "What's your most treasured possession?",
                "What was your most memorable birthday?",
                "Who was your favorite teacher?",
                "What makes your best friend special?",
                "What memory would you like to relive?",
                "What habit would you like to improve?",
                
                // Hobbies and Interests
                "What's your favorite outdoor activity?",
                "What's your favorite indoor activity?",
                "What do you like to collect?",
                "What new hobby would you like to try?",
                "What's your favorite art form?",
                "What dance would you like to learn?",
                "What's your favorite craft project?",
                "What event would you like to attend?",
                "What type of reading do you enjoy?",
                "What technology would you like to master?",
                
                // Dreams and Goals
                "What kind of person do you want to be in 10 years?",
                "What challenge would you like to complete?",
                "What group of people would you like to help?",
                "What social issue would you like to solve?",
                "What legacy would you like to leave?",
                "What do you want to be remembered for?",
                "What impact would you like to make?",
                "What would you like to create?",
                "What world problem would you like to change?",
                "What social value would you like to promote?",
                
                // Life Philosophy
                "What do you think is the most important quality?",
                "What life motto do you believe in?",
                "What do you think true success is?",
                "What do you think is the greatest happiness?",
                "What's most important in friendship?",
                "What do you think is the best gift?",
                "When do you feel most accomplished?",
                "What do you think is the best way to learn?",
                "What's the most important life skill?",
                "What makes life meaningful?",
                
                // Fun Hypotheticals
                "If you had unlimited money, what would you do?",
                "If you could read minds, what would you use it for?",
                "If you could fly, where would you go first?",
                "If you could stop time, what would you do?",
                "If you could be invisible, where would you go?",
                "If you could talk to animals, which animal would you chat with?",
                "If you could teleport, where would you go?",
                "If you could see the future, what would you want to know?",
                "If you could bring back a historical figure, who would you choose?",
                "If you could eliminate one thing from the world, what would it be?"
            ],
            dare: [
                // Light Comedy
                "Walk like a penguin",
                "Talk in a weird voice until the next round",
                "Imitate a celebrity until the next round",
                "Wear socks as gloves for 5 minutes",
                "Try to lick your nose (or elbow)",
                "Say 'I'm so handsome/beautiful' to the mirror 10 times",
                "Speak with a fake foreign accent for 5 minutes",
                "Act like a cat - movements and sounds",
                "Act like a dog - movements and sounds",
                "Pretend to be a robot when speaking",
                "Write letters with your butt",
                "Draw a self-portrait with your eyes closed",
                "Write your name with your toes holding a pen",
                "Imitate a baby crying for 30 seconds",
                "Pretend to swim",
                "Walk like an elderly person",
                "Hop like a frog 10 times",
                "Strike a superhero pose",
                "Pretend to drive a car",
                "Imitate a sneeze sound",
                
                // Skill Demonstrations
                "Do 10 push-ups",
                "Stand on one foot for 1 minute",
                "Perform a dance",
                "Sing a complete song",
                "Say a tongue twister",
                "Tell a joke",
                "Perform a short play",
                "Draw a self-portrait",
                "Do 5 sit-ups",
                "Say a complete sentence backwards",
                "Sing 'Happy Birthday' in English",
                "Imitate a commercial",
                "Perform a magic trick",
                "Do a yoga pose",
                "Clap with one hand 10 times",
                "Walk straight with eyes closed for 10 steps",
                "Walk while balancing a book on your head",
                "Spin in place 10 times",
                "Jump rope (pretend you have a rope) 50 times",
                "Make a funny face",
                
                // Friendly Interactions
                "Give someone a hug",
                "Give someone a small gift",
                "Give someone a surprise",
                "Sincerely compliment someone",
                "Praise everyone present",
                "Give someone a shoulder massage",
                "High-five someone 10 times",
                "Give someone a high-five",
                "Dance with someone",
                "Let someone style your hair",
                "Sing with someone",
                "Give someone a flying kiss",
                "Play rock-paper-scissors with someone",
                "Tell someone a story",
                "Exercise with someone",
                "Greet someone",
                "Take a photo with someone",
                "Give someone a blessing",
                "Share snacks with someone",
                "Give someone a smile",
                
                // Mild Social Media
                "Post a thank you message to friends",
                "Post a funny selfie",
                "Post an inspirational quote",
                "Post 'What a beautiful day!'",
                "Like a friend's last 10 posts",
                "Post a food photo",
                "Share your favorite song",
                "Post good morning/good night",
                "Post a landscape photo",
                "Share a positive quote",
                "Post about pets",
                "Share an interesting video",
                "Post about exercise",
                "Recommend a good book",
                "Post about food experiences",
                "Share a travel memory",
                "Post about learning experiences",
                "Share a heartwarming story",
                "Post about family",
                "Share an inspirational image",
                
                // Creative Expression
                "Use your body to spell out a word for others to guess",
                "Play charades for 1 minute without speaking",
                "Make animal sounds",
                "Perform a mime act",
                "Read a passage in different voices",
                "Make up a story on the spot",
                "Imitate an animated character",
                "Imitate baby talk",
                "Express emotions like emojis",
                "Imitate people of different professions speaking",
                "Act out a fairy tale",
                "Use hand shadows to show an animal",
                "Imitate people of different ages",
                "Act out a movie scene",
                "Use your voice to imitate instruments",
                "Act out weather changes",
                "Imitate different vehicles",
                "Use your body to show time",
                "Express different emotions",
                "Imitate famous quotes from celebrities",
                
                // Art Creation
                "Draw a simple picture",
                "Fold a paper airplane",
                "Make a small animal with clay",
                "Write a short poem",
                "Design a badge",
                "Create a simple dance move",
                "Draw a simple comic",
                "Make a simple craft",
                "Design a new emoji",
                "Create a new word",
                "Write simple song lyrics",
                "Design a game rule",
                "Draw a greeting card",
                "Make a paper hat",
                "Create a hand dance",
                "Design a slogan",
                "Draw a mind map",
                "Make a simple collage",
                "Create a chant",
                "Design a simple logo"
            ]
        },
        spicy: {
            truth: [
                // Personal Deep Privacy
                "When was the last time you lied? To whom?",
                "Have you ever secretly liked someone here?",
                "What's your most embarrassing moment?",
                "What made you cry the hardest?",
                "Who did you have a crush on? Do you still talk?",
                "What's your most memorable romantic experience?",
                "What's your ideal date like?",
                "What's the craziest thing you've done for love?",
                "What's your least favorite thing about yourself?",
                "When did you feel most guilty?",
                "What's a habit you have that others don't know about?",
                "What's your biggest regret?",
                "What's the most impulsive thing you've done?",
                "What would you most like to say to someone?",
                "What's something you don't want others to know?",
                "What's the most childish thing you've done?",
                "What memory do you most want to forget?",
                "What's your biggest worry about the future?",
                "What have you done secretly that you don't want to be discovered?",
                "What's the most embarrassing thing you've done?",
                
                // Romance and Relationships (Edgy but Safe)
                "What was your first kiss like?",
                "Have you ever been in a complicated relationship?",
                "Have you ever cheated or thought about it?",
                "What was the worst breakup you experienced?",
                "What's the harshest thing you've said during a breakup?",
                "How many boyfriends/girlfriends have you had?",
                "Who would you most want to date?",
                "What's the biggest lie you've told in a relationship?",
                "Have you ever had an ambiguous relationship?",
                "Would you date someone you don't like for money?",
                "Have you ever looked through someone's phone?",
                "Have you ever had an online relationship?",
                "Would you date your friend's ex?",
                "Which ex would you most want to get back together with?",
                "What's the wildest dream you've had about someone?",
                "Have you ever been attracted to someone of the same gender?",
                "Which celebrity would you most want to be with?",
                "Would you accept an open relationship?",
                "Have you ever had feelings for a teacher or authority figure?",
                "What's your biggest romantic fantasy?",
                
                // Sharp Interpersonal Relations
                "What's something you've been mad at a friend for?",
                "What's something you've been mad at family for?",
                "What trait do you hate most about someone here?",
                "What have you said behind someone's back here?",
                "What do you envy about someone here?",
                "Who here do you think is most fake?",
                "Who here do you think is most narcissistic?",
                "Who would you most like to slap?",
                "Who do you think least deserves their current life?",
                "What type of person do you look down on most?",
                "Who's the most innocent person you've hurt?",
                "Who do you most want revenge against?",
                "What's the most vicious thing you've said?",
                "What's the worst thing you've done?",
                "Whose secret do you most want to reveal?",
                "Who do you think lives the most failed life?",
                "What do you most want to get from someone?",
                "Who do you most want to see fail?",
                "Who here do you think is most dishonest?",
                "Who do you most want to cut ties with?",
                
                // Moral Boundaries (Safe Version)
                "What's the biggest lie you've told?",
                "What important fact have you hidden?",
                "Have you deceived someone who loves you most?",
                "Have you betrayed someone who trusted you most?",
                "Have you taken advantage of someone's weakness?",
                "Have you hurt a friend for personal gain?",
                "Have you spread false information?",
                "Have you deliberately ignored someone who needed help?",
                "Have you sacrificed others for your own benefit?",
                "Have you continued doing something you knew was wrong?",
                "Have you violated your own principles?",
                "Have you done something against your conscience for appearances?",
                "Have you been jealous of someone's success?",
                "Have you ever taken pleasure in someone's misfortune?",
                "Have you ever kicked someone when they were down?",
                "Have you maliciously slandered someone?",
                "Have you deliberately given someone the cold shoulder?",
                "What have you done for revenge?",
                "When were you most selfish?",
                "When were you most hypocritical?",
                
                // Inner Challenge
                "What's your darkest thought?",
                "What do you most want to do but don't dare?",
                "What's your most shameful secret?",
                "What past do you most want to cover up?",
                "What weakness do you least want people to know?",
                "What responsibility do you most want to avoid?",
                "What lie are you most afraid of being exposed?",
                "What do you most want but can't have?",
                "What do you most want to become but think is impossible?",
                "What do you most want to forget but can't?",
                "What do you most want to forgive but can't?",
                "What do you most want to recover but can't?",
                "What do you most want to change but can't?",
                "What do you most want to escape but can't?",
                "What do you think is your biggest failure?",
                "What do you most regret not doing?",
                "What are you most afraid of losing?",
                "What reality do you most fear facing?",
                "What do you most want to prove to others?",
                "What's your biggest motivation for living?",
                
                // Money and Values
                "What's the thing you most regret doing for money?",
                "When were you most greedy?",
                "What principles would you abandon for money?",
                "What do you most want but can't afford?",
                "What's the biggest opportunity you missed due to lack of money?",
                "How much money would make you betray a friend?",
                "What's the cheapest thing you've done to save money?",
                "When were you most jealous of someone's wealth?",
                "Have you fought with family over money?",
                "Who do you most want to borrow money from but don't dare ask?",
                
                // Value Challenge
                "What behavior do you find most intolerable?",
                "What opinion from others is hardest for you to accept?",
                "What social phenomenon do you most want to change?",
                "What type of person do you think is most hypocritical?",
                "What double standard behavior do you find most disgusting?",
                "What traditional concept do you think should be broken?",
                "What mainstream opinion do you most want to refute?",
                "What rule do you think is most unreasonable?",
                "What authority do you most want to question?",
                "What social prejudice do you most want to change?"
            ],
            dare: [
                // Extremely Awkward Performance
                "Write your name with your butt",
                "Draw a pattern on your face with lipstick",
                "Act drunk",
                "Act angry",
                "Lick your nose with your tongue",
                "Take off your socks and let others smell them",
                "Act out the pain of childbirth",
                "Wear clothes of the opposite gender and take a photo",
                "Let others write on your body",
                "Let others feed you with your eyes closed",
                "Let others do your makeup",
                "Act out your most embarrassing experience",
                "Imitate the person you hate most",
                "Take an exaggerated selfie",
                "Act out what you fear most",
                "Imitate a baby crying",
                "Sit on a balloon until it pops with your butt",
                "Act out your first date nervousness",
                "Imitate how you look when drunk",
                "Act out your reaction when scared",
                
                // Extreme Social Challenges
                "Text your ex 'I miss you'",
                "Sing loudly in public",
                "Hug a stranger",
                "Post an ugly photo of yourself on social media",
                "Call a random person in your contacts pretending to be a salesperson",
                "Dance in public",
                "Post 'I'm in love' on social media",
                "Call a random person pretending to be a robot",
                "Shout 'I love you all!' in public",
                "Call a random person pretending to be an alien",
                "Confess to a stranger on the street",
                "Publicly admit your most awkward experience",
                "Loudly say which celebrity you most want to meet",
                "Call the person you hate most and apologize",
                "Loudly tell your most shameful secret",
                "Show others the funniest photo on your phone",
                "Publicly imitate the person you hate most",
                "Loudly admit one of your flaws",
                "Publicly express your real opinion about someone",
                "Publicly apologize for something you did wrong",
                "Loudly say your biggest regret",
                
                // Intimate Interaction (Moderate Version)
                "Kiss someone on the cheek",
                "Give someone a shoulder massage",
                "Hug someone for 30 seconds",
                "Sit on someone's lap",
                "Let someone style your hair",
                "Hold hands with someone and spin around",
                "Give someone a long hug",
                "Take a cheek-to-cheek photo with someone",
                "Let someone draw on your arm",
                "Dance with someone",
                "Give someone a flying kiss",
                "Stare into someone's eyes for 30 seconds without laughing",
                "Let someone feed you fruit",
                "Sing a love song with someone",
                "Give someone a hand massage",
                "Act out a romantic movie scene with someone",
                "Let someone braid your hair",
                "Make a heart shape with someone",
                "Give someone a gentle hug",
                "Take a loving couple photo with someone",
                
                // Skill Challenges
                "Do a handstand for 10 seconds",
                "Perform a magic trick",
                "Challenge your fear (of safe things)",
                "Try strange but safe food combinations",
                "Learn a new dance move",
                "Write with your non-dominant hand",
                "Walk straight with eyes closed",
                "Do a one-handed push-up",
                "Recite a complete poem",
                "Perform an impromptu drama",
                "Use your body to spell letters",
                "Imitate 5 different animals",
                "Speak backwards for 5 minutes",
                "Draw with your feet",
                "Learn a simple magic trick",
                "Imitate 5 different professions",
                "Write with a pen in your mouth",
                "Make 10 different facial expressions",
                "Learn a foreign tongue twister",
                "Perform a silent movie scene",
                
                // Self-Challenge
                "Send a message to your celebrity crush",
                "Start an emoji chain in a group chat",
                "Publicly admit your biggest failure",
                "Share your most awkward childhood memory",
                "Admit your most childish behavior",
                "Reveal a habit others don't know about",
                "Share your funniest embarrassing story",
                "Admit your most regrettable decision",
                "Say what you're most insecure about",
                "Share your silliest misunderstanding",
                "Admit your most ignorant moment",
                "Say what you're most afraid of",
                "Share your weirdest dream",
                "Admit when you were laziest",
                "Say your greediest moment",
                "Share your most impulsive purchase",
                "Admit when you were most gullible",
                "Say your most superstitious behavior",
                "Share your most bizarre thought",
                "Admit when you were most petty",
                
                // Social Challenges
                "Message your crush",
                "Tell the group one of your flaws",
                "Admit a mistake you've made",
                "Loudly state one of your wishes",
                "Share one of your embarrassing stories",
                "Boldly express an opinion",
                "Say a habit you most want to change",
                "Apologize to everyone for something you did wrong",
                "Message a friend you haven't contacted in the longest time",
                "Post a confession on social media (can be joking)",
                "Publicly praise someone you usually wouldn't compliment",
                "Apologize to someone you once misunderstood",
                "Publicly admit one of your biases",
                "Share a dream you want to achieve but are afraid to say",
                "Express gratitude to someone",
                "Publicly share your real opinion about something",
                "Admit who you envy most",
                "Share what skill you most want to learn",
                "Publicly praise someone you usually criticize",
                "Show respect to your competitor",
                
                // Creative Challenges
                "Imitate someone here in their movements and speech",
                "Admit your first impression of someone",
                "Act out your most awkward memory",
                "Show others the funniest photo on your phone",
                "Call your parents and tell them something you've never told them",
                "Challenge yourself to do something you usually wouldn't dare (safely)",
                "Try a new personal style",
                "Learn a skill you think is difficult",
                "Express admiration to someone you look up to",
                "Complete a task you've been procrastinating",
                "Try food you dislike",
                "Learn an art form you're not good at",
                "Challenge your comfort zone (within safe limits)",
                "Do something good for the environment",
                "Help someone you usually wouldn't help",
                "Learn to express feelings you usually don't say",
                "Try a completely new lifestyle",
                "Complete a goal you thought was impossible",
                "Develop a new positive habit",
                "Do something to make the world a better place"
            ]
        }
    }
};

// DOM elements
const questionText = document.getElementById('questionText');
const nextButton = document.getElementById('nextButton');
const resetButton = document.getElementById('resetButton');
const backButton = document.getElementById('backButton');
const selectedType = document.getElementById('selectedType');
const selectedDifficulty = document.getElementById('selectedDifficulty');
const difficultyButtons = document.getElementById('difficultyButtons');
const choiceButtons = document.getElementById('choiceButtons');

// Select difficulty
function selectDifficulty(difficulty) {
    gameData.currentDifficulty = difficulty;
    
    // Show selected difficulty
    if (difficulty === 'soft') {
        selectedDifficulty.innerHTML = '<span class="badge bg-success">Modo Suave</span>';
        questionText.textContent = '👇 Escolha Sua Opção! Conteúdo amigável para todas as idades 👇';
    } else {
        selectedDifficulty.innerHTML = '<span class="badge bg-warning">Modo Picante</span>';
        questionText.textContent = '👇 Escolha Sua Opção! Conteúdo mais desafiador para adultos 👇';
    }
    selectedDifficulty.style.display = 'block';

    // Hide difficulty buttons, show truth/dare buttons
    difficultyButtons.style.display = 'none';
    choiceButtons.style.display = 'flex';

    // Show back button
    backButton.style.display = 'inline-block';
}

// Select truth or dare
function selectChoice(type) {
    gameData.currentType = type;

    // Get random question
    const questions = gameData.questions[gameData.currentDifficulty][type];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

    // Display question
    questionText.textContent = randomQuestion;

    // Show selected type
    if (type === 'truth') {
        selectedType.innerHTML = '<span class="badge bg-info">Verdade</span>';
    } else {
        selectedType.innerHTML = '<span class="badge bg-danger">Desafio</span>';
    }
    selectedType.style.display = 'block';

    // Show control buttons
    nextButton.style.display = 'inline-block';
    resetButton.style.display = 'inline-block';

    // Hide choice buttons
    choiceButtons.style.display = 'none';
}

// Next question
function nextQuestion() {
    if (gameData.currentType && gameData.currentDifficulty) {
        const questions = gameData.questions[gameData.currentDifficulty][gameData.currentType];
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        questionText.textContent = randomQuestion;
    }
}

// Back to difficulty selection
function backToDifficulty() {
    gameData.currentType = null;
    questionText.textContent = '👇 Escolha o Modo de Jogo! 👇';
    selectedType.style.display = 'none';
    nextButton.style.display = 'none';
    resetButton.style.display = 'none';
    backButton.style.display = 'none';
    choiceButtons.style.display = 'none';
    difficultyButtons.style.display = 'flex';
}

// Reset game
function resetGame() {
    gameData.currentType = null;
    gameData.currentDifficulty = null;
    questionText.textContent = '👇 Escolha o Modo de Jogo! 👇';
    selectedType.style.display = 'none';
    selectedDifficulty.style.display = 'none';
    nextButton.style.display = 'none';
    resetButton.style.display = 'none';
    backButton.style.display = 'none';
    choiceButtons.style.display = 'none';
    difficultyButtons.style.display = 'flex';
}