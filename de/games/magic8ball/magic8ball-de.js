document.addEventListener('DOMContentLoaded', function () {
    // DOM Elemente
    const magicBall = document.querySelector('.magic-ball');
    const answerElement = document.getElementById('answer');
    const questionInput = document.getElementById('question');
    const shakeButton = document.getElementById('shake-button');
    const versionSelect = document.getElementById('version');
    const historyList = document.getElementById('history-list');

    // Anpassen-Button erstellen
    const customizeButton = document.createElement('button');
    customizeButton.className = 'btn btn-outline-primary mt-3 d-block w-100';
    customizeButton.innerHTML = '<i class="fas fa-magic"></i> Antworten anpassen';
    shakeButton.parentNode.insertBefore(customizeButton, shakeButton.nextSibling);

    // Modal Container erstellen
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal fade';
    modalContainer.id = 'customAnswersModal';
    modalContainer.setAttribute('tabindex', '-1');
    modalContainer.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title">Deine magischen Antworten anpassen</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Schließen"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-info alert-dismissible fade show mb-3" role="alert">
                        Erstelle deine eigenen magischen Antworten! Sie werden automatisch gespeichert.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Schließen"></button>
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" id="customAnswer" 
                            placeholder="Gib deine personalisierte Antwort hier ein..."
                            maxlength="100">
                        <button class="btn btn-primary" id="addCustomAnswer">
                            <i class="fas fa-plus"></i> Hinzufügen
                        </button>
                    </div>
                    <div class="custom-answers-wrapper">
                        <ul class="list-group" id="customAnswersList"></ul>
                        <div class="text-center mt-3" id="emptyState">
                            <p class="text-muted">Noch keine personalisierten Antworten. Füge deine erste hinzu!</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer bg-light">
                    <div class="w-100">
                        <!-- Zähler Zeile -->
                        <div class="d-flex justify-content-center mb-3">
                            <span class="badge bg-primary fs-6 px-3 py-2" id="customAnswerCount">0 Antworten</span>
                        </div>
                        
                        <div class="d-flex justify-content-between align-items-center">
                            <button class="btn btn-outline-danger" id="clearCustomAnswers">Alle löschen</button>
                            <button type="button" class="btn btn-success" id="saveCustomAnswers">Bestätigen</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modalContainer);

    // Bootstrap Modal initialisieren
    const modal = new bootstrap.Modal(modalContainer);

    // Modal anzeigen wenn Anpassen-Button geklickt wird
    customizeButton.addEventListener('click', () => modal.show());

    // Deutsche Antworten für verschiedene Versionen
    const answers = {
        classic: [
            "Es ist sicher.",
            "Es ist definitiv so.",
            "Ohne Zweifel.",
            "Ja, definitiv.",
            "Du kannst dich darauf verlassen.",
            "So wie ich es sehe, ja.",
            "Höchstwahrscheinlich.",
            "Die Aussichten sind gut.",
            "Ja.",
            "Die Zeichen deuten auf Ja hin.",
            "Antwort unklar, versuche es nochmal.",
            "Frage später nochmal.",
            "Sage ich dir jetzt besser nicht.",
            "Kann jetzt nicht vorhergesagt werden.",
            "Konzentriere dich und frage nochmal.",
            "Rechne nicht damit.",
            "Meine Antwort ist Nein.",
            "Meine Quellen sagen Nein.",
            "Die Aussichten sind nicht so gut.",
            "Sehr zweifelhaft."
        ],
        silly: [
            "So sicher wie Einhörner real sind!",
            "Meine Kristallkugel sagt JA!",
            "Absolut... NICHT!",
            "Die Sterne stehen auf Vielleicht?",
            "Frag mich nach meiner Kaffeepause.",
            "Der magische Hamster sagt ja!",
            "Nur wenn du auf einem Bein hüpfst.",
            "Mein magischer 8-Ball macht Urlaub.",
            "Die Antwort versteckt sich unter deinem Bett.",
            "Ja, aber nur dienstags.",
            "Niemals, José!",
            "Das Universum sagt, versuch's nochmal.",
            "Das ist ein klares Nein von mir.",
            "Ja, mit Streuseln obendrauf!",
            "Meine Quellen kichern zu sehr zum Antworten.",
            "Die Antwort liegt im Wind.",
            "Frag dein Haustier, das weiß es besser.",
            "Die Magie sagt ja, aber die Logik sagt nein.",
            "Nur wenn morgen Schweine fliegen.",
            "Die Antwort ist 42. Immer 42."
        ],
        sarcastic: [
            "Ach ja, klar. Und ich bin die Königin von England.",
            "Lass mich mal in meine Kristallkugel schauen... sie sagt 'offensichtlich nicht'.",
            "Klar, und Einhörner sind auch real.",
            "Ist Wasser etwa nicht nass?",
            "Ich würde ja sagen, aber dann würde ich lügen.",
            "In welchem Universum wäre das wahr?",
            "Wow, das hast du wirklich gefragt?",
            "Ich tue mal so, als hättest du das nicht gefragt.",
            "Hmm, lass mich überlegen... nein.",
            "Die Chancen stehen schlechter als zweimal im Lotto zu gewinnen.",
            "Ich könnte antworten, aber ich bin zu beschäftigt mit Augenrollen.",
            "Muss ich das wirklich beantworten?",
            "Ich lache zu sehr, um ordentlich zu antworten.",
            "Ach Schätzchen, nein.",
            "Klar, wenn Schweine in der ersten Klasse fliegen.",
            "Ich würde mein nicht vorhandenes Geld auf 'nein' setzen.",
            "Das ist lustig. Nächste Frage bitte.",
            "Ist das dein Ernst gerade?",
            "Ich brauche mehr Kaffee, bevor ich das beantworte.",
            "Die Antwort ist so offensichtlich, dass ich sie nicht mal sage."
        ],
        romance: [
            "Die Liebe liegt in der Luft!",
            "Dein Herz kennt die Antwort bereits.",
            "Amors Pfeil verfehlt nie sein Ziel.",
            "Die Sterne stehen günstig für die Liebe.",
            "Die Liebe findet immer einen Weg.",
            "Nicht alle, die in der Liebe wandeln, sind verloren.",
            "Folge deinem Herzen in dieser Sache.",
            "Die Liebe ist geduldig; vielleicht solltest du es auch sein.",
            "Das Herz will, was es will.",
            "Die Romantik wartet gleich um die Ecke.",
            "Diese Liebe stand in den Sternen geschrieben.",
            "Vielleicht ist es Zeit für den ersten Schritt.",
            "Liebe ist eine Reise, kein Ziel.",
            "Deine romantische Zukunft sieht rosig aus!",
            "Vertraue dem Prozess der Liebe.",
            "Manchmal braucht die Liebe etwas Zeit.",
            "Die besten Liebesgeschichten brauchen Zeit zum Entfalten.",
            "Dein Herz wird dich nicht in die Irre führen.",
            "Die Liebe kommt, wenn du es am wenigsten erwartest.",
            "Diese Verbindung hat Potenzial."
        ],
        drinking: [
            "Prost, trink aus!",
            "Einen Kurzen!",
            "Ex und hopp!",
            "Du bist dran mit Trinken!",
            "Trink doppelt!",
            "Alle trinken!",
            "Aussetzen, Glück gehabt!",
            "Such dir jemanden zum Mittrinken aus!",
            "Diesmal kein Trinken!",
            "Prost! Einen Schluck!",
            "Trink lieber Wasser, bleib hydriert!",
            "Wer als Letzter die Hand hebt, trinkt!",
            "Erzähl einen Witz oder trink!",
            "Trink wenn du schon mal...",
            "Schere, Stein, Papier mit deinem Nachbarn. Verlierer trinkt!",
            "Trink wenn du etwas Blaues anhast!",
            "Einen Schluck pro Haustier das du hast!",
            "Trink wenn du in den letzten 10 Minuten aufs Handy geschaut hast!",
            "Die größte Person trinkt!",
            "Trink wenn du diese Woche eine Serie gebingt hast!"
        ]
    };

    // Personalisierte Antworten aus localStorage laden
    let customAnswers = JSON.parse(localStorage.getItem('customAnswers-de')) || [];

    // Personalisierte Version zu Antworten-Objekt hinzufügen
    answers.custom = customAnswers;

    // Personalisierte Antworten UI erstellen
    function createCustomAnswersUI() {
        // Personalisierte Option zu Version-Auswahl hinzufügen falls nicht vorhanden
        if (!Array.from(versionSelect.options).some(option => option.value === 'custom')) {
            const customOption = new Option('✨ Personalisierte Antworten', 'custom');
            versionSelect.add(customOption);
        }

        // Anpassen-Button nur bei personalisierten Antworten anzeigen
        const toggleCustomizeButton = () => {
            customizeButton.style.display = versionSelect.value === 'custom' ? 'block' : 'none';
        };

        versionSelect.addEventListener('change', toggleCustomizeButton);
        toggleCustomizeButton();
    }

    // Personalisierte Antworten Liste aktualisieren
    function updateCustomAnswersList() {
        const list = document.getElementById('customAnswersList');
        const emptyState = document.getElementById('emptyState');
        const counter = document.getElementById('customAnswerCount');
        
        list.innerHTML = '';
        
        if (customAnswers.length === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
            customAnswers.forEach((answer, index) => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                listItem.innerHTML = `
                    <span class="flex-grow-1 me-3">${answer}</span>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeCustomAnswer(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                list.appendChild(listItem);
            });
        }
        
        // Zähler aktualisieren
        const count = customAnswers.length;
        counter.textContent = count === 1 ? '1 Antwort' : `${count} Antworten`;
        
        // Antworten-Array aktualisieren
        answers.custom = customAnswers;
    }

    // Personalisierte Antwort hinzufügen
    function addCustomAnswer() {
        const input = document.getElementById('customAnswer');
        const answer = input.value.trim();
        
        if (answer && answer.length <= 100) {
            customAnswers.push(answer);
            input.value = '';
            updateCustomAnswersList();
            localStorage.setItem('customAnswers-de', JSON.stringify(customAnswers));
        }
    }

    // Personalisierte Antwort entfernen
    window.removeCustomAnswer = function(index) {
        customAnswers.splice(index, 1);
        updateCustomAnswersList();
        localStorage.setItem('customAnswers-de', JSON.stringify(customAnswers));
    };

    // Event Listeners für personalisierte Antworten
    document.getElementById('addCustomAnswer').addEventListener('click', addCustomAnswer);
    
    document.getElementById('customAnswer').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addCustomAnswer();
        }
    });

    document.getElementById('clearCustomAnswers').addEventListener('click', function() {
        if (confirm('Alle personalisierten Antworten löschen?')) {
            customAnswers = [];
            answers.custom = [];
            updateCustomAnswersList();
            localStorage.removeItem('customAnswers-de');
        }
    });

    document.getElementById('saveCustomAnswers').addEventListener('click', function() {
        modal.hide();
        if (versionSelect.value === 'custom' && customAnswers.length === 0) {
            alert('Füge erst einige personalisierte Antworten hinzu!');
            versionSelect.value = 'classic';
        }
    });

    // UI initialisieren
    createCustomAnswersUI();
    updateCustomAnswersList();

    // Game State
    let isShaking = false;
    let questionHistory = JSON.parse(localStorage.getItem('questionHistory-de')) || [];

    // Fragen-Verlauf aktualisieren
    function updateHistory() {
        historyList.innerHTML = '';
        questionHistory.slice(-5).reverse().forEach(entry => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = `
                <div class="d-flex justify-content-between">
                    <strong>F:</strong> <span class="text-muted">${entry.question}</span>
                </div>
                <div class="d-flex justify-content-between mt-1">
                    <strong>A:</strong> <span class="text-primary">${entry.answer}</span>
                </div>
            `;
            historyList.appendChild(listItem);
        });
    }

    // Schüttel-Animation
    function shakeAnimation() {
        if (isShaking) return;
        
        isShaking = true;
        magicBall.classList.add('shaking');
        answerElement.textContent = '●●●';
        shakeButton.disabled = true;
        
        setTimeout(() => {
            magicBall.classList.remove('shaking');
            showAnswer();
            isShaking = false;
            shakeButton.disabled = false;
        }, 2000);
    }

    // Antwort anzeigen
    function showAnswer() {
        const currentVersion = versionSelect.value;
        const currentAnswers = answers[currentVersion];
        
        if (!currentAnswers || currentAnswers.length === 0) {
            if (currentVersion === 'custom') {
                answerElement.textContent = 'Füge erst personalisierte Antworten hinzu!';
                return;
            } else {
                answerElement.textContent = 'Fehler: Keine Antworten verfügbar';
                return;
            }
        }
        
        const randomAnswer = currentAnswers[Math.floor(Math.random() * currentAnswers.length)];
        answerElement.textContent = randomAnswer;
        
        // Zur Historie hinzufügen wenn eine Frage gestellt wurde
        const question = questionInput.value.trim();
        if (question) {
            const historyEntry = {
                question: question,
                answer: randomAnswer,
                timestamp: Date.now()
            };
            
            questionHistory.push(historyEntry);
            // Nur die letzten 50 Einträge behalten
            if (questionHistory.length > 50) {
                questionHistory = questionHistory.slice(-50);
            }
            
            localStorage.setItem('questionHistory-de', JSON.stringify(questionHistory));
            updateHistory();
            
            // Eingabefeld leeren nach dem Schütteln
            setTimeout(() => {
                questionInput.value = '';
            }, 1000);
        }
    }

    // Event Listeners
    shakeButton.addEventListener('click', shakeAnimation);
    
    questionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            shakeAnimation();
        }
    });

    // Eingabefeld fokussieren wenn geklickt wird
    questionInput.addEventListener('focus', () => {
        if (answerElement.textContent === '8') {
            answerElement.style.opacity = '0.5';
        }
    });

    questionInput.addEventListener('blur', () => {
        if (answerElement.textContent === '8') {
            answerElement.style.opacity = '1';
        }
    });

    // Platzhalter-Texte für verschiedene Versionen
    const placeholders = {
        classic: 'Stelle eine Frage...',
        silly: 'Frag etwas Verrücktes...',
        sarcastic: 'Trau dich, frag...',
        romance: 'Frag nach der Liebe...',
        drinking: 'Lass uns trinken...',
        custom: 'Deine personalisierte Frage...'
    };

    // Platzhalter aktualisieren wenn Version geändert wird
    versionSelect.addEventListener('change', () => {
        const selectedVersion = versionSelect.value;
        questionInput.placeholder = placeholders[selectedVersion] || placeholders.classic;
        
        // Reset answer display
        if (answerElement.textContent !== '8') {
            answerElement.textContent = '8';
        }
    });

    // Fragen-Verlauf beim Laden aktualisieren
    updateHistory();

    // Tipps-System
    const tips = [
        "Tipp: Drücke Enter um zu schütteln!",
        "Tipp: Probiere verschiedene Versionen aus!",
        "Tipp: Deine Fragen-Historie wird gespeichert.",
        "Tipp: Erstelle deine eigenen personalisierten Antworten!",
        "Tipp: Stelle konkrete Ja/Nein-Fragen für beste Ergebnisse.",
        "Tipp: Der magische 8-Ball funktioniert am besten bei wichtigen Entscheidungen... oder auch nicht! 😉"
    ];

    // Zufälligen Tipp alle 30 Sekunden anzeigen
    function showRandomTip() {
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        const tipElement = document.createElement('div');
        tipElement.className = 'alert alert-info alert-dismissible fade show mt-3';
        tipElement.innerHTML = `
            ${randomTip}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Schließen"></button>
        `;
        
        // Tipp vor dem Schüttel-Button einfügen
        shakeButton.parentNode.insertBefore(tipElement, shakeButton);
        
        // Tipp nach 10 Sekunden automatisch entfernen
        setTimeout(() => {
            if (tipElement.parentNode) {
                tipElement.remove();
            }
        }, 10000);
    }

    // Ersten Tipp nach 10 Sekunden anzeigen, dann alle 60 Sekunden
    setTimeout(showRandomTip, 10000);
    setInterval(showRandomTip, 60000);
});

// Für Game Navigation API
window.onMagic8BallGameEnd = function() {
    if (window.GameNavigationAPI && window.GameNavigationAPI.onGameEnd) {
        window.GameNavigationAPI.onGameEnd();
    }
};