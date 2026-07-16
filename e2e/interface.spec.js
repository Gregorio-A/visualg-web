import { expect, test } from '@playwright/test';

const programs = {
  output: ['Algoritmo "Atalhos"', 'Inicio', '  escreval("atalho funcionando")', 'fimalgoritmo'].join('\n'),
  input: ['Algoritmo "Entrada"', 'Var', '  nome: caractere', 'Inicio', '  leia(nome)', '  escreval("Olá, ", nome)', 'fimalgoritmo'].join('\n'),
  invalid: ['Algoritmo "Erro"', 'Inicio', '  valor <- 10', 'fimalgoritmo'].join('\n'),
};

async function openApp(page, options = {}) {
  if (!options.onboarding) {
    await page.addInitScript(() => localStorage.setItem('visualg-onboarding-complete-v1', 'true'));
  }
  await page.goto('/');
  await expect(page.locator('.CodeMirror')).toBeVisible();
}

async function setCode(page, code) {
  await page.evaluate((source) => window.VisualGEditor.setValue(source), code);
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe(code);
}

test('abre e executa um exemplo da galeria', async ({ page }) => {
  await openApp(page);
  await page.locator('#btn-examples').click();
  await expect(page.locator('#examplesOverlay')).toBeVisible();
  await page.locator('[data-example-id="ola-mundo"][data-example-action="run"]').click();
  await expect(page.locator('#terminal-output')).toContainText('Olá, mundo!');
  await expect(page.locator('#compiler-status')).toContainText('Execução finalizada');
});

test('executa com F9, avança com F8 e permite parar', async ({ page }) => {
  await openApp(page);
  await setCode(page, programs.output);
  await page.keyboard.press('F9');
  await expect(page.locator('#terminal-output')).toContainText('atalho funcionando');

  await setCode(page, programs.output);
  await page.keyboard.press('F8');
  await expect(page.locator('#compiler-status')).toContainText('Passo a passo');
  await expect(page.locator('#btn-stop')).toBeEnabled();
  await page.keyboard.press('F8');
  await expect(page.locator('#terminal-output')).toContainText('atalho funcionando');

  await setCode(page, programs.input);
  await page.keyboard.press('F9');
  await expect(page.locator('#terminal-input-area')).toBeVisible();
  await page.locator('#btn-stop').click();
  await expect(page.locator('#terminal-input-area')).toBeHidden();
  await expect(page.locator('#compiler-status')).toContainText('Execução interrompida');
});

test('aceita leia inline', async ({ page }) => {
  await openApp(page);
  await setCode(page, programs.input);
  await page.keyboard.press('F9');
  await expect(page.locator('#terminal-input-area')).toBeVisible();
  await page.locator('#terminal-input').fill('Ada');
  await page.locator('#terminal-input').press('Enter');
  await expect(page.locator('#terminal-output')).toContainText('Olá, Ada');
});

test('aceita leia em modal', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('visualg-onboarding-complete-v1', 'true');
    localStorage.setItem('visualg-console-input-mode', 'modal');
  });
  await page.goto('/');
  await setCode(page, programs.input);
  await page.keyboard.press('F9');
  await expect(page.locator('#consoleInputOverlay')).toBeVisible();
  await page.locator('#console-input-modal').fill('Grace');
  await page.locator('#console-input-modal-ok').click();
  await expect(page.locator('#terminal-output')).toContainText('Olá, Grace');
});

test('abre e salva arquivo .alg', async ({ page }) => {
  await openApp(page);
  const source = ['Algoritmo "ArquivoE2E"', 'Inicio', '  escreval("arquivo")', 'fimalgoritmo'].join('\n');
  await page.locator('#file-input').setInputFiles({ name: 'entrada.alg', mimeType: 'text/plain', buffer: Buffer.from(source) });
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe(source);

  const downloadPromise = page.waitForEvent('download');
  await page.locator('#btn-save').click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('ArquivoE2E.alg');
  const stream = await download.createReadStream();
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  expect(Buffer.concat(chunks).toString('utf8')).toBe(source);
});

test('restaura abas e uma cópia de recuperação', async ({ page }) => {
  await openApp(page);
  const first = ['Algoritmo "Primeira"', 'Inicio', 'fimalgoritmo'].join('\n');
  const second = ['Algoritmo "Segunda"', 'Inicio', 'fimalgoritmo'].join('\n');
  await setCode(page, first);
  await expect(page.locator('#autosave-status')).toContainText('Salvo localmente');
  await page.locator('#btn-add-tab').click();
  await setCode(page, second);
  await expect(page.locator('#autosave-status')).toContainText('Salvo localmente');
  await page.reload();
  await expect(page.locator('.tab-item')).toHaveCount(2);
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe(second);

  await page.locator('#autosave-status').click();
  await expect(page.locator('#btn-restore-recovery')).toBeEnabled();
  await page.locator('#btn-restore-recovery').click();
  await expect(page.locator('.tab-item')).toHaveCount(1);
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).not.toBe(second);
});

test('mostra, esconde e persiste painéis', async ({ page }) => {
  await openApp(page);
  await page.locator('#btn-sections').click();
  await page.locator('[data-section="variables"]').uncheck();
  await expect(page.locator('#variablesPanel')).toHaveClass(/section-hidden/);
  await page.reload();
  await expect(page.locator('#variablesPanel')).toHaveClass(/section-hidden/);
  await page.locator('#btn-sections').click();
  await page.locator('#btn-show-all-sections').click();
  await expect(page.locator('#variablesPanel')).not.toHaveClass(/section-hidden/);
});

test('erro clicável reabre o editor e leva à linha correta', async ({ page }) => {
  await openApp(page);
  await setCode(page, programs.invalid);
  await page.locator('#btn-sections').click();
  await page.locator('[data-section="editor"]').uncheck();
  await page.keyboard.press('F9');
  const errorLink = page.locator('.console-error-link');
  await expect(errorLink).toBeVisible();
  await expect(page.locator('.editor-column')).not.toHaveClass(/section-hidden/);
  await errorLink.click();
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.instance.getCursor().line)).toBe(2);
});

test('onboarding conclui e encaminha para exemplos', async ({ page }) => {
  await openApp(page, { onboarding: true });
  await expect(page.locator('#onboardingOverlay')).toBeVisible();
  await page.locator('#btn-onboarding-examples').click();
  await expect(page.locator('#onboardingOverlay')).toBeHidden();
  await expect(page.locator('#examplesOverlay')).toBeVisible();
  await expect.poll(() => page.evaluate(() => localStorage.getItem('visualg-onboarding-complete-v1'))).toBe('true');
});
