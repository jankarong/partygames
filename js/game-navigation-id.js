/**
 * Komponen Navigasi Game (Versi Indonesia)
 * Menyediakan navigasi yang ditingkatkan antar game dengan menu mengambang dan bilah akses cepat
 */

class GameNavigation {
    constructor() {
        this.games = [
            { name: 'Bola Ajaib 8', url: '/id/games/magic8ball/magic8ball', category: 'solo' },
            { name: 'Kebenaran atau Tantangan', url: '/id/games/TruthorDare/TruthOrDare', category: 'party' },
            { name: 'Saya Tidak Pernah', url: '/id/games/NeverHaveIEver/NeverHaveIEver', category: 'party' },
            { name: 'Siapa yang Paling Mungkin', url: '/id/games/WhoIsMostLikely/WhoIsMostLikely', category: 'party' },
            { name: 'Lebih Suka Mana', url: '/id/games/WouldYouRather/WouldYouRather', category: 'party' },
            
            { name: 'Pertanyaan Paranoia Pedas', url: '/id/games/paranoiaquestionsdirty/paranoiaquestionsdirty', category: 'adult' },
            { name: 'Mafia', url: '/id/games/mafia/mafia', category: 'strategy' },
            { name: 'Undercover', url: '/id/games/undercover/undercover', category: 'strategy' },
            { name: 'Charades', url: '/id/games/charades/charades', category: 'party' },
            { name: 'Hedbanz', url: '/id/games/hedbanzgame/hedbanzgame', category: 'party' },
            { name: 'Dadu Seks', url: '/id/games/sexdice/sexdice', category: 'adult' },
            { name: 'Tebak Angka', url: '/id/games/beernumber/beernumber', category: 'drinking' },
            { name: 'Gelas Raja', url: '/id/games/KingsCup/KingsCup', category: 'drinking' }
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
                <h4><i class="fas fa-dice"></i> Game Lainnya</h4>
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
                        <i class="fas fa-home"></i> Semua Game
                    </a>
                    <a href="/id/TheList.html">
                        <i class="fas fa-list"></i> Daftar
                    </a>
                    <a href="/id/premium.html" class="premium-highlight">
                        <i class="fas fa-crown"></i> Premium
                    </a>
                    <div class="auth-section">
                        <div class="auth-buttons" id="nav-auth-buttons">
                            <a href="/id/login.html" class="auth-link login-link">
                                <i class="fas fa-sign-in-alt"></i><span>Masuk</span>
                            </a>
                            <a href="/id/register.html" class="auth-link register-link">
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
                            <a href="#" class="language-link" data-lang="en">English</a>
                            <a href="#" class="language-link" data-lang="ru">Russian</a>
                            <a href="#" class="language-link" data-lang="pt">Portuguese</a>
                            <a href="#" class="language-link" data-lang="zh">Chinese</a>
                            <a href="#" class="language-link" data-lang="de">German</a>
                            <a href="#" class="language-link" data-lang="fr">French</a>
                            <a href="#" class="language-link" data-lang="id">Indonesian</a>
                            <a href="#" class="language-link" data-lang="tr">Turkish</a>
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
        // Temukan logo game dan buat dapat diklik
        const logos = document.querySelectorAll('.game-logo, .logo-container img, img[alt*="Logo"], img[src*="logo"], img[src*="Logo"]');

        logos.forEach(logo => {
            if (!logo.closest('a')) { // Hanya jika belum dalam link
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

        // Fungsionalitas dropdown bahasa
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

            // Tangani perubahan bahasa
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
        // Tambahkan efek pulse untuk menarik perhatian setelah 30 detik
        setTimeout(() => {
            const navToggle = document.getElementById('navToggle');
            if (navToggle && !navToggle.classList.contains('active')) {
                navToggle.classList.add('pulse');

                // Hapus pulse setelah interaksi
                navToggle.addEventListener('click', () => {
                    navToggle.classList.remove('pulse');
                }, { once: true });
            }
        }, 30000);
    }

            switchLanguage(lang) {
        const currentPath = window.location.pathname;
        let newPath;

        const englishOnlyGames = ['charades2', 'findthespy', 'numberguess'];
        const isEnglishOnly = englishOnlyGames.some(game => currentPath.includes(game));
        const stripLangPrefix = (path) => path
            .replace('/ru/', '/')
            .replace('/pt/', '/')
            .replace('/zh/', '/')
            .replace('/de/', '/')
            .replace('/fr/', '/')
            .replace('/id/', '/')
            .replace('/tr/', '/');

        if (lang === 'en') {
            if (!currentPath.startsWith('/ru/') && !currentPath.startsWith('/pt/') && !currentPath.startsWith('/zh/') && !currentPath.startsWith('/de/') && !currentPath.startsWith('/fr/') && !currentPath.startsWith('/id/') && !currentPath.startsWith('/tr/')) {
                return;
            }
            newPath = currentPath.replace('/ru', '').replace('/pt', '').replace('/zh', '').replace('/de', '').replace('/fr', '').replace('/id', '').replace('/tr', '');
        } else {
            const langPrefix = `/${lang}`;
            if (currentPath.startsWith(`${langPrefix}/`)) {
                return;
            }
            if (isEnglishOnly) {
                newPath = `${langPrefix}/index.html`;
            } else {
                newPath = langPrefix + stripLangPrefix(currentPath);
            }
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

    // Metode untuk menampilkan rekomendasi game berdasarkan game saat ini
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
                <h3>Anda juga mungkin menyukai...</h3>
                <div class="recommended-games">
                    ${games.map(game => `
                        <a href="${game.url}" class="recommended-game">
                            <span>${game.name}</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    `).join('')}
                </div>
                <button class="close-modal">Mungkin Nanti</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Hapus secara otomatis setelah 10 detik
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 10000);

        // Tutup saat diklik
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
    }

    // Metode yang dipanggil saat game berakhir
    onGameEnd() {
        setTimeout(() => {
            this.showRecommendations();
        }, 2000);
    }

    // Inisialisasi autentikasi
    initAuth() {
        // Tunggu manajer autentikasi tersedia
        if (window.authManager) {
            this.setupAuthUI();
            window.authManager.onAuthStateChange((event, session) => {
                this.updateAuthUI(session);
            });
        } else {
            // Coba lagi setelah penundaan singkat
            setTimeout(() => this.initAuth(), 100);
        }
    }

    // Setup UI autentikasi
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
            // Pengguna masuk
            authButtons.style.display = 'none';
            userInfo.style.display = 'block';

            const userEmail = document.getElementById('nav-user-email');
            const userAvatar = document.getElementById('nav-user-avatar');
            const premiumStatus = document.getElementById('nav-premium-status');

            if (userEmail) userEmail.textContent = session.user.email;
            if (userAvatar) userAvatar.textContent = session.user.email.charAt(0).toUpperCase();

            // Periksa status premium jika manajer autentikasi tersedia
            if (window.authManager && window.authManager.checkUserPremiumStatus) {
                window.authManager.checkUserPremiumStatus().then(isPremium => {
                    if (premiumStatus) {
                        premiumStatus.textContent = isPremium ? 'Premium' : 'Pengguna Gratis';
                        premiumStatus.className = isPremium ? 'premium-status-nav premium' : 'premium-status-nav free';
                    }
                });
            }
        } else {
            // Pengguna tidak masuk
            authButtons.style.display = 'block';
            userInfo.style.display = 'none';
        }
    }
}

// Inisialisasi otomatis saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
    window.gameNavigation = new GameNavigation();
});

// Expose metode untuk digunakan game
window.GameNavigationAPI = {
    showRecommendations: () => window.gameNavigation?.showRecommendations(),
    onGameEnd: () => window.gameNavigation?.onGameEnd()
};



