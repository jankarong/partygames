/**
 * Компонент навигации по играм (версия на русском)
 * Обеспечивает улучшенную навигацию между играми с плавающим меню и быстрым доступом
 */

class GameNavigation {
    constructor() {
        this.games = [
            { name: 'Магический шар 8', url: '/ru/games/magic8ball/magic8ball.html', category: 'solo' },
            { name: 'Правда или вызов', url: '/ru/games/TruthorDare/TruthOrDare.html', category: 'party' },
            { name: 'Pravda ili Deistvie dlya Par', url: '/ru/games/truthordarequestionsforcouples/TruthOrDareQuestionsForCouples.html', category: 'adult' },
            { name: 'Никогда я не...', url: '/ru/games/NeverHaveIEver/NeverHaveIEver.html', category: 'party' },
            { name: 'Кто скорее всего...', url: '/ru/games/WhoIsMostLikely/WhoIsMostLikely.html', category: 'party' },
            { name: 'Что бы ты выбрал?', url: '/ru/games/WouldYouRather/WouldYouRather.html', category: 'party' },
            
            { name: 'Острые вопросы паранойи', url: '/ru/games/paranoiaquestionsdirty/paranoiaquestionsdirty.html', category: 'adult' },
            { name: 'Мафия', url: '/ru/games/mafia/mafia.html', category: 'strategy' },
            { name: 'Подпольщик', url: '/ru/games/undercover/undercover.html', category: 'strategy' },
            { name: 'Генератор шарад', url: '/ru/games/charades/charades.html', category: 'party' },
            { name: 'Headbands', url: '/ru/games/hedbanzgame/hedbanzgame.html', category: 'party' },
            { name: 'Любовные кубики', url: '/ru/games/sexdice/sexdice.html', category: 'adult' },
            { name: 'Угадайте число', url: '/ru/games/beernumber/beernumber.html', category: 'drinking' },
            { name: 'Король чаши', url: '/ru/games/KingsCup/KingsCup.html', category: 'drinking' },
            { name: 'Совпадение бутылок', url: '/ru/games/BottleMatchGame/BottleMatchGame.html', category: 'party' },
            { name: 'Карты лжецов', url: '/ru/games/liarsdice/liarsdice.html', category: 'drinking' },
            { name: 'Последний выстрел', url: '/ru/games/lastshot/lastshot.html', category: 'drinking' },
            { name: 'Ведьмин яд', url: '/ru/games/witchspoison/witchspoison.html', category: 'party' }
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
                    <a href="/ru/index.html">
                        <i class="fas fa-home"></i> Все игры
                    </a>
                    <a href="/ru/TheList.html">
                        <i class="fas fa-list"></i> Рейтинг
                    </a>
                    <a href="/ru/premium.html" class="premium-highlight">
                        <i class="fas fa-crown"></i> Премиум
                    </a>
                    <div class="auth-section">
                        <div class="auth-buttons" id="nav-auth-buttons">
                            <a href="/ru/login.html" class="auth-link login-link">
                                <i class="fas fa-sign-in-alt"></i><span>Вход</span>
                            </a>
                            <a href="/ru/register.html" class="auth-link register-link">
                                <i class="fas fa-user-plus"></i><span>Регистрация</span>
                            </a>
                        </div>
                        <div class="user-info-nav" id="nav-user-info" style="display: none;">
                            <div class="user-details-nav">
                                <div class="user-avatar-nav" id="nav-user-avatar">U</div>
                                <div class="user-text">
                                    <div class="user-email-nav" id="nav-user-email">user@example.com</div>
                                    <span class="premium-status-nav" id="nav-premium-status">Бесплатный пользователь</span>
                                </div>
                            </div>
                            <button class="signout-btn" onclick="handleSignOut()">
                                <i class="fas fa-sign-out-alt"></i><span>Выход</span>
                            </button>
                        </div>
                    </div>
                    <div class="language-dropdown">
                        <button class="language-toggle">
                            <i class="fas fa-globe"></i> 🇷🇺 Русский
                        </button>
                        <div class="language-menu">
                            <a href="#" class="language-link" data-lang="en">🇺🇸 English</a>
                            <a href="#" class="language-link" data-lang="ru">🇷🇺 Русский</a>
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
                <a href="/ru/index.html" class="quick-game-btn home-btn"><i class="fas fa-home"></i> Главная</a>
                <a href="/ru/premium.html" class="quick-game-btn premium-btn premium-highlight"><i class="fas fa-crown"></i> Премиум</a>
                <span id="try-text" style="color: rgba(255,255,255,0.7); font-size: 12px;">Попробуйте:</span>
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
                    window.location.href = '/ru/index.html';
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

        if (lang === 'ru') {
            // Переключиться на русскую версию
            if (currentPath.startsWith('/ru/')) {
                // Уже в русской версии
                return;
            }
            // Если это игра только на английском, перейти на главную на русском
            if (isEnglishOnly) {
                newPath = '/ru/index.html';
            } else {
                // Удалите /pt/, /zh/, /de/, /fr/, затем добавьте /ru/
                newPath = '/ru' + currentPath.replace('/pt/', '/').replace('/zh/', '/').replace('/de/', '/').replace('/fr/', '/').replace('/id/', '/').replace('/tr/', '/')
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
                newPath = '/pt' + currentPath.replace('/ru/', '/').replace('/zh/', '/').replace('/de/', '/').replace('/fr/', '/').replace('/id/', '/').replace('/tr/', '/')
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
                newPath = '/zh' + currentPath.replace('/ru/', '/').replace('/pt/', '/').replace('/de/', '/').replace('/fr/', '/').replace('/id/', '/').replace('/tr/', '/')
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
                newPath = '/de' + currentPath.replace('/ru/', '/').replace('/pt/', '/').replace('/zh/', '/').replace('/fr/', '/').replace('/id/', '/').replace('/tr/', '/')
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
                newPath = '/fr' + currentPath.replace('/ru/', '/').replace('/pt/', '/').replace('/zh/', '/').replace('/de/', '/').replace('/id/', '/')
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
                newPath = '/id' + currentPath.replace('/ru/', '/').replace('/pt/', '/').replace('/zh/', '/').replace('/de/', '/').replace('/fr/', '/');
            }
        } else {
            // Переключиться на английскую версию
            if (!currentPath.startsWith('/ru/') && !currentPath.startsWith('/pt/') && !currentPath.startsWith('/zh/') && !currentPath.startsWith('/de/') && !currentPath.startsWith('/fr/') && !currentPath.startsWith('/id/') && !currentPath.startsWith('/tr/')) {
                // Уже в английской версии
                return;
            }
            newPath = currentPath.replace('/ru', '').replace('/pt', '').replace('/zh', '').replace('/de', '').replace('/fr', '').replace('/id', '').replace('/tr', '');
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
        console.log(`Навигация: ${this.currentGame?.name || 'unknown'} -> ${gameName}`);
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
                        premiumStatus.textContent = isPremium ? 'Премиум' : 'Бесплатный пользователь';
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
