import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const configDir = path.dirname(fileURLToPath(import.meta.url));
const sourceRoot = path.resolve(configDir, 'src');

function copyRuntimeAssets(outDir) {
  return {
    name: 'copy-runtime-assets',
    closeBundle: function () {
      ['js', 'vendor', 'jsdelivr', 'unpk', 'images', 'docs'].forEach(function (dir) {
        var source = path.join(sourceRoot, dir);
        if (!fs.existsSync(source)) return;

        var target = path.join(outDir, dir);
        fs.rmSync(target, { recursive: true, force: true });
        fs.cpSync(source, target, { recursive: true });
      });
    },
  };
}

// https://vitejs.dev/config
export default defineConfig((env) => {
  var rendererName = env.forgeConfigSelf && env.forgeConfigSelf.name
    ? env.forgeConfigSelf.name
    : 'main_window';
  var outDir = env.forgeConfigSelf
    ? path.resolve(configDir, '.vite/renderer', rendererName)
    : path.resolve(configDir, 'dist');

  return {
    root: sourceRoot,
    base: './',
    build: {
      outDir: outDir,
      emptyOutDir: true,
    },
    plugins: [
      copyRuntimeAssets(outDir),
    ],
  };
});
