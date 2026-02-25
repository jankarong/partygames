/**
 * 悬浮广告管理器
 * 创建和管理页面底部的悬浮广告
 */

class FloatingAdManager {
    constructor(options = {}) {
        this.options = {
            showDelay: options.showDelay || 2000, // 页面加载后延迟显示（毫秒）
            scrollTrigger: options.scrollTrigger || false, // 是否需要滚动才显示
            scrollPercentage: options.scrollPercentage || 30, // 滚动百分比触发显示
            adCode: options.adCode || null, // 广告HTML代码
            containerClass: options.containerClass || '', // 容器额外类名
            bodyClass: options.bodyClass || '', // body额外类名
            storageKey: 'floatingAdClosed', // 存储关闭状态的key
            rememberClosure: options.rememberClosure !== false, // 是否记住用户关闭状态
            ...options
        };

        this.isShown = false;
        this.hasScrollTriggered = false;
        this.init();
    }

    /**
     * 初始化广告管理器
     */
    async init() {
        // 检查用户是否在本次会话中关闭了广告
        if (this.options.rememberClosure && this.isAdClosed()) {
            return;
        }

        // 检查用户是否是高级会员 - 高级会员不显示广告
        if (await this.shouldHideForPremium()) {
            return;
        }

        // 确定何时显示广告
        if (this.options.scrollTrigger) {
            this.setupScrollTrigger();
        } else {
            // 延迟显示
            setTimeout(() => this.show(), this.options.showDelay);
        }
    }

    /**
     * 检查是否应该为高级会员隐藏广告
     */
    async shouldHideForPremium() {
        try {
            const sb = window.supabaseClient || window.supabase;
            let session;
            if (sb?.auth?.getSession) {
                session = (await sb.auth.getSession()).data?.session;
                if (!session) {
                    await new Promise(r => setTimeout(r, 500));
                    session = (await sb.auth.getSession()).data?.session;
                }
            }

            if (session && window.authManager) {
                const isPremium = await window.authManager.checkUserPremiumStatus();
                return isPremium; // 如果是高级会员，返回 true（隐藏广告）
            }
        } catch (e) {
            console.warn('floating-ad: premium check error', e);
        }
        return false; // 默认显示广告
    }

    /**
     * 设置滚动触发器
     */
    setupScrollTrigger() {
        window.addEventListener('scroll', () => {
            if (this.hasScrollTriggered) return;

            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

            if (scrollPercentage >= this.options.scrollPercentage) {
                this.hasScrollTriggered = true;
                this.show();
            }
        });
    }

    /**
     * 创建广告HTML元素
     */
    createAdElement() {
        const container = document.createElement('div');
        container.className = 'floating-ad-container';
        container.id = 'floating-ad-container';
        if (this.options.containerClass) {
            container.classList.add(this.options.containerClass);
        }

        const content = document.createElement('div');
        content.className = 'floating-ad-content';

        // 添加广告内容
        if (this.options.adCode) {
            content.innerHTML = this.options.adCode;
        }

        // 创建关闭按钮
        const closeBtn = document.createElement('button');
        closeBtn.className = 'floating-ad-close';
        closeBtn.innerHTML = '×';
        closeBtn.title = '关闭广告';
        closeBtn.addEventListener('click', () => this.close());

        content.appendChild(closeBtn);
        container.appendChild(content);

        return container;
    }

    /**
     * 显示广告
     */
    show() {
        if (this.isShown) return;

        const adElement = this.createAdElement();
        document.body.appendChild(adElement);
        document.body.classList.add('has-floating-ad');
        if (this.options.bodyClass) {
            document.body.classList.add(this.options.bodyClass);
        }
        this.isShown = true;
    }

    /**
     * 关闭广告
     */
    close() {
        const container = document.getElementById('floating-ad-container');
        if (container) {
            container.classList.add('hidden');
            // 可选：完全移除
            setTimeout(() => {
                container.remove();
                document.body.classList.remove('has-floating-ad');
                if (this.options.bodyClass) {
                    document.body.classList.remove(this.options.bodyClass);
                }
            }, 300);
        }

        // 记录关闭状态
        if (this.options.rememberClosure) {
            this.markAdAsClosed();
        }

        this.isShown = false;
    }

    /**
     * 检查广告是否已被关闭
     */
    isAdClosed() {
        const sessionClosed = sessionStorage.getItem(this.options.storageKey);
        const localClosed = localStorage.getItem(this.options.storageKey + '_permanent');
        return sessionClosed === 'true' || localClosed === 'true';
    }

    /**
     * 标记广告为已关闭
     */
    markAdAsClosed() {
        // 本会话内不再显示
        sessionStorage.setItem(this.options.storageKey, 'true');
    }

    /**
     * 清除关闭记录（用于测试）
     */
    resetClosure() {
        sessionStorage.removeItem(this.options.storageKey);
        localStorage.removeItem(this.options.storageKey + '_permanent');
    }
}

// 导出用于全局访问
window.FloatingAdManager = FloatingAdManager;
