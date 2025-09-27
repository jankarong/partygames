/**
 * Spiele-Navigation-Komponente (Deutsche Version)
 * Bietet erweiterte Navigation zwischen Spielen mit schwebendem Menü und Schnellzugriffs-Leiste
 */

class GameNavigation {
    constructor() {
        this.games = [
            { name: 'Magischer 8-Ball', url: '/de/games/magic8ball/magic8ball.html', category: 'solo' },
            { name: 'Wahrheit oder Pflicht', url: '/de/games/TruthorDare/TruthOrDare.html', category: 'party' },
            { name: 'Ich hab noch nie', url: '/de/games/NeverHaveIEver/NeverHaveIEver.html', category: 'party' },
            { name: 'Wer würde am ehesten', url: '/de/games/WhoIsMostLikely/WhoIsMostLikely.html', category: 'party' },
            { name: 'Was würdest du lieber', url: '/de/games/WouldYouRather/WouldYouRather.html', category: 'party' },
            { name: 'Werwolf', url: '/de/games/mafia/mafia.html', category: 'strategy' },
            { name: 'Undercover', url: '/de/games/undercover/undercover.html', category: 'strategy' },
            { name: 'Scharade', url: '/de/games/charades/charades.html', category: 'party' },
            { name: 'Hedbanz', url: '/de/games/hedbanzgame/hedbanzgame.html', category: 'party' },
            { name: 'Paar-Würfel', url: '/de/games/sexdice/sexdice.html', category: 'adult' },
            { name: 'Zahlen raten', url: '/de/games/beernumber/beernumber.html', category: 'drinking' },
            { name: 'Kings Cup', url: '/de/games/KingsCup/KingsCup.html', category: 'drinking' }
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
                    <a href="/de/feedback.html">
                        <i class="fas fa-comment"></i> Feedback
                    </a>
                    <a href="/de/TheList.html">
                        <i class="fas fa-list"></i> Spieleliste
                    </a>
                    <div class="language-dropdown">
                        <button class="language-toggle">
                            <i class="fas fa-globe"></i> 🇩🇪 Deutsch
                        </button>
                        <div class="language-menu">
                            <a href="#" class="language-link" data-lang="en">🇺🇸 English</a>
                            <a href="#" class="language-link" data-lang="zh">🇨🇳 中文</a>
                            <a href="#" class="language-link" data-lang="de">🇩🇪 Deutsch</a>
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
                <span id="try-text" style="color: rgba(255,255,255,0.7); font-size: 12px;">Probiere:</span>
                ${popularGames.map(game => `
                    <a href="${game.url}" class="quick-game-btn">${game.name}</a>
                `).join('')}
            `;
            document.body.appendChild(quickBar);
        }
    }

    makeLogosClickable() {
        // Finde Spiel-Logos und mache sie anklickbar
        const logos = document.querySelectorAll('.game-logo, .logo-container img, img[alt*="Logo"], img[src*="logo"], img[src*="Logo"]');
        
        logos.forEach(logo => {
            if (!logo.closest('a')) { // Nur wenn nicht bereits in einem Link
                logo.style.cursor = 'pointer';
                logo.addEventListener('click', () => {
                    window.location.href = '/de/index.html';
                });
                
                // Füge Hover-Effekt hinzu
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

        // Menü schließen beim Klick außerhalb
        document.addEventListener('click', (e) => {
            if (navMenu && !e.target.closest('.floating-nav')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('show');
            }
            if (quickAccessBar && !e.target.closest('#quickAccessBar')) {
                quickAccessBar.classList.remove('open');
            }
        });

        // Sprach-Dropdown-Funktionalität
        const languageToggle = document.querySelector('.language-toggle');
        const languageMenu = document.querySelector('.language-menu');
        
        if (languageToggle && languageMenu) {
            languageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                languageMenu.classList.toggle('show');
            });

            // Sprachmenü schließen beim Klick außerhalb
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.language-dropdown')) {
                    languageMenu.classList.remove('show');
                }
            });

            // Sprachwechsel handhaben
            document.querySelectorAll('.language-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.switchLanguage(link.dataset.lang);
                });
            });
        }

        // Verfolge Navigation-Klicks für Analytics
        document.querySelectorAll('.game-link, .quick-game-btn').forEach(link => {
            link.addEventListener('click', () => {
                this.trackNavigation(link.textContent.trim());
            });
        });
    }

    startPulseReminder() {
        // Füge Pulseffekt nach 30 Sekunden hinzu, um Aufmerksamkeit zu erregen
        setTimeout(() => {
            const navToggle = document.getElementById('navToggle');
            if (navToggle && !navToggle.classList.contains('active')) {
                navToggle.classList.add('pulse');

                // Entferne Puls nach Interaktion
                navToggle.addEventListener('click', () => {
                    navToggle.classList.remove('pulse');
                }, { once: true });
            }
        }, 30000);
    }

    switchLanguage(lang) {
        const currentPath = window.location.pathname;
        let newPath;
        
        if (lang === 'de') {
            // Zu deutscher Version wechseln
            if (currentPath.startsWith('/de/')) {
                // Bereits in deutscher Version
                return;
            }
            if (currentPath.startsWith('/zh/')) {
                newPath = currentPath.replace('/zh', '/de');
            } else {
                newPath = '/de' + currentPath;
            }
        } else if (lang === 'zh') {
            // Zu chinesischer Version wechseln
            if (currentPath.startsWith('/zh/')) {
                // Bereits in chinesischer Version
                return;
            }
            if (currentPath.startsWith('/de/')) {
                newPath = currentPath.replace('/de', '/zh');
            } else {
                newPath = '/zh' + currentPath;
            }
        } else {
            // Zu englischer Version wechseln
            if (!currentPath.startsWith('/zh/') && !currentPath.startsWith('/de/')) {
                // Bereits in englischer Version
                return;
            }
            if (currentPath.startsWith('/zh/')) {
                newPath = currentPath.replace('/zh', '');
            } else if (currentPath.startsWith('/de/')) {
                newPath = currentPath.replace('/de', '');
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

    // Methode zum Anzeigen von Spielempfehlungen basierend auf dem aktuellen Spiel
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
                <h3>Das könnte dir auch gefallen...</h3>
                <div class="recommended-games">
                    ${games.map(game => `
                        <a href="${game.url}" class="recommended-game">
                            <span>${game.name}</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    `).join('')}
                </div>
                <button class="close-modal">Später</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Automatisches Entfernen nach 10 Sekunden
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 10000);

        // Schließen beim Klick
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
    }

    // Methode, die beim Spielende aufgerufen wird
    onGameEnd() {
        setTimeout(() => {
            this.showRecommendations();
        }, 2000);
    }
}

// Automatische Initialisierung bei DOM-Bereitschaft
document.addEventListener('DOMContentLoaded', () => {
    window.gameNavigation = new GameNavigation();
});

// Methoden für Spiele verfügbar machen
window.GameNavigationAPI = {
    showRecommendations: () => window.gameNavigation?.showRecommendations(),
    onGameEnd: () => window.gameNavigation?.onGameEnd()
};