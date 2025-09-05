// Deutsche Version Spieldaten
const gameData = {
    currentType: null,
    currentDifficulty: null,
    questions: {
        soft: {
            truth: [
                // Leichte und lustige Fragen
                "In welches Tier würdest du dich verwandeln wollen?",
                "Was war deine seltsamste Kindheitsfantasie?",
                "Welches ist dein Lieblings-Emoji?",
                "Was würdest du tun, wenn du einen Tag lang unsichtbar wärst?",
                "Welcher ist dein Lieblings-Filmzitat?",
                "Was war das Langweiligste, was du je gemacht hast?",
                "Was ist deine schönste Kindheitserinnerung?",
                "Worauf bist du am meisten stolz?",
                "Wovor hast du am meisten Angst?",
                "Wer ist deine Lieblings-Cartoon-Figur?",
                "Welche Fähigkeit würdest du gerne lernen?",
                "Welche ist deine Lieblingsjahreszeit?",
                "Welche Tageszeit magst du am liebsten?",
                "Welches Haustier hättest du gerne?",
                "Welches ist dein Lieblingswetter?",
                "Welchen Freizeitpark würdest du gerne besuchen?",
                "Was ist dein Lieblings-Snack?",
                "Welchen Beruf würdest du gerne mal ausprobieren?",
                "Welcher ist dein Lieblingsduft?",
                "In welcher Art von Haus würdest du gerne wohnen?",
                
                // Kreative Vorstellungsfragen
                "Welche Superkraft hättest du gerne?",
                "Wenn du durch die Zeit reisen könntest, was würdest du ändern?",
                "Welcher Prominente wärst du gerne für einen Tag?",
                "Wer ist deine Lieblingsfigur aus Filmen oder Serien?",
                "Welches neue Essen würdest du erfinden?",
                "Welches ist dein Lieblingsfeiertag und warum?",
                "In welcher Film- oder Serienwelt würdest du gerne leben?",
                "Wohin würdest du am liebsten reisen?",
                "Wenn du eine Sache auf der Welt ändern könntest, was wäre das?",
                "Welches war dein Lieblingsspiel als Kind?",
                "Welchen neuen Feiertag würdest du erfinden?",
                "Mit welcher historischen Person würdest du gerne sprechen?",
                "Welchen Zaubergegenstand hättest du gerne?",
                "Der Hauptcharakter welches Buches wärst du gerne?",
                "Wie würde dein Traumhaus aussehen?",
                "Welchen Film würdest du gerne drehen?",
                "Was für ein Geschäft würdest du gerne eröffnen?",
                "Welches Spiel würdest du gerne entwickeln?",
                "Was sollte dein Roboter-Assistent können?",
                "Welche neue Sportart würdest du erfinden?",
                
                // Alltägliche Vorlieben
                "Was isst du am liebsten?",
                "Was trinkst du am liebsten?",
                "Welche ist deine Lieblingsfarbe?",
                "Welche Musik hörst du am liebsten?",
                "Welchen Sport machst du gerne?",
                "Welches ist dein Lieblingsbuch?",
                "Welcher ist dein Lieblingsfilm?",
                "Welche ist deine Lieblingsserie?",
                "Welches ist dein Lieblingsspiel?",
                "Welche App benutzt du am häufigsten?",
                "Welches ist dein Lieblingsobst?",
                "Welches ist dein Lieblingsgemüse?",
                "Was ist dein Lieblingsgetränk?",
                "Welcher ist dein Lieblingsnachtisch?",
                "Was ist dein Lieblingsfrühstück?",
                "Was ist dein Lieblingsabendessen?",
                "Welches Fast Food magst du am liebsten?",
                "Welche Eissorte magst du am liebsten?",
                "Welchen Kaffee trinkst du am liebsten?",
                "Welchen Tee magst du am liebsten?",
                
                // Freundliche persönliche Fragen
                "Was magst du am meisten an dir selbst?",
                "Welcher Wunsch würde gerne erfüllt werden?",
                "Wem möchtest du am meisten danken?",
                "Was war das Glücklichste, was du erlebt hast?",
                "Was war das Überraschendste, was dir passiert ist?",
                "Welches Instrument würdest du gerne lernen?",
                "Welche Sprache würdest du gerne beherrschen?",
                "In welches Land würdest du gerne reisen?",
                "Wen würdest du gerne mal treffen?",
                "Welcher Gegenstand ist dir am wertvollsten?",
                "Welcher Geburtstag war dein unvergesslichster?",
                "Wer war dein Lieblingslehrer?",
                "Was macht deinen besten Freund besonders?",
                "Welche Erinnerung würdest du gerne nochmal erleben?",
                "Welche Gewohnheit würdest du gerne ändern?",
                
                // Hobbys und Interessen
                "Welche Outdoor-Aktivität machst du am liebsten?",
                "Was machst du gerne drinnen?",
                "Was sammelst du gerne?",
                "Welches neue Hobby würdest du gerne ausprobieren?",
                "Welche Kunstform gefällt dir am besten?",
                "Welchen Tanz würdest du gerne lernen?",
                "Was bastelst du gerne?",
                "An welcher Veranstaltung würdest du gerne teilnehmen?",
                "Was liest du am liebsten?",
                "Welche Technik würdest du gerne beherrschen?",
                
                // Träume und Ziele
                "Was für ein Mensch möchtest du in 10 Jahren sein?",
                "Welche Herausforderung würdest du gerne meistern?",
                "Welchen Menschen würdest du gerne helfen?",
                "Welches gesellschaftliche Problem würdest du gerne lösen?",
                "Womit möchtest du gerne in Erinnerung bleiben?",
                "Wofür möchtest du gerne bekannt werden?",
                "Was möchtest du gerne bewirken?",
                "Was möchtest du gerne erschaffen?",
                "Welches Weltproblem würdest du gerne ändern?",
                "Welchen gesellschaftlichen Wert möchtest du verwirklichen?",
                
                // Lebensphilosophie
                "Welche Eigenschaft ist dir am wichtigsten?",
                "Welcher Lebensgrundsatz ist dir am wichtigsten?",
                "Was ist für dich wahrer Erfolg?",
                "Was ist für dich das größte Glück?",
                "Was ist in einer Freundschaft am wichtigsten?",
                "Was ist für dich das beste Geschenk?",
                "Wann fühlst du dich am erfolgreichsten?",
                "Wie lernst du am besten?",
                "Welche Lebensfähigkeit ist am wichtigsten?",
                "Was macht das Leben sinnvoll?",
                
                // Lustige Annahmen
                "Was würdest du mit unendlich viel Geld machen?",
                "Wofür würdest du Gedankenlesen einsetzen?",
                "Wohin würdest du fliegen, wenn du könntest?",
                "Was würdest du tun, wenn die Zeit stillstehen würde?",
                "Wohin würdest du gehen, wenn du unsichtbar wärst?",
                "Mit welchem Tier würdest du gerne sprechen?",
                "Wohin würdest du dich teleportieren?",
                "Was möchtest du über die Zukunft wissen?",
                "Welche historische Person würdest du zum Leben erwecken?",
                "Was würdest du aus der Welt verschwinden lassen?"
            ],
            dare: [
                // Leichte und lustige Aufgaben
                "Gehe wie ein Pinguin",
                "Sprich mit einer komischen Stimme bis zur nächsten Runde",
                "Imitiere einen Prominenten bis zur nächsten Runde",
                "Trage deine Socken als Handschuhe für 5 Minuten",
                "Versuche deine eigene Nase (oder deinen Ellbogen) zu lecken",
                "Sage 10 Mal vor dem Spiegel 'Ich bin so schön/hübsch'",
                "Sprich 5 Minuten lang mit einem falschen Akzent",
                "Imitiere eine Katze mit Bewegungen und Geräuschen",
                "Imitiere einen Hund mit Bewegungen und Geräuschen",
                "Tue so, als wärst du ein Roboter",
                "Singe dein Lieblingslied wie ein Opernstar",
                "Tanze ohne Musik für 30 Sekunden",
                "Erzähle einen Witz, auch wenn er schlecht ist",
                "Mache 10 Hampelmänner",
                "Spreche 2 Minuten lang nur in Reimen",
                "Imitiere deinen Lieblingsschauspieler",
                "Mache ein Selfie mit einer lustigen Grimasse",
                "Gehe rückwärts bis zur nächsten Runde",
                "Singe das Alphabet rückwärts",
                "Stelle ein berühmtes Gemälde nach",
                
                // Kreative Aufgaben
                "Erfinde einen neuen Tanz und führe ihn vor",
                "Erzähle eine Geschichte nur mit Handbewegungen",
                "Führe ein Schauspiel ohne Worte auf",
                "Zeichne ein Porträt von jemandem aus der Gruppe",
                "Komponiere ein kurzes Lied über das heutige Wetter",
                "Führe eine Modenschau mit deiner aktuellen Kleidung auf",
                "Bastle etwas aus den Gegenständen in der Nähe",
                "Denke dir eine neue Begrüßung aus und bringe sie allen bei",
                "Erfinde eine Kurzgeschichte mit allen Anwesenden als Charaktere",
                "Mache Tiergeräusche und lasse andere raten",
                
                // Soziale Aufgaben
                "Erzähle jedem Anwesenden etwas Nettes",
                "Frage jemanden nach seinem Lieblingswitz",
                "Gib jemandem ein ehrliches Kompliment",
                "Teile eine peinliche Geschichte von dir",
                "Erzähle von deinem stolzesten Moment",
                "Sage jedem, was du an ihm magst",
                "Entschuldige dich bei jemandem für etwas Kleines",
                "Erzähle von einem Moment, in dem du mutig warst",
                "Teile deinen besten Ratschlag",
                "Erzähle von deinem Lieblingsfamilienmitglied",
                
                // Herausfordernde aber sichere Aufgaben
                "Halte eine einminütige Dankesrede",
                "Führe eine Pressekonferenz über dein letztes Abenteuer",
                "Erzähle das Märchen von Rotkäppchen als Nachrichtensprecher",
                "Führe ein Bewerbungsgespräch für den Job als 'Professioneller Partygast'",
                "Halte eine Verkaufspräsentation für einen alltäglichen Gegenstand",
                "Erzähle den anderen, wie man Zähne putzt, als wäre es Raketenwissenschaft",
                "Erkläre, wie man Wasser trinkt, als wärst du ein Wissenschaftler",
                "Führe vor, wie man auf verschiedene Arten geht (traurig, glücklich, etc.)",
                "Stelle verschiedene Emotionen nur mit deinem Gesicht dar",
                "Beschreibe dein heutiges Frühstück wie ein Restaurantkritiker",
                
                // Bewegungsaufgaben
                "Mache Yoga-Posen für eine Minute",
                "Hüpfe 30 Sekunden lang auf einem Bein",
                "Mache einen Handstand (oder versuche es)",
                "Balanciere einen Gegenstand auf deinem Kopf für 2 Minuten",
                "Mache 20 Liegestütze (oder so viele du kannst)",
                "Springe wie ein Frosch durch den Raum",
                "Laufe wie in Zeitlupe für 1 Minute",
                "Stehe 3 Minuten lang auf einem Bein",
                "Mache Stretching-Übungen vor",
                "Tanze nur mit deinen Armen",
                
                // Kommunikationsaufgaben
                "Sprich 3 Minuten lang ohne die Buchstaben 'A' und 'E'",
                "Stelle Fragen, aber antworte nur mit weiteren Fragen",
                "Sprich wie ein Nachrichtensprecher über das, was um dich herum passiert",
                "Führe ein Telefonat mit deinem zukünftigen Ich",
                "Beschreibe ein normales Objekt, ohne seinen Namen zu nennen",
                "Erzähle eine Geschichte nur mit Fragen",
                "Sprich 5 Minuten lang nur in Superlativen",
                "Führe ein Interview mit einem imaginären Prominenten",
                "Erzähle die Handlung deines Lieblingsfilms in 30 Sekunden",
                "Sprich wie ein Pirat bis zur nächsten Runde"
            ]
        },
        spicy: {
            truth: [
                // Emotionale und persönliche Fragen
                "Was ist das Peinlichste, was dir je passiert ist?",
                "Welchen Fehler bereust du am meisten?",
                "Was ist dein größtes Geheimnis?",
                "Über wen warst du schonmal eifersüchtig?",
                "Was war dein größter Vertrauensbruch?",
                "Welche Lüge erzählst du am häufigsten?",
                "Was ist deine größte Unsicherheit?",
                "Welche deiner Eigenschaften würdest du gerne ändern?",
                "Was ist dein größter Traum, den du nie jemandem erzählt hast?",
                "Wann hast du das letzte Mal geweint und warum?",
                
                // Beziehungen und Freundschaften
                "Welche Beziehung bereust du am meisten?",
                "Was ist das Schlechteste, was ein Freund über dich gesagt hat?",
                "Wen aus der Gruppe findest du am attraktivsten?",
                "Welchen ersten Eindruck hattest du von jedem hier?",
                "Mit wem aus der Gruppe würdest du gerne mehr Zeit verbringen?",
                "Über wen hier denkst du manchmal nach, wenn die Person nicht da ist?",
                "Welcher Charakter von jemandem hier irritiert dich am meisten?",
                "Wem hier würdest du am ehesten ein Geheimnis anvertrauen?",
                "Wen hier würdest du bei einem Zombie-Apokalypse als ersten opfern?",
                "Von wem hier würdest du dir am liebsten Rat holen?",
                
                // Tiefere persönliche Reflexionen
                "Was denkst du wirklich über dich selbst?",
                "Welche Phase deines Lebens war die schwierigste?",
                "Was ist das Mutigste, was du je getan hast?",
                "Welchen Aspekt der Gesellschaft findest du am problematischsten?",
                "Was ist deine kontroverseste Meinung?",
                "Welche Eigenschaft bewunderst du an anderen, die du nicht hast?",
                "Was ist das Selbstloseste, was du je getan hast?",
                "Welche deiner Entscheidungen hat dich am meisten geprägt?",
                "Was ist das Unethischste, was du je getan hast?",
                "Welche Erfahrung hat deine Weltanschauung am meisten verändert?",
                
                // Moralische und ethische Dilemmata
                "Würdest du lügen, um jemandes Gefühle zu schonen?",
                "Würdest du einen kleinen Betrug begehen, wenn niemand es merken würde?",
                "Wie wichtig ist dir der gesellschaftliche Status?",
                "Was würdest du für eine Million Euro tun?",
                "Würdest du einen Tag lang das Leben von jemandem aus der Gruppe tauschen wollen?",
                "Welche gesellschaftliche Norm findest du überholt?",
                "Was denkst du über die Rolle sozialer Medien in unserem Leben?",
                "Glaubst du, dass Menschen grundsätzlich gut oder schlecht sind?",
                "Wie wichtig ist dir die Meinung anderer über dich?",
                "Würdest du deine Überzeugungen für Geld ändern?",
                
                // Lebensphilosophie und Zukunft
                "Was bereust du, nicht getan zu haben?",
                "Welchen Rat würdest du deinem jüngeren Ich geben?",
                "Was möchtest du erreicht haben, bevor du stirbst?",
                "Welche Angst hält dich am meisten zurück?",
                "Was ist dein größter innerer Konflikt?",
                "Wie stellst du dir dein Leben in 20 Jahren vor?",
                "Was würdest du anders machen, wenn du nochmal von vorn anfangen könntest?",
                "Welche Eigenschaften suchst du in einem Lebenspartner?",
                "Was ist dein dunkelster Gedanke?",
                "Welche Version von dir magst du am wenigsten?",
                
                // Gesellschaft und Politik
                "Welches politische Thema beschäftigt dich am meisten?",
                "Was denkst du über die Zukunft der Menschheit?",
                "Welche gesellschaftliche Veränderung wünschst du dir am meisten?",
                "Was ist das Ignoranteste, was du über ein wichtiges Thema denkst?",
                "Welche Privilegien erkennst du bei dir selbst?",
                "Welche Vorurteile hast du, obwohl du weißt, dass sie falsch sind?",
                "Was ist deine unpopulärste politische Meinung?",
                "Welchen gesellschaftlichen Trend findest du besorgniserregend?",
                "Wie würdest du die Welt regieren, wenn du könntest?",
                "Was ist das Heuchlerischste an der heutigen Gesellschaft?"
            ],
            dare: [
                // Emotionale Herausforderungen
                "Entschuldige dich bei jemandem, dem du wehgetan hast",
                "Erzähle von einem Moment, in dem du jemanden enttäuscht hast",
                "Gestehe eine Lüge, die du jemandem hier erzählt hast",
                "Erzähle von einem Moment, in dem du dich geschämt hast",
                "Teile eine Angst mit, die du noch nie jemandem erzählt hast",
                "Erzähle von einer Zeit, in der du jemanden falsch eingeschätzt hast",
                "Gib zu, wann du das letzte Mal neidisch warst",
                "Erzähle von einem Moment, in dem du mutig hättest sein sollen, es aber nicht warst",
                "Teile eine Erinnerung, die dich immer noch beschäftigt",
                "Erzähle von einem Mal, als du jemand anderen verletzt hast",
                
                // Soziale Herausforderungen
                "Sage jedem hier, was du wirklich über ihn denkst (ehrlich aber respektvoll)",
                "Erzähle deine ehrliche erste Meinung über jeden hier",
                "Gib jemandem ein Kompliment, das du noch nie ausgesprochen hast",
                "Entschuldige dich bei jemandem für etwas aus der Vergangenheit",
                "Erzähle jemandem hier etwas, was du schon lange sagen wolltest",
                "Frage jemanden nach Vergebung für etwas Bestimmtes",
                "Teile mit jemandem ein Geheimnis",
                "Erzähle jemandem, wie wichtig er dir ist",
                "Sage jemandem, wofür du ihm dankbar bist",
                "Gestehe jemandem gegenüber eine Schwäche",
                
                // Selbstreflexion in der Gruppe
                "Erzähle von deinem größten persönlichen Versagen",
                "Teile eine kontroverse Meinung und erkläre, warum du so denkst",
                "Erzähle von einem Moment, der dein Leben verändert hat",
                "Beschreibe deine größte Angst vor der Zukunft",
                "Erzähle von einem Mal, als du deine Prinzipien kompromittiert hast",
                "Teile etwas mit, wofür du dich schämst",
                "Erzähle von einer schweren Entscheidung, die du treffen musstest",
                "Beschreibe einen Moment, in dem du dich völlig verloren gefühlt hast",
                "Erzähle von einer Zeit, in der du dich selbst enttäuscht hast",
                "Teile deine größte Unsicherheit mit",
                
                // Moralische Herausforderungen
                "Gestehe etwas, was du getan hast und was du für falsch hältst",
                "Erzähle von einem Mal, als du gelogen hast, um dir selbst zu helfen",
                "Teile eine Situation, in der du weggeschaut hast, obwohl du hättest handeln sollen",
                "Erzähle von einem Vorurteil, das du hattest und überwunden hast",
                "Beschreibe eine Situation, in der du unfair zu jemandem warst",
                "Erzähle von einem Mal, als du jemanden im Stich gelassen hast",
                "Teile eine Entscheidung, die du getroffen hast und die anderen geschadet hat",
                "Erzähle von einem Moment, in dem du schwach warst",
                "Beschreibe eine Situation, in der du heuchlerisch warst",
                "Erzähle von einem Mal, als du egoistisch gehandelt hast",
                
                // Tiefere Kommunikation
                "Führe ein 5-minütiges ernsthaftes Gespräch mit jemandem über eure Freundschaft",
                "Erzähle jemandem, wie er dich beeinflusst hat",
                "Teile mit der Gruppe deine tiefste Sorge über die Zukunft",
                "Sprich über ein Thema, das dir wichtig ist, aber über das du normalerweise schweigst",
                "Erzähle, welche Lektion das Leben dich am schwersten gelehrt hat",
                "Beschreibe, was Glück für dich bedeutet",
                "Erkläre, was du an der Welt ändern würdest und warum",
                "Teile deine Gedanken über den Sinn des Lebens",
                "Erzähle, was du von deinen Eltern gelernt hast (Gutes und Schlechtes)",
                "Beschreibe, wie du dir eine perfekte Welt vorstellst",
                
                // Kreative emotionale Herausforderungen
                "Schreibe einen Brief an dein zukünftiges Ich und lies ihn vor",
                "Halte eine Dankesrede für die wichtigste Person in deinem Leben",
                "Erzähle die Geschichte deines Lebens in drei Kapiteln",
                "Beschreibe deinen Traumtag so detailliert wie möglich",
                "Erkläre, was du in den letzten fünf Jahren über dich gelernt hast",
                "Teile deine Definition von wahrer Freundschaft",
                "Erzähle, was du dir für die nächste Generation wünschst",
                "Beschreibe den Moment, in dem du dich am lebendigsten gefühlt hast",
                "Erkläre, was du unter persönlichem Erfolg verstehst",
                "Erzähle von deinem größten persönlichen Durchbruch"
            ]
        }
    }
};

