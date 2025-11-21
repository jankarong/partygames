/**
 * Game Navigation Component
 * Provides enhanced navigation between games with floating menu and quick access bar
 */

class GameNavigation {
    constructor() {
        this.gamesData = [
            { nameKey: 'Magic 8 Ball', url: '/games/magic8ball/magic8ball', logo: '/games/magic8ball/magic8ball.svg', category: 'solo' },
            { nameKey: 'Truth or Dare', url: '/games/TruthorDare/TruthOrDare', logo: '/games/TruthorDare/TruthorDareLogo.png', category: 'party' },
            { nameKey: 'Never Have I Ever', url: '/games/NeverHaveIEver/NeverHaveIEver', logo: '/games/NeverHaveIEver/NeverHaveIEverLogo.png', category: 'party' },
            { nameKey: 'Who Is Most Likely', url: '/games/WhoIsMostLikely/WhoIsMostLikely', logo: '/games/WhoIsMostLikely/MostLikelyToLogo.png', category: 'party' },
            { nameKey: 'Would You Rather', url: '/games/WouldYouRather/WouldYouRather', logo: '/games/WouldYouRather/WouldYouRatherLogo.png', category: 'party' },
            { nameKey: 'Mafia', url: '/games/mafia/mafia', logo: '/games/mafia/mafialogo.png', category: 'strategy' },
            { nameKey: 'Undercover', url: '/games/undercover/undercover', logo: '/games/undercover/undercover.png', category: 'strategy' },
            { nameKey: 'Charades', url: '/games/charades/charades', logo: '/games/charades/CharadesLogo.png', category: 'party' },
            { nameKey: 'Hedbanz', url: '/games/hedbanzgame/hedbanzgame', logo: '/games/hedbanzgame/hedbanz.png', category: 'party' },
            { nameKey: 'Bottle Match Game', url: '/games/BottleMatchGame/BottleMatchGame', logo: '/games/BottleMatchGame/bottlematch.png', category: 'solo' },
            { nameKey: 'Sex Dice', url: '/games/sexdice/sexdice', logo: '/games/sexdice/sexdicelogo.png', category: 'adult' },
            { nameKey: 'Beer Number', url: '/games/beernumber/beernumber', logo: '/games/beernumber/numberguessLogo.png', category: 'drinking' },
            { nameKey: 'Kings Cup', url: '/games/KingsCup/KingsCup', logo: '/games/KingsCup/kingscuplogo.png', category: 'drinking' }
        ];

        // Initialize games with localized names
        this.games = this.initializeLocalizedGames();
        this.currentGame = this.getCurrentGame();
        this.init();
    }

    initializeLocalizedGames() {
        const currentPath = window.location.pathname;
        let currentLang = 'en';
        let langPrefix = '';

        if (currentPath.startsWith('/pt/')) {
            currentLang = 'pt';
            langPrefix = '/pt';
        } else if (currentPath.startsWith('/zh/')) {
            currentLang = 'zh';
            langPrefix = '/zh';
        } else if (currentPath.startsWith('/de/')) {
            currentLang = 'de';
            langPrefix = '/de';
        } else if (currentPath.startsWith('/fr/')) {
            currentLang = 'fr';
            langPrefix = '/fr';
        } else if (currentPath.startsWith('/id/')) {
            currentLang = 'id';
            langPrefix = '/id';
        }

        const gameNames = this.getGameNames(currentLang);
        return this.gamesData.map(game => ({
            ...game,
            name: gameNames[game.nameKey] || game.nameKey,
            url: langPrefix + game.url
        }));
    }

