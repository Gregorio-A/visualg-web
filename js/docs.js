// ============================================
// VisuAlg Web IDE - Painel de Documentação
// ============================================

(function () {
    'use strict';

    var cache = {};
    var tabs = {
        'sumario': 'docs/sumario.md',
        'introducao': 'docs/introducao.md',
        'editor': 'docs/editor.md',
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
    var docOrder = ['sumario', 'introducao', 'historia', 'editor', 'compatibilidade', 'operadores', 'entrada-saida', 'condicionais', 'repeticao', 'subprogramas', 'funcoes', 'comandos', 'status'];

    function enhanceImages(root) {
        root.querySelectorAll('img:not([data-doc-enhanced])').forEach(function (img) {
            img.dataset.docEnhanced = 'true';
            var figure = document.createElement('figure'); figure.className = 'docs-figure';
            var frame = document.createElement('div'); frame.className = 'docs-image-frame';
            var src = img.getAttribute('src') || '';
            if (/\.svg(?:\?|$)|screenshots\//.test(src)) figure.classList.add('docs-figure-wide');
            var parent = img.parentElement;
            if (parent && parent.tagName === 'P' && parent.children.length === 1) parent.replaceWith(figure);
            else img.replaceWith(figure);
            frame.appendChild(img); figure.appendChild(frame);
            if (src.indexOf('linha-do-tempo-visualg.svg') !== -1) {
                figure.classList.add('docs-figure-timeline');
                var timeline = document.createElement('ol'); timeline.className = 'docs-timeline-mobile';
                [
                    ['VisuAlg 2.0', 'Captura preservada do editor clássico (imagem acima).'],
                    ['VisuAlg 2.5', 'Linha inicial de Cláudio Morgado e Antonio Nicolodi.'],
                    ['VisuAlg 3.0', 'Reformulação: 3.0.5.6, 3.0.6.5 e 3.0.7.0.'],
                    ['VisuAlg.dev', 'Etapa web do Prof. Conrado Salomé Ribeiro.'],
                    ['VisuAlg Web', 'Fork independente, versões 0.10 a 0.14, de Murilo Gregorio Alves.']
                ].forEach(function (step) {
                    var row = document.createElement('li');
                    var name = document.createElement('strong'); name.textContent = step[0];
                    var description = document.createElement('span'); description.textContent = step[1];
                    row.append(name, description); timeline.appendChild(row);
                });
                var note = document.createElement('p'); note.className = 'docs-timeline-note'; note.textContent = 'Marcos reunidos de fontes públicas. A captura 2.0 é de 2018; as versões 2.5, 3.x e as etapas web aparecem separadas para evitar falsa equivalência.';
                figure.append(timeline, note);
            }
            var caption = document.createElement('figcaption'); caption.textContent = img.alt || 'Imagem da documentação';
            var open = document.createElement('button'); open.type = 'button'; open.className = 'docs-image-open'; open.textContent = 'Ampliar imagem';
            open.setAttribute('aria-label', 'Ampliar: ' + (img.alt || 'imagem da documentação'));
            open.addEventListener('click', function () { openImage(img); });
            figure.append(caption, open);
        });
    }

    function openImage(source) {
        var viewer = document.createElement('div'); viewer.className = 'docs-image-viewer'; viewer.setAttribute('role', 'dialog'); viewer.setAttribute('aria-modal', 'true'); viewer.setAttribute('aria-label', source.alt || 'Imagem ampliada');
        if (source.closest('.docs-figure-wide')) viewer.classList.add('docs-image-viewer-wide');
        var close = document.createElement('button'); close.type = 'button'; close.className = 'docs-image-close'; close.textContent = 'Fechar imagem ×';
        var image = document.createElement('img'); image.src = source.currentSrc || source.src; image.alt = source.alt;
        var caption = document.createElement('p'); caption.textContent = source.alt || '';
        var content = document.createElement('div'); content.className = 'docs-image-viewer-content'; content.append(image, caption);
        viewer.append(close, content); document.body.appendChild(viewer);
        function dismiss() { document.removeEventListener('keydown', onKey); viewer.remove(); source.parentElement.parentElement.querySelector('.docs-image-open').focus(); }
        function onKey(event) { if (event.key === 'Escape') dismiss(); }
        close.addEventListener('click', dismiss);
        viewer.addEventListener('click', function (event) { if (event.target === viewer) dismiss(); });
        document.addEventListener('keydown', onKey); close.focus();
    }

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
            enhanceImages(panel);
            addPageNavigation(panel, tabId);
            addCopyButtons(panel);
            panel.scrollTop = 0;
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
                enhanceImages(panel);
                addPageNavigation(panel, tabId);
                addCopyButtons(panel);
                panel.scrollTop = 0;
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
        enhanceImages: enhanceImages,
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
