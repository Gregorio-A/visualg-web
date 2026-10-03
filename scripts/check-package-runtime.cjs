const major = Number(process.versions.node.split('.')[0]);

if (major < 22 || major >= 26) {
  process.stderr.write('O empacotamento Electron requer Node.js 22 a 25 (Node 22 LTS recomendado). No Node 26, o Electron Packager pode encerrar antes de criar out/ sem relatar erro.\n');
  process.exit(1);
}
