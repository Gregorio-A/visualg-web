// Interaction layer for the Figma desktop workspace. Source files remain in TabManager.
(function () {
    'use strict';

    var DOCS = [
        ['sumario', 'Sumário'], ['introducao', 'Introdução'], ['historia', 'História'], ['compatibilidade', 'Compatibilidade'],
        ['operadores', 'Operadores'], ['entrada-saida', 'E/S'], ['condicionais', 'Condicionais'],
        ['repeticao', 'Repetição'], ['subprogramas', 'Subprogramas'], ['funcoes', 'Funções'],
        ['comandos', 'Comandos'], ['status', 'Status do projeto']
    ];
    var DOC_TAGS = {
        sumario: 'sumário índice conteúdo tópicos navegação documentação',
        introducao: 'primeiros passos algoritmo programa estrutura inicio fimalgoritmo',
        historia: 'origem visualg versoes evolução',
        compatibilidade: 'recursos suportados limitações diferenças versão',
        operadores: 'aritméticos relacionais logicos comparação expressões precedência',
        'entrada-saida': 'leitura escreva escreval leia teclado console imprimir exibir dados',
        condicionais: 'se então senao escolha caso decisão condição',
        repeticao: 'laços loops enquanto repita para ate faca iteração',
        subprogramas: 'procedimentos parâmetros argumento escopo',
        funcoes: 'retorno função parametros valor',
        comandos: 'pausa debug interromper execução',
        status: 'projeto correções pendências andamento'
    };
    var FOLDERS_KEY = 'visualg-folders-v1';
    var TRASH_KEY = 'visualg-trash-v1';
    var CLOSED_KEY = 'visualg-closed-files-v1';
    var LAYOUT_KEY = 'visualg-layout-v2';
    var folders = [];
    var assignments = {};
    var trash = [];
    var closedFiles = [];
    var collapsedFolders = {};
    var recentlyMovedTabId = null;
    var activeFileAnimationId = null;
    var deletingFiles = new Set();
    var view = { type: 'editor' };
    var viewHistory = [{ type: 'editor' }];
    var historyPosition = 0;
    var editor;
    var terminal;
    var aux;
    var activeDocument = null;
    var docCache = {};
    var pendingDocSearch = null;
    var messages = [];
    var breakpoints = {};
    var consoleWindow = null;
    var consoleWindowMode = null;
    var consoleDialog = null;
    var consolePanelOpen = false;
    var refreshSidebarActionOverflow = function () {};

    function get(id) { return document.getElementById(id); }
    function shortcutEnabled(name) { return localStorage.getItem('visualg-shortcut-' + name) !== 'off'; }
    function icon(name) { var item = document.createElement('i'); item.setAttribute('data-lucide', name); return item; }
    function refreshIcons(root) { if (window.renderLucideIcons) window.renderLucideIcons(root); }
    function readJson(key, fallback) {
        try { return JSON.parse(localStorage.getItem(key) || 'null') || fallback; } catch (error) { return fallback; }
    }
    function saveFolders() { try { localStorage.setItem(FOLDERS_KEY, JSON.stringify({ folders: folders, assignments: assignments, collapsed: collapsedFolders })); } catch (error) { /* local editing stays available */ } }
    function saveTrash() { try { localStorage.setItem(TRASH_KEY, JSON.stringify(trash)); } catch (error) { /* ignore storage quota */ } }
    function saveClosed() { try { localStorage.setItem(CLOSED_KEY, JSON.stringify(closedFiles)); } catch (error) { /* local editing stays available */ } }
    function seedReferenceWorkspace() {
        if (!window.TabManager.freshWorkspace || localStorage.getItem(CLOSED_KEY) !== null) return;
        var starters = [
            ['converter-binario-decimal.alg', [
                'Algoritmo "ConversorBinarioDecimal"', '',
                '// Disciplina  : Lógica de Programação',
                '// Descrição   : Converte um número binário em decimal.',
                '// Exemplo     : 1011 corresponde a 11.',
                '// Os arquivos da esquerda ficam salvos neste navegador.', '',
                'Var',
                '  binario, digito: inteiro',
                '  decimal, potencia: inteiro', '',
                'Inicio',
                '  // Altere o valor para experimentar outro binário.',
                '  binario <- 1011',
                '  decimal <- 0',
                '  potencia <- 1', '',
                '  escreval("Convertendo 1011 de binário para decimal")', '',
                '  enquanto binario > 0 faca',
                '    digito <- binario mod 10', '',
                '    se digito > 1 entao',
                '      escreval("O número não é binário.")',
                '      interrompa',
                '    fimse', '',
                '    decimal <- decimal + digito * potencia',
                '    potencia <- potencia * 2',
                '    binario <- binario div 10',
                '  fimenquanto', '',
                '  escreval("Resultado decimal: ", decimal)', '',
                'fimalgoritmo'
            ].join('\n')],
            ['idade.alg', 'Algoritmo "Idade"\nVar\n  nascimento, atual, idade: inteiro\nInicio\n  nascimento <- 2000\n  atual <- 2026\n  idade <- atual - nascimento\n  escreval("Idade: ", idade)\nfimalgoritmo'],
            ['media-nota.alg', 'Algoritmo "MediaNota"\nVar\n  nota1, nota2, media: real\nInicio\n  nota1 <- 8\n  nota2 <- 7\n  media <- (nota1 + nota2) / 2\n  escreval("Média: ", media)\nfimalgoritmo'],
            ['resistencia-equivalente.alg', 'Algoritmo "ResistenciaEquivalente"\nVar\n  r1, r2, equivalente: real\nInicio\n  r1 <- 100\n  r2 <- 200\n  equivalente <- (r1 * r2) / (r1 + r2)\n  escreval("Resistência equivalente: ", equivalente)\nfimalgoritmo'],
            ['loja-roupas.alg', 'Algoritmo "LojaRoupas"\nVar\n  preco, desconto, total: real\nInicio\n  preco <- 120\n  desconto <- 15\n  total <- preco * (100 - desconto) / 100\n  escreval("Total: ", total)\nfimalgoritmo']
        ];
        window.VisualGEditor.setValue(starters[0][1]);
        window.TabManager.setFileName(window.TabManager.getActiveTab().id, starters[0][0]);
        window.TabManager.markActiveClean();
        closedFiles = starters.slice(1).map(function (entry, index) { return { id: 'starter-' + index, name: entry[0].replace(/\.alg$/i, ''), fileName: entry[0], code: entry[1], closed: true }; });
        saveClosed();
    }
    function saveLayout() {
        try {
            localStorage.setItem(LAYOUT_KEY, JSON.stringify({ left: document.documentElement.style.getPropertyValue('--ide-left'), right: document.documentElement.style.getPropertyValue('--ide-right'), debug: document.documentElement.style.getPropertyValue('--ide-debug-height'), messages: document.documentElement.style.getPropertyValue('--ide-message-height'), messagesResized: get('right-sidebar').classList.contains('messages-resized'), leftHidden: document.body.classList.contains('sidebar-left-collapsed'), rightHidden: document.body.classList.contains('sidebar-right-collapsed') }));
        } catch (error) { /* keep working without persistence */ }
    }
    function restoreSidebar(side) {
        document.body.classList.remove('sidebar-' + side + '-collapsed');
        updatePanelButtons();
        saveLayout();
        window.requestAnimationFrame(function () { if (window.VisualGEditor.instance) window.VisualGEditor.instance.refresh(); });
    }
    function initEdgeDragRestore() {
        var edgeDrag = null;
        document.addEventListener('pointerdown', function (event) {
            if (event.button !== 0) return;
            if (document.body.classList.contains('sidebar-left-collapsed') && event.clientX <= 10) edgeDrag = { side:'left', startX:event.clientX };
            else if (document.body.classList.contains('sidebar-right-collapsed') && event.clientX >= window.innerWidth - 10) edgeDrag = { side:'right', startX:event.clientX };
        }, true);
        document.addEventListener('pointermove', function (event) {
            if (!edgeDrag) return;
            var distance = edgeDrag.side === 'left' ? event.clientX - edgeDrag.startX : edgeDrag.startX - event.clientX;
            if (distance >= 32) {
                var side = edgeDrag.side;
                edgeDrag = null;
                restoreSidebar(side);
            }
        }, true);
        document.addEventListener('pointerup', function () { edgeDrag = null; }, true);
        document.addEventListener('pointercancel', function () { edgeDrag = null; }, true);
    }
    function updatePanelButtons() {
        [['left', 'arquivos'], ['right', 'depuração']].forEach(function (entry) {
            var hidden = document.body.classList.contains('sidebar-' + entry[0] + '-collapsed');
            var button = get('btn-toggle-' + entry[0]);
            button.setAttribute('aria-pressed', String(!hidden));
            button.setAttribute('aria-label', (hidden ? 'Mostrar ' : 'Ocultar ') + entry[1]);
            button.title = button.getAttribute('aria-label');
            var glyph = button.querySelector('[data-lucide]');
            if (glyph) glyph.setAttribute('data-lucide', 'panel-' + entry[0] + (hidden ? '-open' : '-close'));
            refreshIcons(button);
        });
    }
    function setSidebarTab(name) {
        var filesActive = name === 'files';
        var tabs = [['btn-sidebar-files', 'sidebar-files-panel', filesActive], ['btn-sidebar-docs', 'sidebar-docs-panel', !filesActive]];
        tabs.forEach(function (entry) {
            var button = get(entry[0]); var panel = get(entry[1]);
            button.classList.toggle('active', entry[2]);
            button.setAttribute('aria-selected', String(entry[2]));
            panel.classList.toggle('active', entry[2]);
            panel.hidden = !entry[2];
        });
        if (filesActive) {
            renderFiles();
            window.requestAnimationFrame(function () { refreshSidebarActionOverflow(); });
        } else renderDocs();
    }
    function updateConsoleButton() {
        var button = get('btn-show-console');
        if (!button) return;
        var active = view.type === 'console' || consolePanelOpen || (consoleDialog && !consoleDialog.classList.contains('hidden')) || (consoleWindow && !consoleWindow.closed);
        button.setAttribute('aria-pressed', String(!!active));
        button.title = active ? 'Console aberto' : 'Abrir console';
        button.setAttribute('aria-label', button.title);
    }
    function setDebugRunAction(running) {
        var button = get('debug-run');
        if (!button) return;
        button.dataset.running = String(!!running);
        button.closest('.debug-launch-actions').classList.toggle('is-running', !!running);
        button.classList.toggle('is-stop', !!running);
        button.title = running ? 'Parar execução — Shift + F5' : 'Executar — F5';
        button.setAttribute('aria-label', running ? 'Parar execução — Shift + F5' : 'Executar — F5');
        var iconMarkup = running
            ? '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="1"></rect></svg>'
            : '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>';
        button.innerHTML = iconMarkup + '<span>' + (running ? 'Parar' : 'Executar') + '</span>';
    }

    function fileName(tab) { return tab.fileName || tab.name + '.alg'; }
    function uniqueFileName(requestedName, ignoredId, folderId) {
        var clean = String(requestedName || 'Meu algoritmo.alg').trim().replace(/[\\/]/g, '-') || 'Meu algoritmo.alg';
        if (!/\.(alg|txt)$/i.test(clean)) clean += '.alg';
        var match = /^(.*?)(\.(?:alg|txt))$/i.exec(clean);
        var base = match[1].replace(/ \(cópia \d+\)$/i, '');
        var extension = match[2]; var candidate = clean; var copy = 1;
        var records = window.TabManager.getTabs().concat(closedFiles);
        function exists(name) {
            return records.some(function (entry) {
                return entry.id !== ignoredId && (assignments[entry.id] || null) === (folderId || null) && fileName(entry).toLocaleLowerCase('pt-BR') === name.toLocaleLowerCase('pt-BR');
            });
        }
        while (exists(candidate)) { candidate = base + ' (cópia ' + copy + ')' + extension; copy++; }
        return candidate;
    }
    function duplicateFile(tab) {
        var folderId = assignments[tab.id] || null;
        var copyName = uniqueFileName(fileName(tab), null, folderId);
        var duplicate = window.TabManager.createTab(tab.code, { fileName:copyName, forceNew:true });
        if (duplicate && folderId) { assignments[duplicate.id] = folderId; saveFolders(); }
        renderFiles();
        return duplicate;
    }
    function openSavedFile(tab) {
        if (!tab.closed) {
            if (window.TabManager.getActiveTab()?.id === tab.id) { window.TabManager.switchTab(tab.id); showEditor(); return; }
            if (!window.TabManager.getActiveTab()) { window.TabManager.createTab(tab.code, { fileName:fileName(tab) }); showEditor(); return; }
            activeFileAnimationId = tab.id; window.TabManager.switchTab(tab.id); showEditor();
            window.setTimeout(function () { if (activeFileAnimationId === tab.id) activeFileAnimationId = null; }, 500);
            return;
        }
        var active = window.TabManager.getActiveTab();
        var targetFolder = assignments[tab.id] || null;
        var opened;
        if (active) {
            var defaultCode = window.gerarTemplate ? window.gerarTemplate() : '';
            var hasSavedContent = !!active.fileName || !!active.dirty || active.code.trim() !== defaultCode.trim();
            if (hasSavedContent) {
                var archivedId = 'closed-preview-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
                closedFiles = closedFiles.filter(function (item) { return item.id !== active.id; });
                closedFiles.push({ id: archivedId, name: active.name, fileName: fileName(active), code: active.code, closed: true });
                if (assignments[active.id]) assignments[archivedId] = assignments[active.id];
            }
            delete assignments[active.id];
            opened = window.TabManager.replaceActiveTab(tab.code, { fileName: fileName(tab) });
            if (opened && targetFolder) assignments[opened.id] = targetFolder;
            delete assignments[tab.id];
        } else {
            opened = window.TabManager.createTab(tab.code, { fileName: fileName(tab) });
            if (opened && targetFolder) assignments[opened.id] = targetFolder;
            delete assignments[tab.id];
        }
        if (!opened) return;
        activeFileAnimationId = opened.id;
        closedFiles = closedFiles.filter(function (item) { return item.id !== tab.id; }); saveClosed(); saveFolders(); renderFiles(); showEditor();
        window.setTimeout(function () { if (activeFileAnimationId === opened.id) activeFileAnimationId = null; }, 500);
    }
    function deleteFile(tab) {
        if (window.TabManager.getRunningTab && window.TabManager.getRunningTab()) { if (window.TabManager.onActionBlocked) window.TabManager.onActionBlocked('Interrompa a execução antes de excluir arquivos.'); return; }
        if (tab.closed) {
            trash.unshift({ code: tab.code, fileName: fileName(tab), folderId: assignments[tab.id] || null, at: Date.now() });
            closedFiles = closedFiles.filter(function (item) { return item.id !== tab.id; }); saveClosed(); saveTrash();
            delete assignments[tab.id]; saveFolders(); renderFiles(); return;
        }
        deletingFiles.add(tab.id);
        window.TabManager.closeTab(tab.id);
    }
    function redrawBreakpoints(tabId) {
        var cm = window.VisualGEditor.instance; if (!cm) return;
        cm.clearGutter('breakpoints');
        (breakpoints[tabId] || new Set()).forEach(function (line) {
            if (line < 1 || line > cm.lineCount()) return;
            var marker = document.createElement('span'); marker.className = 'breakpoint-marker'; marker.textContent = '●';
            cm.setGutterMarker(line - 1, 'breakpoints', marker);
        });
    }
    function getCurrentBreakpoints() {
        var tab = window.TabManager.getActiveTab(); if (!tab) return [];
        var cm = window.VisualGEditor.instance; var lines = [];
        for (var line = 0; line < cm.lineCount(); line++) {
            var info = cm.lineInfo(line);
            if (info && info.gutterMarkers && info.gutterMarkers.breakpoints) lines.push(line + 1);
        }
        breakpoints[tab.id] = new Set(lines); return lines;
    }
    function toggleBreakpoint(cm, line) {
        var gutter = arguments[2];
        if (gutter && gutter !== 'breakpoints') return;
        var tab = window.TabManager.getActiveTab(); if (!tab) return;
        var set = breakpoints[tab.id] || new Set();
        if (set.has(line + 1)) { set.delete(line + 1); cm.setGutterMarker(line, 'breakpoints', null); }
        else { set.add(line + 1); var marker = document.createElement('span'); marker.className = 'breakpoint-marker'; marker.textContent = '●'; cm.setGutterMarker(line, 'breakpoints', marker); }
        breakpoints[tab.id] = set;
        renderDebugBreakpoints();
    }
    function renderDebugBreakpoints() {
        var list = get('debug-breakpoint-list'); var section = get('debug-breakpoints'); if (!list || !section) return;
        var lines = getCurrentBreakpoints();
        list.textContent = '';
        section.hidden = !lines.length;
        if (!lines.length) return;
        lines.forEach(function (line) {
            var item = document.createElement('button'); item.type = 'button'; item.className = 'debug-breakpoint-item';
            item.textContent = '• Linha ' + line;
            item.addEventListener('click', function () { showEditor(); window.VisualGEditor.revealLocation(line, 1); });
            list.appendChild(item);
        });
    }
    function renderDebugCallStack(names, active) {
        var list = get('debug-callstack-list'); var section = get('debug-callstack'); if (!list || !section) return;
        list.replaceChildren();
        if (!active || !names || !names.length) { section.hidden = true; return; }
        section.hidden = false;
        var frames = ['Principal'].concat(names || []);
        frames.forEach(function (name, index) {
            var row = document.createElement('div'); row.className = 'debug-callstack-frame';
            row.textContent = (index ? '└─ ' : '') + name;
            list.appendChild(row);
        });
    }
    function createFileItem(tab) {
        var item = document.createElement('button');
        var isRunning = !!(tab.running || (tab.executor && tab.executor.running));
        item.type = 'button'; item.className = 'file-item' + (window.TabManager.getActiveTab()?.id === tab.id ? ' active' : '') + (isRunning ? ' running' : '');
        item.dataset.tabId = tab.id; item.title = fileName(tab); item.draggable = true;
        if (item.classList.contains('active') && activeFileAnimationId === tab.id) { item.classList.add('file-select-enter'); activeFileAnimationId = null; window.setTimeout(function () { item.classList.remove('file-select-enter'); }, 340); }
        if (recentlyMovedTabId === tab.id) { item.classList.add('file-drop-arrive'); recentlyMovedTabId = null; window.setTimeout(function () { item.classList.remove('file-drop-arrive'); }, 360); }
        var fileIcon = icon(isRunning ? 'loader-circle' : 'file-code-2'); fileIcon.classList.add('file-icon'); fileIcon.setAttribute('aria-hidden', 'true');
        var label = document.createElement('span'); label.className = 'file-label'; label.textContent = fileName(tab);
        var close = icon('trash-2'); close.classList.add('file-close'); close.setAttribute('aria-hidden', 'true'); close.title = 'Excluir arquivo';
        item.append(fileIcon, label, close);
        item.addEventListener('click', function (event) {
            if (event.target.closest('.file-close')) { deleteFile(tab); return; }
            openSavedFile(tab);
        });
        item.addEventListener('contextmenu', function (event) { event.preventDefault(); openFileMenu(event, tab); });
        item.addEventListener('dragstart', function (event) { if (window.TabManager.getRunningTab && window.TabManager.getRunningTab()) { event.preventDefault(); return; } event.dataTransfer.setData('text/visualg-tab', tab.id); event.dataTransfer.effectAllowed = 'move'; item.classList.add('drag-source'); });
        item.addEventListener('dragend', function () { item.classList.remove('drag-source'); document.querySelectorAll('.file-folder.drag-over').forEach(function (folder) { folder.classList.remove('drag-over'); }); });
        return item;
    }

    function renderFiles() {
        var list = get('workspace-file-list');
        if (!list || !window.TabManager) return;
        var query = get('workspace-file-search').value.trim().toLocaleLowerCase('pt-BR');
        var tabs = window.TabManager.getTabs().concat(closedFiles);
        list.replaceChildren();
        function appendGroup(target, folderId) {
            tabs.filter(function (tab) { return (assignments[tab.id] || null) === folderId && fileName(tab).toLocaleLowerCase('pt-BR').includes(query); })
                .forEach(function (tab) { target.appendChild(createFileItem(tab)); });
        }
        appendGroup(list, null);
        folders.forEach(function (folder) {
            var children = tabs.filter(function (tab) { return assignments[tab.id] === folder.id && fileName(tab).toLocaleLowerCase('pt-BR').includes(query); });
            if (query && !children.length && !folder.name.toLocaleLowerCase('pt-BR').includes(query)) return;
            var isCollapsed = !!collapsedFolders[folder.id];
            var heading = document.createElement('button'); heading.type = 'button'; heading.className = 'file-item file-folder' + (isCollapsed ? ' collapsed' : ''); heading.title = folder.name; heading.setAttribute('aria-expanded', String(!isCollapsed));
            var disclosure = document.createElement('span'); disclosure.className = 'folder-disclosure'; disclosure.setAttribute('aria-hidden', 'true'); disclosure.appendChild(icon('chevron-down'));
            var folderIcon = icon(isCollapsed ? 'folder' : 'folder-open'); folderIcon.classList.add('folder-icon');
            var folderLabel = document.createElement('span'); folderLabel.className = 'file-label'; folderLabel.textContent = folder.name; folderLabel.title = folder.name;
            heading.append(disclosure, folderIcon, folderLabel);
            var group = document.createElement('div'); group.className = 'folder-files';
            children.forEach(function (tab) { group.appendChild(createFileItem(tab)); });
            group.inert = isCollapsed;
            group.style.height = isCollapsed ? '0px' : 'auto';
            heading.addEventListener('click', function () {
                collapsedFolders[folder.id] = !collapsedFolders[folder.id];
                var collapsed = !!collapsedFolders[folder.id];
                heading.classList.toggle('collapsed', collapsed); heading.setAttribute('aria-expanded', String(!collapsed)); group.inert = collapsed;
                if (collapsed) {
                    group.style.height = group.getBoundingClientRect().height + 'px';
                    window.requestAnimationFrame(function () { group.style.height = '0px'; });
                } else {
                    group.style.height = '0px';
                    window.requestAnimationFrame(function () { group.style.height = group.scrollHeight + 'px'; });
                    window.setTimeout(function () { if (!heading.classList.contains('collapsed')) group.style.height = 'auto'; }, 460);
                }
                var currentIcon = heading.querySelector('.folder-icon');
                if (currentIcon) { var nextIcon = icon(collapsed ? 'folder' : 'folder-open'); nextIcon.classList.add('folder-icon', 'folder-icon-enter'); currentIcon.replaceWith(nextIcon); refreshIcons(heading); window.setTimeout(function () { nextIcon.classList.remove('folder-icon-enter'); }, 220); }
                saveFolders();
            });
            heading.addEventListener('dragover', function (event) { event.preventDefault(); heading.classList.add('drag-over'); });
            heading.addEventListener('dragleave', function (event) { if (!heading.contains(event.relatedTarget)) heading.classList.remove('drag-over'); });
            heading.addEventListener('drop', function (event) {
                event.preventDefault(); heading.classList.remove('drag-over');
                var id = event.dataTransfer.getData('text/visualg-tab'); if (!id) return;
                var moved = tabs.find(function (entry) { return entry.id === id; });
                assignments[id] = folder.id; recentlyMovedTabId = id;
                if (moved) {
                    var movedName = uniqueFileName(fileName(moved), moved.id, folder.id);
                    if (moved.closed) { moved.fileName = movedName; saveClosed(); }
                    else window.TabManager.setFileName(moved.id, movedName);
                }
                saveFolders(); renderFiles();
            });
            heading.addEventListener('contextmenu', function (event) {
                event.preventDefault();
                var name = window.prompt('Renomear pasta (deixe vazio para excluir)', folder.name);
                if (name === null) return;
                if (name.trim()) folder.name = name.trim();
                else { folders = folders.filter(function (entry) { return entry.id !== folder.id; }); Object.keys(assignments).forEach(function (id) { if (assignments[id] === folder.id) delete assignments[id]; }); }
                saveFolders(); renderFiles();
            });
            list.append(heading, group);
        });
        refreshIcons(list);
    }

    function exportWorkspaceFile(tab, format) {
        if (!tab || typeof tab.code !== 'string') return;
        var baseName = fileName(tab).replace(/\.(alg|txt)$/i, '').replace(/[\\/:*?"<>|]/g, '_').trim() || 'programa';
        var blob = new Blob([tab.code], { type: 'text/plain;charset=utf-8' });
        var link = document.createElement('a');
        var objectUrl = URL.createObjectURL(blob);
        link.href = objectUrl;
        link.download = baseName + '.' + format;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(function () { URL.revokeObjectURL(objectUrl); }, 1000);
    }

    function openEditorQuickMenu(event) {
        var old = get('editor-quick-menu'); if (old) old.remove();
        var menu = document.createElement('div'); menu.id = 'editor-quick-menu'; menu.className = 'editor-quick-menu';
        menu.setAttribute('role', 'dialog'); menu.setAttribute('aria-label', 'Ajustes rápidos do editor');
        var dismiss = null; var escape = null;
        function closeMenu() {
            menu.remove();
            if (dismiss) document.removeEventListener('pointerdown', dismiss);
            if (escape) document.removeEventListener('keydown', escape);
        }
        var header = document.createElement('div'); header.className = 'editor-quick-menu-header';
        var title = document.createElement('strong'); title.textContent = 'Ajustes do editor';
        var close = document.createElement('button'); close.type = 'button'; close.textContent = '×'; close.title = 'Fechar ajustes'; close.setAttribute('aria-label', 'Fechar ajustes');
        close.addEventListener('click', closeMenu); header.append(title, close); menu.appendChild(header);
        [
            ['Fonte', 'setting-editor-font-family', 'change'],
            ['Tamanho da fonte', 'setting-font-size', 'input'],
            ['Espaçamento entre letras', 'setting-letter-spacing', 'input'],
            ['Espaçamento entre linhas', 'setting-line-spacing', 'input'],
            ['Quebra de linha', 'setting-word-wrap', 'change'],
            ['Tamanho da tabulação', 'setting-tab-size', 'change'],
            ['Guias de indentação', 'setting-indent-guides', 'change']
        ].forEach(function (entry) {
            var source = get(entry[1]); if (!source) return;
            var field = document.createElement('label'); field.className = 'editor-quick-field';
            var caption = document.createElement('span'); caption.textContent = entry[0];
            var control = source.cloneNode(true); control.removeAttribute('id'); control.classList.add('editor-quick-control'); control.value = source.value;
            control.addEventListener(entry[2], function () {
                source.value = control.value;
                source.dispatchEvent(new window.Event(entry[2], { bubbles:true }));
                control.value = source.value;
            });
            field.append(caption, control); menu.appendChild(field);
        });
        menu.addEventListener('pointerdown', function (pointerEvent) { pointerEvent.stopPropagation(); });
        menu.addEventListener('contextmenu', function (contextEvent) { contextEvent.preventDefault(); });
        document.body.appendChild(menu);
        var bounds = menu.getBoundingClientRect();
        menu.style.left = Math.max(8, Math.min(event.clientX, window.innerWidth - bounds.width - 8)) + 'px';
        menu.style.top = Math.max(8, Math.min(event.clientY, window.innerHeight - bounds.height - 8)) + 'px';
        dismiss = function (pointerEvent) {
            if (menu.contains(pointerEvent.target)) return;
            closeMenu();
        };
        escape = function (keyEvent) {
            if (keyEvent.key !== 'Escape') return;
            closeMenu();
        };
        document.addEventListener('pointerdown', dismiss);
        document.addEventListener('keydown', escape);
    }

    function openFileMenu(event, tab) {
        var old = get('file-context-menu'); if (old) old.remove();
        var menu = document.createElement('div'); menu.id = 'file-context-menu'; menu.className = 'debug-menu';
        menu.style.position = 'fixed'; menu.style.left = event.clientX + 'px'; menu.style.top = event.clientY + 'px';
        function option(label, action) { var button = document.createElement('button'); button.type = 'button'; button.textContent = label; button.addEventListener('click', function () { menu.remove(); action(); }); menu.appendChild(button); }
        if (!tab.closed) option('Fechar aba', function () { window.TabManager.closeTab(tab.id); });
        option('Exportar como .alg', function () { exportWorkspaceFile(tab, 'alg'); });
        option('Exportar como .txt', function () { exportWorkspaceFile(tab, 'txt'); });
        option('Renomear', function () { var name = window.prompt('Nome do arquivo', fileName(tab)); if (!name) return; name = uniqueFileName(name, tab.id, assignments[tab.id] || null); if (tab.closed) { tab.fileName = name; saveClosed(); renderFiles(); } else if (window.TabManager.setFileName(tab.id, name)) renderFiles(); });
        option('Duplicar', function () { duplicateFile(tab); });
        option('Mover para pasta', function () {
            var name = window.prompt('Nome da pasta (vazio para mover à raiz)', folders.find(function (folder) { return folder.id === assignments[tab.id]; })?.name || '');
            if (name === null) return;
            var folder = folders.find(function (entry) { return entry.name.toLocaleLowerCase('pt-BR') === name.trim().toLocaleLowerCase('pt-BR'); });
            if (name.trim() && !folder) { folder = { id: 'folder-' + Date.now(), name: name.trim() }; folders.push(folder); }
            if (folder) assignments[tab.id] = folder.id; else delete assignments[tab.id];
            var renamed = uniqueFileName(fileName(tab), tab.id, folder ? folder.id : null);
            if (tab.closed) { tab.fileName = renamed; saveClosed(); }
            else window.TabManager.setFileName(tab.id, renamed);
            saveFolders(); renderFiles();
        });
        option('Excluir', function () { deleteFile(tab); });
        document.body.appendChild(menu);
        var bounds = menu.getBoundingClientRect();
        menu.style.left = Math.max(8, Math.min(event.clientX, window.innerWidth - bounds.width - 8)) + 'px';
        menu.style.top = Math.max(8, Math.min(event.clientY, window.innerHeight - bounds.height - 8)) + 'px';
        setTimeout(function () { document.addEventListener('click', function dismiss() { menu.remove(); document.removeEventListener('click', dismiss); }, { once: true }); }, 0);
    }

    function renderDocs() {
        var list = get('workspace-doc-list');
        var normalize = normalizeDocSearch;
        var terms = normalize(get('docs-search').value).split(' ').filter(Boolean);
        list.replaceChildren();
        var docsHeading = document.createElement('h3'); docsHeading.className = 'doc-results-heading'; docsHeading.textContent = 'Documentação'; list.appendChild(docsHeading);
        var matches = 0;
        DOCS.forEach(function (entry) {
            var markdown = docCache[entry[0]] || '';
            var searchable = normalize(entry[1] + ' ' + (DOC_TAGS[entry[0]] || '') + ' ' + markdown);
            if (terms.length && !terms.every(function (term) { return searchable.includes(term); })) return;
            var button = document.createElement('button'); button.className = 'doc-item'; button.type = 'button';
            var title = document.createElement('strong'); title.className = 'doc-result-title'; title.textContent = entry[1]; button.appendChild(title);
            var preview = document.createElement('span'); preview.className = 'doc-result-preview'; preview.textContent = docPreview(markdown, terms); button.appendChild(preview);
            button.addEventListener('click', function () { pendingDocSearch = terms.length ? { id: entry[0], terms: terms.slice() } : null; showDoc(entry[0]); }); list.appendChild(button); matches++;
        });
        if (!matches) { var empty = document.createElement('div'); empty.className = 'docs-search-empty'; empty.textContent = 'Nenhum tópico de documentação encontrado'; list.appendChild(empty); }
        if (terms.length) {
            var examplesHeading = document.createElement('h3'); examplesHeading.className = 'doc-results-heading'; examplesHeading.textContent = 'Exemplos'; list.appendChild(examplesHeading);
            var exampleMatches = 0;
            (window.VisuAlgExamples || []).forEach(function (example) {
                var searchable = normalize([example.title, example.level, example.description, example.source].join(' '));
                if (!terms.every(function (term) { return searchable.includes(term); })) return;
                var button = document.createElement('button'); button.className = 'doc-item doc-example-result'; button.type = 'button';
                var title = document.createElement('strong'); title.className = 'doc-result-title'; title.textContent = example.title;
                var preview = document.createElement('span'); preview.className = 'doc-result-preview'; preview.textContent = example.description;
                button.append(title, preview); button.addEventListener('click', function () { showExamples(terms.join(' '), example.id); }); list.appendChild(button); exampleMatches++;
            });
            if (!exampleMatches) { var noExamples = document.createElement('div'); noExamples.className = 'docs-search-empty'; noExamples.textContent = 'Nenhum exemplo encontrado'; list.appendChild(noExamples); }
        }
    }
    function normalizeDocSearch(value) { return value.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[`*_#>|()[\]{}.,;:!?\\-]+/g, ' ').replace(/\s+/g, ' ').trim(); }
    function docPreview(markdown, terms) {
        var paragraphs = markdown.split(/\n\s*\n/).map(function (part) { return part.replace(/^\s*#{1,6}\s*/gm, '').replace(/^\s*```[^\n]*\n?/gm, '').replace(/\n?```\s*$/gm, '').replace(/^\s*[-*+]\s+/gm, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[`*_>#]/g, '').replace(/\s+/g, ' ').trim(); }).filter(Boolean);
        var matching = paragraphs.find(function (paragraph) { var text = normalizeDocSearch(paragraph); return terms.length && terms.every(function (term) { return text.includes(term); }); });
        var text = matching || paragraphs.find(function (paragraph) { return !/^\d+(\.\d+)*\s/.test(paragraph); }) || 'Abra para consultar este tópico.';
        return text.length > 150 ? text.slice(0, 147).trimEnd() + '…' : text;
    }
    function indexDocs() {
        DOCS.forEach(function (entry) {
            fetch('docs/' + entry[0] + '.md').then(function (response) { if (!response.ok) throw new Error('Documento indisponível'); return response.text(); })
                .then(function (markdown) { docCache[entry[0]] = markdown; if (get('docs-search').value) renderDocs(); })
                .catch(function () { /* documentation remains available through other entries */ });
        });
    }

    function pushView(next) {
        if (view.type === next.type && view.docId === next.docId) return;
        viewHistory = viewHistory.slice(0, historyPosition + 1); viewHistory.push(next); historyPosition++;
        setView(next);
    }
    function updateHistoryButtons() {
        var backDisabled = historyPosition === 0;
        var forwardDisabled = historyPosition === viewHistory.length - 1;
        get('btn-nav-back').disabled = backDisabled;
        get('btn-nav-forward').disabled = forwardDisabled;
        if (get('mobile-nav-back')) get('mobile-nav-back').disabled = backDisabled;
        if (get('mobile-nav-forward')) get('mobile-nav-forward').disabled = forwardDisabled;
    }
    function restoreHistoricalView() {
        var target = viewHistory[historyPosition]; setView(target);
        if (target.type === 'docs') showDoc(target.docId, true);
        if (target.type === 'examples') showExamples();
        if (target.type === 'settings') showSettings();
    }
    function setView(next) {
        if (next.type !== 'editor' && window.TabManager) window.TabManager.dismissStartScreen();
        view = next;
        document.querySelector('.ide-shell').classList.remove('mobile-files', 'mobile-debug');
        editor.classList.toggle('console-visible', next.type === 'console');
        updateConsoleButton();
        get('btn-settings').setAttribute('aria-pressed', String(next.type === 'settings'));
        editor.classList.toggle('aux-visible', ['docs', 'examples', 'settings'].includes(next.type));
        aux.classList.toggle('hidden', !['docs', 'examples', 'settings'].includes(next.type));
        get('editorPanel').classList.toggle('hidden', ['console', 'examples', 'settings', 'docs'].includes(next.type));
        get('tab-list').querySelectorAll('.view-tab').forEach(function (button) {
            var active = button.dataset.type === next.type && (next.type !== 'docs' || button.dataset.docId === next.docId);
            button.classList.toggle('active', active); button.setAttribute('aria-selected', String(active));
            if (active) button.scrollIntoView({ block:'nearest', inline:'nearest' });
        });
        get('tab-list').querySelectorAll('.tab-item').forEach(function (button) {
            button.classList.toggle('workspace-inactive', next.type !== 'editor');
            var activeFile = window.TabManager.getActiveTab();
            button.setAttribute('aria-selected', String(next.type === 'editor' && activeFile && button.dataset.tabId === activeFile.id));
        });
        updateHistoryButtons();
        if (next.type === 'editor' && window.VisualGEditor.instance) window.setTimeout(function () { window.VisualGEditor.instance.refresh(); }, 0);
        if (next.type === 'console' && get('terminal-input-area').classList.contains('hidden') === false) get('terminal-input').focus();
    }
    function showEditor() { if (view.type === 'editor') setView(view); else pushView({ type: 'editor' }); }
    function animateEditorForFileSwitch() {
        var panel = get('editorPanel');
        if (!panel) return;
        panel.classList.remove('file-switch-enter');
        void panel.offsetWidth;
        panel.classList.add('file-switch-enter');
        window.setTimeout(function () { panel.classList.remove('file-switch-enter'); }, 240);
    }
    function closeConsoleDialog() {
        if (!consoleDialog) return;
        var wasVisible = !consoleDialog.classList.contains('hidden');
        consoleDialog.classList.add('hidden'); editor.appendChild(terminal);
        if (wasVisible) showEditor();
    }
    function navigateToLocation(tabId, line, column) {
        closeConsoleDialog();
        if (consolePanelOpen) { consolePanelOpen = false; editor.classList.remove('console-panel-visible'); }
        if (tabId && window.TabManager.getActiveTab()?.id !== tabId) window.TabManager.switchTab(tabId);
        showEditor();
        window.requestAnimationFrame(function () { window.VisualGEditor.revealLocation(line, column); });
    }
    function ensureConsoleDialog() {
        if (consoleDialog) return consoleDialog;
        consoleDialog = document.createElement('div'); consoleDialog.className = 'modal-overlay console-overlay hidden';
        var box = document.createElement('div'); box.className = 'console-dialog';
        var header = document.createElement('div'); header.className = 'console-dialog-header'; header.textContent = 'Console';
        var close = document.createElement('button'); close.type = 'button'; close.textContent = 'Voltar ao editor'; close.addEventListener('click', closeConsoleDialog);
        header.appendChild(close); box.appendChild(header); consoleDialog.appendChild(box); document.body.appendChild(consoleDialog);
        consoleDialog.addEventListener('click', function (event) { if (event.target === consoleDialog) closeConsoleDialog(); });
        return consoleDialog;
    }
    function syncConsoleWindow() {
        if (!consoleWindow || consoleWindow.closed) return;
        var style = window.getComputedStyle(document.documentElement);
        consoleWindow.postMessage({ type: 'visualg-console', output: get('terminal-output').innerText, inputNeeded: !get('terminal-input-area').classList.contains('hidden') || !get('consoleInputOverlay').classList.contains('hidden'), colors: { background: style.getPropertyValue('--ide-canvas').trim(), panel: style.getPropertyValue('--ide-panel').trim(), foreground: style.getPropertyValue('--ide-foreground').trim(), border: style.getPropertyValue('--ide-border').trim() }, fontSize: get('setting-console-font-size').value, fontFamily: get('setting-console-font-family').value }, window.location.origin === 'null' ? '*' : window.location.origin);
    }
    function showConsole() {
        var mode = localStorage.getItem('visualg-console-presentation') || 'modal';
        if (mode === 'panel') {
            closeConsoleDialog(); consolePanelOpen = true; editor.classList.add('console-panel-visible');
            showEditor(); updateConsoleButton(); window.VisualGEditor.instance.refresh(); return;
        }
        consolePanelOpen = false; editor.classList.remove('console-panel-visible');
        if (mode === 'modal') {
            if (view.type === 'console') showEditor();
            var dialog = ensureConsoleDialog(); dialog.querySelector('.console-dialog').appendChild(terminal); dialog.classList.remove('hidden');
            document.querySelector('.ide-shell').classList.remove('mobile-files', 'mobile-debug'); updateConsoleButton(); return;
        }
        closeConsoleDialog();
        if (mode === 'window' || mode === 'browser-tab') {
            showEditor();
            if (!consoleWindow || consoleWindow.closed || consoleWindowMode !== mode) {
                consoleWindow = window.open('console-window.html', mode === 'window' ? 'visualg-console' : '_blank', mode === 'window' ? 'width=1000,height=720' : undefined);
                consoleWindowMode = mode;
            } else consoleWindow.focus();
            if (consoleWindow) window.setTimeout(syncConsoleWindow, 300);
            else { var dialogFallback = ensureConsoleDialog(); dialogFallback.querySelector('.console-dialog').appendChild(terminal); dialogFallback.classList.remove('hidden'); }
            updateConsoleButton();
            return;
        }
        ensureViewTab('console', 'Console'); pushView({ type: 'console' });
    }
    function toggleConsole() {
        var dialogOpen = consoleDialog && !consoleDialog.classList.contains('hidden');
        var windowOpen = consoleWindow && !consoleWindow.closed;
        if (view.type === 'console' || consolePanelOpen || dialogOpen || windowOpen) {
            if (consolePanelOpen) { consolePanelOpen = false; editor.classList.remove('console-panel-visible'); }
            if (dialogOpen) closeConsoleDialog();
            if (windowOpen) { consoleWindow.close(); consoleWindow = null; consoleWindowMode = null; }
            if (view.type !== 'editor') showEditor();
            updateConsoleButton();
            return;
        }
        showConsole();
    }
    function toggleSettings() {
        if (view.type === 'settings') showEditor();
        else showSettings();
    }
    function openIssueTracker() { window.open('https://github.com/Gregorio-A/visualg-web/issues', '_blank', 'noopener,noreferrer'); }
    function resetConfiguration(scope) {
        var groups = {
            'Aparência': ['visualg-theme'],
            'Editor': ['visualg-editor-font-family', 'visualg-font-size', 'visualg-word-wrap', 'visualg-tab-size', 'visualg-indent-guides', 'visualg-editor-letter-spacing', 'visualg-editor-line-spacing', 'visualg-editor-spacing-relative-v1'],
            'Variáveis': ['visualg-vars-font-size', 'visualg-vars-columns'],
            'Console': ['visualg-console-font-family', 'visualg-console-font-size', 'visualg-console-presentation', 'visualg-console-input-mode'],
            'Execução': ['visualg-loop-detection'],
            'Atalhos': ['visualg-shortcut-run', 'visualg-shortcut-step', 'visualg-shortcut-debug', 'visualg-shortcut-save', 'visualg-shortcut-palette', 'visualg-shortcut-font'],
            'Interface': ['visualg-layout-v2', 'visualg-section-visibility-v1']
        };
        var keys = scope === 'Todas' ? Object.keys(groups).reduce(function (all, name) { return all.concat(groups[name]); }, []) : groups[scope];
        if (!keys) return;
        var message = scope === 'Todas'
            ? 'Restaurar todas as configurações do aplicativo? Seus arquivos e códigos salvos serão mantidos.'
            : 'Restaurar as configurações de ' + scope + '? Seus arquivos e códigos salvos serão mantidos.';
        if (!window.confirm(message)) return;
        if (window.TabManager && window.TabManager.saveWorkspace) window.TabManager.saveWorkspace();
        keys.forEach(function (key) { localStorage.removeItem(key); });
        window.location.reload();
    }
    function ensureViewTab(type, label, docId) {
        var tabs = get('tab-list');
        var existing = Array.from(tabs.querySelectorAll('.view-tab')).find(function (child) { return child.dataset.type === type && (type === 'docs' || child.dataset.docId === (docId || '')); });
        if (existing) {
            if (type === 'docs') {
                existing.dataset.docId = docId || '';
                var existingTitle = existing.querySelector('span');
                if (existingTitle) existingTitle.textContent = label;
                existing.setAttribute('aria-label', label);
            }
            return existing;
        }
        var button = document.createElement('div'); button.className = 'view-tab'; button.dataset.type = type; button.dataset.docId = docId || ''; button.draggable = true;
        button.setAttribute('role', 'tab'); button.setAttribute('aria-label', label); button.tabIndex = 0;
        var glyph = icon(type === 'console' ? 'terminal' : type === 'settings' ? 'settings' : type === 'examples' ? 'library-big' : type === 'docs' ? 'book-open' : 'columns-2');
        var title = document.createElement('span'); title.textContent = label;
        var close = document.createElement('button'); close.type = 'button'; close.className = 'view-tab-close'; close.title = 'Fechar ' + label; close.setAttribute('aria-label', close.title); close.append(icon('x'));
        close.addEventListener('click', function (event) { event.stopPropagation(); closeViewTab(button); });
        button.append(glyph, title, close);
        button.addEventListener('click', function () { activateViewTab(button); });
        button.addEventListener('auxclick', function (event) { if (event.button === 1) { event.preventDefault(); closeViewTab(button); } });
        button.addEventListener('keydown', function (event) { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activateViewTab(button); } });
        button.addEventListener('contextmenu', function (event) {
            event.preventDefault(); openViewTabMenu(event, button);
        });
        tabs.appendChild(button); refreshIcons(button); return button;
    }
    function activateViewTab(button) {
        if (button.dataset.type === 'console') showConsole();
        else if (button.dataset.type === 'examples') showExamples();
        else if (button.dataset.type === 'settings') showSettings();
        else showDoc(button.dataset.docId);
    }
    function closeViewTab(button) {
        var active = button.classList.contains('active');
        var type = button.dataset.type; var docId = button.dataset.docId;
        button.remove();
        viewHistory = viewHistory.filter(function (entry) { return !(entry.type === type && (type !== 'docs' || entry.docId === docId)); });
        if (!viewHistory.length) viewHistory = [{ type: 'editor' }];
        historyPosition = viewHistory.length - 1;
        if (active) { if (viewHistory[historyPosition].type !== 'editor') { viewHistory.push({ type: 'editor' }); historyPosition++; } setView({ type: 'editor' }); }
        else updateHistoryButtons();
    }
    function initTabOverview() {
        var trigger = get('btn-tab-overview');
        if (!trigger) return;
        var menu = document.createElement('div');
        menu.id = 'tab-overview-menu'; menu.className = 'tab-overview-menu';
        menu.setAttribute('role', 'dialog'); menu.setAttribute('aria-label', 'Abas abertas');
        var search = document.createElement('input'); search.type = 'search'; search.className = 'tab-overview-search'; search.placeholder = 'Localizar uma aba'; search.setAttribute('aria-label', 'Localizar uma aba');
        var list = document.createElement('div'); list.className = 'tab-overview-list';
        menu.append(search, list); document.body.appendChild(menu); menu.hidden = true;

        function renderRows() {
            var query = search.value.trim().toLocaleLowerCase('pt-BR');
            list.replaceChildren();
            var files = window.TabManager.getTabs();
            var views = Array.from(get('tab-list').querySelectorAll('.view-tab'));
            function group(title, items) {
                var filtered = items.filter(function (item) { return item.label.toLocaleLowerCase('pt-BR').includes(query); });
                if (!filtered.length) return;
                var section = document.createElement('section'); section.className = 'tab-overview-group';
                var heading = document.createElement('h3'); heading.textContent = title; section.appendChild(heading);
                filtered.forEach(function (item) {
                    var row = document.createElement('div'); row.className = 'tab-overview-row' + (item.active ? ' active' : '');
                    var select = document.createElement('button'); select.type = 'button'; select.className = 'tab-overview-select'; select.textContent = item.label; select.title = item.label;
                    select.addEventListener('click', function () {
                        closeMenu();
                        if (item.kind === 'file') { window.TabManager.switchTab(item.id); showEditor(); }
                        else activateViewTab(item.element);
                    });
                    var close = document.createElement('button'); close.type = 'button'; close.className = 'tab-overview-close'; close.textContent = '×'; close.title = 'Fechar ' + item.label; close.setAttribute('aria-label', close.title);
                    close.addEventListener('click', function (event) {
                        event.stopPropagation();
                        if (item.kind === 'file') window.TabManager.closeTab(item.id); else closeViewTab(item.element);
                        renderRows(); search.focus();
                    });
                    row.append(select, close); section.appendChild(row);
                });
                list.appendChild(section);
            }
            var activeFile = window.TabManager.getActiveTab();
            group('Arquivos', files.map(function (tab) { return { kind:'file', id:tab.id, label:fileName(tab), active:!!activeFile && tab.id === activeFile.id && view.type === 'editor' }; }));
            group('Outras abas', views.map(function (element) { return { kind:'view', element:element, label:element.querySelector('span').textContent, active:element.classList.contains('active') }; }));
            if (!list.children.length) { var empty = document.createElement('p'); empty.className = 'tab-overview-empty'; empty.textContent = 'Nenhuma aba encontrada'; list.appendChild(empty); }
        }
        function closeMenu() { menu.hidden = true; trigger.setAttribute('aria-expanded', 'false'); }

        trigger.addEventListener('click', function (event) {
            event.stopPropagation();
            if (!menu.hidden) { closeMenu(); return; }
            search.value = '';
            renderRows();
            var bounds = trigger.getBoundingClientRect();
            menu.hidden = false;
            menu.style.left = Math.max(8, Math.min(bounds.right - 300, window.innerWidth - 308)) + 'px';
            menu.style.top = Math.max(8, Math.min(bounds.bottom + 6, window.innerHeight - 420)) + 'px';
            trigger.setAttribute('aria-expanded', 'true'); search.focus();
        });
        search.addEventListener('input', renderRows);
        menu.addEventListener('pointerdown', function (event) { event.stopPropagation(); });
        document.addEventListener('pointerdown', function (event) { if (!menu.hidden && !menu.contains(event.target) && event.target !== trigger) closeMenu(); });
        document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && !menu.hidden) { closeMenu(); trigger.focus(); } });
        new MutationObserver(function () { if (!menu.hidden) renderRows(); }).observe(get('tab-list'), { childList:true, subtree:true });
    }
    function openViewTabMenu(event, button) {
        var old = get('view-tab-menu'); if (old) old.remove();
        var menu = document.createElement('div'); menu.id = 'view-tab-menu'; menu.className = 'debug-menu';
        menu.style.position = 'fixed'; menu.style.left = Math.min(event.clientX, window.innerWidth - 195) + 'px'; menu.style.top = Math.min(event.clientY, window.innerHeight - 90) + 'px';
        var close = document.createElement('button'); close.type = 'button'; close.textContent = 'Fechar aba'; close.addEventListener('click', function () { closeViewTab(button); menu.remove(); }); menu.append(close);
        document.body.append(menu);
        window.setTimeout(function () { document.addEventListener('pointerdown', function dismiss(e) { if (menu.contains(e.target)) return; menu.remove(); document.removeEventListener('pointerdown', dismiss); }); }, 0);
    }
    function showDoc(id, fromHistory) {
        var item = DOCS.find(function (entry) { return entry[0] === id; }); if (!item) return;
        aux.className = 'workspace-aux-view docs-rendered';
        ensureViewTab('docs', item[1], id); activeDocument = id;
        if (fromHistory) setView({ type: 'docs', docId: id });
        else pushView({ type: 'docs', docId: id });
        aux.classList.add('docs-rendered'); aux.textContent = 'Carregando documentação...';
        if (docCache[id]) { renderDocContent(docCache[id]); return; }
        fetch('docs/' + id + '.md').then(function (response) { if (!response.ok) throw new Error('Documentação indisponível'); return response.text(); })
            .then(function (markdown) { docCache[id] = markdown; if (activeDocument === id) renderDocContent(markdown); })
            .catch(function () { if (activeDocument === id) aux.textContent = 'Não foi possível carregar esta página.'; });
    }
    function renderDocContent(markdown) {
        var article = document.createElement('article'); article.className = 'docs-article'; article.innerHTML = window.marked.parse(markdown);
        article.addEventListener('click', function (event) {
            var link = event.target.closest('a[href^="#doc:"]');
            if (!link) return;
            event.preventDefault();
            showDoc(link.getAttribute('href').slice(5));
        });
        var navigation = document.createElement('nav'); navigation.className = 'docs-page-navigation'; navigation.setAttribute('aria-label', 'Navegação da documentação');
        var docIndex = DOCS.findIndex(function (entry) { return entry[0] === activeDocument; });
        [['previous', docIndex > 0 ? DOCS[docIndex - 1] : null], ['next', docIndex >= 0 && docIndex < DOCS.length - 1 ? DOCS[docIndex + 1] : null]].forEach(function (item) {
            var button = document.createElement('button'); button.type = 'button'; button.className = 'docs-page-navigation-button docs-page-navigation-' + item[0];
            if (!item[1]) { button.disabled = true; button.textContent = item[0] === 'previous' ? '← Anterior' : 'Próxima →'; }
            else { button.textContent = (item[0] === 'previous' ? '← Anterior · ' : 'Próxima · ') + item[1][1]; button.addEventListener('click', function () { showDoc(item[1][0]); }); }
            navigation.appendChild(button);
        });
        article.appendChild(navigation); aux.replaceChildren(article); aux.scrollTop = 0;
        if (!pendingDocSearch || pendingDocSearch.id !== activeDocument) return;
        var terms = pendingDocSearch.terms; pendingDocSearch = null;
        var blocks = Array.prototype.slice.call(article.querySelectorAll('h1,h2,h3,h4,p,li,pre'));
        var target = null; var bestScore = 0;
        blocks.forEach(function (block) { var text = normalizeDocSearch(block.textContent); var score = terms.filter(function (term) { return text.includes(term); }).length; if (score > bestScore) { bestScore = score; target = block; } });
        if (target) { target.classList.add('doc-search-match'); target.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
    }

    function showSettings(category) {
        ensureViewTab('settings', 'Configurações'); pushView({ type: 'settings' });
        aux.className = 'workspace-aux-view workspace-settings';
        aux.replaceChildren();
        var sidebar = document.createElement('nav'); sidebar.className = 'settings-categories'; sidebar.setAttribute('aria-label', 'Categorias de configurações');
        var content = document.createElement('section'); content.className = 'settings-content';
        var descriptions = {
            'setting-theme':'Altera as cores do editor, console, variáveis, botões e ícones.',
            'setting-editor-font-family':'Define a fonte monoespaçada usada para escrever código.',
            'setting-font-size':'Controla o tamanho do código sem alterar o restante da interface.',
            'setting-letter-spacing':'Aumenta ou reduz a distância horizontal entre caracteres.',
            'setting-line-spacing':'Controla a altura de cada linha e também alinha a pauta do tema Notas.',
            'setting-word-wrap':'Quebra linhas longas dentro da largura visível do editor.',
            'setting-tab-size':'Define quantos espaços são inseridos ao indentar.',
            'setting-indent-guides':'Mostra linhas verticais para facilitar a leitura de blocos.',
            'setting-console-presentation':'Escolhe onde o console aparece durante a execução.',
            'setting-console-font-family':'Define a fonte usada nas mensagens e entradas.',
            'setting-console-font-size':'Ajusta apenas o texto do console.',
            'setting-console-input-mode':'Escolhe entre digitar no próprio console ou em uma janela de entrada.',
            'setting-vars-font-size':'Ajusta a tabela de variáveis e os valores de vetores.',
            'setting-loop-detection':'Quando ativada, pausa laços com mais de 1.000 iterações e pergunta se você deseja continuar. Isso ajuda a recuperar o controle de programas com loop infinito.'
        };
        var categories = [
            { title:'Aparência', description:'Escolha as cores usadas em toda a interface.', fields:[['Tema de cores','setting-theme']] },
            { title:'Editor', description:'Leitura, espaçamento e comportamento da área de código.', fields:[['Fonte','setting-editor-font-family'],['Tamanho da fonte (px)','setting-font-size'],['Espaçamento entre letras','setting-letter-spacing'],['Espaçamento entre linhas','setting-line-spacing'],['Quebra de linha','setting-word-wrap'],['Tamanho da tabulação','setting-tab-size'],['Guias de indentação','setting-indent-guides']], preview:'editor' },
            { title:'Console', description:'Aparência, posição e forma de entrada do console.', fields:[['Modo de exibição','setting-console-presentation'],['Fonte','setting-console-font-family'],['Tamanho da fonte (px)','setting-console-font-size'],['Entrada do console','setting-console-input-mode']], preview:'console' },
            { title:'Variáveis', description:'Aparência da tabela usada durante a execução e depuração.', fields:[['Tamanho da fonte (px)','setting-vars-font-size']], preview:'variables' },
            { title:'Execução', description:'Proteções aplicadas enquanto seu algoritmo está rodando.', fields:[['Detecção de loop infinito','setting-loop-detection']] },
            { title:'Arquivos', description:'Armazenamento local, nomes e exclusão dos seus algoritmos.', fields:[] },
            { title:'Atalhos', description:'Ative apenas os atalhos de teclado que você deseja usar.', fields:[] },
            { title:'Redefinir', description:'Restaure preferências específicas ou toda a configuração.', fields:[] }
        ];
        function createPreview(kind) {
            var preview = document.createElement('aside'); preview.className = 'settings-preview settings-preview-' + kind; preview.setAttribute('aria-label', 'Pré-visualização');
            var caption = document.createElement('strong'); caption.textContent = 'Pré-visualização'; preview.appendChild(caption);
            if (kind === 'editor') {
                var code = document.createElement('pre'); code.className = 'settings-preview-code'; code.innerHTML = '<span class="cm-keyword">algoritmo</span> <span class="cm-string">"Exemplo"</span>\n<span class="cm-keyword">inicio</span>\n\t<span class="cm-command">escreval</span>(<span class="cm-string">"Uma linha longa demonstra a quebra de texto no editor"</span>)\n<span class="cm-keyword">fimalgoritmo</span>';
                var tabHint = document.createElement('small'); tabHint.textContent = 'Tabulação e quebra de linha acompanham as opções acima.'; preview.append(code, tabHint);
            } else if (kind === 'console') {
                var output = document.createElement('pre'); output.className = 'settings-preview-console'; output.textContent = 'Programa iniciado\nDigite seu nome:';
                var input = document.createElement('div'); input.className = 'settings-preview-input'; input.textContent = 'Ana'; preview.append(output, input);
            } else if (kind === 'variables') {
                var table = document.createElement('table'); table.innerHTML = '<thead><tr><th>Nome</th><th>Tipo</th><th>Valor</th></tr></thead><tbody><tr><td>idade</td><td>inteiro</td><td>18</td></tr><tr><td>ativo</td><td>lógico</td><td>VERDADEIRO</td></tr></tbody>'; preview.appendChild(table);
            } else {
                var chrome = document.createElement('div'); chrome.className = 'settings-preview-window'; chrome.innerHTML = '<div class="settings-preview-toolbar"><span></span><span></span><span></span></div><div class="settings-preview-layout"><div>Arquivos<br>programa.alg</div><pre>inicio\n  escreval("Olá")\nfimalgoritmo</pre></div>'; preview.appendChild(chrome);
            }
            return preview;
        }
        function clearAllFiles() {
            if (!window.confirm('Apagar permanentemente todos os arquivos, pastas, itens fechados, lixeira e histórico de recuperação deste dispositivo? Esta ação não pode ser desfeita.')) return;
            if (!window.TabManager.clearAllFiles()) return;
            folders = []; assignments = {}; collapsedFolders = {}; closedFiles = []; trash = [];
            [FOLDERS_KEY, CLOSED_KEY, TRASH_KEY].forEach(function (key) { localStorage.removeItem(key); });
            renderFiles(); showEditor();
            document.dispatchEvent(new window.CustomEvent('visualg:status', { detail:{ text:'Todos os arquivos foram apagados', type:'success', at:Date.now() } }));
        }
        function renderCategory(entry) {
            sidebar.querySelectorAll('button').forEach(function (button) { button.classList.toggle('active', button.textContent === entry.title); });
            content.replaceChildren(); var title = document.createElement('h2'); title.textContent = entry.title; var intro = document.createElement('p'); intro.className = 'settings-category-description'; intro.textContent = entry.description; content.append(title, intro);
            var layout = document.createElement('div'); layout.className = 'settings-content-layout' + (entry.preview ? '' : ' settings-content-layout-no-preview'); var form = document.createElement('div'); form.className = 'settings-fields'; layout.appendChild(form);
            entry.fields.forEach(function (field) {
                var source = get(field[1]); if (!source) return;
                var group = document.createElement('label'); group.className = 'workspace-setting-group';
                var text = document.createElement('strong'); text.textContent = field[0];
                var help = document.createElement('small'); help.textContent = descriptions[field[1]] || '';
                var control = source.cloneNode(true); control.id = 'workspace-' + field[1]; control.value = source.value;
                var compactInterface = window.innerWidth <= 760 || (window.innerWidth <= 950 && window.innerHeight <= 500);
                if (field[1] === 'setting-word-wrap' && compactInterface) {
                    text.textContent += ' (sempre ativa em telas compactas)';
                    control.value = 'on';
                    control.disabled = true;
                }
                control.addEventListener(source.tagName === 'SELECT' ? 'change' : 'input', function () {
                    source.value = control.value; source.dispatchEvent(new window.Event(source.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true }));
                    updateFontLabels();
                }); group.append(text, help, control); form.append(group);
            });
            if (entry.preview) layout.appendChild(createPreview(entry.preview));
            content.appendChild(layout);
            if (entry.title === 'Arquivos') {
                var p = document.createElement('p'); p.textContent = 'Os arquivos são salvos automaticamente neste navegador. Nomes precisam ser únicos apenas dentro da mesma pasta; ao duplicar, o aplicativo cria nomes previsíveis como “programa (cópia 1).alg”.'; form.appendChild(p);
                var erase = document.createElement('button'); erase.type = 'button'; erase.className = 'settings-danger-action'; erase.textContent = 'Apagar todos os arquivos deste dispositivo'; erase.addEventListener('click', clearAllFiles); form.appendChild(erase);
                var eraseHelp = document.createElement('small'); eraseHelp.className = 'settings-action-help'; eraseHelp.textContent = 'Remove também pastas, lixeira e cópias de recuperação, sempre após uma confirmação explícita.'; form.appendChild(eraseHelp);
            }
            if (entry.title === 'Atalhos') {
                var shortcuts = [['run','Executar ou parar','F5 / F9'],['step','Passo a passo','F8'],['debug','Navegar na depuração','F10 / F11'],['save','Salvar arquivo','Ctrl + S'],['palette','Paleta de comandos','Ctrl + Shift + P'],['font','Ajustar fonte da área','Ctrl + + / − / 0 ou roda']];
                var shortcutList = document.createElement('div'); shortcutList.className = 'settings-shortcut-list';
                shortcuts.forEach(function (shortcut) { var row = document.createElement('label'); var checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.checked = localStorage.getItem('visualg-shortcut-' + shortcut[0]) !== 'off'; checkbox.addEventListener('change', function () { localStorage.setItem('visualg-shortcut-' + shortcut[0], checkbox.checked ? 'on' : 'off'); }); var name = document.createElement('span'); name.textContent = shortcut[1]; var keys = document.createElement('kbd'); keys.textContent = shortcut[2]; row.append(checkbox, name, keys); shortcutList.appendChild(row); });
                form.appendChild(shortcutList);
            }
            if (entry.title === 'Redefinir') {
                var resetIntro = document.createElement('p'); resetIntro.textContent = 'Redefinir preferências restaura os valores padrão. Seus arquivos e o histórico de recuperação permanecem salvos; para removê-los, use a seção Arquivos.'; form.appendChild(resetIntro);
                var resetActions = document.createElement('div'); resetActions.className = 'settings-reset-actions';
                var resetAll = document.createElement('button'); resetAll.type = 'button'; resetAll.className = 'settings-reset-all'; resetAll.textContent = 'Restaurar todas as configurações';
                resetAll.addEventListener('click', function () { resetConfiguration('Todas'); }); resetActions.appendChild(resetAll);
                ['Aparência', 'Editor', 'Variáveis', 'Console', 'Execução', 'Atalhos', 'Interface'].forEach(function (name) {
                    var resetItem = document.createElement('div'); resetItem.className = 'settings-reset-item';
                    var resetButton = document.createElement('button'); resetButton.type = 'button'; resetButton.textContent = 'Restaurar ' + name;
                    var resetHelp = document.createElement('small'); resetHelp.textContent = 'Restaura somente ' + name.toLocaleLowerCase('pt-BR') + ' e recarrega a interface.';
                    resetButton.addEventListener('click', function () { resetConfiguration(name); }); resetItem.append(resetButton, resetHelp); resetActions.appendChild(resetItem);
                });
                form.append(resetActions);
            }
        }
        categories.forEach(function (entry) { var button = document.createElement('button'); button.type = 'button'; button.textContent = entry.title; button.addEventListener('click', function () { renderCategory(entry); }); sidebar.append(button); });
        aux.append(sidebar, content); renderCategory(categories.find(function (entry) { return entry.title === category; }) || categories[0]);
    }

    function showExamples(initialQuery, targetId) {
        ensureViewTab('examples', 'Exemplos'); pushView({ type: 'examples' });
        aux.replaceChildren(); aux.className = 'workspace-aux-view workspace-examples';
        var heading = document.createElement('h2'); heading.textContent = 'Exemplos para aprender fazendo'; aux.appendChild(heading);
        var filter = document.createElement('input'); filter.type = 'search'; filter.placeholder = 'Pesquisar exemplos'; filter.setAttribute('aria-label', 'Pesquisar exemplos'); aux.appendChild(filter);
        filter.value = typeof initialQuery === 'string' ? initialQuery : '';
        var grid = document.createElement('div'); grid.className = 'workspace-examples-grid'; aux.appendChild(grid);
        function render() {
            var terms = normalizeDocSearch(filter.value).split(' ').filter(Boolean); grid.replaceChildren();
            (window.VisuAlgExamples || []).filter(function (example) { var searchable = normalizeDocSearch(example.title + ' ' + example.level + ' ' + example.description + ' ' + example.source); return terms.every(function (term) { return searchable.includes(term); }); }).forEach(function (example) {
                var card = document.createElement('article'); card.className = 'workspace-example-card' + (targetId === example.id ? ' doc-search-match' : '');
                card.dataset.exampleId = example.id;
                var title = document.createElement('h3'); title.textContent = example.title; card.appendChild(title);
                var level = document.createElement('small'); level.textContent = example.level; card.appendChild(level);
                var description = document.createElement('p'); description.textContent = example.description; card.appendChild(description);
                if (terms.length) {
                    var sourceLines = example.source.split('\n'); var bestLine = 0; var bestScore = -1;
                    sourceLines.forEach(function (line, index) { var normalizedLine = normalizeDocSearch(line); var score = terms.filter(function (term) { return normalizedLine.includes(term); }).length; if (score > bestScore) { bestScore = score; bestLine = index; } });
                    var firstLine = Math.max(0, bestLine - 2); var lastLine = Math.min(sourceLines.length, bestLine + 3);
                    var sourcePreview = document.createElement('pre'); sourcePreview.className = 'workspace-example-source'; sourcePreview.textContent = (firstLine ? '…\n' : '') + sourceLines.slice(firstLine, lastLine).join('\n') + (lastLine < sourceLines.length ? '\n…' : ''); card.appendChild(sourcePreview);
                }
                function action(label, run) { var button = document.createElement('button'); button.type = 'button'; button.textContent = label; button.addEventListener('click', function () { var tab = window.TabManager.createTab(example.source); if (!tab) return; showEditor(); if (run) get('btn-run').click(); }); card.appendChild(button); }
                action('Abrir código', false); action('Executar', true); grid.appendChild(card);
            });
            if (!grid.children.length) { var empty = document.createElement('p'); empty.className = 'docs-search-empty'; empty.textContent = 'Nenhum exemplo encontrado por título, descrição ou código.'; grid.appendChild(empty); }
            if (targetId) { var target = grid.querySelector('[data-example-id="' + targetId + '"]'); if (target) window.setTimeout(function () { target.scrollIntoView({ block:'center', behavior:'smooth' }); }, 0); targetId = null; }
        }
        filter.addEventListener('input', render); render();
    }

    function renderMessages() {
        var list = get('problems-list'); list.replaceChildren();
        get('right-sidebar').classList.toggle('messages-empty', messages.length === 0);
        if (!messages.length) {
            var empty = document.createElement('div'); empty.className = 'message-empty'; empty.textContent = 'Nenhuma mensagem';
            list.appendChild(empty);
        }
        messages.forEach(function (message) {
            var card = document.createElement(message.location ? 'button' : 'div');
            if (message.location) card.type = 'button';
            card.className = 'message-card ' + message.kind;
            var body = document.createElement('span'); body.textContent = message.text; card.appendChild(body);
            var time = document.createElement('small'); time.textContent = new Date(message.at).toLocaleTimeString('pt-BR'); card.appendChild(time);
            if (message.location) card.addEventListener('click', function () { navigateToLocation(message.tabId, message.location.line, message.location.column); });
            list.appendChild(card);
        });
    }
    function addMessage(kind, text, location, at, tabId) { var active = window.TabManager.getActiveTab(); messages.push({ kind: kind, text: text, location: location, at: at || Date.now(), tabId: tabId || (active && active.id) }); renderMessages(); }
    function correctionFor(message) {
        var lower = message.toLocaleLowerCase('pt-BR');
        if (lower.includes('não declarad') || lower.includes('nao declarad')) return 'Sugestão: declare a variável na seção Var antes de usá-la.';
        if (lower.includes('fimalgoritmo')) return 'Sugestão: verifique o encerramento do algoritmo com fimalgoritmo.';
        if (lower.includes('esperado') && lower.includes('encontrado')) return 'Sugestão: confira a palavra-chave e a pontuação na linha indicada.';
        return '';
    }

    function addResizable(handle, axis, property, owner, min, max) {
        var start, original;
        handle.addEventListener('pointerdown', function (event) {
            event.preventDefault(); start = axis === 'x' ? event.clientX : event.clientY;
            original = axis === 'x' ? owner.getBoundingClientRect().width : owner.getBoundingClientRect().height;
            if (handle.id === 'right-divider') {
                var sidebar = get('right-sidebar');
                document.documentElement.style.setProperty('--ide-message-height', (original / sidebar.clientHeight * 100) + '%');
                sidebar.classList.add('messages-resized');
            }
            if (axis === 'x') document.querySelector('.ide-shell').classList.add('is-resizing-columns');
            handle.setPointerCapture(event.pointerId); handle.classList.add('dragging');
        });
        handle.addEventListener('pointermove', function (event) {
            if (!handle.hasPointerCapture(event.pointerId)) return;
            if (axis === 'x' && handle.id === 'left-resizer' && event.clientX <= 8) {
                document.body.classList.add('sidebar-left-collapsed'); updatePanelButtons(); saveLayout(); return;
            }
            if (axis === 'x' && handle.id === 'right-resizer' && event.clientX >= window.innerWidth - 8) {
                document.body.classList.add('sidebar-right-collapsed'); updatePanelButtons(); saveLayout(); return;
            }
            var delta = (axis === 'x' ? event.clientX : event.clientY) - start;
            if (property === '--ide-right') delta = -delta;
            var next = Math.max(min, Math.min(max(), original + delta));
            document.documentElement.style.setProperty(property, property === '--ide-message-height' ? (next / owner.parentElement.getBoundingClientRect().height * 100) + '%' : next + 'px');
            if (window.VisualGEditor.instance) window.VisualGEditor.instance.refresh();
        });
        handle.addEventListener('pointerup', function () { handle.classList.remove('dragging'); document.querySelector('.ide-shell').classList.remove('is-resizing-columns'); saveLayout(); });
    }

    function addDebugVariablesResizer(handle) {
        var pointerId = null;
        var sidebar = get('right-sidebar');
        var minDebugHeight = 180;
        var minVariablesHeight = 140;
        handle.addEventListener('pointerdown', function (event) {
            if (event.button !== 0) return;
            event.preventDefault();
            pointerId = event.pointerId;
            handle.setPointerCapture(pointerId);
            sidebar.classList.add('is-resizing-panels');
            handle.classList.add('dragging');
            resize(event);
        });
        function resize(event) {
            var bounds = sidebar.getBoundingClientRect();
            var header = sidebar.querySelector('.debug-header');
            var divider = handle.getBoundingClientRect();
            var headerHeight = header ? header.getBoundingClientRect().height : 35;
            var dividerHeight = divider.height || 8;
            var maxDebugHeight = Math.max(minDebugHeight, bounds.height - headerHeight - dividerHeight - minVariablesHeight);
            var nextHeight = Math.max(minDebugHeight, Math.min(maxDebugHeight, event.clientY - bounds.top - headerHeight));
            document.documentElement.style.setProperty('--ide-debug-height', nextHeight + 'px');
            if (window.VisualGEditor.instance) window.VisualGEditor.instance.refresh();
        }
        handle.addEventListener('pointermove', function (event) {
            if (event.pointerId === pointerId) resize(event);
        });
        function finish(event) {
            if (event.pointerId !== pointerId) return;
            pointerId = null;
            handle.classList.remove('dragging');
            sidebar.classList.remove('is-resizing-panels');
            saveLayout();
        }
        handle.addEventListener('pointerup', finish);
        handle.addEventListener('pointercancel', finish);
    }

    function initPalette() {
        var commands = [
            ['Novo arquivo', function () { window.TabManager.createTab(); showEditor(); }],
            ['Enviar arquivo', function () { get('file-input').click(); }],
            ['Baixar arquivo', function () { get('btn-save').click(); }],
            ['Pesquisar arquivos', function () { get('workspace-file-search').focus(); }],
            ['Executar', function () { get('btn-run').click(); }],
            ['Passo a passo', function () { get('btn-step').click(); }],
            ['Parar', function () { get('btn-stop').click(); }],
            ['Console', showConsole],
            ['Documentação', function () { showDoc('sumario'); }],
            ['Exemplos', showExamples],
            ['Histórico', function () { get('btn-history').click(); }],
            ['Relatar um problema', openIssueTracker],
            ['Configurações', function () { get('btn-settings').click(); }]
        ];
        var input = get('command-input'); var results = get('command-results');
        function render() {
            var query = input.value.trim().toLocaleLowerCase('pt-BR'); results.replaceChildren();
            commands.filter(function (entry) { return !query || entry[0].toLocaleLowerCase('pt-BR').includes(query); }).forEach(function (entry) {
                var button = document.createElement('button'); button.type = 'button'; button.textContent = entry[0];
                button.addEventListener('click', function () { entry[1](); results.classList.add('hidden'); input.value = ''; }); results.appendChild(button);
            });
            results.classList.toggle('hidden', !results.children.length);
        }
        input.addEventListener('focus', render); input.addEventListener('input', render);
        input.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') { results.classList.add('hidden'); input.blur(); }
            if (event.key === 'Enter') { event.preventDefault(); var first = results.querySelector('button'); if (first) first.click(); }
        });
        document.addEventListener('click', function (event) { if (!event.target.closest('.command-bar')) results.classList.add('hidden'); });
        document.addEventListener('keydown', function (event) { if (shortcutEnabled('palette') && event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'p') { event.preventDefault(); input.focus(); input.select(); } });
    }

    function openThemeMenu() {
        var existing = get('workspace-theme-menu');
        if (existing) { existing.remove(); get('btn-scale').setAttribute('aria-pressed', 'false'); return; }
        var menu = document.createElement('div'); menu.id = 'workspace-theme-menu'; menu.className = 'workspace-theme-menu';
        var current = document.documentElement.getAttribute('data-theme') || 'dark';
        var currentMode = document.documentElement.dataset.colorMode;
        function previewTheme(id, mode) {
            document.documentElement.setAttribute('data-theme', id);
            document.documentElement.dataset.colorMode = mode;
            window.VisualGEditor.instance.refresh();
        }
        var lightThemeIds = ['light', 'github-light', 'solarized-light', 'high-contrast', 'catppuccin-latte', 'gruvbox-light', 'paper', 'visualg-classic', 'visualg-3', 'visualg-agua', 'visualg-metal', 'visualg-notas', 'visualg-aluminio', 'visualg-madeira', 'visualg-plastico'];
        [['Escuros', ['dark', 'dracula', 'nord', 'dark-monokai', 'github-dark', 'one-dark', 'solarized-dark', 'high-contrast-dark', 'catppuccin-mocha', 'rose-pine', 'gruvbox-dark']], ['Claros', ['light', 'github-light', 'solarized-light', 'high-contrast', 'catppuccin-latte', 'gruvbox-light', 'paper']], ['Clássicos', ['visualg-classic', 'visualg-3', 'visualg-agua', 'visualg-metal', 'visualg-notas', 'visualg-aluminio', 'visualg-madeira', 'visualg-plastico']]].forEach(function (group) {
            var subgroup = document.createElement('div'); subgroup.className = 'theme-subgroup';
            var title = document.createElement('span'); title.className = 'theme-group-title'; title.textContent = group[0]; subgroup.appendChild(title);
            group[1].forEach(function (id) {
                var option = get('setting-theme').querySelector('option[value="' + id + '"]');
                var button = document.createElement('button'); button.type = 'button'; button.textContent = option ? option.textContent.replace(/ \(.+\)$/, '') : id;
                if (id === current) button.classList.add('selected');
                button.addEventListener('mouseenter', function () { previewTheme(id, lightThemeIds.includes(id) ? 'light' : 'dark'); });
                button.addEventListener('click', function () {
                    var select = get('setting-theme');
                    current = id;
                    currentMode = lightThemeIds.includes(id) ? 'light' : 'dark';
                    select.value = id;
                    select.dispatchEvent(new window.Event('change', { bubbles: true }));
                    menu.remove();
                    get('btn-scale').setAttribute('aria-pressed', 'false');
                    document.removeEventListener('pointerdown', dismiss);
                });
                subgroup.appendChild(button);
            });
            menu.appendChild(subgroup);
        });
        menu.addEventListener('mouseleave', function () { previewTheme(current, currentMode); });
        document.body.appendChild(menu);
        get('btn-scale').setAttribute('aria-pressed', 'true');
        function dismiss(event) {
            if (menu.contains(event.target) || event.target.closest('#btn-scale')) return;
            previewTheme(get('setting-theme').value, currentMode);
            menu.remove(); get('btn-scale').setAttribute('aria-pressed', 'false'); document.removeEventListener('pointerdown', dismiss);
        }
        document.addEventListener('pointerdown', dismiss);
    }

    function initEditorSpacing() {
        var migrationKey = 'visualg-editor-spacing-relative-v1';
        if (!localStorage.getItem(migrationKey)) {
            var previousFontSize = Number(get('setting-font-size').value) || 14;
            ['visualg-editor-letter-spacing', 'visualg-editor-line-spacing'].forEach(function (key) {
                var oldValue = localStorage.getItem(key);
                if (oldValue !== null && Number.isFinite(Number(oldValue))) localStorage.setItem(key, String(Math.round(Number(oldValue) * 14 / previousFontSize * 100) / 100));
            });
            localStorage.setItem(migrationKey, 'true');
        }
        [['setting-letter-spacing', 'visualg-editor-letter-spacing', '--ide-editor-letter-spacing', -1, 10, 0.25], ['setting-line-spacing', 'visualg-editor-line-spacing', '--ide-editor-line-height', 18, 80, 27]].forEach(function (setting) {
            var field = get(setting[0]); var saved = localStorage.getItem(setting[1]);
            field.value = saved !== null ? saved : String(setting[5]);
            function apply() {
                var value = Number(field.value); if (!Number.isFinite(value) || value < setting[3] || value > setting[4]) return;
                var fontSize = Number(get('setting-font-size').value) || 14;
                document.documentElement.style.setProperty(setting[2], (Math.round(value * fontSize / 14 * 100) / 100) + 'px');
                window.VisualGEditor.instance.refresh();
            }
            field.addEventListener('input', function () { localStorage.setItem(setting[1], field.value); apply(); });
            document.addEventListener('visualg:editor-font-size', apply);
            apply();
        });
    }

    function updateFontLabels() {
        var editorLabel = get('editor-font-value');
        var consoleLabel = get('console-font-value');
        if (editorLabel) editorLabel.textContent = get('setting-font-size').value + 'px';
        if (consoleLabel) consoleLabel.textContent = get('setting-console-font-size').value + 'px';
    }
    function changeAreaFont(area, action) {
        var field = get(area === 'console' ? 'setting-console-font-size' : 'setting-font-size');
        var current = Number(field.value) || (area === 'console' ? 13 : 14);
        var next = action === 'reset' ? (area === 'console' ? 13 : 14) : Math.max(10, Math.min(40, current + action));
        field.value = String(next); field.dispatchEvent(new window.Event('input', { bubbles: true })); updateFontLabels();
        var proxy = get('workspace-' + field.id); if (proxy) proxy.value = field.value;
    }
    function initFontControls() {
        [['console', 'console-font-decrease', -1], ['console', 'console-font-increase', 1]].forEach(function (item) {
            get(item[1]).addEventListener('click', function () { changeAreaFont(item[0], item[2]); });
        });
        ['setting-font-size', 'setting-console-font-size'].forEach(function (id) { get(id).addEventListener('input', updateFontLabels); });
        document.addEventListener('visualg:editor-font-size', updateFontLabels);
        document.addEventListener('visualg:console-font-size', updateFontLabels);
        updateFontLabels();
        document.addEventListener('keydown', function (event) {
            if (!shortcutEnabled('font')) return;
            if (!(event.ctrlKey || event.metaKey) || event.altKey || (event.shiftKey && event.key !== '+')) return;
            var target = event.target;
            var area = target.closest('#terminalPanel, .console-dialog') ? 'console' : target.closest('#editorPanel, .CodeMirror') ? 'editor' : view.type === 'console' ? 'console' : view.type === 'editor' ? 'editor' : null;
            if (!area) return;
            var action = (event.key === '+' || event.key === '=' || event.key === 'Add') ? 1 : (event.key === '-' || event.key === 'Subtract') ? -1 : event.key === '0' ? 'reset' : null;
            if (action === null) return;
            event.preventDefault(); changeAreaFont(area, action);
        }, true);
        [get('editorPanel'), get('terminalPanel')].forEach(function (element, index) {
            element.addEventListener('wheel', function (event) {
                if (!shortcutEnabled('font')) return;
                if (!(event.ctrlKey || event.metaKey)) return;
                event.preventDefault(); changeAreaFont(index === 0 ? 'editor' : 'console', event.deltaY < 0 ? 1 : -1);
            }, { passive: false });
        });
    }

    function initSidebarActionOverflow() {
        var toolbar = document.querySelector('.sidebar-actions');
        var trigger = get('sidebar-actions-more');
        var menu = get('sidebar-actions-menu');
        var actions = ['btn-upload-workspace', 'btn-download-workspace', 'btn-new-workspace-file', 'btn-new-workspace-folder', 'btn-duplicate-workspace'].map(get);
        if (!toolbar || !trigger || !menu) return;

        function closeMenu() { menu.hidden = true; trigger.setAttribute('aria-expanded', 'false'); }
        function positionMenu() {
            if (menu.hidden) return;
            var toolbarRect = toolbar.getBoundingClientRect();
            var triggerRect = trigger.getBoundingClientRect();
            var width = Math.min(240, Math.max(160, toolbarRect.width - 12), window.innerWidth - 16);
            var left = Math.min(Math.max(8, toolbarRect.left + 6), window.innerWidth - width - 8);
            var top = Math.min(triggerRect.bottom + 4, window.innerHeight - Math.min(menu.offsetHeight, window.innerHeight - 16) - 8);
            menu.style.width = width + 'px';
            menu.style.left = Math.max(8, left) + 'px';
            menu.style.top = Math.max(8, top) + 'px';
        }
        function update() {
            var styles = window.getComputedStyle(toolbar);
            var gap = parseFloat(styles.columnGap) || 0;
            var available = toolbar.clientWidth - (parseFloat(styles.paddingLeft) || 0) - (parseFloat(styles.paddingRight) || 0);
            var actionWidth = actions[0].getBoundingClientRect().width || 24;
            var moreWidth = trigger.getBoundingClientRect().width || 24;
            var fullWidth = actions.length * actionWidth + Math.max(0, actions.length - 1) * gap;
            var visibleCount = actions.length;
            if (fullWidth > available) {
                visibleCount = 0;
                for (var count = actions.length - 1; count >= 0; count--) {
                    var needed = count * actionWidth + count * gap + moreWidth;
                    if (needed <= available) { visibleCount = count; break; }
                }
            }
            actions.forEach(function (action, index) { action.hidden = index >= visibleCount; });
            trigger.hidden = visibleCount === actions.length;
            menu.replaceChildren();
            if (visibleCount < actions.length) {
                var heading = document.createElement('div');
                heading.className = 'sidebar-actions-menu-heading';
                heading.setAttribute('role', 'presentation');
                heading.textContent = 'Ações rápidas';
                menu.appendChild(heading);
            }
            actions.slice(visibleCount).forEach(function (action) {
                var item = document.createElement('button');
                item.type = 'button'; item.setAttribute('role', 'menuitem');
                var actionIcon = action.querySelector('[data-lucide]');
                if (actionIcon) item.appendChild(actionIcon.cloneNode(true));
                var label = document.createElement('span'); label.textContent = action.getAttribute('aria-label') || action.title;
                item.appendChild(label);
                item.addEventListener('click', function () { closeMenu(); action.click(); });
                menu.appendChild(item);
            });
            refreshIcons(menu);
            if (visibleCount === actions.length) closeMenu();
            else positionMenu();
        }
        refreshSidebarActionOverflow = update;

        // The sidebar and file list clip descendants with overflow:auto/hidden.
        // Portal the popover to body so it can overlay the search and file rows.
        document.body.appendChild(menu);
        trigger.addEventListener('click', function (event) {
            event.stopPropagation();
            menu.hidden = !menu.hidden;
            trigger.setAttribute('aria-expanded', String(!menu.hidden));
            positionMenu();
        });
        menu.addEventListener('click', function (event) { event.stopPropagation(); });
        document.addEventListener('click', function () { closeMenu(); });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && !menu.hidden) { closeMenu(); trigger.focus(); }
        });
        window.addEventListener('resize', positionMenu);
        window.addEventListener('scroll', positionMenu, true);
        if (window.ResizeObserver) new window.ResizeObserver(update).observe(toolbar);
        else window.addEventListener('resize', update);
        update();
        refreshIcons(toolbar);
    }

    function init() {
        editor = document.querySelector('.editor-column'); aux = get('workspace-aux-view'); terminal = get('terminalPanel'); editor.appendChild(terminal);
        var savedFolders = readJson(FOLDERS_KEY, {}); folders = savedFolders.folders || []; assignments = savedFolders.assignments || {}; collapsedFolders = savedFolders.collapsed || {};
        closedFiles = readJson(CLOSED_KEY, []).filter(function (item) { return item && typeof item.code === 'string' && item.id; });
        seedReferenceWorkspace();
        trash = readJson(TRASH_KEY, []).filter(function (item) { return Date.now() - item.at < 30 * 86400000; }); saveTrash();
        var layout = readJson(LAYOUT_KEY, {});
        if (layout.right && Number.isFinite(parseFloat(layout.right)) && parseFloat(layout.right) < 300) layout.right = '300px';
        ['left', 'right', 'debug', 'messages'].forEach(function (name) {
            if (!layout[name]) return;
            if (name === 'messages' && /%$/.test(layout[name]) && parseFloat(layout[name]) > 30) layout[name] = '22%';
            document.documentElement.style.setProperty('--ide-' + (name === 'messages' ? 'message-height' : name === 'debug' ? 'debug-height' : name), layout[name]);
        });
        document.body.classList.toggle('sidebar-left-collapsed', !!layout.leftHidden);
        document.body.classList.toggle('sidebar-right-collapsed', !!layout.rightHidden);
        updatePanelButtons();
        new MutationObserver(renderFiles).observe(get('tab-list'), { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
        renderFiles(); renderDocs(); indexDocs(); updateHistoryButtons(); renderDebugBreakpoints(); renderMessages(); initPalette(); initEditorSpacing(); initFontControls(); initSidebarActionOverflow();
        get('btn-report-bug').addEventListener('click', openIssueTracker);
        get('mobile-report-bug').addEventListener('click', function () { get('mobile-menu').classList.remove('open'); openIssueTracker(); });
        get('right-sidebar').classList.toggle('messages-resized', !!layout.messagesResized);
        var presentation = get('setting-console-presentation'); presentation.value = localStorage.getItem('visualg-console-presentation') || 'modal';
        presentation.addEventListener('change', function () { localStorage.setItem('visualg-console-presentation', presentation.value); closeConsoleDialog(); if (consolePanelOpen) { consolePanelOpen = false; editor.classList.remove('console-panel-visible'); } updateConsoleButton(); });
        new MutationObserver(syncConsoleWindow).observe(get('terminal-output'), { childList: true, subtree: true, characterData: true });
        new MutationObserver(syncConsoleWindow).observe(get('terminal-input-area'), { attributes: true, attributeFilter: ['class'] });
        new MutationObserver(syncConsoleWindow).observe(get('consoleInputOverlay'), { attributes: true, attributeFilter: ['class'] });
        new MutationObserver(syncConsoleWindow).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        get('setting-console-font-size').addEventListener('input', syncConsoleWindow);
        document.addEventListener('visualg:font-family-changed', function (event) { if (event.detail.area === 'console') syncConsoleWindow(); });
        window.addEventListener('message', function (event) {
            if (event.origin !== window.location.origin || event.source !== consoleWindow || !event.data) return;
            if (event.data.type === 'visualg-console-ready') syncConsoleWindow();
            if (event.data.type === 'visualg-console-input') {
                if (!get('consoleInputOverlay').classList.contains('hidden')) { get('console-input-modal').value = event.data.value; get('console-input-modal-ok').click(); }
                else { get('terminal-input').value = event.data.value; get('terminal-input-ok').click(); }
            }
            if (event.data.type === 'visualg-console-stop') get('btn-stop').click();
            if (event.data.type === 'visualg-console-editor') showEditor();
        });
        get('workspace-file-search').addEventListener('input', renderFiles);
        get('docs-search').addEventListener('input', renderDocs);
        get('btn-sidebar-files').addEventListener('click', function () { setSidebarTab('files'); });
        get('btn-sidebar-docs').addEventListener('click', function () { setSidebarTab('docs'); });
        document.querySelector('.sidebar-tabs').addEventListener('keydown', function (event) {
            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
            event.preventDefault();
            var next = event.target.id === 'btn-sidebar-files' ? 'btn-sidebar-docs' : 'btn-sidebar-files';
            get(next).focus(); get(next).click();
        });
        get('btn-upload-workspace').addEventListener('click', function () { get('file-input').click(); });
        get('btn-download-workspace').addEventListener('click', function () { get('btn-save').click(); });
        get('btn-new-workspace-file').addEventListener('click', function () { window.TabManager.createTab(); showEditor(); });
        get('btn-new-workspace-folder').addEventListener('click', function () { var name = window.prompt('Nome da nova pasta'); if (name && name.trim()) { folders.push({ id: 'folder-' + Date.now(), name: name.trim() }); saveFolders(); renderFiles(); } });
        get('btn-duplicate-workspace').addEventListener('click', function () { var tab = window.TabManager.getActiveTab(); if (tab) { duplicateFile(tab); showEditor(); } else { window.TabManager.createTab(); showEditor(); } });
        get('btn-docs-sidebar').addEventListener('click', function () { showDoc('sumario'); });
        get('btn-examples-sidebar').addEventListener('click', showExamples);
        initTabOverview();
        get('debug-run').addEventListener('click', function () {
            if (get('debug-run').dataset.running === 'true') get('btn-stop').click();
            else get('btn-run').click();
        });
        get('debug-more').addEventListener('click', function (event) { event.stopPropagation(); get('debug-menu').classList.toggle('hidden'); });
        document.addEventListener('click', function (event) { if (!event.target.closest('#debug-menu') && !event.target.closest('#debug-more')) get('debug-menu').classList.add('hidden'); });
        get('btn-clear-problems').addEventListener('click', function () { messages = []; renderMessages(); get('debug-menu').classList.add('hidden'); });
        get('btn-open-console').addEventListener('click', showConsole);
        get('btn-toggle-breakpoints').addEventListener('click', function () { get('debug-menu').classList.add('hidden'); showEditor(); var cm = window.VisualGEditor.instance; toggleBreakpoint(cm, cm.getCursor().line); cm.focus(); });
        get('btn-clear-breakpoints').addEventListener('click', function () {
            var cm = window.VisualGEditor.instance;
            getCurrentBreakpoints().forEach(function (line) { cm.setGutterMarker(line - 1, 'breakpoints', null); });
            var tab = window.TabManager.getActiveTab(); if (tab) breakpoints[tab.id] = new Set();
            renderDebugBreakpoints(); get('debug-menu').classList.add('hidden');
        });
        get('btn-show-console').addEventListener('click', toggleConsole);
        get('btn-home').addEventListener('click', showEditor);
        get('mobile-files').addEventListener('click', function () { var shell = document.querySelector('.ide-shell'); shell.classList.remove('mobile-debug'); shell.classList.add('mobile-files'); get('mobile-menu').classList.remove('open'); });
        get('mobile-editor').addEventListener('click', function () { showEditor(); get('mobile-menu').classList.remove('open'); });
        get('mobile-debug').addEventListener('click', function () { var shell = document.querySelector('.ide-shell'); shell.classList.remove('mobile-files'); shell.classList.add('mobile-debug'); get('mobile-menu').classList.remove('open'); });
        get('mobile-nav-back').addEventListener('click', function () { get('mobile-menu').classList.remove('open'); get('btn-nav-back').click(); });
        get('mobile-nav-forward').addEventListener('click', function () { get('mobile-menu').classList.remove('open'); get('btn-nav-forward').click(); });
        get('btn-toggle-left').addEventListener('click', function () { document.body.classList.toggle('sidebar-left-collapsed'); updatePanelButtons(); saveLayout(); window.requestAnimationFrame(function () { window.VisualGEditor.instance.refresh(); }); });
        get('btn-toggle-right').addEventListener('click', function () { document.body.classList.toggle('sidebar-right-collapsed'); updatePanelButtons(); saveLayout(); window.requestAnimationFrame(function () { window.VisualGEditor.instance.refresh(); }); });
        initEdgeDragRestore();
        get('btn-empty-docs').addEventListener('click', function () { showDoc('sumario'); });
        get('btn-scale').addEventListener('click', openThemeMenu);
        get('btn-nav-back').addEventListener('click', function () { if (historyPosition > 0) { historyPosition--; restoreHistoricalView(); } });
        get('btn-nav-forward').addEventListener('click', function () { if (historyPosition < viewHistory.length - 1) { historyPosition++; restoreHistoricalView(); } });
        document.querySelector('.tab-bar').addEventListener('keydown', function (event) {
            if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key) || event.target.closest('.tab-close,.view-tab-close')) return;
            var current = event.target.closest('[role="tab"]'); if (!current) return;
            var tabs = Array.from(document.querySelectorAll('.tab-bar [role="tab"]'));
            var index = tabs.indexOf(current); if (index < 0) return;
            event.preventDefault(); event.stopPropagation();
            index = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
            tabs[index].focus();
        }, true);
        get('tab-list').addEventListener('click', function (event) {
            if (event.target.closest('.tab-close,.view-tab-close')) return;
            if (event.target.closest('.tab-item')) window.setTimeout(showEditor, 0);
        });
        get('tab-list').addEventListener('contextmenu', function (event) {
            var item = event.target.closest('.tab-item'); if (!item) return;
            event.preventDefault(); var tab = window.TabManager.getTabs().find(function (entry) { return entry.id === item.dataset.tabId; });
            if (tab) openFileMenu(event, tab);
        });
        get('editorPanel').addEventListener('contextmenu', function (event) {
            if (!event.target.closest('.CodeMirror')) return;
            event.preventDefault(); openEditorQuickMenu(event);
        });
        addResizable(get('left-resizer'), 'x', '--ide-left', get('workspace-sidebar'), 180, function () { return Math.min(460, window.innerWidth * .33); });
        addResizable(get('right-resizer'), 'x', '--ide-right', get('right-sidebar'), 300, function () { return Math.min(540, window.innerWidth * .4); });
        addDebugVariablesResizer(get('debug-divider'));
        document.addEventListener('visualg:execution-start', function (event) {
            setDebugRunAction(true);
            messages = []; renderMessages(); renderDebugBreakpoints();
            document.body.classList.toggle('debug-session-active', !!(event.detail && event.detail.debug));
            if (event.detail && event.detail.debug) get('debug-session-controls').classList.remove('hidden');
            renderDebugCallStack([], false);
            if (event.detail && event.detail.debug) showEditor(); else showConsole();
        });
        document.addEventListener('visualg:execution-end', function () {
            setDebugRunAction(false);
            document.body.classList.remove('debug-session-active');
            get('debug-session-controls').classList.add('hidden');
            renderDebugCallStack([], false);
            renderFiles();
        });
        document.addEventListener('visualg:running', function () { renderFiles(); if (window.TabManager.refresh) window.TabManager.refresh(); });
        document.addEventListener('visualg:status', function (event) {
            var text = event.detail.text || '';
            var state = get('debug-status-state');
            state.classList.remove('is-ready', 'is-running', 'is-paused', 'is-error', 'is-finished');
            if (/^Pausado/.test(text)) state.classList.add('is-paused');
            else if (text === 'Executando...' || text === 'Passo a passo...') state.classList.add('is-running');
            else if (text === 'Erro') state.classList.add('is-error');
            else if (text === 'Finalizado' || text === 'Execução finalizada' || text === 'Execução interrompida') state.classList.add('is-finished');
            else state.classList.add('is-ready');
            if (/^Pausado/.test(text)) { get('debug-status').textContent = text; }
            else if (text === 'Executando...' || text === 'Passo a passo...') get('debug-status').textContent = 'Executando';
            else if (text === 'Erro') get('debug-status').textContent = 'Erro';
            else if (text === 'Finalizado' || text === 'Execução finalizada') get('debug-status').textContent = 'Finalizado';
            else if (text === 'Pronto') get('debug-status').textContent = 'Pronto';
            else if (text === 'Execução interrompida') get('debug-status').textContent = 'Finalizado';
        });
        document.addEventListener('visualg:debug-paused', function (event) { renderDebugCallStack(event.detail.callStack, true); showEditor(); });
        document.addEventListener('visualg:diagnostic', function (event) { var suggestion = correctionFor(event.detail.message); addMessage('error', 'ERRO: ' + event.detail.message + (suggestion ? '\n' + suggestion : ''), event.detail.location, event.detail.at, event.detail.tabId); });
        document.addEventListener('visualg:status', function (event) {
            var status = event.detail; if (status.text === 'Finalizado' || status.text === 'Execução finalizada') addMessage('success', 'Execução finalizada.', null, status.at);
            if (status.text === 'Execução interrompida') addMessage('warning', 'Execução interrompida.', null, status.at);
        });
        document.addEventListener('visualg:breakpoint', function (event) {
            addMessage('warning', 'Pausado no ponto de parada: linha ' + event.detail.line + '.', { line: event.detail.line, column: 1 });
        });
        document.addEventListener('visualg:tab-switched', function (event) { redrawBreakpoints(event.detail.id); renderDebugBreakpoints(); showEditor(); animateEditorForFileSwitch(); });
        document.addEventListener('visualg:file-closed', function (event) {
            var tab = event.detail;
            if (deletingFiles.has(tab.id)) {
                deletingFiles.delete(tab.id);
                trash.unshift({ code: tab.code, fileName: fileName(tab), folderId: assignments[tab.id] || null, at: Date.now() });
                trash = trash.slice(0, 30); saveTrash(); delete assignments[tab.id]; saveFolders();
            } else {
                closedFiles = closedFiles.filter(function (item) { return item.id !== tab.id; });
                closedFiles.push({ id: tab.id, name: tab.name, fileName: tab.fileName, code: tab.code, closed: true }); saveClosed();
            }
            renderFiles();
        });
        get('btn-history').addEventListener('click', function () {
            showTrashInRecovery();
            document.dispatchEvent(new window.Event('visualg:open-recovery'));
        });
        window.VisualGEditor.instance.on('gutterClick', toggleBreakpoint);
        window.VisualGEditor.instance.setOption('gutters', ['CodeMirror-linenumbers', 'debug-current', 'breakpoints']);
        window.VisualGEditor.instance.on('change', function () { if (messages.some(function (item) { return item.kind === 'error'; })) { messages = []; renderMessages(); window.VisualGEditor.clearHighlight(); } });
        window.VisualGWorkspace = { showEditor: showEditor, showConsole: showConsole, toggleConsole: toggleConsole, showDoc: showDoc, showExamples: showExamples, showSettings: showSettings, toggleSettings: toggleSettings, openThemeMenu: openThemeMenu, getBreakpoints: getCurrentBreakpoints, uniqueFileName: uniqueFileName, navigateToLocation: navigateToLocation };
        refreshIcons(document.querySelector('.ide-shell'));
    }

    function showTrashInRecovery() {
        var overlay = get('recoveryOverlay'); var modal = overlay && overlay.querySelector('.modal-body'); if (!modal) return;
        var old = get('workspace-trash'); if (old) old.remove();
        var section = document.createElement('section'); section.id = 'workspace-trash';
        var heading = document.createElement('h3'); heading.textContent = 'Arquivos removidos (30 dias)'; section.appendChild(heading);
        trash.forEach(function (item, index) {
            var row = document.createElement('button'); row.type = 'button'; row.textContent = 'Restaurar ' + item.fileName + ' · ' + new Date(item.at).toLocaleDateString('pt-BR');
            row.addEventListener('click', function () { var restoredName = uniqueFileName(item.fileName, null, item.folderId || null); var restored = window.TabManager.createTab(item.code, { fileName: restoredName }); if (restored && item.folderId) assignments[restored.id] = item.folderId; trash.splice(index, 1); saveTrash(); saveFolders(); renderFiles(); overlay.dispatchEvent(new window.Event('visualg:close-recovery')); showEditor(); }); section.appendChild(row);
        });
        var versionsHeading = document.createElement('h3'); versionsHeading.textContent = 'Versões anteriores das abas (30 dias)'; section.appendChild(versionsHeading);
        window.TabManager.getVersionHistory().forEach(function (version) {
            var row = document.createElement('button'); row.type = 'button'; row.textContent = 'Restaurar versão de ' + new Date(version.updatedAt).toLocaleString('pt-BR') + ' · ' + version.tabCount + ' aba(s)';
            row.addEventListener('click', function () { if (window.TabManager.restoreVersion(version.index)) { overlay.dispatchEvent(new window.Event('visualg:close-recovery')); renderFiles(); showEditor(); } }); section.appendChild(row);
        });
        modal.appendChild(section);
    }

    document.addEventListener('DOMContentLoaded', function () { window.setTimeout(init, 0); });
})();
