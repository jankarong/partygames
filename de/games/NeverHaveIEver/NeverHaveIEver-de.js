// Deutsche "Ich hab noch nie" Fragen
const statements = [
    // Harmlose/Lustige Fragen
    "Ich hab noch nie einen ganzen Tag im Pyjama verbracht.",
    "Ich hab noch nie beim Kochen das Essen anbrennen lassen.",
    "Ich hab noch nie ein Buch von der ersten bis zur letzten Seite gelesen.",
    "Ich hab noch nie einen Film mehr als fünfmal gesehen.",
    "Ich hab noch nie eine Spinne mit bloßen Händen angefasst.",
    "Ich hab noch nie einen Garten angelegt.",
    "Ich hab noch nie eine Nacht durchgemacht ohne zu schlafen.",
    "Ich hab noch nie in einem Zelt übernachtet.",
    "Ich hab noch nie meine Zimmerpflanze sterben lassen.",
    "Ich hab noch nie beim Karaoke gesungen.",
    
    // Peinliche Momente
    "Ich hab noch nie in der Öffentlichkeit hingefallen.",
    "Ich hab noch nie den falschen Namen gesagt.",
    "Ich hab noch nie vergessen wie jemand heißt während ich mit ihm rede.",
    "Ich hab noch nie aus Versehen eine Nachricht an die falsche Person geschickt.",
    "Ich hab noch nie beim Essen etwas auf meine Kleidung gekleckert.",
    "Ich hab noch nie in einem Geschäft etwas kaputt gemacht.",
    "Ich hab noch nie einen peinlichen Traum laut erzählt bekommen.",
    "Ich hab noch nie meinen Schlüssel im Auto eingeschlossen.",
    "Ich hab noch nie im falschen Auto einsteigen wollen.",
    "Ich hab noch nie jemanden mit dem falschen Namen angesprochen.",
    
    // Schule/Arbeit
    "Ich hab noch nie bei einer Prüfung geschummelt.",
    "Ich hab noch nie eine Hausaufgabe vergessen.",
    "Ich hab noch nie zu spät zur Schule oder Arbeit gekommen.",
    "Ich hab noch nie vorgetäuscht krank zu sein um nicht zur Schule/Arbeit zu müssen.",
    "Ich hab noch nie im Unterricht oder Meeting eingeschlafen.",
    "Ich hab noch nie eine wichtige E-Mail nicht beantwortet.",
    "Ich hab noch nie bei der Arbeit privat telefoniert.",
    "Ich hab noch nie einen Kollegen oder Mitschüler nicht gemocht.",
    "Ich hab noch nie eine Deadline verpasst.",
    "Ich hab noch nie heimlich Social Media während der Arbeitszeit benutzt.",
    
    // Beziehungen/Liebe
    "Ich hab noch nie einen Korb bekommen.",
    "Ich hab noch nie einem Freund einen Korb gegeben.",
    "Ich hab noch nie heimlich in jemanden verliebt gewesen ohne es zu sagen.",
    "Ich hab noch nie einen Ex-Partner zurückgewollt.",
    "Ich hab noch nie beim Date gelogen.",
    "Ich hab noch nie Social Media eines Ex durchstöbert.",
    "Ich hab noch nie einen Liebesbrief geschrieben.",
    "Ich hab noch nie ein schlechtes erstes Date gehabt.",
    "Ich hab noch nie bei einem Date das Essen ausgespuckt.",
    "Ich hab noch nie beim ersten Date einen Kuss bekommen.",
    
    // Essen/Trinken
    "Ich hab noch nie Sushi gegessen.",
    "Ich hab noch nie etwas Abgelaufenes gegessen ohne es zu merken.",
    "Ich hab noch nie eine ganze Pizza alleine gegessen.",
    "Ich hab noch nie Essen bestellt ohne Geld zu haben.",
    "Ich hab noch nie vergessen was ich kochen wollte während ich koche.",
    "Ich hab noch nie heimlich Süßigkeiten vor anderen versteckt.",
    "Ich hab noch nie ein Gericht probiert das ich nicht aussprechen konnte.",
    "Ich hab noch nie zu viel Salz ins Essen getan.",
    "Ich hab noch nie Milch direkt aus der Packung getrunken.",
    "Ich hab noch nie etwas Scharfes gegessen das mich zum Weinen brachte.",
    
    // Pikante Fragen (angemessen für deutsche Kultur)
    "Ich hab noch nie über einen Schwarm geträumt.",
    "Ich hab noch nie jemandem eine Liebeserklärung gemacht.",
    "Ich hab noch nie einen heimlichen Kuss bekommen.",
    "Ich hab noch nie ein Liebesgedicht geschrieben.",
    "Ich hab noch nie jemanden beim ersten Date geküsst.",
    "Ich hab noch nie in der Öffentlichkeit Händchen gehalten.",
    "Ich hab noch nie eine Fernbeziehung geführt.",
    "Ich hab noch nie beim Tanzen geflirtet.",
    "Ich hab noch nie eine Dating-App benutzt.",
    "Ich hab noch nie bei einem romantischen Film geweint.",
    
    // Soziale Medien/Technologie
    "Ich hab noch nie mehr als 5 Stunden am Tag am Handy verbracht.",
    "Ich hab noch nie ein Selfie gemacht das ich sofort wieder gelöscht habe.",
    "Ich hab noch nie eine Nachricht abgeschickt und sofort bereut.",
    "Ich hab noch nie aus Versehen jemanden angerufen.",
    "Ich hab noch nie mein Handy in die Toilette fallen lassen.",
    "Ich hab noch nie einen Post auf Social Media bereut.",
    "Ich hab noch nie jemanden online blockiert.",
    "Ich hab noch nie ein Foto von meinem Essen gepostet.",
    "Ich hab noch nie bei einem Video-Call vergessen dass die Kamera an ist.",
    "Ich hab noch nie eine Whatsapp-Sprachnachricht von über 2 Minuten geschickt.",
    
    // Reisen/Abenteuer
    "Ich hab noch nie einen anderen Kontinent besucht.",
    "Ich hab noch nie meinen Pass verloren.",
    "Ich hab noch nie im Ausland nach dem Weg gefragt ohne die Sprache zu sprechen.",
    "Ich hab noch nie in einem Hostel übernachtet.",
    "Ich hab noch nie eine Reise alleine gemacht.",
    "Ich hab noch nie meinen Flug verpasst.",
    "Ich hab noch nie beim Reisen mein Gepäck verloren.",
    "Ich hab noch nie in einem anderen Land das falsche Geld benutzt.",
    "Ich hab noch nie eine Sehenswürdigkeit besucht nur um ein Foto zu machen.",
    "Ich hab noch nie beim Camping im Regen geschlafen.",
    
    // Hobbys/Freizeit
    "Ich hab noch nie ein Musikinstrument gelernt.",
    "Ich hab noch nie ein Bild gemalt.",
    "Ich hab noch nie einen Marathon gelaufen.",
    "Ich hab noch nie ein Buch geschrieben oder versucht zu schreiben.",
    "Ich hab noch nie eine andere Sprache fließend sprechen gelernt.",
    "Ich hab noch nie an einem Wettkampf teilgenommen.",
    "Ich hab noch nie eine Sammlung angefangen.",
    "Ich hab noch nie einen Garten gepflegt.",
    "Ich hab noch nie gestrickt oder gehäkelt.",
    "Ich hab noch nie einen Kuchen von Grund auf gebacken.",
    
    // Verrückte/Lustige Situationen
    "Ich hab noch nie nackt geschlafen.",
    "Ich hab noch nie mit einem Tier gesprochen als wäre es ein Mensch.",
    "Ich hab noch nie auf einen Stuhl geklettert wegen einer Spinne.",
    "Ich hab noch nie heimlich in einem Geschäft getanzt.",
    "Ich hab noch nie ein Gespräch mit mir selbst im Spiegel geführt.",
    "Ich hab noch nie so getan als würde ich telefonieren um ein Gespräch zu vermeiden.",
    "Ich hab noch nie die Fernbedienung im Kühlschrank gesucht.",
    "Ich hab noch nie vergessen was ich gerade sagen wollte während ich rede.",
    "Ich hab noch nie auf ein Auto zugegangen das nicht meins war.",
    "Ich hab noch nie versucht eine Tür aufzumachen die gar keine Tür war.",
    
    // Familie/Kindheit
    "Ich hab noch nie als Kind etwas kaputt gemacht und es nicht zugegeben.",
    "Ich hab noch nie Süßigkeiten vor meinen Geschwistern versteckt.",
    "Ich hab noch nie behauptet meine Hausaufgaben gemacht zu haben obwohl das nicht stimmte.",
    "Ich hab noch nie Angst vor einem Monster unter dem Bett gehabt.",
    "Ich hab noch nie einen Zahn an die Zahnfee 'verkauft'.",
    "Ich hab noch nie heimlich länger aufgeblieben als erlaubt.",
    "Ich hab noch nie an einen Märchenhelden geglaubt.",
    "Ich hab noch nie ein Kuscheltier als besten Freund gehabt.",
    "Ich hab noch nie so getan als wäre ich krank um nicht in die Schule zu müssen.",
    "Ich hab noch nie Gemüse heimlich weggeworfen statt es zu essen.",
    
    // Gesundheit/Sport
    "Ich hab noch nie einen ganzen Monat sport gemacht ohne Pause.",
    "Ich hab noch nie eine Diät länger als eine Woche durchgehalten.",
    "Ich hab noch nie Yoga probiert.",
    "Ich hab noch nie beim Sport geschummelt.",
    "Ich hab noch nie aus Faulheit den Aufzug statt der Treppe genommen.",
    "Ich hab noch nie beim Arzt gelogen.",
    "Ich hab noch nie eine Verletzung übertrieben um Mitleid zu bekommen.",
    "Ich hab noch nie 10.000 Schritte an einem Tag geschafft.",
    "Ich hab noch nie beim Laufen aufgegeben obwohl ich noch konnte.",
    "Ich hab noch nie eine Sportverletzung gehabt.",
    
    // Moderne Herausforderungen
    "Ich hab noch nie einen ganzen Tag ohne Internet verbracht.",
    "Ich hab noch nie Netflix länger als 6 Stunden am Stück geschaut.",
    "Ich hab noch nie bei einem Online-Game gelogen wer ich bin.",
    "Ich hab noch nie etwas online gekauft und nie benutzt.",
    "Ich hab noch nie mehr Geld für Apps ausgegeben als geplant.",
    "Ich hab noch nie ein TikTok-Video nachgemacht.",
    "Ich hab noch nie einen Zoom-Call in Unterwäsche gemacht.",
    "Ich hab noch nie während der Online-Schule/Arbeit etwas anderes gemacht.",
    "Ich hab noch nie mein WLAN-Passwort vergessen.",
    "Ich hab noch nie beim Online-Shopping betrunken eingekauft."
];

