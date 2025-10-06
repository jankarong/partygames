/**
 * Game Navigation Component
 * Provides enhanced navigation between games with floating menu and quick access bar
 */

class GameNavigation {
    constructor() {
        this.games = [
            { name: 'Magic 8 Ball', url: '/games/magic8ball/magic8ball.html', logo: '/games/magic8ball/magic8ball.svg', category: 'solo' },
            { name: 'Truth or Dare', url: '/games/TruthorDare/TruthOrDare.html', logo: '/games/TruthorDare/TruthorDareLogo.png', category: 'party' },
            { name: 'Never Have I Ever', url: '/games/NeverHaveIEver/NeverHaveIEver.html', logo: '/games/NeverHaveIEver/NeverHaveIEverLogo.png', category: 'party' },
            { name: 'Who Is Most Likely', url: '/games/WhoIsMostLikely/WhoIsMostLikely.html', logo: '/games/WhoIsMostLikely/MostLikelyToLogo.png', category: 'party' },
            { name: 'Would You Rather', url: '/games/WouldYouRather/WouldYouRather.html', logo: '/games/WouldYouRather/WouldYouRatherLogo.png', category: 'party' },
            { name: 'Mafia', url: '/games/mafia/mafia.html', logo: '/games/mafia/mafialogo.png', category: 'strategy' },
            { name: 'Undercover', url: '/games/undercover/undercover.html', logo: '/games/undercover/undercover.png', category: 'strategy' },
            { name: 'Charades', url: '/games/charades/charades.html', logo: '/games/charades/CharadesLogo.png', category: 'party' },
            { name: 'Hedbanz', url: '/games/hedbanzgame/hedbanzgame.html', logo: '/games/hedbanzgame/hedbanz.png', category: 'party' },
            { name: 'Bottle Match Game', url: '/games/BottleMatchGame/BottleMatchGame.html', logo: '/games/BottleMatchGame/bottlematch.png', category: 'solo' },
            { name: 'Sex Dice', url: '/games/sexdice/sexdice.html', logo: '/games/sexdice/sexdicelogo.png', category: 'adult' },
            { name: 'Beer Number', url: '/games/beernumber/beernumber.html', logo: '/games/beernumber/numberguessLogo.png', category: 'drinking' },
            { name: 'Kings Cup', url: '/games/KingsCup/KingsCup.html', logo: '/games/KingsCup/kingscuplogo.png', category: 'drinking' }
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
        this.createOtherGamesPanel();
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
                <div class="nav-actions">
                    <a href="/index.html">
                        <i class="fas fa-home"></i><span>All Games</span>
                    </a>
                    <a href="/TheList.html">
                        <i class="fas fa-list"></i><span>The List</span>
                    </a>
                    <a href="/premium.html" class="premium-highlight">
                        <i class="fas fa-crown"></i><span>Premium</span>
                    </a>
                    <div class="auth-section">
                        <div class="auth-buttons" id="nav-auth-buttons">
                            <a href="/login.html" class="auth-link login-link">
                                <i class="fas fa-sign-in-alt"></i><span>Login</span>
                            </a>
                            <a href="/register.html" class="auth-link register-link">
                                <i class="fas fa-user-plus"></i><span>Sign Up</span>
                            </a>
                        </div>
                        <div class="user-info-nav" id="nav-user-info" style="display: none;">
                            <div class="user-details-nav">
                                <div class="user-avatar-nav" id="nav-user-avatar">U</div>
                                <div class="user-text">
                                    <div class="user-email-nav" id="nav-user-email">user@example.com</div>
                                    <span class="premium-status-nav" id="nav-premium-status">Free User</span>
                                </div>
                            </div>
                            <button class="signout-btn" onclick="handleSignOut()">
                                <i class="fas fa-sign-out-alt"></i><span>Logout</span>
                            </button>
                        </div>
                    </div>
                    <div class="language-dropdown">
                        <button class="language-toggle">
                            <i class="fas fa-globe"></i><span>🇺🇸 English</span>
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
                <a href="/index.html" class="quick-game-btn home-btn"><i class="fas fa-home"></i> Home</a>
                <a href="/premium.html" class="quick-game-btn premium-btn premium-highlight"><i class="fas fa-crown"></i> Premium</a>
                <span id="try-text" style="color: rgba(255,255,255,0.7); font-size: 12px;">Try:</span>
                ${popularGames.map(game => `
                    <a href="${game.url}" class="quick-game-btn">${game.name}</a>
                `).join('')}
            `;
            document.body.appendChild(quickBar);
        }
    }

    createOtherGamesPanel() {
        // Get all games
        const otherGames = this.games;

        if (otherGames.length > 0) {
            const panel = document.createElement('div');
            panel.className = 'other-games-panel';
            panel.innerHTML = `
                <h3>Popular Party Games</h3>
                <div class="other-games-grid">
                    ${otherGames.map(game => `
                        <a href="${game.url}" class="other-game-card ${game === this.currentGame ? 'current' : ''}">
                            <div class="other-game-logo">
                                <img src="${game.logo}" alt="${game.name}" loading="lazy">
                            </div>
                            <div class="other-game-name">${game.name}</div>
                        </a>
                    `).join('')}
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
        
        logos.forEach(logo => {
            if (!logo.closest('a')) { // Only if not already wrapped in a link
                logo.style.cursor = 'pointer';
                logo.addEventListener('click', () => {
                    window.location.href = '/index.html';
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

        // Games that don't have Chinese/German versions
        const englishOnlyGames = ['charades2', 'findthespy', 'numberguess'];
        const isEnglishOnly = englishOnlyGames.some(game => currentPath.includes(game));

        if (lang === 'zh') {
            // Switch to Chinese version
            if (currentPath.startsWith('/zh/')) {
                // Already on Chinese version
                return;
            }
            // If this is an English-only game, go to Chinese homepage instead
            if (isEnglishOnly) {
                newPath = '/zh/index.html';
            } else {
                // Remove /de/ if present, then add /zh/
                newPath = '/zh' + currentPath.replace('/de/', '/');
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
                // Remove /zh/ if present, then add /de/
                newPath = '/de' + currentPath.replace('/zh/', '/');
            }
        } else {
            // Switch to English version
            if (!currentPath.startsWith('/zh/') && !currentPath.startsWith('/de/')) {
                // Already on English version
                return;
            }
            newPath = currentPath.replace('/zh', '').replace('/de', '');
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