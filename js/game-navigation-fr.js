/**
 * Composant de Navigation de Jeu (Version Française)
 * Fournit une navigation améliorée entre les jeux avec menu flottant et barre d'accès rapide
 */

class GameNavigation {
    constructor() {
        this.games = [
            { name: 'Boule 8 Magique', url: '/fr/games/magic8ball/magic8ball', category: 'solo' },
            { name: 'Vérité ou Défi', url: '/fr/games/TruthorDare/TruthOrDare', category: 'party' },
            { name: 'Je n\'ai Jamais', url: '/fr/games/NeverHaveIEver/NeverHaveIEver', category: 'party' },
            { name: 'Qui est le Plus Probable', url: '/fr/games/WhoIsMostLikely/WhoIsMostLikely', category: 'party' },
            { name: 'Tu Préfères Ou', url: '/fr/games/WouldYouRather/WouldYouRather', category: 'party' },
            { name: 'Mafia', url: '/fr/games/mafia/mafia', category: 'strategy' },
            { name: 'Infiltré', url: '/fr/games/undercover/undercover', category: 'strategy' },
            { name: 'Charades', url: '/fr/games/charades/charades', category: 'party' },
            { name: 'Hedbanz', url: '/fr/games/hedbanzgame/hedbanzgame', category: 'party' },
            { name: 'Dés Sexuels', url: '/fr/games/sexdice/sexdice', category: 'adult' },
            { name: 'Numéro de Bière', url: '/fr/games/beernumber/beernumber', category: 'drinking' },
            { name: 'Coupe du Roi', url: '/fr/games/KingsCup/KingsCup', category: 'drinking' }
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
                <h4><i class="fas fa-dice"></i> Autres Jeux</h4>
                <div class="game-links" id="gameLinks">
                    ${this.games.map(game => `
                        <a href="${game.url}" class="game-link ${game === this.currentGame ? 'current' : ''}"
                           data-category="${game.category}">
                            ${game.name}
                        </a>
                    `).join('')}
                </div>
                <div class="nav-actions">
                    <a href="/fr/index.html">
                        <i class="fas fa-home"></i> Tous les Jeux
                    </a>
                    <a href="/fr/TheList.html">
                        <i class="fas fa-list"></i> La Liste
                    </a>
                    <a href="/fr/premium.html" class="premium-highlight">
                        <i class="fas fa-crown"></i> Premium
                    </a>
                    <div class="auth-section">
                        <div class="auth-buttons" id="nav-auth-buttons">
                            <a href="/fr/login.html" class="auth-link login-link">
                                <i class="fas fa-sign-in-alt"></i><span>Connexion</span>
                            </a>
                            <a href="/fr/register.html" class="auth-link register-link">
                                <i class="fas fa-user-plus"></i><span>S'inscrire</span>
                            </a>
                        </div>
                        <div class="user-info-nav" id="nav-user-info" style="display: none;">
                            <div class="user-details-nav">
                                <div class="user-avatar-nav" id="nav-user-avatar">U</div>
                                <div class="user-text">
                                    <div class="user-email-nav" id="nav-user-email">user@example.com</div>
                                    <span class="premium-status-nav" id="nav-premium-status">Utilisateur Gratuit</span>
                                </div>
                            </div>
                            <button class="signout-btn" onclick="handleSignOut()">
                                <i class="fas fa-sign-out-alt"></i><span>Déconnexion</span>
                            </button>
                        </div>
                    </div>
                    <div class="language-dropdown">
                        <button class="language-toggle">
                            <i class="fas fa-globe"></i> 🇫🇷 Français
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
                <a href="/fr/index.html" class="quick-game-btn home-btn"><i class="fas fa-home"></i> Accueil</a>
                <a href="/fr/premium.html" class="quick-game-btn premium-btn premium-highlight"><i class="fas fa-crown"></i> Premium</a>
                <span id="try-text" style="color: rgba(255,255,255,0.7); font-size: 12px;">Essayez:</span>
                ${popularGames.map(game => `
                    <a href="${game.url}" class="quick-game-btn">${game.name}</a>
                `).join('')}
            `;
            document.body.appendChild(quickBar);
        }
    }

    makeLogosClickable() {
        // Trouvez les logos de jeu et les rendez cliquables
        const logos = document.querySelectorAll('.game-logo, .logo-container img, img[alt*="Logo"], img[src*="logo"], img[src*="Logo"]');

        logos.forEach(logo => {
            if (!logo.closest('a')) { // Uniquement s'il n'est pas déjà dans un lien
                logo.style.cursor = 'pointer';
                logo.addEventListener('click', () => {
                    window.location.href = '/fr/index.html';
                });

                // Ajouter un effet de survol
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

        // Fermer le menu en cliquant à l'extérieur
        document.addEventListener('click', (e) => {
            if (navMenu && !e.target.closest('.floating-nav')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('show');
            }
            if (quickAccessBar && !e.target.closest('#quickAccessBar')) {
                quickAccessBar.classList.remove('open');
            }
        });

        // Fonctionnalité du menu déroulant linguistique
        const languageToggle = document.querySelector('.language-toggle');
        const languageMenu = document.querySelector('.language-menu');

        if (languageToggle && languageMenu) {
            languageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                languageMenu.classList.toggle('show');
            });

            // Fermer le menu de langue en cliquant à l'extérieur
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.language-dropdown')) {
                    languageMenu.classList.remove('show');
                }
            });

            // Gérer le changement de langue
            document.querySelectorAll('.language-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.switchLanguage(link.dataset.lang);
                });
            });
        }

        // Suivre les clics de navigation pour l'analyse
        document.querySelectorAll('.game-link, .quick-game-btn').forEach(link => {
            link.addEventListener('click', () => {
                this.trackNavigation(link.textContent.trim());
            });
        });
    }

    startPulseReminder() {
        // Ajouter un effet de pulsation pour attirer l'attention après 30 secondes
        setTimeout(() => {
            const navToggle = document.getElementById('navToggle');
            if (navToggle && !navToggle.classList.contains('active')) {
                navToggle.classList.add('pulse');

                // Supprimer la pulsation après interaction
                navToggle.addEventListener('click', () => {
                    navToggle.classList.remove('pulse');
                }, { once: true });
            }
        }, 30000);
    }

    switchLanguage(lang) {
        const currentPath = window.location.pathname;
        let newPath;

        // Jeux qui n'ont pas de versions portugaise/chinoise/allemande/française
        const englishOnlyGames = ['charades2', 'findthespy', 'numberguess'];
        const isEnglishOnly = englishOnlyGames.some(game => currentPath.includes(game));

        if (lang === 'pt') {
            // Passer à la version portugaise
            if (currentPath.startsWith('/pt/')) {
                // Déjà sur la version portugaise
                return;
            }
            // Si c'est un jeu en anglais uniquement, aller à la page d'accueil portugaise
            if (isEnglishOnly) {
                newPath = '/pt/index.html';
            } else {
                // Supprimer /zh/, /de/ et /fr/, puis ajouter /pt/
                newPath = '/pt' + currentPath.replace('/zh/', '/').replace('/de/', '/').replace('/fr/', '/');
            }
        } else if (lang === 'zh') {
            // Passer à la version chinoise
            if (currentPath.startsWith('/zh/')) {
                // Déjà sur la version chinoise
                return;
            }
            // Si c'est un jeu en anglais uniquement, aller à la page d'accueil chinoise
            if (isEnglishOnly) {
                newPath = '/zh/index.html';
            } else {
                // Supprimer /pt/, /de/ et /fr/, puis ajouter /zh/
                newPath = '/zh' + currentPath.replace('/pt/', '/').replace('/de/', '/').replace('/fr/', '/');
            }
        } else if (lang === 'de') {
            // Passer à la version allemande
            if (currentPath.startsWith('/de/')) {
                // Déjà sur la version allemande
                return;
            }
            // Si c'est un jeu en anglais uniquement, aller à la page d'accueil allemande
            if (isEnglishOnly) {
                newPath = '/de/index.html';
            } else {
                // Supprimer /pt/, /zh/ et /fr/, puis ajouter /de/
                newPath = '/de' + currentPath.replace('/pt/', '/').replace('/zh/', '/').replace('/fr/', '/');
            }
        } else if (lang === 'fr') {
            // Passer à la version française
            if (currentPath.startsWith('/fr/')) {
                // Déjà sur la version française
                return;
            }
            // Si c'est un jeu en anglais uniquement, aller à la page d'accueil française
            if (isEnglishOnly) {
                newPath = '/fr/index.html';
            } else {
                // Supprimer /pt/, /zh/ et /de/, puis ajouter /fr/
                newPath = '/fr' + currentPath.replace('/pt/', '/').replace('/zh/', '/').replace('/de/', '/');
            }
        } else {
            // Passer à la version anglaise
            if (!currentPath.startsWith('/pt/') && !currentPath.startsWith('/zh/') && !currentPath.startsWith('/de/') && !currentPath.startsWith('/fr/')) {
                // Déjà sur la version anglaise
                return;
            }
            newPath = currentPath.replace('/pt', '').replace('/zh', '').replace('/de', '').replace('/fr', '');
        }

        window.location.href = newPath;
    }

    trackNavigation(gameName) {
        // Suivi analytique (peut être intégré à Google Analytics ou d'autres outils)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'game_navigation', {
                'game_name': gameName,
                'source_game': this.currentGame?.name || 'unknown'
            });
        }
        console.log(`Navigation: ${this.currentGame?.name || 'unknown'} -> ${gameName}`);
    }

    // Méthode pour afficher les recommandations de jeux basées sur le jeu actuel
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
                <h3>Vous aimerez peut-être aussi...</h3>
                <div class="recommended-games">
                    ${games.map(game => `
                        <a href="${game.url}" class="recommended-game">
                            <span>${game.name}</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    `).join('')}
                </div>
                <button class="close-modal">Peut-être plus tard</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Supprimer automatiquement après 10 secondes
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 10000);

        // Fermer au clic
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
    }

    // Méthode à appeler quand le jeu se termine
    onGameEnd() {
        setTimeout(() => {
            this.showRecommendations();
        }, 2000);
    }

    // Initialiser l'authentification
    initAuth() {
        // Attendre que le gestionnaire d'authentification soit disponible
        if (window.authManager) {
            this.setupAuthUI();
            window.authManager.onAuthStateChange((event, session) => {
                this.updateAuthUI(session);
            });
        } else {
            // Réessayer après un court délai
            setTimeout(() => this.initAuth(), 100);
        }
    }

    // Configurer l'UI d'authentification
    setupAuthUI() {
        if (window.authManager && window.authManager.isAuthenticated()) {
            this.updateAuthUI({ user: window.authManager.getCurrentUser() });
        }
    }

    // Mettre à jour l'UI d'authentification en fonction de l'état de l'utilisateur
    updateAuthUI(session) {
        const authButtons = document.getElementById('nav-auth-buttons');
        const userInfo = document.getElementById('nav-user-info');

        if (!authButtons || !userInfo) return;

        if (session && session.user) {
            // L'utilisateur est connecté
            authButtons.style.display = 'none';
            userInfo.style.display = 'block';

            const userEmail = document.getElementById('nav-user-email');
            const userAvatar = document.getElementById('nav-user-avatar');
            const premiumStatus = document.getElementById('nav-premium-status');

            if (userEmail) userEmail.textContent = session.user.email;
            if (userAvatar) userAvatar.textContent = session.user.email.charAt(0).toUpperCase();

            // Vérifier le statut premium si le gestionnaire d'authentification est disponible
            if (window.authManager && window.authManager.checkUserPremiumStatus) {
                window.authManager.checkUserPremiumStatus().then(isPremium => {
                    if (premiumStatus) {
                        premiumStatus.textContent = isPremium ? 'Premium' : 'Utilisateur Gratuit';
                        premiumStatus.className = isPremium ? 'premium-status-nav premium' : 'premium-status-nav free';
                    }
                });
            }
        } else {
            // L'utilisateur n'est pas connecté
            authButtons.style.display = 'block';
            userInfo.style.display = 'none';
        }
    }
}

// Initialisation automatique quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    window.gameNavigation = new GameNavigation();
});

// Exposer les méthodes pour que les jeux les utilisent
window.GameNavigationAPI = {
    showRecommendations: () => window.gameNavigation?.showRecommendations(),
    onGameEnd: () => window.gameNavigation?.onGameEnd()
};