let currentStatementIndex = 0;
let usedStatements = [];
let gameStarted = false;

// DOM Elemente
const statementElement = document.getElementById('statement');
const nextButton = document.getElementById('nextBtn');

// Zufällige Aussage auswählen
function getRandomStatement() {
    if (usedStatements.length === statements.length) {
        // Alle Aussagen wurden verwendet, zurücksetzen
        usedStatements = [];
        showMessage("Alle Fragen wurden gespielt! Das Spiel beginnt von vorne.", "info");
    }
    
    let availableStatements = statements.filter((_, index) => !usedStatements.includes(index));
    let randomIndex = Math.floor(Math.random() * availableStatements.length);
    let selectedStatement = availableStatements[randomIndex];
    
    // Original-Index finden und zu verwendeten hinzufügen
    let originalIndex = statements.indexOf(selectedStatement);
    usedStatements.push(originalIndex);
    
    return selectedStatement;
}

// Neue Aussage anzeigen
function showNextStatement() {
    if (!gameStarted) {
        gameStarted = true;
        nextButton.textContent = 'Weiter';
        nextButton.setAttribute('aria-label', 'Nächste Frage');
    }
    
    const statement = getRandomStatement();
    statementElement.textContent = statement;
    
    // Animation hinzufügen
    statementElement.style.opacity = '0';
    statementElement.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        statementElement.style.opacity = '1';
        statementElement.style.transform = 'translateY(0)';
        statementElement.style.transition = 'all 0.3s ease';
    }, 100);
}

