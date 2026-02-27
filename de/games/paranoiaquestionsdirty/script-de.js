const dirtyParanoiaQuestions = [
  { mode: "Warm-up", text: "Wer in dieser Runde wirkt am flirtigsten, ohne es zuzugeben?" },
  { mode: "Warm-up", text: "Wer schreibt am ehesten nachts die erste riskante Nachricht?" },
  { mode: "Warm-up", text: "Wer wirkt ruhig, ist aber heimlich am mutigsten?" },
  { mode: "Warm-up", text: "Wer wäre der gefährlichste Crush in dieser Gruppe?" },
  { mode: "Warm-up", text: "Wer wird am schnellsten rot, wenn es persönlich wird?" },
  { mode: "Dirty", text: "Wer redet öffentlich brav, ist privat aber sehr direkt?" },
  { mode: "Dirty", text: "Wer würde am ehesten eine sehr gewagte Sprachnachricht senden?" },
  { mode: "Dirty", text: "Wer hätte am ehesten Lust auf Rollenspiel?" },
  { mode: "Dirty", text: "Wer macht aus einem normalen Date eine wilde Nacht?" },
  { mode: "Dirty", text: "Wer hat im Privaten die stärkste Präsenz?" },
  { mode: "Dirty", text: "Wer erhöht die Spannung absichtlich mit einer Extra-Frage?" },
  { mode: "Dirty", text: "Wer hat wahrscheinlich die heißeste geheime Erinnerung?" },
  { mode: "Dirty", text: "Wer kann nur mit Blickkontakt alle nervös machen?" },
  { mode: "Dirty", text: "Wer wirkt leise, ist aber in Wahrheit der mutigste?" },
  { mode: "Dirty", text: "Wer plant am ehesten den unvergesslichsten Abend?" },
  { mode: "Chaos", text: "Wer bricht am ehesten zuerst eure Gruppenregeln?" },
  { mode: "Chaos", text: "Wer könnte gleichzeitig zwei Leute verrückt machen?" },
  { mode: "Chaos", text: "Wer verschwindet eine Woche und kommt dann extra flirtig zurück?" },
  { mode: "Chaos", text: "Wer verplappert am ehesten ein Geheimnis?" },
  { mode: "Chaos", text: "Wer sagt „egal“, meint aber das Gegenteil?" },
  { mode: "Chaos", text: "Wer ist nachts am schwersten zu widerstehen?" },
  { mode: "Chaos", text: "Wer macht aus diesem Spiel am ehesten eine echte Story?" },
  { mode: "Chaos", text: "Wer bringt mit einer Nachricht die ganze Runde durcheinander?" },
  { mode: "Chaos", text: "Wer wird heute Abend zur größten Versuchung?" },
  { mode: "Chaos", text: "Wer sagt „nur ein Drink“ und startet dann Chaos?" },
  { mode: "Warm-up", text: "Wer hat das beste Pokerface in peinlichen Situationen?" },
  { mode: "Warm-up", text: "Wer lässt sich am leichtesten von der Gruppe hochschaukeln?" },
  { mode: "Warm-up", text: "Wer verrät am ehesten unbeabsichtigt seinen Crush?" },
  { mode: "Warm-up", text: "Wer macht aus einem Witz schnell echte Spannung?" },
  { mode: "Warm-up", text: "Wer hält die Runde am besten zusammen?" },
  { mode: "Dirty", text: "Wer hat vermutlich die größte Überraschungsseite?" },
  { mode: "Dirty", text: "Wer macht am ehesten den ersten Schritt?" },
  { mode: "Dirty", text: "Wer wird eifersüchtig, versteckt es aber perfekt?" },
  { mode: "Dirty", text: "Wer bricht am ehesten die eigenen Dating-Regeln?" },
  { mode: "Dirty", text: "Wer hat den stärksten Blick in der Runde?" },
  { mode: "Dirty", text: "Wer verliebt sich am ehesten in die falsche Person?" },
  { mode: "Dirty", text: "Wer startet auf Partys am ehesten den Flirt?" },
  { mode: "Dirty", text: "Wer kann Geheimnisse am längsten für sich behalten?" },
  { mode: "Dirty", text: "Wer stellt die mutigste Frage von allen?" },
  { mode: "Dirty", text: "Wer flirtet aus Spaß, um Reaktionen zu testen?" },
  { mode: "Chaos", text: "Wer verursacht aus Versehen ein Liebesdreieck?" },
  { mode: "Chaos", text: "Wer verschwindet kurz und kommt mit neuem Drama zurück?" },
  { mode: "Chaos", text: "Wer schreibt um 2 Uhr nachts dem Ex?" },
  { mode: "Chaos", text: "Wer postet aus Versehen etwas zu Privates?" },
  { mode: "Chaos", text: "Wer wird heute der überraschende Star der Runde?" },
  { mode: "Chaos", text: "Wer macht aus dem Spiel eine Beicht-Runde?" },
  { mode: "Chaos", text: "Wer spaltet die Gruppe mit einem einzigen Satz?" },
  { mode: "Chaos", text: "Wer nimmt am Ende die besten Geschichten mit?" },
  { mode: "Chaos", text: "Wer macht aus einem Gerücht sofort ein großes Thema?" },
  { mode: "Chaos", text: "Wer wird am häufigsten von allen gewählt?" }
];

let currentIndex = 0;
function renderQuestion() {
  const q = dirtyParanoiaQuestions[currentIndex];
  document.getElementById("questionNumber").textContent = `Frage ${currentIndex + 1} von ${dirtyParanoiaQuestions.length}`;
  document.getElementById("questionText").textContent = q.text;
  document.getElementById("questionMode").textContent = q.mode;
}
function nextQuestion() { currentIndex = (currentIndex + 1) % dirtyParanoiaQuestions.length; renderQuestion(); }
function previousQuestion() { currentIndex = (currentIndex - 1 + dirtyParanoiaQuestions.length) % dirtyParanoiaQuestions.length; renderQuestion(); }
function randomQuestion() { currentIndex = Math.floor(Math.random() * dirtyParanoiaQuestions.length); renderQuestion(); }
document.addEventListener("DOMContentLoaded", () => {
  renderQuestion();
  document.getElementById("nextBtn").addEventListener("click", nextQuestion);
  document.getElementById("prevBtn").addEventListener("click", previousQuestion);
  document.getElementById("randomBtn").addEventListener("click", randomQuestion);
});
