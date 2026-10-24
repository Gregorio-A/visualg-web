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
        focusRequested: false,
        externalFocusRequested: false,
        _modalSubmit: null,
        _modalCancel: null,
        _modalKeydown: null,
        _autoScrollFrame: 0,

        init: function () {
            this.outputEl = document.getElementById('terminal-output');
            this.inputArea = document.getElementById('terminal-input-area');
            this.inputEl = document.getElementById('terminal-input');
            var inputOverlay = document.getElementById('consoleInputOverlay');
            if (inputOverlay && inputOverlay.parentElement !== document.body) document.body.appendChild(inputOverlay);

            var self = this;
            document.getElementById('terminal-input-ok').addEventListener('click', function () {
                self.submitInput();
            });
            this.inputEl.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    self.submitInput();
                }
            });
            document.addEventListener('pointerdown', function (event) {
                if (!event.target.closest('#terminalPanel, .console-dialog')) self.focusRequested = false;
            }, true);
            document.addEventListener('click', function (event) {
                var surface = event.target.closest('#terminalPanel, .console-dialog');
                if (!surface || event.target.closest('button, a, select, textarea')) return;
                self.focusRequested = true;
                self.focusActiveInput();
            });
            document.addEventListener('focusin', function (event) {
                if (!event.target.closest('#terminalPanel, .console-dialog')) self.focusRequested = false;
            });
            document.addEventListener('visualg:execution-end', function () {
                // The workspace may move/show the console while handling this event.
                // Scroll after that layout change has been painted.
                self.scrollToBottom();
            });
        },

        requestInputFocus: function () {
            this.externalFocusRequested = true;
        },

        releaseExternalInputFocus: function () {
            this.externalFocusRequested = false;
        },

        focusActiveInput: function () {
            if (!this.inputResolve) return false;
            var modal = document.getElementById('consoleInputOverlay');
            if (modal && !modal.classList.contains('hidden')) {
                document.getElementById('console-input-modal').focus();
                return true;
            }
            if (!this.inputArea.classList.contains('hidden')) {
                this.inputEl.focus();
                return true;
            }
            return false;
        },

        isConsoleVisible: function () {
            var dialog = document.querySelector('.console-overlay:not(.hidden)');
            if (dialog) return true;
            var panel = document.getElementById('terminalPanel');
            return !!(panel && panel.getClientRects().length);
        },

        scrollToBottom: function () {
            var self = this;
            function align() {
                if (!self.outputEl) return;
                var panel = self.outputEl.closest('.panel-body');
                if (panel) panel.scrollTop = panel.scrollHeight;
                self.outputEl.scrollTop = self.outputEl.scrollHeight;
            }
            align();
            if (this._autoScrollFrame) window.cancelAnimationFrame(this._autoScrollFrame);
            this._autoScrollFrame = window.requestAnimationFrame(function () {
                align();
                self._autoScrollFrame = window.requestAnimationFrame(function () {
                    self._autoScrollFrame = 0;
                    align();
                });
            });
        },

        write: function (text) {
            this.outputEl.appendChild(document.createTextNode(String(text)));
            this.scrollToBottom();
        },

        writeln: function (text) {
            this.write(text + '\n');
        },

        writelnError: function (message, location, onNavigate) {
            var row = document.createElement('div');
            row.className = 'console-error';

            var prefix = document.createElement('span');
            prefix.textContent = 'ERRO: ';
            row.appendChild(prefix);

            if (location && typeof onNavigate === 'function') {
                var link = document.createElement('button');
                link.type = 'button';
                link.className = 'console-error-link';
                link.textContent = message;
                link.title = 'Ir para a linha ' + location.line;
                link.addEventListener('click', onNavigate);
                row.appendChild(link);
            } else {
                row.appendChild(document.createTextNode(message));
            }

            this.outputEl.appendChild(row);
            this.scrollToBottom();
        },
        readInput: function (prompt) {
            if (prompt) {
                this.write(prompt);
            }
            document.dispatchEvent(new window.CustomEvent('visualg:input-request'));

            var mode = localStorage.getItem('visualg-console-input-mode') || 'inline';

            if (mode === 'modal') {
                return this._readInputModal(prompt);
            }
            return this._readInputInline();
        },

        waitForContinue: function (message) {
            document.dispatchEvent(new window.CustomEvent('visualg:input-request'));
            var mode = localStorage.getItem('visualg-console-input-mode') || 'inline';
            if (mode === 'modal') {
                return this._readInputModal(message || 'Pressione Enter para continuar.');
            }

            var previousPlaceholder = this.inputEl.placeholder;
            this.inputEl.placeholder = message || 'Pressione Enter para continuar.';
            var self = this;
            return this._readInputInline().then(function (value) {
                self.inputEl.placeholder = previousPlaceholder;
                return value;
            });
        },

        _readInputInline: function () {
            this.inputArea.classList.remove('hidden');
            this.inputEl.value = '';
            if (this.isConsoleVisible() || (this.focusRequested && !this.externalFocusRequested)) this.inputEl.focus();

            var input = this.inputEl;
            var self = this;
            setTimeout(function () {
                if (self.isConsoleVisible()) input.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);

            return new Promise(function (resolve) {
                self.inputResolve = resolve;
            });
        },

        _readInputModal: function (prompt) {
            var overlay = document.getElementById('consoleInputOverlay');
            var input = document.getElementById('console-input-modal');
            var label = document.getElementById('console-input-modal-label');
            var btnOk = document.getElementById('console-input-modal-ok');
            var btnCancel = document.getElementById('console-input-modal-cancel');

            label.textContent = prompt || 'Digite a entrada:';
            input.value = '';
            overlay.classList.remove('hidden');
            if (!this.externalFocusRequested) input.focus();

            var self = this;
            return new Promise(function (resolve, reject) {
                self.inputResolve = resolve;

                self._modalSubmit = function () {
                    var val = input.value;
                    overlay.classList.add('hidden');
                    self._cleanupModal(input, btnOk, btnCancel);
                    resolve(val);
                };
                self._modalCancel = function () {
                    overlay.classList.add('hidden');
                    self._cleanupModal(input, btnOk, btnCancel);
                    reject(new Error('__STOP__'));
                };
                self._modalKeydown = function (e) {
                    if (e.key === 'Enter') self._modalSubmit();
                    if (e.key === 'Escape') self._modalCancel();
                };

                btnOk.addEventListener('click', self._modalSubmit);
                btnCancel.addEventListener('click', self._modalCancel);
                input.addEventListener('keydown', self._modalKeydown);
            });
        },

        _cleanupModal: function (input, btnOk, btnCancel) {
            if (this._modalSubmit) btnOk.removeEventListener('click', this._modalSubmit);
            if (this._modalCancel) btnCancel.removeEventListener('click', this._modalCancel);
            if (this._modalKeydown) input.removeEventListener('keydown', this._modalKeydown);
            this._modalSubmit = null;
            this._modalCancel = null;
            this._modalKeydown = null;
            this.inputResolve = null;
        },

        submitInput: function () {
            var val = this.inputEl.value;
            this.inputArea.classList.add('hidden');
            this.focusRequested = false;
            this.externalFocusRequested = false;
            if (this.inputResolve) {
                var resolve = this.inputResolve;
                this.inputResolve = null;
                resolve(val);
            }
        },

        cancelPendingInput: function () {
            if (this._modalCancel) {
                this._modalCancel();
                return;
            }
            this.inputArea.classList.add('hidden');
            if (this.inputResolve) {
                var resolve = this.inputResolve;
                this.inputResolve = null;
                resolve('');
            }
        },

        clear: function () {
            if (this._autoScrollFrame) window.cancelAnimationFrame(this._autoScrollFrame);
            this._autoScrollFrame = 0;
            this.outputEl.textContent = '';
            this.outputEl.scrollTop = 0;
            var panel = this.outputEl.closest('.panel-body');
            if (panel) panel.scrollTop = 0;
        }
    };
})();
