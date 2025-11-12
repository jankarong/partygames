// Mafia Game - Portuguese (PT-BR) Translation
const mafiaTranslations = {
    roles: {
        'Mafia': 'Máfia',
        'Villager': 'Aldeão',
        'Doctor': 'Médico',
        'Detective': 'Detetive'
    },
    roleDescriptions: {
        'Mafia': 'Elimine os aldeões sem ser pego',
        'Villager': 'Encontre e elimine a Máfia',
        'Doctor': 'Salve uma pessoa durante o jogo',
        'Detective': 'Investigue a identidade de um jogador a cada noite'
    },
    messages: {
        'Minimum 3 players required': 'Mínimo de 3 jogadores necessário',
        'Need at least 1 villager': 'Precisa de pelo menos 1 aldeão',
        'Need at least 1 mafia': 'Precisa de pelo menos 1 máfia',
        'open your eyes and make your selection.': 'abra seus olhos e faça sua seleção.',
        'is a Mafia member!': 'é um membro da Máfia!',
        'is not a Mafia member.': 'não é um membro da Máfia.',
        'was targeted by the Mafia.': 'foi alvo da Máfia.',
        'Last night, Player': 'Na última noite, Jogador',
        'was eliminated.': 'foi eliminado.',
        'No one was eliminated last night.': 'Ninguém foi eliminado na última noite.',
        'Alive': 'Vivo',
        'Dead': 'Morto',
        'Please select a player to vote for!': 'Por favor, selecione um jogador para votar!',
        'has been eliminated by vote!': 'foi eliminado por votação!',
        'Game Over!': 'Fim de Jogo!',
        'Win!': 'Vence!',
        'Mafia Team': 'Equipe Máfia',
        'Villager Team': 'Equipe Aldeões',
        'Night Phase': 'Fase Noturna',
        'Day Phase': 'Fase Diurna',
        'Voting': 'Votação',
        'Click to Vote': 'Clique para Votar',
        'Player': 'Jogador',
        'Role': 'Papel',
        'Role doesn\'t match player count': 'Total de papéis não corresponde ao número de jogadores',
        'Player Count': 'Número de Jogadores',
        'Total Players': 'Total de Jogadores',
        'Setup Game': 'Configurar Jogo',
        'Start Game': 'Iniciar Jogo',
        'Manage Custom Roles': 'Gerenciar Papéis Personalizados',
        'Create Custom Role': 'Criar Papel Personalizado',
        'Back to Setup': 'Voltar para Configuração',
        'Return to Setup': 'Retornar para Configuração',
        'Start New Game': 'Iniciar Novo Jogo',
        'Confirm Selection': 'Confirmar Seleção',
        'Save Player': 'Salvar Jogador',
        'Poison Player': 'Envenenar Jogador',
        'Skip Action': 'Pular Ação',
        'Continue': 'Continuar',
        'Discuss': 'Discutir',
        'End Discussion': 'Encerrar Discussão',
        'Vote': 'Votar',
        'Yes': 'Sim',
        'No': 'Não',
        'Copy': 'Copiar',
        'Copied!': 'Copiado!',
        'Copy Role Info': 'Copiar Info do Papel',
        'Night Ability': 'Habilidade Noturna',
        'Role Team': 'Equipe do Papel',
        'Role Name': 'Nome do Papel',
        'Role Description': 'Descrição do Papel',
        'Team': 'Equipe',
        'Mafia': 'Máfia',
        'Village': 'Aldeia',
        'Create Role': 'Criar Papel',
        'Delete': 'Deletar',
        'Role created successfully': 'Papel criado com sucesso',
        'Please fill in all fields': 'Por favor, preencha todos os campos'
    }
};

// Store original alert function
const originalAlert = window.alert;

// Override alert to translate messages
if (typeof window !== 'undefined') {
    window.alert = function(message) {
        for (const [en, pt] of Object.entries(mafiaTranslations.messages)) {
            if (message === en || message.includes(en)) {
                message = message.replace(en, pt);
                break;
            }
        }
        originalAlert.call(window, message);
    };

    window.mafiaTranslations = mafiaTranslations;
}

// Apply translations to elements after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        applyTranslations();
    }, 500);
});

function applyTranslations() {
    // Only translate game-specific content, not the entire page
    // This prevents interfering with navigation elements

    // Translate role selects and options
    const roleSelects = document.querySelectorAll('select');
    roleSelects.forEach(select => {
        const options = select.querySelectorAll('option');
        options.forEach(option => {
            for (const [en, pt] of Object.entries(mafiaTranslations.roles)) {
                if (option.textContent === en) {
                    option.textContent = pt;
                }
            }
            for (const [en, pt] of Object.entries(mafiaTranslations.messages)) {
                if (option.textContent === en) {
                    option.textContent = pt;
                }
            }
        });
    });

    // Translate game-specific containers only
    const gameContainer = document.querySelector('.game-container') || document.querySelector('.container');
    if (gameContainer) {
        // Translate buttons
        const buttons = gameContainer.querySelectorAll('button');
        buttons.forEach(btn => {
            for (const [en, pt] of Object.entries(mafiaTranslations.messages)) {
                if (btn.textContent && btn.textContent.includes(en)) {
                    btn.textContent = btn.textContent.replace(en, pt);
                }
                if (btn.title && btn.title.includes(en)) {
                    btn.title = btn.title.replace(en, pt);
                }
            }
        });

        // Translate labels
        const labels = gameContainer.querySelectorAll('label');
        labels.forEach(label => {
            for (const [en, pt] of Object.entries(mafiaTranslations.messages)) {
                if (label.textContent && label.textContent.includes(en)) {
                    label.textContent = label.textContent.replace(en, pt);
                }
            }
        });

        // Translate inputs
        const inputs = gameContainer.querySelectorAll('input');
        inputs.forEach(input => {
            if (input.placeholder) {
                for (const [en, pt] of Object.entries(mafiaTranslations.messages)) {
                    if (input.placeholder.includes(en)) {
                        input.placeholder = input.placeholder.replace(en, pt);
                    }
                }
            }
            if (input.title) {
                for (const [en, pt] of Object.entries(mafiaTranslations.messages)) {
                    if (input.title.includes(en)) {
                        input.title = input.title.replace(en, pt);
                    }
                }
            }
        });

        // Translate other text in game container
        const gameElements = gameContainer.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div');
        gameElements.forEach(el => {
            // Only translate elements that are direct children or within the game container
            // Skip navigation-related elements
            if (!el.classList.contains('nav') && !el.classList.contains('navbar') && !el.id.includes('nav')) {
                for (const [en, pt] of Object.entries(mafiaTranslations.messages)) {
                    if (el.textContent && el.childNodes.length > 0) {
                        // Only translate if this is a text node, not if it contains children
                        for (let node of el.childNodes) {
                            if (node.nodeType === 3 && node.textContent.includes(en)) {
                                node.textContent = node.textContent.replace(en, pt);
                            }
                        }
                    }
                }
            }
        });
    }
}
