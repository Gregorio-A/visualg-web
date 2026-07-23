// Accessibility behavior shared by the web and desktop versions.
(function () {
    'use strict';

    var activeModal = null;
    var returnFocus = null;
    var focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function visible(el) {
        return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
    }

    function getFocusable(container) {
        return Array.prototype.filter.call(container.querySelectorAll(focusableSelector), visible);
    }

    function labelIconButtons(root) {
        root.querySelectorAll('button[title]:not([aria-label])').forEach(function (button) {
            button.setAttribute('aria-label', button.title.replace(/\s*\([^)]*\)\s*$/, ''));
        });
    }

    function prepareModal(overlay, index) {
        var modal = overlay.querySelector('.modal');
        if (!modal) return;
        var heading = modal.querySelector('.modal-header > span, .modal-header > h1, .modal-header > h2');
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        if (heading) {
            if (!heading.id) heading.id = 'modal-title-' + index;
            overlay.setAttribute('aria-labelledby', heading.id);
        } else if (!overlay.hasAttribute('aria-label')) {
            overlay.setAttribute('aria-label', 'Janela de diálogo');
        }
        modal.setAttribute('tabindex', '-1');
        var close = modal.querySelector('.modal-header button');
        if (close && !close.getAttribute('aria-label')) close.setAttribute('aria-label', 'Fechar janela');
    }

    function openModal(overlay) {
        if (activeModal === overlay) return;
        if (!activeModal) returnFocus = document.activeElement;
        activeModal = overlay;
        document.querySelectorAll('body > :not(.modal-overlay):not(script)').forEach(function (el) {
            el.setAttribute('aria-hidden', 'true');
        });
        window.setTimeout(function () {
            var target = overlay.querySelector('[autofocus]') || getFocusable(overlay)[0] || overlay.querySelector('.modal');
            if (target) target.focus();
        }, 0);
    }

    function closedModal(overlay) {
        if (activeModal !== overlay) return;
        var remaining = Array.prototype.find.call(document.querySelectorAll('.modal-overlay:not(.hidden)'), function (item) {
            return item !== overlay;
        });
        activeModal = remaining || null;
        if (activeModal) {
            var next = getFocusable(activeModal)[0] || activeModal.querySelector('.modal');
            if (next) next.focus();
            return;
        }
        document.querySelectorAll('body > [aria-hidden="true"]').forEach(function (el) {
            el.removeAttribute('aria-hidden');
        });
        if (returnFocus && document.contains(returnFocus) && !returnFocus.disabled) returnFocus.focus();
        returnFocus = null;
    }

    function prepareTabs(group, groupIndex) {
        group.setAttribute('role', 'tablist');
        group.querySelectorAll('.modal-tab').forEach(function (tab, index) {
            var panel = tab.closest('.modal').querySelector('[data-tab-panel="' + tab.dataset.tab + '"]');
            var tabId = 'modal-tab-' + groupIndex + '-' + index;
            tab.id = tabId;
            tab.setAttribute('role', 'tab');
            tab.setAttribute('aria-selected', tab.classList.contains('active') ? 'true' : 'false');
            tab.tabIndex = tab.classList.contains('active') ? 0 : -1;
            if (panel) {
                if (!panel.id) panel.id = tabId + '-panel';
                tab.setAttribute('aria-controls', panel.id);
                panel.setAttribute('role', 'tabpanel');
                panel.setAttribute('aria-labelledby', tabId);
            }
        });
        group.addEventListener('keydown', function (event) {
            if (!event.target.matches('.modal-tab') || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
            var tabs = Array.prototype.slice.call(group.querySelectorAll('.modal-tab'));
            var position = tabs.indexOf(event.target);
            if (event.key === 'Home') position = 0;
            else if (event.key === 'End') position = tabs.length - 1;
            else position = (position + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
            event.preventDefault();
            tabs[position].focus();
            tabs[position].click();
        });
    }

    function syncTabs() {
        document.querySelectorAll('.modal-tab').forEach(function (tab) {
            var selected = tab.classList.contains('active');
            tab.setAttribute('aria-selected', selected ? 'true' : 'false');
            tab.tabIndex = selected ? 0 : -1;
            var panel = tab.getAttribute('aria-controls') && document.getElementById(tab.getAttribute('aria-controls'));
            if (panel) panel.hidden = !selected;
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.documentElement.classList.add('a11y-ready');
        document.querySelector('.header-logo img').alt = 'VisuAlg';
        document.querySelector('main').setAttribute('tabindex', '-1');
        document.querySelectorAll('.modal-overlay').forEach(prepareModal);
        document.querySelectorAll('.modal-tabs').forEach(prepareTabs);
        labelIconButtons(document);

        var terminal = document.getElementById('terminal-output');
        terminal.setAttribute('role', 'log');
        terminal.setAttribute('aria-live', 'polite');
        terminal.setAttribute('aria-relevant', 'additions text');
        document.getElementById('compiler-status').setAttribute('role', 'status');
        document.getElementById('compiler-status').setAttribute('aria-live', 'polite');
        document.getElementById('variables-table').setAttribute('aria-label', 'Variáveis do programa');

        var observer = new MutationObserver(function (changes) {
            changes.forEach(function (change) {
                if (change.type === 'attributes' && change.target.classList.contains('modal-overlay')) {
                    if (change.target.classList.contains('hidden')) closedModal(change.target);
                    else openModal(change.target);
                }
            });
            syncTabs();
            labelIconButtons(document);
        });
        document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
            observer.observe(overlay, { attributes: true, attributeFilter: ['class'], subtree: true });
        });
        document.querySelectorAll('.modal-tabs').forEach(function (tabs) {
            observer.observe(tabs, { attributes: true, attributeFilter: ['class'], subtree: true });
        });

        document.addEventListener('keydown', function (event) {
            if (activeModal && event.key === 'Tab') {
                var focusable = getFocusable(activeModal);
                if (!focusable.length) {
                    event.preventDefault();
                    activeModal.querySelector('.modal').focus();
                } else if (event.shiftKey && document.activeElement === focusable[0]) {
                    event.preventDefault(); focusable[focusable.length - 1].focus();
                } else if (!event.shiftKey && document.activeElement === focusable[focusable.length - 1]) {
                    event.preventDefault(); focusable[0].focus();
                }
            }
            if (activeModal || !(event.ctrlKey || event.metaKey)) return;
            var key = event.key.toLowerCase();
            if (key === 's') { event.preventDefault(); document.getElementById('btn-save').click(); }
            if (key === 'o') { event.preventDefault(); document.getElementById('btn-open').click(); }
            if (key === ',') { event.preventDefault(); document.getElementById('btn-settings').click(); }
            if (key === 'enter') { event.preventDefault(); document.getElementById('btn-run').click(); }
        }, true);

        document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(openModal);
    });
})();
