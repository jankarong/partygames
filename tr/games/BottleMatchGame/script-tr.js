// Bottle Match Game - Turkish helper translations
const translations = {
    colors: {
        Red: 'Kirmizi',
        Blue: 'Mavi',
        Green: 'Yesil',
        Yellow: 'Sari',
        Purple: 'Mor',
        Orange: 'Turuncu',
        Brown: 'Kahverengi',
        Pink: 'Pembe'
    },
    messages: {
        'Drag bottles to swap positions, or click to select:': 'Yer degistirmek icin siseleri surukleyin veya secmek icin tiklayin:',
        'Click a color to select:': 'Secmek icin bir renge tiklayin:',
        'Please complete your guess sequence!': 'Lutfen tahmin dizisini tamamlayin!',
        'Congratulations!': 'Tebrikler!',
        'Guess Feedback': 'Tahmin Geri Bildirimi',
        'Correct position and color:': 'Dogru pozisyon ve renk:',
        'Correct color, wrong position:': 'Dogru renk, yanlis pozisyon:',
        'Level Complete!': 'Seviye Tamamlandi!',
        'Attempts:': 'Deneme:',
        'Time:': 'Sure:',
        seconds: 'saniye',
        "Keep guessing, you're getting closer!": 'Tahmine devam et, yaklasiyorsun!',
        'Next Level': 'Sonraki Seviye',
        Continue: 'Devam Et',
        'Game Over': 'Oyun Bitti',
        'You won!': 'Kazandin!'
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const colorElements = document.querySelectorAll('[data-color]');
    colorElements.forEach((el) => {
        const colorName = el.getAttribute('data-color');
        if (translations.colors[colorName]) {
            el.textContent = translations.colors[colorName];
        }
    });

    const messageElements = document.querySelectorAll('.message, .feedback, .title, h1, h2, h3');
    messageElements.forEach((el) => {
        for (const [en, tr] of Object.entries(translations.messages)) {
            if (el.textContent.includes(en)) {
                el.textContent = el.textContent.replace(en, tr);
            }
        }
    });
});
