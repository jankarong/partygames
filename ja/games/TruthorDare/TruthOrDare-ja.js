const gameData = {
    currentType: null,
    currentDifficulty: null,
    questions: {
        soft: {
            truth: [
                "子どものころの変わった夢は？",
                "今いちばん覚えたいことは？",
                "最近いちばん笑った出来事は？",
                "理想の休日の過ごし方は？",
                "一日だけ別の職業になるなら何を選ぶ？",
                "人に自慢できる小さな特技は？",
                "最近ハマっていることは？",
                "学生時代のちょっと恥ずかしい思い出は？",
                "もし透明人間になれたら何をする？",
                "今いちばん行きたい場所は？"
            ],
            dare: [
                "ペンギンの歩き方で部屋を一周する。",
                "次の順番まで変な声で話す。",
                "30秒で即興ダンスをする。",
                "利き手じゃない方で自分の似顔絵を描く。",
                "誰か一人を全力で褒める。",
                "早口言葉を3回言う。",
                "5回その場で回ってポーズを決める。",
                "好きな曲をワンフレーズ歌う。",
                "赤ちゃんの泣きまねを10秒する。",
                "次の順番までロボット口調で話す。"
            ]
        },
        spicy: {
            truth: [
                "初キスで大事だと思うことは？",
                "どんな誘い方をされると弱い？",
                "恋愛で一番ドキッとする瞬間は？",
                "理想のデートの終わり方は？",
                "今までで一番大胆だった恋の行動は？",
                "好きな人にされると弱い仕草は？",
                "内緒にしている恋愛の願望は？",
                "相手に言われたい一言は？",
                "少し危ないけど気になるシチュエーションは？",
                "今の自分に足りない恋のスパイスは？"
            ],
            dare: [
                "気になる人に送るつもりの甘い一言をここで言う。",
                "一番色っぽい視線を5秒だけ向ける。",
                "相手がいるなら合意のうえで10秒見つめ合う。",
                "今夜の理想のデートを小声で話す。",
                "好きな人を褒める一言をドラマっぽく言う。",
                "一番ドキッとするキスのシチュエーションを演じる。",
                "『今ちょっと危ないかも』と思う一言を言う。",
                "手を取る仕草を一番自然にやってみる。",
                "セクシーだと思う香りを答える。",
                "今の気分をフラートっぽい一言で表す。"
            ]
        }
    }
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
        selectedDifficulty.innerHTML = '<span class="badge bg-success">ソフトモード</span>';
        questionText.textContent = '👇 真実か挑戦かを選んでください 👇';
    } else {
        selectedDifficulty.innerHTML = '<span class="badge bg-warning">スパイシーモード</span>';
        questionText.textContent = '👇 大人向けの真実か挑戦かを選んでください 👇';
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
        ? '<span class="badge bg-info">真実</span>'
        : '<span class="badge bg-danger">挑戦</span>';
    selectedType.style.display = 'block';
    nextButton.style.display = 'inline-block';
    resetButton.style.display = 'inline-block';
    choiceButtons.style.display = 'none';
}

function nextQuestion() {
    if (gameData.currentType && gameData.currentDifficulty) {
        const questions = gameData.questions[gameData.currentDifficulty][gameData.currentType];
        questionText.textContent = questions[Math.floor(Math.random() * questions.length)];
    }
}

function backToDifficulty() {
    gameData.currentType = null;
    questionText.textContent = '👇 ゲームモードを選んでください 👇';
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
    questionText.textContent = '👇 ゲームモードを選んでください 👇';
    selectedType.style.display = 'none';
    selectedDifficulty.style.display = 'none';
    nextButton.style.display = 'none';
    resetButton.style.display = 'none';
    backButton.style.display = 'none';
    choiceButtons.style.display = 'none';
    difficultyButtons.style.display = 'flex';
}
