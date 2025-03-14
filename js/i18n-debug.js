// Add this script to your HTML to debug i18n issues
// You can include it temporarily after i18n.js

document.addEventListener('DOMContentLoaded', function () {
    console.log('i18n Debug Tool Loaded');

    // Add a debug button to the page
    const debugBtn = document.createElement('button');
    debugBtn.textContent = 'Debug i18n';
    debugBtn.style.position = 'fixed';
    debugBtn.style.bottom = '10px';
    debugBtn.style.right = '10px';
    debugBtn.style.zIndex = '9999';
    debugBtn.style.padding = '8px 12px';
    debugBtn.style.backgroundColor = '#007bff';
    debugBtn.style.color = 'white';
    debugBtn.style.border = 'none';
    debugBtn.style.borderRadius = '4px';
    debugBtn.style.cursor = 'pointer';

    debugBtn.addEventListener('click', function () {
        // Check if i18next is loaded
        if (typeof i18next === 'undefined') {
            alert('i18next is not loaded!');
            return;
        }

        // Display current language
        const currentLang = i18next.language;
        console.log('Current language:', currentLang);

        // Check if translations are loaded
        const isInitialized = i18next.isInitialized;
        console.log('i18next initialized:', isInitialized);

        // Try to get a translation
        const navGamesTranslation = i18next.t('nav.games');
        console.log('Translation for "nav.games":', navGamesTranslation);

        // Check all data-i18n elements
        const i18nElements = document.querySelectorAll('[data-i18n]');
        console.log('Elements with data-i18n:', i18nElements.length);

        // Check locales path
        fetch('./locales/en/translation.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('English translations loaded successfully:', data);
            })
            .catch(error => {
                console.error('Error loading English translations:', error);
            });

        // Check current language translations
        if (currentLang !== 'en') {
            fetch(`./locales/${currentLang}/translation.json`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(`${currentLang} translations loaded successfully:`, data);
                })
                .catch(error => {
                    console.error(`Error loading ${currentLang} translations:`, error);
                });
        }

        // Create a debug overlay
        const debugInfo = document.createElement('div');
        debugInfo.style.position = 'fixed';
        debugInfo.style.top = '50%';
        debugInfo.style.left = '50%';
        debugInfo.style.transform = 'translate(-50%, -50%)';
        debugInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        debugInfo.style.color = 'white';
        debugInfo.style.padding = '20px';
        debugInfo.style.borderRadius = '5px';
        debugInfo.style.zIndex = '10000';
        debugInfo.style.maxWidth = '80%';
        debugInfo.style.maxHeight = '80%';
        debugInfo.style.overflow = 'auto';

        debugInfo.innerHTML = `
      <h3>i18n Debug Info</h3>
      <p><strong>Current language:</strong> ${currentLang}</p>
      <p><strong>i18next initialized:</strong> ${isInitialized}</p>
      <p><strong>Translation for "nav.games":</strong> ${navGamesTranslation}</p>
      <p><strong>Elements with data-i18n:</strong> ${i18nElements.length}</p>
      <button id="close-debug">Close</button>
    `;

        document.body.appendChild(debugInfo);

        document.getElementById('close-debug').addEventListener('click', function () {
            document.body.removeChild(debugInfo);
        });
    });

    document.body.appendChild(debugBtn);
}); 