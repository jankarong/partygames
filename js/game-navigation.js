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
            { name: 'Beer Number', url: '/games/beernumber/beernumber.html', category: 'drinking' },
            { name: 'Kings Cup', url: '/games/KingsCup/KingsCup.html', category: 'drinking' }
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
                    <a href="/TheList.html">
                        <i class="fas fa-list"></i> The List
                    </a>
                    <a href="https://ko-fi.com/jankaaa" target="_blank" rel="noopener noreferrer" style="color: #fcbf47 !important;">
                        <i class="fas fa-heart"></i> Support me
                    </a>
                    <div class="auth-section">
                        <div class="auth-buttons" id="nav-auth-buttons">
                            <a href="/login.html" class="auth-link login-link">
                                <i class="fas fa-sign-in-alt"></i> Login
                            </a>
                            <a href="/register.html" class="auth-link register-link">
                                <i class="fas fa-user-plus"></i> Sign Up
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
                                <i class="fas fa-sign-out-alt"></i> Logout
                            </button>
                        </div>
                    </div>
                    <div class="language-dropdown">
                        <button class="language-toggle">
                            <i class="fas fa-globe"></i> 🇺🇸 English
                        </button>
                        <div class="language-menu">
                            <a href="#" class="language-link" data-lang="en">🇺🇸 English</a>
                            <a href="#" class="language-link" data-lang="zh">🇨🇳 中文</a>
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
                <a href="https://ko-fi.com/jankaaa" target="_blank" rel="noopener noreferrer" class="quick-game-btn support-btn" style="color: #fcbf47 !important;"><i class="fas fa-heart"></i> Support</a>
                <span id="try-text" style="color: rgba(255,255,255,0.7); font-size: 12px;">Try:</span>
                ${popularGames.map(game => `
                    <a href="${game.url}" class="quick-game-btn">${game.name}</a>
                `).join('')}
            `;
            document.body.appendChild(quickBar);
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
        
        if (lang === 'zh') {
            // Switch to Chinese version
            if (currentPath.startsWith('/zh/')) {
                // Already on Chinese version
                return;
            }
            newPath = '/zh' + currentPath;
        } else {
            // Switch to English version
            if (!currentPath.startsWith('/zh/')) {
                // Already on English version
                return;
            }
            newPath = currentPath.replace('/zh', '');
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