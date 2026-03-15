/**
 * Компонент навигации по играм (версия на русском)
 * Обеспечивает улучшенную навигацию между играми с плавающим меню и быстрым доступом
 */

class GameNavigation {
    constructor() {
        this.games = [
            { name: 'Sihirli 8 Topu', url: '/tr/games/magic8ball/magic8ball', category: 'solo' },
            { name: 'Dogruluk mu Cesaret mi', url: '/tr/games/TruthorDare/TruthOrDare', category: 'party' },
            { name: 'Ciftler icin Dogruluk Cesaret', url: '/tr/games/truthordarequestionsforcouples/TruthOrDareQuestionsForCouples', category: 'adult' },
            { name: 'Hic Yapmadim', url: '/tr/games/NeverHaveIEver/NeverHaveIEver', category: 'party' },
            { name: 'En Muhtemel Kim', url: '/tr/games/WhoIsMostLikely/WhoIsMostLikely', category: 'party' },
            { name: 'Hangisini Secersin', url: '/tr/games/WouldYouRather/WouldYouRather', category: 'party' },
            { name: 'Seksi 21 Soru', url: '/tr/games/freaky21questions/freaky21questions', category: 'adult' },
            
            { name: 'Cesur Paranoya Sorulari', url: '/tr/games/paranoiaquestionsdirty/paranoiaquestionsdirty', category: 'adult' },
            { name: 'Mafya', url: '/tr/games/mafia/mafia', category: 'strategy' },
            { name: 'Gizli Ajan', url: '/tr/games/undercover/undercover', category: 'strategy' },
            { name: 'Sessiz Sinema', url: '/tr/games/charades/charades', category: 'party' },
            { name: 'Headbands', url: '/tr/games/hedbanzgame/hedbanzgame', category: 'party' },
            { name: 'Seks Zari', url: '/tr/games/sexdice/sexdice', category: 'adult' },
            { name: 'Sayi Tahmin', url: '/tr/games/beernumber/beernumber', category: 'drinking' },
            { name: 'Kings Cup', url: '/tr/games/KingsCup/KingsCup', category: 'drinking' },
            { name: 'Sise Eslestirme Oyunu', url: '/tr/games/BottleMatchGame/BottleMatchGame', category: 'party' },
            { name: 'Yalanci Zar', url: '/tr/games/liarsdice/liarsdice', category: 'drinking' },
            { name: 'Son Shot', url: '/tr/games/lastshot/lastshot', category: 'drinking' },
            { name: 'Cadinin Zehri', url: '/tr/games/witchspoison/witchspoison', category: 'party' }
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
                <h4><i class="fas fa-dice"></i> Другие игры</h4>
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
                        <i class="fas fa-home"></i> Tum Oyunlar
                    </a>
                    <a href="/tr/TheList.html">
                        <i class="fas fa-list"></i> Рейтинг
                    </a>
                    <a href="/tr/premium.html" class="premium-highlight">
                        <i class="fas fa-crown"></i> Premium
                    </a>
                    <div class="auth-section">
                        <div class="auth-buttons" id="nav-auth-buttons">
                            <a href="/tr/login.html" class="auth-link login-link">
                                <i class="fas fa-sign-in-alt"></i><span>Giris</span>
                            </a>
                            <a href="/tr/register.html" class="auth-link register-link">
                                <i class="fas fa-user-plus"></i><span>Kaydol</span>
                            </a>
                        </div>
                        <div class="user-info-nav" id="nav-user-info" style="display: none;">
                            <div class="user-details-nav">
                                <div class="user-avatar-nav" id="nav-user-avatar">U</div>
                                <div class="user-text">
                                    <div class="user-email-nav" id="nav-user-email">user@example.com</div>
                                    <span class="premium-status-nav" id="nav-premium-status">Ucretsiz Kullanici</span>
                                </div>
                            </div>
                            <button class="signout-btn" onclick="handleSignOut()">
                                <i class="fas fa-sign-out-alt"></i><span>Cikis</span>
                            </button>
                        </div>
                    </div>
                    <div class="language-dropdown">
                        <button class="language-toggle">
                            <i class="fas fa-globe"></i> 🇹🇷 Türkçe
                        </button>
                        <div class="language-menu">
                            <a href="#" class="language-link" data-lang="en">🇺🇸 English</a>
                            <a href="#" class="language-link" data-lang="tr">🇹🇷 Türkçe</a>
                            <a href="#" class="language-link" data-lang="zh">🇨🇳 中文</a>
                            <a href="#" class="language-link" data-lang="de">🇩🇪 Deutsch</a>
                            <a href="#" class="language-link" data-lang="fr">🇫🇷 Français</a>
                            <a href="#" class="language-link" data-lang="pt">🇧🇷 Português</a>
                            <a href="#" class="language-link" data-lang="id">🇮🇩 Bahasa Indonesia</a>
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
        // Найдите логотипы игр и сделайте их кликабельными
        const logos = document.querySelectorAll('.game-logo, .logo-container img, img[alt*="Logo"], img[src*="logo"], img[src*="Logo"]');

        logos.forEach(logo => {
            if (!logo.closest('a')) { // Только если это не ссылка
                logo.style.cursor = 'pointer';
                logo.addEventListener('click', () => {
                    window.location.href = '/tr/index.html';
                });

                // Добавьте эффект наведения
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

        // Закройте меню при клике вне области
        document.addEventListener('click', (e) => {
            if (navMenu && !e.target.closest('.floating-nav')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('show');
            }
            if (quickAccessBar && !e.target.closest('#quickAccessBar')) {
                quickAccessBar.classList.remove('open');
            }
        });

        // Функциональность выпадающего меню языка
        const languageToggle = document.querySelector('.language-toggle');
        const languageMenu = document.querySelector('.language-menu');

        if (languageToggle && languageMenu) {
            languageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                languageMenu.classList.toggle('show');
            });

            // Закройте меню языков при клике вне
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.language-dropdown')) {
                    languageMenu.classList.remove('show');
                }
            });

            // Обработайте смену языка
            document.querySelectorAll('.language-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.switchLanguage(link.dataset.lang);
                });
            });
        }

        // Отслеживайте клики по навигации для аналитики
        document.querySelectorAll('.game-link, .quick-game-btn').forEach(link => {
            link.addEventListener('click', () => {
                this.trackNavigation(link.textContent.trim());
            });
        });
    }

    startPulseReminder() {
        // Добавьте эффект пульса для привлечения внимания через 30 секунд
        setTimeout(() => {
            const navToggle = document.getElementById('navToggle');
            if (navToggle && !navToggle.classList.contains('active')) {
                navToggle.classList.add('pulse');

                // Удалите пульс после взаимодействия
                navToggle.addEventListener('click', () => {
                    navToggle.classList.remove('pulse');
                }, { once: true });
            }
        }, 30000);
    }

    switchLanguage(lang) {
        const currentPath = window.location.pathname;
        let newPath;

        // Игры, которых нет в русской/китайской/немецкой/французской/португальской версиях
        const englishOnlyGames = ['charades2', 'findthespy', 'numberguess'];
        const isEnglishOnly = englishOnlyGames.some(game => currentPath.includes(game));

        if (lang === 'tr') {
            // Переключиться на русскую версию
            if (currentPath.startsWith('/tr/')) {
                // Уже в русской версии
                return;
            }
            // Если это игра только на английском, перейти на главную на русском
            if (isEnglishOnly) {
                newPath = '/tr/index.html';
            } else {
                // Удалите /pt/, /zh/, /de/, /fr/, затем добавьте /tr/
                newPath = '/tr' + currentPath.replace('/pt/', '/').replace('/zh/', '/').replace('/de/', '/').replace('/fr/', '/').replace('/id/', '/').replace('/tr/', '/')
            .replace('/tr/', '/');
            }
        } else if (lang === 'pt') {
            // Переключиться на португальскую версию
            if (currentPath.startsWith('/pt/')) {
                // Уже в португальской версии
                return;
            }
            if (isEnglishOnly) {
                newPath = '/pt/index.html';
            } else {
                newPath = '/pt' + currentPath.replace('/tr/', '/').replace('/zh/', '/').replace('/de/', '/').replace('/fr/', '/').replace('/id/', '/').replace('/tr/', '/')
            .replace('/tr/', '/');
            }
        } else if (lang === 'zh') {
            // Переключиться на китайскую версию
            if (currentPath.startsWith('/zh/')) {
                // Уже в китайской версии
                return;
            }
            if (isEnglishOnly) {
                newPath = '/zh/index.html';
            } else {
                newPath = '/zh' + currentPath.replace('/tr/', '/').replace('/pt/', '/').replace('/de/', '/').replace('/fr/', '/').replace('/id/', '/').replace('/tr/', '/')
            .replace('/tr/', '/');
            }
        } else if (lang === 'de') {
            // Переключиться на немецкую версию
            if (currentPath.startsWith('/de/')) {
                // Уже в немецкой версии
                return;
            }
            if (isEnglishOnly) {
                newPath = '/de/index.html';
            } else {
                newPath = '/de' + currentPath.replace('/tr/', '/').replace('/pt/', '/').replace('/zh/', '/').replace('/fr/', '/').replace('/id/', '/').replace('/tr/', '/')
            .replace('/tr/', '/');
            }
        } else if (lang === 'fr') {
            // Переключиться на французскую версию
            if (currentPath.startsWith('/fr/')) {
                // Уже в французской версии
                return;
            }
            if (isEnglishOnly) {
                newPath = '/fr/index.html';
            } else {
                newPath = '/fr' + currentPath.replace('/tr/', '/').replace('/pt/', '/').replace('/zh/', '/').replace('/de/', '/').replace('/id/', '/')
            .replace('/tr/', '/');
            }
        } else if (lang === 'id') {
            // Переключиться на индонезийскую версию
            if (currentPath.startsWith('/id/')) {
                // Уже в индонезийской версии
                return;
            }
            if (isEnglishOnly) {
                newPath = '/id/index.html';
            } else {
                newPath = '/id' + currentPath.replace('/tr/', '/').replace('/pt/', '/').replace('/zh/', '/').replace('/de/', '/').replace('/fr/', '/');
            }
        } else {
            // Переключиться на английскую версию
            if (!currentPath.startsWith('/tr/') && !currentPath.startsWith('/pt/') && !currentPath.startsWith('/zh/') && !currentPath.startsWith('/de/') && !currentPath.startsWith('/fr/') && !currentPath.startsWith('/id/') && !currentPath.startsWith('/tr/')) {
                // Уже в английской версии
                return;
            }
            newPath = currentPath.replace('/tr', '').replace('/pt', '').replace('/zh', '').replace('/de', '').replace('/fr', '').replace('/id', '').replace('/tr', '');
        }

        window.location.href = newPath;
    }

    trackNavigation(gameName) {
        // Отслеживание аналитики (может быть интегрировано с Google Analytics или другими инструментами)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'game_navigation', {
                'game_name': gameName,
                'source_game': this.currentGame?.name || 'unknown'
            });
        }
        console.log(`Navigasyon: ${this.currentGame?.name || 'unknown'} -> ${gameName}`);
    }

    // Метод для отображения рекомендаций игр на основе текущей игры
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
                <h3>Вам также может понравиться...</h3>
                <div class="recommended-games">
                    ${games.map(game => `
                        <a href="${game.url}" class="recommended-game">
                            <span>${game.name}</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    `).join('')}
                </div>
                <button class="close-modal">Может быть позже</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Автоматически удалите через 10 секунд
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 10000);

        // Закройте при клике
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
    }

    // Метод, который должен быть вызван при завершении игры
    onGameEnd() {
        setTimeout(() => {
            this.showRecommendations();
        }, 2000);
    }

    // Инициализировать аутентификацию
    initAuth() {
        // Дождитесь, пока менеджер аутентификации будет доступен
        if (window.authManager) {
            this.setupAuthUI();
            window.authManager.onAuthStateChange((event, session) => {
                this.updateAuthUI(session);
            });
        } else {
            // Повторите попытку через короткую задержку
            setTimeout(() => this.initAuth(), 100);
        }
    }

    // Настроить UI аутентификации
    setupAuthUI() {
        if (window.authManager && window.authManager.isAuthenticated()) {
            this.updateAuthUI({ user: window.authManager.getCurrentUser() });
        }
    }

    // Обновить UI аутентификации на основе состояния пользователя
    updateAuthUI(session) {
        const authButtons = document.getElementById('nav-auth-buttons');
        const userInfo = document.getElementById('nav-user-info');

        if (!authButtons || !userInfo) return;

        if (session && session.user) {
            // Пользователь вошел
            authButtons.style.display = 'none';
            userInfo.style.display = 'block';

            const userEmail = document.getElementById('nav-user-email');
            const userAvatar = document.getElementById('nav-user-avatar');
            const premiumStatus = document.getElementById('nav-premium-status');

            if (userEmail) userEmail.textContent = session.user.email;
            if (userAvatar) userAvatar.textContent = session.user.email.charAt(0).toUpperCase();

            // Проверьте статус премиум, если менеджер аутентификации доступен
            if (window.authManager && window.authManager.checkUserPremiumStatus) {
                window.authManager.checkUserPremiumStatus().then(isPremium => {
                    if (premiumStatus) {
                        premiumStatus.textContent = isPremium ? 'Premium' : 'Ucretsiz Kullanici';
                        premiumStatus.className = isPremium ? 'premium-status-nav premium' : 'premium-status-nav free';
                    }
                });
            }
        } else {
            // Пользователь не вошел
            authButtons.style.display = 'block';
            userInfo.style.display = 'none';
        }
    }
}

// Автоматическая инициализация при готовности DOM
document.addEventListener('DOMContentLoaded', () => {
    window.gameNavigation = new GameNavigation();
});

// Раскройте методы для использования игр
window.GameNavigationAPI = {
    showRecommendations: () => window.gameNavigation?.showRecommendations(),
    onGameEnd: () => window.gameNavigation?.onGameEnd()
};
