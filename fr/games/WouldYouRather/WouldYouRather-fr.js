const questions = [
    {
        optionA: "Ne jamais pouvoir manger de sucreries",
        optionB: "Ne jamais pouvoir manger de savoureux"
    },
    {
        optionA: "Pouvoir lire les pensées de tout le monde",
        optionB: "Que tout le monde puisse lire tes pensées"
    },
    {
        optionA: "Retourner dans le passé et changer une chose",
        optionB: "Voir dans l'avenir"
    },
    {
        optionA: "Ne pouvoir être éveillé que pendant la journée",
        optionB: "Ne pouvoir être éveillé que pendant la nuit"
    },
    {
        optionA: "Être la personne la plus intelligente au monde mais sans amis",
        optionB: "Être la personne la plus aimée mais avoir une intelligence moyenne"
    },
    {
        optionA: "Se téléporter instantanément mais avoir un mal des transports pendant 10 minutes après",
        optionB: "Pouvoir voler mais seulement jusqu'à 10 pieds de haut"
    },
    {
        optionA: "Ne jamais se sentir fatigué",
        optionB: "Ne jamais avoir faim"
    },
    {
        optionA: "Pouvoir parler aux animaux",
        optionB: "Pouvoir parler chaque langue humaine"
    },
    {
        optionA: "Avoir de l'argent illimité mais ne pouvoir le dépenser que pour les autres",
        optionB: "Avoir la moitié de l'argent mais pouvoir le dépenser pour n'importe quoi"
    },
    {
        optionA: "Vivre dans un monde sans musique",
        optionB: "Vivre dans un monde sans films ou émissions télévisées"
    },
    {
        optionA: "Avoir un don culinaire merveilleux",
        optionB: "Avoir une voix chantante magnifique"
    },
    {
        optionA: "Pouvoir transformer en dragon",
        optionB: "Pouvoir te transformer en phoenix"
    },
    {
        optionA: "Avoir la capacité de voyager dans le temps",
        optionB: "Avoir la capacité de cloner les gens"
    },
    {
        optionA: "Vivre dans un château merveilleux",
        optionB: "Vivre sur une île tropicale"
    },
    {
        optionA: "Avoir la beauté d'une célébrité",
        optionB: "Avoir la richesse d'une personne riche"
    },
    {
        optionA: "Être capable d'accélérer ta vitesse",
        optionB: "Être capable de ralentir le temps"
    },
    {
        optionA: "Être invisible pendant un jour",
        optionB: "Pouvoir tout entendre pendant un jour"
    },
    {
        optionA: "Avoir une meilleure mémoire",
        optionB: "Avoir une meilleure créativité"
    },
    {
        optionA: "Pouvoir réduire à volonté",
        optionB: "Pouvoir grandir à volonté"
    },
    {
        optionA: "Vivre sous l'eau",
        optionB: "Vivre dans le ciel"
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
    // Réinitialiser les sélections
    optionA.classList.remove('selected');
    optionB.classList.remove('selected');
    percentageA.style.opacity = '0';
    percentageB.style.opacity = '0';
    selectedOption = null;

    // Obtenir la question suivante
    currentQuestion = (currentQuestion + 1) % questions.length;
    const question = questions[currentQuestion];

    // Mettre à jour le texte
    optionAText.textContent = question.optionA;
    optionBText.textContent = question.optionB;
}

function selectOption(option) {
    if (selectedOption !== null) return;

    selectedOption = option;
    const otherOption = option === 'A' ? 'B' : 'A';

    // Afficher la sélection
    document.getElementById(`option${option}`).classList.add('selected');

    // Générer des pourcentages aléatoires
    const percentage = Math.floor(Math.random() * 31) + 35; // 35-65%
    const otherPercentage = 100 - percentage;

    // Afficher les pourcentages
    document.getElementById(`percentage${option}`).textContent = `${percentage}%`;
    document.getElementById(`percentage${otherOption}`).textContent = `${otherPercentage}%`;

    document.getElementById(`percentage${option}`).style.opacity = '1';
    document.getElementById(`percentage${otherOption}`).style.opacity = '1';
}

optionA.addEventListener('click', () => selectOption('A'));
optionB.addEventListener('click', () => selectOption('B'));
nextButton.addEventListener('click', showNextQuestion);

// Afficher la première question
showNextQuestion();
