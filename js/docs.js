// ============================================
// VisuAlg Web IDE - Painel de Documentação
// ============================================

(function () {
    'use strict';

    var cache = {};
    var tabs = {
        'introducao': 'docs/introducao.md',
        'operadores': 'docs/operadores.md',
        'entrada-saida': 'docs/entrada-saida.md',
        'condicionais': 'docs/condicionais.md',
        'repeticao': 'docs/repeticao.md',
        'subprogramas': 'docs/subprogramas.md',
        'funcoes': 'docs/funcoes.md',
        'comandos': 'docs/comandos.md'
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

    window.DocsPanel = {
        open: function () {
            var overlay = document.getElementById('docsOverlay');
            overlay.classList.remove('hidden');
            var activeTab = overlay.querySelector('.modal-tab.active');
            if (activeTab) loadTab(activeTab.getAttribute('data-tab'));
        },
        close: function () {
            document.getElementById('docsOverlay').classList.add('hidden');
        },
        loadTab: loadTab
    };
})();
