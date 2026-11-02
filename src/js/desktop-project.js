(function () {
    'use strict';

    var api = window.visualgDesktopProject;
    var opened = false;
    var rootName = '';
    var selectedDirectory = '';
    var folders = new Map();
    var expanded = new Set(['']);
    var boundTabs = new Map();
    var selectedPaths = new Set();
    var contentSearchTimer = 0;
    var contentSearchSequence = 0;
    var contentSearchQuery = '';
    var contentSearchResults = null;

    function get(id) { return document.getElementById(id); }
    function icon(name) { var element = document.createElement('i'); element.setAttribute('data-lucide', name); return element; }
    function refresh() { if (window.VisualGWorkspace && window.VisualGWorkspace.refreshFiles) window.VisualGWorkspace.refreshFiles(); }
    function notice(message, type) {
        document.dispatchEvent(new window.CustomEvent('visualg:status', { detail:{ text:message, type:type || 'success', at:Date.now() } }));
    }
    function errorMessage(error) { return error && error.message ? error.message : String(error); }
    async function perform(action) {
        try { return await action(); }
        catch (error) { window.alert(errorMessage(error)); notice(errorMessage(error), 'error'); return null; }
    }
    function hasUnsavedFiles() {
        return window.TabManager.getTabs().some(function (tab) { return boundTabs.has(tab.id) && tab.dirty; });
    }
    function updateToolbar() {
        get('desktop-project-toolbar').hidden = !api;
        if (!api) return;
        get('btn-open-directory-label').textContent = opened ? 'Outra pasta' : 'Abrir pasta';
        var label = get('desktop-project-label'); label.hidden = !opened; label.textContent = rootName;
        get('btn-project-git').hidden = !opened;
        get('btn-close-directory').hidden = !opened;
        get('workspace-file-search').placeholder = opened ? 'Pesquisar itens carregados' : '';
    }
    async function load(relative) {
        var result = await api.list(relative);
        folders.set(relative, result.entries);
        if (result.truncated) notice('A pasta tem mais de 5.000 itens; apenas os primeiros são exibidos.', 'warning');
    }
    async function choose() {
        if (opened && hasUnsavedFiles() && !window.confirm('Há alterações não salvas no disco. Abrir outra pasta e manter essas abas como cópias locais?')) return;
        var result = await api.choose();
        if (!result) return;
        opened = true; rootName = result.name; selectedDirectory = '';
        boundTabs.clear(); folders.clear(); expanded = new Set(['']); contentSearchQuery = ''; contentSearchResults = null;
        await load(''); updateToolbar(); refresh(); notice('Pasta aberta: ' + rootName);
    }
    async function close() {
        if (hasUnsavedFiles() && !window.confirm('Há alterações não salvas no disco. Fechar a pasta e manter essas abas como cópias locais?')) return;
        await api.close(); opened = false; rootName = ''; selectedDirectory = '';
        boundTabs.clear(); folders.clear(); expanded = new Set(['']); contentSearchQuery = ''; contentSearchResults = null;
        updateToolbar(); refresh(); notice('Pasta fechada. Os arquivos locais continuam disponíveis.');
    }
    async function reload(relative) {
        contentSearchQuery = '';
        await load(relative); refresh();
    }
    function parentOf(relative) { return relative.includes('/') ? relative.slice(0, relative.lastIndexOf('/')) : ''; }
    function fileName(relative) { return relative.slice(relative.lastIndexOf('/') + 1); }
    function existingTab(relative) {
        var id = null;
        boundTabs.forEach(function (binding, tabId) { if (binding.path === relative) id = tabId; });
        return id ? window.TabManager.getTabs().find(function (tab) { return tab.id === id; }) : null;
    }
    async function openFile(relative) {
        var data = await api.read(relative);
        var existing = existingTab(relative);
        if (existing) {
            var binding = boundTabs.get(existing.id);
            if (binding.revision !== data.revision) {
                if (existing.dirty) throw new Error('O arquivo mudou no disco e a aba contém alterações. Salve uma cópia antes de recarregar.');
                if (window.TabManager.getActiveTab()?.id === existing.id) window.VisualGEditor.setValue(data.content);
                existing.code = data.content; binding.revision = data.revision;
                window.TabManager.saveWorkspace();
            }
            window.TabManager.switchTab(existing.id);
        } else {
            var id = 'tab-' + (window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : Date.now().toString(36));
            var tab = window.TabManager.createTab(data.content, { id:id, fileName:fileName(relative), used:true, forceNew:true });
            if (!tab) return;
            boundTabs.set(tab.id, { path:relative, revision:data.revision });
            window.TabManager.markActiveClean();
        }
        selectedDirectory = parentOf(relative);
        refresh();
        if (window.VisualGWorkspace) window.VisualGWorkspace.showEditor();
        notice('Arquivo aberto: ' + relative);
    }
    async function openSearchResult(result) {
        await openFile(result.path);
        if (window.VisualGWorkspace) window.VisualGWorkspace.showEditor();
        window.VisualGEditor.revealLocation(result.line, 1);
    }
    async function moveProjectPaths(paths, parent) {
        if (window.TabManager.getRunningTab()) throw new Error('Interrompa a execução antes de mover arquivos.');
        await api.list(parent);
        var failure = null;
        try {
            for (var i = 0; i < paths.length; i++) {
                var oldPath = paths[i]; var moved = await api.move(oldPath, parent);
                boundTabs.forEach(function (binding) { if (binding.path === oldPath) binding.path = moved.path; });
            }
        } catch (error) { failure = error; }
        selectedPaths.clear(); folders.clear(); expanded = new Set(['']); selectedDirectory = parent;
        await load(''); refresh();
        if (failure) throw failure;
        notice(paths.length + (paths.length === 1 ? ' arquivo movido.' : ' arquivos movidos.'));
    }
    async function deleteSelectedProjectFiles() {
        var paths = Array.from(selectedPaths);
        if (!paths.length) return;
        var dirty = paths.some(function (path) { var tab = existingTab(path); return !!(tab && tab.dirty); });
        if (!window.confirm('Excluir ' + paths.length + (paths.length === 1 ? ' arquivo selecionado?' : ' arquivos selecionados?') + (dirty ? ' Alterações não salvas continuarão disponíveis como cópias locais.' : ''))) return;
        selectedPaths.clear();
        var failure = null;
        try {
            for (var i = 0; i < paths.length; i++) {
                var tab = existingTab(paths[i]);
                await api.remove(paths[i]);
                if (tab) { boundTabs.delete(tab.id); window.TabManager.closeTab(tab.id); }
            }
        } catch (error) { failure = error; }
        folders.clear(); expanded = new Set(['']); await load(''); refresh();
        if (failure) throw failure;
        notice('Arquivos excluídos.');
    }
    async function renameSelectedProjectFiles() {
        var paths = Array.from(selectedPaths);
        if (!paths.length) return;
        var base = window.prompt('Novo nome base (os arquivos selecionados serão numerados)');
        if (base === null || !base.trim()) return;
        if (window.TabManager.getRunningTab()) throw new Error('Interrompa a execução antes de renomear arquivos.');
        var failure = null;
        try {
            for (var i = 0; i < paths.length; i++) {
                var oldPath = paths[i]; var extension = /\.(?:alg|txt)$/i.exec(oldPath);
                var renamed = await api.rename(oldPath, base.trim() + ' ' + (i + 1) + (extension ? extension[0] : '.alg'));
                boundTabs.forEach(function (binding, id) { if (binding.path === oldPath) { binding.path = renamed.path; window.TabManager.setExternalFileName(id, fileName(renamed.path)); } });
            }
        } catch (error) { failure = error; }
        selectedPaths.clear(); folders.clear(); expanded = new Set(['']); await load(''); refresh();
        if (failure) throw failure;
        notice(paths.length + (paths.length === 1 ? ' arquivo renomeado.' : ' arquivos renomeados.'));
    }
    function appendProjectSelection(list) {
        if (!selectedPaths.size) return;
        var toolbar = document.createElement('div'); toolbar.className = 'workspace-file-selection project-selection-toolbar';
        var count = document.createElement('span'); count.className = 'file-selection-count'; count.textContent = selectedPaths.size + (selectedPaths.size === 1 ? ' arquivo selecionado' : ' arquivos selecionados');
        var moveButton = document.createElement('button'); moveButton.type = 'button'; moveButton.textContent = 'Mover'; moveButton.addEventListener('click', function () { var target = window.prompt('Pasta de destino relativa à raiz (vazio = raiz)', selectedDirectory); if (target !== null) perform(function () { return moveProjectPaths(Array.from(selectedPaths), target.trim()); }); });
        var renameButton = document.createElement('button'); renameButton.type = 'button'; renameButton.textContent = 'Renomear'; renameButton.addEventListener('click', function () { perform(renameSelectedProjectFiles); });
        var deleteButton = document.createElement('button'); deleteButton.type = 'button'; deleteButton.textContent = 'Excluir'; deleteButton.addEventListener('click', function () { perform(deleteSelectedProjectFiles); });
        var clearButton = document.createElement('button'); clearButton.type = 'button'; clearButton.textContent = 'Limpar'; clearButton.addEventListener('click', function () { selectedPaths.clear(); refresh(); });
        toolbar.append(count, moveButton, renameButton, deleteButton, clearButton); list.appendChild(toolbar);
    }
    function installDropTarget(item, parent) {
        item.addEventListener('dragover', function (event) { if (event.dataTransfer.types.includes('text/visualg-project-files')) { event.preventDefault(); item.classList.add('drag-over'); } });
        item.addEventListener('dragleave', function () { item.classList.remove('drag-over'); });
        item.addEventListener('drop', function (event) {
            if (!event.dataTransfer.types.includes('text/visualg-project-files')) return;
            event.preventDefault(); event.stopPropagation(); item.classList.remove('drag-over');
            var paths = event.dataTransfer.getData('text/visualg-project-files').split('\n').filter(Boolean);
            perform(function () { return moveProjectPaths(paths, parent); });
        });
    }
    function appendContentResults(list, query) {
        var heading = document.createElement('h3'); heading.className = 'doc-results-heading'; heading.textContent = 'Resultados no conteúdo'; list.appendChild(heading);
        if (!contentSearchResults || !contentSearchResults.results.length) {
            var empty = document.createElement('div'); empty.className = 'docs-search-empty'; empty.textContent = 'Nenhuma ocorrência no conteúdo dos arquivos.'; list.appendChild(empty); return;
        }
        contentSearchResults.results.forEach(function (result) {
            var item = document.createElement('button'); item.type = 'button'; item.className = 'file-item project-content-result'; item.title = result.path + ':' + result.line;
            var path = document.createElement('strong'); path.textContent = result.path + ':' + result.line;
            var line = document.createElement('small'); line.textContent = result.text;
            item.append(path, line); item.addEventListener('click', function () { perform(function () { return openSearchResult(result); }); }); list.appendChild(item);
        });
        if (contentSearchResults.truncated) { var note = document.createElement('small'); note.className = 'project-search-truncated'; note.textContent = 'Resultados limitados para manter a busca rápida.'; list.appendChild(note); }
    }
    function searchContent(query, list) {
        if (query.length < 2) { window.clearTimeout(contentSearchTimer); contentSearchSequence++; contentSearchQuery = query; contentSearchResults = null; return; }
        if (query === contentSearchQuery) { if (contentSearchResults) appendContentResults(list, query); return; }
        window.clearTimeout(contentSearchTimer);
        contentSearchQuery = query; contentSearchResults = null;
        var sequence = ++contentSearchSequence;
        contentSearchTimer = window.setTimeout(function () {
            api.search(query).then(function (result) {
                if (sequence !== contentSearchSequence || !opened || get('workspace-file-search').value.trim().toLocaleLowerCase('pt-BR') !== query) return;
                contentSearchResults = result; refresh();
            }).catch(function () { /* path search remains available when content is unreadable */ });
        }, 250);
    }
    async function createFile(parent) {
        var name = window.prompt('Nome do novo arquivo (.alg ou .txt)', 'NovoAlgoritmo.alg');
        if (name === null) return;
        var result = await api.createFile(parent, name.trim());
        await reload(parent);
        await openFile(result.path);
    }
    async function createDirectory(parent) {
        var name = window.prompt('Nome da nova pasta');
        if (name === null) return;
        await api.createDirectory(parent, name.trim());
        await reload(parent);
    }
    async function rename(relative) {
        if (window.TabManager.getRunningTab()) throw new Error('Interrompa a execução antes de renomear arquivos.');
        var name = window.prompt('Novo nome', fileName(relative));
        if (name === null) return;
        var next = await api.rename(relative, name.trim());
        boundTabs.forEach(function (binding, id) {
            if (binding.path === relative || binding.path.startsWith(relative + '/')) {
                binding.path = next.path + binding.path.slice(relative.length);
                if (binding.path === next.path) window.TabManager.setExternalFileName(id, fileName(next.path));
            }
        });
        folders.clear(); expanded = new Set(['']); selectedDirectory = '';
        await load(''); refresh(); notice('Renomeado: ' + next.path);
    }
    async function remove(relative, directory) {
        if (window.TabManager.getRunningTab()) throw new Error('Interrompa a execução antes de excluir arquivos.');
        var tab = existingTab(relative);
        var warning = tab && tab.dirty ? ' As alterações não salvas no disco permanecerão apenas no histórico local.' : '';
        if (!window.confirm('Excluir ' + (directory ? 'a pasta vazia ' : 'o arquivo ') + relative + '?' + warning)) return;
        await api.remove(relative);
        if (tab) { boundTabs.delete(tab.id); window.TabManager.closeTab(tab.id); }
        await reload(parentOf(relative)); notice('Excluído: ' + relative);
    }
    async function saveActive(format) {
        var tab = window.TabManager.getActiveTab();
        if (!tab) throw new Error('Abra ou crie um arquivo primeiro');
        var binding = boundTabs.get(tab.id);
        var extension = format ? '.' + format : null;
        if (binding && (!extension || binding.path.toLowerCase().endsWith(extension))) {
            var content = window.VisualGEditor.getValue();
            var saved = await api.write(binding.path, content, binding.revision);
            binding.revision = saved.revision;
            window.TabManager.markActiveClean();
            notice('Salvo no disco: ' + binding.path);
            return true;
        }
        var base = binding ? fileName(binding.path).replace(/\.(alg|txt)$/i, '') :
            (tab.fileName || tab.name || 'MeuAlgoritmo').replace(/\.(alg|txt)$/i, '');
        var name = window.prompt('Salvar na pasta ' + (selectedDirectory || rootName) + ' como', base + (extension || '.alg'));
        if (name === null) return false;
        name = name.trim();
        if (!/\.(alg|txt)$/i.test(name)) name += extension || '.alg';
        var created = await api.createFile(selectedDirectory, name);
        var savedNew = await api.write(created.path, window.VisualGEditor.getValue(), created.revision);
        boundTabs.set(tab.id, { path:created.path, revision:savedNew.revision });
        window.TabManager.setExternalFileName(tab.id, name);
        window.TabManager.markActiveClean();
        await reload(selectedDirectory); notice('Salvo no disco: ' + created.path);
        return true;
    }
    async function showGitSnapshot() {
        var snapshot = await api.gitSnapshot();
        var dialog = document.createElement('dialog'); dialog.className = 'workspace-version-diff project-git-dialog';
        var header = document.createElement('header'); var title = document.createElement('h2'); title.textContent = 'Git da pasta';
        var closeButton = document.createElement('button'); closeButton.type = 'button'; closeButton.textContent = 'Fechar';
        closeButton.addEventListener('click', function () { dialog.close(); dialog.remove(); }); header.append(title, closeButton); dialog.appendChild(header);
        if (!snapshot.available) { var message = document.createElement('p'); message.textContent = snapshot.message; dialog.appendChild(message); }
        else {
            var note = document.createElement('p'); note.textContent = 'Consulta somente leitura. O status inclui arquivos não rastreados; os diffs mostram alterações preparadas e não preparadas.'; dialog.appendChild(note);
            [['Status','status'],['Alterações não preparadas','unstaged'],['Alterações preparadas','staged']].forEach(function (section) {
                var heading = document.createElement('h3'); heading.textContent = section[0];
                var output = document.createElement('pre'); output.textContent = snapshot[section[1]] || (section[1] === 'status' ? 'Nenhum arquivo alterado.' : 'Sem diferenças.');
                dialog.append(heading, output);
            });
            var historyHeading = document.createElement('h3'); historyHeading.textContent = 'Histórico recente'; dialog.appendChild(historyHeading);
            var historyList = document.createElement('div'); historyList.className = 'project-git-history';
            var commitOutput = document.createElement('pre'); commitOutput.className = 'project-git-commit-diff';
            var commits = snapshot.history ? snapshot.history.split('\n').filter(Boolean) : [];
            if (!commits.length) { var emptyHistory = document.createElement('p'); emptyHistory.textContent = 'Este repositório ainda não tem commits.'; historyList.appendChild(emptyHistory); }
            commits.forEach(function (line) {
                var parts = line.split('\t'); var hash = parts.shift(); var description = document.createElement('span'); description.textContent = parts.join(' · ');
                var button = document.createElement('button'); button.type = 'button'; button.textContent = hash; button.title = 'Ver alterações deste commit';
                button.addEventListener('click', function () { perform(async function () { var result = await api.gitCommitDiff(hash); commitOutput.textContent = result.available ? result.output : result.message; }); });
                var row = document.createElement('div'); row.append(button, description); historyList.appendChild(row);
            });
            dialog.append(historyList, commitOutput);
        }
        dialog.addEventListener('close', function () { dialog.remove(); });
        document.body.appendChild(dialog); dialog.showModal();
    }
    function menu(event, options) {
        event.preventDefault();
        var previous = get('desktop-project-menu'); if (previous) previous.remove();
        var element = document.createElement('div'); element.id = 'desktop-project-menu'; element.className = 'debug-menu';
        element.style.position = 'fixed';
        options.forEach(function (entry) {
            var button = document.createElement('button'); button.type = 'button'; button.textContent = entry[0];
            button.addEventListener('click', function () { element.remove(); perform(entry[1]); });
            element.appendChild(button);
        });
        document.body.appendChild(element);
        var bounds = element.getBoundingClientRect();
        element.style.left = Math.max(8, Math.min(event.clientX, window.innerWidth - bounds.width - 8)) + 'px';
        element.style.top = Math.max(8, Math.min(event.clientY, window.innerHeight - bounds.height - 8)) + 'px';
        window.setTimeout(function () {
            document.addEventListener('pointerdown', function dismiss(pointer) {
                if (element.contains(pointer.target)) return;
                element.remove(); document.removeEventListener('pointerdown', dismiss);
            });
        }, 0);
    }
    function render(list, query) {
        list.replaceChildren();
        var activeId = window.TabManager.getActiveTab()?.id;
        var activePath = boundTabs.get(activeId)?.path;
        var root = document.createElement('button'); root.type = 'button'; root.className = 'file-item file-folder desktop-project-root';
        root.append(icon('folder-open'), document.createTextNode(rootName));
        installDropTarget(root, '');
        root.addEventListener('click', function () { selectedDirectory = ''; });
        root.addEventListener('contextmenu', function (event) { menu(event, [
            ['Novo arquivo', function () { return createFile(''); }],
            ['Nova pasta', function () { return createDirectory(''); }],
            ['Atualizar', function () { return reload(''); }],
            ['Fechar pasta', close],
        ]); });
        list.appendChild(root);
        function children(parent, target, depth) {
            var entries = (folders.get(parent) || []).slice();
            entries.sort(function (a, b) {
                var tabA = existingTab(a.path); var tabB = existingTab(b.path);
                var pinnedOrder = Number(!!(tabB && tabB.pinned)) - Number(!!(tabA && tabA.pinned));
                if (pinnedOrder) return pinnedOrder;
                if (a.directory !== b.directory) return Number(b.directory) - Number(a.directory);
                if (localStorage.getItem('visualg-files-sort') === 'recent') return (Number(tabB && tabB.lastOpenedAt) || 0) - (Number(tabA && tabA.lastOpenedAt) || 0);
                return a.name.localeCompare(b.name, 'pt-BR', { numeric:true, sensitivity:'base' });
            });
            entries.forEach(function (entry) {
                if (query && !entry.name.toLocaleLowerCase('pt-BR').includes(query) &&
                    !(folders.get(entry.path) || []).some(function (child) { return child.name.toLocaleLowerCase('pt-BR').includes(query); })) return;
                var item = document.createElement('button'); item.type = 'button'; item.className = 'file-item desktop-project-item' + (entry.directory ? ' file-folder' : '') + (selectedPaths.has(entry.path) ? ' batch-selected' : '') + (!entry.directory && !entry.editable ? ' is-unavailable' : '');
                item.style.setProperty('--project-depth', depth); item.title = entry.path;
                item.append(icon(entry.directory ? (expanded.has(entry.path) ? 'folder-open' : 'folder') : (entry.editable ? 'file-code-2' : 'file')));
                var label = document.createElement('span'); label.className = 'file-label'; label.textContent = entry.name; item.appendChild(label);
                if (!entry.directory && entry.path === activePath) item.classList.add('active');
                item.addEventListener('click', function (event) {
                    if (!entry.directory && entry.editable && (event.ctrlKey || event.metaKey)) {
                        if (selectedPaths.has(entry.path)) selectedPaths.delete(entry.path); else selectedPaths.add(entry.path);
                        refresh(); return;
                    }
                    if (entry.directory) perform(async function () {
                        selectedDirectory = entry.path;
                        if (expanded.has(entry.path)) expanded.delete(entry.path);
                        else { if (!folders.has(entry.path)) await load(entry.path); expanded.add(entry.path); }
                        refresh();
                    });
                    else if (entry.editable) perform(function () { return openFile(entry.path); });
                    else notice('Abra arquivos .alg ou .txt no editor.', 'warning');
                });
                if (!entry.directory && entry.editable) item.draggable = true;
                item.addEventListener('dragstart', function (event) {
                    if (entry.directory || !entry.editable) { event.preventDefault(); return; }
                    var paths = selectedPaths.has(entry.path) ? Array.from(selectedPaths) : [entry.path];
                    event.dataTransfer.setData('text/visualg-project-files', paths.join('\n'));
                    event.dataTransfer.effectAllowed = 'move'; item.classList.add('drag-source');
                });
                item.addEventListener('dragend', function () { item.classList.remove('drag-source'); });
                if (entry.directory) installDropTarget(item, entry.path);
                item.addEventListener('keydown', function (event) { if (event.key === 'F2') { event.preventDefault(); perform(function () { return rename(entry.path); }); } });
                item.addEventListener('contextmenu', function (event) {
                    var actions = entry.directory ? [
                        ['Novo arquivo nesta pasta', function () { return createFile(entry.path); }],
                        ['Nova subpasta', function () { return createDirectory(entry.path); }],
                        ['Atualizar', function () { return reload(entry.path); }],
                    ] : entry.editable ? [
                        ['Abrir', function () { return openFile(entry.path); }],
                        ['Mover para pasta…', function () { var target = window.prompt('Pasta de destino relativa à raiz (vazio = raiz)', parentOf(entry.path)); if (target !== null) return moveProjectPaths([entry.path], target.trim()); }],
                    ] : [];
                    actions.push(['Renomear (F2)', function () { return rename(entry.path); }]);
                    actions.push(['Excluir', function () { return remove(entry.path, entry.directory); }]);
                    menu(event, actions);
                });
                target.appendChild(item);
                if (entry.directory && expanded.has(entry.path)) children(entry.path, target, depth + 1);
            });
        }
        children('', list, 0);
        appendProjectSelection(list);
        installDropTarget(list, '');
        if (query.length >= 2) searchContent(query, list);
        if (window.renderLucideIcons) window.renderLucideIcons(list);
    }
    function init() {
        if (!api) return;
        updateToolbar();
        get('btn-open-directory').addEventListener('click', function () { perform(choose); });
        get('btn-close-directory').addEventListener('click', function () { perform(close); });
        get('btn-project-git').addEventListener('click', function () { perform(showGitSnapshot); });
        get('workspace-file-list').addEventListener('contextmenu', function (event) {
            if (!opened || event.target.closest('.file-item')) return;
            event.stopImmediatePropagation();
            menu(event, [['Novo arquivo', function () { return createFile(selectedDirectory); }], ['Nova pasta', function () { return createDirectory(selectedDirectory); }]]);
        }, true);
        [['btn-new-workspace-file', function () { return createFile(selectedDirectory); }],
            ['btn-new-workspace-folder', function () { return createDirectory(selectedDirectory); }]].forEach(function (entry) {
            get(entry[0]).addEventListener('click', function (event) {
                if (!opened) return;
                event.stopImmediatePropagation(); event.preventDefault(); perform(entry[1]);
            }, true);
        });
        document.addEventListener('visualg:file-closed', function (event) {
            var binding = boundTabs.get(event.detail.id);
            if (!binding) return;
            if (event.detail.code !== undefined && window.TabManager.getTabs().find(function (tab) { return tab.id === event.detail.id; })?.dirty &&
                !window.confirm('Este arquivo tem alterações não salvas no disco. Fechar a aba e manter uma cópia no histórico local?')) {
                event.preventDefault(); return;
            }
            boundTabs.delete(event.detail.id);
        });
    }
    window.VisualGDesktopProject = {
        isOpen: function () { return opened; },
        isTabBound: function (id) { return boundTabs.has(id); },
        render: render,
        deleteSelection: function () { return perform(deleteSelectedProjectFiles); },
        saveActive: function (format) { return perform(function () { return saveActive(format); }); },
    };
    document.addEventListener('DOMContentLoaded', init);
})();
