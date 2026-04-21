const questions = [
    {
        question: "If TA won the lottery, what's the first thing they'd do?",
        options: ["Travel the world", "Invest/Save it", "Crazy shopping spree", "Quit job/school"]
    },
    {
        question: "What's TA's favorite way to de-stress?",
        options: ["Eating a huge meal", "Sleeping all day", "Talking to someone", "Gaming or solo time"]
    },
    {
        question: "What do you think is TA's biggest fear?",
        options: ["Insects or bugs", "Being all alone", "Running out of money", "Being misunderstood"]
    },
    {
        question: "If you and TA swapped bodies for a day, what would they do first?",
        options: ["Check your phone/privacy", "Spend all your money", "Confess to someone for you", "Ruin your social life"]
    },
    {
        question: "What's TA's idea of a perfect weekend?",
        options: ["Outdoor adventures", "Couch potato until dark", "Brunch & dinner with friends", "Immersed in a hobby"]
    },
    {
        question: "What's TA's most used emoji style?",
        options: ["Cool & Elegant", "Soft & Cute", "Sarcastic/Meany", "Silly/Meme style"]
    },
    {
        question: "What food can TA absolutely NOT stand?",
        options: ["Odd smelly greens (cilantro etc)", "Insanely spicy food", "Oily/Fatty meat", "Plain tasteless veggies"]
    },
    {
        question: "If TA had a superpower, they'd want...?",
        options: ["Teleportation (Go anywhere)", "Mind reading", "Invisibility", "Immortality"]
    },
    {
        question: "At Karaoke, what is TA's role usually?",
        options: ["The Protagonist (Never lets go)", "The Hype person (Cheering)", "The Eater (Fruit platter only)", "The Silent observer"]
    },
    {
        question: "What's TA's main motivation for saving money?",
        options: ["Buying gadgets or clothes", "Financial security", "Traveling with loved ones", "They don't save (Paycheck to paycheck)"]
    },
    {
        question: "What's TA's most common excuse for being late?",
        options: ["'I'm on my way' (Just left)", "'Alarm didn't go off'", "'Traffic was horrible today'", "TA is never late"]
    },
    {
        question: "What is TA's favorite social platform?",
        options: ["Instagram/Stories", "TikTok/Reels", "Reddit/YouTube", "Twitter/X (Gossip/Rants)"]
    },
    {
        question: "What do you think is TA's most charming quality?",
        options: ["Looks or physique", "Golden soul or humor", "High EQ or kindness", "Decisiveness or wisdom"]
    },
    {
        question: "Which extreme sport would TA want to try?",
        options: ["Skydiving", "Bungee jumping", "Deep sea diving", "Telling a dad joke to the boss"]
    },
    {
        question: "If stranded on a desert island, who would TA bring?",
        options: ["YOU (Of course!)", "Bear Grylls (To survive)", "Their crush or partner", "A world-class chef"]
    }
];

let currentQuestion = 0;
let userAnswers = [];
let targetFriend = "";
let correctAnswers = null;
let mode = "create";

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-game-btn');
const friendInput = document.getElementById('friend-name');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressText = document.getElementById('question-counter');
const progressBar = document.getElementById('quiz-progress');
const targetFriendSpan = document.getElementById('target-friend');
const restartBtn = document.getElementById('restart-btn');
const shareBtn = document.getElementById('share-btn');

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedAns = urlParams.get('ans');
    const creatorName = urlParams.get('name');

    if (encodedAns && creatorName) {
        mode = "guess";
        targetFriend = creatorName;
        correctAnswers = encodedAns.split('').map(Number);
        
        document.querySelector('#start-screen h1').innerText = "How well do you know " + targetFriend + "?";
        document.querySelector('#start-screen p.lead').innerHTML = `${targetFriend} challenged you!<br>Can you get 100% correct? Let's find out.`;
        friendInput.placeholder = "Enter your name";
    } else {
        mode = "create";
        document.querySelector('#start-screen h1').innerText = "Friendship Quiz";
        document.querySelector('#start-screen p.lead').innerHTML = "Answer these 15 questions about yourself,<br>then share the link to see who knows you best!";
        friendInput.placeholder = "Enter your name";
    }
}

