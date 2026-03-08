const make50 = (base, generator) => {
  const out = [...base];
  let i = 0;
  while (out.length < 50) {
    out.push(generator(i, out.length));
    i += 1;
  }
  return out.slice(0, 50);
};

const softTopics = ["Date", "Wochenende", "Alltag", "Urlaub", "Abend", "Morgenroutine", "Playlist", "Foto", "Kuss", "Spaziergang"];
const romanticTopics = ["Jahrestag", "Liebesbrief", "Traumurlaub", "Zukunft", "Zuhause", "Ritual", "Versprechen", "Sicherheitsgefuhl", "Bindung", "Nahe"];
const spicyTopics = ["Flirt", "Beruhrung", "Tempo", "Stimmung", "Fantasie", "Blickkontakt", "Anziehung", "Kommunikation", "Grenze", "Aftercare"];

const softTruth = make50([
  "Was war dein erster Eindruck von mir?",
  "Welche kleine Sache von mir gibt dir sofort das Gefuhl, geliebt zu sein?",
  "Welche gemeinsame Erinnerung macht dich immer wieder glucklich?",
  "Wann fuhlst du dich mir am nachsten?",
  "Was machen wir als Paar besonders gut?",
  "Welche Gewohnheit von mir findest du besonders cute?",
  "Welche kurze Reise willst du dieses Jahr mit mir machen?",
  "Was sollen wir als Paar bewusst verbessern?",
  "Welche unserer Fotos magst du am meisten?",
  "Welche Art von Umarmung von mir tut dir am besten?",
  "Welches gemeinsame Ritual sollten wir beibehalten?",
  "Welche meiner Aussagen hat dir lange gutgetan?",
  "Was ist dein liebstes Low-Budget-Date mit mir?",
  "Welche unserer Insider-Witze willst du nie verlieren?",
  "Wann sind wir fur dich das beste Team?",
  "Was sollen wir an Wochenenden ofter machen?",
  "Welche Outfit-Kombination von mir magst du am meisten?",
  "Welche gemeinsame Aktivitat entspannt dich sofort?",
  "Was ist dein Lieblingsmoment in unserem Alltag?",
  "Wofur willst du mir diese Woche Danke sagen?"
], (i) => `Welche Idee rund um ${softTopics[i % softTopics.length]} passt gerade am besten zu uns als Paar?`);

const softDare = make50([
  "Gib deinem Partner/deiner Partnerin eine ehrliche 20-Sekunden-Umarmung.",
  "Sag 3 konkrete Komplimente.",
  "Spielt euer erstes Date in 30 Sekunden nach.",
  "Haltet 30 Sekunden Handchen und Blickkontakt.",
  "Schick deinem Partner/deiner Partnerin jetzt eine kurze liebe Nachricht.",
  "Tanzt zusammen einen ganzen Song.",
  "Mach eine Minute Schultermassage.",
  "Macht ein neues Paar-Selfie.",
  "Nenne 5 Dinge, fur die du heute dankbar bist.",
  "Plant in 1 Minute euer nachstes Date.",
  "Flustere etwas, das du gerade besonders schatzt.",
  "Erfindet ein geheimes Paar-Handzeichen.",
  "Singt zusammen eine Refrainzeile.",
  "Macht 10 synchrone Kniebeugen.",
  "Nennt abwechselnd eure 5 Lieblingsdates.",
  "Kuschelt 45 Sekunden ohne zu sprechen.",
  "Macht einen kleinen Toast auf eure Beziehung.",
  "Macht heute ein No-Phone-Minidate aus.",
  "Sagt beide den Satz: Ich wahle dich, weil ...",
  "Geht 20 Sekunden Hand in Hand durch den Raum."
], (i) => `Macht jetzt gemeinsam eine 20-Sekunden-Challenge zum Thema ${softTopics[i % softTopics.length]}.`);

const romanticTruth = make50([
  "Wann hast du gemerkt, dass du mit mir etwas Ernstes willst?",
  "Welche romantische Geste von mir vergisst du nie?",
  "Welche Erinnerung von uns fuhlt sich wie Filmszene an?",
  "Welche Traum-Verabredung willst du unbedingt mit mir erleben?",
  "Was hat unsere Beziehung dich uber Liebe gelehrt?",
  "Wie mache ich schwere Tage fur dich leichter?",
  "Welches Versprechen zwischen uns ist dir am wichtigsten?",
  "Welchen Meilenstein willst du als Nachstes mit mir feiern?",
  "Welcher Song sollte unser offizieller Paar-Song sein?",
  "Welche Eigenschaft von mir gibt dir emotionale Sicherheit?",
  "Welche gemeinsame Tradition willst du starten?",
  "Was vermisst du an mir am meisten, wenn wir getrennt sind?",
  "Welches Wort beschreibt unsere Liebesgeschichte am besten?",
  "Was bedeutet emotionale Intimitat fur dich in unserer Beziehung?",
  "Welche kleine Geste macht deinen Tag sofort heller?",
  "Was sollten wir tun, damit unsere Romantik langfristig stark bleibt?",
  "Welche Szene unserer Geschichte erzahlst du besonders gern?",
  "Wann hast du dich zuletzt neu in mich verliebt?",
  "Was soll in Date-Nights fur uns heilig bleiben?",
  "Welche Zukunftsszene von uns siehst du oft vor dir?"
], (i) => `Welche Vorstellung zu ${romanticTopics[i % romanticTopics.length]} fuhlt sich fur unsere Beziehung am stimmigsten an?`);

