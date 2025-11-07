const questions = [
    "...danser sur une table lors d'une fête",
    "...embrasser quelqu'un du premier rendez-vous",
    "...chanter fort en public",
    "...manger des snacks à minuit en cachette",
    "...faire un appel alcoolisé à son ex",
    "...se perdre en voyageant",
    "...s'endormir au cinéma et ronfler",
    "...publier trop de selfies sur les réseaux sociaux",
    "...raconter une histoire embarrassante lors d'une fête",
    "...péter devant les amis et accuser quelqu'un d'autre",
    "...attraper le bouquet à un mariage",
    "...essayer un défi dangereux lors d'une fête",
    "...porter des vêtements dépareillés en public",
    "...chanter au karaoke jusqu'à perdre la voix",
    "...pleurer devant des amis",
    "...flirter avec un étranger à une fête",
    "...oublier son passeport en voyageant",
    "...rester le plus tard lors d'une fête",
    "...révéler un secret devant des amis",
    "...essayer de danser mais échouer lamentablement",
    "...trébucher en public",
    "...commencer à parler de philosophie quand il est saoul",
    "...se vanter de ses réalisations",
    "...essayer une nourriture bizarre à une fête",
    "...acheter des souvenirs inutiles en voyageant",
    "...perdre la notion du temps lors d'une fête",
    "...révéler une vérité maladroite devant des amis",
    "...imiter une célébrité",
    "...porter ses vêtements à l'envers en public",
    "...commencer à chanter quand il est saoul",
    "...partager un rêve bizarre avec des amis",
    "...essayer un jeu dangereux lors d'une fête",
    "...se perdre et ne pas trouver l'hôtel en voyageant",
    "...faire la fête jusqu'au lever du soleil",
    "...révéler un secret embarrassant",
    "...essayer de danser mais échouer hilarement",
    "...trébucher en public et faire semblant que rien ne s'est passé",
    "...commencer à raconter des blagues quand il est saoul",
    "...montrer sa nouvelle tenue à des amis",
    "...essayer une nourriture bizarre à une fête",
    "...partager un rêve étrange avec des amis",
    "...essayer un jeu risqué lors d'une fête",
    "...faire la fête jusqu'à l'aube",
    "...accidentellement envoyer un message à la mauvaise personne",
    "...prendre les photos les plus embarrassantes lors d'une fête",
    "...oublier le nom de quelqu'un juste après l'avoir rencontré",
    "...aimer accidentellement une vieille publication de quelqu'un sur les réseaux sociaux",
    "...créer le plat épicé le plus savoureux comme spécialité",
    "...accidentellement assortir les tenues avec quelqu'un d'autre",
    "...créer les mouvements de danse les plus sauvages lors d'une fête"
];

let usedQuestions = new Set();

document.addEventListener('DOMContentLoaded', () => {
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    nextQuestionBtn.textContent = 'Commencer le jeu';
    nextQuestionBtn.addEventListener('click', nextQuestion);
});

function nextQuestion() {
    // Changer le texte du bouton en "Question suivante" après le premier clic
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    nextQuestionBtn.textContent = 'Question suivante';

    // Obtenir une question non utilisée au hasard
    let availableQuestions = questions.filter(q => !usedQuestions.has(q));
    if (availableQuestions.length === 0) {
        usedQuestions.clear();
        availableQuestions = questions;
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const currentQuestion = availableQuestions[randomIndex];
    usedQuestions.add(currentQuestion);

    // Afficher la question
    document.getElementById('questionText').textContent = currentQuestion;
}
