const statements = [
    "Never have I ever kissed someone on the first date",
    "Never have I ever had a crush on a friend's partner",
    "Never have I ever sent a text to the wrong person",
    "Never have I ever pretended to be sick to get out of plans",
    "Never have I ever had a one-night stand",
    "Never have I ever lied about my age",
    "Never have I ever had a secret relationship",
    "Never have I ever cheated on a test",
    "Never have I ever been caught in a lie",
    "Never have I ever had a crush on a teacher or boss",
    "Never have I ever gone skinny dipping",
    "Never have I ever had a romantic dream about someone I know",
    "Never have I ever flirted to get a discount or free stuff",
    "Never have I ever had a crush on a friend's ex",
    "Never have I ever snooped through someone else's phone",
    "Never have I ever lied about my relationship status",
    "Never have I ever had a crush on a celebrity",
    "Never have I ever sent a risqué photo",
    "Never have I ever had a crush on a coworker",
    "Never have I ever had a fake social media account",
    "Never have I ever had a crush on a friend's sibling",
    "Never have I ever lied about my job or salary",
    "Never have I ever had a crush on a neighbor",
    "Never have I ever had a crush on a best friend",
    "Never have I ever had a crush on a stranger",
    "Never have I ever had a crush on a celebrity's partner",
    "Never have I ever had a crush on a friend's parent",
    "Never have I ever had a crush on a teacher's assistant",
    "Never have I ever had a crush on a friend's crush",
    "Never have I ever had a crush on a friend's friend",
    "Never have I ever fallen asleep in class",
    "Never have I ever sung in public",
    "Never have I ever pulled an all-nighter",
    "Never have I ever stolen my roommate's food",
    "Never have I ever forgotten an umbrella on a rainy day",
    "Never have I ever skipped class to play video games",
    "Never have I ever fallen asleep during a movie at the theater",
    "Never have I ever worn clothes inside out in public",
    "Never have I ever farted loudly in public",
    "Never have I ever been late to a date",
    "Never have I ever sung in the shower",
    "Never have I ever tripped in public",
    "Never have I ever stayed up all night gaming",
    "Never have I ever spilled coffee on my keyboard",
    "Never have I ever said something embarrassing with my mic still on",
    "Never have I ever made an impulse purchase online",
    "Never have I ever pretended to work out",
    "Never have I ever put trash in the wrong bin",
    "Never have I ever had my phone go off at the worst moment",
    "Never have I ever left important documents in the printer",
    "Never have I ever pretended to be single on social media",
    "Never have I ever faked being sick to skip something",
    "Never have I ever pretended to understand what someone was saying",
    "Never have I ever ruined clothes in the washing machine",
    "Never have I ever missed my stop while sleeping on public transport",
    "Never have I ever mixed up important dates",
    "Never have I ever called someone by the wrong name"
];

let usedStatements = [];

document.addEventListener('DOMContentLoaded', () => {
    const statementElement = document.getElementById('statement');
    const nextButton = document.getElementById('nextBtn');
    const resetButton = document.getElementById('resetBtn');

    function getRandomStatement() {
        if (statements.length === usedStatements.length) {
            return 'Game Over! Click Reset to play again.';
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
        if (nextButton.textContent === 'Start') {
            nextButton.textContent = 'Дальше';
        }
        if (usedStatements.length === statements.length) {
            nextButton.disabled = true;
        }
    });
});
