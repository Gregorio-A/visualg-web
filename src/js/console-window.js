(function () {
    'use strict';
    var parent = window.opener;
    if (!parent) return;
    function send(type, value) { parent.postMessage({ type: type, value: value }, window.location.origin === 'null' ? '*' : window.location.origin); }
    window.addEventListener('message', function (event) {
        if (event.source !== parent || event.origin !== window.location.origin || !event.data || event.data.type !== 'visualg-console') return;
        document.getElementById('output').textContent = event.data.output || '';
        if (event.data.colors) {
            var colors = event.data.colors; var style = document.body.style;
            style.setProperty('--console-background', colors.background);
            style.setProperty('--console-panel', colors.panel);
            style.setProperty('--console-foreground', colors.foreground);
            style.setProperty('--console-border', colors.border);
        }
        if (event.data.fontSize) document.getElementById('output').style.fontSize = event.data.fontSize + 'px';
        if (['jetbrains', 'fira-code', 'ibm-plex', 'system'].includes(event.data.fontFamily)) document.body.dataset.consoleFont = event.data.fontFamily;
        var form = document.getElementById('input-form'); form.classList.toggle('visible', !!event.data.inputNeeded);
        if (event.data.inputNeeded) document.getElementById('input').focus();
    });
    document.getElementById('input-form').addEventListener('submit', function (event) {
        event.preventDefault(); var input = document.getElementById('input'); send('visualg-console-input', input.value); input.value = '';
    });
    document.getElementById('stop').addEventListener('click', function () { send('visualg-console-stop'); });
    document.getElementById('back').addEventListener('click', function () { send('visualg-console-editor'); window.close(); });
    send('visualg-console-ready');
})();
