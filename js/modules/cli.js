/* =============================================
   cli.js — Terminal V1 Easter Egg
   ============================================= */

export function initCLI() {

    // --- Element references ---
    const trigger   = document.getElementById('terminal-trigger');
    const overlay   = document.getElementById('cli-overlay');
    const closeBtn  = document.getElementById('cli-close-btn');
    const cliBody   = document.getElementById('cli-body');
    const outputEl  = document.getElementById('cli-output');
    const inputEl   = document.getElementById('cli-input');
    const cursorEl  = document.getElementById('cli-cursor');

    if (!overlay || !inputEl) return;

    // Build ghost-text mirror for cursor positioning
    const wrapper  = inputEl.parentElement; // .cli-input-wrapper
    const mirrorEl = document.createElement('span');
    mirrorEl.className = 'cli-input-mirror';
    wrapper.insertBefore(mirrorEl, cursorEl);

    // --- State (scoped inside initCLI) ---
    const cmdHistory = [];
    let historyIndex = -1;

    // --- Command registry ---
    const COMMANDS = {

        help() {
            return [
                { text: 'Available commands:',                        cls: 'cli-output-line--response' },
                { text: '  whoami       — Who is NMZLI?',            cls: 'cli-output-line--table'    },
                { text: '  ls projects  — List current projects.',    cls: 'cli-output-line--table'    },
                { text: '  clear        — Clear the terminal.',        cls: 'cli-output-line--table'    },
                { text: '  exit         — Close Terminal V1.',         cls: 'cli-output-line--table'    },
            ];
        },

        whoami() {
            return [
                { text: 'Nur Mohammad Zaarr L. Iraji.',    cls: 'cli-output-line--response' },
                { text: '1st-year ACT-NT student.',        cls: 'cli-output-line--response' },
                { text: 'Full Stack Dev & Data Analyst.',  cls: 'cli-output-line--response' },
                { text: 'Future founder of AXIS.',         cls: 'cli-output-line--response' },
            ];
        },

        'ls projects'() {
            return [
                { text: 'Projects/',                                            cls: 'cli-output-line--response' },
                { text: '  1.  E-Commerce Retention   [Data Analytics]',       cls: 'cli-output-line--table'    },
                { text: '  2.  studyPy Platform        [MERN / Full Stack]',   cls: 'cli-output-line--table'    },
                { text: '  3.  AsobiHobbyShop          [MERN / Full Stack]',   cls: 'cli-output-line--table'    },
            ];
        },

        clear() {
            outputEl.innerHTML = '';
            return null;
        },

        exit() {
            closeCLI();
            return null;
        },
    };

    // --- Helpers ---

    function printLines(lines) {
        if (!lines) return;
        lines.forEach(({ text, cls }) => {
            const p = document.createElement('p');
            p.className = `cli-output-line ${cls}`;
            p.textContent = text;
            outputEl.appendChild(p);
        });
        scrollToBottom();
    }

    function echoCommand(rawInput) {
        const p = document.createElement('p');
        p.className = 'cli-output-line cli-output-line--cmd';

        const promptSpan = document.createElement('span');
        promptSpan.className = 'cli-echo-prompt';
        promptSpan.textContent = 'visitor@nmzli:~$ ';

        p.appendChild(promptSpan);
        p.appendChild(document.createTextNode(rawInput));
        outputEl.appendChild(p);
    }

    function printSeparator() {
        const p = document.createElement('p');
        p.className = 'cli-output-line cli-output-line--divider';
        p.textContent = '─'.repeat(48);
        outputEl.appendChild(p);
    }

    function scrollToBottom() {
        outputEl.scrollTop = outputEl.scrollHeight;
    }

    function syncMirror() {
        mirrorEl.textContent = inputEl.value || '';
    }

    // --- Open / Close ---

    function openCLI(e) {
        if (e) e.preventDefault();
        overlay.classList.remove('hidden');

        const win = overlay.querySelector('.cli-window');
        win.style.animation = 'none';
        void win.offsetHeight;
        win.style.animation = '';

        inputEl.focus();
        scrollToBottom();
    }

    function closeCLI() {
        overlay.classList.add('hidden');
        inputEl.value = '';
        syncMirror();
    }

    // --- Command processor ---

    function processCommand() {
        const raw = inputEl.value.trim();
        inputEl.value = '';
        syncMirror();

        if (raw) {
            cmdHistory.unshift(raw);
            if (cmdHistory.length > 50) cmdHistory.pop();
        }
        historyIndex = -1;

        echoCommand(raw);

        if (!raw) {
            scrollToBottom();
            return;
        }

        const key     = raw.toLowerCase();
        const handler = COMMANDS[key];

        if (handler) {
            const result = handler();
            if (result !== null) {
                printSeparator();
                printLines(result);
            }
        } else {
            printSeparator();
            printLines([{
                text: `Command not found: '${raw}'. Type 'help' for available commands.`,
                cls: 'cli-output-line--error',
            }]);
        }

        printSeparator();
        scrollToBottom();
    }

    // --- Event listeners ---

    if (trigger) trigger.addEventListener('click', openCLI);
    if (closeBtn) closeBtn.addEventListener('click', closeCLI);

    // Escape key → close (only acts when overlay is open)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
            closeCLI();
        }
    });

    // Click anywhere on the terminal body to keep input focused
    if (cliBody) {
        cliBody.addEventListener('click', () => inputEl.focus());
    }

    // Enter → process; Arrow keys → history navigation
    inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            processCommand();
            return;
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < cmdHistory.length - 1) {
                historyIndex++;
                inputEl.value = cmdHistory[historyIndex];
                syncMirror();
                const len = inputEl.value.length;
                inputEl.setSelectionRange(len, len);
            }
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                inputEl.value = cmdHistory[historyIndex];
            } else {
                historyIndex = -1;
                inputEl.value = '';
            }
            syncMirror();
            const len = inputEl.value.length;
            inputEl.setSelectionRange(len, len);
            return;
        }
    });

    // Sync mirror on every keystroke
    inputEl.addEventListener('input', syncMirror);

    // Pause cursor blink while typing, resume after 800 ms idle
    let blinkTimeout;
    inputEl.addEventListener('keydown', () => {
        cursorEl.style.animationPlayState = 'paused';
        cursorEl.style.opacity = '1';
        clearTimeout(blinkTimeout);
        blinkTimeout = setTimeout(() => {
            cursorEl.style.animationPlayState = 'running';
        }, 800);
    });
}
