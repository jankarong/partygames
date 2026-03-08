const make50 = (base, generator) => {
  const out = [...base];
  let i = 0;
  while (out.length < 50) {
    out.push(generator(i, out.length));
    i += 1;
  }
  return out.slice(0, 50);
};

const softTopics = ["rendez-vous", "week-end", "routine", "voyage", "soir", "matin", "playlist", "photo", "baiser", "balade"];
const romanticTopics = ["anniversaire", "lettre d'amour", "avenir", "maison", "rituel", "promesse", "confiance", "intimite", "projet", "souvenir"];
const spicyTopics = ["flirt", "contact", "rythme", "ambiance", "fantaisie", "regard", "attirance", "communication", "limite", "aftercare"];

const softTruth = make50([
  "Quelle etait ta premiere impression de moi ?",
  "Quelle petite attention de ma part te fait te sentir aime(e) ?",
  "Quel souvenir de nos rendez-vous prefères-tu ?",
  "A quel moment te sens-tu le plus proche de moi ?",
  "Qu'est-ce qu'on fait le mieux en couple ?",
  "Quelle habitude chez moi te parait adorable ?",
  "Quel petit voyage veux-tu faire avec moi cette annee ?",
  "Quel point devons-nous ameliorer ensemble ?",
  "Quelle est ta photo de couple preferee ?",
  "Quel geste tendre de ma part te rassure le plus ?",
  "Quel rituel quotidien devrions-nous garder ?",
  "Quel compliment de moi te reste en tete ?",
  "A quoi ressemble ton rendez-vous ideal petit budget ?",
  "Quel delire interne veux-tu garder pour toujours ?",
  "Dans quelle situation sommes-nous une super equipe ?",
  "Que devrions-nous faire plus souvent le week-end ?",
  "Quelle tenue de moi te plait le plus ?",
  "Quelle activite calme a deux te detend le plus ?",
  "Quelle partie de notre routine te rend heureux(se) ?",
  "De quoi veux-tu me remercier cette semaine ?"
], (i) => `Quelle idee autour de ${softTopics[i % softTopics.length]} correspond le mieux a notre couple en ce moment ?`);

const softDare = make50([
  "Fais un calin sincere de 20 secondes a ton/ta partenaire.",
  "Donne 3 compliments precis.",
  "Rejouez votre premier rendez-vous en 30 secondes.",
  "Tenez-vous la main et regardez-vous 30 secondes.",
  "Envoie un message doux a ton/ta partenaire maintenant.",
  "Dansez ensemble sur une chanson complete.",
  "Fais 1 minute de massage des epaules.",
  "Prenez un selfie de couple maintenant.",
  "Dis 5 choses pour lesquelles tu es reconnaissant(e).",
  "Planifiez votre prochain rendez-vous en 1 minute.",
  "Chuchote une chose que tu apprecies chez ton/ta partenaire.",
  "Inventez un signe secret de couple.",
  "Chantez ensemble un refrain romantique.",
  "Faites 10 squats synchronises.",
  "Donnez vos 5 rendez-vous preferes chacun votre tour.",
  "Faites un calin silencieux de 45 secondes.",
  "Faites un mini toast a votre relation.",
  "Fixez un mini rendez-vous sans telephone cette semaine.",
  "Terminez la phrase tous les deux : Je te choisis parce que...",
  "Marchez main dans la main 20 secondes."
], (i) => `Faites une mini-challenge de 20 secondes sur le theme ${softTopics[i % softTopics.length]}.`);

const romanticTruth = make50([
  "Quand as-tu compris que tu voulais du serieux avec moi ?",
  "Quelle attention romantique de ma part ne te lasse jamais ?",
  "Quel souvenir de nous ressemble a une scene de film ?",
  "Quel rendez-vous de reve veux-tu vivre avec moi ?",
  "Qu'est-ce que notre relation t'a appris sur l'amour ?",
  "Comment je rends tes journees difficiles plus douces ?",
  "Quelle promesse entre nous est la plus importante ?",
  "Quel prochain cap veux-tu franchir avec moi ?",
  "Quelle chanson devrait etre notre chanson officielle ?",
  "Quel trait chez moi te fait te sentir en securite ?",
  "Quelle tradition romantique veux-tu creer avec moi ?",
  "Qu'est-ce qui te manque le plus quand on est loin ?",
  "Quel mot decrit le mieux notre histoire d'amour ?",
  "Que signifie l'intimite emotionnelle pour toi entre nous ?",
  "Quel petit geste de moi illumine ta journee ?",
  "Comment garder la romance forte sur le long terme ?",
  "Quelle partie de notre histoire racontes-tu avec plaisir ?",
  "Quand es-tu retombe(e) amoureux(se) de moi recemment ?",
  "Que doit-on proteger absolument pendant nos date nights ?",
  "Quelle image de notre futur te fait le plus rever ?"
], (i) => `Quelle vision autour de ${romanticTopics[i % romanticTopics.length]} te semble la plus juste pour nous ?`);

