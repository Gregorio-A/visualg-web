const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { ensureRuntimeLoaded, executeSource, root } = require('./visualg-test-harness');

async function run() {
  ensureRuntimeLoaded();
  vm.runInThisContext(
    fs.readFileSync(path.join(root, 'src/js/examples.js'), 'utf8'),
    { filename: 'src/js/examples.js' },
  );

  const examples = window.VisuAlgExamples;
  if (!Array.isArray(examples) || examples.length < 35) {
    throw new Error(`A galeria deve ter pelo menos 35 exemplos; encontrou ${examples && examples.length}`);
  }

  const ids = new Set();
  for (const example of examples) {
    if (!example.id || ids.has(example.id)) {
      throw new Error(`Identificador de exemplo inválido ou repetido: ${example.id}`);
    }
    ids.add(example.id);

    const output = (await executeSource(example.source, example.inputs)).trimEnd();
    if (output !== example.expected) {
      throw new Error(
        `${example.title}: saída esperada "${example.expected}", recebeu "${output}"`,
      );
    }
  }

  console.log(`OK: ${examples.length} exemplos da galeria executados com a saída esperada.`);
}

run().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
