/**
 * 游戏导航组件（中文版本）
 * 提供带有浮动菜单和快速访问栏的游戏之间的增强导航
 */

class GameNavigation {
    constructor() {
        this.games = [
            { name: '魔法8球', url: '/zh/games/magic8ball/magic8ball', category: 'solo' },
            { name: '真心话大冒险', url: '/zh/games/TruthorDare/TruthOrDare', category: 'party' },
            { name: '从不曾我从不', url: '/zh/games/NeverHaveIEver/NeverHaveIEver', category: 'party' },
            { name: '谁最有可能', url: '/zh/games/WhoIsMostLikely/WhoIsMostLikely', category: 'party' },
            { name: '你会选择谁', url: '/zh/games/WouldYouRather/WouldYouRather', category: 'party' },
            { name: '辛辣21问', url: '/zh/games/freaky21questions/freaky21questions', category: 'adult' },
            { name: '黑手党', url: '/zh/games/mafia/mafia', category: 'strategy' },
            { name: '卧底', url: '/zh/games/undercover/undercover', category: 'strategy' },
            { name: '词语接龙', url: '/zh/games/charades/charades', category: 'party' },
            { name: '头脑画吧', url: '/zh/games/hedbanzgame/hedbanzgame', category: 'party' },
            { name: '骰子游戏', url: '/zh/games/sexdice/sexdice', category: 'adult' },
            { name: '猜数字', url: '/zh/games/beernumber/beernumber', category: 'drinking' },
            { name: '国王杯', url: '/zh/games/KingsCup/KingsCup', category: 'drinking' }
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
                <h4><i class="fas fa-dice"></i> 其他游戏</h4>
                <div class="game-links" id="gameLinks">
                    ${this.games.map(game => `
                        <a href="${game.url}" class="game-link ${game === this.currentGame ? 'current' : ''}"
                           data-category="${game.category}">
                            ${game.name}
                        </a>
                    `).join('')}
                </div>
                <div class="nav-actions">
                    <a href="/zh/index.html">
                        <i class="fas fa-home"></i> 所有游戏
                    </a>
                    <a href="/zh/TheList.html">
                        <i class="fas fa-list"></i> 游戏列表
                    </a>
                    <a href="/zh/premium.html" class="premium-highlight">
                        <i class="fas fa-crown"></i> 高级版
                    </a>
                    <div class="auth-section">
                        <div class="auth-buttons" id="nav-auth-buttons">
                            <a href="/zh/login.html" class="auth-link login-link">
                                <i class="fas fa-sign-in-alt"></i><span>登录</span>
                            </a>
                            <a href="/zh/register.html" class="auth-link register-link">
                                <i class="fas fa-user-plus"></i><span>注册</span>
                            </a>
                        </div>
                        <div class="user-info-nav" id="nav-user-info" style="display: none;">
                            <div class="user-details-nav">
                                <div class="user-avatar-nav" id="nav-user-avatar">U</div>
                                <div class="user-text">
                                    <div class="user-email-nav" id="nav-user-email">user@example.com</div>
                                    <span class="premium-status-nav" id="nav-premium-status">免费用户</span>
                                </div>
                            </div>
                            <button class="signout-btn" onclick="handleSignOut()">
                                <i class="fas fa-sign-out-alt"></i><span>退出</span>
                            </button>
                        </div>
                    </div>
                    <div class="language-dropdown">
                        <button class="language-toggle">
                            <i class="fas fa-globe"></i> 🇨🇳 中文
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
                <a href="/zh/index.html" class="quick-game-btn home-btn"><i class="fas fa-home"></i> 首页</a>
                <a href="/zh/premium.html" class="quick-game-btn premium-btn premium-highlight"><i class="fas fa-crown"></i> 高级版</a>
                <span id="try-text" style="color: rgba(255,255,255,0.7); font-size: 12px;">尝试:</span>
                ${popularGames.map(game => `
                    <a href="${game.url}" class="quick-game-btn">${game.name}</a>
                `).join('')}
            `;
            document.body.appendChild(quickBar);
        }
    }

    makeLogosClickable() {
        // 查找游戏徽标并使其可点击
        const logos = document.querySelectorAll('.game-logo, .logo-container img, img[alt*="Logo"], img[src*="logo"], img[src*="Logo"]');

        logos.forEach(logo => {
            if (!logo.closest('a')) { // 仅在尚未链接中的情况下
                logo.style.cursor = 'pointer';
                logo.addEventListener('click', () => {
                    window.location.href = '/zh/index.html';
                });

                // 添加悬停效果
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

        // 点击外部关闭菜单
        document.addEventListener('click', (e) => {
            if (navMenu && !e.target.closest('.floating-nav')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('show');
            }
            if (quickAccessBar && !e.target.closest('#quickAccessBar')) {
                quickAccessBar.classList.remove('open');
            }
        });

        // 语言下拉菜单功能
        const languageToggle = document.querySelector('.language-toggle');
        const languageMenu = document.querySelector('.language-menu');

        if (languageToggle && languageMenu) {
            languageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                languageMenu.classList.toggle('show');
            });

            // 点击外部关闭语言菜单
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.language-dropdown')) {
                    languageMenu.classList.remove('show');
                }
            });

            // 处理语言切换
            document.querySelectorAll('.language-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.switchLanguage(link.dataset.lang);
                });
            });
        }

        // 跟踪导航点击以进行分析
        document.querySelectorAll('.game-link, .quick-game-btn').forEach(link => {
            link.addEventListener('click', () => {
                this.trackNavigation(link.textContent.trim());
            });
        });
    }

    startPulseReminder() {
        // 在用户在页面上30秒后添加脉冲效果以吸引注意
        setTimeout(() => {
            const navToggle = document.getElementById('navToggle');
            if (navToggle && !navToggle.classList.contains('active')) {
                navToggle.classList.add('pulse');

                // 交互后移除脉冲
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
        // 分析跟踪（可以与Google Analytics或其他工具集成）
        if (typeof gtag !== 'undefined') {
            gtag('event', 'game_navigation', {
                'game_name': gameName,
                'source_game': this.currentGame?.name || 'unknown'
            });
        }
        console.log(`导航: ${this.currentGame?.name || 'unknown'} -> ${gameName}`);
    }

    // 基于当前游戏显示游戏建议的方法
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
                <h3>您可能也喜欢...</h3>
                <div class="recommended-games">
                    ${games.map(game => `
                        <a href="${game.url}" class="recommended-game">
                            <span>${game.name}</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    `).join('')}
                </div>
                <button class="close-modal">稍后</button>
            </div>
        `;

        document.body.appendChild(modal);

        // 10秒后自动移除
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 10000);

        // 点击关闭
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
    }