startBtn.addEventListener('click', () => {
    const name = friendInput.value.trim();
    if (!name) {
        alert("Please enter a name to start!");
        return;
    }
    
    if (mode === "create") targetFriend = name;
    
    startScreen.classList.remove('active');
    setTimeout(() => {
        startScreen.classList.add('d-none');
        quizScreen.classList.remove('d-none');
        quizScreen.classList.add('active');
        currentQuestion = 0;
        userAnswers = [];
        showQuestion();
    }, 400);
});

function showQuestion() {
    const q = questions[currentQuestion];
    let displayText = q.question;
    
    if (mode === "create") {
        displayText = displayText.replace('TA', 'yourself');
    } else {
        displayText = displayText.replace('TA', targetFriend);
    }
    
    questionText.innerText = displayText;
    optionsContainer.innerHTML = '';
    
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn pulse-hover';
        btn.innerText = option;
        btn.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(btn);
    });

    progressText.innerText = `Question ${currentQuestion + 1} / ${questions.length}`;
    progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
}

function selectOption(index) {
    userAnswers.push(index);
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.classList.remove('active');
    setTimeout(() => {
        quizScreen.classList.add('d-none');
        resultScreen.classList.remove('d-none');
        resultScreen.classList.add('active');
        
        const titleEl = document.getElementById('result-title');
        const descEl = document.getElementById('result-description');
        const percentageEl = document.getElementById('result-percentage');
        
        if (mode === "create") {
            titleEl.innerText = "Quiz Ready!";
            const answerString = userAnswers.join('');
            const shareUrl = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(targetFriend)}&ans=${answerString}`;
            
            percentageEl.innerText = "DONE";
            percentageEl.style.fontSize = "1.5rem";
            
            descEl.innerHTML = `Great, ${targetFriend}! Your quiz is unique.<br>Copy the link below and send it to your besties!`;
            targetFriendSpan.innerText = "YOURSELF";
            
            shareBtn.innerHTML = '<i class="fas fa-copy me-2"></i> Copy Link';
            shareBtn.onclick = () => {
                navigator.clipboard.writeText(shareUrl).then(() => {
                    alert("Link copied! Go send it!");
                });
            };
            
            restartBtn.innerText = "Redo Quiz";
        } else {
            let score = 0;
            userAnswers.forEach((ans, i) => {
                if (ans === correctAnswers[i]) score++;
            });
            
            const finalPercentage = Math.round((score / questions.length) * 100);
            percentageEl.innerText = `${finalPercentage}%`;
            
            targetFriendSpan.innerText = targetFriend;
            
            if (finalPercentage === 100) {
                titleEl.innerText = "Soulmates (100%)";
                descEl.innerText = `Incredible! You and ${targetFriend} are on the same wavelength!`;
            } else if (finalPercentage >= 80) {
                titleEl.innerText = "Besties";
                descEl.innerText = `Great job! You know ${targetFriend} extremely well.`;
            } else if (finalPercentage >= 50) {
                titleEl.innerText = "Good Chemistry";
                descEl.innerText = `You have a solid bond! Still some things to learn about each other.`;
            } else {
                titleEl.innerText = "Acquaintances?";
                descEl.innerText = `Maybe it's time to spend more time hanging out with ${targetFriend}!`;
            }
            
            shareBtn.innerHTML = '<i class="fas fa-share-alt me-2"></i> Share Score';
            shareBtn.onclick = () => {
                 if (navigator.share) {
                    navigator.share({
                        title: 'Friendship Quiz Results',
                        text: `I know ${targetFriend} ${finalPercentage}%! Can you beat me?`,
                        url: window.location.href
                    });
                } else {
                    alert("Take a screenshot to share!");
                }
            };
            
            restartBtn.innerText = "Create My Own Quiz";
            restartBtn.onclick = () => {
                window.location.href = window.location.pathname;
            };
        }
    }, 400);
}

init();

restartBtn.addEventListener('click', () => {
    if (mode === "guess") return;
    resultScreen.classList.remove('active');
    setTimeout(() => {
        resultScreen.classList.add('d-none');
        startScreen.classList.remove('d-none');
        startScreen.classList.add('active');
        friendInput.value = '';
    }, 400);
});
