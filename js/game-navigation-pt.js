/**
 * Componente de Navegação de Jogos (Versão Portuguesa)
 * Fornece navegação aprimorada entre jogos com menu flutuante e barra de acesso rápido
 */

class GameNavigation {
    constructor() {
        this.games = [
            { name: 'Bola Mágica', url: '/pt/games/magic8ball/magic8ball', category: 'solo' },
            { name: 'Verdade ou Desafio', url: '/pt/games/TruthorDare/TruthOrDare', category: 'party' },
            { name: 'Nunca Fiz Isso', url: '/pt/games/NeverHaveIEver/NeverHaveIEver', category: 'party' },
            { name: 'Quem Tem Mais Chance', url: '/pt/games/WhoIsMostLikely/WhoIsMostLikely', category: 'party' },
            { name: 'Prefiro Ou Prefiro', url: '/pt/games/WouldYouRather/WouldYouRather', category: 'party' },
            { name: 'Máfia', url: '/pt/games/mafia/mafia', category: 'strategy' },
            { name: 'Infiltrado', url: '/pt/games/undercover/undercover', category: 'strategy' },
            { name: 'Mímica', url: '/pt/games/charades/charades', category: 'party' },
            { name: 'Hedbanz', url: '/pt/games/hedbanzgame/hedbanzgame', category: 'party' },
            { name: 'Dados de Sexo Online', url: '/pt/games/sexdice/sexdice', category: 'adult' },
            { name: 'Adivinha o Número', url: '/pt/games/beernumber/beernumber', category: 'drinking' },
            { name: 'Cálice do Rei', url: '/pt/games/KingsCup/KingsCup', category: 'drinking' }
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
                <h4><i class="fas fa-dice"></i> Outros Jogos</h4>
                <div class="game-links" id="gameLinks">
                    ${this.games.map(game => `
                        <a href="${game.url}" class="game-link ${game === this.currentGame ? 'current' : ''}"
                           data-category="${game.category}">
                            ${game.name}
                        </a>
                    `).join('')}
                </div>
                <div class="nav-actions">
                    <a href="/pt/index.html">
                        <i class="fas fa-home"></i> Todos os Jogos
                    </a>
                    <a href="/pt/TheList.html">
                        <i class="fas fa-list"></i> A Lista
                    </a>
                    <a href="/pt/premium.html" class="premium-highlight">
                        <i class="fas fa-crown"></i> Premium
                    </a>
                    <div class="auth-section">
                        <div class="auth-buttons" id="nav-auth-buttons">
                            <a href="/pt/login.html" class="auth-link login-link">
                                <i class="fas fa-sign-in-alt"></i><span>Entrar</span>
                            </a>
                            <a href="/pt/register.html" class="auth-link register-link">
                                <i class="fas fa-user-plus"></i><span>Criar Conta</span>
                            </a>
                        </div>
                        <div class="user-info-nav" id="nav-user-info" style="display: none;">
                            <div class="user-details-nav">
                                <div class="user-avatar-nav" id="nav-user-avatar">U</div>
                                <div class="user-text">
                                    <div class="user-email-nav" id="nav-user-email">user@example.com</div>
                                    <span class="premium-status-nav" id="nav-premium-status">Usuário Grátis</span>
                                </div>
                            </div>
                            <button class="signout-btn" onclick="handleSignOut()">
                                <i class="fas fa-sign-out-alt"></i><span>Sair</span>
                            </button>
                        </div>
                    </div>
                    <div class="language-dropdown">
                        <button class="language-toggle">
                            <i class="fas fa-globe"></i> 🇧🇷 Português
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
                <a href="/pt/index.html" class="quick-game-btn home-btn"><i class="fas fa-home"></i> Página Inicial</a>
                <a href="/pt/premium.html" class="quick-game-btn premium-btn premium-highlight"><i class="fas fa-crown"></i> Premium</a>
                <span id="try-text" style="color: rgba(255,255,255,0.7); font-size: 12px;">Tente:</span>
                ${popularGames.map(game => `
                    <a href="${game.url}" class="quick-game-btn">${game.name}</a>
                `).join('')}
            `;
            document.body.appendChild(quickBar);
        }
    }

    makeLogosClickable() {
        // Encontre logos de jogos e os torne clicáveis
        const logos = document.querySelectorAll('.game-logo, .logo-container img, img[alt*="Logo"], img[src*="logo"], img[src*="Logo"]');

        logos.forEach(logo => {
            if (!logo.closest('a')) { // Apenas se não estiver já em um link
                logo.style.cursor = 'pointer';
                logo.addEventListener('click', () => {
                    window.location.href = '/pt/index.html';
                });

                // Adicione efeito de hover
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

        // Feche o menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (navMenu && !e.target.closest('.floating-nav')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('show');
            }
            if (quickAccessBar && !e.target.closest('#quickAccessBar')) {
                quickAccessBar.classList.remove('open');
            }
        });

        // Funcionalidade do menu dropdown de idioma
        const languageToggle = document.querySelector('.language-toggle');
        const languageMenu = document.querySelector('.language-menu');

        if (languageToggle && languageMenu) {
            languageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                languageMenu.classList.toggle('show');
            });

            // Feche o menu de idioma ao clicar fora
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.language-dropdown')) {
                    languageMenu.classList.remove('show');
                }
            });

            // Lidar com troca de idioma
            document.querySelectorAll('.language-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.switchLanguage(link.dataset.lang);
                });
            });
        }

        // Rastreie cliques de navegação para análise
        document.querySelectorAll('.game-link, .quick-game-btn').forEach(link => {
            link.addEventListener('click', () => {
                this.trackNavigation(link.textContent.trim());
            });
        });
    }

    startPulseReminder() {
        // Adicione efeito de pulso para chamar atenção após 30 segundos
        setTimeout(() => {
            const navToggle = document.getElementById('navToggle');
            if (navToggle && !navToggle.classList.contains('active')) {
                navToggle.classList.add('pulse');

                // Remova pulso após interação
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
        // Rastreamento de análise (pode ser integrado com Google Analytics ou outras ferramentas)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'game_navigation', {
                'game_name': gameName,
                'source_game': this.currentGame?.name || 'unknown'
            });
        }
        console.log(`Navegação: ${this.currentGame?.name || 'unknown'} -> ${gameName}`);
    }

    // Método para mostrar recomendações de jogos baseado no jogo atual
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
                <h3>Você também pode gostar...</h3>
                <div class="recommended-games">
                    ${games.map(game => `
                        <a href="${game.url}" class="recommended-game">
                            <span>${game.name}</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    `).join('')}
                </div>
                <button class="close-modal">Talvez Mais Tarde</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Remova automaticamente após 10 segundos
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 10000);

        // Feche ao clicar
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
    }

    // Método a ser chamado quando o jogo terminar
    onGameEnd() {
        setTimeout(() => {
            this.showRecommendations();
        }, 2000);
    }

    // Inicializar autenticação
    initAuth() {
        // Aguarde o gerenciador de autenticação estar disponível
        if (window.authManager) {
            this.setupAuthUI();
            window.authManager.onAuthStateChange((event, session) => {
                this.updateAuthUI(session);
            });
        } else {
            // Tente novamente após um breve atraso
            setTimeout(() => this.initAuth(), 100);
        }
    }

    // Configurar UI de autenticação
    setupAuthUI() {
        if (window.authManager && window.authManager.isAuthenticated()) {
            this.updateAuthUI({ user: window.authManager.getCurrentUser() });
        }
    }

    // Atualizar UI de autenticação com base no estado do usuário
    updateAuthUI(session) {
        const authButtons = document.getElementById('nav-auth-buttons');
        const userInfo = document.getElementById('nav-user-info');

        if (!authButtons || !userInfo) return;

        if (session && session.user) {
            // Usuário está conectado
            authButtons.style.display = 'none';
            userInfo.style.display = 'block';

            const userEmail = document.getElementById('nav-user-email');
            const userAvatar = document.getElementById('nav-user-avatar');
            const premiumStatus = document.getElementById('nav-premium-status');

            if (userEmail) userEmail.textContent = session.user.email;
            if (userAvatar) userAvatar.textContent = session.user.email.charAt(0).toUpperCase();

            // Verifique o status premium se o gerenciador de autenticação estiver disponível
            if (window.authManager && window.authManager.checkUserPremiumStatus) {
                window.authManager.checkUserPremiumStatus().then(isPremium => {
                    if (premiumStatus) {
                        premiumStatus.textContent = isPremium ? 'Premium' : 'Usuário Grátis';
                        premiumStatus.className = isPremium ? 'premium-status-nav premium' : 'premium-status-nav free';
                    }
                });
            }
        } else {
            // Usuário não está conectado
            authButtons.style.display = 'block';
            userInfo.style.display = 'none';
        }
    }
}

// Inicialização automática quando o DOM está pronto
document.addEventListener('DOMContentLoaded', () => {
    window.gameNavigation = new GameNavigation();
});

// Exponha métodos para jogos usarem
window.GameNavigationAPI = {
    showRecommendations: () => window.gameNavigation?.showRecommendations(),
    onGameEnd: () => window.gameNavigation?.onGameEnd()
};




