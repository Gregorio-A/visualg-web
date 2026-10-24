(function () {
    'use strict';

    if (window.renderLucideIcons) window.renderLucideIcons(document);

    var editorPanel = document.getElementById('editorPanel');
    var resizableBlock = editorPanel.closest('.editor-column');
    var resizeHandleVertical = document.getElementById('resizeHandleVertical');
    var resizeHandleHorizontal = document.getElementById('resizeHandleHorizontal');
    var variablesPanel = document.getElementById('variablesPanel');
    var terminalPanel = document.getElementById('terminalPanel');
    var gridContainer = document.querySelector('.ide-shell') || document.querySelector('.grid-container');
    var consolePanelResizer = document.createElement('div');
    consolePanelResizer.id = 'consolePanelResizer';
    consolePanelResizer.className = 'console-panel-resizer';
    consolePanelResizer.setAttribute('role', 'separator');
    consolePanelResizer.setAttribute('aria-label', 'Redimensionar console');
    consolePanelResizer.setAttribute('aria-orientation', 'horizontal');
    consolePanelResizer.setAttribute('aria-controls', 'terminalPanel');
    consolePanelResizer.setAttribute('aria-valuemin', '100');
    consolePanelResizer.tabIndex = 0;
    // The workspace moves the terminal into the editor column after DOMContentLoaded.
    // Keep the divider in that column from startup so it is not stranded in .ide-shell.
    resizableBlock.appendChild(consolePanelResizer);
    var isResizing = false;
    var resizeType = null;
    var startPos = 0;
    var startSize = 0;

    function getEventPos(event, axis) {
        if (event.touches && event.touches.length > 0) {
            return axis === 'x' ? event.touches[0].clientX : event.touches[0].clientY;
        }
        return axis === 'x' ? event.clientX : event.clientY;
    }

    function isMobile() {
        return window.innerWidth <= 768;
    }

    function startResizeVertical(event) {
        event.preventDefault();
        isResizing = true;
        resizeType = 'vertical';
        startPos = getEventPos(event, 'y');
        startSize = resizableBlock.offsetHeight;
        document.body.classList.add('resizing');
        resizeHandleVertical.classList.add('dragging');
    }

    function startResizeHorizontal(event) {
        event.preventDefault();
        isResizing = true;
        resizeType = 'horizontal';
        startPos = getEventPos(event, 'x');
        startSize = resizableBlock.offsetWidth;
        document.body.classList.add('resizing');
        resizeHandleHorizontal.classList.add('dragging');
    }

    function resize(event) {
        if (!isResizing) return;
        event.preventDefault();

        if (resizeType === 'vertical') {
            var newHeight = startSize + getEventPos(event, 'y') - startPos;
            newHeight = Math.max(150, Math.min(window.innerHeight * 0.8, newHeight));
            resizableBlock.style.height = newHeight + 'px';
        } else if (resizeType === 'console-panel') {
            var columnHeight = resizableBlock.clientHeight;
            var tabHeight = resizableBlock.querySelector('.tab-bar')?.offsetHeight || 0;
            var maxConsoleHeight = Math.max(100, columnHeight - tabHeight - 112 - consolePanelResizer.offsetHeight);
            var newConsoleHeight = startSize - (getEventPos(event, 'y') - startPos);
            newConsoleHeight = Math.max(100, Math.min(maxConsoleHeight, newConsoleHeight));
            terminalPanel.style.flex = '0 0 ' + newConsoleHeight + 'px';
            consolePanelResizer.setAttribute('aria-valuemax', String(Math.round(maxConsoleHeight)));
            consolePanelResizer.setAttribute('aria-valuenow', String(Math.round(newConsoleHeight)));
        } else if (resizeType === 'horizontal') {
            var containerWidth = gridContainer.offsetWidth;
            var newWidth = startSize + getEventPos(event, 'x') - startPos;
            newWidth = Math.max(200, Math.min(containerWidth - 180, newWidth));
            if (gridContainer.classList.contains('ide-shell')) {
                gridContainer.style.gridTemplateColumns = '42px 250px ' + newWidth + 'px minmax(240px, 1fr)';
            } else {
                resizableBlock.style.width = newWidth + 'px';
                variablesPanel.style.width = containerWidth - newWidth - 15 + 'px';
                terminalPanel.style.width = containerWidth - newWidth - 15 + 'px';
            }
        }

        if (window.VisualGEditor && window.VisualGEditor.instance) {
            window.VisualGEditor.instance.refresh();
        }
    }

    function stopResize() {
        if (!isResizing) return;
        isResizing = false;
        document.body.classList.remove('resizing');
        resizeHandleVertical.classList.remove('dragging');
        resizeHandleHorizontal.classList.remove('dragging');
        consolePanelResizer.classList.remove('dragging');
        resizeType = null;
    }

    function startResizeConsolePanel(event) {
        if (!resizableBlock.classList.contains('console-panel-visible')) return;
        event.preventDefault();
        isResizing = true;
        resizeType = 'console-panel';
        startPos = getEventPos(event, 'y');
        startSize = terminalPanel.offsetHeight;
        document.body.classList.add('resizing');
        consolePanelResizer.classList.add('dragging');
        consolePanelResizer.setAttribute('aria-valuenow', String(Math.round(startSize)));
        if (consolePanelResizer.setPointerCapture && event.pointerId !== undefined) consolePanelResizer.setPointerCapture(event.pointerId);
    }

    function resizeConsolePanelByKeyboard(event) {
        if (!resizableBlock.classList.contains('console-panel-visible')) return;
        if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
        event.preventDefault();
        var columnHeight = resizableBlock.clientHeight;
        var tabHeight = resizableBlock.querySelector('.tab-bar')?.offsetHeight || 0;
        var maxConsoleHeight = Math.max(100, columnHeight - tabHeight - 112 - consolePanelResizer.offsetHeight);
        var currentHeight = terminalPanel.offsetHeight;
        var step = event.shiftKey ? 48 : 16;
        var nextHeight = Math.max(100, Math.min(maxConsoleHeight, currentHeight + (event.key === 'ArrowUp' ? step : -step)));
        terminalPanel.style.flex = '0 0 ' + nextHeight + 'px';
        consolePanelResizer.setAttribute('aria-valuemax', String(Math.round(maxConsoleHeight)));
        consolePanelResizer.setAttribute('aria-valuenow', String(Math.round(nextHeight)));
        if (window.VisualGEditor && window.VisualGEditor.instance) window.VisualGEditor.instance.refresh();
    }

    resizeHandleVertical.addEventListener('mousedown', startResizeVertical);
    resizeHandleVertical.addEventListener('touchstart', startResizeVertical, { passive: false });
    resizeHandleHorizontal.addEventListener('mousedown', startResizeHorizontal);
    consolePanelResizer.addEventListener('pointerdown', startResizeConsolePanel);
    consolePanelResizer.addEventListener('keydown', resizeConsolePanelByKeyboard);
    document.addEventListener('mousemove', resize);
    document.addEventListener('pointermove', resize);
    document.addEventListener('mouseup', stopResize);
    document.addEventListener('pointerup', stopResize);
    document.addEventListener('pointercancel', stopResize);
    document.addEventListener('touchmove', resize, { passive: false });
    document.addEventListener('touchend', stopResize);
    document.addEventListener('touchcancel', stopResize);

    window.addEventListener('resize', function () {
        if (isMobile()) {
            resizableBlock.style.width = '';
            variablesPanel.style.width = '';
            terminalPanel.style.width = '';
        } else {
            resizableBlock.style.height = '';
        }
        if (window.VisualGEditor && window.VisualGEditor.instance) {
            window.VisualGEditor.instance.refresh();
        }
    });
    if (window.VisualGAppBoot) window.VisualGAppBoot.ready('layout');
})();
