const questions = [
    {
        optionA: "Nunca mais poder comer comidas doces",
        optionB: "Nunca mais poder comer comidas salgadas"
    },
    {
        optionA: "Conseguir ler os pensamentos de todos",
        optionB: "Ter todos capazes de ler seus pensamentos"
    },
    {
        optionA: "Voltar no tempo e mudar uma coisa",
        optionB: "Ver o futuro"
    },
    {
        optionA: "Só poder ficar acordado durante o dia",
        optionB: "Só poder ficar acordado durante a noite"
    },
    {
        optionA: "Ser a pessoa mais inteligente do mundo mas não ser amado",
        optionB: "Ser a pessoa mais amada mas ter inteligência mediana"
    },
    {
        optionA: "Se teletransportar instantaneamente mas ter enjoo por 10 minutos cada vez",
        optionB: "Conseguir voar mas apenas até 3 metros de altura"
    },
    {
        optionA: "Nunca mais sentir cansaço",
        optionB: "Nunca mais sentir fome"
    },
    {
        optionA: "Conseguir falar com animais",
        optionB: "Conseguir falar todos os idiomas humanos"
    },
    {
        optionA: "Ter dinheiro ilimitado mas só poder gastar em outros",
        optionB: "Ter metade do dinheiro mas poder gastar em qualquer coisa"
    },
    {
        optionA: "Viver em um mundo sem música",
        optionB: "Viver em um mundo sem filmes ou programas de TV"
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

function showNextQuestion() {
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
nextButton.addEventListener('click', showNextQuestion);

// Show first question
showNextQuestion();
