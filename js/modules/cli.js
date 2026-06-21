

export function initCLI() {

    
    const trigger   = document.getElementById('terminal-trigger');
    const overlay   = document.getElementById('cli-overlay');
    const closeBtn  = document.getElementById('cli-close-btn');
    const cliBody   = document.getElementById('cli-body');
    const outputEl  = document.getElementById('cli-output');
    const inputEl   = document.getElementById('cli-input');
    const cursorEl  = document.getElementById('cli-cursor');

    if (!overlay || !inputEl) return;

    
    const wrapper  = inputEl.parentElement; 
    const mirrorEl = document.createElement('span');
    mirrorEl.className = 'cli-input-mirror';
    wrapper.insertBefore(mirrorEl, cursorEl);

    
    const cmdHistory = [];
    let historyIndex = -1;

    
    const COMMANDS = {

        help() {
            return [
                { text: 'Available commands:',                        cls: 'cli-output-line--response' },
                { text: '  whoami       — Who is NMZLI?',            cls: 'cli-output-line--table'    },
                { text: '  ls / projects — List current projects.',   cls: 'cli-output-line--table'    },
                { text: '  clear        — Clear the terminal.',        cls: 'cli-output-line--table'    },
                { text: '  exit         — Close Terminal V1.',         cls: 'cli-output-line--table'    },
            ];
        },

        whoami() {
            return [
                { text: 'Nur Mohammad Zaarr L. Iraji.',    cls: 'cli-output-line--response' },
                { text: '1st-year ACT-NT student.',        cls: 'cli-output-line--response' },
                { text: 'Full Stack Engineer & Aspiring Data Analyst.',  cls: 'cli-output-line--response' },
            ];
        },

        'ls projects'() {
            return [
                { text: 'Projects/',                                            cls: 'cli-output-line--response' },
                { text: '  1.  StudyPy                 [MERN / Full Stack]',   cls: 'cli-output-line--table'    },
                { text: '  2.  TabiOS01                [VanillaJS / UI/UX]',   cls: 'cli-output-line--table'    },
                { text: '  3.  SteamSight              [Python / Postgres]',   cls: 'cli-output-line--table'    },
            ];
        },

        ls() {
            return this['ls projects']();
        },

        projects() {
            return this['ls projects']();
        },

        clear() {
            outputEl.innerHTML = '';
            return null;
        },

        exit() {
            closeCLI();
            return null;
        },

        sudo() {
            return [
                { text: 'Permission denied: visitor is not in the sudoers file. This incident will be reported.', cls: 'cli-output-line--error' },
            ];
        },
    };

    

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
        let handler   = COMMANDS[key];

        if (!handler && (key === 'sudo' || key.startsWith('sudo '))) {
            handler = COMMANDS['sudo'];
        }

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

    

    if (trigger) trigger.addEventListener('click', openCLI);
    if (closeBtn) closeBtn.addEventListener('click', closeCLI);

    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
            closeCLI();
        }
    });

    
    if (cliBody) {
        cliBody.addEventListener('click', () => inputEl.focus());
    }

    
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

    
    inputEl.addEventListener('input', syncMirror);

    
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
