/**
 * Komponen navigasi permainan (Versi Indonesia)
 * Menyediakan navigasi yang ditingkatkan antar permainan, termasuk menu mengambang dan bilah akses cepat
 */

class GameNavigation {
    constructor() {
        this.games = [
            { name: 'Bola Ajaib 8', url: '/id/games/magic8ball/magic8ball.html', category: 'solo' },
            { name: 'Jujur atau Berani', url: '/id/games/TruthorDare/TruthOrDare.html', category: 'party' },
            { name: 'Tidak Pernah Saya', url: '/id/games/NeverHaveIEver/NeverHaveIEver.html', category: 'party' },
            { name: 'Siapa yang Paling Mungkin', url: '/id/games/WhoIsMostLikely/WhoIsMostLikely.html', category: 'party' },
            { name: 'Lebih Suka Mana', url: '/id/games/WouldYouRather/WouldYouRather.html', category: 'party' },
            { name: 'Mafia', url: '/id/games/mafia/mafia.html', category: 'strategy' },
            { name: 'Penyamaran', url: '/id/games/undercover/undercover.html', category: 'strategy' },
            { name: 'Tebak Gerakan', url: '/id/games/charades/charades.html', category: 'party' },
            { name: 'Tebak Kata', url: '/id/games/hedbanzgame/hedbanzgame.html', category: 'party' },
            { name: 'Dadu Intim', url: '/id/games/sexdice/sexdice.html', category: 'adult' },
            { name: 'Nomor Bir', url: '/id/games/beernumber/beernumber.html', category: 'drinking' },
            { name: 'Piala Raja', url: '/id/games/KingsCup/KingsCup.html', category: 'drinking' }
        ];

        this.currentGame = this.getCurrentGame();
        this.init();
    }

    getCurrentGame() {
        const path = window.location.pathname;
        return this.games.find(game => path.includes(game.url.split('/').pop().replace('.html', ''))) || null;
    }

    init() {
        this.createFloatingNav();
        this.createQuickAccessBar();
        this.makeLogosClickable();
        this.bindEvents();
        this.startPulseReminder();
        this.initAuth();
    }

