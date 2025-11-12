// Last Shot - Portuguese (PT-BR) Translation
const lastShotTranslations = {
    messages: {
        'Sound OFF': '🔇 Som DESLIGADO',
        'Sound ON': '🔊 Som LIGADO',
        'Maximum 100 chambers allowed! Please reduce the number of blank chambers.': 'Máximo de 100 câmaras permitido! Por favor, reduza o número de câmaras vazias.',
        'You need at least 1 blank chamber!': 'Você precisa de pelo menos 1 câmara vazia!',
        'Game ready! First player, press Space to pull.': 'Jogo pronto! Primeiro jogador, pressione Espaço para puxar.',
        'Game ready! First player, click "Pull Trigger".': 'Jogo pronto! Primeiro jogador, clique em "Puxar Gatilho".',
        'BLANK! You\'re safe... for now.': '🔘 VAZIO! Você está seguro... por enquanto.',
        'BULLET! Drink all': '💥 BALA! Beba todos os',
        'shots': 'shots',
        'Shot added!': '🥃 Shot adicionado!',
        'Pool now has': 'O pote agora tem',
        'Next player\'s turn! Click "Pull Trigger".': 'Vez do próximo jogador! Clique em "Puxar Gatilho".',
        'Chamber': 'Câmara',
        'Lucky escape! No shots in the pool! Ready for a new round?': '💥 Escapou por pouco! Não há shots no pote! Pronto para uma nova rodada?',
        'Game Over! Drink': '💥 Fim de Jogo! Beba',
        'and start a new round when ready!': 'e comece uma nova rodada quando estiver pronto!',
        'Ready for a new round?': 'Pronto para uma nova rodada?',
        'New round started! First player, click "Pull Trigger"!': 'Nova rodada iniciada! Primeiro jogador, clique em "Puxar Gatilho"!',
        'New Round': 'Nova Rodada',
        'Pull Trigger': 'Puxar Gatilho',
        'Blank Chambers': 'Câmaras Vazias',
        'Bullet Chambers': 'Câmaras com Bala',
        'Shots in Pool': 'Shots no Pote'
    }
};

// Override window.alert to translate validation messages
if (typeof window !== 'undefined') {
    window.lastShotTranslations = lastShotTranslations;

    // Store original alert function
    const originalAlert = window.alert;

    // Override alert to translate messages
    window.alert = function(message) {
        for (const [en, pt] of Object.entries(lastShotTranslations.messages)) {
            if (message === en || message.includes(en)) {
                message = message.replace(en, pt);
                break;
            }
        }
        originalAlert.call(window, message);
    };

    // Apply translations to elements after DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Wait for game to be created, then apply translations
        setTimeout(function() {
            applyTranslations();
        }, 500);
    });

    function applyTranslations() {
        // Only translate game-specific content, not the entire page
        // This prevents interfering with navigation elements

        // Translate result display elements
        const resultDisplay = document.getElementById('resultDisplay');
        const resultText = document.getElementById('resultText');

        if (resultText) {
            for (const [en, pt] of Object.entries(lastShotTranslations.messages)) {
                if (resultText.textContent && resultText.textContent.includes(en)) {
                    resultText.textContent = resultText.textContent.replace(en, pt);
                }
            }
        }

        // Translate game-specific buttons only
        const gameSpecificSelectors = [
            '#triggerButton',
            '#newRoundButton',
            '#muteButton',
            '#addShotButton'
        ];

        gameSpecificSelectors.forEach(selector => {
            const el = document.querySelector(selector);
            if (el) {
                for (const [en, pt] of Object.entries(lastShotTranslations.messages)) {
                    if (el.textContent && el.textContent.includes(en)) {
                        el.textContent = el.textContent.replace(en, pt);
                    }
                    if (el.title && el.title.includes(en)) {
                        el.title = el.title.replace(en, pt);
                    }
                }
            }
        });

        // Translate labels and inputs in game configuration section
        const gameSection = document.querySelector('.game-container') || document.querySelector('.container');
        if (gameSection) {
            const labels = gameSection.querySelectorAll('label');
            labels.forEach(label => {
                for (const [en, pt] of Object.entries(lastShotTranslations.messages)) {
                    if (label.textContent && label.textContent.includes(en)) {
                        label.textContent = label.textContent.replace(en, pt);
                    }
                }
            });

            const inputs = gameSection.querySelectorAll('input');
            inputs.forEach(input => {
                if (input.placeholder) {
                    for (const [en, pt] of Object.entries(lastShotTranslations.messages)) {
                        if (input.placeholder.includes(en)) {
                            input.placeholder = input.placeholder.replace(en, pt);
                        }
                    }
                }
                if (input.title) {
                    for (const [en, pt] of Object.entries(lastShotTranslations.messages)) {
                        if (input.title.includes(en)) {
                            input.title = input.title.replace(en, pt);
                        }
                    }
                }
            });
        }
    }
}
