const questions = [
    "...dance on a table at a party",
    "...kiss someone on the first date",
    "...sing loudly in public",
    "...sneak snacks at midnight",
    "...drunk dial an ex",
    "...get lost while traveling",
    "...fall asleep in a movie theater and snore",
    "...post too many selfies on social media",
    "...tell an embarrassing story at a party",
    "...fart in front of friends and blame someone else",
    "...catch the bouquet at a wedding",
    "...try a dangerous dare at a party",
    "...wear mismatched clothes in public",
    "...sing karaoke until they lose their voice",
    "...cry in front of friends",
    "...flirt with a stranger at a party",
    "...forget their passport while traveling",
    "...stay out the latest at a party",
    "...spill a secret in front of friends",
    "...attempt dancing but fail miserably",
    "...trip in public",
    "...start talking about philosophy when drunk",
    "...brag about their achievements",
    "...try weird food at a party",
    "...buy useless souvenirs while traveling",
    "...lose track of time at a party",
    "...reveal an awkward truth in front of friends",
    "...impersonate a celebrity",
    "...wear their clothes inside out in public",
    "...start singing when drunk",
    "...share a weird dream with friends",
    "...try a dangerous game at a party",
    "...get lost and not find their hotel while traveling",
    "...party until sunrise",
    "...spill an embarrassing secret",
    "...attempt dancing but fail hilariously",
    "...trip in public and pretend it didn't happen",
    "...start telling jokes when drunk",
    "...show off their new outfit to friends",
    "...try bizarre food at a party",
    "...share a strange dream with friends",
    "...try a risky game at a party",
    "...party until the sun comes up",
    "...accidentally send a message to the wrong person",
    "...take the most embarrassing photos at a party",
    "...forget someone's name right after meeting them",
    "...accidentally like someone's old social media post",
    "...make the spiciest food their signature dish",
    "...accidentally match outfits with someone else",
    "...create the wildest dance moves at a party"
];

let usedВопросы = new Set();

document.addEventListener('DOMContentLoaded', () => {
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    nextQuestionBtn.textContent = 'Start Game';
    nextQuestionBtn.addEventListener('click', nextQuestion);
});

function nextQuestion() {
    // Change button text to "Дальше Question" after first click
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    nextQuestionBtn.textContent = 'Дальше Question';
    
    // Get a random unused question
    let availableВопросы = questions.filter(q => !usedВопросы.has(q));
    if (availableВопросы.length === 0) {
        usedВопросы.clear();
        availableВопросы = questions;
    }
    
    const randomIndex = Math.floor(Math.random() * availableВопросы.length);
    const currentQuestion = availableВопросы[randomIndex];
    usedВопросы.add(currentQuestion);
    
    // Display the question
    document.getElementById('questionText').textContent = currentQuestion;
}
