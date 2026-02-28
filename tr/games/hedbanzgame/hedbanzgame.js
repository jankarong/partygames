// Turkish game words
const WORDS = [
    "Aslan","Kaplan","Fil","Zebra","Maymun","Penguen","Kopek","Kedi","Ayi","Tilki",
    "Tavsan","Papağan","Yilan","Balina","Kelebek","Arı","Orumcek","Kaplumbaga","Timsah","At",
    "Tavuk","Ordek","Karga","Kartal","Balik","Ahtapot","Yengec","Leopar","Kurt","Sincap",
    "Panda","Koala","Kanguru","Geyik","Bufalo","Yunus","Kopekbaligi","Iguana","Kertenkele","Kuzu",
    "Bisiklet","Telefon","Televizyon","Bilgisayar","Kahve Kupasi","Yatak","Kapi","Pencere","Sandalye","Masa",
    "Lamba","Saat","Kitap","Kalem","Sapka","Ayakkabi","Kasik","Bicak","Tabak","Araba",
    "Otobus","Tren","Ucak","Tekne","Ev","Kale","Kopru","Koltuk","Buzdolabi","Firın",
    "Tablet","Laptop","Klavye","Fare","Kulaklik","Kamera","Ayna","Vazo","Tencere","Tava",
    "Cuzdan","Canta","Kemer","Corap","Gomlek","Pantolon","Mont","Elbise","Bot","Yuzuk",
    "Doktor","Ogretmen","Asci","Polis","Itfaiyeci","Pilot","Hemsire","Astronot","Sanatci","Muzisyen",
    "Avukat","Muhendis","Mimar","Elektrikci","Tamirci","Ciftci","Bilim Insani","Dis Hekimi","Veteriner","Fotografci",
    "Oyuncu","Sarkici","Dansci","Gazeteci","Yazar","Ressam","Antrenor","Sporcu","Hakem","Bahcivan",
    "Yuzme","Kosma","Dans","Sarki Soyleme","Yemek Yapma","Okuma","Cizim","Yazma","Uyuma","Yuruyus",
    "Tirmanma","Ziplama","Yoga","Gulme","Aglama","Konusma","Dinleme","Firlatma","Yakalama","Surme",
    "Temizlik","Alisveris","Calisma","Ogrenme","Ogretme","Seyahat","Kesif","Yeme","Ictme","Sorf",
    "Futbol","Basketbol","Tenis","Voleybol","Golf","Boks","Kayak","Paten","Badminton","Hentbol",
    "Gures","Karate","Judo","Taekwondo","Okculuk","Atletizm","Yelken","Kurek","Bisiklet Yarisi","Dalis",
    "Pizza","Hamburger","Sushi","Dondurma","Cikolata","Elma","Muz","Pasta","Makarna","Ekmek",
    "Donut","Kurabiye","Corba","Salata","Domates","Salatalik","Havuc","Patates","Peynir","Sut",
    "Yogurt","Yumurta","Sosis","Pirinç","Fasulye","Mercimek","Badem","Ceviz","Cilek","Karpuz",
    "Ananas","Mango","Hindistan Cevizi","Zeytin","Sogan","Sarımsak","Bal","Recel","Ketcap","Hardal",
    "Turkiye","Fransa","Japonya","Brezilya","Kanada","Almanya","Meksika","Italya","Ispanya","Portekiz",
    "Yunanistan","Rusya","Cin","Guney Kore","Hindistan","Endonezya","Misir","Fas","Nijerya","Isvicre",
    "Mutlu","Uzgun","Kizgin","Saskin","Korkmus","Heyecanli","Karisik","Gururlu","Endiseli","Rahat",
    "Stresli","Iyimser","Kiskanmis","Minnettar","Utancli","Kendinden Emin","Cesur","Kararsiz","Sakin","Tutkulu",
    "Bas","Goz","Burun","Agiz","Dis","Dil","Kulak","Sac","Yuz","Boyun",
    "Omuz","Kol","Dirsek","El","Parmak","Gogus","Sirt","Bel","Bacak","Diz",
    "Ayak","Kalp","Akciger","Deri","Kas","Kemik","Dudak","Cene","Yanak","Bilek",
    "Su","Kahve","Cay","Meyve Suyu","Gazoz","Bira","Sarap","Viski","Vodka","Limonata",
    "Latte","Espresso","Milkshake","Smoothie","Bitki Cayi","Enerji Icecegi","Kombuca","Ayran","Maden Suyu","Kakao",
    "Gunesli","Yagmurlu","Bulutlu","Karlı","Ruzgarli","Firtinali","Sisli","Gokgurultusu","Simsek","Gokkusagi",
    "Deprem","Yanardag","Dolu","Kasirga","Muson","Buz","Ay","Yildiz","Meteor","Kuyruklu Yildiz",
    "Rock","Pop","Rap","Caz","Klasik Muzik","Reggae","Metal","Disco","Tango","Vals",
    "Gitar","Piyano","Davul","Keman","Saksafon","Flut","Konser","Festival","Koro","Orkestra",
    "Okul","Universite","Ogrenci","Sinif","Tahta","Silgi","Defter","Dolap","Koridor","Kutuphane",
    "Fen","Matematik","Tarih","Cografya","Biyoloji","Kimya","Fizik","Edebiyat","Psikoloji","Sosyoloji",
    "Oyuncak","Bebek","Puzzle","Kart Oyunu","Zar","Top","Ucurtma","Kaykay","Scooter","Trambolin",
    "Traktor","Kamyon","Metro","Tramvay","Taksi","Helikopter","Roket","Uzay Gemisi","Kano","Yat",
    "Mutfak","Mikrodalga","Bulastik Makinesi","Kettle","Blender","Tost Makinesi","Duş","Lavabo","Tuvalet","Havlu",
    "Ocak","Supa","Cekmece","Raf","Perde","Hali","Yorgan","Yastik","Kabin","Dolap",
    "Yurumek","Kosmak","Oturmak","Ayakta Durmak","El Sallamak","Alkislamak","Gulumsemek","Kaslarini Catmak","Basini Sallamak","Isaret Etmek",
    "Kirmizi","Mavi","Sari","Yesil","Turuncu","Mor","Pembe","Kahverengi","Siyah","Beyaz",
    "Bir","Iki","Uc","Dort","Bes","Alti","Yedi","Sekiz","Dokuz","On",
    "Daire","Kare","Ucgen","Dikdortgen","Yildiz","Kalp","Kup","Kure","Konik","Silindir",
    "Ocak Ayi","Subat","Mart","Nisan","Mayis","Haziran","Temmuz","Agustos","Eylul","Ekim","Kasim","Aralik",
    "Pazartesi","Sali","Carsamba","Persembe","Cuma","Cumartesi","Pazar",
    "Ilkbahar","Yaz","Sonbahar","Kis"
];

