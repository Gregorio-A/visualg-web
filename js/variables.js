// ============================================
// VisuAlg Web IDE - Painel de Variáveis
// ============================================

(function () {
    'use strict';

    var vectorDetailsId = 0;

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
                var isVector = info.type && info.type.indexOf('vetor de ') === 0 && info.dimensions;
                var comparisonValue = isVector ? formattedValue + '|' + this.vectorValueSignature(info.value) : formattedValue;

                // Highlight changed values
                if (this.previousValues[name] !== undefined &&
                    this.previousValues[name] !== comparisonValue) {
                    tr.classList.add('var-changed');
                }
                this.previousValues[name] = comparisonValue;

                var tdName = document.createElement('td');
                tdName.textContent = name;
                tdName.title = String(name);
                tdName.classList.add('col-nome');
                if (hidden.nome) tdName.classList.add('col-hidden');

                var tdType = document.createElement('td');
                tdType.textContent = info.type;
                tdType.title = String(info.type);
                tdType.classList.add('var-type', 'col-tipo');
                if (hidden.tipo) tdType.classList.add('col-hidden');

                var tdValue = document.createElement('td');
                tdValue.classList.add('var-value-' + info.type.replace(/\s+/g, '-'), 'col-valor');
                tdValue.title = formattedValue;
                if (hidden.valor) tdValue.classList.add('col-hidden');

                var expansion = isVector ? this.createVectorExpansion(info) : null;
                if (expansion) tdValue.appendChild(expansion.button);
                else tdValue.textContent = formattedValue;

                tr.appendChild(tdName);
                tr.appendChild(tdType);
                tr.appendChild(tdValue);
                this.tbody.appendChild(tr);
                if (expansion) this.tbody.appendChild(expansion.row);
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

            var ranges = [];
            for (var i = 0; i < info.dimensions.length; i++) {
                var dim = info.dimensions[i];
                ranges.push(dim.low + '..' + dim.high);
            }

            return '[' + ranges.join(', ') + '] { … }';
        },

        vectorValueSignature: function (value) {
            var keys = Object.keys(value || {}).sort(this.compareVectorKeys);
            var hash = 2166136261;
            keys.forEach(function (key) {
                var text = key + ':' + String(value[key]) + ';';
                for (var i = 0; i < text.length; i++) {
                    hash ^= text.charCodeAt(i);
                    hash = Math.imul(hash, 16777619);
                }
            });
            return keys.length + ':' + (hash >>> 0);
        },

        createVectorExpansion: function (info) {
            var self = this;
            var baseType = info.dataType || info.type.replace('vetor de ', '');
            var total = info.dimensions.reduce(function (count, dim) { return count * (dim.high - dim.low + 1); }, 1);
            var summary = document.createElement('button');
            var details = document.createElement('tr');
            var id = 'vector-details-' + (++vectorDetailsId);
            var detailsCell = document.createElement('td');
            var list = document.createElement('div');
            var more = document.createElement('button');
            var entries = null;
            var offset = 0;
            var pageSize = 100;

            summary.type = 'button';
            summary.className = 'vector-toggle';
            summary.textContent = this.formatVector(info);
            summary.title = 'Expandir ou recolher os valores do vetor';
            summary.setAttribute('aria-expanded', 'false');
            summary.setAttribute('aria-controls', id);

            details.className = 'var-vector-details';
            details.hidden = true;
            details.id = id;
            detailsCell.colSpan = 3;
            detailsCell.className = 'var-vector-details-cell';
            list.className = 'vector-values';
            detailsCell.appendChild(list);
            details.appendChild(detailsCell);

            more.type = 'button';
            more.className = 'vector-show-more';
            more.textContent = 'Mostrar mais';
            more.addEventListener('click', function () { appendPage(); });

            function getEntries() {
                if (entries) return entries;
                var keys = [];
                if (total <= 50) self.collectVectorKeys(info.dimensions, 0, [], keys);
                else keys = Object.keys(info.value || {}).sort(self.compareVectorKeys);
                entries = keys.map(function (key) {
                    var value = info.value && Object.prototype.hasOwnProperty.call(info.value, key)
                        ? info.value[key]
                        : self.defaultValue(baseType);
                    return { key: key, value: self.formatScalar(value, baseType) };
                });
                return entries;
            }

            function appendPage() {
                var all = getEntries();
                var end = Math.min(offset + pageSize, all.length);
                if (more.parentNode) more.remove();
                var count = list.querySelector('.vector-entry-count');
                if (count) count.remove();
                for (; offset < end; offset++) {
                    var item = document.createElement('div');
                    var index = document.createElement('span');
                    var value = document.createElement('span');
                    item.className = 'vector-value-row';
                    index.className = 'vector-index';
                    value.className = 'vector-entry-value';
                    index.textContent = '└─ [' + all[offset].key + ']';
                    value.textContent = all[offset].value;
                    item.title = index.textContent + ' ' + all[offset].value;
                    item.append(index, value);
                    list.appendChild(item);
                }
                if (offset < all.length) {
                    more.textContent = 'Mostrar mais (' + (all.length - offset) + ')';
                    list.appendChild(more);
                }
                if (total > all.length) {
                    if (!count) { count = document.createElement('div'); count.className = 'vector-entry-count'; }
                    count.textContent = 'Mostrando ' + all.length + ' de ' + total + ' posições inicializadas.';
                    list.appendChild(count);
                }
            }

            summary.addEventListener('click', function () {
                var expanded = summary.getAttribute('aria-expanded') === 'true';
                summary.setAttribute('aria-expanded', String(!expanded));
                details.hidden = expanded;
                if (!expanded && !list.childElementCount) appendPage();
            });

            return { button: summary, row: details };
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
