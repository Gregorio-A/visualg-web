// ============================================
// VisuAlg Web IDE - Tab Manager
// ============================================

(function () {
    'use strict';

    function getDefaultCode() {
        return window.gerarTemplate ? window.gerarTemplate() : 'Algoritmo "MeuPrograma"\nVar\n\nInicio\n\nfimalgoritmo\n';
    }

    var tabIdCounter = 0;
    var tabs = [];
    var activeTabId = null;
    var tabListEl = null;
    var startScreenRequested = false;
    var pendingCloseTabId = null;
    var WORKSPACE_STORAGE_KEY = 'visualg-workspace-v1';
    var RECOVERY_STORAGE_KEY = 'visualg-workspace-recovery-v1';
    var RECOVERY_CHECKPOINT_KEY = 'visualg-workspace-recovery-checkpoint-v1';
    var VERSIONS_STORAGE_KEY = 'visualg-workspace-versions-v1';
    var RECOVERY_INTERVAL = 30000;
    var persistTimer = null;
    var persistenceState = {
        status: 'idle',
        updatedAt: null,
        hasRecovery: false
    };

    function notifyPersistence(status, updatedAt) {
        var hasRecovery = false;
        try {
            hasRecovery = !!localStorage.getItem(RECOVERY_STORAGE_KEY);
        } catch (e) {
            hasRecovery = false;
        }
        persistenceState = {
            status: status,
            updatedAt: updatedAt || persistenceState.updatedAt,
            hasRecovery: hasRecovery
        };
        if (window.TabManager && window.TabManager.onPersistenceChange) {
            window.TabManager.onPersistenceChange(persistenceState);
        }
    }

    function getRunningTab() {
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].executor && tabs[i].executor.running) return tabs[i];
        }
        return null;
    }

    function blockWhenRunning() {
        var runningTab = getRunningTab();
        if (!runningTab) return false;
        if (window.TabManager.onActionBlocked) {
            window.TabManager.onActionBlocked('Interrompa a execucao atual antes de alterar as abas.');
        }
        return true;
    }

    function doCloseTab(id) {
        var tab = getTab(id);
        if (!tab) return;
        if (tab.id === activeTabId) saveCurrentState();
        document.dispatchEvent(new window.CustomEvent('visualg:file-closed', { detail: { id: tab.id, name: tab.name, fileName: tab.fileName, code: tab.code } }));

        if (tab.executor && tab.executor.running) {
            tab.executor.running = false;
            if (tab.executor.stepResolve) {
                tab.executor.stepResolve();
                tab.executor.stepResolve = null;
            }
        }

        var idx = tabs.indexOf(tab);
        tabs.splice(idx, 1);

        if (tabs.length === 0) {
            activeTabId = null;
            window.VisualGEditor.setValue('');
            window.VisualGEditor.clearHighlight();
            window.Terminal.clear();
            window.VariablesPanel.clear();
            document.dispatchEvent(new window.CustomEvent('visualg:workspace-empty'));
        } else if (id === activeTabId) {
            var newIdx = Math.min(idx, tabs.length - 1);
            activeTabId = tabs[newIdx].id;
            restoreState(tabs[newIdx]);
            if (window.TabManager.onSwitch) {
                window.TabManager.onSwitch(tabs[newIdx]);
            }
        }

        renderTabs();
        schedulePersist();
    }

    function extractName(code) {
        var match = code.match(/algoritmo\s+"([^"]+)"/i);
        return (match && match[1]) ? match[1] : 'Sem nome';
    }

    function updateCounterFromId(id) {
        var match = /^tab-(\d+)$/.exec(id || '');
        if (!match) return;
        tabIdCounter = Math.max(tabIdCounter, parseInt(match[1], 10));
    }

    function createTabData(code, options) {
        options = options || {};
        var tabCode = typeof code === 'string' ? code : getDefaultCode();
        var id = options.id;
        if (id) {
            updateCounterFromId(id);
        } else {
            tabIdCounter++;
            id = 'tab-' + tabIdCounter;
        }
        return {
            id: id,
            name: extractName(tabCode),
            fileName: options.fileName || null,
            code: tabCode,
            dirty: !!options.dirty,
            terminalHTML: '',
            previousValues: {},
            executor: null,
            running: false
        };
    }

    function deserializeWorkspace(raw) {
        if (!raw) return null;

        var data = JSON.parse(raw);
        if (!data || !Array.isArray(data.tabs)) return null;

        var restoredTabs = [];
        for (var i = 0; i < data.tabs.length; i++) {
            var savedTab = data.tabs[i];
            if (!savedTab || typeof savedTab.code !== 'string') continue;
            restoredTabs.push(createTabData(savedTab.code, { id: savedTab.id, fileName: savedTab.fileName, dirty: savedTab.dirty }));
        }
        return {
            tabs: restoredTabs,
            activeTabId: restoredTabs.length ? data.activeTabId : null,
            updatedAt: data.updatedAt || null
        };
    }

    function loadPersistedWorkspace() {
        try {
            return deserializeWorkspace(localStorage.getItem(WORKSPACE_STORAGE_KEY));
        } catch (e) {
            return null;
        }
    }

    function persistWorkspaceNow() {
        try {
            saveCurrentState();

            var previousRaw = localStorage.getItem(WORKSPACE_STORAGE_KEY);
            var now = Date.now();
            var previousCheckpoint = parseInt(localStorage.getItem(RECOVERY_CHECKPOINT_KEY) || '0', 10);

            if (previousRaw && now - previousCheckpoint >= RECOVERY_INTERVAL) {
                localStorage.setItem(RECOVERY_STORAGE_KEY, previousRaw);
                localStorage.setItem(RECOVERY_CHECKPOINT_KEY, String(now));
                try {
                    if (previousRaw.length < 200000) {
                        var history = JSON.parse(localStorage.getItem(VERSIONS_STORAGE_KEY) || '[]');
                        if (!Array.isArray(history)) history = [];
                        history.unshift(previousRaw);
                        history = history.filter(function (raw) { try { var date = new Date(JSON.parse(raw).updatedAt).getTime(); return Number.isFinite(date) && now - date < 30 * 86400000; } catch (error) { return false; } }).slice(0, 10);
                        localStorage.setItem(VERSIONS_STORAGE_KEY, JSON.stringify(history));
                    }
                } catch (error) { /* a full local store must not interrupt code autosave */ }
            }

            var data = {
                version: 1,
                activeTabId: activeTabId,
                updatedAt: new Date().toISOString(),
                tabs: tabs.map(function (tab) {
                    return {
                        id: tab.id,
                        name: tab.name,
                        fileName: tab.fileName,
                        code: tab.code,
                        dirty: tab.dirty
                    };
                })
            };

            localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(data));
            notifyPersistence('saved', data.updatedAt);
        } catch (e) {
            // localStorage may be unavailable or full; editing must keep working.
            notifyPersistence('error');
        }
    }

    function serializeCurrentWorkspace() {
        saveCurrentState();
        return JSON.stringify({
            version: 1,
            activeTabId: activeTabId,
            updatedAt: new Date().toISOString(),
            tabs: tabs.map(function (tab) {
                return {
                    id: tab.id,
                    name: tab.name,
                    fileName: tab.fileName,
                    code: tab.code,
                    dirty: tab.dirty
                };
            })
        });
    }

    function getRecoveryInfo() {
        try {
            var raw = localStorage.getItem(RECOVERY_STORAGE_KEY);
            if (!raw) return null;
            var data = JSON.parse(raw);
            if (!data || !Array.isArray(data.tabs) || data.tabs.length === 0) return null;
            return {
                updatedAt: data.updatedAt || null,
                tabCount: data.tabs.length
            };
        } catch (e) {
            return null;
        }
    }

    function getVersionHistory() {
        try {
            var history = JSON.parse(localStorage.getItem(VERSIONS_STORAGE_KEY) || '[]');
            if (!Array.isArray(history)) return [];
            return history.map(function (raw, index) { var data = JSON.parse(raw); return { index: index, updatedAt: data.updatedAt, tabCount: data.tabs.length }; });
        } catch (error) { return []; }
    }

    function restoreSnapshot(raw) {
        try {
            if (persistTimer) {
                clearTimeout(persistTimer);
                persistTimer = null;
            }
            var recovered = deserializeWorkspace(raw);
            if (!recovered) return false;

            var currentRaw = serializeCurrentWorkspace();
            localStorage.setItem(WORKSPACE_STORAGE_KEY, raw);
            localStorage.setItem(RECOVERY_STORAGE_KEY, currentRaw);
            localStorage.setItem(RECOVERY_CHECKPOINT_KEY, String(Date.now()));

            tabs = recovered.tabs;
            activeTabId = getTab(recovered.activeTabId)
                ? recovered.activeTabId
                : (tabs.length ? tabs[0].id : null);
            renderTabs();
            if (activeTabId) restoreState(getTab(activeTabId));
            notifyPersistence('restored', recovered.updatedAt);

            if (activeTabId && window.TabManager.onSwitch) {
                window.TabManager.onSwitch(getTab(activeTabId));
            }
            return true;
        } catch (e) {
            notifyPersistence('error');
            return false;
        }
    }

    function restoreRecovery() { return restoreSnapshot(localStorage.getItem(RECOVERY_STORAGE_KEY)); }

    function restoreVersion(index) {
        try {
            var history = JSON.parse(localStorage.getItem(VERSIONS_STORAGE_KEY) || '[]');
            if (!Array.isArray(history) || !history[index]) return false;
            return restoreSnapshot(history[index]);
        } catch (error) { return false; }
    }

    function schedulePersist() {
        if (persistTimer) clearTimeout(persistTimer);
        notifyPersistence('saving');
        persistTimer = setTimeout(function () {
            persistTimer = null;
            persistWorkspaceNow();
        }, 250);
    }

    function renderTabs() {
        // Do not keep file tab elements whose model was closed. Retaining these
        // stale nodes made the X appear to do nothing and left dead tabs visible.
        var previousItems = Array.prototype.slice.call(tabListEl.children).filter(function (item) {
            return item.classList.contains('view-tab') || !!getTab(item.dataset.tabId);
        });
        var previousOrder = previousItems.map(function (item) {
            return item.classList.contains('view-tab') ? 'view:' + item.dataset.type + ':' + (item.dataset.docId || '') : 'file:' + item.dataset.tabId;
        });
        var orderedItems = Object.create(null);
        previousItems.forEach(function (item, index) { orderedItems[previousOrder[index]] = item; });
        tabListEl.replaceChildren();
        tabListEl.setAttribute('role', 'presentation');
        var editorPanel = document.getElementById('editorPanel');
        var emptyState = document.getElementById('editor-empty-state');
        var showStartScreen = tabs.length === 0 || startScreenRequested;
        if (editorPanel) editorPanel.classList.toggle('no-active-file', showStartScreen);
        if (emptyState) emptyState.hidden = !showStartScreen;
        var activeElement = null;
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            var el = document.createElement('div');
            el.className = 'tab-item' + (tab.id === activeTabId ? ' active' : '') + (tab.dirty ? ' modified' : '');
            el.dataset.tabId = tab.id;
            el.draggable = true;
            el.setAttribute('role', 'tab');
            el.setAttribute('aria-selected', tab.id === activeTabId ? 'true' : 'false');
            el.tabIndex = tab.id === activeTabId ? 0 : -1;

            var fileIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            fileIcon.setAttribute('class', 'tab-file-icon');
            fileIcon.setAttribute('viewBox', '0 0 24 24');
            fileIcon.setAttribute('fill', 'none');
            fileIcon.setAttribute('stroke', 'currentColor');
            fileIcon.setAttribute('stroke-width', '2');
            fileIcon.setAttribute('stroke-linecap', 'round');
            fileIcon.setAttribute('stroke-linejoin', 'round');
            fileIcon.setAttribute('aria-hidden', 'true');
            [['path', { d: 'M10 12.5 8 15l2 2.5' }], ['path', { d: 'm14 12.5 2 2.5-2 2.5' }], ['path', { d: 'M14 2v4a2 2 0 0 0 2 2h4' }], ['path', { d: 'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z' }]].forEach(function (shape) {
                var part = document.createElementNS('http://www.w3.org/2000/svg', shape[0]);
                Object.keys(shape[1]).forEach(function (attribute) { part.setAttribute(attribute, shape[1][attribute]); });
                fileIcon.appendChild(part);
            });
            el.appendChild(fileIcon);

            var nameSpan = document.createElement('span');
            nameSpan.className = 'tab-name';
            nameSpan.textContent = tab.fileName || tab.name + '.alg';
            el.appendChild(nameSpan);
            if (tab.dirty) {
                var marker = document.createElement('span'); marker.className = 'tab-dirty'; marker.textContent = '●'; marker.title = 'Modificado desde o último download'; el.appendChild(marker);
            }

            var closeBtn = document.createElement('button');
            closeBtn.className = 'tab-close';
            closeBtn.type = 'button';
            closeBtn.title = 'Fechar tab';
            closeBtn.setAttribute('aria-label', 'Fechar ' + (tab.fileName || tab.name + '.alg'));
            closeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
            closeBtn.dataset.tabId = tab.id;
            el.appendChild(closeBtn);

            orderedItems['file:' + tab.id] = el;
            if (tab.id === activeTabId) activeElement = el;
        }
        var keys = previousOrder.slice();
        Object.keys(orderedItems).forEach(function (key) { if (keys.indexOf(key) === -1) keys.push(key); });
        keys.forEach(function (key) { if (orderedItems[key]) tabListEl.appendChild(orderedItems[key]); });
        if (activeElement && !startScreenRequested) activeElement.scrollIntoView({ block:'nearest', inline:'nearest' });
    }

    function saveCurrentState() {
        var tab = getTab(activeTabId);
        if (!tab) return;

        var editor = window.VisualGEditor;
        var terminal = window.Terminal;
        var varsPanel = window.VariablesPanel;

        tab.code = editor.getValue();
        tab.terminalHTML = terminal.outputEl.textContent;
        tab.previousValues = JSON.parse(JSON.stringify(varsPanel.previousValues));
    }

    function restoreState(tab) {
        var editor = window.VisualGEditor;
        var terminal = window.Terminal;
        var varsPanel = window.VariablesPanel;

        editor.setValue(tab.code);
        editor.clearHighlight();
        terminal.outputEl.textContent = tab.terminalHTML;
        varsPanel.previousValues = JSON.parse(JSON.stringify(tab.previousValues));

        // Restaurar variáveis se executor ativo
        if (tab.executor && tab.executor.running && tab.executor.variables) {
            varsPanel.update(tab.executor.variables);
        } else {
            varsPanel.clear();
            varsPanel.previousValues = tab.previousValues;
        }
    }

    function getTab(id) {
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].id === id) return tabs[i];
        }
        return null;
    }

    window.TabManager = {
        init: function () {
            tabListEl = document.getElementById('tab-list');

            var self = this;

            // Click events via delegation
            tabListEl.addEventListener('click', function (e) {
                var closeBtn = e.target.closest('.tab-close');
                if (closeBtn) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    self.closeTab(closeBtn.dataset.tabId);
                    return;
                }
                var tabItem = e.target.closest('.tab-item');
                if (tabItem) {
                    self.switchTab(tabItem.dataset.tabId);
                }
            }, true);

            document.getElementById('btn-add-tab').addEventListener('click', function () {
                startScreenRequested = true;
                if (window.VisualGWorkspace) window.VisualGWorkspace.showEditor();
                renderTabs();
            });
            document.getElementById('btn-empty-new').addEventListener('click', function () { startScreenRequested = false; self.createTab(); });
            document.getElementById('btn-empty-import').addEventListener('click', function () { document.getElementById('file-input').click(); });

            // Drag-and-drop reordering across files and auxiliary views.
            var draggedItem = null;
            tabListEl.addEventListener('dragstart', function (e) {
                var tabItem = e.target.closest('.tab-item, .view-tab');
                if (!tabItem || e.target.closest('button')) { e.preventDefault(); return; }
                if (blockWhenRunning()) {
                    e.preventDefault();
                    return;
                }
                draggedItem = tabItem;
                tabItem.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', tabItem.classList.contains('tab-item') ? 'file:' + tabItem.dataset.tabId : 'view:' + tabItem.dataset.type + ':' + (tabItem.dataset.docId || ''));
            });

            tabListEl.addEventListener('keydown', function (e) {
                var tabItem = e.target.closest('.tab-item');
                if (!tabItem || e.target.closest('.tab-close')) return;
                var items = Array.prototype.slice.call(tabListEl.querySelectorAll('.tab-item'));
                var index = items.indexOf(tabItem);
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    self.switchTab(tabItem.dataset.tabId);
                } else if (e.key === 'Delete') {
                    e.preventDefault();
                    self.closeTab(tabItem.dataset.tabId);
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Home' || e.key === 'End') {
                    e.preventDefault();
                    if (e.key === 'Home') index = 0;
                    else if (e.key === 'End') index = items.length - 1;
                    else index = (index + (e.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
                    items[index].focus();
                }
            });
            tabListEl.addEventListener('auxclick', function (e) {
                if (e.button !== 1) return;
                var tabItem = e.target.closest('.tab-item');
                if (!tabItem) return;
                e.preventDefault();
                self.closeTab(tabItem.dataset.tabId);
            });

            tabListEl.addEventListener('dragover', function (e) {
                e.preventDefault();
                var tabItem = e.target.closest('.tab-item, .view-tab');
                if (!tabItem || tabItem === draggedItem) return;

                var rect = tabItem.getBoundingClientRect();
                var midX = rect.left + rect.width / 2;

                var items = tabListEl.querySelectorAll('.tab-item, .view-tab');
                for (var i = 0; i < items.length; i++) {
                    items[i].classList.remove('drag-over-left', 'drag-over-right');
                }

                if (e.clientX < midX) {
                    tabItem.classList.add('drag-over-left');
                } else {
                    tabItem.classList.add('drag-over-right');
                }
            });

            tabListEl.addEventListener('dragleave', function (e) {
                var tabItem = e.target.closest('.tab-item, .view-tab');
                if (tabItem) {
                    tabItem.classList.remove('drag-over-left', 'drag-over-right');
                }
            });

            tabListEl.addEventListener('drop', function (e) {
                e.preventDefault();
                var targetItem = e.target.closest('.tab-item, .view-tab');
                if (!targetItem || !draggedItem || targetItem === draggedItem) return;

                var rect = targetItem.getBoundingClientRect();
                var midX = rect.left + rect.width / 2;
                var insertBefore = e.clientX < midX;

                tabListEl.insertBefore(draggedItem, insertBefore ? targetItem : targetItem.nextSibling);
                tabs = Array.prototype.map.call(tabListEl.querySelectorAll('.tab-item'), function (item) { return getTab(item.dataset.tabId); }).filter(Boolean);
                schedulePersist();
            });

            tabListEl.addEventListener('dragend', function () {
                draggedItem = null;
                var items = tabListEl.querySelectorAll('.tab-item, .view-tab');
                for (var i = 0; i < items.length; i++) {
                    items[i].classList.remove('dragging', 'drag-over-left', 'drag-over-right');
                }
            });

            var persistedWorkspace = loadPersistedWorkspace();
            this.freshWorkspace = !persistedWorkspace;
            if (persistedWorkspace) {
                tabs = persistedWorkspace.tabs;
                activeTabId = getTab(persistedWorkspace.activeTabId)
                    ? persistedWorkspace.activeTabId
                    : (tabs.length ? tabs[0].id : null);
                renderTabs();
                if (activeTabId) restoreState(getTab(activeTabId));
                notifyPersistence('saved', persistedWorkspace.updatedAt);
            } else {
                var initialTab = createTabData(window.VisualGEditor.getValue());
                tabs.push(initialTab);
                activeTabId = initialTab.id;
                renderTabs();
                persistWorkspaceNow();
            }

            // Listen for editor changes to update tab name
            window.VisualGEditor.instance.on('change', function () {
                self.updateActiveTabName();
            });

            window.addEventListener('beforeunload', persistWorkspaceNow);
            document.addEventListener('visibilitychange', function () {
                if (document.visibilityState === 'hidden') persistWorkspaceNow();
            });
        },

        createTab: function (code, options) {
            if (blockWhenRunning()) return null;
            startScreenRequested = false;
            saveCurrentState();
            var tab = createTabData(code || getDefaultCode(), options);
            tabs.push(tab);
            activeTabId = tab.id;
            restoreState(tab);
            renderTabs();

            // Notify main.js about tab switch
            if (window.TabManager.onSwitch) {
                window.TabManager.onSwitch(tab);
            }
            schedulePersist();

            return tab;
        },

        switchTab: function (id) {
            if (id === activeTabId) {
                if (startScreenRequested) { startScreenRequested = false; renderTabs(); }
                return;
            }
            if (blockWhenRunning()) return;
            var tab = getTab(id);
            if (!tab) return;
            startScreenRequested = false;

            saveCurrentState();
            activeTabId = id;
            restoreState(tab);
            renderTabs();

            if (window.TabManager.onSwitch) {
                window.TabManager.onSwitch(tab);
            }
            schedulePersist();
        },

        dismissStartScreen: function () {
            if (!startScreenRequested) return;
            startScreenRequested = false;
            renderTabs();
        },

        closeTab: function (id) {
            var tab = getTab(id);
            if (!tab) return;

            // Atualizar código da aba ativa antes de verificar
            if (tab.id === activeTabId) {
                tab.code = window.VisualGEditor.getValue();
            }

            // Closing a tab keeps its file in the workspace; deletion is a separate action.
            doCloseTab(id);
        },

        confirmClose: function () {
            if (pendingCloseTabId) {
                if (blockWhenRunning()) return;
                doCloseTab(pendingCloseTabId);
                pendingCloseTabId = null;
            }
            document.getElementById('closeTabOverlay').classList.add('hidden');
        },

        cancelClose: function () {
            pendingCloseTabId = null;
            document.getElementById('closeTabOverlay').classList.add('hidden');
        },

        getActiveTab: function () {
            return getTab(activeTabId);
        },

        getTabs: function () {
            saveCurrentState();
            return tabs.slice();
        },

        setFileName: function (id, fileName) {
            var tab = getTab(id);
            if (!tab || blockWhenRunning()) return false;
            var clean = String(fileName || '').trim().replace(/[\\/]/g, '-');
            if (!clean) return false;
            tab.fileName = /\.(alg|txt)$/i.test(clean) ? clean : clean + '.alg';
            renderTabs();
            schedulePersist();
            return true;
        },

        updateTabCode: function (id, code) {
            var tab = getTab(id);
            if (!tab || id === activeTabId || typeof code !== 'string' || blockWhenRunning()) return false;
            tab.code = code;
            tab.name = extractName(code);
            renderTabs();
            schedulePersist();
            return true;
        },

        getRunningTab: getRunningTab,

        updateActiveTabName: function () {
            var tab = getTab(activeTabId);
            if (!tab) return;
            var code = window.VisualGEditor.getValue();
            if (code !== tab.code && !tab.dirty) { tab.dirty = true; renderTabs(); }
            tab.code = code;
            var newName = extractName(code);
            if (tab.name !== newName) {
                tab.name = newName;
                renderTabs();
            }
            schedulePersist();
        },

        markActiveClean: function () {
            var tab = getTab(activeTabId); if (!tab) return;
            tab.dirty = false; renderTabs(); schedulePersist();
        },

        saveCurrentState: saveCurrentState,

        saveWorkspace: persistWorkspaceNow,

        getPersistenceState: function () {
            return {
                status: persistenceState.status,
                updatedAt: persistenceState.updatedAt,
                hasRecovery: persistenceState.hasRecovery
            };
        },

        getRecoveryInfo: getRecoveryInfo,

        getVersionHistory: getVersionHistory,

        restoreVersion: restoreVersion,

        restoreRecovery: restoreRecovery,

        onSwitch: null,

        onActionBlocked: null,

        onPersistenceChange: null
    };
})();
