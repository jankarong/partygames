// Supabase Configuration
const SUPABASE_URL = 'https://tpytgocthqevaamwsssx.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRweXRnb2N0aHFldmFhbXdzc3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1MjIxODIsImV4cCI6MjA3NDA5ODE4Mn0.sX8zYlIGejM8BY_HtXr2FNXgDkFsa0yRrx72ihMgyF8'

// 初始化Supabase客户端
let supabaseClient;

// 检查Supabase是否已加载
function initSupabase() {
    if (typeof supabase === 'undefined') {
        console.error('Supabase library not loaded');
        return false;
    }

    if (!supabaseClient) {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return true;
}

// 用户状态管理
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.authStateCallbacks = [];
    }

    // 初始化认证管理器
    async init() {
        if (!initSupabase()) return false;

        // 监听认证状态变化
        supabaseClient.auth.onAuthStateChange((event, session) => {
            console.log('Auth state changed:', event, session);
            this.currentUser = session?.user || null;
            this.notifyAuthStateCallbacks(event, session);
            this.updateUI();
        });

        // 获取当前会话
        const { data: { session } } = await supabaseClient.auth.getSession();
        this.currentUser = session?.user || null;
        this.updateUI();

        return true;
    }

    // 添加认证状态回调
    onAuthStateChange(callback) {
        this.authStateCallbacks.push(callback);
    }

    // 通知认证状态回调
    notifyAuthStateCallbacks(event, session) {
        this.authStateCallbacks.forEach(callback => {
            try {
                callback(event, session);
            } catch (error) {
                console.error('Auth state callback error:', error);
            }
        });
    }

    // 注册用户
    async signUp(email, password) {
        try {
            const { data, error } = await supabaseClient.auth.signUp({
                email: email,
                password: password
            });

            if (error) throw error;

            return { success: true, data: data };
        } catch (error) {
            console.error('Sign up error:', error);
            return { success: false, error: error.message };
        }
    }

    // 登录用户
    async signIn(email, password) {
        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) throw error;

            return { success: true, data: data };
        } catch (error) {
            console.error('Sign in error:', error);
            return { success: false, error: error.message };
        }
    }

    // 登出用户
    async signOut() {
        try {
            const { error } = await supabaseClient.auth.signOut();
            if (error) throw error;

            return { success: true };
        } catch (error) {
            console.error('Sign out error:', error);
            return { success: false, error: error.message };
        }
    }

    // 发送密码重置邮件
    async resetPassword(email) {
        try {
            const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + '/reset-password.html'
            });

            if (error) throw error;

            return { success: true, data: data };
        } catch (error) {
            console.error('Reset password error:', error);
            return { success: false, error: error.message };
        }
    }

    // 更新密码
    async updatePassword(newPassword) {
        try {
            const { data, error } = await supabaseClient.auth.updateUser({
                password: newPassword
            });

            if (error) throw error;

            return { success: true, data: data };
        } catch (error) {
            console.error('Update password error:', error);
            return { success: false, error: error.message };
        }
    }

    // 检查用户是否为付费用户
    async checkUserPremiumStatus() {
        if (!this.currentUser) return false;

        try {
            const { data, error } = await supabaseClient
                .from('users')
                .select('is_premium')
                .eq('id', this.currentUser.id)
                .single();

            if (error) {
                console.error('Error checking premium status:', error);
                return false;
            }

            return data?.is_premium || false;
        } catch (error) {
            console.error('Premium status check error:', error);
            return false;
        }
    }

    // 更新UI显示
    updateUI() {
        const authButtons = document.getElementById('auth-buttons');
        const userInfo = document.getElementById('user-info');

        if (!authButtons || !userInfo) return;

        if (this.currentUser) {
            // 用户已登录
            authButtons.style.display = 'none';
            userInfo.style.display = 'block';

            const userEmail = document.getElementById('user-email');
            const premiumStatus = document.getElementById('premium-status');

            if (userEmail) userEmail.textContent = this.currentUser.email;

            // 检查付费状态
            this.checkUserPremiumStatus().then(isPremium => {
                if (premiumStatus) {
                    premiumStatus.textContent = isPremium ? 'Premium' : 'Free User';
                    premiumStatus.className = isPremium ? 'badge bg-success' : 'badge bg-secondary';
                }

                // 根据付费状态显示/隐藏广告
                this.toggleAds(!isPremium);
            });
        } else {
            // 用户未登录
            authButtons.style.display = 'block';
            userInfo.style.display = 'none';

            // 显示广告（未登录用户）
            this.toggleAds(true);
        }
    }

    // 控制广告显示
    toggleAds(showAds) {
        const adElements = document.querySelectorAll('.advertisement, [class*="adsbygoogle"]');

        adElements.forEach(ad => {
            ad.style.display = showAds ? 'block' : 'none';
        });

        // 如果是付费用户，添加一个提示
        if (!showAds) {
            const adContainer = document.querySelector('.advertisement');
            if (adContainer && !document.getElementById('premium-message')) {
                const premiumMessage = document.createElement('div');
                premiumMessage.id = 'premium-message';
                premiumMessage.className = 'alert alert-success text-center';
                premiumMessage.innerHTML = '🎉 Thank you for being a premium member! Enjoy ad-free experience';
                adContainer.replaceWith(premiumMessage);
            }
        }
    }

    // 获取当前用户
    getCurrentUser() {
        return this.currentUser;
    }

    // 检查是否已登录
    isAuthenticated() {
        return this.currentUser !== null;
    }
}

// 创建全局认证管理器实例
window.authManager = new AuthManager();

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', async () => {
    const success = await window.authManager.init();
    if (!success) {
        console.error('Failed to initialize auth manager');
    }
});

// 通用表单处理函数
function handleAuthForm(formId, action) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        // 显示加载状态
        submitButton.disabled = true;
        submitButton.textContent = 'Processing...';

        try {
            let result;

            if (action === 'signup') {
                result = await window.authManager.signUp(email, password);
            } else if (action === 'signin') {
                result = await window.authManager.signIn(email, password);
            }

            if (result.success) {
                if (action === 'signup') {
                    showMessage('Registration successful! Please check your email for verification.', 'success');
                } else {
                    showMessage('Login successful!', 'success');
                    // 可以重定向到其他页面
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1500);
                }
            } else {
                showMessage('Error: ' + result.error, 'error');
            }
        } catch (error) {
            showMessage('An unknown error occurred: ' + error.message, 'error');
        } finally {
            // 恢复按钮状态
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}

// 显示消息
function showMessage(message, type = 'info') {
    // 移除现有消息
    const existingMessage = document.getElementById('auth-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // 创建新消息
    const messageDiv = document.createElement('div');
    messageDiv.id = 'auth-message';
    messageDiv.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show`;
    messageDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    // 插入到页面顶部
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(messageDiv, container.firstChild);

    // 5秒后自动消失
    setTimeout(() => {
        if (messageDiv && messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// 登出函数
async function handleSignOut() {
    const result = await window.authManager.signOut();
    if (result.success) {
        showMessage('Successfully logged out', 'success');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    } else {
        showMessage('Logout failed: ' + result.error, 'error');
    }
}