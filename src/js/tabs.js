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
    var pendingCloseTabId = null;
    var WORKSPACE_STORAGE_KEY = 'visualg-workspace-v1';
    var persistTimer = null;

    function isDefaultCode(code) {
        return code.trim() === getDefaultCode().trim();
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
            var newTab = createTabData(getDefaultCode());
            tabs.push(newTab);
            activeTabId = newTab.id;
            restoreState(newTab);
            if (window.TabManager.onSwitch) {
                window.TabManager.onSwitch(newTab);
            }
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
            code: tabCode,
            terminalHTML: '',
            previousValues: {},
            executor: null,
            running: false
        };
    }

    function loadPersistedWorkspace() {
        try {
            var raw = localStorage.getItem(WORKSPACE_STORAGE_KEY);
            if (!raw) return null;

            var data = JSON.parse(raw);
            if (!data || !Array.isArray(data.tabs) || data.tabs.length === 0) return null;

            var restoredTabs = [];
            for (var i = 0; i < data.tabs.length; i++) {
                var savedTab = data.tabs[i];
                if (!savedTab || typeof savedTab.code !== 'string') continue;
                restoredTabs.push(createTabData(savedTab.code, { id: savedTab.id }));
            }
            if (restoredTabs.length === 0) return null;

            return {
                tabs: restoredTabs,
                activeTabId: data.activeTabId
            };
        } catch (e) {
            return null;
        }
    }

    function persistWorkspaceNow() {
        try {
            if (!tabs.length) return;
            saveCurrentState();

            var data = {
                version: 1,
                activeTabId: activeTabId,
                updatedAt: new Date().toISOString(),
                tabs: tabs.map(function (tab) {
                    return {
                        id: tab.id,
                        name: tab.name,
                        code: tab.code
                    };
                })
            };

            localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            // localStorage may be unavailable or full; editing must keep working.
        }
    }

    function schedulePersist() {
        if (persistTimer) clearTimeout(persistTimer);
        persistTimer = setTimeout(function () {
            persistTimer = null;
            persistWorkspaceNow();
        }, 250);
    }

    function renderTabs() {
        tabListEl.innerHTML = '';
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            var el = document.createElement('div');
            el.className = 'tab-item' + (tab.id === activeTabId ? ' active' : '');
            el.dataset.tabId = tab.id;
            el.draggable = true;

            var nameSpan = document.createElement('span');
            nameSpan.className = 'tab-name';
            nameSpan.textContent = tab.name;
            el.appendChild(nameSpan);

            var closeBtn = document.createElement('button');
            closeBtn.className = 'tab-close';
            closeBtn.title = 'Fechar tab';
            closeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
            closeBtn.dataset.tabId = tab.id;
            el.appendChild(closeBtn);

            tabListEl.appendChild(el);
        }
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
                    e.stopPropagation();
                    self.closeTab(closeBtn.dataset.tabId);
                    return;
                }
                var tabItem = e.target.closest('.tab-item');
                if (tabItem) {
                    self.switchTab(tabItem.dataset.tabId);
                }
            });

            document.getElementById('btn-add-tab').addEventListener('click', function () {
                self.createTab();
            });

            // Drag-and-drop reordering
            var dragTabId = null;

            tabListEl.addEventListener('dragstart', function (e) {
                var tabItem = e.target.closest('.tab-item');
                if (!tabItem) return;
                if (blockWhenRunning()) {
                    e.preventDefault();
                    return;
                }
                dragTabId = tabItem.dataset.tabId;
                tabItem.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
            });

            tabListEl.addEventListener('dragover', function (e) {
                e.preventDefault();
                var tabItem = e.target.closest('.tab-item');
                if (!tabItem || tabItem.dataset.tabId === dragTabId) return;

                var rect = tabItem.getBoundingClientRect();
                var midX = rect.left + rect.width / 2;

                var items = tabListEl.querySelectorAll('.tab-item');
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
                var tabItem = e.target.closest('.tab-item');
                if (tabItem) {
                    tabItem.classList.remove('drag-over-left', 'drag-over-right');
                }
            });

            tabListEl.addEventListener('drop', function (e) {
                e.preventDefault();
                var targetItem = e.target.closest('.tab-item');
                if (!targetItem || !dragTabId) return;

                var targetId = targetItem.dataset.tabId;
                if (targetId === dragTabId) return;

                var rect = targetItem.getBoundingClientRect();
                var midX = rect.left + rect.width / 2;
                var insertBefore = e.clientX < midX;

                var fromIdx = -1, toIdx = -1;
                for (var i = 0; i < tabs.length; i++) {
                    if (tabs[i].id === dragTabId) fromIdx = i;
                    if (tabs[i].id === targetId) toIdx = i;
                }
                if (fromIdx === -1 || toIdx === -1) return;

                var moved = tabs.splice(fromIdx, 1)[0];
                toIdx = -1;
                for (var j = 0; j < tabs.length; j++) {
                    if (tabs[j].id === targetId) { toIdx = j; break; }
                }
                var insertIdx = insertBefore ? toIdx : toIdx + 1;
                tabs.splice(insertIdx, 0, moved);

                renderTabs();
                schedulePersist();
            });

            tabListEl.addEventListener('dragend', function () {
                dragTabId = null;
                var items = tabListEl.querySelectorAll('.tab-item');
                for (var i = 0; i < items.length; i++) {
                    items[i].classList.remove('dragging', 'drag-over-left', 'drag-over-right');
                }
            });

            var persistedWorkspace = loadPersistedWorkspace();
            if (persistedWorkspace) {
                tabs = persistedWorkspace.tabs;
                activeTabId = getTab(persistedWorkspace.activeTabId)
                    ? persistedWorkspace.activeTabId
                    : tabs[0].id;
                renderTabs();
                restoreState(getTab(activeTabId));
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

        createTab: function (code) {
            if (blockWhenRunning()) return null;
            saveCurrentState();
            var tab = createTabData(code || getDefaultCode());
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
            if (id === activeTabId) return;
            if (blockWhenRunning()) return;
            var tab = getTab(id);
            if (!tab) return;

            saveCurrentState();
            activeTabId = id;
            restoreState(tab);
            renderTabs();

            if (window.TabManager.onSwitch) {
                window.TabManager.onSwitch(tab);
            }
            schedulePersist();
        },

        closeTab: function (id) {
            if (blockWhenRunning()) return;
            var tab = getTab(id);
            if (!tab) return;

            // Atualizar código da aba ativa antes de verificar
            if (tab.id === activeTabId) {
                tab.code = window.VisualGEditor.getValue();
            }

            // Se código foi modificado, pedir confirmação
            if (!isDefaultCode(tab.code)) {
                pendingCloseTabId = id;
                document.getElementById('closeTabOverlay').classList.remove('hidden');
                return;
            }

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

        getRunningTab: getRunningTab,

        updateActiveTabName: function () {
            var tab = getTab(activeTabId);
            if (!tab) return;
            var code = window.VisualGEditor.getValue();
            tab.code = code;
            var newName = extractName(code);
            if (tab.name !== newName) {
                tab.name = newName;
                renderTabs();
            }
            schedulePersist();
        },

        saveCurrentState: saveCurrentState,

        saveWorkspace: persistWorkspaceNow,

        onSwitch: null,

        onActionBlocked: null
    };
})();