// Game state
let state = {
    players: 2,
    duration: 60,
    currentPlayer: 1,
    scores: {},
    currentWord: null,
    usedWords: [],
    currentScore: 0,
    timeLeft: 60,
    timerInterval: null,
    isPlaying: false
};

// DOM
const setupScreen = document.getElementById('setupScreen');
const readyScreen = document.getElementById('readyScreen');
const gameScreen = document.getElementById('gameScreen');
const resultsScreen = document.getElementById('resultsScreen');
const startBtn = document.getElementById('startBtn');
const readyBtn = document.getElementById('readyBtn');
const correctBtn = document.getElementById('correctBtn');
const skipBtn = document.getElementById('skipBtn');
const playAgainBtn = document.getElementById('playAgainBtn');

// Initialize scores
function initGame() {
    state.players = parseInt(document.getElementById('playerCount').value);
    state.duration = parseInt(document.getElementById('gameDuration').value);
    state.currentPlayer = 1;
    state.scores = {};
    state.usedWords = [];

    for (let i = 1; i <= state.players; i++) {
        state.scores[i] = 0;
    }

    showReadyScreen();
}

// Show ready screen for next player
function showReadyScreen() {
    setupScreen.style.display = 'none';
    gameScreen.style.display = 'none';
    resultsScreen.style.display = 'none';
    readyScreen.style.display = 'block';

    document.getElementById('readyPlayerNum').textContent = state.currentPlayer;
}

