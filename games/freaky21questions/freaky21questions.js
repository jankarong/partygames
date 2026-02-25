const questions21 = [
    { mode: "Warm-up", text: "What is one thing you find instantly attractive but rarely admit out loud?" },
    { mode: "Warm-up", text: "What is your ideal late-night vibe with your crush or partner?" },
    { mode: "Warm-up", text: "What is a compliment that would make you blush immediately?" },
    { mode: "Warm-up", text: "What song would you play to set the mood?" },
    { mode: "Warm-up", text: "What is your favorite kind of physical affection?" },
    { mode: "Spicy", text: "What is one flirty move you wish someone would do to you tonight?" },
    { mode: "Spicy", text: "What is your boldest turn-on that still feels playful?" },
    { mode: "Spicy", text: "Would you rather start with teasing words or slow eye contact?" },
    { mode: "Spicy", text: "What is a place you have fantasized about making out in?" },
    { mode: "Spicy", text: "What is a soft boundary you want your partner to know before things get intense?" },
    { mode: "Freaky", text: "What is one secret fantasy you have not shared with most people?" },
    { mode: "Freaky", text: "If you were in charge tonight, what would step one be?" },
    { mode: "Freaky", text: "What kind of dirty talk feels hottest to you: direct, playful, or romantic?" },
    { mode: "Freaky", text: "What type of touch makes you lose focus the fastest?" },
    { mode: "Freaky", text: "What is one roleplay vibe you would actually try?" },
    { mode: "Freaky", text: "Would you rather have a slow tease night or a high-energy night?" },
    { mode: "Freaky", text: "What is your favorite way to be surprised in a private moment?" },
    { mode: "Freaky", text: "What outfit instantly raises your attraction level?" },
    { mode: "Freaky", text: "What is one thing you want more of during intimacy?" },
    { mode: "Freaky", text: "If your partner asked for one daring request right now, what would you hope it is?" },
    { mode: "Freaky", text: "After this 21 questions game freaky round, what should happen next?" }
];

let currentIndex = 0;

function renderQuestion() {
    const q = questions21[currentIndex];
    document.getElementById("questionNumber").textContent = `Question ${currentIndex + 1} of 21`;
    document.getElementById("questionText").textContent = q.text;
    document.getElementById("questionMode").textContent = q.mode;
}

function nextQuestion() {
    currentIndex = (currentIndex + 1) % questions21.length;
    renderQuestion();
}

function previousQuestion() {
    currentIndex = (currentIndex - 1 + questions21.length) % questions21.length;
    renderQuestion();
}

function randomQuestion() {
    currentIndex = Math.floor(Math.random() * questions21.length);
    renderQuestion();
}

document.addEventListener("DOMContentLoaded", () => {
    renderQuestion();
    document.getElementById("nextBtn").addEventListener("click", nextQuestion);
    document.getElementById("prevBtn").addEventListener("click", previousQuestion);
    document.getElementById("randomBtn").addEventListener("click", randomQuestion);
});
