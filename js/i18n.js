// Initialize i18next
i18next
    .use(i18nextHttpBackend)
    .init({
        fallbackLng: 'en',
        debug: true,
        backend: {
            loadPath: './locales/{{lng}}/{{ns}}.json',
        },
        ns: ['translation'],
        defaultNS: 'translation',
        load: 'currentOnly',
        returnObjects: true
    }, function (err, t) {
        if (err) {
            console.error('i18next initialization error:', err);
        } else {
            console.log('i18next initialized successfully!');
        }

        // Initialize jqueryI18next
        jqueryI18next.init(i18next, $, {
            useOptionsAttr: true
        });

        // Apply translations to the page
        $('[data-i18n]').localize();
    });

// Function to update content with translations
function updateContent() {
    $('[data-i18n]').localize();
}

// Handle language selection
$(document).on('click', '[data-lang]', function (e) {
    e.preventDefault();
    const lang = $(this).data('lang');
    console.log('Changing language to:', lang);

    // Change language
    i18next.changeLanguage(lang, (err) => {
        if (err) {
            console.error('Error changing language:', err);
        } else {
            console.log('Language changed successfully to:', lang);
            // Update content after language change
            updateContent();

            // Store the selected language in localStorage
            localStorage.setItem('language', lang);

            // Update active language visual indicator
            updateActiveLanguage(lang);
        }
    });
});

// Load preferred language from localStorage on page load
$(document).ready(function () {
    // 从localStorage获取保存的语言，如果没有则使用浏览器语言或默认为英语
    const savedLang = localStorage.getItem('language') ||
        navigator.language.split('-')[0] ||
        'en';

    console.log('Initial language:', savedLang);

    // 设置初始语言
    i18next.changeLanguage(savedLang, (err) => {
        if (err) {
            console.error('Error setting initial language:', err);
        } else {
            console.log('Initial language set successfully to:', savedLang);
            updateContent();
            updateActiveLanguage(savedLang);
        }
    });

    // Check if locales directory exists and log any loading errors
    $.ajax({
        url: './locales',
        type: 'GET',
        success: function () {
            console.log('Locales directory accessible');
        },
        error: function (xhr, status, error) {
            console.error('Error accessing locales directory:', error);
        }
    });

    // 延迟一秒检查翻译，确保有足够时间加载
    setTimeout(checkTranslations, 1000);
});

// Update active language visual indicator
function updateActiveLanguage(lang) {
    // 移除所有语言选项的活动状态
    $('[data-lang]').removeClass('active');
    // 为当前语言添加活动状态
    $(`[data-lang="${lang}"]`).addClass('active');
}

// Debug function: Check if translations are correctly loaded
function checkTranslations() {
    console.log('Current language:', i18next.language);
    console.log('Available languages:', i18next.languages);
    console.log('Translation for hero.title:', i18next.t('hero.title'));
    console.log('Translation for nav.games:', i18next.t('nav.games'));
    console.log('Translation for games.playNow:', i18next.t('games.playNow'));
    console.log('All resources:', i18next.store.data);
} 