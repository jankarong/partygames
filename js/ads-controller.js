// Conditionally load Google AdSense for non-premium users only
(function () {
    let injected = false;

    function injectAdSenseScript() {
        // ⚠️ GOOGLE ADS TEMPORARILY DISABLED
        // To re-enable: Remove the return statement below
        // This is a temporary disable - just delete the line: return;
        return; // Google ads temporarily disabled
        if (injected) return;
        if (document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) { injected = true; return; }
        const s = document.createElement('script');
        s.async = true;
        s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1189261833219365';
        s.crossOrigin = 'anonymous';
        document.head.appendChild(s);
        injected = true;
    }

    async function decideAndApply() {
        try {
            const sb = window.supabaseClient || window.supabase;
            let session;
            if (sb?.auth?.getSession) {
                session = (await sb.auth.getSession()).data?.session;
                if (!session) {
                    await new Promise(r => setTimeout(r, 1000));
                    session = (await sb.auth.getSession()).data?.session;
                }
            }

            let showAds = true; // default for anonymous
            if (session && window.authManager) {
                const isPremium = await window.authManager.checkUserPremiumStatus();
                showAds = !isPremium;
            }

            if (showAds) {
                injectAdSenseScript();
            } else {
                const adEls = document.querySelectorAll('.advertisement, [class*="adsbygoogle"]');
                adEls.forEach(el => el.remove());
            }
        } catch (e) {
            console.warn('ads-controller: decision error, defaulting to show ads', e);
            injectAdSenseScript();
        }
    }

    document.addEventListener('DOMContentLoaded', decideAndApply);
    if (window.authManager?.onAuthStateChange) {
        window.authManager.onAuthStateChange(() => {
            decideAndApply();
        });
    }
})();



