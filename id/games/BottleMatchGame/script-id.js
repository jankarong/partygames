// Bottle Match Game - Indonesian (ID) Translation
const translations = {
    colors: {
        'Red': 'Merah',
        'Blue': 'Biru',
        'Green': 'Hijau',
        'Yellow': 'Kuning',
        'Purple': 'Ungu',
        'Orange': 'Oranye',
        'Brown': 'Coklat',
        'Pink': 'Merah Muda'
    },
    messages: {
        'Drag bottles to swap positions, or click to select:': 'Seret botol untuk menukar posisi, atau klik untuk memilih:',
        'Click a color to select:': 'Klik warna untuk memilih:',
        'Please complete your guess sequence!': 'Silakan lengkapi urutan tebakan Anda!',
        'Congratulations!': 'Selamat!',
        'Guess Feedback': 'Umpan Balik Tebakan',
        'Correct position and color:': 'Posisi dan warna yang benar:',
        'Correct color, wrong position:': 'Warna benar, posisi salah:',
        'Level Complete!': 'Level Selesai!',
        'Attempts:': 'Percobaan:',
        'Time:': 'Waktu:',
        'seconds': 'detik',
        'Keep guessing, you\'re getting closer!': 'Terus menebak, Anda semakin dekat!',
        'Next Level': 'Level Berikutnya',
        'Continue': 'Lanjutkan',
        'Game Over': 'Permainan Berakhir',
        'You won!': 'Anda menang!'
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
    const messageElements = document.querySelectorAll('.message, .feedback, .title, h1, h2, h3');
    messageElements.forEach(el => {
        for (const [en, id] of Object.entries(translations.messages)) {
            if (el.textContent.includes(en)) {
                el.textContent = el.textContent.replace(en, id);
            }
        }
    });
});