    createFloatingNav() {
        const floatingNav = document.createElement('div');
        floatingNav.className = 'floating-nav';
        floatingNav.innerHTML = `
            <button class="nav-toggle" id="navToggle">
                <i class="fas fa-gamepad"></i>
            </button>
            <div class="nav-menu" id="navMenu">
                <h4><i class="fas fa-dice"></i> Permainan Lainnya</h4>
                <div class="game-links" id="gameLinks">
                    ${this.games.map(game => `
                        <a href="${game.url}" class="game-link ${game === this.currentGame ? 'current' : ''}"
                           data-category="${game.category}">
                            ${game.name}
                        </a>
                    `).join('')}
                </div>
                <div class="nav-actions">
                    <a href="/id/index.html">
                        <i class="fas fa-home"></i> Semua Permainan
                    </a>
                    <a href="/id/feedback.html">
                        <i class="fas fa-comment"></i> Umpan Balik
                    </a>
                    <a href="/id/TheList.html">
                        <i class="fas fa-list"></i> Daftar Permainan
                    </a>
                    <a href="/id/premium.html" class="premium-highlight">
                        <i class="fas fa-crown"></i> Premium
                    </a>
                    <div class="auth-section">
                        <div class="auth-buttons" id="nav-auth-buttons">
                            <a href="/login.html" class="auth-link login-link">
                                <i class="fas fa-sign-in-alt"></i><span>Masuk</span>
                            </a>
                            <a href="/register.html" class="auth-link register-link">
                                <i class="fas fa-user-plus"></i><span>Daftar</span>
                            </a>
                        </div>
                        <div class="user-info-nav" id="nav-user-info" style="display: none;">
                            <div class="user-details-nav">
                                <div class="user-avatar-nav" id="nav-user-avatar">U</div>
                                <div class="user-text">
                                    <div class="user-email-nav" id="nav-user-email">user@example.com</div>
                                    <span class="premium-status-nav" id="nav-premium-status">Pengguna Gratis</span>
                                </div>
                            </div>
                            <button class="signout-btn" onclick="handleSignOut()">
                                <i class="fas fa-sign-out-alt"></i><span>Keluar</span>
                            </button>
                        </div>
                    </div>
                    <div class="language-dropdown">
                        <button class="language-toggle">
                            <i class="fas fa-globe"></i> 🇮🇩 Bahasa Indonesia
                        </button>
                        <div class="language-menu">
                            <a href="#" class="language-link" data-lang="en">🇺🇸 English</a>
                            <a href="#" class="language-link" data-lang="zh">🇨🇳 中文</a>
                            <a href="#" class="language-link" data-lang="de">🇩🇪 Deutsch</a>
                            <a href="#" class="language-link" data-lang="fr">🇫🇷 Français</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(floatingNav);
    }

    createQuickAccessBar() {
        const popularGames = this.games.filter(game =>
            ['party', 'strategy'].includes(game.category) && game !== this.currentGame
        ).slice(0, 4);

        if (popularGames.length > 0) {
            const quickBar = document.createElement('div');
            quickBar.className = 'quick-games-bar';
            quickBar.id = 'quickAccessBar';
            quickBar.innerHTML = `
                <button id="quick-access-toggle"><i class="fas fa-layer-group"></i></button>
                <a href="/id/index.html" class="quick-game-btn home-btn"><i class="fas fa-home"></i> Beranda</a>
                <a href="/id/premium.html" class="quick-game-btn premium-btn premium-highlight"><i class="fas fa-crown"></i> Premium</a>
                <span id="try-text" style="color: rgba(255,255,255,0.7); font-size: 12px;">Coba:</span>
                ${popularGames.map(game => `
                    <a href="${game.url}" class="quick-game-btn">${game.name}</a>
                `).join('')}
            `;
            document.body.appendChild(quickBar);
        }
    }

    makeLogosClickable() {
        // Temukan logo permainan dan buat dapat diklik
        const logos = document.querySelectorAll('.game-logo, .logo-container img, img[alt*="Logo"], img[src*="logo"], img[src*="Logo"]');

        logos.forEach(logo => {
            if (!logo.closest('a')) { // hanya jika tidak ada di dalam tautan
                logo.style.cursor = 'pointer';
                logo.addEventListener('click', () => {
                    window.location.href = '/id/index.html';
                });

                // Tambahkan efek hover
                logo.addEventListener('mouseenter', () => {
                    logo.style.opacity = '0.8';
                    logo.style.transform = 'scale(1.05)';
                    logo.style.transition = 'all 0.2s ease';
                });

                logo.addEventListener('mouseleave', () => {
                    logo.style.opacity = '1';
                    logo.style.transform = 'scale(1)';
                });
            }
        });
    }

    bindEvents() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const quickAccessBar = document.getElementById('quickAccessBar');
        const quickAccessToggle = document.getElementById('quick-access-toggle');

        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('show');
        });

        if (quickAccessToggle) {
            quickAccessToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                quickAccessBar.classList.toggle('open');
            });
        }

        // Tutup menu saat klik di luar
        document.addEventListener('click', (e) => {
            if (navMenu && !e.target.closest('.floating-nav')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('show');
            }
            if (quickAccessBar && !e.target.closest('#quickAccessBar')) {
                quickAccessBar.classList.remove('open');
            }
        });

        // Fungsi menu dropdown bahasa
        const languageToggle = document.querySelector('.language-toggle');
        const languageMenu = document.querySelector('.language-menu');

        if (languageToggle && languageMenu) {
            languageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                languageMenu.classList.toggle('show');
            });

            // Tutup menu bahasa saat klik di luar
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.language-dropdown')) {
                    languageMenu.classList.remove('show');
                }
            });

            // Tangani pergantian bahasa
            document.querySelectorAll('.language-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.switchLanguage(link.dataset.lang);
                });
            });
        }

        // Lacak klik navigasi untuk analitik
        document.querySelectorAll('.game-link, .quick-game-btn').forEach(link => {
            link.addEventListener('click', () => {
                this.trackNavigation(link.textContent.trim());
            });
        });
    }

    startPulseReminder() {
        // Tambahkan efek denyut untuk menarik perhatian setelah pengguna di halaman selama 30 detik
        setTimeout(() => {
            const navToggle = document.getElementById('navToggle');
            if (navToggle && !navToggle.classList.contains('active')) {
                navToggle.classList.add('pulse');

                // Hapus denyut setelah interaksi
                navToggle.addEventListener('click', () => {
                    navToggle.classList.remove('pulse');
                }, { once: true });
            }
        }, 30000);
    }

    switchLanguage(lang) {
        const currentPath = window.location.pathname;
        let newPath;

        // Permainan yang hanya tersedia dalam bahasa Inggris
        const englishOnlyGames = ['charades2', 'findthespy', 'numberguess'];
        const isEnglishOnly = englishOnlyGames.some(game => currentPath.includes(game));

        if (lang === 'zh') {
            // Beralih ke versi Mandarin
            if (currentPath.startsWith('/zh/')) {
                // Sudah di versi Mandarin
                return;
            }
            // Jika permainan ini hanya tersedia dalam bahasa Inggris, pergi ke beranda Mandarin
            if (isEnglishOnly) {
                newPath = '/zh/index.html';
            } else {
                // Hapus /de/, /fr/, dan /id/ jika ada, lalu tambahkan /zh/
                newPath = '/zh' + currentPath.replace('/de/', '/').replace('/fr/', '/').replace('/id/', '/');
            }
        } else if (lang === 'de') {
            // Beralih ke versi Jerman
            if (currentPath.startsWith('/de/')) {
                // Sudah di versi Jerman
                return;
            }
            // Jika permainan ini hanya tersedia dalam bahasa Inggris, pergi ke beranda Jerman
            if (isEnglishOnly) {
                newPath = '/de/index.html';
            } else {
                // Hapus /zh/, /fr/, dan /id/ jika ada, lalu tambahkan /de/
                newPath = '/de' + currentPath.replace('/zh/', '/').replace('/fr/', '/').replace('/id/', '/');
            }
        } else if (lang === 'fr') {
            // Beralih ke versi Prancis
            if (currentPath.startsWith('/fr/')) {
                // Sudah di versi Prancis
                return;
            }
            // Jika permainan ini hanya tersedia dalam bahasa Inggris, pergi ke beranda Prancis
            if (isEnglishOnly) {
                newPath = '/fr/index.html';
            } else {
                // Hapus /de/, /zh/, dan /id/ jika ada, lalu tambahkan /fr/
                newPath = '/fr' + currentPath.replace('/de/', '/').replace('/zh/', '/').replace('/id/', '/');
            }
        } else if (lang === 'id') {
            // Beralih ke versi Indonesia
            if (currentPath.startsWith('/id/')) {
                // Sudah di versi Indonesia
                return;
            }
            // Jika permainan ini hanya tersedia dalam bahasa Inggris, pergi ke beranda Indonesia
            if (isEnglishOnly) {
                newPath = '/id/index.html';
            } else {
                // Hapus /de/, /zh/, dan /fr/ jika ada, lalu tambahkan /id/
                newPath = '/id' + currentPath.replace('/de/', '/').replace('/zh/', '/').replace('/fr/', '/');
            }
        } else {
            // Beralih ke versi Inggris
            if (!currentPath.startsWith('/zh/') && !currentPath.startsWith('/de/') && !currentPath.startsWith('/fr/') && !currentPath.startsWith('/id/')) {
                // Sudah di versi Inggris
                return;
            }
            newPath = currentPath.replace('/zh', '').replace('/de', '').replace('/fr', '').replace('/id', '');
        }

        window.location.href = newPath;
    }

    trackNavigation(gameName) {
        // Pelacakan analitik (dapat diintegrasikan dengan Google Analytics atau alat lainnya)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'game_navigation', {
                'game_name': gameName,
                'source_game': this.currentGame?.name || 'unknown'
            });
        }
        console.log(`Navigasi: ${this.currentGame?.name || 'unknown'} -> ${gameName}`);
    }

    // Metode untuk menampilkan rekomendasi permainan berdasarkan permainan saat ini
    showRecommendations() {
        if (!this.currentGame) return;

        const related = this.games.filter(game =>
            game.category === this.currentGame.category && game !== this.currentGame
        ).slice(0, 3);

        if (related.length > 0) {
            this.showRecommendationModal(related);
        }
    }

    showRecommendationModal(games) {
        const modal = document.createElement('div');
        modal.className = 'recommendation-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Anda mungkin juga menyukai...</h3>
                <div class="recommended-games">
                    ${games.map(game => `
                        <a href="${game.url}" class="recommended-game">
                            <span>${game.name}</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    `).join('')}
                </div>
                <button class="close-modal">Nanti Dulu</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Hapus otomatis setelah 10 detik
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 10000);

        // Klik untuk menutup
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
    }

    // Metode yang dipanggil saat permainan selesai
    onGameEnd() {
        setTimeout(() => {
            this.showRecommendations();
        }, 2000);
    }

    // Inisialisasi fitur autentikasi
    initAuth() {
        // Tunggu hingga auth manager tersedia
        if (window.authManager) {
            this.setupAuthUI();
            window.authManager.onAuthStateChange((event, session) => {
                this.updateAuthUI(session);
            });
        } else {
            // Coba lagi setelah jeda singkat
            setTimeout(() => this.initAuth(), 100);
        }
    }

    // Siapkan UI autentikasi
    setupAuthUI() {
        if (window.authManager && window.authManager.isAuthenticated()) {
            this.updateAuthUI({ user: window.authManager.getCurrentUser() });
        }
    }

    // Perbarui UI autentikasi berdasarkan status pengguna
    updateAuthUI(session) {
        const authButtons = document.getElementById('nav-auth-buttons');
        const userInfo = document.getElementById('nav-user-info');

        if (!authButtons || !userInfo) return;

        if (session && session.user) {
            // Pengguna sudah masuk
            authButtons.style.display = 'none';
            userInfo.style.display = 'block';

            const userEmail = document.getElementById('nav-user-email');
            const userAvatar = document.getElementById('nav-user-avatar');
            const premiumStatus = document.getElementById('nav-premium-status');

            if (userEmail) userEmail.textContent = session.user.email;
            if (userAvatar) userAvatar.textContent = session.user.email.charAt(0).toUpperCase();

            // Periksa status premium
            if (window.authManager && window.authManager.checkUserPremiumStatus) {
                window.authManager.checkUserPremiumStatus().then(isPremium => {
                    if (premiumStatus) {
                        premiumStatus.textContent = isPremium ? 'Anggota Premium' : 'Pengguna Gratis';
                        premiumStatus.className = isPremium ? 'premium-status-nav premium' : 'premium-status-nav free';
                    }
                });
            }
        } else {
            // Pengguna belum masuk
            authButtons.style.display = 'block';
            userInfo.style.display = 'none';
        }
    }
}

// Inisialisasi otomatis saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
    window.gameNavigation = new GameNavigation();
});

// Ekspos metode untuk digunakan oleh permainan
window.GameNavigationAPI = {
    showRecommendations: () => window.gameNavigation?.showRecommendations(),
    onGameEnd: () => window.gameNavigation?.onGameEnd()
};
