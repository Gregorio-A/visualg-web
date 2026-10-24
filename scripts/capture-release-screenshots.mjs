// Run with the Vite development server at http://127.0.0.1:5173/.
// Captures a fresh browser profile so personal files never enter the images.
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const base = 'http://127.0.0.1:5173/';
const destination = path.resolve('img');
fs.mkdirSync(destination, { recursive: true });
const browser = await chromium.launch({ headless: true });

async function openApp(theme = 'dark', viewport = { width: 1440, height: 900 }) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, timezoneId: 'America/Sao_Paulo' });
  await context.addInitScript((selectedTheme) => localStorage.setItem('visualg-theme', selectedTheme), theme);
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(theme === 'dark' ? 2100 : 2650);
  return { context, page };
}

async function capture(page, name) {
  await page.screenshot({ path: path.join(destination, name), animations: 'disabled' });
  console.log(name);
}

async function closeApp(app) { await app.context.close(); }

async function showCode(page) {
  await page.locator('#workspace-file-list .file-item[title="loja-roupas.alg"]').click();
  await page.waitForTimeout(200);
}

try {
  let app = await openApp();
  await capture(app.page, 'interface-inicio-1.11.png');
  await showCode(app.page);
  await capture(app.page, 'interface-editor-1.11.png');
  await closeApp(app);

  app = await openApp();
  await app.page.evaluate(() => {
    window.TabManager.createTab('algoritmo "Demonstração"\ninicio\n  escreval("Olá, VisuAlg Web 1.11!")\n  escreval("Desafios do Dia disponíveis na documentação.")\nfimalgoritmo');
    window.VisualGWorkspace.showEditor();
  });
  await app.page.keyboard.press('F9');
  await app.page.locator('#terminalPanel').getByText('Olá, VisuAlg Web 1.11!').waitFor();
  await capture(app.page, 'interface-console-1.11.png');
  await closeApp(app);

  app = await openApp();
  await app.page.evaluate(() => window.VisualGWorkspace.showDoc('sumario'));
  await app.page.locator('#workspace-aux-view h1').waitFor();
  await capture(app.page, 'interface-documentacao-1.11.png');
  await app.page.evaluate(() => window.VisualGWorkspace.showDoc('desafios'));
  await app.page.locator('#daily-challenge-interactive').waitFor();
  await capture(app.page, 'interface-desafios-1.11.png');
  await app.page.getByRole('button', { name: 'Lista', exact: true }).click();
  await capture(app.page, 'interface-desafios-lista-1.11.png');
  await app.page.getByRole('button', { name: 'Calendário', exact: true }).click();
  await app.page.locator('.daily-challenge-choice').first().getByRole('button', { name: 'Abrir desafio' }).click();
  await app.page.locator('#daily-challenge-interactive h2').first().waitFor();
  await app.page.waitForTimeout(350);
  await capture(app.page, 'interface-desafio-simples-1.11.png');
  await app.page.getByRole('button', { name: 'Voltar ao calendário' }).click();
  await app.page.locator('.daily-challenge-choice').last().getByRole('button', { name: 'Abrir desafio' }).click();
  await app.page.locator('.daily-challenge-solution').waitFor();
  await capture(app.page, 'interface-desafio-avancado-1.11.png');
  await app.page.locator('.daily-challenge-solution summary').click();
  await app.page.locator('.daily-challenge-solution-confirm button').click();
  await app.page.locator('.daily-challenge-solution-actions').scrollIntoViewIfNeeded();
  await capture(app.page, 'interface-solucao-1.11.png');
  await closeApp(app);

  app = await openApp();
  await app.page.evaluate(() => window.VisualGWorkspace.showSettings());
  await capture(app.page, 'interface-configuracoes-1.11.png');
  await app.page.locator('.workspace-settings').getByRole('button', { name: 'Editor', exact: true }).click();
  await capture(app.page, 'interface-fontes-editor-1.11.png');
  await closeApp(app);

  app = await openApp();
  await app.page.locator('#btn-scale').click();
  await app.page.locator('#workspace-theme-menu').waitFor();
  await capture(app.page, 'interface-temas-1.11.png');
  await closeApp(app);

  for (const [theme, name] of [
    ['windows-95', 'interface-windows95-1.11.png'],
    ['visualg-classic', 'interface-classico-1.11.png'],
    ['steam-classic', 'interface-steam-1.11.png'],
    ['catppuccin-mocha', 'interface-mocha-1.11.png'],
    ['paper', 'interface-paper-1.11.png'],
  ]) {
    app = await openApp(theme);
    await showCode(app.page);
    await capture(app.page, name);
    await closeApp(app);
  }

  app = await openApp('dark', { width: 390, height: 844 });
  await capture(app.page, 'interface-mobile-1.11.png');
  await closeApp(app);
  fs.mkdirSync(path.resolve('src/public/screenshots'), { recursive: true });
  fs.copyFileSync(path.join(destination, 'interface-mobile-1.11.png'), path.resolve('src/public/screenshots/interface-mobile-1.11.png'));
} finally {
  await browser.close();
}
