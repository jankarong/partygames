const make50 = (base, generator) => {
  const out = [...base];
  let i = 0;
  while (out.length < 50) {
    out.push(generator(i, out.length));
    i += 1;
  }
  return out.slice(0, 50);
};

const softTopics = ["encontro", "fim de semana", "rotina", "viagem", "noite", "manha", "playlist", "foto", "beijo", "passeio"];
const romanticTopics = ["aniversario", "carta de amor", "futuro", "casa", "ritual", "promessa", "confianca", "intimidade", "projeto", "memoria"];
const spicyTopics = ["flerte", "toque", "ritmo", "clima", "fantasia", "olhar", "atracao", "comunicacao", "limite", "aftercare"];

const softTruth = make50([
  "Qual foi sua primeira impressao sobre mim?",
  "Que pequeno gesto meu faz voce se sentir amado(a)?",
  "Qual memoria nossa te faz sorrir na hora?",
  "Em que momento voce se sente mais conectado(a) comigo?",
  "No que a gente funciona melhor como casal?",
  "Qual habito meu voce acha mais fofo?",
  "Qual viagem curta voce quer fazer comigo este ano?",
  "O que deveriamos melhorar juntos como casal?",
  "Qual foto nossa e sua favorita?",
  "Qual carinho meu te acalma mais?",
  "Qual ritual diario deveriamos manter?",
  "Qual elogio meu ficou marcado em voce?",
  "Como seria seu date ideal com pouco custo?",
  "Qual piada interna nossa voce nunca quer perder?",
  "Quando voce sente que somos um time forte?",
  "O que deveriamos fazer mais nos fins de semana?",
  "Qual roupa minha voce acha mais bonita?",
  "Qual atividade tranquila a dois te relaxa mais?",
  "Qual parte da nossa rotina voce mais ama?",
  "Por qual coisa desta semana voce quer me agradecer?"
], (i) => `Qual ideia sobre ${softTopics[i % softTopics.length]} combina mais com nosso momento de casal?`);

const softDare = make50([
  "De um abraco sincero de 20 segundos no seu parceiro/sua parceira.",
  "Fale 3 elogios especificos.",
  "Reencenem o primeiro encontro em 30 segundos.",
  "Fiquem de maos dadas e se olhando por 30 segundos.",
  "Envie agora uma mensagem carinhosa.",
  "Dancem juntos uma musica inteira.",
  "Faca 1 minuto de massagem nos ombros.",
  "Tirem uma selfie de casal agora.",
  "Diga 5 coisas pelas quais voce e grato(a) hoje.",
  "Planejem o proximo encontro em 1 minuto.",
  "Sussurre algo que voce admira no parceiro/na parceira.",
  "Criem um gesto secreto de casal.",
  "Cantem juntos um refrão romantico.",
  "Facam 10 agachamentos sincronizados.",
  "Revezem 5 encontros favoritos de voces.",
  "Facam 45 segundos de abraco sem falar.",
  "Facam um mini brinde pela relacao.",
  "Marquem um mini date sem celular nesta semana.",
  "Completem juntos: Eu te escolho porque...",
  "Andem de maos dadas por 20 segundos."
], (i) => `Facam uma mini tarefa de 20 segundos sobre ${softTopics[i % softTopics.length]}.`);

const romanticTruth = make50([
  "Quando voce percebeu que queria algo serio comigo?",
  "Que gesto romantico meu voce nunca enjoa?",
  "Qual memoria nossa parece cena de filme?",
  "Qual encontro dos sonhos voce quer viver comigo?",
  "O que nosso relacionamento te ensinou sobre amor?",
  "Como eu deixo seus dias dificeis mais leves?",
  "Qual promessa entre nos e a mais importante?",
  "Qual proxima conquista voce quer viver comigo?",
  "Qual musica deveria ser nossa musica oficial?",
  "Que qualidade minha te faz sentir seguro(a)?",
  "Que tradicao romantica voce quer criar comigo?",
  "Do que voce mais sente falta quando estamos longe?",
  "Que palavra define melhor nossa historia?",
  "O que intimidade emocional significa para voce entre nos?",
  "Que pequeno gesto meu ilumina seu dia?",
  "Como manter o romantismo forte a longo prazo?",
  "Que parte da nossa historia voce mais gosta de contar?",
  "Quando foi a ultima vez que voce se apaixonou de novo por mim?",
  "O que deve ser sagrado nas nossas noites de encontro?",
  "Que cena do nosso futuro aparece mais na sua mente?"
], (i) => `Qual visao sobre ${romanticTopics[i % romanticTopics.length]} combina mais com o nosso casal?`);

