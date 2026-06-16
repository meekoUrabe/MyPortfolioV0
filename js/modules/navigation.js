/* =============================================
   navigation.js — Mobile nav + smooth scroll
   ============================================= */

export function initNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList       = document.querySelector('.nav-list');

    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', () => {
            navList.classList.toggle('mobile-active');
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
            }
        });
    });
}
