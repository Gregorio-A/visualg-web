const { executeSource } = require('./visualg-test-harness');
const programs = require('./standard-programs');

async function run() {
  const verbose = process.argv.includes('--verbose');

  for (const program of programs) {
    let output;
    try {
      output = await executeSource(program.source, program.inputs || []);
    } catch (error) {
      throw new Error(`${program.name}: falhou ao executar: ${error.message}`);
    }

    const actual = output.trimEnd();
    if (actual !== program.expected) {
      throw new Error(
        `${program.name}: saida esperada "${program.expected}", recebeu "${actual}"`,
      );
    }

    if (verbose) {
      console.log(`OK: ${program.name}`);
    }
  }

  console.log(`OK: ${programs.length} programas padrao executados com a saida esperada.`);
}

run().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
