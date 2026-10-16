(function () {
    'use strict';
    var parent = window.opener;
    if (!parent) return;
    var focusRequested = false;
    function send(type, value) { parent.postMessage({ type: type, value: value }, window.location.origin === 'null' ? '*' : window.location.origin); }
    window.addEventListener('message', function (event) {
        if (event.source !== parent || event.origin !== window.location.origin || !event.data || event.data.type !== 'visualg-console') return;
        document.getElementById('output').textContent = event.data.output || '';
        if (event.data.colors) {
            var colors = event.data.colors; var style = document.body.style;
            style.setProperty('--console-background', colors.background);
            style.setProperty('--console-panel', colors.panel);
            style.setProperty('--console-foreground', colors.foreground);
            style.setProperty('--console-output', colors.output || colors.foreground);
            style.setProperty('--console-border', colors.border);
        }
        if (event.data.fontSize) document.getElementById('output').style.fontSize = event.data.fontSize + 'px';
        if (['jetbrains', 'fira-code', 'ibm-plex', 'system'].includes(event.data.fontFamily)) document.body.dataset.consoleFont = event.data.fontFamily;
        var form = document.getElementById('input-form'); form.classList.toggle('visible', !!event.data.inputNeeded);
        document.getElementById('stop').disabled = !event.data.running;
        if (event.data.inputNeeded && (focusRequested || document.hasFocus())) {
            document.getElementById('input').focus();
            focusRequested = false;
        }
    });
    document.addEventListener('click', function (event) {
        if (event.target.closest('button, input, a')) return;
        focusRequested = true;
        send('visualg-console-focus');
        var form = document.getElementById('input-form');
        if (form.classList.contains('visible')) document.getElementById('input').focus();
    });
    window.addEventListener('focus', function () { send('visualg-console-focus'); });
    window.addEventListener('blur', function () { send('visualg-console-blur'); });
    document.getElementById('input-form').addEventListener('submit', function (event) {
        event.preventDefault(); var input = document.getElementById('input'); send('visualg-console-input', input.value); input.value = '';
    });
    document.getElementById('stop').textContent = 'Parar execução';
    document.getElementById('stop').setAttribute('aria-label', 'Parar execução');
    document.getElementById('stop').addEventListener('click', function () { send('visualg-console-stop'); });
    document.getElementById('back').addEventListener('click', function () { send('visualg-console-editor'); window.close(); });
    send('visualg-console-ready');
})();
