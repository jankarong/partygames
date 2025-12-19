const questions = [
    {
        optionA: "Никогда не иметь возможности есть сладкое",
        optionB: "Никогда не иметь возможности есть соленое"
    },
    {
        optionA: "Уметь читать мысли всех людей",
        optionB: "Чтобы все люди могли читать твои мысли"
    },
    {
        optionA: "Вернуться в прошлое и изменить одну вещь",
        optionB: "Заглянуть в будущее"
    },
    {
        optionA: "Бодрствовать только днем",
        optionB: "Бодрствовать только ночью"
    },
    {
        optionA: "Быть самым умным человеком в мире, но нелюбимым",
        optionB: "Быть самым любимым человеком, но со средним интеллектом"
    },
    {
        optionA: "Телепортироваться мгновенно, но испытывать укачивание 10 минут каждый раз",
        optionB: "Уметь летать, но только на высоте до 3 метров"
    },
    {
        optionA: "Никогда не чувствовать усталость",
        optionB: "Никогда не чувствовать голод"
    },
    {
        optionA: "Уметь разговаривать с животными",
        optionB: "Уметь говорить на всех человеческих языках"
    },
    {
        optionA: "Иметь неограниченные деньги, но тратить их только на других",
        optionB: "Иметь вдвое меньше денег, но тратить на что угодно"
    },
    {
        optionA: "Жить в мире без музыки",
        optionB: "Жить в мире без фильмов и телешоу"
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
    // Сброс выбора
    optionA.classList.remove('selected');
    optionB.classList.remove('selected');
    percentageA.style.opacity = '0';
    percentageB.style.opacity = '0';
    selectedOption = null;

    // Получить следующий вопрос
    currentQuestion = (currentQuestion + 1) % questions.length;
    const question = questions[currentQuestion];

    // Обновить текст
    optionAText.textContent = question.optionA;
    optionBText.textContent = question.optionB;
}

function selectOption(option) {
    if (selectedOption !== null) return;

    selectedOption = option;
    const otherOption = option === 'A' ? 'B' : 'A';

    // Показать выбор
    document.getElementById(`option${option}`).classList.add('selected');

    // Генерировать случайные проценты
    const percentage = Math.floor(Math.random() * 31) + 35; // 35-65%
    const otherPercentage = 100 - percentage;

    // Показать проценты
    document.getElementById(`percentage${option}`).textContent = `${percentage}%`;
    document.getElementById(`percentage${otherOption}`).textContent = `${otherPercentage}%`;

    document.getElementById(`percentage${option}`).style.opacity = '1';
    document.getElementById(`percentage${otherOption}`).style.opacity = '1';
}

optionA.addEventListener('click', () => selectOption('A'));
optionB.addEventListener('click', () => selectOption('B'));
nextButton.addEventListener('click', showNextQuestion);

// Показать первый вопрос
showNextQuestion();
