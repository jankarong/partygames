const questions = [
    {
        question: "もしTAが宝くじで1億円当たったら、まず何をすると思う？",
        options: ["世界一周旅行", "貯金・資産運用", "爆買いを楽しむ", "仕事や学校を辞める"]
    },
    {
        question: "TAの一番のストレス解消法は？",
        options: ["美味しいものを好きなだけ食べる", "一日中寝る", "誰かに話を聞いてもらう", "ゲームや趣味に没頭する"]
    },
    {
        question: "TAが一番恐れているものは何だと思う？",
        options: ["虫や爬虫類", "一人ぼっちになること", "お金がなくなること", "周りに誤解されること"]
    },
    {
        question: "もしあなたとTAの体が一日入れ替わったら、TAは何を最初にすると思う？",
        options: ["スマホの中身をチェックする", "あなたのお金を使い果たす", "あなたの代わりに誰かに告白する", "あなたの人間関係をめちゃくちゃにする"]
    },
    {
        question: "TAにとっての理想の週末は？",
        options: ["アウトドアでアクティブに過ごす", "家で一日中ゴロゴロする", "親友とランチやディナーに行く", "自分の趣味に完全に没頭する"]
    },
    {
        question: "TAがよく使うLINEスタンプの系統は？",
        options: ["お洒落で上品な感じ", "ゆるふわ・可愛い系", "ネタ系・シュール系", "煽り系・攻撃的（冗談で）"]
    },
    {
        question: "TAが絶対に食べられない（苦手な）食べ物は？",
        options: ["パクチーなどのクセの強い野菜", "激辛料理", "脂っこいお肉", "味が薄い精進料理のようなもの"]
    },
    {
        question: "もしTAが超能力を持てるとしたら、どれを選ぶ？",
        options: ["瞬間移動（どこへでも行ける）", "読心術（人の心が読める）", "透明人間（悪いこともできる）", "不老不死"]
    },
    {
        question: "カラオケでのTAの主な役割は？",
        options: ["マイクを離さない「歌姫/歌馬鹿」", "盛り上げ役「タンバリン隊」", "フード担当「食べる専門」", "隅っこでスマホをいじっている"]
    },
    {
        question: "TAが貯金をする主な動機は何だと思う？",
        options: ["欲しい服やガジェットのため", "将来への不安・安心感のため", "大切な人との旅行のため", "貯金なんてしない（宵越しの銭は持たない）"]
    },
    {
        question: "TAが遅刻した時、一番よく使う言い訳は？",
        options: ["「今向かってる」（まだ家出たばかり）", "「目覚ましが鳴らなかった」", "「電車が遅延してた」", "TAは絶対に遅刻しない"]
    },
    {
        question: "TAが一番よく見ているSNSは？",
        options: ["Instagram（キラキラした世界）", "TikTok（ショート動画）", "YouTube/X（情報収集）", "LINE（チャット中心）"]
    },
    {
        question: "あなたが思う、TAの最大の魅力は？",
        options: ["ビジュアル・ルックス", "面白い性格・ユーモア", "気遣い・優しさ", "決断力・知性"]
    },
    {
        question: "TAが一生に一度は挑戦してみたい絶叫体験は？",
        options: ["スカイダイビング", "バンジージャンプ", "スキューバダイビング", "上司の前でスベるギャグを言う"]
    },
    {
        question: "無人島に一つだけ持っていくなら、TAは何を選ぶ？",
        options: ["あなた（もちろん！）", "サバイバルキット", "スマホ（電波なくても）", "高級な枕"]
    }
];

let currentQuestion = 0;
let userAnswers = [];
let targetFriend = "";
let correctAnswers = null;
let mode = "create";

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-game-btn');
const friendInput = document.getElementById('friend-name');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressText = document.getElementById('question-counter');
const progressBar = document.getElementById('quiz-progress');
const targetFriendSpan = document.getElementById('target-friend');
const restartBtn = document.getElementById('restart-btn');
const shareBtn = document.getElementById('share-btn');

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedAns = urlParams.get('ans');
    const creatorName = urlParams.get('name');

    if (encodedAns && creatorName) {
        mode = "guess";
        targetFriend = creatorName;
        correctAnswers = encodedAns.split('').map(Number);
        
        document.querySelector('#start-screen h1').innerText = targetFriend + " さんのことをどれだけ知ってる？";
        document.querySelector('#start-screen p.lead').innerHTML = `${targetFriend} さんから挑戦状が届きました！<br>全問正解を目指して、二人の絆を証明しましょう。`;
        friendInput.placeholder = "あなたのお名前を入力";
    } else {
        mode = "create";
        document.querySelector('#start-screen h1').innerText = "友情クイズ";
        document.querySelector('#start-screen p.lead').innerHTML = "まず、自分に関する15問の質問に答えてください。<br>作成されたリンクを友達に送って、誰が一番あなたを知っているか確かめましょう！";
        friendInput.placeholder = "あなたのお名前を入力";
    }
}