const romanticDare = make50([
  "Escreva duas linhas romanticas e leia em voz alta.",
  "De um beijo na testa por 5 segundos.",
  "Descreva seu parceiro/sua parceira como numa carta de amor.",
  "Deem as maos e falem 5 motivos para escolherem um ao outro.",
  "30 segundos de contato visual sem falar.",
  "Planejem um mini encontro para hoje a noite.",
  "Recriem a pose da foto de casal favorita.",
  "Fale 1 gratidao e 1 desejo para a relacao.",
  "Faca 1 minuto de massagem nas maos.",
  "Fale so em elogios por uma rodada.",
  "Cante/assobie uma linha romantica.",
  "Dancem devagar por 30 segundos sem musica.",
  "Criem um lema privado de casal.",
  "Diga 3 vezes: Eu te valorizo porque...",
  "Compartilhe um plano romantico para este mes.",
  "Tirem uma foto chamada Nosso proximo capitulo.",
  "Digam um obrigado sincero em uma frase.",
  "Compartilhe uma memoria que ainda te da borboletas.",
  "Prometa um gesto carinhoso para amanha.",
  "Terminem a rodada com um beijo consentido."
], (i) => `Facam uma acao romantica de 20 segundos sobre ${romanticTopics[i % romanticTopics.length]}.`);

const spicyTruth = make50([
  "Qual fantasia voce ainda nao me contou?",
  "Como voce mais gosta que eu flerte com voce?",
  "O que eu faco que te acende na hora?",
  "Que novidade intima voce quer testar comigo?",
  "Qual roupa minha voce acha mais atraente?",
  "O que voce quer viver mais na nossa intimidade?",
  "Que toque meu te relaxa e te empolga ao mesmo tempo?",
  "Qual tipo de beijo voce prefere?",
  "O que voce gostaria que eu iniciasse mais vezes?",
  "Que clima funciona melhor para voce?",
  "Qual limite e essencial para voce nos momentos intimos?",
  "Que tipo de aftercare te faz melhor?",
  "Que palavras minhas soam mais sedutoras para voce?",
  "O que sempre devemos alinhar antes de um momento spicy?",
  "Que ideia ousada, mas segura, voce quer tentar?",
  "Qual elogio meu te faz sentir mais desejado(a)?",
  "Que ritmo de aproximacao voce prefere?",
  "Que pergunta intima voce queria me fazer ha tempo?",
  "O que mais te da seguranca quando a gente ousa mais?",
  "Qual parte da nossa quimica voce nao quer perder?"
], (i) => `Como devemos lidar com ${spicyTopics[i % spicyTopics.length]} para ficar excitante e seguro para os dois?`);

const spicyDare = make50([
  "Sussurre uma frase de flerte confiante por 10 segundos.",
  "De um beijo lento de 10 segundos (com consentimento).",
  "Fale baixinho o que voce mais gosta no corpo do parceiro/da parceira.",
  "Fiquem 20 segundos de olhar intenso.",
  "Envie uma mensagem flertando para mais tarde.",
  "Faca 1 minuto de massagem no pescoco.",
  "Diga um limite e um desejo na mesma frase.",
  "Descreva em 20 segundos o setup ideal da noite de voces.",
  "Facam 15 segundos de danca lenta bem juntinhos.",
  "Fale uma ideia sexy para o proximo date privado.",
  "Facam um check-in de seguranca com palavra-codigo.",
  "Faca uma pergunta spicy de sim/nao e responda com honestidade.",
  "De beijo na testa, na bochecha e na mao nessa ordem.",
  "Mexa o corpo de forma sensual por 20 segundos com musica.",
  "Complete: Hoje a noite eu quero com voce...",
  "De um elogio romantico e um elogio apaixonado.",
  "Faca um gesto de vem ca com sorriso.",
  "Diga 3 palavras para definir a quimica de voces.",
  "Facam uma versao PG13 de lap dance por 10 segundos (consentida).",
  "Terminem com um mini desafio spicy e seguro."
], (i) => `Facam agora uma acao consentida de 20 segundos sobre ${spicyTopics[i % spicyTopics.length]}.`);

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
  choose: "👇 Escolha o modo de casal 👇",
  chooseRound: "👇 Escolha Verdade ou Desafio 👇",
  chooseRomantic: "👇 Modo romantico: Verdade ou Desafio 👇",
  chooseSpicy: "👇 Modo picante: Verdade ou Desafio 👇",
  softBadge: "Modo leve",
  romanticBadge: "Modo romantico",
  spicyBadge: "Modo picante",
  truthBadge: "Verdade",
  dareBadge: "Desafio"
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
