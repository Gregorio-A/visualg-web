// ============================================
// VisuAlg Web IDE - Painel de Documentação
// ============================================

(function () {
    'use strict';

    var cache = {};
    var tabs = {
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
                    if (window.lucide) lucide.createIcons({ nodes: [this] });
                    var self = this;
                    setTimeout(function () {
                        self.innerHTML = '<i data-lucide="copy"></i>';
                        if (window.lucide) lucide.createIcons({ nodes: [self] });
                    }, 1500);
                };
            })(pres[i]));
            pres[i].appendChild(btn);
        }
        if (window.lucide) lucide.createIcons({ nodes: [panel] });
    }

    function loadTab(tabId) {
        var panel = document.querySelector('#docsOverlay [data-tab-panel="' + tabId + '"]');
        if (!panel) return;

        if (cache[tabId]) {
            panel.innerHTML = cache[tabId];
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
                addCopyButtons(panel);
            })
            .catch(function () {
                panel.innerHTML = '<p style="color:var(--red)">Erro ao carregar documentação.</p>';
            });
    }

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
