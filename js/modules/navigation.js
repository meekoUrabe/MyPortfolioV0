

export function initNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList       = document.querySelector('.nav-list');

    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', () => {
            const isActive = navList.classList.toggle('mobile-active');
            mobileMenuBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') { e.preventDefault(); return; }

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });

                if (navList && navList.classList.contains('mobile-active')) {
                    navList.classList.remove('mobile-active');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });
}
