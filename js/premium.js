// Frontend logic for premium checkout
(function () {
    const button = document.getElementById('goPremiumBtn');
    const status = document.getElementById('status');
    const authNotice = document.getElementById('authNotice');

    function setStatus(msg) {
        if (!status) return;
        status.style.display = 'block';
        status.textContent = msg;
    }

    async function checkPremiumStatus() {
        if (!window.authManager || !window.authManager.isAuthenticated()) {
            return false;
        }

        try {
            const isPremium = await window.authManager.checkUserPremiumStatus();
            return isPremium;
        } catch (e) {
            console.error('Error checking premium status:', e);
            return false;
        }
    }

    async function updateButtonState() {
        if (!window.authManager || !window.authManager.isAuthenticated()) {
            // User not logged in
            button.textContent = 'Login Required';
            button.disabled = true;
            authNotice && (authNotice.style.display = 'block');
            return;
        }

        const isPremium = await checkPremiumStatus();
        if (isPremium) {
            // User is already premium
            button.textContent = 'You are already a Premium member! 🎉';
            button.disabled = true;
            button.classList.remove('btn-primary', 'btn-success');
            button.style.background = 'linear-gradient(135deg, #64748b 0%, #475569 100%)';
            button.style.border = 'none';
            button.style.color = 'white';
            setStatus('You already have premium access. Enjoy ad-free experience!');
        } else {
            // User can purchase premium
            button.textContent = '🚀 Get Premium Now - Only $2.99';
            button.disabled = false;
            button.classList.remove('btn-primary', 'btn-outline-success');
            button.style.background = 'var(--gradient-primary)';
            button.style.border = 'none';
            button.style.color = 'white';
            authNotice && (authNotice.style.display = 'none');
        }
    }

    async function getSessionUrl() {
        console.log('Starting checkout process...');

        if (!window.authManager || !window.authManager.isAuthenticated()) {
            console.log('User not authenticated');
            authNotice && (authNotice.style.display = 'block');
            setStatus('You need to login to continue.');
            return;
        }

        // Check if user is already premium before creating payment
        const isPremium = await checkPremiumStatus();
        if (isPremium) {
            console.log('User already premium');
            setStatus('You are already a premium member!');
            return;
        }

        try {
            // Use Supabase client created in auth.js
            const sb = window.supabaseClient || window.supabase;
            console.log('Supabase client:', sb);
            if (!sb) throw new Error('Supabase client not initialized');

            const { data: { session } } = await sb.auth.getSession();
            const jwt = session?.access_token;
            if (!jwt) {
                authNotice && (authNotice.style.display = 'block');
                setStatus('Not authenticated.');
                return;
            }

            // Call Edge Function using supabase-js
            const payload = {};

            const { data, error } = await sb.functions.invoke('create-checkout-session', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${jwt}` },
                body: payload,
            });
            if (error) throw error;
            if (!data?.url) throw new Error('No session url');
            window.location.href = data.url;
        } catch (e) {
            console.error('Checkout error:', e);
            setStatus(`Failed to start checkout: ${e.message}. Please try again.`);
        }
    }

    if (button) {
        button.addEventListener('click', () => {
            setStatus('Redirecting to Stripe Checkout...');
            getSessionUrl();
        });
    }

    // Initialize button state when page loads
    document.addEventListener('DOMContentLoaded', () => {
        // Wait for auth manager to initialize
        const checkAuthManager = setInterval(() => {
            if (window.authManager) {
                clearInterval(checkAuthManager);
                updateButtonState();

                // Listen for auth state changes
                window.authManager.onAuthStateChange(() => {
                    updateButtonState();
                });
            }
        }, 100);
    });
})();


