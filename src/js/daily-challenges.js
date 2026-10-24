(function () {
    'use strict';

    var clock = window.VisualGChallengeClock;
    var entries = null;
    var byDay = new Map();
    var selected = null;
    var shownMonth = null;
    var mountedArticle = null;
    var viewRevision = 0;
    var pendingLevel = null;
    var monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    function dayId(date) {
        return String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    }

    function entryFor(date) {
        // The 365-day collection reuses February 28 on leap day.
        return byDay.get(dayId(date) === '02-29' ? '02-28' : dayId(date));
    }

    function dateLabel(date) {
        return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
    }

    function openDocs() {
        if (window.VisualGWorkspace) window.VisualGWorkspace.showDoc('desafios');
    }

    function action(label, onClick, className) {
        var button = document.createElement('button');
        button.type = 'button';
        button.textContent = label;
        if (className) button.className = className;
        button.addEventListener('click', onClick);
        return button;
    }

    function renderHome() {
        var root = document.getElementById('daily-challenge-home');
        if (!root || !entries) return;
        var today = clock.now();
        var challenge = entryFor(today);
        if (!challenge) return;
        root.replaceChildren();
        var heading = document.createElement('h3'); heading.textContent = 'Desafio do Dia · ' + dateLabel(today);
        root.appendChild(heading);
        ['simples', 'avancado'].forEach(function (level) {
            var row = document.createElement('div'); row.className = 'daily-challenge-home-row';
            var text = document.createElement('span');
            var name = document.createElement('strong'); name.textContent = (level === 'simples' ? 'Simples' : 'Avançado') + ' · ' + challenge[level].titulo;
            var description = document.createElement('small'); description.textContent = challenge[level].enunciado;
            text.append(name, description);
            row.append(text, action('Abrir', function () { selected = new Date(today.getFullYear(), today.getMonth(), today.getDate()); pendingLevel = level; openDocs(); }));
            root.appendChild(row);
        });
        root.hidden = false;
    }

    function renderSidebarLink(list, terms) {
        if (terms.length && !terms.some(function (term) { return 'desafios do dia exercícios prática calendário'.includes(term); })) return;
        var item = action('◆  Desafios do Dia', openDocs, 'doc-item daily-challenge-sidebar-link');
        item.setAttribute('aria-label', 'Abrir Desafios do Dia e calendário');
        list.appendChild(item);
    }

    function visibleRange(today) {
        return { first: new Date(today.getFullYear(), 0, 1), last: new Date(today.getFullYear(), today.getMonth(), today.getDate()) };
    }

    function calendar() {
        var today = clock.now();
        var range = visibleRange(today);
        if (!shownMonth || shownMonth < range.first || shownMonth > range.last) shownMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        var section = document.createElement('section'); section.className = 'daily-challenge-calendar'; section.setAttribute('aria-label', 'Calendário de desafios');
        var bar = document.createElement('div'); bar.className = 'daily-challenge-calendar-header';
        var previous = action('←', function () { shownMonth = new Date(shownMonth.getFullYear(), shownMonth.getMonth() - 1, 1); renderCalendar(); });
        previous.disabled = shownMonth <= range.first;
        var title = document.createElement('strong'); title.textContent = monthNames[shownMonth.getMonth()] + ' de ' + shownMonth.getFullYear();
        var next = action('→', function () { shownMonth = new Date(shownMonth.getFullYear(), shownMonth.getMonth() + 1, 1); renderCalendar(); });
        next.disabled = shownMonth.getFullYear() === today.getFullYear() && shownMonth.getMonth() === today.getMonth();
        bar.append(previous, title, next); section.appendChild(bar);
        var grid = document.createElement('div'); grid.className = 'daily-challenge-calendar-grid';
        ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].forEach(function (name) { var label = document.createElement('span'); label.textContent = name; grid.appendChild(label); });
        var start = new Date(shownMonth.getFullYear(), shownMonth.getMonth(), 1);
        for (var blank = 0; blank < start.getDay(); blank++) grid.appendChild(document.createElement('span'));
        var count = new Date(shownMonth.getFullYear(), shownMonth.getMonth() + 1, 0).getDate();
        for (var day = 1; day <= count; day++) {
            var date = new Date(shownMonth.getFullYear(), shownMonth.getMonth(), day);
            var button = action(String(day), (function (chosen) { return function () { selected = chosen; renderCalendar(); }; })(date));
            var unavailable = date < range.first || date > range.last;
            button.disabled = unavailable;
            button.className = 'daily-challenge-day' + (dayId(date) === dayId(today) && date.getFullYear() === today.getFullYear() ? ' today' : '') + (selected && date.getTime() === selected.getTime() ? ' selected' : '');
            button.setAttribute('aria-label', dateLabel(date) + (unavailable ? ', indisponível' : ', disponível'));
            grid.appendChild(button);
        }
        section.appendChild(grid);
        return section;
    }

    function renderCalendar() {
        if (!mountedArticle || !entries) return;
        viewRevision++;
        var slot = mountedArticle.querySelector('#daily-challenge-interactive');
        if (!slot) return;
        var today = clock.now();
        var range = visibleRange(today);
        if (!selected || selected < range.first || selected > range.last) selected = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        slot.replaceChildren(calendar());
        var entry = entryFor(selected);
        var heading = document.createElement('h2'); heading.textContent = dateLabel(selected);
        slot.appendChild(heading);
        if (!entry) return;
        var choices = document.createElement('div'); choices.className = 'daily-challenge-choices';
        ['simples', 'avancado'].forEach(function (level) {
            var card = document.createElement('section'); card.className = 'daily-challenge-choice';
            var title = document.createElement('h3'); title.textContent = (level === 'simples' ? 'Desafio Simples · ' : 'Desafio Avançado · ') + entry[level].titulo;
            var summary = document.createElement('p'); summary.textContent = entry[level].enunciado;
            card.append(title, summary, action('Abrir desafio', function () { showLevel(level); })); choices.appendChild(card);
        });
        slot.appendChild(choices);
    }

    function showLevel(level) {
        if (!mountedArticle || !entries || !selected) return;
        var revision = ++viewRevision;
        var slot = mountedArticle.querySelector('#daily-challenge-interactive');
        if (!slot) return;
        var row = entryFor(selected);
        slot.replaceChildren(action('← Voltar ao calendário', renderCalendar));
        var heading = document.createElement('h2'); heading.textContent = row[level].titulo;
        var meta = document.createElement('p'); meta.textContent = dateLabel(selected) + ' · ' + (level === 'simples' ? 'Desafio Simples' : 'Desafio Avançado');
        slot.append(heading, meta);
        var pathDay = dayId(selected) === '02-29' ? '02-28' : dayId(selected);
        var parts = pathDay.split('-');
        fetch('desafios/' + parts[0] + '/' + parts[1] + '/' + level + '.md')
            .then(function (response) { if (!response.ok) throw new Error('Material indisponível'); return response.text(); })
            .then(function (markdown) {
                if (revision !== viewRevision || !slot.isConnected) return;
                var solutionStart = markdown.search(/^## Solução\s*$/m);
                var body = solutionStart < 0 ? markdown : markdown.slice(0, solutionStart);
                var content = document.createElement('div'); content.className = 'daily-challenge-content'; content.innerHTML = window.marked.parse(body.replace(/^# [^\n]+\n/, ''));
                slot.appendChild(content);
                if (solutionStart >= 0) {
                    var details = document.createElement('details'); details.className = 'daily-challenge-solution';
                    var summary = document.createElement('summary'); summary.textContent = 'Ver solução';
                    var solution = document.createElement('div'); solution.innerHTML = window.marked.parse(markdown.slice(solutionStart));
                    details.append(summary, solution);
                    var code = solution.querySelector('pre code');
                    if (code) {
                        var commands = document.createElement('div'); commands.className = 'daily-challenge-solution-actions';
                        commands.append(action('Copiar código', function () { navigator.clipboard.writeText(code.textContent); }));
                        commands.append(action('Abrir no editor', function () {
                            if (window.TabManager) window.TabManager.createTab(code.textContent, { fileName: row[level].titulo + '.alg' });
                            if (window.VisualGWorkspace) window.VisualGWorkspace.showEditor();
                        }));
                        details.appendChild(commands);
                    }
                    slot.appendChild(details);
                }
            })
            .catch(function () {
                if (revision !== viewRevision || !slot.isConnected) return;
                var notice = document.createElement('p'); notice.className = 'daily-challenge-unavailable';
                notice.textContent = 'O material completo deste desafio ainda está em revisão.';
                slot.appendChild(notice);
            });
    }

    function mount(article) {
        mountedArticle = article;
        var slot = document.createElement('div'); slot.id = 'daily-challenge-interactive';
        var heading = article.querySelector('h1');
        if (heading) heading.insertAdjacentElement('afterend', slot);
        else article.prepend(slot);
        if (!entries) { slot.textContent = 'Carregando calendário...'; return; }
        renderCalendar();
        if (pendingLevel) { var level = pendingLevel; pendingLevel = null; showLevel(level); }
    }

    window.VisualGDailyChallenges = { mount: mount, renderSidebarLink: renderSidebarLink, open: openDocs };
    clock.subscribe(function () { selected = null; shownMonth = null; renderHome(); renderCalendar(); if (window.VisualGWorkspace) window.VisualGWorkspace.refreshDocs(); });
    fetch('desafios/calendario.json').then(function (response) { if (!response.ok) throw new Error('Calendário indisponível'); return response.json(); })
        .then(function (data) {
            entries = data;
            data.forEach(function (row) { byDay.set(row.dia, row); });
            renderHome(); renderCalendar();
            if (pendingLevel && mountedArticle) { var level = pendingLevel; pendingLevel = null; showLevel(level); }
            if (window.VisualGWorkspace) window.VisualGWorkspace.refreshDocs();
        }).catch(function () {
            var root = document.getElementById('daily-challenge-home');
            if (root) { root.hidden = false; root.textContent = 'Não foi possível carregar os desafios.'; }
        });
})();
