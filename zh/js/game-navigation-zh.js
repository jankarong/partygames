/**
 * 游戏导航组件 (中文版)
 * 提供游戏间增强导航，包含浮动菜单和快速访问栏
 */

class GameNavigation {
    constructor() {
        this.games = [
            { name: '神奇8号球', url: '/zh/games/magic8ball/magic8ball.html', category: 'solo' },
            { name: '真心话大冒险', url: '/zh/games/TruthorDare/TruthOrDare.html', category: 'party' },
            { name: '从来没有过', url: '/zh/games/NeverHaveIEver/NeverHaveIEver.html', category: 'party' },
            { name: '谁最可能', url: '/zh/games/WhoIsMostLikely/WhoIsMostLikely.html', category: 'party' },
            { name: '你更愿意', url: '/zh/games/WouldYouRather/WouldYouRather.html', category: 'party' },
            { name: '狼人杀', url: '/zh/games/mafia/mafia.html', category: 'strategy' },
            { name: '卧底', url: '/zh/games/undercover/undercover.html', category: 'strategy' },
            { name: '比划猜词', url: '/zh/games/charades/charades.html', category: 'party' },
            { name: '头脑风暴', url: '/zh/games/hedbanzgame/hedbanzgame.html', category: 'party' },
            { name: '情趣骰子', url: '/zh/games/sexdice/sexdice.html', category: 'adult' },
            { name: '啤酒数字', url: '/zh/games/beernumber/beernumber.html', category: 'drinking' },
            { name: '国王杯', url: '/zh/games/KingsCup/KingsCup.html', category: 'drinking' }
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
                    <a href="/zh/feedback.html">
                        <i class="fas fa-comment"></i> 反馈
                    </a>
                    <a href="/zh/TheList.html">
                        <i class="fas fa-list"></i> 游戏列表
                    </a>
                    <a href="/zh/premium.html" class="premium-highlight">
                        <i class="fas fa-crown"></i> Premium
                    </a>
                    <div class="language-dropdown">
                        <button class="language-toggle">
                            <i class="fas fa-globe"></i> 🇨🇳 中文
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
                <a href="/zh/index.html" class="quick-game-btn home-btn"><i class="fas fa-home"></i> 首页</a>
                <a href="/zh/premium.html" class="quick-game-btn premium-btn premium-highlight"><i class="fas fa-crown"></i> Premium</a>
                <span id="try-text" style="color: rgba(255,255,255,0.7); font-size: 12px;">试试:</span>
                ${popularGames.map(game => `
                    <a href="${game.url}" class="quick-game-btn">${game.name}</a>
                `).join('')}
            `;
            document.body.appendChild(quickBar);
        }
    }

    makeLogosClickable() {
        // 查找游戏logo并使其可点击
        const logos = document.querySelectorAll('.game-logo, .logo-container img, img[alt*="Logo"], img[src*="logo"], img[src*="Logo"]');
        
        logos.forEach(logo => {
            if (!logo.closest('a')) { // 只有当不在链接中时
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

        // 点击外部时关闭菜单
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

            // 点击外部时关闭语言菜单
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
        // 用户在页面停留30秒后添加脉冲效果以吸引注意力
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
        
        if (lang === 'zh') {
            // 切换到中文版
            if (currentPath.startsWith('/zh/')) {
                // 已经在中文版
                return;
            }
            newPath = '/zh' + currentPath;
        } else {
            // 切换到英文版
            if (!currentPath.startsWith('/zh/')) {
                // 已经在英文版
                return;
            }
            newPath = currentPath.replace('/zh', '');
        }
        
        window.location.href = newPath;
    }

    trackNavigation(gameName) {
        // 分析跟踪 (可与Google Analytics或其他工具集成)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'game_navigation', {
                'game_name': gameName,
                'source_game': this.currentGame?.name || 'unknown'
            });
        }
        console.log(`导航: ${this.currentGame?.name || 'unknown'} -> ${gameName}`);
    }

    // 基于当前游戏显示游戏推荐的方法
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
                <h3>你可能也会喜欢...</h3>
                <div class="recommended-games">
                    ${games.map(game => `
                        <a href="${game.url}" class="recommended-game">
                            <span>${game.name}</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    `).join('')}
                </div>
                <button class="close-modal">稍后再说</button>
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
}

// DOM准备就绪时自动初始化
document.addEventListener('DOMContentLoaded', () => {
    window.gameNavigation = new GameNavigation();
});

// 暴露方法供游戏使用
window.GameNavigationAPI = {
    showRecommendations: () => window.gameNavigation?.showRecommendations(),
    onGameEnd: () => window.gameNavigation?.onGameEnd()
};