    getGameNames(lang) {
        const names = {
            en: {
                'Magic 8 Ball': 'Magic 8 Ball',
                'Truth or Dare': 'Truth or Dare',
                'Never Have I Ever': 'Never Have I Ever',
                'Who Is Most Likely': 'Who Is Most Likely',
                'Would You Rather': 'Would You Rather',
                'Mafia': 'Mafia',
                'Undercover': 'Undercover',
                'Charades': 'Charades',
                'Hedbanz': 'Hedbanz',
                'Bottle Match Game': 'Bottle Match Game',
                'Sex Dice': 'Sex Dice',
                'Beer Number': 'Beer Number',
                'Kings Cup': 'Kings Cup'
            },
            pt: {
                'Magic 8 Ball': 'Bola Mágica',
                'Truth or Dare': 'Verdade ou Desafio',
                'Never Have I Ever': 'Nunca Fiz Isso',
                'Who Is Most Likely': 'Quem Tem Mais Chance',
                'Would You Rather': 'Prefiro Ou Prefiro',
                'Mafia': 'Máfia',
                'Undercover': 'Infiltrado',
                'Charades': 'Mímica',
                'Hedbanz': 'Hedbanz',
                'Bottle Match Game': 'Jogo de Combinar Garrafas',
                'Sex Dice': 'Dados de Sexo Online',
                'Beer Number': 'Adivinha o Número',
                'Kings Cup': 'Cálice do Rei'
            },
            zh: {
                'Magic 8 Ball': '魔法8球',
                'Truth or Dare': '真心话大冒险',
                'Never Have I Ever': '从不曾我从不',
                'Who Is Most Likely': '谁最有可能',
                'Would You Rather': '你会选择谁',
                'Mafia': '黑手党',
                'Undercover': '卧底',
                'Charades': '词语接龙',
                'Hedbanz': '头脑画吧',
                'Bottle Match Game': '瓶子匹配游戏',
                'Sex Dice': '骰子游戏',
                'Beer Number': '猜数字',
                'Kings Cup': '国王杯'
            },
            de: {
                'Magic 8 Ball': 'Magischer 8er-Ball',
                'Truth or Dare': 'Wahrheit oder Pflicht',
                'Never Have I Ever': 'Ich habe nie',
                'Who Is Most Likely': 'Wer ist am ehesten',
                'Would You Rather': 'Würdest du eher',
                'Mafia': 'Mafia',
                'Undercover': 'Undercover',
                'Charades': 'Scharades',
                'Hedbanz': 'Hedbanz',
                'Bottle Match Game': 'Flaschenspiel',
                'Sex Dice': 'Sex Würfel',
                'Beer Number': 'Biernummer',
                'Kings Cup': 'Königsbecher'
            },
            fr: {
                'Magic 8 Ball': 'Boule 8 Magique',
                'Truth or Dare': 'Vérité ou Défi',
                'Never Have I Ever': 'Je n\'ai Jamais',
                'Who Is Most Likely': 'Qui est le Plus Probable',
                'Would You Rather': 'Tu Préfères Ou',
                'Mafia': 'Mafia',
                'Undercover': 'Infiltré',
                'Charades': 'Charades',
                'Hedbanz': 'Hedbanz',
                'Bottle Match Game': 'Jeu d\'Appariement de Bouteilles',
                'Sex Dice': 'Dés Sexuels',
                'Beer Number': 'Numéro de Bière',
                'Kings Cup': 'Coupe du Roi'
            },
            id: {
                'Magic 8 Ball': 'Bola Ajaib 8',
                'Truth or Dare': 'Kebenaran atau Tantangan',
                'Never Have I Ever': 'Saya Tidak Pernah',
                'Who Is Most Likely': 'Siapa yang Paling Mungkin',
                'Would You Rather': 'Lebih Suka Mana',
                'Mafia': 'Mafia',
                'Undercover': 'Undercover',
                'Charades': 'Charades',
                'Hedbanz': 'Hedbanz',
                'Bottle Match Game': 'Permainan Cocokkan Botol',
                'Sex Dice': 'Dadu Seks',
                'Beer Number': 'Tebak Angka',
                'Kings Cup': 'Gelas Raja'
            }
        };

        return names[lang] || names['en'];
    }

    getCurrentGame() {
        const path = window.location.pathname;
        return this.games.find(game => path.includes(game.url.split('/').pop().replace('.html', ''))) || null;
    }

    init() {
        this.createFloatingNav();
        this.createQuickAccessBar();
        this.createOtherGamesPanel();
        this.makeLogosClickable();
        this.bindEvents();
        this.startPulseReminder();
        this.initAuth();
    }

