const questions = [
    {
        optionA: "Nie wieder süße Speisen essen können",
        optionB: "Nie wieder herzhafte Speisen essen können"
    },
    {
        optionA: "Die Gedanken aller Menschen lesen können",
        optionB: "Alle können deine Gedanken lesen"
    },
    {
        optionA: "In die Vergangenheit reisen und eine Sache ändern",
        optionB: "In die Zukunft sehen können"
    },
    {
        optionA: "Nur tagsüber wach sein können",
        optionB: "Nur nachts wach sein können"
    },
    {
        optionA: "Die klügste Person der Welt sein, aber ungeliebt",
        optionB: "Die beliebteste Person sein, aber durchschnittlich intelligent"
    },
    {
        optionA: "Dich sofort teleportieren können, aber 10 Minuten Reisekrankheit bekommen",
        optionB: "Fliegen können, aber nur bis zu 3 Meter Höhe"
    },
    {
        optionA: "Nie wieder müde sein",
        optionB: "Nie wieder hungrig sein"
    },
    {
        optionA: "Mit Tieren sprechen können",
        optionB: "Jede menschliche Sprache sprechen können"
    },
    {
        optionA: "Unbegrenzt Geld haben, aber nur für andere ausgeben können",
        optionB: "Halb so viel Geld haben, aber für alles ausgeben können"
    },
    {
        optionA: "In einer Welt ohne Musik leben",
        optionB: "In einer Welt ohne Filme oder TV-Sendungen leben"
    },
    {
        optionA: "Immer 10 Minuten zu spät kommen",
        optionB: "Immer 20 Minuten zu früh sein"
    },
    {
        optionA: "Die Vergangenheit kennen",
        optionB: "Die Zukunft kennen"
    },
    {
        optionA: "Für immer im Körper eines Kindes bleiben",
        optionB: "Für immer im Körper eines 80-Jährigen bleiben"
    },
    {
        optionA: "Unsichtbar sein können",
        optionB: "Gedanken lesen können"
    },
    {
        optionA: "Auf einer einsamen Insel gestrandet sein",
        optionB: "In einer überfüllten Stadt gefangen sein"
    },
    {
        optionA: "Immer die Wahrheit sagen müssen",
        optionB: "Immer lügen müssen"
    },
    {
        optionA: "100 Jahre in der Vergangenheit leben",
        optionB: "100 Jahre in der Zukunft leben"
    },
    {
        optionA: "Berühmt sein, aber arm",
        optionB: "Reich sein, aber unbekannt"
    },
    {
        optionA: "Die Macht haben, die Zeit anzuhalten",
        optionB: "Die Macht haben, zurückzuspulen"
    },
    {
        optionA: "Nie wieder dein Smartphone benutzen können",
        optionB: "Nie wieder fernsehen können"
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
