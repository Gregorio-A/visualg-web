(function () {
    'use strict';

    if (window.lucide) window.lucide.createIcons();

    var editorPanel = document.getElementById('editorPanel');
    var resizableBlock = editorPanel.closest('.editor-column');
    var resizeHandleVertical = document.getElementById('resizeHandleVertical');
    var resizeHandleHorizontal = document.getElementById('resizeHandleHorizontal');
    var variablesPanel = document.getElementById('variablesPanel');
    var terminalPanel = document.getElementById('terminalPanel');
    var gridContainer = document.querySelector('.grid-container');
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
        } else if (resizeType === 'horizontal') {
            var containerWidth = gridContainer.offsetWidth;
            var newWidth = startSize + getEventPos(event, 'x') - startPos;
            newWidth = Math.max(200, Math.min(containerWidth - 180, newWidth));
            resizableBlock.style.width = newWidth + 'px';
            variablesPanel.style.width = containerWidth - newWidth - 15 + 'px';
            terminalPanel.style.width = containerWidth - newWidth - 15 + 'px';
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
        resizeType = null;
    }

    resizeHandleVertical.addEventListener('mousedown', startResizeVertical);
    resizeHandleVertical.addEventListener('touchstart', startResizeVertical, { passive: false });
    resizeHandleHorizontal.addEventListener('mousedown', startResizeHorizontal);
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
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
})();
