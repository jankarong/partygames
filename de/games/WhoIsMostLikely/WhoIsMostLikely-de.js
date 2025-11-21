const questions = [
    "...würde auf einem Tisch bei einer Party tanzen",
    "...würde jemanden beim ersten Date küssen",
    "...würde laut in der Öffentlichkeit singen",
    "...würde nachts Snacks naschen",
    "...würde seinen Ex betrunken anrufen",
    "...würde sich beim Reisen verlaufen",
    "...würde im Kino einschlafen und schnarchen",
    "...würde zu viele Selfies in den sozialen Medien posten",
    "...würde eine peinliche Geschichte auf einer Party erzählen",
    "...würde einen Blähbauch bekommen und es jemandem zuordnen",
    "...würde den Brautstrauß bei einer Hochzeit fangen",
    "...würde ein gefährliches Spiel auf einer Party versuchen",
    "...würde nicht zusammenpassende Kleidung in der Öffentlichkeit tragen",
    "...würde Karaoke singen, bis die Stimme weg ist",
    "...würde vor Freunden weinen",
    "...würde mit einem Fremden auf einer Party flirten",
    "...würde beim Reisen seinen Pass vergessen",
    "...würde auf einer Party am längsten bleiben",
    "...würde ein Geheimnis vor Freunden ausplaudern",
    "...würde tanzen versuchen, aber miserabel fehlschlagen",
    "...würde in der Öffentlichkeit stolpern",
    "...würde betrunken über Philosophie sprechen",
    "...würde mit seinen Leistungen prahlen",
    "...würde seltsames Essen auf einer Party versuchen",
    "...würde unnötige Souvenirs beim Reisen kaufen",
    "...würde die Zeit auf einer Party aus den Augen verlieren",
    "...würde eine unangenehme Wahrheit vor Freunden offenbaren",
    "...würde eine Berühmtheit imitieren",
    "...würde seine Kleidung in der Öffentlichkeit umgestülpt tragen",
    "...würde anfangen, betrunken zu singen",
    "...würde einen seltsamen Traum mit Freunden teilen",
    "...würde ein gefährliches Spiel auf einer Party versuchen",
    "...würde sich beim Reisen verlaufen und sein Hotel nicht finden",
    "...würde bis zum Sonnenaufgang feiern",
    "...würde ein peinliches Geheimnis ausplaudern",
    "...würde beim Tanzen kläglich fehlschlagen",
    "...würde in der Öffentlichkeit stolpern und so tun, als wäre es nicht passiert",
    "...würde betrunken Witze erzählen",
    "...würde Freunden sein neues Outfit zeigen",
    "...würde bizarres Essen auf einer Party versuchen",
    "...würde einen seltsamen Traum mit Freunden teilen",
    "...würde ein riskantes Spiel auf einer Party versuchen",
    "...würde bis Sonnenaufgang feiern",
    "...würde versehentlich eine Nachricht an die falsche Person senden",
    "...würde die peinlichsten Fotos auf einer Party machen",
    "...würde sofort nach dem Kennenlernen den Namen vergessen",
    "...würde versehentlich einen alten Beitrag in den sozialen Medien mögen",
    "...würde die schärfste Speise zu seinem Signature-Gericht machen",
    "...würde versehentlich Outfits mit jemandem koordinieren"
];

let usedQuestions = new Set();

document.addEventListener('DOMContentLoaded', () => {
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    nextQuestionBtn.textContent = 'Spiel starten';
    nextQuestionBtn.addEventListener('click', nextQuestion);
});

function nextQuestion() {
    // Change button text to "Next Question" after first click
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    nextQuestionBtn.textContent = 'Nächste Frage';

    // Get a random unused question
    let availableQuestions = questions.filter(q => !usedQuestions.has(q));
    if (availableQuestions.length === 0) {
        usedQuestions.clear();
        availableQuestions = questions;
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const currentQuestion = availableQuestions[randomIndex];
    usedQuestions.add(currentQuestion);

    // Display the question
    document.getElementById('questionText').textContent = 'Wer ist am ehesten ' + currentQuestion;
}
