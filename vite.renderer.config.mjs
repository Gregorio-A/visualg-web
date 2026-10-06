import { defineConfig } from 'vite';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const configDir = path.dirname(fileURLToPath(import.meta.url));
const sourceRoot = path.resolve(configDir, 'src');
const appVersion = JSON.parse(fs.readFileSync(path.join(configDir, 'package.json'), 'utf8')).version;
const documentationImages = ['interface-visualg-2026.png', 'interface-configuracoes-2026.png', 'interface-documentacao-2026.png', 'interface-console-2026.png', 'interface-temas-classicos-2026.png', 'interface-electron-2026.png'];

function fingerprintScriptReferences(outDir) {
  ['index.html', 'console-window.html'].forEach(function (htmlName) {
    var htmlPath = path.join(outDir, htmlName);
    if (!fs.existsSync(htmlPath)) return;

    var html = fs.readFileSync(htmlPath, 'utf8');
    html = html.replace(/(<script\b[^>]*\bsrc=")([^"]+)(")/gi, function (match, prefix, url, suffix) {
      if (/^(?:[a-z]+:|\/\/|#)/i.test(url)) return match;

      var cleanUrl = url.split(/[?#]/, 1)[0];
      var normalizedUrl = cleanUrl.replace(/^\.\//, '');
      var sourcePath = path.resolve(outDir, normalizedUrl);
      if (!sourcePath.startsWith(path.resolve(outDir) + path.sep) || !fs.existsSync(sourcePath) || !fs.statSync(sourcePath).isFile()) return match;

      var hash = crypto.createHash('sha256').update(fs.readFileSync(sourcePath)).digest('hex').slice(0, 10);
      var parsed = path.parse(sourcePath);
      var hashedName = parsed.name + '.' + hash + parsed.ext;
      var hashedPath = path.join(parsed.dir, hashedName);
      fs.copyFileSync(sourcePath, hashedPath);

      var urlDirectory = path.posix.dirname(normalizedUrl);
      var hashedUrl = path.posix.join(urlDirectory === '.' ? '' : urlDirectory, hashedName);
      if (cleanUrl.startsWith('./')) hashedUrl = './' + hashedUrl;
      return prefix + hashedUrl + suffix;
    });
    fs.writeFileSync(htmlPath, html);
  });
}

function copyRuntimeAssets(outDir) {
  return {
    name: 'copy-runtime-assets',
    configureServer: function (server) {
      server.middlewares.use('/screenshots', function (request, response, next) {
        var name = decodeURIComponent(request.url.split('?', 1)[0]).replace(/^\/+/, '');
        if (!documentationImages.includes(name)) { next(); return; }
        var source = path.join(configDir, 'img', name);
        if (!fs.existsSync(source)) { next(); return; }
        response.setHeader('Content-Type', 'image/png');
        fs.createReadStream(source).pipe(response);
      });
    },
    closeBundle: function () {
      ['js', 'vendor', 'jsdelivr', 'unpk', 'images', 'docs'].forEach(function (dir) {
        var source = path.join(sourceRoot, dir);
        if (!fs.existsSync(source)) return;

        var target = path.join(outDir, dir);
        fs.rmSync(target, { recursive: true, force: true });
        fs.cpSync(source, target, { recursive: true });
      });
      const licensesDir = path.join(outDir, 'font-licenses');
      fs.mkdirSync(licensesDir, { recursive: true });
      ['jetbrains-mono', 'fira-code', 'ibm-plex-mono'].forEach(function (font) {
        fs.copyFileSync(path.join(configDir, 'node_modules', '@fontsource', font, 'LICENSE'), path.join(licensesDir, font + '.txt'));
      });
      const screenshotsDir = path.join(outDir, 'screenshots');
      fs.mkdirSync(screenshotsDir, { recursive: true });
      documentationImages.forEach(function (name) {
        fs.copyFileSync(path.join(configDir, 'img', name), path.join(screenshotsDir, name));
      });
      fingerprintScriptReferences(outDir);
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
      rollupOptions: {
        input: {
          main: path.join(sourceRoot, 'index.html'),
          console: path.join(sourceRoot, 'console-window.html'),
        },
      },
    },
    plugins: [
      {
        name: 'inject-app-version',
        transformIndexHtml: function (html) {
          return html.replaceAll('__VISUALG_WEB_VERSION__', appVersion);
        },
      },
      copyRuntimeAssets(outDir),
    ],
  };
});
