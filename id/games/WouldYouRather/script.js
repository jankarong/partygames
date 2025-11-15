const questions = [
    {
        optionA: "Tidak bisa makan makanan manis lagi selamanya",
        optionB: "Tidak bisa makan makanan gurih lagi selamanya"
    },
    {
        optionA: "Bisa membaca pikiran semua orang",
        optionB: "Semua orang bisa membaca pikiran Anda"
    },
    {
        optionA: "Kembali ke masa lalu dan mengubah satu hal",
        optionB: "Melihat ke masa depan"
    },
    {
        optionA: "Hanya bisa terjaga di siang hari",
        optionB: "Hanya bisa terjaga di malam hari"
    },
    {
        optionA: "Menjadi orang terpintar di dunia tapi tidak dicintai",
        optionB: "Menjadi orang yang paling dicintai tapi memiliki kecerdasan rata-rata"
    },
    {
        optionA: "Teleportasi instan tapi mabuk perjalanan selama 10 menit setiap kali",
        optionB: "Bisa terbang tapi hanya setinggi 10 kaki"
    },
    {
        optionA: "Tidak pernah merasa lelah lagi",
        optionB: "Tidak pernah merasa lapar lagi"
    },
    {
        optionA: "Bisa berbicara dengan hewan",
        optionB: "Bisa berbicara dalam setiap bahasa manusia"
    },
    {
        optionA: "Memiliki uang tak terbatas tapi hanya bisa dibelanjakan untuk orang lain",
        optionB: "Memiliki setengah dari uang itu tapi bisa dibelanjakan untuk apa saja"
    },
    {
        optionA: "Hidup di dunia tanpa musik",
        optionB: "Hidup di dunia tanpa film atau acara TV"
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
