document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.querySelector('.site-header__nav');

    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        primaryNav.setAttribute('data-visible', !isExpanded);
    });

    // 点击导航链接时关闭导航菜单
    primaryNav.querySelectorAll('.site-header__nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            primaryNav.setAttribute('data-visible', 'false');
        });
    });

    // 点击页面其他地方时关闭导航菜单
    document.addEventListener('click', (e) => {
        if (!primaryNav.contains(e.target) && !navToggle.contains(e.target) && 
            primaryNav.getAttribute('data-visible') === 'true') {
            navToggle.setAttribute('aria-expanded', 'false');
            primaryNav.setAttribute('data-visible', 'false');
        }
    });
});
