/**
 * Spielnavigationskomponente (Deutsche Version)
 * Bietet verbesserte Navigation zwischen Spielen mit schwebendem Menü und Schnellzugriffsliste
 */

class GameNavigation {
    constructor() {
        this.games = [
            { name: 'Magischer 8er-Ball', url: '/de/games/magic8ball/magic8ball', category: 'solo' },
            { name: 'Wahrheit oder Pflicht', url: '/de/games/TruthorDare/TruthOrDare', category: 'party' },
            { name: 'Ich habe nie', url: '/de/games/NeverHaveIEver/NeverHaveIEver', category: 'party' },
            { name: 'Wer ist am ehesten', url: '/de/games/WhoIsMostLikely/WhoIsMostLikely', category: 'party' },
            { name: 'Würdest du eher', url: '/de/games/WouldYouRather/WouldYouRather', category: 'party' },
            { name: '21 Heiße Fragen', url: '/de/games/freaky21questions/freaky21questions', category: 'adult' },
            { name: 'Mafia', url: '/de/games/mafia/mafia', category: 'strategy' },
            { name: 'Undercover', url: '/de/games/undercover/undercover', category: 'strategy' },
            { name: 'Scharades', url: '/de/games/charades/charades', category: 'party' },
            { name: 'Hedbanz', url: '/de/games/hedbanzgame/hedbanzgame', category: 'party' },
            { name: 'Sex Würfel', url: '/de/games/sexdice/sexdice', category: 'adult' },
            { name: 'Biernummer', url: '/de/games/beernumber/beernumber', category: 'drinking' },
            { name: 'Königsbecher', url: '/de/games/KingsCup/KingsCup', category: 'drinking' }
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
                <h4><i class="fas fa-dice"></i> Andere Spiele</h4>
                <div class="game-links" id="gameLinks">
                    ${this.games.map(game => `
                        <a href="${game.url}" class="game-link ${game === this.currentGame ? 'current' : ''}"
                           data-category="${game.category}">
                            ${game.name}
                        </a>
                    `).join('')}
                </div>
                <div class="nav-actions">
                    <a href="/de/index.html">
                        <i class="fas fa-home"></i> Alle Spiele
                    </a>
                    <a href="/de/TheList.html">
                        <i class="fas fa-list"></i> Die Liste
                    </a>
                    <a href="/de/premium.html" class="premium-highlight">
                        <i class="fas fa-crown"></i> Premium
                    </a>
                    <div class="auth-section">
                        <div class="auth-buttons" id="nav-auth-buttons">
                            <a href="/de/login.html" class="auth-link login-link">
                                <i class="fas fa-sign-in-alt"></i><span>Anmelden</span>
                            </a>
                            <a href="/de/register.html" class="auth-link register-link">
                                <i class="fas fa-user-plus"></i><span>Registrieren</span>
                            </a>
                        </div>
                        <div class="user-info-nav" id="nav-user-info" style="display: none;">
                            <div class="user-details-nav">
                                <div class="user-avatar-nav" id="nav-user-avatar">U</div>
                                <div class="user-text">
                                    <div class="user-email-nav" id="nav-user-email">user@example.com</div>
                                    <span class="premium-status-nav" id="nav-premium-status">Kostenlos</span>
                                </div>
                            </div>
                            <button class="signout-btn" onclick="handleSignOut()">
                                <i class="fas fa-sign-out-alt"></i><span>Abmelden</span>
                            </button>
                        </div>
                    </div>
                    <div class="language-dropdown">
                        <button class="language-toggle">
                            <i class="fas fa-globe"></i> 🇩🇪 Deutsch
                        </button>
                                                <div class="language-menu">
                            <a href="#" class="language-link" data-lang="en">English</a>
                            <a href="#" class="language-link" data-lang="ru">Russian</a>
                            <a href="#" class="language-link" data-lang="pt">Portuguese</a>
                            <a href="#" class="language-link" data-lang="zh">Chinese</a>
                            <a href="#" class="language-link" data-lang="de">German</a>
                            <a href="#" class="language-link" data-lang="fr">French</a>
                            <a href="#" class="language-link" data-lang="id">Indonesian</a>
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
                <a href="/de/index.html" class="quick-game-btn home-btn"><i class="fas fa-home"></i> Startseite</a>
                <a href="/de/premium.html" class="quick-game-btn premium-btn premium-highlight"><i class="fas fa-crown"></i> Premium</a>
                <span id="try-text" style="color: rgba(255,255,255,0.7); font-size: 12px;">Versuchen:</span>
                ${popularGames.map(game => `
                    <a href="${game.url}" class="quick-game-btn">${game.name}</a>
                `).join('')}
            `;
            document.body.appendChild(quickBar);
        }
    }

    makeLogosClickable() {
        // Spiellogos suchen und anklickbar machen
        const logos = document.querySelectorAll('.game-logo, .logo-container img, img[alt*="Logo"], img[src*="logo"], img[src*="Logo"]');

        logos.forEach(logo => {
            if (!logo.closest('a')) { // Nur wenn nicht bereits in einem Link
                logo.style.cursor = 'pointer';
                logo.addEventListener('click', () => {
                    window.location.href = '/de/index.html';
                });

                // Hover-Effekt hinzufügen
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

        // Menü schließen, wenn außerhalb geklickt
        document.addEventListener('click', (e) => {
            if (navMenu && !e.target.closest('.floating-nav')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('show');
            }
            if (quickAccessBar && !e.target.closest('#quickAccessBar')) {
                quickAccessBar.classList.remove('open');
            }
        });

        // Sprachmenü-Funktionalität
        const languageToggle = document.querySelector('.language-toggle');
        const languageMenu = document.querySelector('.language-menu');

        if (languageToggle && languageMenu) {
            languageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                languageMenu.classList.toggle('show');
            });

            // Sprachmenü schließen, wenn außerhalb geklickt
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.language-dropdown')) {
                    languageMenu.classList.remove('show');
                }
            });

            // Sprachenwechsel verarbeiten
            document.querySelectorAll('.language-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.switchLanguage(link.dataset.lang);
                });
            });
        }

        // Navigationskl icks für Analytics verfolgen
        document.querySelectorAll('.game-link, .quick-game-btn').forEach(link => {
            link.addEventListener('click', () => {
                this.trackNavigation(link.textContent.trim());
            });
        });
    }

    startPulseReminder() {
        // Pulseffekt hinzufügen, um nach 30 Sekunden auf der Seite Aufmerksamkeit zu erregen
        setTimeout(() => {
            const navToggle = document.getElementById('navToggle');
            if (navToggle && !navToggle.classList.contains('active')) {
                navToggle.classList.add('pulse');

                // Puls nach Interaktion entfernen
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
            .replace('/id/', '/');

        if (lang === 'en') {
            if (!currentPath.startsWith('/ru/') && !currentPath.startsWith('/pt/') && !currentPath.startsWith('/zh/') && !currentPath.startsWith('/de/') && !currentPath.startsWith('/fr/') && !currentPath.startsWith('/id/')) {
                return;
            }
            newPath = currentPath.replace('/ru', '').replace('/pt', '').replace('/zh', '').replace('/de', '').replace('/fr', '').replace('/id', '');
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
        // Analytics-Verfolgung (kann mit Google Analytics oder anderen Tools integriert werden)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'game_navigation', {
                'game_name': gameName,
                'source_game': this.currentGame?.name || 'unknown'
            });
        }
        console.log(`Navigation: ${this.currentGame?.name || 'unknown'} -> ${gameName}`);
    }

    // Methode, um Spielempfehlungen basierend auf dem aktuellen Spiel zu zeigen
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
                <h3>Ihnen könnten auch diese Spiele gefallen...</h3>
                <div class="recommended-games">
                    ${games.map(game => `
                        <a href="${game.url}" class="recommended-game">
                            <span>${game.name}</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    `).join('')}
                </div>
                <button class="close-modal">Vielleicht später</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Automatisch nach 10 Sekunden entfernen
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 10000);

        // Beim Klick schließen
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
    }

    // Methode, die aufgerufen werden soll, wenn das Spiel endet
    onGameEnd() {
        setTimeout(() => {
            this.showRecommendations();
        }, 2000);
    }

    // Authentifizierung initialisieren
    initAuth() {
        // Warten Sie, bis der Authentifizierungs-Manager verfügbar ist
        if (window.authManager) {
            this.setupAuthUI();
            window.authManager.onAuthStateChange((event, session) => {
                this.updateAuthUI(session);
            });
        } else {
            // Erneut versuchen nach kurzer Verzögerung
            setTimeout(() => this.initAuth(), 100);
        }
    }

    // Authentifizierungs-UI einrichten
    setupAuthUI() {
        if (window.authManager && window.authManager.isAuthenticated()) {
            this.updateAuthUI({ user: window.authManager.getCurrentUser() });
        }
    }

    // Authentifizierungs-UI basierend auf Benutzerstatus aktualisieren
    updateAuthUI(session) {
        const authButtons = document.getElementById('nav-auth-buttons');
        const userInfo = document.getElementById('nav-user-info');

        if (!authButtons || !userInfo) return;

        if (session && session.user) {
            // Benutzer ist angemeldet
            authButtons.style.display = 'none';
            userInfo.style.display = 'block';

            const userEmail = document.getElementById('nav-user-email');
            const userAvatar = document.getElementById('nav-user-avatar');
            const premiumStatus = document.getElementById('nav-premium-status');

            if (userEmail) userEmail.textContent = session.user.email;
            if (userAvatar) userAvatar.textContent = session.user.email.charAt(0).toUpperCase();

            // Überprüfen Sie den Premium-Status, falls der Authentifizierungs-Manager verfügbar ist
            if (window.authManager && window.authManager.checkUserPremiumStatus) {
                window.authManager.checkUserPremiumStatus().then(isPremium => {
                    if (premiumStatus) {
                        premiumStatus.textContent = isPremium ? 'Premium' : 'Kostenlos';
                        premiumStatus.className = isPremium ? 'premium-status-nav premium' : 'premium-status-nav free';
                    }
                });
            }
        } else {
            // Benutzer ist nicht angemeldet
            authButtons.style.display = 'block';
            userInfo.style.display = 'none';
        }
    }
}

// Automatische Initialisierung, wenn DOM bereit ist
document.addEventListener('DOMContentLoaded', () => {
    window.gameNavigation = new GameNavigation();
});

// Methoden für Spiele verfügbar machen
window.GameNavigationAPI = {
    showRecommendations: () => window.gameNavigation?.showRecommendations(),
    onGameEnd: () => window.gameNavigation?.onGameEnd()
};



