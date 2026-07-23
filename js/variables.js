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

                var formattedValue = this.formatValue(info.value, info.type, info);

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
                tdValue.classList.add('var-value-' + info.type.replace(/\s+/g, '-'), 'col-valor');
                tdValue.title = formattedValue;
                if (hidden.valor) tdValue.classList.add('col-hidden');

                tr.appendChild(tdName);
                tr.appendChild(tdType);
                tr.appendChild(tdValue);
                this.tbody.appendChild(tr);
            }
        },

        formatValue: function (value, type, info) {
            if (type && type.indexOf('vetor de ') === 0) {
                return this.formatVector(info);
            }
            return this.formatScalar(value, type);
        },

        formatScalar: function (value, type) {
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

        defaultValue: function (type) {
            switch (type) {
                case 'inteiro': return 0;
                case 'real': return 0.0;
                case 'caractere': return '';
                case 'logico': return false;
                default: return '';
            }
        },

        formatVector: function (info) {
            if (!info || !info.dimensions) return '[vetor]';

            var baseType = info.dataType || info.type.replace('vetor de ', '');
            var ranges = [];
            var total = 1;
            for (var i = 0; i < info.dimensions.length; i++) {
                var dim = info.dimensions[i];
                ranges.push(dim.low + '..' + dim.high);
                total *= (dim.high - dim.low + 1);
            }

            var keys = [];
            if (total <= 50) {
                this.collectVectorKeys(info.dimensions, 0, [], keys);
            } else {
                keys = Object.keys(info.value || {}).sort(this.compareVectorKeys);
            }

            var parts = [];
            for (var k = 0; k < keys.length; k++) {
                var key = keys[k];
                var value = info.value && Object.prototype.hasOwnProperty.call(info.value, key)
                    ? info.value[key]
                    : this.defaultValue(baseType);
                parts.push(key + ': ' + this.formatScalar(value, baseType));
            }

            var suffix = total > 50 ? (parts.length > 0 ? '; ...' : '...') : '';
            return '[' + ranges.join(', ') + '] { ' + parts.join('; ') + suffix + ' }';
        },

        collectVectorKeys: function (dimensions, index, current, keys) {
            if (index >= dimensions.length) {
                keys.push(current.join(','));
                return;
            }
            var dim = dimensions[index];
            for (var value = dim.low; value <= dim.high; value++) {
                current.push(value);
                this.collectVectorKeys(dimensions, index + 1, current, keys);
                current.pop();
            }
        },

        compareVectorKeys: function (a, b) {
            var left = a.split(',').map(Number);
            var right = b.split(',').map(Number);
            for (var i = 0; i < Math.max(left.length, right.length); i++) {
                if ((left[i] || 0) !== (right[i] || 0)) return (left[i] || 0) - (right[i] || 0);
            }
            return 0;
        },

        clear: function () {
            if (this.tbody) {
                this.tbody.innerHTML = '';
            }
            this.previousValues = {};
        }
    };
})();
