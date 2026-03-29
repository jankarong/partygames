/**
 * Oyun Gezintisi Bileşeni (Türkçe Versiyonu)
 * Kayan menü ve hızlı erişim çubuğu ile oyunlar arasında geliştirilmiş navigasyon sağlar
 */

class GameNavigation {
    constructor() {
        this.games = [
            { name: 'Sihirli 8 Topu', url: '/tr/games/magic8ball/magic8ball.html', category: 'solo' },
            { name: 'Doğruluk mu Cesaret mi', url: '/tr/games/TruthorDare/TruthOrDare.html', category: 'party' },
            { name: 'Çiftler için Doğruluk mu Cesaret mi', url: '/tr/games/truthordarequestionsforcouples/TruthOrDareQuestionsForCouples.html', category: 'adult' },
            { name: 'Hiç Yapmadım', url: '/tr/games/NeverHaveIEver/NeverHaveIEver.html', category: 'party' },
            { name: 'En Muhtemel Kim', url: '/tr/games/WhoIsMostLikely/WhoIsMostLikely.html', category: 'party' },
            { name: 'Hangisini Seçersin', url: '/tr/games/WouldYouRather/WouldYouRather.html', category: 'party' },
            { name: 'Cesur Paranoya Soruları', url: '/tr/games/paranoiaquestionsdirty/paranoiaquestionsdirty.html', category: 'adult' },
            { name: 'Mafya', url: '/tr/games/mafia/mafia.html', category: 'strategy' },
            { name: 'Gizli Ajan', url: '/tr/games/undercover/undercover.html', category: 'strategy' },
            { name: 'Sessiz Sinema', url: '/tr/games/charades/charades.html', category: 'party' },
            { name: 'Headbands', url: '/tr/games/hedbanzgame/hedbanzgame.html', category: 'party' },
            { name: 'Seks Zarı', url: '/tr/games/sexdice/sexdice.html', category: 'adult' },
            { name: 'Sayı Tahmin', url: '/tr/games/beernumber/beernumber.html', category: 'drinking' },
            { name: 'Kings Cup', url: '/tr/games/KingsCup/KingsCup.html', category: 'drinking' }
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
                <h4><i class="fas fa-dice"></i> Diğer Oyunlar</h4>
                <div class="game-links" id="gameLinks">
                    ${this.games.map(game => `
                        <a href="${game.url}" class="game-link ${game === this.currentGame ? 'current' : ''}"
                           data-category="${game.category}">
                            ${game.name}
                        </a>
                    `).join('')}
                </div>
                <div class="nav-actions">
                    <a href="/tr/index.html">
                        <i class="fas fa-home"></i> Tüm Oyunlar
                    </a>
                    <a href="/tr/TheList.html">
                        <i class="fas fa-list"></i> Oyun Listesi
                    </a>
                    <a href="/tr/premium.html" class="premium-highlight">
                        <i class="fas fa-crown"></i> Premium
                    </a>
                    <div class="auth-section">
                        <div class="auth-buttons" id="nav-auth-buttons">
                            <a href="/tr/login.html" class="auth-link login-link">
                                <i class="fas fa-sign-in-alt"></i><span>Giriş Yap</span>
                            </a>
                            <a href="/tr/register.html" class="auth-link register-link">
                                <i class="fas fa-user-plus"></i><span>Kayıt Ol</span>
                            </a>
                        </div>
                        <div class="user-info-nav" id="nav-user-info" style="display: none;">
                            <div class="user-details-nav">
                                <div class="user-avatar-nav" id="nav-user-avatar">U</div>
                                <div class="user-text">
                                    <div class="user-email-nav" id="nav-user-email">user@example.com</div>
                                    <span class="premium-status-nav" id="nav-premium-status">Ücretsiz Kullanıcı</span>
                                </div>
                            </div>
                            <button class="signout-btn" onclick="handleSignOut()">
                                <i class="fas fa-sign-out-alt"></i><span>Çıkış Yap</span>
                            </button>
                        </div>
                    </div>
                    <div class="language-dropdown">
                        <button class="language-toggle">
                            <i class="fas fa-globe"></i> 🇹🇷 Türkçe
                        </button>
                        <div class="language-menu">
                            <a href="#" class="language-link" data-lang="en">🇺🇸 English</a>
                            <a href="#" class="language-link" data-lang="ja">🇯🇵 日本語</a>
                            <a href="#" class="language-link" data-lang="zh">🇨🇳 中文</a>
                            <a href="#" class="language-link" data-lang="de">🇩🇪 Deutsch</a>
                            <a href="#" class="language-link" data-lang="fr">🇫🇷 Français</a>
                            <a href="#" class="language-link" data-lang="pt">🇧🇷 Português</a>
                            <a href="#" class="language-link" data-lang="id">🇮🇩 Bahasa Indonesia</a>
                            <a href="#" class="language-link" data-lang="ru">🇷🇺 Русский</a>
                            <a href="#" class="language-link" data-lang="tr">🇹🇷 Türkçe</a>
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
                <a href="/tr/index.html" class="quick-game-btn home-btn"><i class="fas fa-home"></i> Ana Sayfa</a>
                <a href="/tr/premium.html" class="quick-game-btn premium-btn premium-highlight"><i class="fas fa-crown"></i> Premium</a>
                <span id="try-text" style="color: rgba(255,255,255,0.7); font-size: 12px;">Dene:</span>
                ${popularGames.map(game => `
                    <a href="${game.url}" class="quick-game-btn">${game.name}</a>
                `).join('')}
            `;
            document.body.appendChild(quickBar);
        }
    }

    makeLogosClickable() {
        const logos = document.querySelectorAll('.game-logo, .logo-container img, img[alt*="Logo"], img[src*="logo"], img[src*="Logo"]');

        logos.forEach(logo => {
            if (!logo.closest('a')) {
                logo.style.cursor = 'pointer';
                logo.addEventListener('click', () => {
                    window.location.href = '/tr/index.html';
                });

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

        document.addEventListener('click', (e) => {
            if (navMenu && !e.target.closest('.floating-nav')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('show');
            }
            if (quickAccessBar && !e.target.closest('#quickAccessBar')) {
                quickAccessBar.classList.remove('open');
            }
        });

        const languageToggle = document.querySelector('.language-toggle');
        const languageMenu = document.querySelector('.language-menu');

        if (languageToggle && languageMenu) {
            languageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                languageMenu.classList.toggle('show');
            });

            document.addEventListener('click', (e) => {
                if (!e.target.closest('.language-dropdown')) {
                    languageMenu.classList.remove('show');
                }
            });

            document.querySelectorAll('.language-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.switchLanguage(link.dataset.lang);
                });
            });
        }

        document.querySelectorAll('.game-link, .quick-game-btn').forEach(link => {
            link.addEventListener('click', () => {
                this.trackNavigation(link.textContent.trim());
            });
        });
    }

    startPulseReminder() {
        setTimeout(() => {
            const navToggle = document.getElementById('navToggle');
            if (navToggle && !navToggle.classList.contains('active')) {
                navToggle.classList.add('pulse');

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
            .replace('/tr/', '/')
            .replace('/ja/', '/');

        if (lang === 'en') {
            if (!currentPath.startsWith('/ru/') && !currentPath.startsWith('/pt/') && !currentPath.startsWith('/zh/') && !currentPath.startsWith('/de/') && !currentPath.startsWith('/fr/') && !currentPath.startsWith('/id/') && !currentPath.startsWith('/tr/') && !currentPath.startsWith('/ja/')) {
                return;
            }
            newPath = currentPath.replace('/ru', '').replace('/pt', '').replace('/zh', '').replace('/de', '').replace('/fr', '').replace('/id', '').replace('/tr', '').replace('/ja', '');
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
        if (typeof gtag !== 'undefined') {
            gtag('event', 'game_navigation', {
                'game_name': gameName,
                'source_game': this.currentGame?.name || 'unknown'
            });
        }
        console.log(`Navigasyon: ${this.currentGame?.name || 'unknown'} -> ${gameName}`);
    }

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
                <h3>Bu oyunlar da hoşunuza gidebilir...</h3>
                <div class="recommended-games">
                    ${games.map(game => `
                        <a href="${game.url}" class="recommended-game">
                            <span>${game.name}</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    `).join('')}
                </div>
                <button class="close-modal">Belki Daha Sonra</button>
            </div>
        `;

        document.body.appendChild(modal);

        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 10000);

        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
    }

