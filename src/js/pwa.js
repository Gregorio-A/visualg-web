// ============================================
// VisuAlg Web - PWA installation and updates
// ============================================

(function () {
    'use strict';

    if (!/^https?:$/.test(window.location.protocol)) return;

    var installPrompt = null;
    var installButton = null;

    function setInstallButtonVisible(visible) {
        if (!installButton) installButton = document.getElementById('mobile-install-app');
        if (installButton) installButton.hidden = !visible;
    }

    window.addEventListener('beforeinstallprompt', function (event) {
        event.preventDefault();
        installPrompt = event;
        setInstallButtonVisible(true);
    });

    window.addEventListener('appinstalled', function () {
        installPrompt = null;
        setInstallButtonVisible(false);
    });

    document.addEventListener('DOMContentLoaded', function () {
        installButton = document.getElementById('mobile-install-app');
        if (!installButton) return;

        installButton.addEventListener('click', function () {
            if (!installPrompt) return;

            installPrompt.prompt();
            installPrompt.userChoice.finally(function () {
                installPrompt = null;
                setInstallButtonVisible(false);
                var mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) mobileMenu.classList.remove('open');
            });
        });
    });

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('sw.js', { scope: './' }).catch(function () {
                // Installation remains available through the manifest if caching is unavailable.
            });
        });
    }
})();
