// Bottle Match Game - Portuguese (PT-BR) Translation
const translations = {
    colors: {
        'Red': 'Vermelho',
        'Blue': 'Azul',
        'Green': 'Verde',
        'Yellow': 'Amarelo',
        'Purple': 'Roxo',
        'Orange': 'Laranja',
        'Brown': 'Marrom',
        'Pink': 'Rosa'
    },
    messages: {
        'Drag bottles to swap positions, or click to select:': 'Arraste garrafas para trocar posições, ou clique para selecionar:',
        'Click a color to select:': 'Clique em uma cor para selecionar:',
        'Please complete your guess sequence!': 'Por favor, complete sua sequência de palpite!',
        'Congratulations!': 'Parabéns!',
        'Guess Feedback': 'Resultado do Palpite',
        'Correct position and color:': 'Posição e cor corretas:',
        'Correct color, wrong position:': 'Cor correta, posição errada:',
        'Level Complete!': 'Nível Completo!',
        'Attempts:': 'Tentativas:',
        'Time:': 'Tempo:',
        'seconds': 'segundos',
        'Keep guessing, you\'re getting closer!': 'Continue tentando, você está chegando perto!',
        'Next Level': 'Próximo Nível',
        'Continue': 'Continuar',
        'Game Over': 'Fim de Jogo',
        'You won!': 'Você venceu!'
    }
};

// Apply translations to the page
document.addEventListener('DOMContentLoaded', function() {
    // Translate color options
    const colorElements = document.querySelectorAll('[data-color]');
    colorElements.forEach(el => {
        const colorName = el.getAttribute('data-color');
        if (translations.colors[colorName]) {
            el.textContent = translations.colors[colorName];
        }
    });

    // Translate messages
    const messageElements = document.querySelectorAll('.message, .feedback, .title, h2, h3');
    messageElements.forEach(el => {
        for (const [en, pt] of Object.entries(translations.messages)) {
            if (el.textContent.includes(en)) {
                el.textContent = el.textContent.replace(en, pt);
            }
        }
    });
});
