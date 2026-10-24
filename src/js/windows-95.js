(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var chrome = document.querySelector('.win95-chrome');
        var title = document.getElementById('win95-title');
        var status = document.getElementById('win95-status');
        var position = document.getElementById('win95-position');
        var mode = document.getElementById('win95-mode');
        var tabList = document.getElementById('tab-list');
        var menus = Array.from(chrome.querySelectorAll('.win95-menubar details'));

        function closeMenus(except) {
            menus.forEach(function (menu) { if (menu !== except) menu.open = false; });
        }

        function updateTitle() {
            var active = tabList.querySelector('.tab-item.active .tab-name');
            title.textContent = 'VisuAlg Web' + (active ? ' — ' + active.textContent.trim() : '');
        }

        function updatePosition() {
            var cm = window.VisualGEditor && window.VisualGEditor.instance;
            if (!cm) return;
            var cursor = cm.getCursor();
            position.textContent = 'Linha ' + (cursor.line + 1) + ', Coluna ' + (cursor.ch + 1);
            mode.textContent = cm.getOption('overwrite') ? 'SOB' : 'INS';
        }

        chrome.addEventListener('click', function (event) {
            var button = event.target.closest('button[data-win95-target],button[data-win95-command]');
            if (!button) return;
            closeMenus();
            if (button.dataset.win95Target) {
                var original = document.getElementById(button.dataset.win95Target);
                if (original && !original.disabled) original.click();
                if (button.dataset.win95Target === 'btn-scale') {
                    var palette = document.getElementById('workspace-theme-menu');
                    if (palette && !palette.classList.contains('is-closing')) {
                        palette.style.left = Math.max(4, Math.min(button.getBoundingClientRect().left, window.innerWidth - palette.offsetWidth - 4)) + 'px';
                    }
                }
            } else {
                var cm = window.VisualGEditor && window.VisualGEditor.instance;
                if (cm) { cm.focus(); cm.execCommand(button.dataset.win95Command); }
            }
        });

        menus.forEach(function (menu) {
            menu.addEventListener('toggle', function () { if (menu.open) closeMenus(menu); });
        });
        document.addEventListener('pointerdown', function (event) {
            if (!event.target.closest('.win95-menubar')) closeMenus();
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') closeMenus();
        });
        document.addEventListener('visualg:status', function (event) { status.textContent = event.detail.text; });
        document.addEventListener('visualg:tab-switched', updateTitle);
        new MutationObserver(updateTitle).observe(tabList, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['class'] });
        updateTitle();
        var cm = window.VisualGEditor && window.VisualGEditor.instance;
        if (cm) {
            cm.on('cursorActivity', updatePosition);
            cm.on('overwriteToggle', updatePosition);
            updatePosition();
        }
    });
})();
