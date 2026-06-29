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
            '// Disciplina: Algoritmos\n' +
            '// Professor: Murilo Gregorio Alves\n' +
            '// Descri\u00e7\u00e3o: Descreva o que o algoritmo faz\n' +
            '// Autor(a): Nome do(a) aluno(a)\n' +
            '// Data: ' + getDataAtual() + '\n' +
            '\n' +
            'Var\n' +
            '// Se\u00e7\u00e3o de Declara\u00e7\u00f5es das vari\u00e1veis\n' +
            '\n' +
            '\n' +
            'Inicio\n' +
            '// Se\u00e7\u00e3o de Comandos\n' +
            '\n' +
            '\n' +
            '\n' +
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
            { regex: /"(?:[^"\\]|\\.)*"/, token: 'string' },
            // Assignment operator
            { regex: /<-|:=/, token: 'operator' },
            // Comparison operators (multi-char)
            { regex: /<=|>=|<>/, token: 'operator' },
            // Keywords (case-insensitive)
            {
                regex: wordBoundaryRegex('algoritmo|var|inicio|início|fimalgoritmo|se|entao|então|senao|senão|fimse|enquanto|faca|faça|fimenquanto|para|de|ate|até|passo|fimpara|repita|fimrepita|escolha|caso|outrocaso|fimescolha|escreva|escreval|leia|procedimento|fimprocedimento|funcao|fimfuncao|retorne|interrompa|limpatela|pausa|debug|eco|cronometro|timer|aleatorio|arquivo'),
                token: 'keyword'
            },
            // Data types
            { regex: wordBoundaryRegex('inteiro|real|caractere|logico|lógico|vetor'), token: 'type' },
            // Boolean literals
            { regex: wordBoundaryRegex('verdadeiro|falso'), token: 'atom' },
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
            { regex: /[+\-*\/\\^=<>(),:\[\]]/, token: null },
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
    var _guideColors = null;

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
                    'Shift-Tab': 'indentLess',
                    'Cmd-/': 'toggleComment',
                    'Ctrl-/': 'toggleComment'
                },
                value: DEFAULT_PROGRAM
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

        highlightLine: function (lineNumber) {
            this.clearHighlight();
            if (lineNumber >= 0) {
                highlightedLine = lineNumber;
                this.instance.addLineClass(lineNumber, 'background', 'cm-highlight-line');
                this.instance.scrollIntoView({ line: lineNumber, ch: 0 }, 50);
            }
        },

        clearHighlight: function () {
            if (highlightedLine !== null) {
                this.instance.removeLineClass(highlightedLine, 'background', 'cm-highlight-line');
                highlightedLine = null;
            }
        }
    };
})();
