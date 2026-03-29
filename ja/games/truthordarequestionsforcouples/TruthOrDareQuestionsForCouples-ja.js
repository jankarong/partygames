const gameData = {
  currentType: null,
  currentDifficulty: null,
  questions: {
    soft: {
      truth: [
        "初対面のとき、私のどこが一番印象に残った？",
        "二人の思い出で、ふと思い出すだけで笑顔になるものは？",
        "私の小さな癖で好きなところは？",
        "今年、二人でやってみたい小さな目標は？",
        "忙しい日でも『この人でよかった』と思う瞬間は？",
        "一緒にいると落ち着く理由は？",
        "今の私たちに必要なデートってどんな時間？",
        "私からもっとしてほしいことは？",
        "最近いちばん感謝していることは？",
        "二人で続けたい習慣は？"
      ],
      dare: [
        "20秒ぎゅっとハグする。",
        "相手の好きなところを3つ言う。",
        "次のデート案を30秒で決める。",
        "手をつないで10秒見つめ合う。",
        "今夜の感謝を一言で伝える。",
        "一緒に自撮りを1枚撮る。",
        "肩を30秒マッサージする。",
        "二人だけの合図を作る。",
        "相手に似合う言葉を一つ贈る。",
        "明日してあげたいことを宣言する。"
      ]
    },
    romantic: {
      truth: [
        "私たちの関係で一番ロマンチックだと思う瞬間は？",
        "未来の二人にいちばん期待していることは？",
        "『大切にされている』と感じる私の行動は？",
        "二人の記念日にしてみたいことは？",
        "離れているとき、私のどんなところを思い出す？",
        "私たちの物語を一言で表すと？",
        "どんな未来の景色を一緒に見たい？",
        "私から言われると弱い言葉は？",
        "二人にとって守りたい約束は？",
        "最近もう一度好きになった瞬間は？"
      ],
      dare: [
        "短いラブレターを声に出して読む。",
        "おでこに5秒キスする。",
        "『好きな理由』を2つ伝える。",
        "今月叶えたいデートを一つ提案する。",
        "相手の目を見て10秒微笑む。",
        "『これからもよろしく』を自分の言葉で言う。",
        "二人のテーマソング候補を一曲挙げる。",
        "やさしいキスかハグを相手に選んでもらう。",
        "いちばん好きな思い出を一つ話す。",
        "次に一緒に食べたいものを決める。"
      ]
    },
    spicy: {
      truth: [
        "二人きりの時間で一番大事にしたい空気感は？",
        "どんな誘い方をされると一番うれしい？",
        "私の仕草でドキッとするのはどれ？",
        "今まで言っていない密かな願望は？",
        "安心して大胆になれる条件は？",
        "どんな褒め方をされると一気に気分が上がる？",
        "二人の時間で増やしたい要素は？",
        "好きなキスのテンポは？",
        "境界線として大事にしてほしいことは？",
        "終わったあとにされるとうれしいことは？"
      ],
      dare: [
        "耳元で一言だけ甘くささやく。",
        "合意のうえで10秒ゆっくりキスする。",
        "相手の好きな体のパーツを一つ伝える。",
        "15秒だけ見つめ合って笑わずに耐える。",
        "今夜したいことを一つだけ小声で言う。",
        "首や肩を30秒やさしくマッサージする。",
        "『ここが好き』を少し大胆に一つ伝える。",
        "手を引いて近くに呼ぶ仕草をしてみる。",
        "二人だけの合図を少し色っぽくアップデートする。",
        "最後に合意のうえで好きなスキンシップを一つする。"
      ]
    }
  }
};

const t = {
  choose: "👇 カップル向けモードを選んでください 👇",
  chooseRound: "👇 真実か挑戦かを選んでください 👇",
  chooseRomantic: "👇 ロマンチックモード: 真実か挑戦か 👇",
  chooseSpicy: "👇 スパイシーモード: 真実か挑戦か 👇",
  softBadge: "ライト",
  romanticBadge: "ロマンチック",
  spicyBadge: "スパイシー",
  truthBadge: "真実",
  dareBadge: "挑戦"
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
