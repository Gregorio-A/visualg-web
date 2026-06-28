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

    function isDefaultCode(code) {
        return code.trim() === getDefaultCode().trim();
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
    }

    function extractName(code) {
        var match = code.match(/algoritmo\s+"([^"]+)"/i);
        return (match && match[1]) ? match[1] : 'Sem nome';
    }

    function createTabData(code) {
        tabIdCounter++;
        return {
            id: 'tab-' + tabIdCounter,
            name: extractName(code),
            code: code,
            terminalHTML: '',
            previousValues: {},
            executor: null,
            running: false
        };
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
            });

            tabListEl.addEventListener('dragend', function () {
                dragTabId = null;
                var items = tabListEl.querySelectorAll('.tab-item');
                for (var i = 0; i < items.length; i++) {
                    items[i].classList.remove('dragging', 'drag-over-left', 'drag-over-right');
                }
            });

            // Create initial tab
            var initialTab = createTabData(window.VisualGEditor.getValue());
            tabs.push(initialTab);
            activeTabId = initialTab.id;
            renderTabs();

            // Listen for editor changes to update tab name
            window.VisualGEditor.instance.on('change', function () {
                self.updateActiveTabName();
            });
        },

        createTab: function (code) {
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

            return tab;
        },

        switchTab: function (id) {
            if (id === activeTabId) return;
            var tab = getTab(id);
            if (!tab) return;

            saveCurrentState();
            activeTabId = id;
            restoreState(tab);
            renderTabs();

            if (window.TabManager.onSwitch) {
                window.TabManager.onSwitch(tab);
            }
        },

        closeTab: function (id) {
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

        updateActiveTabName: function () {
            var tab = getTab(activeTabId);
            if (!tab) return;
            var code = window.VisualGEditor.getValue();
            var newName = extractName(code);
            if (tab.name !== newName) {
                tab.name = newName;
                renderTabs();
            }
        },

        saveCurrentState: saveCurrentState,

        onSwitch: null
    };
})();