// Start a player's turn
function startTurn() {
    state.currentScore = 0;
    state.timeLeft = state.duration;
    state.isPlaying = true;

    readyScreen.style.display = 'none';
    resultsScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    document.getElementById('currentPlayer').textContent = state.currentPlayer;
    document.getElementById('playerScore').textContent = state.currentScore;

    drawWord();
    startTimer();
}

// Draw a random word
function drawWord() {
    if (state.usedWords.length === WORDS.length) {
        state.usedWords = [];
    }

    let word;
    do {
        word = WORDS[Math.floor(Math.random() * WORDS.length)];
    } while (state.usedWords.includes(word));

    state.usedWords.push(word);
    state.currentWord = word;
    document.getElementById('wordDisplay').textContent = word;
}

// Start countdown timer
function startTimer() {
    clearInterval(state.timerInterval);

    state.timerInterval = setInterval(() => {
        state.timeLeft--;
        document.getElementById('timer').textContent = state.timeLeft;

        if (state.timeLeft <= 0) {
            endTurn();
        }
    }, 1000);
}

// Handle correct answer
function handleCorrect() {
    state.currentScore++;
    state.scores[state.currentPlayer]++;
    document.getElementById('playerScore').textContent = state.currentScore;
    drawWord();
}

// Handle skip
function handleSkip() {
    drawWord();
}

// End current player's turn
function endTurn() {
    state.isPlaying = false;
    clearInterval(state.timerInterval);

    if (state.currentPlayer < state.players) {
        state.currentPlayer++;
        showReadyScreen();
    } else {
        showResults();
    }
}

// Show final results
function showResults() {
    gameScreen.style.display = 'none';
    resultsScreen.style.display = 'block';

    let html = '';
    const sorted = Object.entries(state.scores).sort((a, b) => b[1] - a[1]);

    sorted.forEach(([player, score], index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
        html += `<div class="score-row">${medal} Oyuncu ${player}: <strong>${score}</strong> puan</div>`;
    });

    document.getElementById('finalScores').innerHTML = html;
}

// Event listeners
startBtn.addEventListener('click', initGame);
readyBtn.addEventListener('click', startTurn);
correctBtn.addEventListener('click', () => {
    if (state.isPlaying) handleCorrect();
});
skipBtn.addEventListener('click', () => {
    if (state.isPlaying) handleSkip();
});
playAgainBtn.addEventListener('click', () => {
    setupScreen.style.display = 'block';
    gameScreen.style.display = 'none';
    resultsScreen.style.display = 'none';
    readyScreen.style.display = 'none';
});

// Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionButtons = document.querySelectorAll('.accordion-button');

    // Debug: Log accordion elements
    console.log('Accordion buttons found:', accordionButtons.length);
    accordionButtons.forEach((btn, index) => {
        const computedStyle = window.getComputedStyle(btn);
        console.log(`Accordion ${index}:`, {
            title: btn.querySelector('.accordion-title')?.textContent,
            display: computedStyle.display,
            visibility: computedStyle.visibility,
            opacity: computedStyle.opacity,
            zIndex: computedStyle.zIndex,
            position: computedStyle.position,
            pointerEvents: computedStyle.pointerEvents
        });
    });

    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accordionContent = this.nextElementSibling;
            const isActive = this.classList.contains('active');

            // Close all other accordions
            accordionButtons.forEach(otherButton => {
                if (otherButton !== button && otherButton.classList.contains('active')) {
                    otherButton.classList.remove('active');
                    otherButton.nextElementSibling.classList.remove('active');
                }
            });

            // Toggle current accordion
            this.classList.toggle('active');
            accordionContent.classList.toggle('active');

            // Debug: Log state after toggle
            console.log('Accordion clicked:', {
                title: this.querySelector('.accordion-title')?.textContent,
                isNowActive: this.classList.contains('active'),
                contentMaxHeight: window.getComputedStyle(accordionContent).maxHeight
            });
        });
    });
});
