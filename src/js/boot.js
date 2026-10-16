(function () {
    'use strict';

    document.documentElement.setAttribute('data-app-loading', '');
    window.VisualGAppBoot = (function () {
        var ready = Object.create(null), failed = false, finished = false;
        var startedAt = performance.now();

        function finish() {
            if (finished || failed || !ready.main || !ready.workspace || !ready.layout) return;
            finished = true;
            Promise.resolve(document.fonts ? document.fonts.ready : null).catch(function () {}).then(function () {
                var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                var minimumVisibleMs = reducedMotion ? 500 : 1550;
                window.setTimeout(function () {
                    window.requestAnimationFrame(function () { window.requestAnimationFrame(function () {
                        var root = document.getElementById('app-boot');
                        document.documentElement.removeAttribute('data-app-loading');
                        document.body.classList.add('app-entering');
                        root.classList.add('is-leaving');
                        window.setTimeout(function () { root.hidden = true; root.remove(); document.body.classList.remove('app-entering'); }, reducedMotion ? 220 : 920);
                    }); });
                }, Math.max(0, minimumVisibleMs - (performance.now() - startedAt)));
            });
        }

        function fail() {
            if (finished || failed) return;
            failed = true;
            var message = document.getElementById('app-boot-error');
            var spinner = document.getElementById('app-boot-spinner');
            var reload = document.getElementById('app-boot-reload');
            if (message) { message.hidden = false; message.textContent = 'Não foi possível iniciar a interface. Recarregue o aplicativo para tentar novamente.'; }
            if (spinner) spinner.hidden = true;
            if (reload) reload.hidden = false;
        }

        window.addEventListener('error', fail, { once: true });
        window.addEventListener('unhandledrejection', fail, { once: true });
        return { ready: function (part) { ready[part] = true; finish(); }, fail: fail };
    })();
})();
