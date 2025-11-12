// Kings Cup - Portuguese (PT-BR) Translation
const kingsCupTranslations = {
    cardRules: {
        'A': {
            name: 'Cascata',
            description: 'Todos começam a beber continuamente e não podem parar até a pessoa antes deles parar! Segue no sentido horário de quem tirou a carta.',
            action: '🌊 Comece a cascata! Todos bebem continuamente até a pessoa antes de você parar!'
        },
        '2': {
            name: 'Você',
            description: 'Escolha alguém para beber. Aponte para qualquer jogador e ele deve tomar um gole.',
            action: '👉 Escolha alguém para beber! Aponte para um jogador e ele toma um gole!'
        },
        '3': {
            name: 'Eu',
            description: 'Você bebe! A pessoa que tirou esta carta deve tomar um gole.',
            action: '🍻 Você bebe! Tome um gole você mesmo!'
        },
        '4': {
            name: 'Chão',
            description: 'Todos devem tocar o chão imediatamente. Última pessoa a tocar o chão bebe.',
            action: '⬇️ Todos toquem o chão agora! Última pessoa bebe!'
        },
        '5': {
            name: 'Rapazes',
            description: 'Todos os rapazes/meninos bebem juntos. Cada jogador do sexo masculino toma um gole ao mesmo tempo.',
            action: '👦 Todos os rapazes bebem juntos! Meninos tomam um gole!'
        },
        '6': {
            name: 'Garotas',
            description: 'Todas as garotas bebem juntas. Cada jogadora do sexo feminino toma um gole ao mesmo tempo.',
            action: '👧 Todas as garotas bebem juntas! Mulheres tomam um gole!'
        },
        '7': {
            name: 'Céu',
            description: 'Todos apontam para o céu/teto imediatamente. Última pessoa a apontar para cima bebe.',
            action: '☝️ Todos apontem para o céu agora! Última pessoa bebe!'
        },
        '8': {
            name: 'Companheiro',
            description: 'Escolha um colega de bebida. Sempre que você beber, ele também deve beber. Esta parceria dura até alguém mais tirar um 8.',
            action: '👫 Escolha seu colega de bebida! Quando você beber, ele bebe também até o próximo 8 ser tirado!'
        },
        '9': {
            name: 'Rima',
            description: 'Diga uma palavra, depois todos se revezam dizendo palavras que rimam. Primeira pessoa que não consegue pensar numa rima ou repete uma palavra faz um desafio.',
            action: '🎵 Comece com uma palavra! Todos se revezem rimando. Sem repetições!'
        },
        '10': {
            name: 'Categorias',
            description: 'Nomeie uma categoria (como animais, cores, etc.), depois todos se revezam nomeando itens dessa categoria. Primeira pessoa que não conseguir pensar em um faz um desafio.',
            action: '📝 Escolha uma categoria! Todos nomeiem itens. Não consegue pensar em um? Faça um desafio!'
        },
        'J': {
            name: 'Criar Regra',
            description: 'Crie uma nova regra que todos devem seguir pelo resto do jogo. Seja criativo! Exemplos: "Sem apontar", "Fale em sotaques", "Sem dizer nomes".',
            action: '📜 Crie uma regra que todos devem seguir! Seja criativo! (por ex: "Sem apontar", "Fale com vozes engraçadas")'
        },
        'Q': {
            name: 'Perguntas',
            description: 'Você só pode fazer perguntas para outros jogadores. Quem responder (em vez de fazer uma pergunta de volta) bebe. Continua até alguém tirar outra Dama.',
            action: '❓ Você só pode fazer perguntas! Quem responder (em vez de fazer uma pergunta de volta) bebe!'
        },
        'K': {
            name: 'Copa do Rei',
            description: 'Despeje um pouco de sua bebida na Copa do Rei no centro. Se este for o 4º Rei, você deve beber a Copa do Rei inteira e o jogo termina!',
            action: '👑 Despeje sua bebida na Copa do Rei! Este é o Rei #{kingNumber}!'
        }
    },
    messages: {
        'Waterfall': 'Cascata - Todos começam a beber! Sigam no sentido horário até a pessoa antes de você parar.',
        'Draw a Card': 'Tirar uma Carta',
        'Game Over!': 'Fim de Jogo!',
        'All 4 Kings have been drawn!': 'Todos os 4 Reis foram tirados!',
        'The final King must drink the Kings Cup!': 'O Rei final deve beber a Copa do Rei!',
        'Thanks for playing!': 'Obrigado por jogar!',
        'King #': 'Rei #',
        'Current King': 'Rei Atual',
        'Click to draw your first card!': 'Clique para tirar sua primeira carta!',
        'Click to draw a card (or press Space)': 'Clique para tirar uma carta (ou pressione Espaço)',
        'Draw next card (or press Space)': 'Tire a próxima carta (ou pressione Espaço)',
        'Start a new game (or press R)': 'Começar um novo jogo (ou pressione R)',
        'New Game': 'Novo Jogo',
        'Empty': 'Vazia',
        'Fourth King! You must drink the entire Kings Cup! Game Over!': 'Quarto Rei! Você deve beber toda a Copa do Rei! Fim de Jogo!',
        'Pour your drink into the Kings Cup! This is the': 'Despeje sua bebida na Copa do Rei! Este é o',
        'King!': 'Rei!',
        'Draw Card': 'Tirar Carta'
    },
    ordinals: ['', '1º', '2º', '3º', '4º']
};