let usedQuestions = {
    soft: { truth: [], dare: [] },
    spicy: { truth: [], dare: [] }
};

function selectDifficulty(difficulty) {
    gameData.currentDifficulty = difficulty;
    document.getElementById('difficultyButtons').style.display = 'none';
    document.getElementById('choiceButtons').style.display = 'flex';
    
    const difficultyText = difficulty === 'soft' ? '😊 Sanfter Modus' : '🌶️ Pikanter Modus';
    document.getElementById('selectedDifficulty').textContent = difficultyText;
    document.getElementById('selectedDifficulty').style.display = 'block';
    
    document.getElementById('questionText').textContent = 'Wähle: Wahrheit oder Pflicht?';
    document.getElementById('backButton').style.display = 'inline-block';
}

function selectChoice(type) {
    gameData.currentType = type;
    const typeText = type === 'truth' ? '🤔 Wahrheit' : '🎯 Pflicht';
    document.getElementById('selectedType').textContent = typeText;
    document.getElementById('selectedType').style.display = 'block';
    
    showQuestion();
    document.getElementById('choiceButtons').style.display = 'none';
    document.getElementById('nextButton').style.display = 'inline-block';
    document.getElementById('resetButton').style.display = 'inline-block';
}

function showQuestion() {
    const { currentType, currentDifficulty } = gameData;
    const questions = gameData.questions[currentDifficulty][currentType];
    const used = usedQuestions[currentDifficulty][currentType];
    
    // Wenn alle Fragen verwendet wurden, zurücksetzen
    if (used.length >= questions.length) {
        used.length = 0;
    }
    
    // Verfügbare Fragen finden
    const availableQuestions = questions.filter((_, index) => !used.includes(index));
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];
    
    // Originalindex für used array finden
    const originalIndex = questions.indexOf(selectedQuestion);
    used.push(originalIndex);
    
    document.getElementById('questionText').textContent = selectedQuestion;
}

