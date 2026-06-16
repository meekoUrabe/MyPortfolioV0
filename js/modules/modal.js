/* =============================================
   modal.js — Connect modal
   ============================================= */

export function initModal() {
    const connectBtn    = document.getElementById('connect-btn');
    const connectModal  = document.getElementById('connect-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    if (!connectModal) return;

    function openModal() {
        connectModal.classList.remove('hidden');

        // Re-trigger entrance animation on every open
        const card = connectModal.querySelector('.modal-card');
        card.style.animation = 'none';
        void card.offsetHeight; // force reflow
        card.style.animation = '';
    }

    function closeModal() {
        connectModal.classList.add('hidden');
    }

    if (connectBtn)    connectBtn.addEventListener('click', openModal);
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

    // Backdrop click → close
    connectModal.addEventListener('click', (e) => {
        if (e.target === connectModal) closeModal();
    });

    // Escape key → close (only acts when modal is open)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !connectModal.classList.contains('hidden')) {
            closeModal();
        }
    });
}
