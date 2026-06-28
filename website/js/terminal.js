// ============================================
// VisuAlg Web IDE - Terminal / Console
// ============================================

(function () {
    'use strict';

    window.Terminal = {
        outputEl: null,
        inputArea: null,
        inputEl: null,
        inputResolve: null,
        _modalSubmit: null,
        _modalKeydown: null,

        init: function () {
            this.outputEl = document.getElementById('terminal-output');
            this.inputArea = document.getElementById('terminal-input-area');
            this.inputEl = document.getElementById('terminal-input');

            var self = this;
            document.getElementById('terminal-input-ok').addEventListener('click', function () {
                self.submitInput();
            });
            this.inputEl.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    self.submitInput();
                }
            });
        },

        write: function (text) {
            this.outputEl.textContent += text;
            // Auto-scroll to bottom
            var panel = this.outputEl.closest('.panel-body');
            if (panel) {
                panel.scrollTop = panel.scrollHeight;
            }
        },

        writeln: function (text) {
            this.write(text + '\n');
        },

        readInput: function (prompt) {
            if (prompt) {
                this.write(prompt);
            }

            var mode = localStorage.getItem('visualg-console-input-mode') || 'inline';

            if (mode === 'modal') {
                return this._readInputModal(prompt);
            }
            return this._readInputInline();
        },

        _readInputInline: function () {
            this.inputArea.classList.remove('hidden');
            this.inputEl.value = '';
            this.inputEl.focus();

            var input = this.inputEl;
            setTimeout(function () {
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);

            var self = this;
            return new Promise(function (resolve) {
                self.inputResolve = resolve;
            });
        },

        _readInputModal: function (prompt) {
            var overlay = document.getElementById('consoleInputOverlay');
            var input = document.getElementById('console-input-modal');
            var label = document.getElementById('console-input-modal-label');
            var btnOk = document.getElementById('console-input-modal-ok');

            label.textContent = prompt || 'Digite a entrada:';
            input.value = '';
            overlay.classList.remove('hidden');
            input.focus();

            var self = this;
            return new Promise(function (resolve) {
                self.inputResolve = resolve;

                self._modalSubmit = function () {
                    var val = input.value;
                    overlay.classList.add('hidden');
                    self._cleanupModal(input, btnOk);
                    resolve(val);
                };
                self._modalKeydown = function (e) {
                    if (e.key === 'Enter') self._modalSubmit();
                };

                btnOk.addEventListener('click', self._modalSubmit);
                input.addEventListener('keydown', self._modalKeydown);
            });
        },

        _cleanupModal: function (input, btnOk) {
            if (this._modalSubmit) btnOk.removeEventListener('click', this._modalSubmit);
            if (this._modalKeydown) input.removeEventListener('keydown', this._modalKeydown);
            this._modalSubmit = null;
            this._modalKeydown = null;
            this.inputResolve = null;
        },

        submitInput: function () {
            var val = this.inputEl.value;
            this.inputArea.classList.add('hidden');
            if (this.inputResolve) {
                var resolve = this.inputResolve;
                this.inputResolve = null;
                resolve(val);
            }
        },

        clear: function () {
            this.outputEl.textContent = '';
        }
    };
})();