    // 游戏结束时调用的方法
    onGameEnd() {
        setTimeout(() => {
            this.showRecommendations();
        }, 2000);
    }

    // 初始化身份验证
    initAuth() {
        // 等待身份验证管理器可用
        if (window.authManager) {
            this.setupAuthUI();
            window.authManager.onAuthStateChange((event, session) => {
                this.updateAuthUI(session);
            });
        } else {
            // 在短暂延迟后重试
            setTimeout(() => this.initAuth(), 100);
        }
    }

    // 设置身份验证UI
    setupAuthUI() {
        if (window.authManager && window.authManager.isAuthenticated()) {
            this.updateAuthUI({ user: window.authManager.getCurrentUser() });
        }
    }

    // 根据用户状态更新身份验证UI
    updateAuthUI(session) {
        const authButtons = document.getElementById('nav-auth-buttons');
        const userInfo = document.getElementById('nav-user-info');

        if (!authButtons || !userInfo) return;

        if (session && session.user) {
            // 用户已登录
            authButtons.style.display = 'none';
            userInfo.style.display = 'block';

            const userEmail = document.getElementById('nav-user-email');
            const userAvatar = document.getElementById('nav-user-avatar');
            const premiumStatus = document.getElementById('nav-premium-status');

            if (userEmail) userEmail.textContent = session.user.email;
            if (userAvatar) userAvatar.textContent = session.user.email.charAt(0).toUpperCase();

            // 如果身份验证管理器可用，检查高级状态
            if (window.authManager && window.authManager.checkUserPremiumStatus) {
                window.authManager.checkUserPremiumStatus().then(isPremium => {
                    if (premiumStatus) {
                        premiumStatus.textContent = isPremium ? '高级版' : '免费用户';
                        premiumStatus.className = isPremium ? 'premium-status-nav premium' : 'premium-status-nav free';
                    }
                });
            }
        } else {
            // 用户未登录
            authButtons.style.display = 'block';
            userInfo.style.display = 'none';
        }
    }
}

// DOM准备好后自动初始化
document.addEventListener('DOMContentLoaded', () => {
    window.gameNavigation = new GameNavigation();
});

// 为游戏公开方法
window.GameNavigationAPI = {
    showRecommendations: () => window.gameNavigation?.showRecommendations(),
    onGameEnd: () => window.gameNavigation?.onGameEnd()
};



