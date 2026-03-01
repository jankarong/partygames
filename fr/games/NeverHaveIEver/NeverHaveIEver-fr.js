const statements = [
    "Je n'ai jamais embrassé quelqu'un du premier rendez-vous",
    "Je n'ai jamais eu un crush sur le partenaire d'un ami",
    "Je n'ai jamais envoyé un SMS à la mauvaise personne",
    "Je n'ai jamais prétendu être malade pour me sortir d'un plan",
    "Je n'ai jamais eu une relation d'une nuit",
    "Je n'ai jamais menti sur mon âge",
    "Je n'ai jamais eu une relation secrète",
    "Je n'ai jamais triché sur un examen",
    "Je n'ai jamais été surpris en train de mentir",
    "Je n'ai jamais eu un crush sur un professeur ou un patron",
    "Je n'ai jamais fait du nudisme",
    "Je n'ai jamais eu un rêve romantique sur quelqu'un que je connais",
    "Je n'ai jamais flirté pour obtenir une réduction ou quelque chose de gratuit",
    "Je n'ai jamais eu un crush sur l'ex d'un ami",
    "Je n'ai jamais regardé le téléphone de quelqu'un d'autre",
    "Je n'ai jamais menti sur mon statut relationnel",
    "Je n'ai jamais eu un crush sur une célébrité",
    "Je n'ai jamais envoyé une photo risquée",
    "Je n'ai jamais eu un crush sur un collègue",
    "Je n'ai jamais eu un faux compte de médias sociaux",
    "Je n'ai jamais eu un crush sur le frère ou la sœur d'un ami",
    "Je n'ai jamais menti sur mon emploi ou mon salaire",
    "Je n'ai jamais eu un crush sur un voisin",
    "Je n'ai jamais eu un crush sur mon meilleur ami",
    "Je n'ai jamais eu un crush sur un étranger",
    "Je n'ai jamais eu un crush sur le partenaire d'une célébrité",
    "Je n'ai jamais eu un crush sur un parent d'un ami",
    "Je n'ai jamais eu un crush sur un assistant d'enseignant",
    "Je n'ai jamais eu un crush sur le crush d'un ami",
    "Je n'ai jamais eu un crush sur un ami d'un ami",
    "Je n'ai jamais m'endormi en classe",
    "Je n'ai jamais chanté en public",
    "Je n'ai jamais tiré une nuit blanche",
    "Je n'ai jamais volé la nourriture de mon colocataire",
    "Je n'ai jamais oublié un parapluie par un jour de pluie",
    "Je n'ai jamais sauté une classe pour jouer aux jeux vidéo",
    "Je n'ai jamais m'endormi pendant un film au cinéma",
    "Je n'ai jamais porté des vêtements à l'envers en public",
    "Je n'ai jamais pété bruyamment en public",
    "Je n'ai jamais été en retard à un rendez-vous",
    "Je n'ai jamais chanté sous la douche",
    "Je n'ai jamais trébuché en public",
    "Je n'ai jamais veillé toute la nuit en train de jouer",
    "Je n'ai jamais renversé du café sur mon clavier",
    "Je n'ai jamais dit quelque chose d'embarrassant avec mon micro encore allumé",
    "Je n'ai jamais fait un achat impulsif en ligne",
    "Je n'ai jamais prétendu faire de l'exercice",
    "Je n'ai jamais mis les ordures dans la mauvaise poubelle",
    "Je n'ai jamais eu mon téléphone qui sonne au pire moment",
    "Je n'ai jamais laissé des documents importants dans l'imprimante",
    "Je n'ai jamais prétendu être célibataire sur les réseaux sociaux",
    "Je n'ai jamais simulé une maladie pour sauter quelque chose",
    "Je n'ai jamais prétendu comprendre ce que quelqu'un disait",
    "Je n'ai jamais ruiné les vêtements à la machine à laver",
    "Je n'ai jamais manqué mon arrêt en dormant dans les transports en commun",
    "Je n'ai jamais confondu des dates importantes",
    "Je n'ai jamais appelé quelqu'un par le mauvais nom"
];

let usedStatements = [];

document.addEventListener('DOMContentLoaded', () => {
    const statementElement = document.getElementById('statement');
    const nextButton = document.getElementById('nextBtn');
    const resetButton = document.getElementById('resetBtn');

    function getRandomStatement() {
        if (statements.length === usedStatements.length) {
            return 'Fin du jeu ! Cliquez sur Réinitialiser pour rejouer.';
        }

        let availableStatements = statements.filter(statement => !usedStatements.includes(statement));
        let randomIndex = Math.floor(Math.random() * availableStatements.length);
        let selectedStatement = availableStatements[randomIndex];
        usedStatements.push(selectedStatement);
        return selectedStatement;
    }

    nextButton.addEventListener('click', () => {
        const newStatement = getRandomStatement();
        statementElement.textContent = newStatement;
        if (nextButton.textContent === 'Démarrer') {
            nextButton.textContent = 'Suivant';
        }
        if (usedStatements.length === statements.length) {
            nextButton.disabled = true;
        }
    });

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            usedStatements = [];
            nextButton.disabled = false;
            statementElement.textContent = 'Cliquez sur "Démarrer" pour commencer !';
            nextButton.textContent = 'Démarrer';
        });
    }
});