// Setup Portuguese translations quando o jogo estiver pronto
function setupPortugueseTranslations() {
    if (!window.game) {
        // Se o jogo ainda não foi criado, tenta novamente em 100ms
        setTimeout(setupPortugueseTranslations, 100);
        return;
    }

    // Override da função getOrdinal
    window.game.getOrdinal = function(number) {
        return kingsCupTranslations.ordinals[number] || `${number}º`;
    };

    // Traduzir as cardRules
    for (let card in kingsCupTranslations.cardRules) {
        if (window.game.cardRules[card]) {
            window.game.cardRules[card] = {
                ...window.game.cardRules[card],
                ...kingsCupTranslations.cardRules[card]
            };
        }
    }

    // Override da função updateCardContent para traduzir textos dinâmicos
    const originalUpdateCardContent = window.game.updateCardContent;
    window.game.updateCardContent = function(card) {
        const cardValue = document.getElementById('cardValue');
        const cardSuit = document.getElementById('cardSuit');
        const cardValueSmall = document.getElementById('cardValueSmall');
        const cardSuitSmall = document.getElementById('cardSuitSmall');
        const ruleName = document.getElementById('ruleName');
        const ruleText = document.getElementById('ruleText');

        cardValue.textContent = card.value;
        cardSuit.textContent = card.suit;
        cardSuit.className = card.suitClass;
        cardValueSmall.textContent = card.value;
        cardSuitSmall.textContent = card.suit;
        cardSuitSmall.className = card.suitClass;

        const rule = this.cardRules[card.value];
        ruleName.textContent = `${card.value} - ${rule.name}`;

        let actionDescription = rule.action;
        if (card.value === 'K') {
            if (this.kingsDrawn === 4) {
                actionDescription = '👑 ' + kingsCupTranslations.messages['Fourth King! You must drink the entire Kings Cup! Game Over!'] + ' 🍻';
            } else {
                const ordinal = this.getOrdinal(this.kingsDrawn);
                actionDescription = `👑 ${kingsCupTranslations.messages['Pour your drink into the Kings Cup! This is the']} ${ordinal} ${kingsCupTranslations.messages['King!']}`;
            }
        }

        ruleText.innerHTML = actionDescription;
    };

    // Override da função updateKingsCup para traduzir "Empty"
    const originalUpdateKingsCup = window.game.updateKingsCup;
    window.game.updateKingsCup = function() {
        const cupContents = document.getElementById('cupContents');
        if (this.cupContents.length === 0) {
            cupContents.textContent = kingsCupTranslations.messages['Empty'];
        } else if (this.kingsDrawn < 4) {
            const kingCards = this.cupContents.map(card =>
                `<span class="king-card">${card}</span>`
            ).join('');
            cupContents.innerHTML = kingCards;
        }
    };

    // Override da função showGameOver
    const originalShowGameOver = window.game.showGameOver;
    window.game.showGameOver = function() {
        const playingCard = document.getElementById('playingCard');
        const ruleName = document.getElementById('ruleName');
        const ruleText = document.getElementById('ruleText');

        playingCard.classList.add('game-over');

        ruleName.innerHTML = '🎉 ' + kingsCupTranslations.messages['Game Over!'] + ' 🎉';
        ruleText.innerHTML = `
            ${kingsCupTranslations.messages['All 4 Kings have been drawn!']}<br>
            🏆 ${kingsCupTranslations.messages['The final King must drink the Kings Cup!']}<br>
            🎊 ${kingsCupTranslations.messages['Thanks for playing!']}
        `;

        // Add celebration animation
        setTimeout(() => {
            const cupContainer = document.querySelector('.cup-container');
            if (cupContainer) {
                cupContainer.classList.add('celebrate');
            }
        }, 500);
    };

    // Override da função resetGame
    const originalResetGame = window.game.resetGame;
    window.game.resetGame = function() {
        this.deck = [];
        this.drawnCards = [];
        this.kingsDrawn = 0;
        this.gameOver = false;
        this.cupContents = [];
        this.currentPlayer = 1;
        this.gameCount++;

        // Reset display
        const playingCard = document.getElementById('playingCard');
        if (playingCard) {
            playingCard.className = 'playing-card ready';
        }

        const nextButton = document.getElementById('nextButton');
        const resetButton = document.getElementById('resetButton');
        if (nextButton) nextButton.style.display = 'none';
        if (resetButton) resetButton.style.display = 'none';

        // Reset card content with Portuguese text
        const ruleName = document.getElementById('ruleName');
        const ruleText = document.getElementById('ruleText');
        const cardValue = document.getElementById('cardValue');
        const cardSuit = document.getElementById('cardSuit');
        const cardValueSmall = document.getElementById('cardValueSmall');
        const cardSuitSmall = document.getElementById('cardSuitSmall');

        if (ruleName) ruleName.textContent = kingsCupTranslations.messages['Draw Card'];
        if (ruleText) ruleText.textContent = kingsCupTranslations.messages['Click to draw your first card!'];
        if (cardValue) cardValue.textContent = '?';
        if (cardSuit) {
            cardSuit.textContent = '🃏';
            cardSuit.className = '';
        }
        if (cardValueSmall) cardValueSmall.textContent = '?';
        if (cardSuitSmall) {
            cardSuitSmall.textContent = '🃏';
            cardSuitSmall.className = '';
        }

        // Remove celebration class
        const cupContainer = document.querySelector('.cup-container');
        if (cupContainer) {
            cupContainer.classList.remove('celebrate');
        }

        this.initializeGame();
    };

    // Atualizar tooltips - apenas se os elementos existirem
    const playingCard = document.getElementById('playingCard');
    if (playingCard) {
        playingCard.title = kingsCupTranslations.messages['Click to draw a card (or press Space)'];
    }

    const nextButton = document.getElementById('nextButton');
    if (nextButton) {
        nextButton.title = kingsCupTranslations.messages['Draw next card (or press Space)'];
    }

    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
        resetButton.title = kingsCupTranslations.messages['Start a new game (or press R)'];
    }

    // Adicionar ao cupContents vazio
    const cupContents = document.getElementById('cupContents');
    if (cupContents && cupContents.textContent === 'Empty') {
        cupContents.textContent = kingsCupTranslations.messages['Empty'];
    }
}

// Chamar a função de setup assim que o script carregar
// Usar setTimeout para garantir que o jogo foi criado
setTimeout(setupPortugueseTranslations, 100);

if (typeof window !== 'undefined') {
    window.kingsCupTranslations = kingsCupTranslations;
}