startBtn.addEventListener('click', () => {
    const name = friendInput.value.trim();
    if (!name) {
        alert("名前を入力してください！");
        return;
    }
    
    if (mode === "create") targetFriend = name;
    
    startScreen.classList.remove('active');
    setTimeout(() => {
        startScreen.classList.add('d-none');
        quizScreen.classList.remove('d-none');
        quizScreen.classList.add('active');
        currentQuestion = 0;
        userAnswers = [];
        showQuestion();
    }, 400);
});

function showQuestion() {
    const q = questions[currentQuestion];
    let displayText = q.question;
    
    if (mode === "create") {
        displayText = displayText.replace('TA', 'あなた');
    } else {
        displayText = displayText.replace('TA', targetFriend);
    }
    
    questionText.innerText = displayText;
    optionsContainer.innerHTML = '';
    
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn pulse-hover';
        btn.innerText = option;
        btn.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(btn);
    });

    progressText.innerText = `第 ${currentQuestion + 1} 問 / ${questions.length}`;
    progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
}

function selectOption(index) {
    userAnswers.push(index);
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.classList.remove('active');
    setTimeout(() => {
        quizScreen.classList.add('d-none');
        resultScreen.classList.remove('d-none');
        resultScreen.classList.add('active');
        
        const titleEl = document.getElementById('result-title');
        const descEl = document.getElementById('result-description');
        const percentageEl = document.getElementById('result-percentage');
        
        if (mode === "create") {
            titleEl.innerText = "クイズが完成しました！";
            const answerString = userAnswers.join('');
            const shareUrl = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(targetFriend)}&ans=${answerString}`;
            
            percentageEl.innerText = "DONE";
            percentageEl.style.fontSize = "1.5rem";
            
            descEl.innerHTML = `${targetFriend} さん、クイズの準備ができました！<br>下のボタンでリンクをコピーして、LINEやSNSで友達に送りましょう。`;
            targetFriendSpan.innerText = "あなた自身";
            
            shareBtn.innerHTML = '<i class="fas fa-copy me-2"></i> リンクをコピー';
            shareBtn.onclick = () => {
                navigator.clipboard.writeText(shareUrl).then(() => {
                    alert("リンクをコピーしました！友達に送ってください。");
                });
            };
            
            restartBtn.innerText = "作り直す";
        } else {
            let score = 0;
            userAnswers.forEach((ans, i) => {
                if (ans === correctAnswers[i]) score++;
            });
            
            const finalPercentage = Math.round((score / questions.length) * 100);
            percentageEl.innerText = `${finalPercentage}%`;
            
            targetFriendSpan.innerText = targetFriend;
            
            if (finalPercentage === 100) {
                titleEl.innerText = "ソウルメイト (100%)";
                descEl.innerText = `信じられない！あなたと ${targetFriend} さんは完璧にシンクロしていますね。`;
            } else if (finalPercentage >= 80) {
                titleEl.innerText = "大親友";
                descEl.innerText = `素晴らしい！ ${targetFriend} さんのことを本当によく理解していますね。`;
            } else if (finalPercentage >= 50) {
                titleEl.innerText = "良き友";
                descEl.innerText = `二人の絆は確かです！もっと会話を深めれば100%も夢じゃありません。`;
            } else {
                titleEl.innerText = "これからに期待";
                descEl.innerText = `もっと ${targetFriend} さんの意外な一面を探ってみるのも楽しそうですね！`;
            }
            
            shareBtn.innerHTML = '<i class="fas fa-share-alt me-2"></i> スコアをシェア';
            shareBtn.onclick = () => {
                 if (navigator.share) {
                    navigator.share({
                        title: '親友クイズの結果',
                        text: `${targetFriend} さんのことを ${finalPercentage}% 理解していました！あなたも挑戦してみる？`,
                        url: window.location.href
                    });
                } else {
                    alert("スクリーンショットを撮ってシェアしましょう！");
                }
            };
            
            restartBtn.innerText = "自分もクイズを作る";
            restartBtn.onclick = () => {
                window.location.href = window.location.pathname;
            };
        }
    }, 400);
}

init();

restartBtn.addEventListener('click', () => {
    if (mode === "guess") return;
    resultScreen.classList.remove('active');
    setTimeout(() => {
        resultScreen.classList.add('d-none');
        startScreen.classList.remove('d-none');
        startScreen.classList.add('active');
        friendInput.value = '';
    }, 400);
});
