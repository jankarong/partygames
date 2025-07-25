/**
 * Game Navigation Component
 * Provides enhanced navigation between games with floating menu and quick access bar
 */

class GameNavigation {
    constructor() {
        this.games = [
            { name: 'Magic 8 Ball', url: '/games/magic8ball/magic8ball.html', category: 'solo' },
            { name: 'Truth or Dare', url: '/games/TruthorDare/TruthOrDare.html', category: 'party' },
            { name: 'Never Have I Ever', url: '/games/NeverHaveIEver/NeverHaveIEver.html', category: 'party' },
            { name: 'Who Is Most Likely', url: '/games/WhoIsMostLikely/WhoIsMostLikely.html', category: 'party' },
            { name: 'Would You Rather', url: '/games/WouldYouRather/WouldYouRather.html', category: 'party' },
            { name: 'Mafia', url: '/games/mafia/mafia.html', category: 'strategy' },
            { name: 'Undercover', url: '/games/undercover/undercover.html', category: 'strategy' },
            { name: 'Charades', url: '/games/charades/charades.html', category: 'party' },
            { name: 'Hedbanz', url: '/games/hedbanzgame/hedbanzgame.html', category: 'party' },
            { name: 'Sex Dice', url: '/games/sexdice/sexdice.html', category: 'adult' },
            { name: 'Beer Number', url: '/games/beernumber/beernumber.html', category: 'drinking' }
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
                <h4><i class="fas fa-dice"></i> Other Games</h4>
                <div class="game-links" id="gameLinks">
                    ${this.games.map(game => `
                        <a href="${game.url}" class="game-link ${game === this.currentGame ? 'current' : ''}" 
                           data-category="${game.category}">
                            ${game.name}
                        </a>
                    `).join('')}
                </div>
                <div class="nav-actions">
                    <a href="/index.html">
                        <i class="fas fa-home"></i> All Games
                    </a>
                    <a href="/feedback.html">
                        <i class="fas fa-comment"></i> Feedback
                    </a>
                    <a href="/TheList.html">
                        <i class="fas fa-list"></i> The List
                    </a>
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
                <a href="/index.html" class="quick-game-btn home-btn"><i class="fas fa-home"></i> Home</a>
                <span id="try-text" style="color: rgba(255,255,255,0.7); font-size: 12px;">Try:</span>
                ${popularGames.map(game => `
                    <a href="${game.url}" class="quick-game-btn">${game.name}</a>
                `).join('')}
            `;
            document.body.appendChild(quickBar);
        }
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