// Nachricht anzeigen
function showMessage(message, type = 'info') {
    // Erstelle Message-Element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'info' ? '#d4edda' : '#f8d7da'};
        color: ${type === 'info' ? '#155724' : '#721c24'};
        padding: 10px 20px;
        border-radius: 5px;
        border: 1px solid ${type === 'info' ? '#c3e6cb' : '#f5c6cb'};
        z-index: 1000;
        font-weight: bold;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Nach 3 Sekunden entfernen
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 3000);
}

// Spiel zurücksetzen
function resetGame() {
    usedStatements = [];
    gameStarted = false;
    currentStatementIndex = 0;
    statementElement.textContent = 'Klicke Start zum Spielen!';
    nextButton.textContent = 'Start';
    nextButton.setAttribute('aria-label', 'Spiel starten');
}

// Event Listeners
nextButton.addEventListener('click', showNextStatement);

// Tastatur-Unterstützung
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault();
        showNextStatement();
    }
    
    if (event.code === 'KeyR' && event.ctrlKey) {
        event.preventDefault();
        resetGame();
        showMessage("Spiel wurde zurückgesetzt!", "info");
    }
});

// Touch-Unterstützung für mobile Geräte
let touchStartY = 0;
statementElement.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

statementElement.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const swipeDistance = touchStartY - touchEndY;
    
    // Nach oben wischen für nächste Aussage
    if (swipeDistance > 50) {
        showNextStatement();
    }
});

