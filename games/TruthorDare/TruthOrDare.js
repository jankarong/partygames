// Game data
const gameData = {
    currentType: null,
    questions: {
        truth: [
            // Light and Funny
            "When was the last time you lied?",
            "If you could turn into an animal, what would it be?",
            "What was your weirdest childhood fantasy?",
            "Have you ever secretly liked someone here?",
            "What's your most embarrassing moment?",
            "What's your favorite meme?",
            "What's the saddest thing you've ever cried over?",
            "If you were invisible for a day, what would you do?",
            "What's your favorite movie quote?",
            "What's the most boring thing you've ever done?",

            // Emotional and Deep
            "Who did you have a crush on?",
            "What's your most memorable romantic experience?",
            "What's your ideal date like?",
            "What's the craziest thing you've done for love?",
            "What's your favorite thing about yourself?",
            "What's your least favorite thing about yourself?",
            "What's the guiltiest you've ever felt?",
            "What's your favorite childhood memory?",
            "What's the thing you're most proud of?",
            "What's your biggest fear?",

            // Fun and Creative
            "If you could have any superpower, what would it be?",
            "If you could time travel, what would you change?",
            "If you could be any celebrity for a day, who would you choose?",
            "Who's your favorite fictional character?",
            "If you could invent a new food, what would it be?",
            "What's your favorite holiday and why?",
            "If you could live in any movie or TV show world, which would it be?",
            "What's your favorite travel destination?",
            "If you could change one thing about the world, what would it be?",
            "What's your favorite childhood game?",

            // Interactive Fun
            "What's something you've been mad at a friend for?",
            "What's something you've been mad at a family member for?",
            "What's something you've been mad at a coworker for?",
            "What's something you've been mad at a stranger for?",
            "What's the most awkward thing you've experienced?",
            "What's the happiest thing you've experienced?",
            "What's the saddest thing you've experienced?",
            "What's the most surprising thing you've experienced?",
            "What's the angriest you've ever been?",
            "What's the scariest thing you've experienced?",

            // Random Fun
            "What's your favorite food?",
            "What's your favorite drink?",
            "What's your favorite color?",
            "What's your favorite music genre?",
            "What's your favorite sport?",
            "What's your favorite book?",
            "What's your favorite movie?",
            "What's your favorite TV show?",
            "What's your favorite game?",
            "What's your favorite social media platform?"
        ],
        dare: [
            // Light and Funny
            "Write your name with your butt",
            "Walk like a penguin",
            "Talk in a weird voice until the next round",
            "Call the 3rd person in your contacts and sing a song",
            "Post a weird status on social media",
            "Imitate a celebrity until the next round",
            "Wear socks as gloves for 5 minutes",
            "Draw a pattern on your face with lipstick",
            "Try to lick your nose (or elbow if you can't)",
            "Say 'I'm so handsome/beautiful' to the mirror 10 times",

            // Slightly Risky
            "Text your ex 'I miss you'",
            "Sing a song loudly in public",
            "Hug a stranger",
            "Post an ugly photo of yourself on social media",
            "Call a random person in your contacts and pretend to be a salesperson",
            "Dance in public",
            "Post 'I'm in love' on social media",
            "Call a random person and pretend to be a robot",
            "Shout 'I love you all!' in public",
            "Call a random person and pretend to be an alien",

            // Interactive Fun
            "Give someone a hug",
            "Give someone a kiss on the cheek",
            "Give someone a massage",
            "Give someone a small gift",
            "Give someone a surprise",
            "Give someone a challenge",
            "Give someone a task",
            "Share a secret with someone",
            "Make a promise to someone",
            "Share a dream with someone",

            // Random Fun
            "Do your best penguin walk",
            "Make animal noises for 30 seconds",
            "Do a silly dance",
            "Speak in an accent for the next 3 rounds",
            "Do your best celebrity impression",
            "Make up a short rap about someone in the room",
            "Do 10 jumping jacks",
            "Tell a joke in a funny voice",
            "Do your best robot dance",
            "Make up a short story about someone in the room"
        ]
    }
};

let currentChoice = null;
let currentQuestion = null;
let questionCount = 0;

// Select truth or dare
function selectChoice(choice) {
    const questionText = document.getElementById('questionText');
    const nextButton = document.getElementById('nextButton');
    const resetButton = document.getElementById('resetButton');
    const choiceButtons = document.querySelector('.choice-buttons');
    const selectedType = document.getElementById('selectedType');

    currentChoice = choice;

    // 隐藏选择按钮
    choiceButtons.style.display = 'none';

    // 显示选择的类型
    selectedType.innerHTML = `Playing: <span class="${choice}-text">${choice.toUpperCase()}</span>`;
    selectedType.style.display = 'block';

    // 显示第一个问题
    if (choice === 'truth') {
        currentQuestion = getRandomQuestion('truth');
        questionText.innerHTML = `<span style="color: var(--primary-blue)">Truth:</span> ${currentQuestion}`;
    } else {
        currentQuestion = getRandomQuestion('dare');
        questionText.innerHTML = `<span style="color: var(--primary-red)">Dare:</span> ${currentQuestion}`;
    }

    // 显示下一题按钮和Change Choice按钮
    nextButton.style.display = 'inline-block';
    resetButton.style.display = 'inline-block';
}

function nextQuestion() {
    const questionText = document.getElementById('questionText');
    questionCount++;

    // 直接显示当前选择类型的下一个问题
    if (currentChoice === 'truth') {
        currentQuestion = getRandomQuestion('truth');
        questionText.innerHTML = `<span style="color: var(--primary-blue)">Truth:</span> ${currentQuestion}`;
    } else {
        currentQuestion = getRandomQuestion('dare');
        questionText.innerHTML = `<span style="color: var(--primary-red)">Dare:</span> ${currentQuestion}`;
    }

    // Show game recommendations after 5 questions
    if (questionCount === 5 && window.GameNavigationAPI) {
        setTimeout(() => {
            window.GameNavigationAPI.showRecommendations();
        }, 2000);
    }
}

function resetGame() {
    const questionText = document.getElementById('questionText');
    const nextButton = document.getElementById('nextButton');
    const resetButton = document.getElementById('resetButton');
    const choiceButtons = document.querySelector('.choice-buttons');
    const selectedType = document.getElementById('selectedType');

    // 重置所有状态
    currentChoice = null;
    questionCount = 0;
    questionText.innerHTML = '👇 Pick Your Choice! 👇';
    nextButton.style.display = 'none';
    resetButton.style.display = 'none';
    choiceButtons.style.display = 'flex';
    selectedType.style.display = 'none';
}

// Get random question
function getRandomQuestion(type) {
    const questions = gameData.questions[type];
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}