function nextQuestion() {
    document.getElementById('selectedType').style.display = 'none';
    document.getElementById('choiceButtons').style.display = 'flex';
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('resetButton').style.display = 'none';
    
    document.getElementById('questionText').textContent = 'Wähle: Wahrheit oder Pflicht?';
}

function resetGame() {
    gameData.currentType = null;
    gameData.currentDifficulty = null;
    
    document.getElementById('selectedType').style.display = 'none';
    document.getElementById('selectedDifficulty').style.display = 'none';
    document.getElementById('choiceButtons').style.display = 'none';
    document.getElementById('difficultyButtons').style.display = 'flex';
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('resetButton').style.display = 'none';
    document.getElementById('backButton').style.display = 'none';
    
    document.getElementById('questionText').textContent = '👇 Wähle den Spielmodus! 👇';
    
    // Reset used questions
    usedQuestions = {
        soft: { truth: [], dare: [] },
        spicy: { truth: [], dare: [] }
    };
}

function backToDifficulty() {
    gameData.currentType = null;
    
    document.getElementById('selectedType').style.display = 'none';
    document.getElementById('choiceButtons').style.display = 'none';
    document.getElementById('difficultyButtons').style.display = 'flex';
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('resetButton').style.display = 'none';
    document.getElementById('backButton').style.display = 'none';
    
    document.getElementById('questionText').textContent = '👇 Wähle den Spielmodus! 👇';
}