// Spiel-Statistiken
let gameStats = {
    totalStatements: 0,
    startTime: null
};

function updateStats() {
    gameStats.totalStatements++;
    if (!gameStats.startTime) {
        gameStats.startTime = Date.now();
    }
}

// Füge Statistiken zur showNextStatement Funktion hinzu
const originalShowNext = showNextStatement;
showNextStatement = function() {
    originalShowNext();
    updateStats();
    
    // Zeige Statistiken alle 20 Fragen
    if (gameStats.totalStatements > 0 && gameStats.totalStatements % 20 === 0) {
        const playTime = Math.round((Date.now() - gameStats.startTime) / 1000 / 60);
        showMessage(`${gameStats.totalStatements} Fragen gespielt! Spielzeit: ${playTime} Minuten`, "info");
    }
};

// Spiel-Tipps
const gameTips = [
    "Tipp: Drücke die Leertaste oder Enter für die nächste Frage!",
    "Tipp: Strg+R setzt das Spiel zurück!",
    "Tipp: Bei Mobile: Wische nach oben für die nächste Frage!",
    "Tipp: Seid ehrlich - das macht das Spiel lustiger!",
    "Tipp: Jeder darf Fragen überspringen die zu persönlich sind!",
    "Tipp: Das Spiel funktioniert auch ohne Alkohol super!"
];

// Zeige zufälligen Tipp alle 60 Sekunden
function showRandomTip() {
    if (gameStarted) {
        const randomTip = gameTips[Math.floor(Math.random() * gameTips.length)];
        showMessage(randomTip, "info");
    }
}

setInterval(showRandomTip, 60000); // Alle 60 Sekunden

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    console.log('Ich hab noch nie - Deutsche Version geladen');
    console.log(`${statements.length} Fragen verfügbar`);
    
    // Zeige ersten Tipp nach 30 Sekunden
    setTimeout(() => {
        showMessage("Willkommen bei 'Ich hab noch nie'! Viel Spaß beim Spielen!", "info");
    }, 2000);
});

// Export für Game Navigation API
window.onNeverHaveIEverGameEnd = function() {
    if (window.GameNavigationAPI && window.GameNavigationAPI.onGameEnd) {
        window.GameNavigationAPI.onGameEnd();
    }
};