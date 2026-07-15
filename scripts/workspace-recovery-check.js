const fs = require('fs');
const path = require('path');
const vm = require('vm');

const storage = new Map();
const elements = new Map();

function createClassList() {
  const values = new Set();
  return {
    add(...names) { names.forEach((name) => values.add(name)); },
    remove(...names) { names.forEach((name) => values.delete(name)); },
    contains(name) { return values.has(name); },
  };
}

function createElement() {
  return {
    children: [],
    classList: createClassList(),
    dataset: {},
    textContent: '',
    innerHTML: '',
    addEventListener() {},
    appendChild(child) { this.children.push(child); return child; },
    closest() { return null; },
    querySelectorAll() { return []; },
  };
}

['tab-list', 'btn-add-tab', 'closeTabOverlay'].forEach((id) => {
  elements.set(id, createElement());
});

global.localStorage = {
  getItem(key) { return storage.has(key) ? storage.get(key) : null; },
  setItem(key, value) { storage.set(key, String(value)); },
  removeItem(key) { storage.delete(key); },
};

global.document = {
  visibilityState: 'visible',
  getElementById(id) {
    if (!elements.has(id)) elements.set(id, createElement());
    return elements.get(id);
  },
  createElement,
  addEventListener() {},
};

let editorValue = 'Algoritmo "Inicial"\nInicio\nfimalgoritmo';
global.window = {
  addEventListener() {},
  gerarTemplate() { return 'Algoritmo "Inicial"\nInicio\nfimalgoritmo'; },
  VisualGEditor: {
    instance: { on() {} },
    getValue() { return editorValue; },
    setValue(value) { editorValue = value; },
    clearHighlight() {},
  },
  Terminal: { outputEl: { textContent: '' } },
  VariablesPanel: {
    previousValues: {},
    clear() {},
    update() {},
  },
};

vm.runInThisContext(
  fs.readFileSync(path.resolve(__dirname, '../src/js/tabs.js'), 'utf8'),
  { filename: 'src/js/tabs.js' },
);

const states = [];
window.TabManager.onPersistenceChange = (state) => states.push(state.status);
window.TabManager.init();

editorValue = 'Algoritmo "Alterado"\nInicio\n  escreval("seguro")\nfimalgoritmo';
window.TabManager.saveWorkspace();

const recovery = window.TabManager.getRecoveryInfo();
if (!recovery || recovery.tabCount !== 1) {
  throw new Error('O autosave não criou uma cópia de recuperação válida.');
}

if (!window.TabManager.restoreRecovery()) {
  throw new Error('Não foi possível restaurar a cópia de recuperação.');
}

if (!/Algoritmo "Inicial"/.test(editorValue)) {
  throw new Error('A restauração não recuperou o conteúdo anterior.');
}

const undoRecovery = JSON.parse(storage.get('visualg-workspace-recovery-v1'));
if (!/Algoritmo "Alterado"/.test(undoRecovery.tabs[0].code)) {
  throw new Error('A restauração não preservou o estado atual para desfazer.');
}

if (!states.includes('saved') || !states.includes('restored')) {
  throw new Error('Os estados visíveis do autosave não foram publicados.');
}

console.log('OK: autosave e troca segura da cópia de recuperação verificados.');
