(function () {
    'use strict';

    var api = window.visualgDesktopProject;
    var opened = false;
    var rootName = '';
    var selectedDirectory = '';
    var folders = new Map();
    var expanded = new Set(['']);
    var boundTabs = new Map();

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
        boundTabs.clear(); folders.clear(); expanded = new Set(['']);
        await load(''); updateToolbar(); refresh(); notice('Pasta aberta: ' + rootName);
    }
    async function close() {
        if (hasUnsavedFiles() && !window.confirm('Há alterações não salvas no disco. Fechar a pasta e manter essas abas como cópias locais?')) return;
        await api.close(); opened = false; rootName = ''; selectedDirectory = '';
        boundTabs.clear(); folders.clear(); expanded = new Set(['']);
        updateToolbar(); refresh(); notice('Pasta fechada. Os arquivos locais continuam disponíveis.');
    }
    async function reload(relative) {
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
        root.addEventListener('click', function () { selectedDirectory = ''; });
        root.addEventListener('contextmenu', function (event) { menu(event, [
            ['Novo arquivo', function () { return createFile(''); }],
            ['Nova pasta', function () { return createDirectory(''); }],
            ['Atualizar', function () { return reload(''); }],
            ['Fechar pasta', close],
        ]); });
        list.appendChild(root);
        function children(parent, target, depth) {
            (folders.get(parent) || []).forEach(function (entry) {
                if (query && !entry.name.toLocaleLowerCase('pt-BR').includes(query) &&
                    !(folders.get(entry.path) || []).some(function (child) { return child.name.toLocaleLowerCase('pt-BR').includes(query); })) return;
                var item = document.createElement('button'); item.type = 'button'; item.className = 'file-item desktop-project-item' + (entry.directory ? ' file-folder' : '') + (!entry.directory && !entry.editable ? ' is-unavailable' : '');
                item.style.setProperty('--project-depth', depth); item.title = entry.path;
                item.append(icon(entry.directory ? (expanded.has(entry.path) ? 'folder-open' : 'folder') : (entry.editable ? 'file-code-2' : 'file')));
                var label = document.createElement('span'); label.className = 'file-label'; label.textContent = entry.name; item.appendChild(label);
                if (!entry.directory && entry.path === activePath) item.classList.add('active');
                item.addEventListener('click', function () {
                    if (entry.directory) perform(async function () {
                        selectedDirectory = entry.path;
                        if (expanded.has(entry.path)) expanded.delete(entry.path);
                        else { if (!folders.has(entry.path)) await load(entry.path); expanded.add(entry.path); }
                        refresh();
                    });
                    else if (entry.editable) perform(function () { return openFile(entry.path); });
                    else notice('Abra arquivos .alg ou .txt no editor.', 'warning');
                });
                item.addEventListener('keydown', function (event) { if (event.key === 'F2') { event.preventDefault(); perform(function () { return rename(entry.path); }); } });
                item.addEventListener('contextmenu', function (event) {
                    var actions = entry.directory ? [
                        ['Novo arquivo nesta pasta', function () { return createFile(entry.path); }],
                        ['Nova subpasta', function () { return createDirectory(entry.path); }],
                        ['Atualizar', function () { return reload(entry.path); }],
                    ] : entry.editable ? [['Abrir', function () { return openFile(entry.path); }]] : [];
                    actions.push(['Renomear (F2)', function () { return rename(entry.path); }]);
                    actions.push(['Excluir', function () { return remove(entry.path, entry.directory); }]);
                    menu(event, actions);
                });
                target.appendChild(item);
                if (entry.directory && expanded.has(entry.path)) children(entry.path, target, depth + 1);
            });
        }
        children('', list, 0);
        if (window.renderLucideIcons) window.renderLucideIcons(list);
    }
    function init() {
        if (!api) return;
        updateToolbar();
        get('btn-open-directory').addEventListener('click', function () { perform(choose); });
        get('btn-close-directory').addEventListener('click', function () { perform(close); });
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
        saveActive: function (format) { return perform(function () { return saveActive(format); }); },
    };
    document.addEventListener('DOMContentLoaded', init);
})();