    createFloatingNav() {
        const floatingNav = document.createElement('div');
        floatingNav.className = 'floating-nav';

        // Determine language prefix for links
        const currentPath = window.location.pathname;
        let langPrefix = '';
        let currentLang = 'en';
        if (currentPath.startsWith('/pt/')) {
            langPrefix = '/pt';
            currentLang = 'pt';
        } else if (currentPath.startsWith('/zh/')) {
            langPrefix = '/zh';
            currentLang = 'zh';
        } else if (currentPath.startsWith('/de/')) {
            langPrefix = '/de';
            currentLang = 'de';
        } else if (currentPath.startsWith('/fr/')) {
            langPrefix = '/fr';
            currentLang = 'fr';
        }

        // Get text in the current language
        const texts = this.getNavTexts(currentLang);

        floatingNav.innerHTML = `
            <button class="nav-toggle" id="navToggle">
                <i class="fas fa-gamepad"></i>
            </button>
            <div class="nav-menu" id="navMenu">
                <div class="nav-actions">
                    <a href="${langPrefix}/index.html">
                        <i class="fas fa-home"></i><span>${texts.allGames}</span>
                    </a>
                    <a href="${langPrefix}/TheList.html">
                        <i class="fas fa-list"></i><span>${texts.theList}</span>
                    </a>
                    <a href="${langPrefix}/premium.html" class="premium-highlight">
                        <i class="fas fa-crown"></i><span>${texts.premium}</span>
                    </a>
                    <a href="https://ozagames.com/" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-gamepad"></i><span>${texts.minigames}</span>
                    </a>
                    <div class="auth-section">
                        <div class="auth-buttons" id="nav-auth-buttons">
                            <a href="${langPrefix}/login.html" class="auth-link login-link">
                                <i class="fas fa-sign-in-alt"></i><span>${texts.login}</span>
                            </a>
                            <a href="${langPrefix}/register.html" class="auth-link register-link">
                                <i class="fas fa-user-plus"></i><span>${texts.signup}</span>
                            </a>
                        </div>
                        <div class="user-info-nav" id="nav-user-info" style="display: none;">
                            <div class="user-details-nav">
                                <div class="user-avatar-nav" id="nav-user-avatar">U</div>
                                <div class="user-text">
                                    <div class="user-email-nav" id="nav-user-email">user@example.com</div>
                                    <span class="premium-status-nav" id="nav-premium-status">${texts.freeUser}</span>
                                </div>
                            </div>
                            <button class="signout-btn" onclick="handleSignOut()">
                                <i class="fas fa-sign-out-alt"></i><span>${texts.logout}</span>
                            </button>
                        </div>
                    </div>
                    <div class="language-dropdown">
                        <button class="language-toggle">
                            <i class="fas fa-globe"></i><span>${texts.currentLanguageFlag}</span>
                        </button>
                        <div class="language-menu">
                            <a href="#" class="language-link" data-lang="en">🇺🇸 English</a>
                            <a href="#" class="language-link" data-lang="pt">🇧🇷 Português</a>
                            <a href="#" class="language-link" data-lang="zh">🇨🇳 中文</a>
                            <a href="#" class="language-link" data-lang="de">🇩🇪 Deutsch</a>
                            <a href="#" class="language-link" data-lang="fr">🇫🇷 Français</a>
                            <a href="#" class="language-link" data-lang="id">🇮🇩 Bahasa Indonesia</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(floatingNav);
    }

    getNavTexts(lang) {
        const translations = {
            en: {
                allGames: 'All Games',
                theList: 'The List',
                premium: 'Premium',
                minigames: 'Minigames',
                login: 'Login',
                signup: 'Sign Up',
                freeUser: 'Free User',
                logout: 'Logout',
                currentLanguageFlag: '🇺🇸 English',
                tryText: 'Try:',
                popularGames: 'Popular Party Games'
            },
            pt: {
                allGames: 'Todos os Jogos',
                theList: 'A Lista',
                premium: 'Premium',
                minigames: 'Minijogos',
                login: 'Entrar',
                signup: 'Criar Conta',
                freeUser: 'Usuário Grátis',
                logout: 'Sair',
                currentLanguageFlag: '🇧🇷 Português',
                tryText: 'Tente:',
                popularGames: 'Jogos de Festa Populares'
            },
            zh: {
                allGames: '所有游戏',
                theList: '游戏列表',
                premium: '高级版',
                minigames: '小游戏',
                login: '登录',
                signup: '注册',
                freeUser: '免费用户',
                logout: '退出',
                currentLanguageFlag: '🇨🇳 中文',
                tryText: '尝试:',
                popularGames: '热门派对游戏'
            },
            de: {
                allGames: 'Alle Spiele',
                theList: 'Die Liste',
                premium: 'Premium',
                minigames: 'Minispiele',
                login: 'Anmelden',
                signup: 'Registrieren',
                freeUser: 'Kostenlos',
                logout: 'Abmelden',
                currentLanguageFlag: '🇩🇪 Deutsch',
                tryText: 'Versuchen:',
                popularGames: 'Beliebte Party-Spiele'
            },
            fr: {
                allGames: 'Tous les Jeux',
                theList: 'La Liste',
                premium: 'Premium',
                minigames: 'Mini-jeux',
                login: 'Connexion',
                signup: 'S\'inscrire',
                freeUser: 'Utilisateur Gratuit',
                logout: 'Déconnexion',
                currentLanguageFlag: '🇫🇷 Français',
                tryText: 'Essayez:',
                popularGames: 'Jeux de Société Populaires'
            }
        };
        return translations[lang] || translations['en'];
    }

    createQuickAccessBar() {
        const popularGames = this.games.filter(game =>
            ['party', 'strategy'].includes(game.category) && game !== this.currentGame
        ).slice(0, 4);

        // Determine language prefix for links
        const currentPath = window.location.pathname;
        let langPrefix = '';
        let currentLang = 'en';
        if (currentPath.startsWith('/pt/')) {
            langPrefix = '/pt';
            currentLang = 'pt';
        } else if (currentPath.startsWith('/zh/')) {
            langPrefix = '/zh';
            currentLang = 'zh';
        } else if (currentPath.startsWith('/de/')) {
            langPrefix = '/de';
            currentLang = 'de';
        } else if (currentPath.startsWith('/fr/')) {
            langPrefix = '/fr';
            currentLang = 'fr';
        }

        // Get text in the current language
        const texts = this.getNavTexts(currentLang);

        if (popularGames.length > 0) {
            const quickBar = document.createElement('div');
            quickBar.className = 'quick-games-bar';
            quickBar.id = 'quickAccessBar';
            quickBar.innerHTML = `
                <button id="quick-access-toggle"><i class="fas fa-layer-group"></i></button>
                <a href="${langPrefix}/index.html" class="quick-game-btn home-btn"><i class="fas fa-home"></i> ${texts.allGames}</a>
                <a href="${langPrefix}/premium.html" class="quick-game-btn premium-btn premium-highlight"><i class="fas fa-crown"></i> ${texts.premium}</a>
                <a href="https://ozagames.com/" target="_blank" rel="noopener noreferrer" class="quick-game-btn"><i class="fas fa-gamepad"></i> ${texts.minigames}</a>
                <span id="try-text" style="color: rgba(255,255,255,0.7); font-size: 12px;">${texts.tryText}</span>
                ${popularGames.map(game => {
                    // Add language prefix to game URL if on non-English version
                    let gameUrl = game.url;
                    if (langPrefix && !gameUrl.startsWith(langPrefix)) {
                        gameUrl = langPrefix + gameUrl;
                    }
                    return `<a href="${gameUrl}" class="quick-game-btn">${game.name}</a>`;
                }).join('')}
            `;
            document.body.appendChild(quickBar);
        }
    }

    createOtherGamesPanel() {
        // Get all games
        const otherGames = this.games;

        // Determine current language from path
        const currentPath = window.location.pathname;
        let langPrefix = '';
        let currentLang = 'en';
        if (currentPath.startsWith('/pt/')) {
            langPrefix = '/pt';
            currentLang = 'pt';
        } else if (currentPath.startsWith('/zh/')) {
            langPrefix = '/zh';
            currentLang = 'zh';
        } else if (currentPath.startsWith('/de/')) {
            langPrefix = '/de';
            currentLang = 'de';
        } else if (currentPath.startsWith('/fr/')) {
            langPrefix = '/fr';
            currentLang = 'fr';
        }

        // Get text in the current language
        const texts = this.getNavTexts(currentLang);

        if (otherGames.length > 0) {
            const panel = document.createElement('div');
            panel.className = 'other-games-panel';
            panel.innerHTML = `
                <h3>${texts.popularGames}</h3>
                <div class="other-games-grid">
                    ${otherGames.map(game => {
                        // Add language prefix to game URL if on non-English version
                        let gameUrl = game.url;
                        if (langPrefix && !gameUrl.startsWith(langPrefix)) {
                            gameUrl = langPrefix + gameUrl;
                        }
                        return `
                            <a href="${gameUrl}" class="other-game-card ${game === this.currentGame ? 'current' : ''}">
                                <div class="other-game-logo">
                                    <img src="${game.logo}" alt="${game.name}" loading="lazy">
                                </div>
                                <div class="other-game-name">${game.name}</div>
                            </a>
                        `;
                    }).join('')}
                </div>
            `;

            // Insert panel based on screen size
            // On desktop: append to body (will be positioned fixed on right)
            // On mobile: insert after game container or before game-info
            const gameContainer = document.querySelector('.game-container, .container');
            const gameInfo = document.querySelector('.game-info');

            if (gameInfo && gameInfo.parentNode) {
                // Insert before game-info section
                gameInfo.parentNode.insertBefore(panel, gameInfo);
            } else if (gameContainer && gameContainer.nextSibling) {
                // Insert after game container
                gameContainer.parentNode.insertBefore(panel, gameContainer.nextSibling);
            } else {
                // Fallback: append to body
                document.body.appendChild(panel);
            }
        }
    }

    makeLogosClickable() {
        // Find game logos and make them clickable
        const logos = document.querySelectorAll('.game-logo, .logo-container img, img[alt*="Logo"], img[src*="logo"], img[src*="Logo"]');

        // Determine current language from path
        const currentPath = window.location.pathname;
        let homeUrl = '/index.html';
        if (currentPath.startsWith('/pt/')) {
            homeUrl = '/pt/index.html';
        } else if (currentPath.startsWith('/zh/')) {
            homeUrl = '/zh/index.html';
        } else if (currentPath.startsWith('/de/')) {
            homeUrl = '/de/index.html';
        } else if (currentPath.startsWith('/fr/')) {
            homeUrl = '/fr/index.html';
        }

        logos.forEach(logo => {
            if (!logo.closest('a')) { // Only if not already wrapped in a link
                logo.style.cursor = 'pointer';
                logo.addEventListener('click', () => {
                    window.location.href = homeUrl;
                });
                
                // Add hover effect
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

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu && !e.target.closest('.floating-nav')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('show');
            }
            if (quickAccessBar && !e.target.closest('#quickAccessBar')) {
                quickAccessBar.classList.remove('open');
            }
        });

        // Language dropdown functionality
        const languageToggle = document.querySelector('.language-toggle');
        const languageMenu = document.querySelector('.language-menu');
        
        if (languageToggle && languageMenu) {
            languageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                languageMenu.classList.toggle('show');
            });

            // Close language menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.language-dropdown')) {
                    languageMenu.classList.remove('show');
                }
            });

            // Handle language switching
            document.querySelectorAll('.language-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.switchLanguage(link.dataset.lang);
                });
            });
        }

        // Track navigation clicks for analytics
        document.querySelectorAll('.game-link, .quick-game-btn').forEach(link => {
            link.addEventListener('click', () => {
                this.trackNavigation(link.textContent.trim());
            });
        });
    }

    startPulseReminder() {
        // Add pulse effect to draw attention after user has been on page for 30 seconds
        setTimeout(() => {
            const navToggle = document.getElementById('navToggle');
            if (navToggle && !navToggle.classList.contains('active')) {
                navToggle.classList.add('pulse');

                // Remove pulse after interaction
                navToggle.addEventListener('click', () => {
                    navToggle.classList.remove('pulse');
                }, { once: true });
            }
        }, 30000);
    }

    switchLanguage(lang) {
        const currentPath = window.location.pathname;
        let newPath;

        // Games that don't have Portuguese/Chinese/German/French versions
        const englishOnlyGames = ['charades2', 'findthespy', 'numberguess'];
        const isEnglishOnly = englishOnlyGames.some(game => currentPath.includes(game));

        if (lang === 'pt') {
            // Switch to Portuguese version
            if (currentPath.startsWith('/pt/')) {
                // Already on Portuguese version
                return;
            }
            // If this is an English-only game, go to Portuguese homepage instead
            if (isEnglishOnly) {
                newPath = '/pt/index.html';
            } else {
                // Remove /zh/, /de/, and /fr/ if present, then add /pt/
                newPath = '/pt' + currentPath.replace('/zh/', '/').replace('/de/', '/').replace('/fr/', '/');
            }
        } else if (lang === 'zh') {
            // Switch to Chinese version
            if (currentPath.startsWith('/zh/')) {
                // Already on Chinese version
                return;
            }
            // If this is an English-only game, go to Chinese homepage instead
            if (isEnglishOnly) {
                newPath = '/zh/index.html';
            } else {
                // Remove /pt/, /de/ and /fr/ if present, then add /zh/
                newPath = '/zh' + currentPath.replace('/pt/', '/').replace('/de/', '/').replace('/fr/', '/');
            }
        } else if (lang === 'de') {
            // Switch to German version
            if (currentPath.startsWith('/de/')) {
                // Already on German version
                return;
            }
            // If this is an English-only game, go to German homepage instead
            if (isEnglishOnly) {
                newPath = '/de/index.html';
            } else {
                // Remove /pt/, /zh/ and /fr/ if present, then add /de/
                newPath = '/de' + currentPath.replace('/pt/', '/').replace('/zh/', '/').replace('/fr/', '/');
            }
        } else if (lang === 'fr') {
            // Switch to French version
            if (currentPath.startsWith('/fr/')) {
                // Already on French version
                return;
            }
            // If this is an English-only game, go to French homepage instead
            if (isEnglishOnly) {
                newPath = '/fr/index.html';
            } else {
                // Remove /pt/, /zh/, /de/ and /id/ if present, then add /fr/
                newPath = '/fr' + currentPath.replace('/pt/', '/').replace('/zh/', '/').replace('/de/', '/').replace('/id/', '/');
            }
        } else if (lang === 'id') {
            // Switch to Indonesian version
            if (currentPath.startsWith('/id/')) {
                // Already on Indonesian version
                return;
            }
            // If this is an English-only game, go to Indonesian homepage instead
            if (isEnglishOnly) {
                newPath = '/id/index.html';
            } else {
                // Remove /pt/, /zh/, /de/ and /fr/ if present, then add /id/
                newPath = '/id' + currentPath.replace('/pt/', '/').replace('/zh/', '/').replace('/de/', '/').replace('/fr/', '/');
            }
        } else {
            // Switch to English version
            if (!currentPath.startsWith('/pt/') && !currentPath.startsWith('/zh/') && !currentPath.startsWith('/de/') && !currentPath.startsWith('/fr/') && !currentPath.startsWith('/id/')) {
                // Already on English version
                return;
            }
            newPath = currentPath.replace('/pt', '').replace('/zh', '').replace('/de', '').replace('/fr', '').replace('/id', '');
        }

        window.location.href = newPath;
    }

    trackNavigation(gameName) {
        // Analytics tracking (can be integrated with Google Analytics or other tools)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'game_navigation', {
                'game_name': gameName,
                'source_game': this.currentGame?.name || 'unknown'
            });
        }
        console.log(`Navigation: ${this.currentGame?.name || 'unknown'} -> ${gameName}`);
    }

    // Method to show game recommendations based on current game
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
                <h3>You might also like...</h3>
                <div class="recommended-games">
                    ${games.map(game => `
                        <a href="${game.url}" class="recommended-game">
                            <span>${game.name}</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    `).join('')}
                </div>
                <button class="close-modal">Maybe Later</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 10000);

        // Close on click
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
    }

    // Method to be called when game ends
    onGameEnd() {
        setTimeout(() => {
            this.showRecommendations();
        }, 2000);
    }

    // Initialize authentication
    initAuth() {
        // Wait for auth manager to be available
        if (window.authManager) {
            this.setupAuthUI();
            window.authManager.onAuthStateChange((event, session) => {
                this.updateAuthUI(session);
            });
        } else {
            // Retry after a short delay
            setTimeout(() => this.initAuth(), 100);
        }
    }

    // Setup authentication UI
    setupAuthUI() {
        if (window.authManager && window.authManager.isAuthenticated()) {
            this.updateAuthUI({ user: window.authManager.getCurrentUser() });
        }
    }

    // Update auth UI based on user state
    updateAuthUI(session) {
        const authButtons = document.getElementById('nav-auth-buttons');
        const userInfo = document.getElementById('nav-user-info');

        if (!authButtons || !userInfo) return;

        if (session && session.user) {
            // User is logged in
            authButtons.style.display = 'none';
            userInfo.style.display = 'block';

            const userEmail = document.getElementById('nav-user-email');
            const userAvatar = document.getElementById('nav-user-avatar');
            const premiumStatus = document.getElementById('nav-premium-status');

            if (userEmail) userEmail.textContent = session.user.email;
            if (userAvatar) userAvatar.textContent = session.user.email.charAt(0).toUpperCase();

            // Check premium status if auth manager is available
            if (window.authManager && window.authManager.checkUserPremiumStatus) {
                window.authManager.checkUserPremiumStatus().then(isPremium => {
                    if (premiumStatus) {
                        premiumStatus.textContent = isPremium ? 'Premium' : 'Free User';
                        premiumStatus.className = isPremium ? 'premium-status-nav premium' : 'premium-status-nav free';
                    }
                });
            }
        } else {
            // User is not logged in
            authButtons.style.display = 'block';
            userInfo.style.display = 'none';
        }
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.gameNavigation = new GameNavigation();
});

// Expose methods for games to use
window.GameNavigationAPI = {
    showRecommendations: () => window.gameNavigation?.showRecommendations(),
    onGameEnd: () => window.gameNavigation?.onGameEnd()
}; 