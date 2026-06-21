

export function initModal() {
    const connectBtn    = document.getElementById('connect-btn');
    const connectModal  = document.getElementById('connect-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    if (!connectModal) return;

    function openModal() {
        connectModal.classList.remove('hidden');

        
        const card = connectModal.querySelector('.modal-card');
        card.style.animation = 'none';
        void card.offsetHeight; 
        card.style.animation = '';
    }

    function closeModal() {
        connectModal.classList.add('hidden');
    }

    if (connectBtn)    connectBtn.addEventListener('click', openModal);
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

    
    connectModal.addEventListener('click', (e) => {
        if (e.target === connectModal) closeModal();
    });

    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !connectModal.classList.contains('hidden')) {
            closeModal();
        }
    });
}
