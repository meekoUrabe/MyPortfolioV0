

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
                { text: 'Available commands:',                               cls: 'cli-output-line--response' },
                { text: '  whoami       — Who is NMZLI?',                   cls: 'cli-output-line--table'    },
                { text: '  ls / projects — List current projects.',          cls: 'cli-output-line--table'    },
                { text: '  skills       — Display technical capabilities.', cls: 'cli-output-line--table'    },
                { text: '  contact      — View contact & open connection.', cls: 'cli-output-line--table'    },
                { text: '  resume       — Download developer resume.',      cls: 'cli-output-line--table'    },
                { text: '  clear        — Clear the terminal.',             cls: 'cli-output-line--table'    },
                { text: '  exit         — Close Terminal V1.',              cls: 'cli-output-line--table'    },
                { text: 'Easter Eggs: neofetch, hack, matrix, joke',         cls: 'cli-output-line--system'   },
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

        skills() {
            return [
                { text: 'SYSTEM CAPABILITIES (ZaarrOS v1.0)', cls: 'cli-output-line--response' },
                { text: '==================================================', cls: 'cli-output-line--divider' },
                { text: '1. DATA & ANALYTICS', cls: 'cli-output-line--response' },
                { text: '   - Languages:       Python, SQL (SQLite/PostgreSQL)', cls: 'cli-output-line--table' },
                { text: '   - Operations:      Exploratory Data Analysis (EDA)', cls: 'cli-output-line--table' },
                { text: '   - Visualization:   Data visualization & telemetry pipelines', cls: 'cli-output-line--table' },
                { text: '2. FULL STACK & BACKEND', cls: 'cli-output-line--response' },
                { text: '   - Web frameworks:  MERN Stack (MongoDB, Express, React, Node.js)', cls: 'cli-output-line--table' },
                { text: '   - PHP stack:       Laravel', cls: 'cli-output-line--table' },
                { text: '   - Systems:         C++, Java', cls: 'cli-output-line--table' },
                { text: '   - Core Web:        HTML5, CSS3, ES6 Vanilla JS Modules', cls: 'cli-output-line--table' },
                { text: '==================================================', cls: 'cli-output-line--divider' },
            ];
        },

        contact() {
            setTimeout(() => {
                const connectBtn = document.getElementById('connect-btn');
                if (connectBtn) connectBtn.click();
            }, 1200);

            return [
                { text: 'ESTABLISHING SECURE CONNECTION LINK...', cls: 'cli-output-line--response' },
                { text: '==================================================', cls: 'cli-output-line--divider' },
                { text: 'Gmail:       zaarr06@gmail.com', cls: 'cli-output-line--table' },
                { text: 'LinkedIn:    https://www.linkedin.com/in/zaarr06/', cls: 'cli-output-line--table' },
                { text: 'GitHub:      https://github.com/meekoUrabe', cls: 'cli-output-line--table' },
                { text: '==================================================', cls: 'cli-output-line--divider' },
                { text: 'System: Bridging connection to GUI modal overlay in 1.2s...', cls: 'cli-output-line--system' }
            ];
        },

        connect() {
            return this.contact();
        },

        resume() {
            const resumeLink = 'https://drive.google.com/uc?export=download&id=14z9nwmXvMYyUsfSav4drB0g_KlkcZaaV';
            setTimeout(() => {
                window.open(resumeLink, '_blank');
            }, 1000);

            return [
                { text: 'INITIATING RESUME SECURE DOWNLINK...', cls: 'cli-output-line--response' },
                { text: `Download URL: ${resumeLink}`, cls: 'cli-output-line--table' },
                { text: 'System: Redirecting to resume file in 1s...', cls: 'cli-output-line--system' }
            ];
        },

        neofetch() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const seconds = Math.floor(performance.now() / 1000);
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            const uptimeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

            const logo = [
                "    .-----------------.   ",
                "   /  .--------------. \\  ",
                "  / /                  \\ \\ ",
                " / /    NMZLI_SYSTEM    \\ \\",
                " | |   Core: VanillaJS  | |",
                " | |   Theme: Cyberpunk | |",
                "  \\ \\                  / / ",
                "   \\  '--------------'  /  ",
                "    '-----------------'    ",
                "          ______           ",
                "        ._______/.         ",
                "        \\______/           "
            ];

            const info = [
                "visitor@nmzli_system",
                "--------------------",
                "OS: ZaarrOS v1.0 (Web-based)",
                "Host: Portfolio-SPA",
                `Uptime: ${uptimeStr}`,
                "Shell: Terminal_V1",
                `Resolution: ${width}x${height}`,
                "CPU: Coffee-powered Brain",
                "Memory: 1024MB / 16384MB (6%)",
                "Theme: Matrix Green / Glass",
                "Mission: AXIS Game Company"
            ];

            const combined = [];
            const maxLines = Math.max(logo.length, info.length);
            for (let i = 0; i < maxLines; i++) {
                const logoLine = logo[i] || " ".repeat(27);
                const infoLine = info[i] || "";
                combined.push({ text: logoLine + "   " + infoLine, cls: 'cli-output-line--response' });
            }
            return combined;
        },

        systemfetch() {
            return this.neofetch();
        },

        hack() {
            const hackSequence = [
                { text: 'Initializing bypass protocols on localhost...', cls: 'cli-output-line--system' },
                { text: 'Establishing secure proxy chain [HOP-1: 127.0.0.1, HOP-2: 192.168.1.100]...', cls: 'cli-output-line--system' },
                { text: 'Attempting SQL injection payload: \' UNION SELECT null, username, password FROM users --', cls: 'cli-output-line--table' },
                { text: 'Database response: 200 OK. Extraction successful.', cls: 'cli-output-line--response' },
                { text: 'Cracking administrator hash: e10adc3949ba59abbe56e057f20f883e...', cls: 'cli-output-line--table' },
                { text: 'Bypassing firewall verification: SUCCESS (MD5 matched: 123456).', cls: 'cli-output-line--response' },
                { text: '[!] WARNING: Intrusion Detection System alert triggered!', cls: 'cli-output-line--error' },
                { text: 'Evading trace routes & wiping access logs...', cls: 'cli-output-line--system' },
                { text: 'Establishing root backdoor: port 8080...', cls: 'cli-output-line--system' },
                { text: 'SYSTEM COMPROMISED. ROOT ACCESS GRANTED.', cls: 'cli-output-line--response' }
            ];

            let index = 0;
            inputEl.disabled = true;

            function printNext() {
                if (index < hackSequence.length) {
                    printLines([hackSequence[index]]);
                    index++;
                    setTimeout(printNext, 400);
                } else {
                    printSeparator();
                    inputEl.disabled = false;
                    inputEl.focus();
                }
            }

            printSeparator();
            printLines([{ text: 'WARNING: UNAUTHORIZED ACCESS DETECTED.', cls: 'cli-output-line--error' }]);
            printSeparator();
            setTimeout(printNext, 400);
            return null;
        },

        matrix() {
            inputEl.disabled = true;
            let count = 0;
            const matrixLines = 15;

            function printMatrixLine() {
                if (count < matrixLines) {
                    const length = 40 + Math.floor(Math.random() * 20);
                    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&*+-/\\ ';
                    let lineStr = '';
                    for (let i = 0; i < length; i++) {
                        lineStr += chars[Math.floor(Math.random() * chars.length)] + ' ';
                    }
                    printLines([{ text: lineStr, cls: 'cli-output-line--response' }]);
                    count++;
                    setTimeout(printMatrixLine, 100);
                } else {
                    printSeparator();
                    printLines([{ text: 'Matrix simulation complete. Reality restored.', cls: 'cli-output-line--system' }]);
                    printSeparator();
                    inputEl.disabled = false;
                    inputEl.focus();
                }
            }

            printSeparator();
            printLines([{ text: 'Wake up, Zaarr... The Matrix has you...', cls: 'cli-output-line--response' }]);
            printSeparator();
            setTimeout(printMatrixLine, 800);
            return null;
        },

        joke() {
            const jokes = [
                "Why do programmers wear glasses? Because they can't C#.",
                "There are 10 types of people in the world: those who understand binary, and those who don't.",
                "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
                "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
                "['hip', 'hip'] (hip hip array!)",
                "Why did the programmer quit their job? Because they didn't get arrays.",
                "What is a programmer's favorite hangout place? Foo Bar.",
                "To understand what recursion is, you must first understand recursion."
            ];
            const jokeText = jokes[Math.floor(Math.random() * jokes.length)];
            return [
                { text: jokeText, cls: 'cli-output-line--response' }
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

        const key     = raw.toLowerCase().replace(/\s+/g, ' ');
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
        if (e.key === 'Tab') {
            e.preventDefault();
            const val = inputEl.value.trim().toLowerCase().replace(/\s+/g, ' ');
            if (!val) return;

            const commandNames = [
                'help', 'whoami', 'ls', 'projects', 'skills', 'contact', 
                'connect', 'resume', 'clear', 'exit', 'sudo', 'neofetch', 
                'systemfetch', 'matrix', 'hack', 'joke'
            ];
            
            const matches = commandNames.filter(c => c.startsWith(val));
            
            if (matches.length === 1) {
                inputEl.value = matches[0];
                syncMirror();
            } else if (matches.length > 1) {
                printSeparator();
                printLines([{ text: 'Matches: ' + matches.join('   '), cls: 'cli-output-line--table' }]);
                printSeparator();
                scrollToBottom();
            }
            return;
        }

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
