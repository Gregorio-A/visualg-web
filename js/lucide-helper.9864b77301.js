// Lucide's createIcons scans the entire document. Replacing only pending icon
// placeholders avoids rewriting existing SVGs and triggering tab observers.
(function () {
    'use strict';

    window.renderLucideIcons = function (root) {
        var lucide = window.lucide;
        if (!lucide || !lucide.icons || !lucide.createElement) return;
        root = root || document;
        var pending = [];
        if (root.matches && root.matches('i[data-lucide]')) pending.push(root);
        if (root.querySelectorAll) pending = pending.concat(Array.prototype.slice.call(root.querySelectorAll('i[data-lucide]')));

        pending.forEach(function (placeholder) {
            var name = placeholder.getAttribute('data-lucide');
            var key = name.split(/[-_\s]+/).map(function (part) {
                return part ? part.charAt(0).toUpperCase() + part.slice(1) : '';
            }).join('');
            var definition = lucide.icons[key];
            if (!definition || !placeholder.parentNode) return;

            var attrs = {};
            Array.prototype.forEach.call(placeholder.attributes, function (attribute) {
                if (attribute.name !== 'class') attrs[attribute.name] = attribute.value;
            });
            attrs.class = ['lucide', 'lucide-' + name, placeholder.getAttribute('class') || ''].filter(Boolean).join(' ');
            placeholder.parentNode.replaceChild(lucide.createElement(definition, attrs), placeholder);
        });
    };
})();
