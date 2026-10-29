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
    var browseMode = 'calendar';
    var listQuery = '';
    var listLevel = 'todos';
    var listVisibleCount = 12;
    var followToday = true;
    var previousTodayKey = clock.dateKey();
    var monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    function dayId(date) {
        return String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    }

    function fullDayId(date) {
        return date.getFullYear() + '-' + dayId(date);
    }

    function normalize(value) {
        return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
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
        var header = document.createElement('div'); header.className = 'daily-challenge-home-header';
        var heading = document.createElement('h3'); heading.textContent = 'Desafios do dia';
        var date = document.createElement('time'); date.textContent = dateLabel(today);
        date.dateTime = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
        header.append(heading, date); root.appendChild(header);
        var rows = document.createElement('div'); rows.className = 'daily-challenge-home-list';
        ['simples', 'avancado'].forEach(function (level) {
            var row = document.createElement('div'); row.className = 'daily-challenge-home-row ' + level;
            var text = document.createElement('span');
            var badge = document.createElement('span'); badge.className = 'daily-challenge-level'; badge.textContent = level === 'simples' ? 'Iniciante' : 'Avançado';
            var name = document.createElement('strong'); name.textContent = challenge[level].titulo;
            var description = document.createElement('small'); description.textContent = challenge[level].enunciado;
            text.append(badge, name, description);
            row.append(text, action('Ver desafio →', function () { selected = new Date(today.getFullYear(), today.getMonth(), today.getDate()); pendingLevel = level; openDocs(); }));
            rows.appendChild(row);
        });
        root.appendChild(rows);
        root.appendChild(action('Consultar calendário de desafios →', openDocs, 'daily-challenge-home-calendar'));
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
        var previous = action('←', function () { shownMonth = new Date(shownMonth.getFullYear(), shownMonth.getMonth() - 1, 1); followToday = false; renderCalendar(); });
        previous.setAttribute('aria-label', 'Mês anterior');
        previous.disabled = shownMonth <= range.first;
        var title = document.createElement('strong'); title.textContent = monthNames[shownMonth.getMonth()] + ' de ' + shownMonth.getFullYear();
        var next = action('→', function () { shownMonth = new Date(shownMonth.getFullYear(), shownMonth.getMonth() + 1, 1); followToday = false; renderCalendar(); });
        next.setAttribute('aria-label', 'Próximo mês');
        next.disabled = shownMonth.getFullYear() === today.getFullYear() && shownMonth.getMonth() === today.getMonth();
        bar.append(previous, title, next); section.appendChild(bar);
        var grid = document.createElement('div'); grid.className = 'daily-challenge-calendar-grid';
        ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].forEach(function (name) { var label = document.createElement('span'); label.textContent = name; grid.appendChild(label); });
        var start = new Date(shownMonth.getFullYear(), shownMonth.getMonth(), 1);
        for (var blank = 0; blank < start.getDay(); blank++) grid.appendChild(document.createElement('span'));
        var count = new Date(shownMonth.getFullYear(), shownMonth.getMonth() + 1, 0).getDate();
        for (var day = 1; day <= count; day++) {
            var date = new Date(shownMonth.getFullYear(), shownMonth.getMonth(), day);
            var cell = document.createElement('div'); cell.className = 'daily-challenge-date';
            if (date.getDay() >= 5) cell.classList.add('preview-left');
            var button = action(String(day), (function (chosen) { return function () { selected = chosen; followToday = false; renderCalendar(); }; })(date));
            var unavailable = date < range.first || date > range.last;
            button.disabled = unavailable;
            button.className = 'daily-challenge-day' + (fullDayId(date) === fullDayId(today) ? ' today' : '') + (selected && date.getTime() === selected.getTime() ? ' selected' : '');
            button.setAttribute('aria-pressed', selected && date.getTime() === selected.getTime() ? 'true' : 'false');
            if (fullDayId(date) === fullDayId(today)) button.setAttribute('aria-current', 'date');
            var available = !unavailable && entryFor(date);
            button.setAttribute('aria-label', dateLabel(date) + (available ? ': Iniciante, ' + available.simples.titulo + '; Avançado, ' + available.avancado.titulo : ', indisponível'));
            cell.appendChild(button);
            if (available) {
                var preview = document.createElement('div'); preview.className = 'daily-challenge-day-preview'; preview.setAttribute('role', 'tooltip');
                preview.id = 'daily-preview-' + dayId(date);
                var previewDate = document.createElement('strong'); previewDate.textContent = dateLabel(date);
                var simple = document.createElement('span'); simple.textContent = 'Iniciante · ' + available.simples.titulo;
                var advanced = document.createElement('span'); advanced.textContent = 'Avançado · ' + available.avancado.titulo;
                preview.append(previewDate, simple, advanced); cell.appendChild(preview);
                button.setAttribute('aria-describedby', preview.id);
            }
            grid.appendChild(cell);
        }
        section.appendChild(grid);
        var legend = document.createElement('div'); legend.className = 'daily-challenge-calendar-legend';
        legend.innerHTML = '<span><i class="available"></i>Disponível</span><span><i class="today"></i>Hoje</span><span><i class="selected"></i>Selecionado</span><span><i class="future"></i>Em breve</span>';
        section.appendChild(legend);
        var hint = document.createElement('p'); hint.className = 'daily-challenge-calendar-hint'; hint.textContent = 'Passe o cursor sobre uma data para ver os títulos, ou selecione um dia.';
        section.appendChild(hint);
        return section;
    }

    function renderChallengeList(container) {
        container.replaceChildren();
        var today = clock.now();
        var first = visibleRange(today).first;
        var matches = [];
        var query = normalize(listQuery.trim());
        for (var date = new Date(today.getFullYear(), today.getMonth(), today.getDate()); date >= first; date.setDate(date.getDate() - 1)) {
            var entry = entryFor(date);
            if (!entry) continue;
            var levels = ['simples', 'avancado'].filter(function (level) {
                if (listLevel !== 'todos' && listLevel !== level) return false;
                return !query || normalize(entry.tema + ' ' + entry[level].titulo + ' ' + entry[level].enunciado).includes(query);
            });
            if (levels.length) matches.push({ date: new Date(date), entry: entry, levels: levels });
        }
        var count = document.createElement('p'); count.className = 'daily-challenge-list-count';
        count.textContent = matches.length + (matches.length === 1 ? ' data encontrada' : ' datas encontradas');
        container.appendChild(count);
        if (!matches.length) {
            var empty = document.createElement('p'); empty.className = 'daily-challenge-list-empty';
            empty.textContent = 'Nenhum desafio encontrado. Tente outro título, descrição ou assunto.';
            container.appendChild(empty);
            return;
        }
        matches.slice(0, listVisibleCount).forEach(function (match) {
            var item = document.createElement('section'); item.className = 'daily-challenge-list-item';
            var heading = document.createElement('h3'); heading.textContent = dateLabel(match.date);
            item.appendChild(heading);
            match.levels.forEach(function (level) {
                var row = document.createElement('div'); row.className = 'daily-challenge-list-row';
                var info = document.createElement('div');
                var badge = document.createElement('span'); badge.className = 'daily-challenge-level'; badge.textContent = level === 'simples' ? 'Iniciante' : 'Avançado';
                var title = document.createElement('strong'); title.textContent = match.entry[level].titulo;
                var summary = document.createElement('small'); summary.textContent = match.entry[level].enunciado;
                info.append(badge, title, summary);
                row.append(info, action('Ver desafio →', function () {
                    selected = new Date(match.date); shownMonth = new Date(selected.getFullYear(), selected.getMonth(), 1); followToday = false; showLevel(level);
                }));
                item.appendChild(row);
            });
            container.appendChild(item);
        });
        if (matches.length > listVisibleCount) container.appendChild(action('Carregar mais desafios', function () { listVisibleCount += 12; renderChallengeList(container); }, 'daily-challenge-list-more'));
    }

    function browseToolbar(slot) {
        var toolbar = document.createElement('div'); toolbar.className = 'daily-challenge-browse-toolbar';
        var title = document.createElement('strong'); title.textContent = 'Explorar desafios';
        var modes = document.createElement('div'); modes.className = 'daily-challenge-browse-modes'; modes.setAttribute('role', 'group'); modes.setAttribute('aria-label', 'Modo de exploração');
        [['calendar', 'Calendário'], ['list', 'Lista']].forEach(function (mode) {
            var button = action(mode[1], function () { browseMode = mode[0]; renderCalendar(); });
            button.setAttribute('aria-pressed', browseMode === mode[0] ? 'true' : 'false');
            modes.appendChild(button);
        });
        toolbar.append(title, modes); slot.appendChild(toolbar);
    }

    function renderCalendar() {
        if (!mountedArticle || !entries) return;
        viewRevision++;
        var slot = mountedArticle.querySelector('#daily-challenge-interactive');
        if (!slot) return;
        var today = clock.now();
        var range = visibleRange(today);
        if (!selected || selected < range.first || selected > range.last) selected = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        slot.replaceChildren();
        var lead = document.createElement('p'); lead.className = 'daily-challenge-lead'; lead.textContent = 'Dois desafios por dia: um iniciante e outro avançado. Escolha uma data e comece a praticar.';
        slot.appendChild(lead);
        browseToolbar(slot);
        if (browseMode === 'list') {
            var controls = document.createElement('div'); controls.className = 'daily-challenge-list-controls';
            var search = document.createElement('input'); search.type = 'search'; search.placeholder = 'Buscar por título, descrição ou assunto'; search.setAttribute('aria-label', 'Buscar desafios'); search.value = listQuery;
            var level = document.createElement('select'); level.setAttribute('aria-label', 'Filtrar dificuldade');
            [['todos', 'Todos os níveis'], ['simples', 'Iniciante'], ['avancado', 'Avançado']].forEach(function (choice) {
                var option = document.createElement('option'); option.value = choice[0]; option.textContent = choice[1]; level.appendChild(option);
            });
            level.value = listLevel;
            var results = document.createElement('div'); results.className = 'daily-challenge-list-results';
            search.addEventListener('input', function () { listQuery = search.value; listVisibleCount = 12; renderChallengeList(results); });
            level.addEventListener('change', function () { listLevel = level.value; listVisibleCount = 12; renderChallengeList(results); });
            controls.append(search, level); slot.append(controls, results); renderChallengeList(results);
            return;
        }
        var layout = document.createElement('div'); layout.className = 'daily-challenge-layout';
        layout.appendChild(calendar());
        var entry = entryFor(selected);
        var selection = document.createElement('section'); selection.className = 'daily-challenge-selection';
        var eyebrow = document.createElement('span'); eyebrow.className = 'daily-challenge-eyebrow'; eyebrow.textContent = 'EXERCÍCIOS SELECIONADOS';
        var heading = document.createElement('h2'); heading.textContent = dateLabel(selected);
        selection.append(eyebrow, heading);
        if (fullDayId(selected) !== fullDayId(today) || shownMonth.getMonth() !== today.getMonth()) {
            selection.appendChild(action('Voltar para hoje', function () {
                selected = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                shownMonth = new Date(today.getFullYear(), today.getMonth(), 1); followToday = true; renderCalendar();
            }, 'daily-challenge-today-action'));
        }
        layout.appendChild(selection); slot.appendChild(layout);
        if (!entry) return;
        var choices = document.createElement('div'); choices.className = 'daily-challenge-choices';
        ['simples', 'avancado'].forEach(function (level) {
            var card = document.createElement('section'); card.className = 'daily-challenge-choice ' + level;
            var badge = document.createElement('span'); badge.className = 'daily-challenge-level'; badge.textContent = level === 'simples' ? 'Iniciante' : 'Avançado';
            var title = document.createElement('h3'); title.textContent = entry[level].titulo;
            var summary = document.createElement('p'); summary.textContent = entry[level].enunciado;
            card.append(badge, title, summary, action('Abrir desafio →', function () { showLevel(level); })); choices.appendChild(card);
        });
        selection.appendChild(choices);
    }

    function showLevel(level) {
        if (!mountedArticle || !entries || !selected) return;
        var revision = ++viewRevision;
        var slot = mountedArticle.querySelector('#daily-challenge-interactive');
        if (!slot) return;
        var row = entryFor(selected);
        slot.replaceChildren(action(browseMode === 'list' ? '← Voltar à lista' : '← Voltar ao calendário', renderCalendar));
        var heading = document.createElement('h2'); heading.textContent = row[level].titulo;
        var meta = document.createElement('p'); meta.textContent = dateLabel(selected) + ' · ' + (level === 'simples' ? 'Desafio Iniciante' : 'Desafio Avançado');
        var begin = action('Começar no editor', function () {
            var name = 'desafio-' + dayId(selected).replace('-', '') + '-' + level;
            var code = 'algoritmo "' + name + '"\ninicio\n  // Escreva sua solução aqui.\nfimalgoritmo';
            if (window.TabManager) window.TabManager.createTab(code, { fileName: name + '.alg' });
            if (window.VisualGWorkspace) window.VisualGWorkspace.showEditor();
        }, 'daily-challenge-start');
        slot.append(heading, meta, begin);
        var pathDay = dayId(selected) === '02-29' ? '02-28' : dayId(selected);
        var parts = pathDay.split('-');
        fetch('desafios/' + parts[0] + '/' + parts[1] + '/' + level + '.md')
            .then(function (response) { if (!response.ok) throw new Error('Material indisponível'); return response.text(); })
            .then(function (markdown) {
                if (revision !== viewRevision || !slot.isConnected) return;
                var solutionStart = markdown.search(/^## Solução\s*$/m);
                var body = solutionStart < 0 ? markdown : markdown.slice(0, solutionStart);
                var tipsStart = body.search(/^## Dicas para resolução\s*$/m);
                var introduction = tipsStart < 0 ? body : body.slice(0, tipsStart);
                var content = document.createElement('div'); content.className = 'daily-challenge-content'; content.innerHTML = window.marked.parse(introduction.replace(/^# [^\n]+\n/, '').replace(/\*\*Nível:\*\* Simples/g, '**Nível:** Iniciante'));
                slot.appendChild(content);
                if (tipsStart >= 0) {
                    var tipsContent = document.createElement('div'); tipsContent.innerHTML = window.marked.parse(body.slice(tipsStart));
                    var tipItems = tipsContent.querySelectorAll('li');
                    var tips = document.createElement('section'); tips.className = 'daily-challenge-tips';
                    var tipsHeading = document.createElement('h3'); tipsHeading.textContent = 'Dicas para resolução'; tips.appendChild(tipsHeading);
                    tipItems.forEach(function (item, index) {
                        var tip = document.createElement('details');
                        var label = document.createElement('summary'); label.textContent = 'Dica ' + (index + 1);
                        var text = document.createElement('div'); text.innerHTML = item.innerHTML;
                        tip.append(label, text); tips.appendChild(tip);
                    });
                    slot.appendChild(tips);
                }
                if (solutionStart >= 0) {
                    var details = document.createElement('details'); details.className = 'daily-challenge-solution';
                    var summary = document.createElement('summary'); summary.textContent = 'Ver solução';
                    var confirmation = document.createElement('div'); confirmation.className = 'daily-challenge-solution-confirm';
                    var prompt = document.createElement('p'); prompt.textContent = 'A resposta será exibida. Tente resolver o desafio antes de consultá-la.';
                    var solution = document.createElement('div'); solution.innerHTML = window.marked.parse(markdown.slice(solutionStart)); solution.hidden = true;
                    var reveal = action('Mostrar solução', function () { confirmation.hidden = true; solution.hidden = false; if (commands) commands.hidden = false; });
                    confirmation.append(prompt, reveal); details.append(summary, confirmation, solution);
                    var code = solution.querySelector('pre code');
                    var commands = null;
                    if (code) {
                        commands = document.createElement('div'); commands.className = 'daily-challenge-solution-actions'; commands.hidden = true;
                        commands.append(action('Copiar código', function () { navigator.clipboard.writeText(code.textContent); }));
                        commands.append(action('Abrir no editor', function () {
                            if (window.TabManager) window.TabManager.createTab(code.textContent, { fileName: row[level].titulo + '.alg' });
                            if (window.VisualGWorkspace) window.VisualGWorkspace.showEditor();
                        }));
                        details.appendChild(commands);
                    }
                    details.addEventListener('toggle', function () {
                        if (!details.open) { confirmation.hidden = false; solution.hidden = true; if (commands) commands.hidden = true; }
                    });
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
        article.classList.add('daily-challenges-article');
        var slot = document.createElement('div'); slot.id = 'daily-challenge-interactive';
        var heading = article.querySelector('h1');
        if (heading) heading.insertAdjacentElement('afterend', slot);
        else article.prepend(slot);
        if (!entries) { slot.textContent = 'Carregando calendário...'; return; }
        renderCalendar();
        if (pendingLevel) { var level = pendingLevel; pendingLevel = null; showLevel(level); }
    }

    window.VisualGDailyChallenges = { mount: mount, renderSidebarLink: renderSidebarLink, open: openDocs };
    clock.subscribe(function () {
        var today = clock.now();
        var todayKey = clock.dateKey();
        if (followToday || previousTodayKey.slice(0, 4) !== todayKey.slice(0, 4)) {
            selected = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            shownMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            followToday = true;
        }
        previousTodayKey = todayKey;
        renderHome(); renderCalendar();
        if (window.VisualGWorkspace) window.VisualGWorkspace.refreshDocs();
    });
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
