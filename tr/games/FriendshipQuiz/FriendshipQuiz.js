const questions = [
    {
        question: "Eğer TA piyangoyu kazansaydı, yapacağı ilk şey ne olurdu?",
        options: ["Dünyayı gezmek", "Yatırım yapmak/Biriktirmek", "Çılgınca alışveriş", "İşi/Okulu bırakmak"]
    },
    {
        question: "TA'nın stres atmak için en sevdiği yol nedir?",
        options: ["Büyük bir yemek yemek", "Bütün gün uyumak", "Biriyle dertleşmek", "Oyun oynamak veya yalnız kalmak"]
    },
    {
        question: "Sizce TA'nın en büyük korkusu nedir?",
        options: ["Böcekler veya haşereler", "Tamamen yalnız kalmak", "Parasız kalmak", "Yanlış anlaşılmak"]
    },
    {
        question: "Siz ve TA bir günlüğüne vücut değiştirseydiniz, o ilk ne yapardı?",
        options: ["Telefonunuzu/Özelinizi kontrol etmek", "Bütün paranızı harcamak", "Sizin yerinize birine itiraf etmek", "Sosyal hayatınızı mahvetmek"]
    },
    {
        question: "TA'ya göre mükemmel bir hafta sonu nedir?",
        options: ["Açık havada macera", "Karanlık çökene kadar koltukta uzanmak", "Arkadaşlar ile yemek", "Bir hobiye gömülmek"]
    },
    {
        question: "TA en çok hangi emoji stilini kullanır?",
        options: ["Havalı ve Şık", "Tatlı ve Şirin", "Sarkastik/Alaycı", "Komik/Mizah amaçlı"]
    },
    {
        question: "TA hangi yiyeceğe kesinlikle katlanamaz?",
        options: ["Tuhaf kokulu otlar (kişniş vb.)", "İnanılmaz acı yiyecekler", "Yağlı et", "Tatsız tuzsuz sebze yemekleri"]
    },
    {
        question: "Eğer TA'nın bir süper gücü olsaydı, hangisini isterdi?",
        options: ["Işınlanma", "Zihin okuma", "Görünmezlik", "Ölümsüzlük"]
    },
    {
        question: "Karaoke'de TA'nın rolü genellikle nedir?",
        options: ["Yıldız (Mikrofonu bırakmaz)", "Gaz veren (Alkış tutar)", "Yiyici (Sadece yemekle ilgilenir)", "Sessiz gözlemci"]
    },
    {
        question: "TA'nın para biriktirmesinin temel motivasyonu nedir?",
        options: ["Gadget veya kıyafet almak", "Finansal güvenlik", "Sevdikleriyle seyahat etmek", "Para biriktirmez"]
    },
    {
        question: "TA geç kaldığında en sık kullandığı bahane nedir?",
        options: ["'Yoldayım' (Daha yeni çıktı)", "'Alarm çalmadı'", "'Trafik çok kötüydü'", "TA asla geç kalmaz"]
    },
    {
        question: "TA'nın en sevdiği sosyal medya platformu hangisidir?",
        options: ["Instagram/Stories", "TikTok/Reels", "Reddit/YouTube", "Twitter/X (Gossip)"]
    },
    {
        question: "Sizce TA'nın en çekici özelliği nedir?",
        options: ["Görünüşü veya fiziği", "Esprileri veya altın kalbi", "Yüksek duygusal zekası", "Kararlılığı veya bilgeliği"]
    },
    {
        question: "TA hangi ekstrem sporu denemek isterdi?",
        options: ["Paraşütle atlama", "Bungee jumping", "Tüplü dalış", "Patrona kötü bir espri yapmak"]
    },
    {
        question: "Issız bir adaya düşseydi, TA yanına kimi alırdı?",
        options: ["SENİ (Tabii ki!)", "Bear Grylls (hayatta kalmak için)", "Sevgilisini veya flörtünü", "Dünyaca ünlü bir şefi"]
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
        document.querySelector('#start-screen h1').innerText = targetFriend + "'ı ne kadar iyi tanıyorsun?";
        document.querySelector('#start-screen p.lead').innerHTML = `${targetFriend} sana meydan okudu!<br>%100 yapabilir misin? Haydi öğrenelim.`;
        friendInput.placeholder = "Adınızı girin";
    } else {
        mode = "create";
        document.querySelector('#start-screen h1').innerText = "Arkadaşlık Testi";
        document.querySelector('#start-screen p.lead').innerHTML = "Kendin hakkında bu 15 soruyu yanıtla,<br>sonra kimin seni daha iyi tanıdığını görmek için bağlantıyı paylaş!";
        friendInput.placeholder = "Adınızı girin";
    }
}

startBtn.addEventListener('click', () => {
    const name = friendInput.value.trim();
    if (!name) { alert("Lütfen bir isim girin!"); return; }
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
    if (mode === "create") displayText = displayText.replace('TA', 'kendin');
    else displayText = displayText.replace('TA', targetFriend);
    questionText.innerText = displayText;
    optionsContainer.innerHTML = '';
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn pulse-hover';
        btn.innerText = option;
        btn.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(btn);
    });
    progressText.innerText = `Soru ${currentQuestion + 1} / ${questions.length}`;
    progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
}

function selectOption(index) {
    userAnswers.push(index);
    if (currentQuestion < questions.length - 1) { currentQuestion++; showQuestion(); }
    else showResults();
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
            titleEl.innerText = "Test Hazır!";
            const answerString = userAnswers.join('');
            const shareUrl = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(targetFriend)}&ans=${answerString}`;
            percentageEl.innerText = "TAMAM";
            descEl.innerHTML = `Harika, ${targetFriend}! Testin hazır.<br>Aşağıdaki bağlantıyı kopyala ve en iyi arkadaşlarına gönder!`;
            targetFriendSpan.innerText = "KENDİN";
            shareBtn.innerHTML = '<i class="fas fa-copy me-2"></i> Bağlantıyı Kopyala';
            shareBtn.onclick = () => {
                navigator.clipboard.writeText(shareUrl).then(() => { alert("Bağlantı kopyalandı!"); });
            };
            restartBtn.innerText = "Testi Yeniden Yap";
        } else {
            let score = 0;
            userAnswers.forEach((ans, i) => { if (ans === correctAnswers[i]) score++; });
            const finalPercentage = Math.round((score / questions.length) * 100);
            percentageEl.innerText = `${finalPercentage}%`;
            targetFriendSpan.innerText = targetFriend;
            if (finalPercentage === 100) { titleEl.innerText = "Ruh Eşi (%100)"; descEl.innerText = `İnanılmaz! Sen ve ${targetFriend} aynı dalga boyundasınız!`; }
            else if (finalPercentage >= 80) { titleEl.innerText = "Sıkı Dostlar"; descEl.innerText = `Harika! ${targetFriend}'ı çok iyi tanıyorsun.`; }
            else if (finalPercentage >= 50) { titleEl.innerText = "İyi İlişki"; descEl.innerText = `Güçlü bir bağınız var! Hâlâ keşfedecek şeyler mevcut.`; }
            else { titleEl.innerText = "Tanıdık?"; descEl.innerText = `Belki de ${targetFriend} ile daha fazla vakit geçirme zamanın gelmiştir!`; }
            shareBtn.innerHTML = '<i class="fas fa-share-alt me-2"></i> Skoru Paylaş';
            shareBtn.onclick = () => { alert("Paylaşmak için ekran görüntüsü al!"); };
            restartBtn.innerText = "Kendi Testimi Oluştur";
            restartBtn.onclick = () => { window.location.href = window.location.pathname; };
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