const romanticDare = make50([
  "Ecris deux lignes romantiques et lis-les a voix haute.",
  "Fais un bisou sur le front pendant 5 secondes.",
  "Decris ton/ta partenaire comme dans une lettre d'amour.",
  "Tenez-vous la main et donnez 5 raisons de votre choix mutuel.",
  "30 secondes de regard sans parler.",
  "Planifiez un mini rendez-vous pour ce soir.",
  "Reproduisez votre pose de photo de couple preferee.",
  "Donne 1 gratitude et 1 souhait pour votre relation.",
  "Fais 1 minute de massage des mains.",
  "Parle uniquement en compliments pendant un tour.",
  "Fredonne une ligne d'une chanson romantique.",
  "Dansez lentement 30 secondes sans musique.",
  "Inventez une devise de couple privee.",
  "Dis 3 fois : Je t'apprecie parce que...",
  "Partage un plan romantique pour ce mois-ci.",
  "Prenez une photo intitulee Notre prochain chapitre.",
  "Dites chacun un merci du coeur en une phrase.",
  "Partage un souvenir qui te donne encore des papillons.",
  "Promets une attention tendre pour demain.",
  "Finissez le tour avec un bisou consenti."
], (i) => `Faites une action romantique de 20 secondes sur ${romanticTopics[i % romanticTopics.length]}.`);

const spicyTruth = make50([
  "Quelle fantaisie ne m'as-tu pas encore confiee ?",
  "Comment aimes-tu que je te drague ?",
  "Qu'est-ce que je fais qui t'allume instantanement ?",
  "Quelle nouveaute intime veux-tu essayer avec moi ?",
  "Quelle tenue de moi te parait la plus attirante ?",
  "Qu'aimerais-tu vivre plus souvent dans notre intimite ?",
  "Quel toucher de ma part te detend et t'excite a la fois ?",
  "Quel type de baiser preferes-tu ?",
  "Qu'aimerais-tu que j'initie plus souvent ?",
  "Quelle ambiance marche le mieux pour toi ?",
  "Quelle limite intime est essentielle pour toi ?",
  "Quel aftercare te fait le plus de bien ?",
  "Quels mots de moi te paraissent les plus seduisants ?",
  "Qu'est-ce qu'on doit toujours clarifier avant un moment spicy ?",
  "Quelle idee audacieuse mais safe veux-tu tester ?",
  "Quel compliment de moi te fait te sentir desire(e) ?",
  "Quelle montee en douceur prefères-tu ?",
  "Quelle question intime voulais-tu me poser depuis longtemps ?",
  "Qu'est-ce qui te securise le plus quand on ose davantage ?",
  "Quel element de notre chimie veux-tu absolument garder ?"
], (i) => `Comment gerer ${spicyTopics[i % spicyTopics.length]} pour que ce soit excitant et confortable pour nous deux ?`);

const spicyDare = make50([
  "Chuchote une phrase de flirt confiante pendant 10 secondes.",
  "Fais un baiser lent de 10 secondes (avec consentement).",
  "Dis a voix basse ce que tu aimes sur le corps de ton/ta partenaire.",
  "Faites 20 secondes de regard intense.",
  "Envoie un message flirty pour plus tard ce soir.",
  "Fais 1 minute de massage de la nuque.",
  "Dis une limite et un desir dans la meme phrase.",
  "Decris votre setup de soiree ideale en 20 secondes.",
  "Faites 15 secondes de danse lente tres proche.",
  "Donne une idee sexy pour votre prochain rendez-vous prive.",
  "Faites un check-in securite avec un mot de code.",
  "Pose une question spicy oui/non et reponds honnetement.",
  "Donne un bisou front, joue et main dans cet ordre.",
  "Bougez sensuellement 20 secondes sur une musique.",
  "Termine la phrase : Ce soir, j'ai envie de...",
  "Donne un compliment romantique et un compliment passionne.",
  "Fais un geste viens ici avec un sourire.",
  "Donne 3 mots pour decrire votre alchimie.",
  "Faites une version PG13 de lap dance de 10 secondes (consentie).",
  "Finissez avec un mini challenge spicy et safe."
], (i) => `Faites une action consentie de 20 secondes sur ${spicyTopics[i % spicyTopics.length]}.`);

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
  choose: "👇 Choisissez votre mode couple 👇",
  chooseRound: "👇 Choisissez Verite ou Action 👇",
  chooseRomantic: "👇 Mode romantique : Verite ou Action 👇",
  chooseSpicy: "👇 Mode epice : Verite ou Action 👇",
  softBadge: "Mode doux",
  romanticBadge: "Mode romantique",
  spicyBadge: "Mode epice",
  truthBadge: "Verite",
  dareBadge: "Action"
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