const romanticDare = make50([
  "Schreib zwei romantische Zeilen und lies sie laut vor.",
  "Gib einen langsamen Stirnkuss fur 5 Sekunden.",
  "Beschreibe deinen Partner/deine Partnerin wie in einem Liebesbrief.",
  "Haltet Handchen und nennt 5 Grunde, warum ihr euch wahltt.",
  "30 Sekunden nur Blickkontakt, keine Worte.",
  "Plant jetzt ein Mini-Date fur heute Abend.",
  "Macht eure Lieblingspose von einem Paarfoto nach.",
  "Sag 1 Dankbarkeit und 1 Wunsch fur eure Beziehung.",
  "Gib eine Minute Handmassage.",
  "Sprich eine Runde lang nur in Komplimenten.",
  "Summ eine romantische Liedzeile.",
  "Tanze 30 Sekunden langsam ohne Musik.",
  "Erfindet ein privates Paar-Motto.",
  "Nenne 3 Mal: Ich schatze dich, weil ...",
  "Nenne einen romantischen Plan fur diesen Monat.",
  "Macht ein Foto mit dem Titel Unser nachstes Kapitel.",
  "Sagt beide ein herzliches Danke in einem Satz.",
  "Teilt eine Erinnerung, die noch Schmetterlinge auslost.",
  "Versprecht je eine liebevolle Tat fur morgen.",
  "Beendet die Runde mit einem einvernehmlichen Kuss."
], (i) => `Macht eine gemeinsame 20-Sekunden-Romantikaufgabe zum Thema ${romanticTopics[i % romanticTopics.length]}.`);

const spicyTruth = make50([
  "Welche Fantasie hast du mir noch nicht erzahlt?",
  "Wie flirte ich am effektivsten mit dir?",
  "Was von mir macht dich sofort an?",
  "Welche neue intime Aktivitat willst du mit mir ausprobieren?",
  "Welches Outfit von mir findest du besonders attraktiv?",
  "Was willst du in unserer Intimitat ofter erleben?",
  "Welche Beruhrung von mir macht dich ruhig und aufgeregt zugleich?",
  "Welche Art von Kuss magst du am meisten?",
  "Was soll ich ofter initiieren?",
  "Welche Stimmung funktioniert fur dich am besten?",
  "Welche Grenze ist dir in intimen Momenten besonders wichtig?",
  "Welche Art Nachsorge tut dir am meisten gut?",
  "Welche Worte von mir fuhlen sich fur dich am verfuhrerischsten an?",
  "Was sollten wir vor spicy Momenten immer kurz klaren?",
  "Welche sichere Idee fur ein mutigeres Date hast du?",
  "Welche meiner Komplimente lassen dich am meisten strahlen?",
  "Welche langsame Annaherung magst du besonders?",
  "Welche intime Frage wolltest du mir lange stellen?",
  "Was gibt dir bei mutigen Momenten am meisten Sicherheit?",
  "Was willst du bei unserer Chemie auf jeden Fall beibehalten?"
], (i) => `Wie sollen wir bei ${spicyTopics[i % spicyTopics.length]} vorgehen, damit es fur uns beide aufregend und sicher bleibt?`);

