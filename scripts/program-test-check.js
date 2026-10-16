const programs = require('./generated-programs');
const { executeSource } = require('./visualg-test-harness');

async function run() {
  let passed = 0;
  for (const program of programs) {
    let output;
    try {
      output = await executeSource(program.source, program.inputs);
    } catch (error) {
      throw new Error(`${program.name}: falhou ao executar: ${error.message}`);
    }

    const actual = output.trimEnd();
    if (actual !== program.expected) {
      throw new Error(
        `${program.name}: saida esperada "${program.expected}", recebeu "${actual}"`,
      );
    }
    passed += 1;
    if (process.argv.includes('--verbose')) console.log(`OK: ${program.name}`);
  }

  console.log(`OK: ${passed}/${programs.length} programas executados com a saida esperada.`);
}

run().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
