// Daily content uses the existing site's HTTP Date header when available.
// file:// (Electron/offline) and servers without Date fall back to local time.
(function () {
    'use strict';

    var referenceTime = Date.now();
    var referenceTick = performance.now();
    var source = 'local';
    var currentKey = '';
    var listeners = new Set();
    var syncing = null;
    var serverDateParts = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit'
    });

    function now() {
        if (source !== 'server') return new Date();
        var instant = new Date(referenceTime + performance.now() - referenceTick);
        var parts = {};
        serverDateParts.formatToParts(instant).forEach(function (part) { parts[part.type] = Number(part.value); });
        return new Date(parts.year, parts.month - 1, parts.day, 12);
    }

    function key(date) {
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var day = String(date.getDate()).padStart(2, '0');
        return date.getFullYear() + '-' + month + '-' + day;
    }

    function notifyIfChanged() {
        var next = key(now());
        if (next === currentKey) return;
        currentKey = next;
        listeners.forEach(function (listener) { listener(now()); });
    }

    function sync() {
        if (syncing) return syncing;
        if (window.location.protocol === 'file:') { notifyIfChanged(); return Promise.resolve(false); }
        var started = performance.now();
        var url = new URL('index.html', document.baseURI);
        url.searchParams.set('challenge-clock', String(Date.now()));
        syncing = fetch(url.href, { method: 'HEAD', cache: 'no-store' })
            .then(function (response) {
                if (!response.ok) throw new Error('Resposta indisponível');
                var timestamp = Date.parse(response.headers.get('Date') || '');
                if (!Number.isFinite(timestamp)) throw new Error('Cabeçalho Date ausente');
                var received = performance.now();
                referenceTime = timestamp + Math.min((received - started) / 2, 1500);
                referenceTick = received;
                source = 'server';
                notifyIfChanged();
                return true;
            })
            .catch(function () {
                if (source !== 'server') notifyIfChanged();
                return false;
            })
            .finally(function () { syncing = null; });
        return syncing;
    }

    currentKey = key(now());
    window.VisualGChallengeClock = {
        now: now,
        dateKey: function () { return key(now()); },
        source: function () { return source; },
        sync: sync,
        subscribe: function (listener) {
            listeners.add(listener);
            return function () { listeners.delete(listener); };
        }
    };
    window.setInterval(notifyIfChanged, 15000);
    document.addEventListener('visibilitychange', function () { if (!document.hidden) sync(); });
    sync();
})();
