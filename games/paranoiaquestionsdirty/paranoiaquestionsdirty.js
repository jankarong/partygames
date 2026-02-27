const dirtyParanoiaQuestions = [
    { mode: "Warm-up", text: "Who in this room gives the most flirty energy without trying?" },
    { mode: "Warm-up", text: "Who here would be the first to start a secret late-night chat?" },
    { mode: "Warm-up", text: "Who probably has the boldest type but pretends to be chill about it?" },
    { mode: "Warm-up", text: "Who in this group would make the most dangerous crush?" },
    { mode: "Warm-up", text: "Who would survive the longest in a no-texting-your-crush challenge?" },
    { mode: "Dirty", text: "Who is most likely to enjoy dirty talk but act innocent in public?" },
    { mode: "Dirty", text: "Who here would most likely send a risky message after midnight?" },
    { mode: "Dirty", text: "Who is most likely to be secretly into roleplay?" },
    { mode: "Dirty", text: "Who would most likely turn a normal date into a wild one?" },
    { mode: "Dirty", text: "Who probably has the highest confidence in private?" },
    { mode: "Dirty", text: "Who here would most likely suggest truth over dare for the chaos?" },
    { mode: "Dirty", text: "Who is most likely to keep a spicy memory no one knows about?" },
    { mode: "Dirty", text: "Who would most likely flirt with only eye contact and win?" },
    { mode: "Dirty", text: "Who in this room looks the quietest but is probably the boldest?" },
    { mode: "Dirty", text: "Who would most likely plan the most unforgettable after-party?" },
    { mode: "Chaos", text: "Who here would be the first to break the group's dating rule?" },
    { mode: "Chaos", text: "Who is most likely to have two people crushing on them at once?" },
    { mode: "Chaos", text: "Who would most likely ghost for a week then come back flirty?" },
    { mode: "Chaos", text: "Who is most likely to kiss and tell?" },
    { mode: "Chaos", text: "Who would most likely pretend not to care but care the most?" },
    { mode: "Chaos", text: "Who here would be hardest to resist on a late-night drive?" },
    { mode: "Chaos", text: "Who would most likely turn paranoia questions dirty into a real story?" },
    { mode: "Chaos", text: "Who is most likely to start drama with one voice note?" },
    { mode: "Chaos", text: "Who would most likely become the group's biggest temptation?" },
    { mode: "Chaos", text: "Who here is most likely to say 'just one drink' and cause chaos?" },
    { mode: "Warm-up", text: "Who would most likely have the best poker face in a flirty moment?" },
    { mode: "Warm-up", text: "Who in this group gets teased the easiest?" },
    { mode: "Warm-up", text: "Who is most likely to accidentally reveal their crush?" },
    { mode: "Warm-up", text: "Who would most likely turn a joke into real tension?" },
    { mode: "Warm-up", text: "Who would most likely stay calm while everyone else panics?" },
    { mode: "Dirty", text: "Who is most likely to have a hidden adventurous side?" },
    { mode: "Dirty", text: "Who would most likely send the boldest first text?" },
    { mode: "Dirty", text: "Who is most likely to get jealous but hide it?" },
    { mode: "Dirty", text: "Who would most likely break their own dating rules?" },
    { mode: "Dirty", text: "Who in this room has the strongest eye-contact game?" },
    { mode: "Dirty", text: "Who is most likely to fall for someone they should not?" },
    { mode: "Dirty", text: "Who would most likely make the first move at a party?" },
    { mode: "Dirty", text: "Who is most likely to keep a spicy secret forever?" },
    { mode: "Dirty", text: "Who would most likely ask the boldest question in truth or dare?" },
    { mode: "Dirty", text: "Who is most likely to flirt just to test reactions?" },
    { mode: "Chaos", text: "Who would most likely cause a love triangle by accident?" },
    { mode: "Chaos", text: "Who is most likely to disappear during a party and come back with tea?" },
    { mode: "Chaos", text: "Who would most likely text an ex for closure at 2 AM?" },
    { mode: "Chaos", text: "Who is most likely to expose a group secret by mistake?" },
    { mode: "Chaos", text: "Who would most likely become everyone's unexpected crush?" },
    { mode: "Chaos", text: "Who is most likely to turn this game into a confession night?" },
    { mode: "Chaos", text: "Who would most likely break the room into teams and start drama?" },
    { mode: "Chaos", text: "Who is most likely to leave the party with the most stories?" },
    { mode: "Chaos", text: "Who would most likely turn one rumor into total chaos?" },
    { mode: "Chaos", text: "Who is most likely to win this paranoia questions dirty round every time?" }
];

let currentIndex = 0;

function renderQuestion() {
    const q = dirtyParanoiaQuestions[currentIndex];
    document.getElementById("questionNumber").textContent = `Question ${currentIndex + 1} of ${dirtyParanoiaQuestions.length}`;
    document.getElementById("questionText").textContent = q.text;
    document.getElementById("questionMode").textContent = q.mode;
}

function nextQuestion() {
    currentIndex = (currentIndex + 1) % dirtyParanoiaQuestions.length;
    renderQuestion();
}

function previousQuestion() {
    currentIndex = (currentIndex - 1 + dirtyParanoiaQuestions.length) % dirtyParanoiaQuestions.length;
    renderQuestion();
}

function randomQuestion() {
    currentIndex = Math.floor(Math.random() * dirtyParanoiaQuestions.length);
    renderQuestion();
}

document.addEventListener("DOMContentLoaded", () => {
    renderQuestion();
    document.getElementById("nextBtn").addEventListener("click", nextQuestion);
    document.getElementById("prevBtn").addEventListener("click", previousQuestion);
    document.getElementById("randomBtn").addEventListener("click", randomQuestion);
});
