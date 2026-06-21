

import { initNavigation } from './modules/navigation.js';
import { initModal }      from './modules/modal.js';
import { initCLI }        from './modules/cli.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initModal();
    initCLI();
});
