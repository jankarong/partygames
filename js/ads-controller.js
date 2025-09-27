// Conditionally load Google AdSense for non-premium users only
(function () {
    async function shouldShowAds() {
        try {
            if (!window.authManager) return true; // anonymous => show ads
            if (!window.authManager.isAuthenticated()) return true;
            const isPremium = await window.authManager.checkUserPremiumStatus();
            return !isPremium;
        } catch (e) {
            console.warn('ads-controller: fallback to show ads', e);
            return true;
        }
    }

    function injectAdSenseScript() {
        if (document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) return;
        const s = document.createElement('script');
        s.async = true;
        s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1189261833219365';
        s.crossOrigin = 'anonymous';
        document.head.appendChild(s);
    }

    document.addEventListener('DOMContentLoaded', async () => {
        const show = await shouldShowAds();
        if (show) {
            injectAdSenseScript();
        } else {
            // Remove existing ad containers if any
            const adEls = document.querySelectorAll('.advertisement, [class*="adsbygoogle"]');
            adEls.forEach(el => el.remove());
        }
    });
})();



