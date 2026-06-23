// ============================================
// VisuAlg Web IDE - Painel de Variáveis
// ============================================

(function () {
    'use strict';

    window.VariablesPanel = {
        tbody: null,
        previousValues: {},

        init: function () {
            this.tbody = document.querySelector('#variables-table tbody');
            // Add column classes to header cells
            var ths = document.querySelectorAll('#variables-table th');
            if (ths[0]) ths[0].classList.add('col-nome');
            if (ths[1]) ths[1].classList.add('col-tipo');
            if (ths[2]) ths[2].classList.add('col-valor');
        },

        _getHiddenColumns: function () {
            try {
                var cols = JSON.parse(localStorage.getItem('visualg-vars-columns') || '{}');
                return {
                    nome: cols.nome === false,
                    tipo: cols.tipo === false,
                    valor: cols.valor === false
                };
            } catch (e) {
                return { nome: false, tipo: false, valor: false };
            }
        },

        update: function (variables) {
            if (!this.tbody) return;
            this.tbody.innerHTML = '';

            var hidden = this._getHiddenColumns();
            var entries = Array.from(variables.entries());
            for (var i = 0; i < entries.length; i++) {
                var name = entries[i][0];
                var info = entries[i][1];
                var tr = document.createElement('tr');

                var formattedValue = this.formatValue(info.value, info.type);

                // Highlight changed values
                if (this.previousValues[name] !== undefined &&
                    this.previousValues[name] !== formattedValue) {
                    tr.classList.add('var-changed');
                }
                this.previousValues[name] = formattedValue;

                var tdName = document.createElement('td');
                tdName.textContent = name;
                tdName.classList.add('col-nome');
                if (hidden.nome) tdName.classList.add('col-hidden');

                var tdType = document.createElement('td');
                tdType.textContent = info.type;
                tdType.classList.add('var-type', 'col-tipo');
                if (hidden.tipo) tdType.classList.add('col-hidden');

                var tdValue = document.createElement('td');
                tdValue.textContent = formattedValue;
                tdValue.classList.add('var-value-' + info.type, 'col-valor');
                if (hidden.valor) tdValue.classList.add('col-hidden');

                tr.appendChild(tdName);
                tr.appendChild(tdType);
                tr.appendChild(tdValue);
                this.tbody.appendChild(tr);
            }
        },

        formatValue: function (value, type) {
            if (type === 'logico') {
                return value ? 'VERDADEIRO' : 'FALSO';
            }
            if (type === 'caractere') {
                return '"' + value + '"';
            }
            if (type === 'real') {
                if (typeof value === 'number' && value === Math.floor(value)) {
                    return value.toFixed(1);
                }
            }
            if (Array.isArray(value)) {
                return '[vetor]';
            }
            return String(value);
        },

        clear: function () {
            if (this.tbody) {
                this.tbody.innerHTML = '';
            }
            this.previousValues = {};
        }
    };
})();
