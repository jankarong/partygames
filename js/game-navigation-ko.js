/**
 * 게임 내비게이션 컴포넌트 한국어판
 */

class GameNavigation {
    constructor() {
        this.games = [
            { name: '매직 8볼', url: '/ko/games/magic8ball/magic8ball.html', category: 'solo' },
            { name: '진실 혹은 도전', url: '/ko/games/TruthorDare/TruthOrDare.html', category: 'party' },
            { name: '커플 진실 혹은 도전', url: '/ko/games/truthordarequestionsforcouples/TruthOrDareQuestionsForCouples.html', category: 'adult' },
            { name: '나는 절대로...', url: '/ko/games/NeverHaveIEver/NeverHaveIEver.html', category: 'party' },
            { name: '누가 가장 ...할 것 같은가?', url: '/ko/games/WhoIsMostLikely/WhoIsMostLikely.html', category: 'party' },
            { name: '밸런스 게임', url: '/ko/games/WouldYouRather/WouldYouRather.html', category: 'party' },
            { name: '자극적인 파라노이아 질문', url: '/ko/games/paranoiaquestionsdirty/paranoiaquestionsdirty.html', category: 'adult' },
            { name: '마피아 게임', url: '/ko/games/mafia/mafia.html', category: 'strategy' },
            { name: '언더커버', url: '/ko/games/undercover/undercover.html', category: 'strategy' },
            { name: '몸으로 말해요', url: '/ko/games/charades/charades.html', category: 'party' },
            { name: '헤드반즈', url: '/ko/games/hedbanzgame/hedbanzgame.html', category: 'party' },
            { name: '커플 주사위', url: '/ko/games/sexdice/sexdice.html', category: 'adult' },
            { name: '숫자 맞추기 업다운', url: '/ko/games/beernumber/beernumber.html', category: 'drinking' },
            { name: '더 킹즈 컵', url: '/ko/games/KingsCup/KingsCup.html', category: 'drinking' }
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
                <h4><i class="fas fa-dice"></i> 다른 게임</h4>
                <div class="game-links" id="gameLinks">
                    ${this.games.map(game => `
                        <a href="${game.url}" class="game-link ${game === this.currentGame ? 'current' : ''}"
                           data-category="${game.category}">
                            ${game.name}
                        </a>
                    `).join('')}
                </div>
                <div class="nav-actions">
                    <div class="language-dropdown">
                        <button class="language-toggle"><i class="fas fa-globe"></i> 🇰🇷 한국어</button>
                        <div class="language-menu">
                            <a href="#" class="language-link" data-lang="en">🇺🇸 English</a>
                            <a href="#" class="language-link" data-lang="ko">🇰🇷 한국어</a>
                            <a href="#" class="language-link" data-lang="ja">🇯🇵 日本語</a>
                            <a href="#" class="language-link" data-lang="zh">🇨🇳 中文</a>
                            <a href="#" class="language-link" data-lang="ru">🇷🇺 Русский</a>
                            <a href="#" class="language-link" data-lang="pt">🇧🇷 Português</a>
                            <a href="#" class="language-link" data-lang="de">🇩🇪 Deutsch</a>
                            <a href="#" class="language-link" data-lang="fr">🇫🇷 Français</a>
                            <a href="#" class="language-link" data-lang="id">🇮🇩 Bahasa Indonesia</a>
                            <a href="#" class="language-link" data-lang="tr">🇹🇷 Türkçe</a>
                        </div>
                    </div>
                    <a href="/ko/index.html"><i class="fas fa-home"></i> 홈으로</a>
                    <a href="/ko/TheList.html"><i class="fas fa-list"></i> 모든 게임 목록</a>
                    <a href="/ko/premium.html" class="premium-highlight"><i class="fas fa-crown"></i> 프리미엄</a>
                    <div class="auth-section">
                        <div class="auth-buttons" id="nav-auth-buttons">
                            <a href="/ko/login.html" class="auth-link login-link"><i class="fas fa-sign-in-alt"></i><span>로그인</span></a>
                            <a href="/ko/register.html" class="auth-link register-link"><i class="fas fa-user-plus"></i><span>회원가입</span></a>
                        </div>
                        <div class="user-info-nav" id="nav-user-info" style="display: none;">
                            <div class="user-details-nav">
                                <div class="user-avatar-nav" id="nav-user-avatar">U</div>
                                <div class="user-text">
                                    <div class="user-email-nav" id="nav-user-email">user@example.com</div>
                                    <span class="premium-status-nav" id="nav-premium-status">무료 사용자</span>
                                </div>
                            </div>
                            <button class="signout-btn" onclick="handleSignOut()"><i class="fas fa-sign-out-alt"></i><span>로그아웃</span></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(floatingNav);
    }

    createQuickAccessBar() {
        const popularGames = this.games.filter(game => ['party', 'strategy'].includes(game.category) && game !== this.currentGame).slice(0, 4);
        if (popularGames.length > 0) {
            const quickBar = document.createElement('div');
            quickBar.className = 'quick-games-bar';
            quickBar.id = 'quickAccessBar';
            quickBar.innerHTML = `
                <button id="quick-access-toggle"><i class="fas fa-layer-group"></i></button>
                <a href="/ko/index.html" class="quick-game-btn home-btn"><i class="fas fa-home"></i> 홈</a>
                <a href="/ko/premium.html" class="quick-game-btn premium-btn premium-highlight"><i class="fas fa-crown"></i> 프리미엄</a>
                <span id="try-text" style="color: rgba(255,255,255,0.7); font-size: 12px;">추천:</span>
                ${popularGames.map(game => `<a href="${game.url}" class="quick-game-btn">${game.name}</a>`).join('')}
            `;
            document.body.appendChild(quickBar);
        }
    }

    makeLogosClickable() {
        const logos = document.querySelectorAll('.game-logo, .logo-container img, img[alt*="Logo"], img[src*="logo"], img[src*="Logo"]');
        logos.forEach(logo => {
            if (!logo.closest('a')) {
                logo.style.cursor = 'pointer';
                logo.addEventListener('click', () => {
                    window.location.href = '/ko/index.html';
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

        document.addEventListener('click', (e) => {
            if (navMenu && !e.target.closest('.floating-nav')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('show');
            }
            if (quickAccessBar && !e.target.closest('#quickAccessBar')) {
                quickAccessBar.classList.remove('open');
            }
        });

        const languageToggle = document.querySelector('.language-toggle');
        const languageMenu = document.querySelector('.language-menu');
        if (languageToggle && languageMenu) {
            languageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                languageMenu.classList.toggle('show');
            });
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.language-dropdown')) {
                    languageMenu.classList.remove('show');
                }
            });
            document.querySelectorAll('.language-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.switchLanguage(link.dataset.lang);
                });
            });
        }
    }

    startPulseReminder() {
        setTimeout(() => {
            const navToggle = document.getElementById('navToggle');
            if (navToggle && !navToggle.classList.contains('active')) {
                navToggle.classList.add('pulse');
            }
        }, 30000);
    }

    switchLanguage(lang) {
        const currentPath = window.location.pathname;
        let newPath;
        const stripLangPrefix = (path) => path
            .replace('/ko/', '/')
            .replace('/ru/', '/')
            .replace('/pt/', '/')
            .replace('/zh/', '/')
            .replace('/de/', '/')
            .replace('/fr/', '/')
            .replace('/id/', '/')
            .replace('/tr/', '/')
            .replace('/ja/', '/');

        if (lang === 'en') {
            newPath = currentPath.replace('/ko', '').replace('/ru', '').replace('/pt', '').replace('/zh', '').replace('/de', '').replace('/fr', '').replace('/id', '').replace('/tr', '').replace('/ja', '');
        } else {
            const langPrefix = `/${lang}`;
            if (currentPath.startsWith(`${langPrefix}/`)) {
                return;
            }
            newPath = langPrefix + stripLangPrefix(currentPath);
        }

        window.location.href = newPath;
    }

    initAuth() {
        if (window.authManager) {
            this.setupAuthUI();
            window.authManager.onAuthStateChange((event, session) => this.updateAuthUI(session));
        } else {
            setTimeout(() => this.initAuth(), 100);
        }
    }

    setupAuthUI() {
        if (window.authManager && window.authManager.isAuthenticated()) {
            this.updateAuthUI({ user: window.authManager.getCurrentUser() });
        }
    }

    updateAuthUI(session) {
        const authButtons = document.getElementById('nav-auth-buttons');
        const userInfo = document.getElementById('nav-user-info');
        if (!authButtons || !userInfo) return;

        if (session && session.user) {
            authButtons.style.display = 'none';
            userInfo.style.display = 'block';
            const userEmail = document.getElementById('nav-user-email');
            const userAvatar = document.getElementById('nav-user-avatar');
            const premiumStatus = document.getElementById('nav-premium-status');
            if (userEmail) userEmail.textContent = session.user.email;
            if (userAvatar) userAvatar.textContent = session.user.email.charAt(0).toUpperCase();
            if (window.authManager && window.authManager.checkUserPremiumStatus) {
                window.authManager.checkUserPremiumStatus().then(isPremium => {
                    if (premiumStatus) {
                        premiumStatus.textContent = isPremium ? '프리미엄 회원' : '무료 사용자';
                    }
                });
            }
        } else {
            authButtons.style.display = 'block';
            userInfo.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.gameNavigation = new GameNavigation();
});

window.GameNavigationAPI = {
    showRecommendations: () => window.gameNavigation?.showRecommendations?.(),
    onGameEnd: () => window.gameNavigation?.onGameEnd?.()
};
