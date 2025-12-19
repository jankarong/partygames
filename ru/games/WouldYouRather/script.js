const questions = [
    {
        optionA: "Never be able to eat sweet foods again",
        optionB: "Never be able to eat savory foods again"
    },
    {
        optionA: "Be able to read everyone's thoughts",
        optionB: "Have everyone be able to read your thoughts"
    },
    {
        optionA: "Go back in time and change one thing",
        optionB: "See into the future"
    },
    {
        optionA: "Only be able to be awake during the day",
        optionB: "Only be able to be awake during the night"
    },
    {
        optionA: "Be the smartest person in the world but unloved",
        optionB: "Be the most loved person but have average intelligence"
    },
    {
        optionA: "Teleport instantly but get motion sickness for 10 minutes each time",
        optionB: "Be able to fly but only up to 10 feet high"
    },
    {
        optionA: "Never feel tired again",
        optionB: "Never feel hungry again"
    },
    {
        optionA: "Be able to talk to animals",
        optionB: "Be able to speak every human language"
    },
    {
        optionA: "Have unlimited money but can only spend it on others",
        optionB: "Have half as much money but can spend it on anything"
    },
    {
        optionA: "Live in a world with no music",
        optionB: "Live in a world with no movies or TV shows"
    }
];

let currentQuestion = -1;
let selectedOption = null;

const optionA = document.getElementById('optionA');
const optionB = document.getElementById('optionB');
const optionAText = document.getElementById('optionAText');
const optionBText = document.getElementById('optionBText');
const percentageA = document.getElementById('percentageA');
const percentageB = document.getElementById('percentageB');
const nextButton = document.getElementById('nextQuestion');

function showДальшеQuestion() {
    // Reset selections
    optionA.classList.remove('selected');
    optionB.classList.remove('selected');
    percentageA.style.opacity = '0';
    percentageB.style.opacity = '0';
    selectedOption = null;

    // Get next question
    currentQuestion = (currentQuestion + 1) % questions.length;
    const question = questions[currentQuestion];

    // Update text
    optionAText.textContent = question.optionA;
    optionBText.textContent = question.optionB;
}

function selectOption(option) {
    if (selectedOption !== null) return;

    selectedOption = option;
    const otherOption = option === 'A' ? 'B' : 'A';

    // Show selection
    document.getElementById(`option${option}`).classList.add('selected');

    // Generate random percentages
    const percentage = Math.floor(Math.random() * 31) + 35; // 35-65%
    const otherPercentage = 100 - percentage;

    // Show percentages
    document.getElementById(`percentage${option}`).textContent = `${percentage}%`;
    document.getElementById(`percentage${otherOption}`).textContent = `${otherPercentage}%`;
    
    document.getElementById(`percentage${option}`).style.opacity = '1';
    document.getElementById(`percentage${otherOption}`).style.opacity = '1';
}

optionA.addEventListener('click', () => selectOption('A'));
optionB.addEventListener('click', () => selectOption('B'));
nextButton.addEventListener('click', showДальшеQuestion);

// Show first question
showДальшеQuestion();
