// ============================================
// VisuAlg Web IDE - Main / App Wiring
// ============================================

(function () {
    'use strict';

    var editor = window.VisualGEditor;
    var terminal = window.Terminal;
    var varsPanel = window.VariablesPanel;
    var tabManager = window.TabManager;

    var btnRun, btnStep, btnStop, btnSave, btnSaveDropdown, saveMenu, btnOpen, btnExamples, fileInput, btnTheme, btnSettings, btnClearTerminal, btnClearVars, statusEl;
    var settingsOverlay, settingTheme, settingFontSize, settingFontSizeSlider, settingWordWrap, settingTabSize, settingIndentGuides;
    var settingVarsFontSize, settingVarsFontSizeSlider, settingConsoleFontSize, settingConsoleFontSizeSlider, settingConsoleInputMode;
    var settingGlobalFontSize, settingGlobalFontSizeSlider, settingGlobalFontUnit;
    var settingVarsColNome, settingVarsColTipo, settingVarsColValor;
    var settingLoopDetection;
    var _globalFontBase = { editor: 14, vars: 12, console: 13 };
    var ONBOARDING_STORAGE_KEY = 'visualg-onboarding-complete-v1';
    var SECTION_VISIBILITY_KEY = 'visualg-section-visibility-v1';
    var sectionVisibility = { editor: true, variables: true, terminal: true };

    document.addEventListener('DOMContentLoaded', function () {
        // Initialize modules
        editor.init(document.getElementById('codemirror-host'));
        terminal.init();
        varsPanel.init();

        // Get toolbar elements
        btnRun = document.getElementById('btn-run');
        btnStep = document.getElementById('btn-step');
        btnStop = document.getElementById('btn-stop');
        btnSave = document.getElementById('btn-save');
        btnSaveDropdown = document.getElementById('btn-save-dropdown');
        saveMenu = document.getElementById('save-menu');
        btnOpen = document.getElementById('btn-open');
        btnExamples = document.getElementById('btn-examples');
        fileInput = document.getElementById('file-input');
        btnTheme = document.getElementById('btn-theme');
        btnSettings = document.getElementById('btn-settings');
        statusEl = document.getElementById('compiler-status');

        // Settings modal elements
        settingsOverlay = document.getElementById('settingsOverlay');
        settingTheme = document.getElementById('setting-theme');
        settingFontSize = document.getElementById('setting-font-size');
        settingFontSizeSlider = document.getElementById('setting-font-size-slider');
        settingWordWrap = document.getElementById('setting-word-wrap');
        settingTabSize = document.getElementById('setting-tab-size');
        settingIndentGuides = document.getElementById('setting-indent-guides');
        settingVarsFontSize = document.getElementById('setting-vars-font-size');
        settingVarsFontSizeSlider = document.getElementById('setting-vars-font-size-slider');
        settingConsoleFontSize = document.getElementById('setting-console-font-size');
        settingConsoleFontSizeSlider = document.getElementById('setting-console-font-size-slider');
        settingConsoleInputMode = document.getElementById('setting-console-input-mode');
        settingGlobalFontSize = document.getElementById('setting-global-font-size');
        settingGlobalFontSizeSlider = document.getElementById('setting-global-font-size-slider');
        settingGlobalFontUnit = document.getElementById('setting-global-font-unit');
        settingVarsColNome = document.getElementById('setting-vars-col-nome');
        settingVarsColTipo = document.getElementById('setting-vars-col-tipo');
        settingVarsColValor = document.getElementById('setting-vars-col-valor');
        settingLoopDetection = document.getElementById('setting-loop-detection');

        // Initialize theme and settings
        initTheme();
        initSettings();

        // Initialize tab manager and make its persistence visible to the user.
        tabManager.onPersistenceChange = updateAutosaveStatus;
        tabManager.init();
        tabManager.onSwitch = function (tab) {
            var running = tab.executor && tab.executor.running;
            setRunning(!!running);
            if (running) {
                setStatus(tab.executor.stepMode ? 'Passo a passo...' : 'Executando...', 'running');
            } else {
                setStatus('Pronto');
            }
        };
        tabManager.onActionBlocked = function (message) {
            setStatus('Executando...', 'running');
            statusEl.title = message;
        };
        updateAutosaveStatus(tabManager.getPersistenceState());

        // Button events
        btnRun.addEventListener('click', runProgram);
        btnStep.addEventListener('click', stepProgram);
        btnStop.addEventListener('click', stopProgram);
        btnSave.addEventListener('click', saveProgram);

        // Save dropdown events
        btnSaveDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
            saveMenu.classList.toggle('hidden');
        });
        document.addEventListener('click', function() {
            saveMenu.classList.add('hidden');
        });
        saveMenu.addEventListener('click', function(e) {
            if (e.target.classList.contains('dropdown-item')) {
                var format = e.target.dataset.format;
                saveProgramAs(format);
                saveMenu.classList.add('hidden');
            }
        });

        btnOpen.addEventListener('click', openProgram);
        btnExamples.addEventListener('click', openExamples);
        fileInput.addEventListener('change', handleFileOpen);
        document.getElementById('btn-tab-indent').addEventListener('click', autoIndent);
        btnTheme.addEventListener('click', toggleTheme);

        // Mobile menu
        var mobileMenu = document.getElementById('mobile-menu');
        var btnMenu = document.getElementById('btn-menu');
        btnMenu.addEventListener('click', function (e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('open');
        });
        document.addEventListener('click', function () {
            mobileMenu.classList.remove('open');
        });
        mobileMenu.addEventListener('click', function (e) {
            e.stopPropagation();
        });
        document.getElementById('mobile-open').addEventListener('click', function () {
            mobileMenu.classList.remove('open');
            openProgram();
        });
        document.getElementById('mobile-save-alg').addEventListener('click', function () {
            mobileMenu.classList.remove('open');
            saveProgramAs('alg');
        });
        document.getElementById('mobile-save-txt').addEventListener('click', function () {
            mobileMenu.classList.remove('open');
            saveProgramAs('txt');
        });
        document.getElementById('mobile-examples').addEventListener('click', function () {
            mobileMenu.classList.remove('open');
            openExamples();
        });
        document.getElementById('mobile-settings').addEventListener('click', function () {
            mobileMenu.classList.remove('open');
            openSettings();
        });
        btnClearTerminal = document.getElementById('btn-clear-terminal');
        btnClearTerminal.addEventListener('click', function () {
            terminal.clear();
        });

        btnClearVars = document.getElementById('btn-clear-vars');
        btnClearVars.addEventListener('click', function () {
            varsPanel.clear();
        });

        btnSettings.addEventListener('click', openSettings);

        initExamples();
        initOnboarding();
        initRecovery();
        initSectionVisibility();

        // Docs modal events
        var docsOverlay = document.getElementById('docsOverlay');
        document.getElementById('btn-docs').addEventListener('click', function () {
            DocsPanel.open();
        });
        document.getElementById('mobile-docs').addEventListener('click', function () {
            mobileMenu.classList.remove('open');
            DocsPanel.open();
        });
        document.getElementById('btn-close-docs').addEventListener('click', function () {
            DocsPanel.close();
        });
        docsOverlay.addEventListener('click', function (e) {
            if (e.target === docsOverlay) DocsPanel.close();
            var tab = e.target.closest('.modal-tab');
            if (tab) {
                var tabId = tab.getAttribute('data-tab');
                DocsPanel.activateTab(tabId);
                DocsPanel.loadTab(tabId);
            }
        });

        // The version indicators open the canonical project status.
        var betaTag = document.querySelector('.beta-tag');
        var betaHoverTimer = null;

        function openProjectStatus() {
            DocsPanel.open('status');
        }

        betaTag.addEventListener('click', function () {
            openProjectStatus();
        });

        // Footer version click opens the same source of truth.
        var footerVersion = document.getElementById('footer-version');
        footerVersion.addEventListener('click', function () {
            openProjectStatus();
        });

        var footerCredits = document.getElementById('footer-credits');
        footerCredits.addEventListener('click', function () {
            DocsPanel.open('historia');
        });

        betaTag.addEventListener('mouseenter', function () {
            betaHoverTimer = setTimeout(function () {
                openProjectStatus();
            }, 5000);
        });
        betaTag.addEventListener('mouseleave', function () {
            clearTimeout(betaHoverTimer);
        });

        // Settings modal events
        document.getElementById('btn-close-settings').addEventListener('click', closeSettings);
        settingsOverlay.addEventListener('click', function (e) {
            if (e.target === settingsOverlay) closeSettings();
            var tab = e.target.closest('.modal-tab');
            if (tab) {
                var tabId = tab.getAttribute('data-tab');
                var modal = tab.closest('.modal');
                modal.querySelectorAll('.modal-tab').forEach(function (t) { t.classList.remove('active'); });
                modal.querySelectorAll('.modal-tab-panel').forEach(function (p) { p.classList.remove('active'); });
                tab.classList.add('active');
                modal.querySelector('[data-tab-panel="' + tabId + '"]').classList.add('active');
            }
        });

        // Close tab confirmation modal events
        var closeTabOverlay = document.getElementById('closeTabOverlay');
        document.getElementById('btn-confirm-close').addEventListener('click', function () {
            tabManager.confirmClose();
        });
        document.getElementById('btn-cancel-close').addEventListener('click', function () {
            tabManager.cancelClose();
        });
        document.getElementById('btn-cancel-close-tab').addEventListener('click', function () {
            tabManager.cancelClose();
        });
        closeTabOverlay.addEventListener('click', function (e) {
            if (e.target === closeTabOverlay) tabManager.cancelClose();
        });

        settingTheme.addEventListener('change', function () {
            applyTheme(this.value);
        });
        settingFontSize.addEventListener('input', function () {
            var val = parseInt(this.value, 10);
            if (val >= 1) applyFontSize(val);
        });
        settingFontSizeSlider.addEventListener('input', function () {
            applyFontSize(this.value);
        });
        settingWordWrap.addEventListener('change', function () {
            applyWordWrap(this.value);
        });
        settingTabSize.addEventListener('change', function () {
            applyTabSize(this.value);
        });
        settingIndentGuides.addEventListener('change', function () {
            applyIndentGuides(this.value);
        });
        settingVarsFontSize.addEventListener('input', function () {
            var val = parseInt(this.value, 10);
            if (val >= 1) applyVarsFontSize(val);
        });
        settingVarsFontSizeSlider.addEventListener('input', function () {
            applyVarsFontSize(this.value);
        });
        settingConsoleFontSize.addEventListener('input', function () {
            var val = parseInt(this.value, 10);
            if (val >= 1) applyConsoleFontSize(val);
        });
        settingConsoleFontSizeSlider.addEventListener('input', function () {
            applyConsoleFontSize(this.value);
        });
        settingConsoleInputMode.addEventListener('change', function () {
            applyConsoleInputMode(this.value);
        });
        settingLoopDetection.addEventListener('change', function () {
            applyLoopDetection(settingLoopDetection.value);
        });
        settingGlobalFontSize.addEventListener('input', function () {
            var val = parseFloat(this.value);
            if (val >= 1) applyGlobalFontSize(val);
        });
        settingGlobalFontSizeSlider.addEventListener('input', function () {
            applyGlobalFontSize(this.value);
        });
        settingGlobalFontUnit.addEventListener('change', function () {
            var unit = this.value;
            if (unit === 'percent') {
                settingGlobalFontSize.value = 100;
                settingGlobalFontSizeSlider.min = 25;
                settingGlobalFontSizeSlider.max = 300;
                settingGlobalFontSizeSlider.value = 100;
                _globalFontBase = {
                    editor: parseInt(localStorage.getItem('visualg-font-size') || '14', 10),
                    vars: parseInt(localStorage.getItem('visualg-vars-font-size') || '12', 10),
                    console: parseInt(localStorage.getItem('visualg-console-font-size') || '13', 10)
                };
                localStorage.setItem('visualg-global-font-unit', 'percent');
                localStorage.setItem('visualg-global-font-value', '100');
            } else {
                var current = parseInt(localStorage.getItem('visualg-font-size') || '14', 10);
                settingGlobalFontSize.value = current;
                settingGlobalFontSizeSlider.min = 1;
                settingGlobalFontSizeSlider.max = 50;
                settingGlobalFontSizeSlider.value = Math.min(current, 50);
                localStorage.setItem('visualg-global-font-unit', 'px');
                localStorage.setItem('visualg-global-font-value', current);
            }
        });

        function onVarsColChange() {
            applyVarsColumns({
                nome: settingVarsColNome.checked,
                tipo: settingVarsColTipo.checked,
                valor: settingVarsColValor.checked
            });
        }
        settingVarsColNome.addEventListener('change', onVarsColChange);
        settingVarsColTipo.addEventListener('change', onVarsColChange);
        settingVarsColValor.addEventListener('change', onVarsColChange);

        // Keyboard shortcuts
        document.addEventListener('keydown', function (e) {
            if (e.key === 'F9') {
                e.preventDefault();
                var activeTab = tabManager.getActiveTab();
                if (!activeTab.executor || !activeTab.executor.running) {
                    runProgram();
                }
            }
            if (e.key === 'F8') {
                e.preventDefault();
                stepProgram();
            }
            if (e.key === 'Escape') {
                if (!settingsOverlay.classList.contains('hidden')) closeSettings();
                if (!docsOverlay.classList.contains('hidden')) DocsPanel.close();
                if (!closeTabOverlay.classList.contains('hidden')) tabManager.cancelClose();
                closeProductModals();
            }
        });
    });

    // === First-use experience & examples ===
    function getStoredValue(key) {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            return null;
        }
    }

    function setStoredValue(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            // The app remains usable when storage is blocked by the browser.
        }
    }

    function getExampleById(id) {
        var examples = window.VisuAlgExamples || [];
        for (var i = 0; i < examples.length; i++) {
            if (examples[i].id === id) return examples[i];
        }
        return null;
    }

    function renderExamples() {
        var grid = document.getElementById('examples-grid');
        var examples = window.VisuAlgExamples || [];
        grid.textContent = '';

        examples.forEach(function (example) {
            var card = document.createElement('article');
            card.className = 'example-card';

            var header = document.createElement('div');
            header.className = 'example-card-header';
            var title = document.createElement('h3');
            title.textContent = example.title;
            var level = document.createElement('span');
            level.className = 'example-level';
            level.textContent = example.level;
            header.appendChild(title);
            header.appendChild(level);

            var description = document.createElement('p');
            description.textContent = example.description;

            var actions = document.createElement('div');
            actions.className = 'example-actions';
            actions.innerHTML =
                '<button type="button" class="modal-btn modal-btn-secondary" data-example-action="open" data-example-id="' + example.id + '"><i data-lucide="code-2"></i> Abrir código</button>' +
                '<button type="button" class="modal-btn modal-btn-primary" data-example-action="run" data-example-id="' + example.id + '"><i data-lucide="play"></i> Executar</button>';

            card.appendChild(header);
            card.appendChild(description);
            card.appendChild(actions);
            grid.appendChild(card);
        });

        if (window.lucide) lucide.createIcons({ nodes: [grid] });
    }

    function openExamples() {
        document.getElementById('examplesOverlay').classList.remove('hidden');
    }

    function closeExamples() {
        document.getElementById('examplesOverlay').classList.add('hidden');
    }

    function loadExample(id, executeNow) {
        var example = getExampleById(id);
        if (!example) return;
        var tab = tabManager.createTab(example.source);
        if (!tab) return;

        closeExamples();
        setSectionVisible('editor', true);
        if (executeNow) {
            setSectionVisible('terminal', true);
            window.setTimeout(runProgram, 0);
        } else {
            editor.instance.focus();
        }
    }

    function initExamples() {
        var overlay = document.getElementById('examplesOverlay');
        renderExamples();
        document.getElementById('btn-close-examples').addEventListener('click', closeExamples);
        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) closeExamples();
            var button = event.target.closest('[data-example-action]');
            if (button) {
                loadExample(button.dataset.exampleId, button.dataset.exampleAction === 'run');
            }
        });
    }

    function completeOnboarding(nextAction) {
        setStoredValue(ONBOARDING_STORAGE_KEY, 'true');
        document.getElementById('onboardingOverlay').classList.add('hidden');
        if (nextAction === 'examples') {
            openExamples();
        } else if (editor.instance) {
            editor.instance.focus();
        }
    }

    function initOnboarding() {
        var overlay = document.getElementById('onboardingOverlay');
        document.getElementById('btn-skip-onboarding').addEventListener('click', function () {
            completeOnboarding('editor');
        });
        document.getElementById('btn-onboarding-editor').addEventListener('click', function () {
            completeOnboarding('editor');
        });
        document.getElementById('btn-onboarding-examples').addEventListener('click', function () {
            completeOnboarding('examples');
        });
        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) completeOnboarding('editor');
        });

        if (getStoredValue(ONBOARDING_STORAGE_KEY) !== 'true') {
            window.setTimeout(function () {
                overlay.classList.remove('hidden');
            }, 120);
        }
    }

    function closeProductModals() {
        var examplesOverlay = document.getElementById('examplesOverlay');
        var recoveryOverlay = document.getElementById('recoveryOverlay');
        var onboardingOverlay = document.getElementById('onboardingOverlay');
        if (!examplesOverlay.classList.contains('hidden')) closeExamples();
        if (!recoveryOverlay.classList.contains('hidden')) recoveryOverlay.classList.add('hidden');
        if (!onboardingOverlay.classList.contains('hidden')) completeOnboarding('editor');
    }

    // === Autosave & recovery ===
    function formatLocalDate(isoValue) {
        if (!isoValue) return 'Ainda não há horário de salvamento.';
        var date = new Date(isoValue);
        if (Number.isNaN(date.getTime())) return 'Horário de salvamento indisponível.';
        return date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    function updateAutosaveStatus(state) {
        state = state || { status: 'idle' };
        var button = document.getElementById('autosave-status');
        if (!button) return;

        var labels = {
            saving: { icon: 'cloud-upload', text: 'Salvando...' },
            saved: { icon: 'cloud-check', text: 'Salvo localmente' },
            restored: { icon: 'history', text: 'Cópia restaurada' },
            error: { icon: 'cloud-alert', text: 'Falha ao salvar' },
            idle: { icon: 'cloud', text: 'Autosave local' }
        };
        var view = labels[state.status] || labels.idle;
        button.classList.toggle('is-saving', state.status === 'saving');
        button.classList.toggle('is-error', state.status === 'error');
        button.classList.toggle('is-restored', state.status === 'restored');
        button.innerHTML = '<i data-lucide="' + view.icon + '" class="footer-icon"></i><span>' + view.text + '</span>';
        button.title = state.updatedAt
            ? view.text + ' em ' + formatLocalDate(state.updatedAt) + '. Clique para recuperar uma versão anterior.'
            : view.text + '. Clique para ver as opções de recuperação.';
        if (window.lucide) lucide.createIcons({ nodes: [button] });
    }

    function refreshRecoveryModal() {
        var state = tabManager.getPersistenceState();
        var recovery = tabManager.getRecoveryInfo();
        var restoreButton = document.getElementById('btn-restore-recovery');

        document.getElementById('recovery-current-status').textContent =
            state.status === 'error' ? 'Não foi possível salvar neste dispositivo' : 'Código salvo automaticamente neste dispositivo';
        document.getElementById('recovery-current-time').textContent = formatLocalDate(state.updatedAt);

        if (recovery) {
            document.getElementById('recovery-copy-description').textContent =
                'Cópia de ' + formatLocalDate(recovery.updatedAt) + ', com ' + recovery.tabCount +
                (recovery.tabCount === 1 ? ' aba.' : ' abas.');
            restoreButton.disabled = false;
        } else {
            document.getElementById('recovery-copy-description').textContent =
                'Uma cópia anterior será criada automaticamente conforme você editar.';
            restoreButton.disabled = true;
        }
    }

    function initRecovery() {
        var overlay = document.getElementById('recoveryOverlay');
        document.getElementById('autosave-status').addEventListener('click', function () {
            refreshRecoveryModal();
            overlay.classList.remove('hidden');
        });
        document.getElementById('btn-close-recovery').addEventListener('click', function () {
            overlay.classList.add('hidden');
        });
        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) overlay.classList.add('hidden');
        });
        document.getElementById('btn-restore-recovery').addEventListener('click', function () {
            if (tabManager.getRunningTab()) {
                setStatus('Executando...', 'running');
                statusEl.title = 'Interrompa a execução antes de restaurar uma cópia.';
                return;
            }
            if (tabManager.restoreRecovery()) {
                overlay.classList.add('hidden');
                setStatus('Pronto');
            }
        });
    }

    // === Section visibility ===
    function persistSectionVisibility() {
        setStoredValue(SECTION_VISIBILITY_KEY, JSON.stringify(sectionVisibility));
    }

    function applySectionVisibility() {
        var grid = document.querySelector('.grid-container');
        var elements = {
            editor: document.querySelector('.editor-column'),
            variables: document.getElementById('variablesPanel'),
            terminal: document.getElementById('terminalPanel')
        };

        // Inline sizes come from drag-resizing; reset them when changing the grid.
        elements.editor.style.width = '';
        elements.variables.style.width = '';
        elements.terminal.style.width = '';

        Object.keys(elements).forEach(function (name) {
            elements[name].classList.toggle('section-hidden', !sectionVisibility[name]);
            grid.classList.toggle('section-' + name + '-hidden', !sectionVisibility[name]);
            var checkbox = document.querySelector('#sections-menu [data-section="' + name + '"]');
            if (checkbox) checkbox.checked = sectionVisibility[name];
        });

        if (sectionVisibility.editor && editor.instance) {
            window.setTimeout(function () { editor.instance.refresh(); }, 0);
        }
    }

    function setSectionVisible(name, visible) {
        if (!Object.prototype.hasOwnProperty.call(sectionVisibility, name)) return;
        sectionVisibility[name] = !!visible;
        applySectionVisibility();
        persistSectionVisibility();
    }

    function initSectionVisibility() {
        var raw = getStoredValue(SECTION_VISIBILITY_KEY);
        if (raw) {
            try {
                var stored = JSON.parse(raw);
                Object.keys(sectionVisibility).forEach(function (name) {
                    if (typeof stored[name] === 'boolean') sectionVisibility[name] = stored[name];
                });
            } catch (e) {
                sectionVisibility = { editor: true, variables: true, terminal: true };
            }
        }
        applySectionVisibility();

        var trigger = document.getElementById('btn-sections');
        var menu = document.getElementById('sections-menu');
        trigger.addEventListener('click', function (event) {
            event.stopPropagation();
            var willOpen = menu.classList.contains('hidden');
            menu.classList.toggle('hidden');
            trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        });
        menu.addEventListener('click', function (event) {
            event.stopPropagation();
        });
        menu.querySelectorAll('[data-section]').forEach(function (checkbox) {
            checkbox.addEventListener('change', function () {
                setSectionVisible(this.dataset.section, this.checked);
            });
        });
        document.getElementById('btn-show-all-sections').addEventListener('click', function () {
            sectionVisibility = { editor: true, variables: true, terminal: true };
            applySectionVisibility();
            persistSectionVisibility();
        });
        document.addEventListener('click', function () {
            menu.classList.add('hidden');
            trigger.setAttribute('aria-expanded', 'false');
        });
    }

    // === Theme ===
    function initTheme() {
        var saved = localStorage.getItem('visualg-theme');
        if (!saved) {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                saved = 'light';
            } else {
                saved = 'dark';
            }
        }
        applyTheme(saved);
    }

    function toggleTheme() {
        var current = document.documentElement.getAttribute('data-theme');
        var next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        if (settingTheme) settingTheme.value = next;
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('visualg-theme', theme);
        if (btnTheme) {
            var iconName = theme === 'dark' ? 'moon' : 'sun';
            btnTheme.innerHTML = '<i data-lucide="' + iconName + '"></i>';
            btnTheme.title = theme === 'dark' ? 'Tema claro' : 'Tema escuro';
            if (window.lucide) lucide.createIcons({ nodes: [btnTheme] });
        }
        if (settingTheme) settingTheme.value = theme;
        var guidesEnabled = localStorage.getItem('visualg-indent-guides') !== 'off';
        if (guidesEnabled && editor.updateGuideColors) {
            editor.updateGuideColors();
        }
        if (editor.instance) editor.instance.refresh();
    }

    // === Settings ===
    function initSettings() {
        // Font size
        var fontSize = localStorage.getItem('visualg-font-size') || '14';
        applyFontSize(fontSize);

        // Word wrap
        var wordWrap = localStorage.getItem('visualg-word-wrap') || 'off';
        applyWordWrap(wordWrap);

        // Tab size
        var tabSize = localStorage.getItem('visualg-tab-size') || '2';
        applyTabSize(tabSize);

        // Indent guides
        var indentGuides = localStorage.getItem('visualg-indent-guides') || 'on';
        applyIndentGuides(indentGuides);

        // Variables font size
        var varsFontSize = localStorage.getItem('visualg-vars-font-size') || '12';
        applyVarsFontSize(varsFontSize);

        // Console font size
        var consoleFontSize = localStorage.getItem('visualg-console-font-size') || '13';
        applyConsoleFontSize(consoleFontSize);

        // Console input mode
        var consoleInputMode = localStorage.getItem('visualg-console-input-mode') || 'inline';
        applyConsoleInputMode(consoleInputMode);

        // Variables column visibility
        var varsColumns = JSON.parse(localStorage.getItem('visualg-vars-columns') || '{"nome":true,"tipo":true,"valor":true}');
        applyVarsColumns(varsColumns);

        // Loop detection
        var loopDetection = localStorage.getItem('visualg-loop-detection') || 'on';
        applyLoopDetection(loopDetection);
    }

    function applyFontSize(size) {
        size = parseInt(size, 10);
        if (isNaN(size) || size < 1) return;
        var px = size + 'px';
        editor.instance.getWrapperElement().style.fontSize = px;
        editor.instance.refresh();
        localStorage.setItem('visualg-font-size', size);
        if (settingFontSize) settingFontSize.value = size;
        if (settingFontSizeSlider) settingFontSizeSlider.value = Math.min(size, 50);
    }

    function applyIndentGuides(value) {
        localStorage.setItem('visualg-indent-guides', value);
        if (value === 'on') {
            editor.updateGuideColors();
        } else {
            editor.clearGuideColors();
        }
        editor.instance.refresh();
        if (settingIndentGuides) settingIndentGuides.value = value;
    }

    function applyWordWrap(value) {
        editor.instance.setOption('lineWrapping', value === 'on');
        localStorage.setItem('visualg-word-wrap', value);
        if (settingWordWrap) settingWordWrap.value = value;
    }

    function applyTabSize(value) {
        var n = parseInt(value, 10);
        var oldSize = editor.instance.getOption('tabSize') || 2;

        // Atualizar opções do editor
        editor.instance.setOption('tabSize', n);
        editor.instance.setOption('indentUnit', n);
        localStorage.setItem('visualg-tab-size', value);
        if (settingTabSize) settingTabSize.value = value;

        // Reformatar código existente
        if (oldSize !== n) {
            var code = editor.getValue();
            var lines = code.split('\n');
            var newLines = [];

            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                // Contar espaços no início da linha
                var match = line.match(/^(\s*)/);
                if (match && match[1].length > 0) {
                    var leadingSpaces = match[1];
                    // Calcular nível de indentação baseado no tamanho antigo
                    var indentLevel = Math.floor(leadingSpaces.length / oldSize);
                    // Criar nova indentação com o novo tamanho
                    var newIndent = '';
                    for (var j = 0; j < indentLevel * n; j++) {
                        newIndent += ' ';
                    }
                    line = newIndent + line.substring(leadingSpaces.length);
                }
                newLines.push(line);
            }

            editor.setValue(newLines.join('\n'));
        }
    }

    function applyVarsFontSize(size) {
        size = parseInt(size, 10);
        if (isNaN(size) || size < 1) return;
        var table = document.getElementById('variables-table');
        table.style.fontSize = size + 'px';
        var ths = table.querySelectorAll('th');
        for (var i = 0; i < ths.length; i++) {
            ths[i].style.fontSize = size + 'px';
        }
        localStorage.setItem('visualg-vars-font-size', size);
        if (settingVarsFontSize) settingVarsFontSize.value = size;
        if (settingVarsFontSizeSlider) settingVarsFontSizeSlider.value = Math.min(size, 50);
    }

    function applyVarsColumns(columns) {
        localStorage.setItem('visualg-vars-columns', JSON.stringify(columns));
        var table = document.getElementById('variables-table');
        ['nome', 'tipo', 'valor'].forEach(function (col) {
            var cells = table.querySelectorAll('.col-' + col);
            cells.forEach(function (cell) {
                cell.classList.toggle('col-hidden', !columns[col]);
            });
        });
        if (settingVarsColNome) settingVarsColNome.checked = columns.nome;
        if (settingVarsColTipo) settingVarsColTipo.checked = columns.tipo;
        if (settingVarsColValor) settingVarsColValor.checked = columns.valor;
    }

    function applyConsoleFontSize(size) {
        size = parseInt(size, 10);
        if (isNaN(size) || size < 1) return;
        var px = size + 'px';
        document.getElementById('terminal-output').style.fontSize = px;
        document.getElementById('terminal-input').style.fontSize = px;
        localStorage.setItem('visualg-console-font-size', size);
        if (settingConsoleFontSize) settingConsoleFontSize.value = size;
        if (settingConsoleFontSizeSlider) settingConsoleFontSizeSlider.value = Math.min(size, 50);
    }

    function applyConsoleInputMode(value) {
        localStorage.setItem('visualg-console-input-mode', value);
        if (settingConsoleInputMode) settingConsoleInputMode.value = value;
    }

    function applyLoopDetection(value) {
        localStorage.setItem('visualg-loop-detection', value);
        settingLoopDetection.value = value;
    }

    function applyGlobalFontSize(value) {
        value = parseFloat(value);
        if (isNaN(value) || value < 1) return;
        var unit = settingGlobalFontUnit ? settingGlobalFontUnit.value : 'percent';

        if (unit === 'percent') {
            var factor = value / 100;
            applyFontSize(Math.round(_globalFontBase.editor * factor));
            applyVarsFontSize(Math.round(_globalFontBase.vars * factor));
            applyConsoleFontSize(Math.round(_globalFontBase.console * factor));
        } else {
            var px = Math.round(value);
            applyFontSize(px);
            applyVarsFontSize(px);
            applyConsoleFontSize(px);
        }

        if (settingGlobalFontSize) settingGlobalFontSize.value = Math.round(value);
        if (settingGlobalFontSizeSlider) settingGlobalFontSizeSlider.value = Math.min(Math.round(value), parseInt(settingGlobalFontSizeSlider.max, 10));
        localStorage.setItem('visualg-global-font-value', Math.round(value));
        localStorage.setItem('visualg-global-font-unit', unit);
    }

    function openSettings() {
        // Sync current values
        settingTheme.value = document.documentElement.getAttribute('data-theme');
        var savedFontSize = localStorage.getItem('visualg-font-size') || '14';
        settingFontSize.value = savedFontSize;
        settingFontSizeSlider.value = Math.min(parseInt(savedFontSize, 10), 50);
        settingWordWrap.value = localStorage.getItem('visualg-word-wrap') || 'off';
        settingTabSize.value = localStorage.getItem('visualg-tab-size') || '2';
        settingIndentGuides.value = localStorage.getItem('visualg-indent-guides') || 'on';
        var savedVarsFontSize = localStorage.getItem('visualg-vars-font-size') || '12';
        settingVarsFontSize.value = savedVarsFontSize;
        settingVarsFontSizeSlider.value = Math.min(parseInt(savedVarsFontSize, 10), 50);
        var savedConsoleFontSize = localStorage.getItem('visualg-console-font-size') || '13';
        settingConsoleFontSize.value = savedConsoleFontSize;
        settingConsoleFontSizeSlider.value = Math.min(parseInt(savedConsoleFontSize, 10), 50);
        settingConsoleInputMode.value = localStorage.getItem('visualg-console-input-mode') || 'inline';
        settingLoopDetection.value = localStorage.getItem('visualg-loop-detection') || 'on';
        var varsColumns = JSON.parse(localStorage.getItem('visualg-vars-columns') || '{"nome":true,"tipo":true,"valor":true}');
        settingVarsColNome.checked = varsColumns.nome;
        settingVarsColTipo.checked = varsColumns.tipo;
        settingVarsColValor.checked = varsColumns.valor;
        // Restore global font size
        var savedUnit = localStorage.getItem('visualg-global-font-unit') || 'percent';
        var savedGlobalValue = localStorage.getItem('visualg-global-font-value') || '100';
        settingGlobalFontUnit.value = savedUnit;
        if (savedUnit === 'percent') {
            var factor = parseInt(savedGlobalValue, 10) / 100;
            if (factor > 0) {
                _globalFontBase = {
                    editor: Math.round(parseInt(savedFontSize, 10) / factor),
                    vars: Math.round(parseInt(savedVarsFontSize, 10) / factor),
                    console: Math.round(parseInt(savedConsoleFontSize, 10) / factor)
                };
            } else {
                _globalFontBase = { editor: parseInt(savedFontSize, 10), vars: parseInt(savedVarsFontSize, 10), console: parseInt(savedConsoleFontSize, 10) };
            }
            settingGlobalFontSizeSlider.min = 25;
            settingGlobalFontSizeSlider.max = 300;
        } else {
            _globalFontBase = { editor: parseInt(savedFontSize, 10), vars: parseInt(savedVarsFontSize, 10), console: parseInt(savedConsoleFontSize, 10) };
            settingGlobalFontSizeSlider.min = 1;
            settingGlobalFontSizeSlider.max = 50;
        }
        settingGlobalFontSize.value = savedGlobalValue;
        settingGlobalFontSizeSlider.value = Math.min(parseInt(savedGlobalValue, 10), parseInt(settingGlobalFontSizeSlider.max, 10));
        // Reset to first tab
        var modal = settingsOverlay.querySelector('.modal');
        modal.querySelectorAll('.modal-tab').forEach(function (t) { t.classList.remove('active'); });
        modal.querySelectorAll('.modal-tab-panel').forEach(function (p) { p.classList.remove('active'); });
        modal.querySelector('.modal-tab').classList.add('active');
        modal.querySelector('.modal-tab-panel').classList.add('active');
        settingsOverlay.classList.remove('hidden');
    }

    function closeSettings() {
        settingsOverlay.classList.add('hidden');
    }

    // === Status ===
    var statusIcons = {
        'Pronto': 'circle-check',
        'Executando...': 'play',
        'Passo a passo...': 'skip-forward',
        'Execução finalizada': 'circle-check-big',
        'Erro': 'circle-x',
        'Execução interrompida': 'circle-stop'
    };

    function setStatus(text, type) {
        var icon = statusIcons[text] || 'circle-check';
        statusEl.innerHTML = '<i data-lucide="' + icon + '" class="footer-icon"></i> ' + text;
        statusEl.title = '';
        statusEl.style.color = type === 'error' ? 'var(--red)' :
                               type === 'running' ? 'var(--yellow)' : 'var(--green)';
        if (window.lucide) lucide.createIcons({ nodes: [statusEl] });
    }

    function setRunning(running) {
        var tab = tabManager.getActiveTab();
        var stepping = tab && tab.executor && tab.executor.running && tab.executor.stepMode;
        btnRun.disabled = running;
        btnStep.disabled = running && !stepping;
        btnStop.disabled = !running;
        btnClearTerminal.disabled = running;
        btnClearVars.disabled = running;
    }

    function getRunningTab() {
        return tabManager.getRunningTab ? tabManager.getRunningTab() : null;
    }

    function blockIfAnotherTabRunning(tab) {
        var runningTab = getRunningTab();
        if (!runningTab || runningTab.id === tab.id) return false;
        setStatus('Executando...', 'running');
        statusEl.title = 'Ja existe uma execucao ativa em outra aba.';
        setRunning(true);
        return true;
    }

    function getErrorLocation(message) {
        var match = /Linha\s+(\d+)(?:\s*,\s*coluna\s+(\d+))?/i.exec(message || '');
        if (!match) return null;
        return {
            line: parseInt(match[1], 10),
            column: match[2] ? parseInt(match[2], 10) : 1
        };
    }

    function reportExecutionError(error) {
        var message = error && error.message ? error.message : String(error);
        var location = getErrorLocation(message);
        terminal.writelnError(message, location, function () {
            setSectionVisible('editor', true);
            editor.revealLocation(location.line, location.column);
        });
        if (location) {
            setSectionVisible('editor', true);
            editor.revealLocation(location.line, location.column);
        }
        setStatus('Erro', 'error');
    }

    // === Execution ===
    async function runProgram() {
        var tab = tabManager.getActiveTab();
        if (blockIfAnotherTabRunning(tab)) return;
        if (tab.executor && tab.executor.running) return;

        var source = editor.getValue();
        terminal.clear();
        varsPanel.clear();
        editor.clearHighlight();
        setStatus('Executando...', 'running');
        setRunning(true);
        var hadError = false;

        try {
            var tokens = new window.VisuAlgLexer(source).tokenize();
            var ast = new window.VisuAlgParser(tokens).parse();
            tab.executor = new window.VisuAlgExecutor(terminal, varsPanel);
            tab.running = true;
            await tab.executor.run(ast);
            setStatus('Execução finalizada');
        } catch (e) {
            if (e.message !== '__STOP__') {
                hadError = true;
                reportExecutionError(e);
            } else {
                setStatus('Execução interrompida');
            }
        }

        if (!hadError) editor.clearHighlight();
        setRunning(false);
        tab.executor = null;
        tab.running = false;
    }

    async function stepProgram() {
        var tab = tabManager.getActiveTab();
        if (blockIfAnotherTabRunning(tab)) return;
        if (tab.executor && tab.executor.running) {
            if (tab.executor.stepMode) {
                tab.executor.nextStep();
            }
            return;
        }

        var source = editor.getValue();
        terminal.clear();
        varsPanel.clear();
        editor.clearHighlight();
        setStatus('Passo a passo...', 'running');
        setRunning(true);
        var hadError = false;

        try {
            var tokens = new window.VisuAlgLexer(source).tokenize();
            var ast = new window.VisuAlgParser(tokens).parse();
            tab.executor = new window.VisuAlgExecutor(terminal, varsPanel);
            tab.executor.stepMode = true;
            tab.running = true;
            await tab.executor.run(ast);
            setStatus('Execução finalizada');
        } catch (e) {
            if (e.message !== '__STOP__') {
                hadError = true;
                reportExecutionError(e);
            } else {
                setStatus('Execução interrompida');
            }
        }

        if (!hadError) editor.clearHighlight();
        setRunning(false);
        tab.executor = null;
        tab.running = false;
    }

    function stopProgram() {
        var tab = tabManager.getActiveTab();
        if (tab.executor) {
            tab.executor.running = false;
            if (tab.executor.stepResolve) {
                tab.executor.stepResolve();
                tab.executor.stepResolve = null;
            }
        }
        if (terminal.cancelPendingInput) terminal.cancelPendingInput();
        tab.executor = null;
        tab.running = false;
        terminal.inputArea.classList.add('hidden');
        var consoleInputOverlay = document.getElementById('consoleInputOverlay');
        if (consoleInputOverlay) consoleInputOverlay.classList.add('hidden');
        setStatus('Pronto');
        setRunning(false);
    }

    function newProgram() {
        var tab = tabManager.getActiveTab();
        if (tab.executor && tab.executor.running) {
            stopProgram();
        }
        editor.setValue(window.gerarTemplate());
        terminal.clear();
        varsPanel.clear();
        editor.clearHighlight();
        setStatus('Pronto');
    }

    function saveProgramAs(format) {
        var code = editor.getValue();
        var fileName = 'programa';

        // Extrai o nome do algoritmo usando regex
        var match = code.match(/algoritmo\s+"([^"]+)"/i);
        if (match && match[1]) {
            fileName = match[1];
        }

        // Cria o blob com o conteúdo do código
        var blob = new Blob([code], { type: 'text/plain' });

        // Cria um link temporário para download
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName + '.' + format;

        // Dispara o download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Libera o objeto URL
        URL.revokeObjectURL(link.href);
    }

    function saveProgram() {
        saveProgramAs('alg');
    }

    function openProgram() {
        fileInput.click();
    }

    function handleFileOpen(event) {
        var file = event.target.files[0];
        if (!file) return;

        // Validar extensão
        var fileName = file.name.toLowerCase();
        if (!fileName.endsWith('.alg') && !fileName.endsWith('.txt')) {
            alert('Apenas arquivos .alg ou .txt são permitidos.');
            fileInput.value = '';
            return;
        }

        var reader = new FileReader();
        reader.onload = function(e) {
            var content = e.target.result;

            // Sanitização: bloquear conteúdo JavaScript malicioso
            if (containsJavaScript(content)) {
                alert('O arquivo contém código JavaScript e não pode ser aberto por segurança.');
                fileInput.value = '';
                return;
            }

            // Parar execução se estiver rodando
            var tab = tabManager.getActiveTab();
            if (tab.executor && tab.executor.running) {
                stopProgram();
            }

            editor.setValue(content);
            terminal.clear();
            varsPanel.clear();
            editor.clearHighlight();
            setStatus('Arquivo carregado: ' + file.name);
        };

        reader.readAsText(file);
        fileInput.value = ''; // Reset para permitir reabrir mesmo arquivo
    }

    function containsJavaScript(content) {
        var patterns = [
            /<script[\s\S]*?>/i,           // Tags <script>
            /<\/script>/i,                  // Fechamento </script>
            /javascript:/i,                 // URLs javascript:
            /on\w+\s*=/i,                   // Event handlers (onclick=, onerror=, etc)
            /<iframe[\s\S]*?>/i,           // Tags <iframe>
            /<object[\s\S]*?>/i,           // Tags <object>
            /<embed[\s\S]*?>/i,            // Tags <embed>
            /<link[\s\S]*?>/i,             // Tags <link>
            /<style[\s\S]*?>/i,            // Tags <style>
            /expression\s*\(/i,            // CSS expression()
            /url\s*\(\s*["']?javascript:/i // CSS url(javascript:)
        ];

        for (var i = 0; i < patterns.length; i++) {
            if (patterns[i].test(content)) {
                return true;
            }
        }
        return false;
    }

    function autoIndent() {
        var code = editor.getValue();
        var lines = code.split('\n');
        var tabSize = editor.instance.getOption('tabSize') || 2;
        var indentLevel = 0;
        var result = [];

        var ACCENT_MAP = {
            'então': 'entao',
            'senão': 'senao',
            'até': 'ate',
            'faça': 'faca',
            'início': 'inicio',
            'lógico': 'logico',
            'não': 'nao'
        };

        function normalize(word) {
            var lower = word.toLowerCase();
            return ACCENT_MAP.hasOwnProperty(lower) ? ACCENT_MAP[lower] : lower;
        }

        // Primeira palavra da linha diminui indentação
        var indentDecrease = ['fimse', 'senao', 'fimenquanto', 'fimpara', 'fimrepita', 'fimescolha', 'fimalgoritmo', 'fimprocedimento', 'fimfuncao', 'caso', 'outrocaso', 'inicio'];

        // Primeira palavra da linha aumenta indentação
        var indentIncreaseFirst = ['inicio', 'var', 'senao', 'repita', 'escolha', 'caso', 'outrocaso'];

        // Última palavra da linha aumenta indentação
        var indentIncreaseLast = ['entao', 'faca'];

        for (var i = 0; i < lines.length; i++) {
            var trimmed = lines[i].trim();
            if (trimmed === '') {
                result.push('');
                continue;
            }

            // Extrair primeira e última palavras
            var words = trimmed.split(/\s+/);
            var firstWord = normalize(words[0].split(/[^a-zA-ZáàâãéèêíìîóòôõúùûçÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ_]/)[0]);
            var lastToken = words[words.length - 1];
            var lastWord = normalize(lastToken.split(/[^a-zA-ZáàâãéèêíìîóòôõúùûçÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ_]/)[0]);

            // Diminuir ANTES de escrever a linha
            if (indentDecrease.indexOf(firstWord) !== -1) {
                indentLevel = Math.max(0, indentLevel - 1);
            }

            // Escrever linha com indentação
            var indent = '';
            for (var j = 0; j < indentLevel * tabSize; j++) {
                indent += ' ';
            }
            result.push(indent + trimmed);

            // Aumentar DEPOIS de escrever a linha
            if (indentIncreaseFirst.indexOf(firstWord) !== -1) {
                indentLevel++;
            } else if (indentIncreaseLast.indexOf(lastWord) !== -1) {
                indentLevel++;
            }
        }

        editor.setValue(result.join('\n'));
    }
})();
