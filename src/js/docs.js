// ============================================
// VisuAlg Web IDE - Painel de Documentação
// ============================================

(function () {
    'use strict';

    var cache = {};
    var tabs = {
        'sumario': 'docs/sumario.md',
        'introducao': 'docs/introducao.md',
        'status': 'docs/status.md',
        'compatibilidade': 'docs/compatibilidade.md',
        'operadores': 'docs/operadores.md',
        'entrada-saida': 'docs/entrada-saida.md',
        'condicionais': 'docs/condicionais.md',
        'repeticao': 'docs/repeticao.md',
        'subprogramas': 'docs/subprogramas.md',
        'funcoes': 'docs/funcoes.md',
        'comandos': 'docs/comandos.md',
        'historia': 'docs/historia.md'
    };
    var docOrder = ['sumario', 'introducao', 'historia', 'compatibilidade', 'operadores', 'entrada-saida', 'condicionais', 'repeticao', 'subprogramas', 'funcoes', 'comandos', 'status'];

    function addPageNavigation(panel, tabId) {
        var oldNavigation = panel.querySelector('.docs-page-navigation');
        if (oldNavigation) oldNavigation.remove();
        var nav = document.createElement('nav'); nav.className = 'docs-page-navigation'; nav.setAttribute('aria-label', 'Navegação da documentação');
        var index = docOrder.indexOf(tabId);
        [['previous', index > 0 ? docOrder[index - 1] : null], ['next', index >= 0 && index < docOrder.length - 1 ? docOrder[index + 1] : null]].forEach(function (entry) {
            var button = document.createElement('button'); button.type = 'button'; button.className = 'docs-page-navigation-button docs-page-navigation-' + entry[0];
            var label = entry[0] === 'previous' ? '← Anterior' : 'Próxima →';
            if (!entry[1]) { button.disabled = true; button.textContent = label; }
            else {
                var target = document.querySelector('#docsOverlay .modal-tab[data-tab="' + entry[1] + '"]');
                button.textContent = label + ' · ' + (target ? target.textContent.trim() : entry[1]);
                button.addEventListener('click', function () {
                    if (window.VisualGWorkspace) { window.VisualGWorkspace.showDoc(entry[1]); return; }
                    activateTab(entry[1]); loadTab(entry[1]);
                });
            }
            nav.appendChild(button);
        });
        panel.appendChild(nav);
    }

    function addCopyButtons(panel) {
        var pres = panel.querySelectorAll('pre');
        for (var i = 0; i < pres.length; i++) {
            var btn = document.createElement('button');
            btn.className = 'docs-copy-btn';
            btn.title = 'Copiar código';
            btn.innerHTML = '<i data-lucide="copy"></i>';
            btn.addEventListener('click', (function (pre) {
                return function () {
                    var code = pre.querySelector('code');
                    navigator.clipboard.writeText(code ? code.textContent : pre.textContent);
                    this.innerHTML = '<i data-lucide="check"></i>';
                    if (window.renderLucideIcons) window.renderLucideIcons(this);
                    var self = this;
                    setTimeout(function () {
                        self.innerHTML = '<i data-lucide="copy"></i>';
                        if (window.renderLucideIcons) window.renderLucideIcons(self);
                    }, 1500);
                };
            })(pres[i]));
            pres[i].appendChild(btn);
        }
        if (window.renderLucideIcons) window.renderLucideIcons(panel);
    }

    function loadTab(tabId) {
        var panel = document.querySelector('#docsOverlay [data-tab-panel="' + tabId + '"]');
        if (!panel) return;

        if (cache[tabId]) {
            panel.innerHTML = cache[tabId];
            addPageNavigation(panel, tabId);
            addCopyButtons(panel);
            return;
        }

        var file = tabs[tabId];
        if (!file) return;

        panel.innerHTML = '<p style="color:var(--comment)">Carregando...</p>';
        fetch(file)
            .then(function (r) { return r.text(); })
            .then(function (md) {
                var html = marked.parse(md);
                cache[tabId] = html;
                panel.innerHTML = html;
                addPageNavigation(panel, tabId);
                addCopyButtons(panel);
            })
            .catch(function () {
                panel.innerHTML = '<p style="color:var(--red)">Erro ao carregar documentação.</p>';
            });
    }

    var docsContent = document.getElementById('docs-content');
    if (docsContent) docsContent.addEventListener('click', function (event) {
        var link = event.target.closest('a[href^="#doc:"]');
        if (!link) return;
        event.preventDefault();
        var targetId = link.getAttribute('href').slice(5);
        if (window.VisualGWorkspace) window.VisualGWorkspace.showDoc(targetId);
        else { activateTab(targetId); loadTab(targetId); }
    });

    function activateTab(tabId) {
        var overlay = document.getElementById('docsOverlay');
        if (!overlay) return null;

        var tab = overlay.querySelector('.modal-tab[data-tab="' + tabId + '"]');
        var panel = overlay.querySelector('.modal-tab-panel[data-tab-panel="' + tabId + '"]');
        if (!tab || !panel) return null;

        overlay.querySelectorAll('.modal-tab').forEach(function (t) { t.classList.remove('active'); });
        overlay.querySelectorAll('.modal-tab-panel').forEach(function (p) { p.classList.remove('active'); });
        tab.classList.add('active');
        panel.classList.add('active');

        return tabId;
    }

    window.DocsPanel = {
        open: function (tabId) {
            if (window.VisualGWorkspace) { window.VisualGWorkspace.showDoc(tabId || 'sumario'); return; }
            var overlay = document.getElementById('docsOverlay');
            overlay.classList.remove('hidden');
            var selectedTab = tabId ? activateTab(tabId) : null;
            var activeTab = overlay.querySelector('.modal-tab.active');
            if (!selectedTab && activeTab) selectedTab = activeTab.getAttribute('data-tab');
            if (selectedTab) loadTab(selectedTab);
        },
        close: function () {
            document.getElementById('docsOverlay').classList.add('hidden');
        },
        activateTab: activateTab,
        loadTab: loadTab
    };
})();
