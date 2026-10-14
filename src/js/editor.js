// ============================================
// VisuAlg Web IDE - Editor (CodeMirror 5)
// ============================================

(function () {
    'use strict';

    function getDataAtual() {
        var d = new Date();
        var dd = String(d.getDate()).padStart(2, '0');
        var mm = String(d.getMonth() + 1).padStart(2, '0');
        var yyyy = d.getFullYear();
        return dd + '/' + mm + '/' + yyyy;
    }

    window.gerarTemplate = function () {
        return 'Algoritmo "MeuAlgoritmo"\n' +
            '\n' +
            // '// Disciplina: Algoritmos\n' +
            // '// Professor: Murilo Gregorio Alves\n' +
            // '// Descri\u00e7\u00e3o: Descreva o que o algoritmo faz\n' +
            '// Autor(a): \n' +
            '// Descri\u00e7\u00e3o: \n' +
            '// Data: ' + getDataAtual() + '\n' +
            
            '\n' +
            'Var\n' +
            '  // Se\u00e7\u00e3o de Declara\u00e7\u00f5es das vari\u00e1veis\n' +
            '  \n' +
            '  \n' +
            'Inicio\n' +
            '  // Se\u00e7\u00e3o de Comandos\n' +
            '  \n' +
            '  \n' +
            'fimalgoritmo';
    };

    var DEFAULT_PROGRAM = window.gerarTemplate();

    // Word boundary regex that supports accented characters (JS \b only works with ASCII)
    var ACCENT_CHARS = 'áàâãéèêíìîóòôõúùûçÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ';
    function wordBoundaryRegex(pattern) {
        var wb = 'a-zA-Z0-9_' + ACCENT_CHARS;
        return new RegExp('(?<![' + wb + '])(?:' + pattern + ')(?![' + wb + '])', 'i');
    }

    // Define VisuAlg syntax mode
    CodeMirror.defineSimpleMode('visualg', {
        start: [
            // Block comments { }
            { regex: /\{/, token: 'comment', push: 'comment_block' },
            // Line comments
            { regex: /\/\/.*/, token: 'comment' },
            // Strings
            { regex: /"(?:[^"\\]|\\.|"")*"/, token: 'string' },
            { regex: /"[^"\n]*$/, token: 'error' },
            // Input/output and execution commands
            { regex: wordBoundaryRegex('escreval|escreva|leia|limpatela|pausa|interrompa|retorne|debug|eco|cronometro|cronômetro|timer|aleatorio|aleatório|arquivo'), token: 'command' },
            // Assignment operator
            { regex: /<-|:=/, token: 'operator' },
            // Comparison operators (multi-char)
            { regex: /<=|>=|<>/, token: 'operator' },
            // Keywords (case-insensitive)
            {
                regex: wordBoundaryRegex('algoritmo|var|declare|inicio|início|fimalgoritmo|se|entao|então|senao|senão|fimse|enquanto|faca|faça|fimenquanto|para|de|ate|até|passo|fimpara|repita|fimrepita|escolha|caso|outrocaso|fimescolha|procedimento|fimprocedimento|funcao|função|fimfuncao'),
                token: 'keyword'
            },
            // Data types
            { regex: wordBoundaryRegex('inteiro|real|numerico|numérico|literal|caractere|caracter|caráter|logico|lógico|vetor'), token: 'type' },
            // Boolean literals
            { regex: wordBoundaryRegex('verdadeiro|falso|on|off'), token: 'atom' },
            // Logical and special operators
            { regex: wordBoundaryRegex('e|ou|nao|não|xou|mod|div'), token: 'operator' },
            // Built-in functions
            {
                regex: /\b(?:abs|quad|raizq|exp|log|logn|sen|cos|tan|cotan|arcsen|arccos|arctan|grauprad|radpgrau|int|pi|rand|randi|compr|copia|maiusc|minusc|asc|carac|pos|caracpnum|numpcarac)\b/i,
                token: 'builtin'
            },
            // Numbers
            { regex: /\d+(\.\d+)?/, token: 'number' },
            // Identifiers
            { regex: /[a-zA-ZáàâãéèêíìîóòôõúùûçÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ_][\wáàâãéèêíìîóòôõúùûçÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ]*/, token: 'variable-2' },
            // Operators
            { regex: /[+\-*\/\\^=<>]/, token: 'operator' },
            { regex: /[(),:\[\]]/, token: 'punctuation' },
            // Range operator
            { regex: /\.\./, token: 'operator' }
        ],
        comment_block: [
            { regex: /.*?\}/, token: 'comment', pop: true },
            { regex: /.*/, token: 'comment' }
        ],
        meta: {
            lineComment: '//'
        }
    });

    var highlightedLine = null;
    var highlightedLineClass = null;
    var debugLine = null;
    var _guideColors = null;
    var completions = [
        { label:'escreva', insert:'escreva()', cursor:8, detail:'Exibe texto ou valores na mesma linha' },
        { label:'escreval', insert:'escreval()', cursor:9, detail:'Exibe texto ou valores e pula uma linha' },
        { label:'leia', insert:'leia()', cursor:5, detail:'Lê um valor para uma variável' },
        { label:'se', insert:'se  entao\n  \nfimse', cursor:3, detail:'Inicia uma condição' },
        { label:'enquanto', insert:'enquanto  faca\n  \nfimenquanto', cursor:10, detail:'Repete enquanto a condição for verdadeira' },
        { label:'para', insert:'para  de  ate  faca\n  \nfimpara', cursor:5, detail:'Repete usando um contador' },
        { label:'repita', insert:'repita\n  \nate ', cursor:9, detail:'Repete até a condição ser verdadeira' },
        { label:'escolha', insert:'escolha \n  caso \n    \nfimescolha', cursor:8, detail:'Escolhe entre casos' },
        { label:'procedimento', insert:'procedimento \ninicio\n  \nfimprocedimento', cursor:13, detail:'Declara um procedimento' },
        { label:'funcao', insert:'funcao : inteiro\ninicio\n  retorne \nfimfuncao', cursor:7, detail:'Declara uma função com retorno inteiro' },
        { label:'limpatela', detail:'Limpa o console' },
        { label:'interrompa', detail:'Sai de um laço de repetição' },
        { label:'algoritmo', insert:'algoritmo ""', cursor:11, detail:'Declara o nome do algoritmo' },
        { label:'var', detail:'Inicia a declaração de variáveis' },
        { label:'inicio', detail:'Inicia os comandos do algoritmo' },
        { label:'fimalgoritmo', detail:'Encerra o algoritmo' },
        { label:'entao' }, { label:'senao' }, { label:'fimse' }, { label:'faca' },
        { label:'fimenquanto' }, { label:'de' }, { label:'ate' }, { label:'passo' },
        { label:'fimpara' }, { label:'escolha' }, { label:'caso' }, { label:'outrocaso' },
        { label:'fimescolha' }, { label:'fimfuncao' },
        { label:'fimprocedimento' }, { label:'inteiro' },
        { label:'real' }, { label:'caractere' }, { label:'logico' },
        { label:'verdadeiro' }, { label:'falso' }
    ];
    ['abs', 'quad', 'raizq', 'sen', 'cos', 'tan', 'int', 'compr', 'maiusc', 'minusc'].forEach(function (name) {
        completions.push({ label:name, insert:name + '()', cursor:name.length + 1, detail:'Função integrada: informe o argumento' });
    });
    var hintMenu = null;
    var hintItems = [];
    var hintIndex = 0;
    var hintStart = null;
    var mobileHintTimer = null;
    var variableSourceCache = null;
    var variableCompletionCache = [];
    var recentPair = null;
    var PAIRS = { '(': ')', '[': ']', '{': '}', '"': '"' };
    var CLOSERS = ')]}';

    var IDENTIFIER_CHARS = 'A-Za-z0-9_' + ACCENT_CHARS;
    var IDENTIFIER_PATTERN = '[A-Za-z_' + ACCENT_CHARS + '][' + IDENTIFIER_CHARS + ']*';
    var DECLARED_NAMES_PATTERN = '(' + IDENTIFIER_PATTERN + '(?:\\s*,\\s*' + IDENTIFIER_PATTERN + ')*)';
    var VARIABLE_TYPE_PATTERN = '(?:inteiro|real|numerico|numérico|caractere|caracter|caráter|literal|logico|lógico|vetor)';

    function addDeclaredNames(group, result, seen) {
        group.split(',').forEach(function (rawName) {
            var name = rawName.trim();
            var key = name.toLocaleLowerCase('pt-BR');
            if (name && !seen[key]) {
                seen[key] = true;
                result.push(name);
            }
        });
    }

    function getDeclaredVariables(cm) {
        var source = cm.getValue();
        if (source === variableSourceCache) return variableCompletionCache;

        var variables = [];
        var seen = {};
        var declarationPattern = new RegExp('^\\s*' + DECLARED_NAMES_PATTERN + '\\s*:\\s*' + VARIABLE_TYPE_PATTERN + '(?![' + IDENTIFIER_CHARS + '])', 'i');
        var headerPattern = new RegExp('^\\s*(?:procedimento|funcao|função)\\s+' + IDENTIFIER_PATTERN + '\\s*\\((.*)\\)', 'i');

        source.split('\n').forEach(function (sourceLine) {
            var line = sourceLine.replace(/\/\/.*$/, '');
            var declaration = declarationPattern.exec(line);
            if (declaration) addDeclaredNames(declaration[1], variables, seen);

            var header = headerPattern.exec(line);
            if (!header) return;
            var parameterPattern = new RegExp('(?:^|[;,])\\s*(?:var\\s+)?' + DECLARED_NAMES_PATTERN + '\\s*:\\s*' + VARIABLE_TYPE_PATTERN + '(?![' + IDENTIFIER_CHARS + '])', 'gi');
            var parameter;
            while ((parameter = parameterPattern.exec(header[1]))) addDeclaredNames(parameter[1], variables, seen);
        });

        variableSourceCache = source;
        variableCompletionCache = variables;
        return variables;
    }

    function usesMobileAutocomplete() {
        return window.innerWidth <= 760 || (window.innerWidth <= 950 && window.innerHeight <= 500);
    }
    function publishMobileHints() {
        document.dispatchEvent(new window.CustomEvent('visualg:autocomplete-suggestions', { detail: { items: hintItems.slice(), selectedIndex: hintIndex } }));
    }
    function closeHints() {
        if (hintMenu) hintMenu.remove();
        hintMenu = null;
        hintItems = [];
        hintStart = null;
        publishMobileHints();
    }
    function acceptHint(cm) {
        if (!hintItems.length || !hintStart) return false;
        var entry = hintItems[hintIndex];
        var cursor = cm.getCursor();
        var insert = entry.insert || entry.label;
        var offset = entry.cursor;
        if (insert.endsWith('()') && cm.getLine(cursor.line).charAt(cursor.ch) === '(') {
            insert = entry.label;
            offset = insert.length + 1;
        }
        var start = hintStart;
        if (insert.indexOf('\n') !== -1) {
            var indentation = /^\s*/.exec(cm.getLine(start.line))[0];
            if (start.ch >= indentation.length) {
                if (offset !== undefined) offset = insert.slice(0, offset).replace(/\n/g, '\n' + indentation).length;
                insert = insert.replace(/\n/g, '\n' + indentation);
            }
        }
        cm.operation(function () {
            cm.replaceRange(insert, start, cursor);
            if (offset !== undefined) {
                var prefix = insert.slice(0, offset).split('\n');
                cm.setCursor({ line:start.line + prefix.length - 1, ch:(prefix.length === 1 ? start.ch + offset : prefix[prefix.length - 1].length) });
            }
        });
        closeHints(); return true;
    }
    function showHints(cm, explicit) {
        closeHints();
        var cursor = cm.getCursor(); var before = cm.getLine(cursor.line).slice(0, cursor.ch);
        if (/comment|string/.test(cm.getTokenTypeAt(cursor) || '')) return false;
        var match = /[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ0-9_]*$/.exec(before);
        if (!match && !explicit) return false;
        if (match && !explicit && match[0].length < (usesMobileAutocomplete() ? 1 : 2)) return false;
        var word = match ? match[0].toLocaleLowerCase('pt-BR') : '';
        var candidates = getDeclaredVariables(cm).map(function (name) { return { label:name, detail:'Variável declarada' }; }).concat(completions);
        var seen = {};
        hintItems = candidates.filter(function (entry) {
            var normalized = entry.label.toLocaleLowerCase('pt-BR');
            if (!normalized.startsWith(word) || normalized === word || seen[normalized]) return false;
            seen[normalized] = true;
            return true;
        }).slice(0, 8);
        if (!hintItems.length) return false;
        hintStart = { line: cursor.line, ch: cursor.ch - (match ? match[0].length : 0) }; hintIndex = 0;
        if (usesMobileAutocomplete()) {
            publishMobileHints();
            return true;
        }
        hintMenu = document.createElement('div'); hintMenu.className = 'visualg-hints'; hintMenu.setAttribute('role', 'listbox');
        hintItems.forEach(function (entry, index) {
            var option = document.createElement('button'); option.type = 'button';
            var name = document.createElement('strong'); name.textContent = entry.insert && entry.insert.endsWith('()') ? entry.insert : entry.label;
            option.appendChild(name);
            var detail = document.createElement('small'); detail.textContent = entry.detail || 'Palavra-chave do VisuAlg'; option.appendChild(detail);
            if (index === 0) option.classList.add('selected');
            option.addEventListener('pointerdown', function (event) { event.preventDefault(); });
            option.addEventListener('click', function () { hintIndex = index; acceptHint(cm); cm.focus(); });
            hintMenu.appendChild(option);
        });
        document.body.appendChild(hintMenu);
        var coords = cm.cursorCoords(cursor, 'window');
        var viewport = window.visualViewport;
        var viewportLeft = viewport ? viewport.offsetLeft : 0;
        var viewportTop = viewport ? viewport.offsetTop : 0;
        var viewportWidth = viewport ? viewport.width : window.innerWidth;
        var viewportHeight = viewport ? viewport.height : window.innerHeight;
        var toolbarSpace = document.body.classList.contains('mobile-editor-focused') ? 52 : 8;
        hintMenu.style.left = Math.max(viewportLeft + 8, Math.min(coords.left, viewportLeft + viewportWidth - hintMenu.offsetWidth - 8)) + 'px';
        hintMenu.style.top = Math.max(viewportTop + 8, Math.min(coords.bottom + 4, viewportTop + viewportHeight - hintMenu.offsetHeight - toolbarSpace)) + 'px';
        return true;
    }
    function moveHint(delta) {
        if (!hintItems.length) return false;
        hintIndex = (hintIndex + delta + hintItems.length) % hintItems.length;
        if (hintMenu) Array.prototype.forEach.call(hintMenu.children, function (item, index) { item.classList.toggle('selected', index === hintIndex); });
        else publishMobileHints();
        return true;
    }

    function scheduleMobileHints(cm) {
        if (!usesMobileAutocomplete()) return;
        window.clearTimeout(mobileHintTimer);
        mobileHintTimer = window.setTimeout(function () {
            if (cm.hasFocus()) showHints(cm, false);
        }, 45);
    }

    function isLiteralContext(tokenType) {
        return /(?:^|\s)(?:comment|string)(?:\s|$)/.test(tokenType);
    }

    function handleDelimiter(cm, character) {
        if (cm.getOption('disableInput') || cm.listSelections().length !== 1 || cm.somethingSelected()) return false;
        var cursor = cm.getCursor();
        var line = cm.getLine(cursor.line) || '';
        var ahead = line.charAt(cursor.ch);
        var tokenType = cm.getTokenTypeAt(cursor) || '';
        var literal = isLiteralContext(tokenType);
        var freshCloser = recentPair && recentPair.line === cursor.line && recentPair.ch === cursor.ch && recentPair.closing === character;
        var shouldSkip = freshCloser || (CLOSERS.includes(character) && !literal) || (character === '"' && /string/.test(tokenType));
        if (ahead === character && shouldSkip) {
            cm.setCursor({ line: cursor.line, ch: cursor.ch + 1 });
            recentPair = null;
            closeHints();
            return true;
        }
        var closing = PAIRS[character];
        if (!closing || literal || character === '"' && line.charAt(cursor.ch - 1) === '\\') return false;
        if (ahead === closing || ahead && !/[\s)\]},;]/.test(ahead)) return false;
        cm.operation(function () {
            cm.replaceSelection(character + closing, 'end', '+input');
            cm.setCursor({ line: cursor.line, ch: cursor.ch + 1 });
        });
        recentPair = { line: cursor.line, ch: cursor.ch + 1, opening: character, closing: closing };
        closeHints();
        return true;
    }

    function deleteFreshPair(cm) {
        if (!recentPair || cm.somethingSelected() || cm.listSelections().length !== 1) return false;
        var cursor = cm.getCursor();
        if (cursor.line !== recentPair.line || cursor.ch !== recentPair.ch) return false;
        var line = cm.getLine(cursor.line) || '';
        if (line.charAt(cursor.ch - 1) !== recentPair.opening || line.charAt(cursor.ch) !== recentPair.closing) return false;
        cm.replaceRange('', { line: cursor.line, ch: cursor.ch - 1 }, { line: cursor.line, ch: cursor.ch + 1 }, '+delete');
        cm.setCursor({ line: cursor.line, ch: cursor.ch - 1 });
        recentPair = null;
        return true;
    }


    function replaceSelection(cm, text, cursorOffset) {
        var selections = cm.listSelections();
        cm.operation(function () {
            cm.replaceSelections(selections.map(function () { return text; }), 'end', '+input');
            if (selections.length === 1 && typeof cursorOffset === 'number') {
                var cursor = cm.getCursor();
                cm.setCursor({ line: cursor.line, ch: Math.max(0, cursor.ch - cursorOffset) });
            }
        });
        cm.focus();
    }

    window.VisualGEditor = {
        instance: null,

        init: function (hostElement) {
            this.instance = CodeMirror(hostElement, {
                mode: 'visualg',
                theme: 'tokyonight',
                lineNumbers: true,
                indentUnit: 2,
                tabSize: 2,
                indentWithTabs: false,
                lineWrapping: false,
                matchBrackets: true,
                styleActiveLine: false,
                extraKeys: {
                    'Ctrl-Space': function (cm) { showHints(cm, true); },
                    'Enter': function (cm) { if (!acceptHint(cm)) cm.execCommand('newlineAndIndent'); },
                    'Tab': function (cm) {
                        if (cm.somethingSelected()) { closeHints(); cm.execCommand('indentMore'); }
                        else if (!acceptHint(cm)) cm.execCommand('insertSoftTab');
                    },
                    'Esc': function () { closeHints(); },
                    'Down': function (cm) { if (!moveHint(1)) cm.execCommand('goLineDown'); },
                    'Up': function (cm) { if (!moveHint(-1)) cm.execCommand('goLineUp'); },
                    'Shift-Tab': 'indentLess',
                    'Ctrl-]': 'indentMore',
                    'Ctrl-[': 'indentLess',
                    'Cmd-]': 'indentMore',
                    'Cmd-[': 'indentLess',
                    'Backspace': function (cm) { return deleteFreshPair(cm) ? undefined : CodeMirror.Pass; },
                    'Cmd-/': 'toggleComment',
                    'Ctrl-/': 'toggleComment'
                },
                value: DEFAULT_PROGRAM
            });
            var cm = this.instance;
            cm.getInputField().addEventListener('beforeinput', function (event) {
                if (!event.cancelable || event.isComposing) return;
                if (event.inputType === 'deleteContentBackward' && deleteFreshPair(cm)) event.preventDefault();
                else if (event.inputType === 'insertText' && event.data && event.data.length === 1 && handleDelimiter(cm, event.data)) event.preventDefault();
            });
            this.instance.on('inputRead', function (cm) {
                if (usesMobileAutocomplete()) scheduleMobileHints(cm);
                else showHints(cm, false);
            });
            this.instance.on('change', function (cm, change) {
                recentPair = null;
                if (usesMobileAutocomplete() && change && change.origin !== 'setValue') scheduleMobileHints(cm);
            });
            this.instance.getInputField().addEventListener('compositionend', function () { scheduleMobileHints(window.VisualGEditor.instance); });
            this.instance.getInputField().addEventListener('input', function () { scheduleMobileHints(window.VisualGEditor.instance); });
            this.instance.on('blur', function (cm) {
                window.setTimeout(function () { if (!cm.hasFocus()) closeHints(); }, 180);
            });

            this.instance.on('renderLine', function (cm, line, el) {
                if (!_guideColors) {
                    el.style.backgroundImage = '';
                    return;
                }
                var text = line.text;
                var firstNonSpace = text.search(/\S/);
                if (firstNonSpace <= 0) {
                    el.style.backgroundImage = '';
                    return;
                }
                var tabSize = cm.getOption('indentUnit');
                var spaces = CodeMirror.countColumn(text, firstNonSpace, tabSize);
                var levels = Math.floor(spaces / tabSize);
                if (levels <= 0) { el.style.backgroundImage = ''; return; }

                var charWidth = cm.defaultCharWidth();
                var images = [], positions = [], sizes = [];
                for (var j = 1; j < levels; j++) {
                    var x = Math.round(j * tabSize * charWidth);
                    var color = _guideColors[j % _guideColors.length];
                    images.push('linear-gradient(to right,' + color + ' 1px,transparent 1px)');
                    positions.push(x + 'px 0');
                    sizes.push('1px 100%');
                }
                el.style.backgroundImage = images.join(',');
                el.style.backgroundPosition = positions.join(',');
                el.style.backgroundSize = sizes.join(',');
                el.style.backgroundRepeat = 'no-repeat';
            });
        },

        updateGuideColors: function () {
            var style = getComputedStyle(document.documentElement);
            var vars = ['--blue', '--green', '--yellow', '--orange', '--red', '--magenta'];
            _guideColors = vars.map(function (v) {
                var hex = style.getPropertyValue(v).trim();
                var r = parseInt(hex.slice(1, 3), 16);
                var g = parseInt(hex.slice(3, 5), 16);
                var b = parseInt(hex.slice(5, 7), 16);
                return 'rgba(' + r + ',' + g + ',' + b + ',0.25)';
            });
        },

        clearGuideColors: function () {
            _guideColors = null;
        },

        getValue: function () {
            return this.instance.getValue();
        },

        setValue: function (code) {
            this.instance.setValue(code);
        },

        showAutocomplete: function () {
            this.instance.focus();
            return showHints(this.instance, true);
        },

        acceptAutocomplete: function (index) {
            if (typeof index === 'number' && index >= 0 && index < hintItems.length) hintIndex = index;
            var accepted = acceptHint(this.instance);
            this.instance.focus();
            return accepted;
        },

        insertText: function (text) {
            replaceSelection(this.instance, text);
        },

        insertPair: function (pair) {
            var cm = this.instance;
            var selected = cm.getSelection();
            if (selected) {
                cm.replaceSelection(pair.charAt(0) + selected + pair.charAt(1), 'around', '+input');
                cm.focus();
                return;
            }
            if (!handleDelimiter(cm, pair.charAt(0))) replaceSelection(cm, pair.charAt(0));
            cm.focus();
        },

        indent: function () {
            this.instance.execCommand(this.instance.somethingSelected() ? 'indentMore' : 'insertSoftTab');
            this.instance.focus();
        },

        moveCursor: function (direction) {
            this.instance.execCommand(direction < 0 ? 'goCharLeft' : 'goCharRight');
            this.instance.focus();
        },

        highlightLine: function (lineNumber, className) {
            this.clearHighlight();
            if (lineNumber >= 0) {
                highlightedLine = lineNumber;
                highlightedLineClass = className || 'cm-highlight-line';
                this.instance.addLineClass(lineNumber, 'background', highlightedLineClass);
                if (highlightedLineClass === 'cm-debug-line') {
                    debugLine = lineNumber;
                    var marker = document.createElement('span');
                    marker.className = 'debug-current-marker';
                    marker.textContent = '▶';
                    marker.setAttribute('aria-label', 'Linha atual do debugger');
                    this.instance.setGutterMarker(lineNumber, 'debug-current', marker);
                }
                this.instance.scrollIntoView({ line: lineNumber, ch: 0 }, 50);
            }
        },

        revealLocation: function (lineNumber, columnNumber) {
            var line = Math.max(0, (parseInt(lineNumber, 10) || 1) - 1);
            var column = Math.max(0, (parseInt(columnNumber, 10) || 1) - 1);
            var lineText = this.instance.getLine(line) || '';

            column = Math.min(column, lineText.length);
            this.highlightLine(line, 'cm-error-line');
            this.instance.setCursor({ line: line, ch: column });
            this.instance.scrollIntoView({ line: line, ch: column }, 100);
            this.instance.focus();
        },

        clearHighlight: function () {
            if (highlightedLine !== null) {
                this.instance.removeLineClass(highlightedLine, 'background', highlightedLineClass || 'cm-highlight-line');
                highlightedLine = null;
                highlightedLineClass = null;
            }
            if (debugLine !== null) {
                this.instance.setGutterMarker(debugLine, 'debug-current', null);
                debugLine = null;
            }
        }
    };
})();
