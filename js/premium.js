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

    async function getSessionUrl() {
        if (!window.authManager || !window.authManager.isAuthenticated()) {
            authNotice && (authNotice.style.display = 'block');
            setStatus('You need to login to continue.');
            return;
        }

        try {
            // Use Supabase client created in auth.js
            const sb = window.supabaseClient || window.supabase;
            if (!sb) throw new Error('Supabase client not initialized');

            const { data: { session } } = await sb.auth.getSession();
            const jwt = session?.access_token;
            if (!jwt) {
                authNotice && (authNotice.style.display = 'block');
                setStatus('Not authenticated.');
                return;
            }

            // Call Edge Function using supabase-js
            const codeInput = document.getElementById('couponInput');
            const payload = {};
            const code = (codeInput && codeInput.value || '').trim();
            if (code) {
                // We pass promotion_code; Stripe will match if it's a valid promotion code id.
                // If you intend to pass Coupon ID instead, type 'coupon'.
                payload['promotion_code'] = code;
            }

            const { data, error } = await sb.functions.invoke('create-checkout-session', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${jwt}` },
                body: payload,
            });
            if (error) throw error;
            if (!data?.url) throw new Error('No session url');
            window.location.href = data.url;
        } catch (e) {
            console.error(e);
            setStatus('Failed to start checkout. Please try again.');
        }
    }

    if (button) {
        button.addEventListener('click', () => {
            setStatus('Redirecting to Stripe Checkout...');
            getSessionUrl();
        });
    }
})();


