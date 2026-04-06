/**
 * ゲームナビゲーションコンポーネント 日本語版
 */

class GameNavigation {
    constructor() {
        this.games = [
            { name: 'マジック8ボール', url: '/ja/games/magic8ball/magic8ball.html', category: 'solo' },
            { name: '真実か挑戦か', url: '/ja/games/TruthorDare/TruthOrDare.html', category: 'party' },
            { name: 'カップル向け真実か挑戦か', url: '/ja/games/truthordarequestionsforcouples/TruthOrDareQuestionsForCouples.html', category: 'adult' },
            { name: '私はやったことがない', url: '/ja/games/NeverHaveIEver/NeverHaveIEver.html', category: 'party' },
            { name: 'いちばんありそうなのは誰？', url: '/ja/games/WhoIsMostLikely/WhoIsMostLikely.html', category: 'party' },
            { name: 'どっちを選ぶ？', url: '/ja/games/WouldYouRather/WouldYouRather.html', category: 'party' },
            { name: '大人向けパラノイア質問', url: '/ja/games/paranoiaquestionsdirty/paranoiaquestionsdirty.html', category: 'adult' },
            { name: 'マフィア', url: '/ja/games/mafia/mafia.html', category: 'strategy' },
            { name: 'アンダーカバー', url: '/ja/games/undercover/undercover.html', category: 'strategy' },
            { name: 'ジェスチャーゲーム', url: '/ja/games/charades/charades.html', category: 'party' },
            { name: 'ヘッドバンズ', url: '/ja/games/hedbanzgame/hedbanzgame.html', category: 'party' },
            { name: 'セクシーダイス', url: '/ja/games/sexdice/sexdice.html', category: 'adult' },
            { name: 'ビール数字当て', url: '/ja/games/beernumber/beernumber.html', category: 'drinking' },
            { name: 'キングスカップ', url: '/ja/games/KingsCup/KingsCup.html', category: 'drinking' }
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
                <h4><i class="fas fa-dice"></i> ほかのゲーム</h4>
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
                        <button class="language-toggle"><i class="fas fa-globe"></i> 🇯🇵 日本語</button>
                        <div class="language-menu">
                            <a href="#" class="language-link" data-lang="en">🇺🇸 English</a>
                            <a href="#" class="language-link" data-lang="ja">🇯🇵 日本語</a>
                            <a href="#" class="language-link" data-lang="ru">🇷🇺 Русский</a>
                            <a href="#" class="language-link" data-lang="pt">🇧🇷 Português</a>
                            <a href="#" class="language-link" data-lang="zh">🇨🇳 中文</a>
                            <a href="#" class="language-link" data-lang="de">🇩🇪 Deutsch</a>
                            <a href="#" class="language-link" data-lang="fr">🇫🇷 Français</a>
                            <a href="#" class="language-link" data-lang="id">🇮🇩 Bahasa Indonesia</a>
                            <a href="#" class="language-link" data-lang="tr">🇹🇷 Türkçe</a>
                        </div>
                    </div>
                    <a href="/ja/index.html"><i class="fas fa-home"></i> すべてのゲーム</a>
                    <a href="/ja/TheList.html"><i class="fas fa-list"></i> ゲーム一覧</a>
                    <a href="/ja/premium.html" class="premium-highlight"><i class="fas fa-crown"></i> Premium</a>
                    <div class="auth-section">
                        <div class="auth-buttons" id="nav-auth-buttons">
                            <a href="/ja/login.html" class="auth-link login-link"><i class="fas fa-sign-in-alt"></i><span>ログイン</span></a>
                            <a href="/ja/register.html" class="auth-link register-link"><i class="fas fa-user-plus"></i><span>新規登録</span></a>
                        </div>
                        <div class="user-info-nav" id="nav-user-info" style="display: none;">
                            <div class="user-details-nav">
                                <div class="user-avatar-nav" id="nav-user-avatar">U</div>
                                <div class="user-text">
                                    <div class="user-email-nav" id="nav-user-email">user@example.com</div>
                                    <span class="premium-status-nav" id="nav-premium-status">無料プラン</span>
                                </div>
                            </div>
                            <button class="signout-btn" onclick="handleSignOut()"><i class="fas fa-sign-out-alt"></i><span>ログアウト</span></button>
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
                <a href="/ja/index.html" class="quick-game-btn home-btn"><i class="fas fa-home"></i> ホーム</a>
                <a href="/ja/premium.html" class="quick-game-btn premium-btn premium-highlight"><i class="fas fa-crown"></i> Premium</a>
                <span id="try-text" style="color: rgba(255,255,255,0.7); font-size: 12px;">おすすめ:</span>
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
                    window.location.href = '/ja/index.html';
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
        const englishOnlyGames = ['charades2', 'findthespy', 'numberguess'];
        const isEnglishOnly = englishOnlyGames.some(game => currentPath.includes(game));
        const stripLangPrefix = (path) => path
            .replace('/ru/', '/')
            .replace('/pt/', '/')
            .replace('/zh/', '/')
            .replace('/de/', '/')
            .replace('/fr/', '/')
            .replace('/id/', '/')
            .replace('/tr/', '/')
            .replace('/ja/', '/');

        if (lang === 'en') {
            newPath = currentPath.replace('/ru', '').replace('/pt', '').replace('/zh', '').replace('/de', '').replace('/fr', '').replace('/id', '').replace('/tr', '').replace('/ja', '');
        } else {
            const langPrefix = `/${lang}`;
            if (currentPath.startsWith(`${langPrefix}/`)) {
                return;
            }
            newPath = isEnglishOnly ? `${langPrefix}/index.html` : langPrefix + stripLangPrefix(currentPath);
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
                        premiumStatus.textContent = isPremium ? 'Premium会員' : '無料プラン';
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
