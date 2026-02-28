const questions = [
    {
        optionA: "Değil olabilir makan makanan manis tekrar selamanya",
        optionB: "Değil olabilir makan makanan gurih tekrar selamanya"
    },
    {
        optionA: "Olabilir membaca pikiran herkes kişi",
        optionB: "Herkes kişi olabilir membaca pikiran Anda"
    },
    {
        optionA: "Geri Dön ke masa lalu ve mengubah satu hal",
        optionB: "Melihat ke masa depan"
    },
    {
        optionA: "Sadece olabilir terjaga di siang hari",
        optionB: "Sadece olabilir terjaga di malam hari"
    },
    {
        optionA: "Menjadi kişi terpintar di dunia tapi değil dicintai",
        optionB: "Menjadi kişi olan paling dicintai tapi memiliki kecerdasan rata-rata"
    },
    {
        optionA: "Teleportasi instan tapi mabuk perjalanan selama 10 menit setiap kali",
        optionB: "Olabilir terbang tapi sadece setinggi 10 kaki"
    },
    {
        optionA: "Değil pernah merasa lelah tekrar",
        optionB: "Değil pernah merasa lapar tekrar"
    },
    {
        optionA: "Olabilir berbicara ile hewan",
        optionB: "Olabilir berbicara dalam setiap bahasa manusia"
    },
    {
        optionA: "Memiliki uang tak terbatas tapi sadece olabilir dibelanjakan için kişi lain",
        optionB: "Memiliki setengah -den uang itu tapi olabilir dibelanjakan için apa saja"
    },
    {
        optionA: "Hidup di dunia tanpa musik",
        optionB: "Hidup di dunia tanpa film atau etkinlik TV"
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
