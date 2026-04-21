const questions = [
    {
        question: "如果TA中了大奖，TA第一件事会做什么？",
        options: ["环游世界", "存起来理财", "疯狂购物", "辞职/退学"]
    },
    {
        question: "TA最喜欢的解压方式是？",
        options: ["大吃一顿", "蒙头大睡", "找人倾诉", "独自静坐或打游戏"]
    },
    {
        question: "你觉得TA最怕什么？",
        options: ["昆虫/爬虫", "一个人孤单", "没钱花", "被人误解"]
    },
    {
        question: "如果您和TA互换一天身体，TA最可能先做什么？",
        options: ["偷偷看你的隐私", "花光你的钱", "替你去表白", "搞砸你的社交关系"]
    },
    {
        question: "TA心目中的完美周末是？",
        options: ["在户外大汗淋漓", "在被窝躺到天黑", "和死党逛街聚餐", "沉浸在爱好中"]
    },
    {
        question: "TA平时最常发的表情包风格是？",
        options: ["优雅高冷风", "软萌可爱风", "阴阳怪气风", "沙雕有趣风"]
    },
    {
        question: "TA最不能忍受的食物是什么？",
        options: ["香菜/折耳根等怪味", "超级无敌爆炸辣", "太油腻的肥肉", "清淡无味的素菜"]
    },
    {
        question: "如果TA能拥有一种超能力，TA最想要？",
        options: ["瞬移（随时想去哪就去哪）", "读心术（看穿所有人）", "隐身（做点坏事）", "长生不老"]
    },
    {
        question: "在KTV，TA通常是哪种身份？",
        options: ["麦霸，从头唱到尾", "气氛组，专业欢呼鼓掌", "干饭人，专心吃果盘", "角落里的网抑云"]
    },
    {
        question: "TA攒钱的主要动机通常是？",
        options: ["为了买心心念的电子产品/衣服", "为了那虚无缥缈的安全感", "为了带重要的人去旅行", "TA根本不攒钱，月光族"]
    },
    {
        question: "TA约会迟到时，最常用的借口是？",
        options: ["‘我已经在路上了’（其实刚出门）", "‘闹钟没响/睡过头了’", "‘今天路况太差了’", "TA从不迟到，非常守时"]
    },
    {
        question: "TA最喜欢的社交平台是？",
        options: ["朋友圈/空间（分享生活）", "小红书/抖音（看漂亮世界）", "知乎/B站（深度学习/鬼畜）", "微博/豆瓣（吃瓜/吐槽）"]
    },
    {
        question: "你觉得TA最有魅力的地方是？",
        options: ["爆表的颜值/身材", "有趣的灵魂/幽默感", "超高的情商/温柔点", "果断的行动力/智慧"]
    },
    {
        question: "TA最想尝试的极限运动是？",
        options: ["高空跳伞", "蹦极", "深海潜水", "在老板面前讲冷笑话"]
    },
    {
        question: "如果要在荒岛求生，TA只能带一个人，TA会带？",
        options: ["你（当然是你！）", "生存大师贝尔", "TA的暧昧对象/爱人", "一个超好玩的厨师"]
    }
];

let currentQuestion = 0;
let userAnswers = [];
let targetFriend = "";
let correctAnswers = null; // Used in "Guess Mode"
let mode = "create"; // "create" or "guess"

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

// Initialization
function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedAns = urlParams.get('ans');
    const creatorName = urlParams.get('name');

    if (encodedAns && creatorName) {
        mode = "guess";
        targetFriend = creatorName;
        correctAnswers = encodedAns.split('').map(Number);
        
        // Update UI for Guess Mode
        document.querySelector('#start-screen h1').innerText = "挑战谁更了解 " + targetFriend;
        document.querySelector('#start-screen p.lead').innerHTML = `${targetFriend} 向你发起了挑战！<br>看看你对他/她的了解程度，能不能拿到满分？`;
        friendInput.placeholder = "输入你的名字";
    } else {
        mode = "create";
        document.querySelector('#start-screen h1').innerText = "创建你的友谊测试";
        document.querySelector('#start-screen p.lead').innerHTML = "先回答这些问题（关于你自己），<br>生成专属链接发给朋友，看看他们有多了解你！";
        friendInput.placeholder = "输入你的名字";
    }
}

startBtn.addEventListener('click', () => {
    const name = friendInput.value.trim();
    if (!name) {
        alert("请输入名字以开始！");
        return;
    }
    
    if (mode === "create") {
        targetFriend = name; // Creator identity
    }
    
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
        displayText = displayText.replace('TA', '你自己');
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

    progressText.innerText = `问题 ${currentQuestion + 1} / ${questions.length}`;
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
            // Creation Result: Generate Link
            titleEl.innerText = "测试已就绪！";
            const answerString = userAnswers.join('');
            const shareUrl = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(targetFriend)}&ans=${answerString}`;
            
            percentageEl.innerText = "DONE";
            percentageEl.style.fontSize = "1.5rem";
            
            descEl.innerHTML = `好的，${targetFriend}！你的专属测试已生成。<br>点击下方按钮复制链接，发给你的朋友们吧！`;
            targetFriendSpan.innerText = "你自己";
            
            shareBtn.innerHTML = '<i class="fas fa-copy me-2"></i> 复制分享链接';
            shareBtn.onclick = () => {
                navigator.clipboard.writeText(shareUrl).then(() => {
                    alert("链接已复制到剪贴板！快发给朋友吧。");
                });
            };
            
            restartBtn.innerText = "重做一次";
        } else {
            // Guess Result: Show Score
            let score = 0;
            userAnswers.forEach((ans, i) => {
                if (ans === correctAnswers[i]) score++;
            });
            
            const finalPercentage = Math.round((score / questions.length) * 100);
            percentageEl.innerText = `${finalPercentage}%`;
            
            targetFriendSpan.innerText = targetFriend;
            
            if (finalPercentage === 100) {
                titleEl.innerText = "神仙友谊 (100%)";
                descEl.innerText = `天哪！你是${targetFriend}的灵魂伴侣吧？每一个细节你都了如指掌！`;
            } else if (finalPercentage >= 80) {
                titleEl.innerText = "铁杆死党";
                descEl.innerText = `非常了解！你和${targetFriend}的关系一定非常铁。`;
            } else if (finalPercentage >= 50) {
                titleEl.innerText = "默契十足";
                descEl.innerText = `不错的成绩！你对${targetFriend}有基本的了解，但还有提升空间。`;
            } else {
                titleEl.innerText = "塑料友情？";
                descEl.innerText = `看来你还需要多花时间了解${targetFriend}哦，快去找TA谈谈心吧！`;
            }
            
            shareBtn.innerHTML = '<i class="fas fa-share-alt me-2"></i> 分享结果';
            shareBtn.onclick = () => {
                 if (navigator.share) {
                    navigator.share({
                        title: '友谊测试结果',
                        text: `我对${targetFriend}的了解度高达${finalPercentage}%！你也来试试？`,
                        url: window.location.href
                    });
                } else {
                    alert("截图分享你的成绩吧！");
                }
            };
            
            restartBtn.innerText = "我也要创建测试";
            restartBtn.onclick = () => {
                window.location.href = window.location.pathname;
            };
        }
    }, 400);
}

init();

// Handle restart defaults
restartBtn.addEventListener('click', () => {
    if (mode === "guess") return; // Handled by inline onclick
    resultScreen.classList.remove('active');
    setTimeout(() => {
        resultScreen.classList.add('d-none');
        startScreen.classList.remove('d-none');
        startScreen.classList.add('active');
        friendInput.value = '';
    }, 400);
});
