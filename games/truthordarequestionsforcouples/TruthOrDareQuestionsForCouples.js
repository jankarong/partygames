const gameData = {
    currentType: null,
    currentDifficulty: null,
    questions: {
        soft: {
            truth: [
                "What was your first impression of me?",
                "What small thing I do makes you feel loved?",
                "What is your favorite memory from one of our dates?",
                "What song reminds you of us?",
                "What nickname do you secretly like most from me?",
                "What habit of mine do you find cute?",
                "What is one trip you want us to take this year?",
                "What is one thing you want us to improve as a couple?",
                "When do you feel closest to me?",
                "What is your favorite photo of us and why?",
                "What non-sexual touch from me makes you happiest?",
                "What is one boundary you want me to always respect?",
                "What romantic movie scene feels most like us?",
                "What daily ritual should we start together?",
                "What is one compliment from me you still remember?",
                "What is one insecurity you want me to support you with?",
                "What is your ideal low-budget date night?",
                "What is one thing I do that makes you laugh every time?",
                "What do you think we do best as a team?",
                "What is one future plan you are most excited to do with me?",
                "What food should we learn to cook together?",
                "What tiny gesture from me cheers you up fastest?",
                "What is one thing we should do more on weekends?",
                "What is your favorite way to spend a lazy Sunday with me?",
                "What outfit of mine looks cutest to you?",
                "What is one inside joke you never want us to lose?",
                "What is one thing you learned from me this year?",
                "What time of day do we connect best?",
                "What show should we binge together next?",
                "What game night idea should we try soon?",
                "What habit of ours should we protect no matter what?",
                "What place in our city feels special to us?",
                "What is one thing you admire about how I handle stress?",
                "What simple date idea feels perfect for us?",
                "What song should be on our couple playlist?",
                "What is one conversation topic you enjoy having with me?",
                "What is one compliment you want to hear more often?",
                "What is one way we can support each other's goals better?",
                "What memory of us always makes you smile immediately?",
                "What is one tradition we should start for birthdays?",
                "What quality in me makes you feel understood?",
                "What is one thing we do better now than when we started dating?",
                "What is one peaceful activity you love doing with me?",
                "What is your favorite thing about our everyday routine?",
                "What is one way we can make weekdays more fun together?",
                "What board game or app game should we challenge each other in?",
                "What was the sweetest surprise I gave you?",
                "What is one way I can help you feel more relaxed?",
                "What is your favorite compliment to give me?",
                "What is one place we should visit for a short date trip?"
            ],
            dare: [
                "Give your partner a genuine 20-second hug.",
                "Share three specific compliments with your partner.",
                "Recreate your first date in 30 seconds like a mini skit.",
                "Hold hands and maintain eye contact for 30 seconds.",
                "Send a sweet text to your partner from across the room.",
                "Do your best impression of your partner (kindly).",
                "Make up a two-line love poem for your partner.",
                "Dance together for one full song.",
                "Give your partner a one-minute shoulder massage.",
                "Take a cute selfie together and save it as a memory.",
                "Say 'thank you' for five things your partner did this week.",
                "Plan your next date in one minute and present it.",
                "Whisper one thing you appreciate about your partner.",
                "Do 10 synchronized squats together.",
                "Act out how you knew you liked your partner.",
                "Let your partner choose your ringtone for one day.",
                "Create a secret hand sign only you two use.",
                "Give your partner a dramatic movie-style compliment.",
                "Draw a heart on paper with your non-dominant hand and sign both names.",
                "Sing the chorus of a love song together.",
                "Take turns naming your top 5 favorite dates together.",
                "Set a timer and cuddle quietly for 45 seconds.",
                "Make a mini toast to your relationship and cheers water.",
                "Tell your partner one reason today felt better with them.",
                "Recreate your best selfie pose from memory.",
                "Give your partner a 30-second hand squeeze and smile.",
                "Do a synchronized spin and bow like ballroom dancers.",
                "Pick a fun couple challenge for this week.",
                "Share a memory and act out the funniest part.",
                "Say your partner's name in three dramatic movie styles.",
                "Write one sweet sentence in your notes app and show it.",
                "Give your partner a pep talk in under 20 seconds.",
                "List three date ideas from cheap to fancy.",
                "Do your best 'first date' introduction to your partner again.",
                "Take a deep breath together and count to five out loud.",
                "Say one thing you appreciate about your partner's friends/family.",
                "Create a 3-step secret handshake now.",
                "Give your partner a playful runway-style compliment.",
                "Choose a song and do 20 seconds of silly dancing together.",
                "Share one couple goal for next month.",
                "Hold pinkies and make one promise for this week.",
                "Draw a tiny heart on your partner's hand (with consent).",
                "Do a mini interview: ask and answer one fun question each.",
                "Pretend to win an award and thank your partner in a speech.",
                "Whisper your favorite memory in one sentence.",
                "Do a cute high-five sequence you invent together.",
                "Take a photo making your best 'we are in love' face.",
                "Set one no-phone mini date for this week.",
                "Say 'I choose you because...' and finish once each.",
                "Do a 20-second slow walk hand-in-hand around the room."
            ]
        },
        romantic: {
            truth: [
                "What made you realize you wanted something serious with me?",
                "What is your favorite little routine we have together?",
                "What is one romantic thing I do that you never get tired of?",
                "Which memory of us feels like a movie scene?",
                "What is one dream date you still want us to do?",
                "What do you think our relationship taught you about love?",
                "What is one way I make your hard days better?",
                "What place should we revisit for a meaningful date?",
                "What promise do you want us to keep as a couple?",
                "What is one future milestone you are excited to share with me?",
                "What song should be our official couple song?",
                "What trait of mine makes you feel safest?",
                "What romantic tradition should we start this year?",
                "What do you miss most when we are apart?",
                "What word best describes our love story?",
                "What is one love note you still remember from me?",
                "What does emotional intimacy mean to you in our relationship?",
                "What do you want us to celebrate more often?",
                "What simple gesture from me makes your day?",
                "What is one way we can keep romance strong long-term?",
                "What smell reminds you of our best moments together?",
                "What is one romantic movie date we should recreate?",
                "What part of our story do you love telling others?",
                "What is one fear about love you healed in this relationship?",
                "What does feeling chosen by me look like to you?",
                "What time together feels most magical for you?",
                "What would our perfect rainy-day date look like?",
                "What is one romantic message you wanted to send but didn't?",
                "What is your favorite way I say 'I love you' without words?",
                "What memory would you frame and keep forever?",
                "What promise between us matters the most to you?",
                "What place should become our forever date spot?",
                "What little tradition should we keep even when busy?",
                "What does your ideal anniversary morning look like?",
                "What is one thing we do that feels deeply intimate emotionally?",
                "What word from me makes you feel closest to me?",
                "What is one romantic risk you are glad we took?",
                "What kind of home vibe do you dream of creating together?",
                "What color or flower reminds you of us?",
                "What is one thing you hope we are still doing in 10 years?",
                "What makes you feel most emotionally safe with me?",
                "What is one trip that would feel like a love story chapter?",
                "What is one moment you fell in love with me again?",
                "What part of date nights should we protect as sacred?",
                "What is one love lesson we taught each other?",
                "What is your favorite kind of kiss from me in public?",
                "What is one romantic compliment you believed most from me?",
                "What song lyric feels like our relationship?",
                "What is one way I can romance you better this month?",
                "What future scene of us plays in your mind the most?"
            ],
            dare: [
                "Write a 2-line romantic note and read it out loud.",
                "Give your partner a slow forehead kiss and hold for 5 seconds.",
                "Tell your partner how you would describe them in a love letter.",
                "Hold hands and list five reasons you chose each other.",
                "Set a 30-second timer and only look into each other's eyes.",
                "Plan a mini at-home date for tonight in one minute.",
                "Recreate your favorite couple photo pose.",
                "Share one gratitude and one hope for your relationship.",
                "Give your partner a soft hand massage for one minute.",
                "Speak in compliments only for the next round.",
                "Describe your perfect anniversary date in detail.",
                "Hum or sing one romantic song line to your partner.",
                "Slow dance together for 30 seconds without music.",
                "Let your partner choose a romantic nickname for this round.",
                "Say 'I appreciate you because...' and finish the sentence three times.",
                "Create a private couple motto in under one minute.",
                "Send a sweet good-night text draft to your partner now.",
                "Hold your partner and take three deep breaths together.",
                "Act out your first 'I like you' moment.",
                "Whisper one romantic plan you want to do this month.",
                "Name one thing your partner did that made you fall harder.",
                "Make a one-minute playlist plan for your next date.",
                "Give a kiss on the hand and say one poetic line.",
                "Write three words that describe your partner best.",
                "Do a gentle cheek-to-cheek hug for 20 seconds.",
                "Say one romantic sentence in your most dramatic voice.",
                "Plan a surprise note you will leave later this week.",
                "Take turns sharing your favorite memory from last month.",
                "Give your partner a seated slow dance for 20 seconds.",
                "Recreate your first hug and pause for a smile.",
                "Share one thing you are proud of in your relationship.",
                "Give your partner a romantic nickname and explain why.",
                "Draw a tiny map of your dream date route together.",
                "Look at your partner and say one heartfelt thank-you.",
                "Take a selfie titled 'our next chapter starts now.'",
                "Describe your partner in one sentence like a book quote.",
                "Do a 20-second 'no words, only smiles' challenge together.",
                "Promise one thoughtful action you will do tomorrow.",
                "Tell your partner one place you want to kiss them (PG-13).",
                "Do a mini wedding-toast style speech for your partner.",
                "Send a saved voice note saying 'I'm lucky to have you.'",
                "Hold hands and imagine your ideal future home for 30 seconds.",
                "Choose one couple value and repeat it together.",
                "Act out your dream proposal or anniversary moment (fun version).",
                "Share a memory that still gives you butterflies.",
                "Compliment your partner's mind, heart, and smile in one go.",
                "Write one date idea each and swap phones to read.",
                "Do a 15-second romantic twirl and bow together.",
                "Say one thing you are excited to experience together soon.",
                "Seal this round with a kiss type chosen by your partner."
            ]
        },
        spicy: {
            truth: [
                "What is one fantasy you have not shared before?",
                "What is your favorite way to be flirted with by me?",
                "What time of day do you feel most romantic with me?",
                "What is one thing I do that instantly turns you on?",
                "What new couple activity would you like us to try soon?",
                "What outfit of mine do you find most attractive?",
                "What is one thing you want more of in our intimacy?",
                "What is your boldest memory of us so far?",
                "What kind of foreplay do you enjoy most?",
                "What is one place (safe/private) you want us to kiss more often?",
                "What compliment about your body do you love hearing from me?",
                "What is one thing you were shy to ask me before?",
                "What does your ideal romantic night at home look like?",
                "What is one way I can make you feel more desired?",
                "What is one no-pressure fantasy we can discuss together?",
                "What is one word that best describes our chemistry?",
                "What is one intimate moment with me you replay in your head?",
                "What do you wish I would initiate more often?",
                "What sensual non-sex activity should we try this month?",
                "What is your favorite type of kiss from me?",
                "What flirt style from me affects you the fastest?",
                "What part of foreplay do you want us to slow down and enjoy more?",
                "What is one new intimate boundary you'd like to discuss calmly?",
                "What tone of voice from me feels most seductive?",
                "What is one bold text you would like to receive from me?",
                "What is one fantasy theme you are curious about exploring safely?",
                "What location at home feels most intimate for us?",
                "What type of touch instantly relaxes and excites you?",
                "What compliment makes you feel most desired by me?",
                "What is one intimate routine we should schedule intentionally?",
                "What is one thing we should ask each other before getting spicy?",
                "What pace do you enjoy most when we are being romantic and bold?",
                "What is one way I can improve aftercare for you?",
                "What kind of teasing do you enjoy and what do you avoid?",
                "What outfit would you love to see me wear on date night?",
                "What is one confident move you want me to initiate more?",
                "What word or phrase from me turns you on most?",
                "What does 'perfect chemistry night' mean to you?",
                "What is one thing we should always communicate before intimacy?",
                "What playful rule should we try for our next spicy night?",
                "What is one bold compliment you want to hear right now?",
                "What scene from a movie would you like to recreate safely?",
                "What is one sensual activity that is underrated for us?",
                "What is one fantasy that is romantic more than explicit?",
                "What kind of build-up makes the moment best for you?",
                "What is one thing you want me to do more confidently?",
                "What is one thing you want less of during spicy moments?",
                "What intimate question have you wanted me to ask you?",
                "What kind of mood-setting works best for you: lights, music, scent?",
                "What is one agreement we should keep to make spicy play feel safer?"
            ],
            dare: [
                "Give your partner your most confident 10-second flirt.",
                "Kiss your partner slowly for 10 seconds.",
                "Whisper your favorite thing about your partner's body.",
                "Do a 20-second lap dance (keep comfort and consent first).",
                "Let your partner choose where to place three soft kisses.",
                "Describe your dream date night in your sexiest voice.",
                "Hold your partner close and breathe in sync for 20 seconds.",
                "Send a flirty text your partner can open later tonight.",
                "Give your partner a one-minute neck massage.",
                "Share one safe word or boundary you want respected always.",
                "Stand nose-to-nose and maintain intense eye contact for 20 seconds.",
                "Tell your partner one spicy thing you want to try this month.",
                "Let your partner ask one spicy yes/no question and answer honestly.",
                "Compliment your partner's style, scent, and smile in one sentence.",
                "Guide your partner in a 15-second slow dance close embrace.",
                "Record a short voice note saying why your partner is irresistible.",
                "Playfully re-enact your first kiss in 20 seconds.",
                "Take turns saying one romantic and one bold desire.",
                "Let your partner pick a pet name and use it for this round.",
                "Give your partner a forehead kiss, cheek kiss, and hand kiss.",
                "Describe a spicy date-night setup in 20 seconds.",
                "Send a playful emoji-only flirt message to your partner.",
                "Do a slow 15-second walk toward your partner with eye contact.",
                "Let your partner choose a flirty compliment and repeat it.",
                "Kiss your partner's shoulder or neck area with consent.",
                "Share one boundary and one bold wish in the same sentence.",
                "Give your partner a one-minute back rub.",
                "Use your best seductive voice to invite your partner on a date.",
                "Do a playful countdown from 5 before one slow kiss.",
                "Let your partner guide your hands for a gentle dance hold.",
                "Take turns giving each other one-word flirt commands (consensual).",
                "Describe your partner in three spicy adjectives.",
                "Hold waist-to-waist and sway for 20 seconds.",
                "Ask one spicy question and answer one spicy question.",
                "Do a mini runway walk and let your partner rate the confidence.",
                "Send a draft text for tonight's after-date plan.",
                "Place three kisses where your partner points (within comfort).",
                "Say one fantasy starter sentence and let partner finish it.",
                "Give your partner a confident 'come here' gesture and smile.",
                "Whisper one bold plan for your next private date.",
                "Do a 10-second lap dance chair move, PG-13 version.",
                "Hold your partner by the hand and pull them into a close twirl.",
                "Take turns with 5-second compliments without repeating words.",
                "Do a sultry slow clap entrance and make partner laugh.",
                "Let your partner pick a song and do 20 seconds of sensual sway.",
                "Share a safe word check-in and then one flirty line.",
                "Give one kiss for romance and one for passion (consensual).",
                "Say your partner's name in a soft whisper and a bold tone.",
                "Finish this line to your partner: 'Tonight I want us to...'.",
                "Seal this round with your partner's chosen spicy-but-safe dare."
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
        selectedDifficulty.innerHTML = '<span class="badge bg-success">Soft Couple Mode</span>';
        questionText.textContent = '👇 Pick Truth or Dare for your couples round 👇';
    } else if (difficulty === 'romantic') {
        selectedDifficulty.innerHTML = '<span class="badge bg-primary">Romantic Mode</span>';
        questionText.textContent = '👇 Pick Truth or Dare for your romantic couples round 👇';
    } else {
        selectedDifficulty.innerHTML = '<span class="badge bg-warning">Spicy Couple Mode</span>';
        questionText.textContent = '👇 Pick Truth or Dare for your spicy couples round 👇';
    }
    selectedDifficulty.style.display = 'block';

    difficultyButtons.style.display = 'none';
    choiceButtons.style.display = 'flex';
    backButton.style.display = 'inline-block';
}

function selectChoice(type) {
    gameData.currentType = type;
    const questions = gameData.questions[gameData.currentDifficulty][type];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

    questionText.textContent = randomQuestion;
    selectedType.innerHTML = type === 'truth'
        ? '<span class="badge bg-info">Truth</span>'
        : '<span class="badge bg-danger">Dare</span>';

    selectedType.style.display = 'block';
    nextButton.style.display = 'inline-block';
    resetButton.style.display = 'inline-block';
    choiceButtons.style.display = 'none';
}

function nextQuestion() {
    if (!gameData.currentType || !gameData.currentDifficulty) return;
    const questions = gameData.questions[gameData.currentDifficulty][gameData.currentType];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    questionText.textContent = randomQuestion;
}

function backToDifficulty() {
    gameData.currentType = null;
    questionText.textContent = '👇 Choose your couples game mode 👇';
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
    questionText.textContent = '👇 Choose your couples game mode 👇';
    selectedType.style.display = 'none';
    selectedDifficulty.style.display = 'none';
    nextButton.style.display = 'none';
    resetButton.style.display = 'none';
    backButton.style.display = 'none';
    choiceButtons.style.display = 'none';
    difficultyButtons.style.display = 'flex';
}