    onGameEnd() {
        setTimeout(() => {
            this.showRecommendations();
        }, 2000);
    }

    initAuth() {
        if (window.authManager) {
            this.setupAuthUI();
            window.authManager.onAuthStateChange((event, session) => {
                this.updateAuthUI(session);
            });
        } else {
            setTimeout(() => this.initAuth(), 100);
        }
    }

    setupAuthUI() {
        if (window.authManager && window.authManager.isAuthenticated()) {
            this.updateAuthUI({ user: window.authManager.getCurrentUser() });
        }
    }

    updateAuthUI(session) {
        const authButtons = document.getElementById('nav-auth-buttons');
        const userInfo = document.getElementById('nav-user-info');

        if (!authButtons || !userInfo) return;

        if (session && session.user) {
            authButtons.style.display = 'none';
            userInfo.style.display = 'block';

            const userEmail = document.getElementById('nav-user-email');
            const userAvatar = document.getElementById('nav-user-avatar');
            const premiumStatus = document.getElementById('nav-premium-status');

            if (userEmail) userEmail.textContent = session.user.email;
            if (userAvatar) userAvatar.textContent = session.user.email.charAt(0).toUpperCase();

            if (window.authManager && window.authManager.checkUserPremiumStatus) {
                window.authManager.checkUserPremiumStatus().then(isPremium => {
                    if (premiumStatus) {
                        premiumStatus.textContent = isPremium ? 'Premium' : 'Ücretsiz Kullanıcı';
                        premiumStatus.className = isPremium ? 'premium-status-nav premium' : 'premium-status-nav free';
                    }
                });
            }
        } else {
            authButtons.style.display = 'block';
            userInfo.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.gameNavigation = new GameNavigation();
});

window.GameNavigationAPI = {
    showRecommendations: () => window.gameNavigation?.showRecommendations(),
    onGameEnd: () => window.gameNavigation?.onGameEnd()
};