const spicyDare = make50([
  "Flustere 10 Sekunden lang einen selbstbewussten Flirt-Satz.",
  "Gib einen langsamen Kuss fur 10 Sekunden (einvernehmlich).",
  "Sag leise, was du am Korper deines Partners/deiner Partnerin besonders magst.",
  "Macht 20 Sekunden intensiven Blickkontakt.",
  "Schick eine flirty Nachricht fur spater heute.",
  "Gib eine Minute Nackenmassage.",
  "Sag eine Grenze und einen Wunsch in einem Satz.",
  "Beschreibe euer ideales Date-Night-Setup in 20 Sekunden.",
  "Macht einen langsamen 15-Sekunden-Tanz in enger Haltung.",
  "Nenne einen kussen Plan fur euer nachstes privates Date.",
  "Macht einen Safety-Check-in mit einem Codewort.",
  "Frag eine spicy Ja/Nein-Frage und antworte ehrlich.",
  "Gib Stirn-, Wangen- und Handkuss nacheinander.",
  "Macht 20 Sekunden sinnliches Schaukeln zu einem Song.",
  "Sag den Satz: Heute Abend mochte ich mit dir ...",
  "Gib ein romantisches und ein leidenschaftliches Kompliment.",
  "Macht eine verspielte Come-here-Geste mit Lacheln.",
  "Nenne drei Worte fur eure Chemie.",
  "Macht einvernehmlich eine 10-Sekunden-PG13-Lapdance-Version.",
  "Beendet die Runde mit einer sicheren, spicy Mini-Challenge."
], (i) => `Macht jetzt eine einvernehmliche 20-Sekunden-Aufgabe zum Thema ${spicyTopics[i % spicyTopics.length]}.`);

const gameData = {
  currentType: null,
  currentDifficulty: null,
  questions: {
    soft: { truth: softTruth, dare: softDare },
    romantic: { truth: romanticTruth, dare: romanticDare },
    spicy: { truth: spicyTruth, dare: spicyDare }
  }
};

const t = {
  choose: "👇 Wahlt euren Paarmodus 👇",
  chooseRound: "👇 Wahlt Wahrheit oder Pflicht 👇",
  chooseRomantic: "👇 Romantischer Modus: Wahrheit oder Pflicht 👇",
  chooseSpicy: "👇 Spicy Modus: Wahrheit oder Pflicht 👇",
  softBadge: "Sanfter Modus",
  romanticBadge: "Romantischer Modus",
  spicyBadge: "Spicy Modus",
  truthBadge: "Wahrheit",
  dareBadge: "Pflicht"
};

const questionText = document.getElementById('questionText');
const nextButton = document.getElementById('nextButton');
const resetButton = document.getElementById('resetButton');
const backButton = document.getElementById('backButton');
const selectedType = document.getElementById('selectedType');
const selectedDifficulty = document.getElementById('selectedDifficulty');
const difficultyButtons = document.getElementById('difficultyButtons');
const choiceButtons = document.getElementById('choiceButtons');

function selectDifficulty(difficulty) {
  gameData.currentDifficulty = difficulty;
  if (difficulty === 'soft') {
    selectedDifficulty.innerHTML = '<span class="badge bg-success">' + t.softBadge + '</span>';
    questionText.textContent = t.chooseRound;
  } else if (difficulty === 'romantic') {
    selectedDifficulty.innerHTML = '<span class="badge bg-primary">' + t.romanticBadge + '</span>';
    questionText.textContent = t.chooseRomantic;
  } else {
    selectedDifficulty.innerHTML = '<span class="badge bg-warning">' + t.spicyBadge + '</span>';
    questionText.textContent = t.chooseSpicy;
  }
  selectedDifficulty.style.display = 'block';
  difficultyButtons.style.display = 'none';
  choiceButtons.style.display = 'flex';
  backButton.style.display = 'inline-block';
}

function selectChoice(type) {
  gameData.currentType = type;
  const questions = gameData.questions[gameData.currentDifficulty][type];
  questionText.textContent = questions[Math.floor(Math.random() * questions.length)];
  selectedType.innerHTML = type === 'truth'
    ? '<span class="badge bg-info">' + t.truthBadge + '</span>'
    : '<span class="badge bg-danger">' + t.dareBadge + '</span>';
  selectedType.style.display = 'block';
  nextButton.style.display = 'inline-block';
  resetButton.style.display = 'inline-block';
  choiceButtons.style.display = 'none';
}

function nextQuestion() {
  if (!gameData.currentType || !gameData.currentDifficulty) return;
  const questions = gameData.questions[gameData.currentDifficulty][gameData.currentType];
  questionText.textContent = questions[Math.floor(Math.random() * questions.length)];
}

function backToDifficulty() {
  gameData.currentType = null;
  questionText.textContent = t.choose;
  selectedType.style.display = 'none';
  nextButton.style.display = 'none';
  resetButton.style.display = 'none';
  backButton.style.display = 'none';
  choiceButtons.style.display = 'none';
  difficultyButtons.style.display = 'flex';
}

function resetGame() {
  gameData.currentType = null;
  gameData.currentDifficulty = null;
  questionText.textContent = t.choose;
  selectedType.style.display = 'none';
  selectedDifficulty.style.display = 'none';
  nextButton.style.display = 'none';
  resetButton.style.display = 'none';
  backButton.style.display = 'none';
  choiceButtons.style.display = 'none';
  difficultyButtons.style.display = 'flex';
}
