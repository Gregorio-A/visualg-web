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
    var _guideColors = null;
    var completions = ['algoritmo', 'var', 'inicio', 'fimalgoritmo', 'escreva', 'escreval', 'leia', 'se', 'entao', 'senao', 'fimse', 'enquanto', 'faca', 'fimenquanto', 'para', 'de', 'ate', 'passo', 'fimpara', 'repita', 'escolha', 'caso', 'outrocaso', 'fimescolha', 'funcao', 'fimfuncao', 'procedimento', 'fimprocedimento', 'inteiro', 'real', 'caractere', 'logico', 'verdadeiro', 'falso'];
    var hintMenu = null;
    var hintItems = [];
    var hintIndex = 0;
    var hintStart = null;

    function closeHints() { if (hintMenu) hintMenu.remove(); hintMenu = null; hintItems = []; }
    function acceptHint(cm) {
        if (!hintMenu || !hintItems.length) return false;
        var cursor = cm.getCursor(); cm.replaceRange(hintItems[hintIndex], hintStart, cursor); closeHints(); return true;
    }
    function showHints(cm, explicit) {
        closeHints();
        var cursor = cm.getCursor(); var before = cm.getLine(cursor.line).slice(0, cursor.ch);
        var match = /[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ0-9_]*$/.exec(before);
        if (!match || (!explicit && match[0].length < 2)) return;
        var word = match[0].toLocaleLowerCase('pt-BR');
        hintItems = completions.filter(function (entry) { return entry.startsWith(word) && entry !== word; }).slice(0, 8);
        if (!hintItems.length) return;
        hintStart = { line: cursor.line, ch: cursor.ch - match[0].length }; hintIndex = 0;
        hintMenu = document.createElement('div'); hintMenu.className = 'visualg-hints'; hintMenu.setAttribute('role', 'listbox');
        hintItems.forEach(function (entry, index) {
            var option = document.createElement('button'); option.type = 'button'; option.textContent = entry;
            if (index === 0) option.classList.add('selected');
            option.addEventListener('mousedown', function (event) { event.preventDefault(); hintIndex = index; acceptHint(cm); cm.focus(); });
            hintMenu.appendChild(option);
        });
        document.body.appendChild(hintMenu);
        var coords = cm.cursorCoords(cursor, 'page');
        hintMenu.style.left = Math.max(0, Math.min(coords.left, window.innerWidth - 200)) + 'px';
        hintMenu.style.top = Math.min(coords.bottom + 4, window.innerHeight - hintMenu.offsetHeight - 8) + 'px';
    }
    function moveHint(delta) {
        if (!hintMenu) return false;
        hintIndex = (hintIndex + delta + hintItems.length) % hintItems.length;
        Array.prototype.forEach.call(hintMenu.children, function (item, index) { item.classList.toggle('selected', index === hintIndex); });
        return true;
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
                autoCloseBrackets: true,
                styleActiveLine: true,
                extraKeys: {
                    'Ctrl-Space': function (cm) { showHints(cm, true); },
                    'Enter': function (cm) { if (!acceptHint(cm)) cm.execCommand('newlineAndIndent'); },
                    'Tab': function (cm) { if (!acceptHint(cm)) cm.execCommand('insertSoftTab'); },
                    'Esc': function () { closeHints(); },
                    'Down': function (cm) { if (!moveHint(1)) cm.execCommand('goLineDown'); },
                    'Up': function (cm) { if (!moveHint(-1)) cm.execCommand('goLineUp'); },
                    'Shift-Tab': 'indentLess',
                    'Cmd-/': 'toggleComment',
                    'Ctrl-/': 'toggleComment'
                },
                value: DEFAULT_PROGRAM
            });
            this.instance.on('inputRead', function (cm) { showHints(cm, false); });
            this.instance.on('blur', function () { window.setTimeout(closeHints, 150); });

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

        highlightLine: function (lineNumber, className) {
            this.clearHighlight();
            if (lineNumber >= 0) {
                highlightedLine = lineNumber;
                highlightedLineClass = className || 'cm-highlight-line';
                this.instance.addLineClass(lineNumber, 'background', highlightedLineClass);
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
        }
    };
})();
