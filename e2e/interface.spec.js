import { expect, test } from '@playwright/test';

const programs = {
  output: ['Algoritmo "Atalhos"', 'Inicio', '  escreval("atalho funcionando")', 'fimalgoritmo'].join('\n'),
  input: ['Algoritmo "Entrada"', 'Var', '  nome: caractere', 'Inicio', '  leia(nome)', '  escreval("Olá, ", nome)', 'fimalgoritmo'].join('\n'),
  invalid: ['Algoritmo "Erro"', 'Inicio', '  valor <- 10', 'fimalgoritmo'].join('\n'),
};

async function openApp(page) {
  await page.goto('/');
  await expect(page.locator('.CodeMirror')).toBeVisible();
  await expect.poll(() => page.evaluate(() => Boolean(window.VisualGWorkspace))).toBe(true);
}

async function setCode(page, code) {
  await page.evaluate((source) => window.VisualGEditor.setValue(source), code);
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe(code);
}

test('abre e executa um exemplo da galeria', async ({ page }) => {
  await openApp(page);
  await page.locator('#btn-examples-sidebar').click();
  await expect(page.locator('#workspace-aux-view')).toBeVisible();
  await page.locator('.workspace-example-card', { hasText: 'Olá, mundo!' }).getByRole('button', { name: 'Executar' }).click();
  await expect(page.locator('#terminal-output')).toContainText('Olá, mundo!');
  await expect(page.locator('#compiler-status')).toContainText('Execução finalizada');
});

test('abre a documentação no centro e divide com o editor', async ({ page }) => {
  await openApp(page);
  await page.locator('.doc-item', { hasText: 'Introdução' }).click();
  await expect(page.locator('#workspace-aux-view')).toBeVisible();
  await expect(page.locator('#workspace-aux-view')).toContainText('VisuAlg');
  await page.locator('#btn-split-editor').click();
  await page.locator('#workspace-split-menu button').filter({ hasText: 'Código + documentação' }).click();
  await expect(page.locator('.editor-column')).toHaveClass(/split-visible/);
  await expect(page.locator('#editorPanel')).toBeVisible();
  await page.locator('#btn-nav-back').click();
  await expect(page.locator('#editorPanel')).toBeHidden();
  await page.locator('#btn-nav-forward').click();
  await expect(page.locator('.editor-column')).toHaveClass(/split-visible/);
});

test('divide dois códigos e salva edição do arquivo secundário', async ({ page }) => {
  await openApp(page);
  await page.locator('#btn-split-editor').click();
  await page.locator('#workspace-split-menu button').filter({ hasText: 'Comparar dois códigos' }).click();
  await expect(page.locator('.editor-column')).toHaveClass(/split-visible/);
  await expect(page.locator('#compare-file-select')).toBeVisible();
  await page.locator('#btn-nav-back').click();
  await expect(page.locator('.editor-column')).not.toHaveClass(/split-visible/);
  await page.locator('#btn-nav-forward').click();
  await expect(page.locator('#compare-file-select')).toBeVisible();
  await page.locator('#compare-file-select').selectOption({ label: 'idade.alg' });
  const updated = 'Algoritmo "IdadeEditada"\nInicio\n  escreval("comparação")\nfimalgoritmo';
  await page.evaluate((source) => window.document.querySelector('.compare-editor-host .CodeMirror').CodeMirror.setValue(source), updated);
  await page.reload();
  await page.locator('.file-item').filter({ hasText: 'idade.alg' }).click();
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe(updated);
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
  await page.locator('#debug-stop').click();
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
  await page.locator('#btn-download-workspace').click();
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

test('abre diretamente no espaço de trabalho da referência', async ({ page }) => {
  await openApp(page);
  await expect(page.locator('#onboardingOverlay')).toBeHidden();
  await expect(page.locator('#workspace-sidebar')).toBeVisible();
  await expect(page.locator('#right-sidebar')).toBeVisible();
  await expect(page.locator('.editor-column')).toBeVisible();
});

test('ponto de parada pausa antes da linha e Executar continua', async ({ page }) => {
  await openApp(page);
  await setCode(page, ['Algoritmo "Pausa"', 'Inicio', '  escreval("primeiro")', '  escreval("segundo")', 'fimalgoritmo'].join('\n'));
  await page.locator('.CodeMirror-linenumber').filter({ hasText: '3' }).first().click();
  await page.locator('#debug-run').click();
  await expect(page.locator('#compiler-status')).toContainText('Pausado na linha 3');
  await expect(page.locator('#terminal-output')).not.toContainText('primeiro');
  await page.locator('#debug-run').click();
  await expect(page.locator('#terminal-output')).toContainText('primeiro');
  await expect(page.locator('#terminal-output')).toContainText('segundo');
});

test('fechar aba preserva arquivo, excluir envia ao histórico e restaura', async ({ page }) => {
  await openApp(page);
  await page.locator('#btn-add-tab').click();
  await setCode(page, programs.output);
  await page.locator('.tab-item.active .tab-close').click();
  await expect(page.locator('#workspace-file-list')).toContainText('Atalhos.alg');
  await page.reload();
  await page.locator('.file-item').filter({ hasText: 'Atalhos.alg' }).click();
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe(programs.output);
  await page.locator('.file-item').filter({ hasText: 'Atalhos.alg' }).locator('.file-close').click();
  await expect(page.locator('#workspace-file-list')).not.toContainText('Atalhos.alg');
  await page.locator('#autosave-status').click();
  await page.locator('#workspace-trash button').filter({ hasText: 'Atalhos.alg' }).click();
  await expect(page.locator('#workspace-file-list')).toContainText('Atalhos.alg');
});

test('histórico restaura uma versão anterior do código', async ({ page }) => {
  await openApp(page);
  await setCode(page, 'Algoritmo "VersaoA"\nInicio\n  escreval("A")\nfimalgoritmo');
  await page.evaluate(() => window.TabManager.saveWorkspace());
  await setCode(page, 'Algoritmo "VersaoB"\nInicio\n  escreval("B")\nfimalgoritmo');
  await page.evaluate(() => { window.localStorage.setItem('visualg-workspace-recovery-checkpoint-v1', '0'); window.TabManager.saveWorkspace(); });
  await page.locator('#autosave-status').click();
  await page.locator('#workspace-trash button').filter({ hasText: 'Restaurar versão de' }).first().click();
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toContain('VersaoA');
});

test('temas e escala do editor persistem', async ({ page }) => {
  await openApp(page);
  await page.locator('#btn-scale').click();
  await page.locator('#workspace-theme-menu button').filter({ hasText: 'GitHub Light' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'github-light');
  await expect.poll(() => page.locator('.tab-item.active').evaluate((element) => window.getComputedStyle(element).backgroundColor)).toBe('rgb(255, 255, 255)');
  await page.locator('#btn-settings').click();
  await page.locator('.settings-categories button').filter({ hasText: 'Editor' }).click();
  await page.locator('#workspace-setting-letter-spacing').fill('2');
  await page.locator('#workspace-setting-line-spacing').fill('33');
  await page.locator('.view-tab[data-type="settings"] .view-tab-close').click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'github-light');
  await expect(page.locator('#setting-letter-spacing')).toHaveValue('2');
  await expect(page.locator('#setting-line-spacing')).toHaveValue('33');
});

test('console em modal e janela separada', async ({ page }) => {
  await openApp(page);
  await setCode(page, programs.output);
  await page.locator('#btn-settings').click();
  await page.locator('.settings-categories button').filter({ hasText: 'Console' }).click();
  await page.locator('#workspace-setting-console-presentation').selectOption('modal');
  await page.locator('.view-tab[data-type="settings"] .view-tab-close').click();
  await page.locator('#debug-run').click();
  await expect(page.locator('.console-overlay')).toBeVisible();
  await expect(page.locator('#terminal-output')).toContainText('atalho funcionando');
  await page.locator('.console-dialog-header button').click();
  await page.locator('#btn-settings').click();
  await page.locator('.settings-categories button').filter({ hasText: 'Console' }).click();
  await page.locator('#workspace-setting-console-presentation').selectOption('window');
  await page.locator('.view-tab[data-type="settings"] .view-tab-close').click();
  const popupPromise = page.waitForEvent('popup');
  await page.locator('#debug-run').click();
  const popup = await popupPromise;
  await expect(popup.locator('#output')).toContainText('atalho funcionando');
  await popup.close();
});

test('menu móvel alterna arquivos, depuração e editor', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openApp(page);
  await page.locator('#btn-menu').click();
  await page.locator('#mobile-files').click();
  await expect(page.locator('#workspace-sidebar')).toBeVisible();
  await page.locator('#btn-menu').click();
  await page.locator('#mobile-debug').click();
  await expect(page.locator('#right-sidebar')).toBeVisible();
  await page.locator('#btn-menu').click();
  await page.locator('#mobile-editor').click();
  await expect(page.locator('.editor-column')).toBeVisible();
  await page.locator('#btn-menu').click();
  await page.locator('#mobile-docs').click();
  await expect(page.locator('.view-tab[data-type="docs"]')).toBeVisible();
  await expect(page.locator('#docsOverlay')).toBeHidden();
  await page.locator('#btn-menu').click();
  await page.locator('#mobile-settings').click();
  await expect(page.locator('.view-tab[data-type="settings"]')).toBeVisible();
  await expect(page.locator('#settingsOverlay')).toBeHidden();
});

test('pasta, filtro de arquivos e tamanho das colunas persistem', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 900 });
  await openApp(page);
  page.once('dialog', (dialog) => dialog.accept('Turma A'));
  await page.locator('#btn-new-workspace-folder').click();
  await page.locator('.file-item').filter({ hasText: 'idade.alg' }).dragTo(page.locator('.file-folder'));
  await expect(page.locator('.folder-files')).toContainText('idade.alg');
  await page.locator('#workspace-file-search').fill('resistencia');
  await expect(page.locator('#workspace-file-list')).toContainText('resistencia-equivalente.alg');
  await expect(page.locator('#workspace-file-list')).not.toContainText('idade.alg');
  await page.locator('#workspace-file-search').clear();
  const before = await page.locator('#workspace-sidebar').boundingBox();
  const handle = await page.locator('#left-resizer').boundingBox();
  await page.mouse.move(handle.x + handle.width / 2, handle.y + 200);
  await page.mouse.down();
  await page.mouse.move(handle.x + handle.width / 2 + 70, handle.y + 200, { steps: 5 });
  await page.mouse.up();
  const after = await page.locator('#workspace-sidebar').boundingBox();
  expect(after.width).toBeGreaterThan(before.width + 50);
  await page.reload();
  await expect(page.locator('.folder-files')).toContainText('idade.alg');
  expect((await page.locator('#workspace-sidebar').boundingBox()).width).toBeGreaterThan(before.width + 50);
});

test('autocompletar aceita comando e barra de comandos cria arquivo', async ({ page }) => {
  await openApp(page);
  await page.evaluate(() => {
    const cm = window.VisualGEditor.instance;
    cm.setValue('Algoritmo "Auto"\nInicio\n  escre\nfimalgoritmo');
    cm.setCursor({ line: 2, ch: 7 });
    cm.focus();
  });
  await page.keyboard.type('v');
  await expect(page.locator('.visualg-hints')).toBeVisible();
  await page.keyboard.press('Enter');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.instance.getLine(2))).toBe('  escreva');
  await page.keyboard.press('Control+Shift+P');
  await page.locator('#command-input').fill('Novo arquivo');
  await page.locator('#command-results button').first().click();
  await expect(page.locator('.tab-item')).toHaveCount(2);
});

test('janela do console recebe entrada e mostra a resposta', async ({ page }) => {
  await openApp(page);
  await setCode(page, programs.input);
  await page.locator('#btn-settings').click();
  await page.locator('.settings-categories button').filter({ hasText: 'Console' }).click();
  await page.locator('#workspace-setting-console-presentation').selectOption('window');
  await page.locator('.view-tab[data-type="settings"] .view-tab-close').click();
  const popupPromise = page.waitForEvent('popup');
  await page.locator('#debug-run').click();
  const popup = await popupPromise;
  await expect(popup.locator('#input-form')).toHaveClass(/visible/);
  await popup.locator('#input').fill('Ada');
  await popup.locator('#input-form button').click();
  await expect(popup.locator('#output')).toContainText('Olá, Ada');
  await popup.close();
});

test('painéis laterais liberam toda a largura do editor e setas têm direções opostas', async ({ page }) => {
  await openApp(page);
  const width = () => page.locator('.editor-column').evaluate((element) => element.getBoundingClientRect().width);
  const initial = await width();
  await page.locator('#btn-toggle-left').click();
  await expect(page.locator('#workspace-sidebar')).toBeHidden();
  const withoutLeft = await width();
  expect(withoutLeft).toBeGreaterThan(initial + 150);
  await page.locator('#btn-toggle-right').click();
  await expect(page.locator('#right-sidebar')).toBeHidden();
  const onlyEditor = await width();
  expect(onlyEditor).toBeGreaterThan(withoutLeft + 200);
  await page.locator('#btn-toggle-left').click();
  await expect(page.locator('#workspace-sidebar')).toBeVisible();
  await page.locator('#btn-toggle-right').click();
  await expect(page.locator('#right-sidebar')).toBeVisible();
  await expect.poll(() => page.locator('#btn-nav-forward img').evaluate((element) => window.getComputedStyle(element).transform)).not.toBe('none');
});

test('abas de documentação, console e configurações ocupam a área principal e fecham', async ({ page }) => {
  await openApp(page);
  await page.locator('.doc-item', { hasText: 'Introdução' }).click();
  await expect(page.locator('#editorPanel')).toBeHidden();
  await expect(page.locator('#workspace-aux-view')).toBeVisible();
  await expect.poll(() => page.locator('#workspace-aux-view').evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThan(500);
  await page.locator('.view-tab[data-type="docs"] .view-tab-close').click();
  await expect(page.locator('#editorPanel')).toBeVisible();
  await expect(page.locator('#btn-nav-back')).toBeDisabled();
  await page.locator('.doc-item', { hasText: 'História' }).click();
  await page.locator('#btn-add-tab').click();
  await expect(page.locator('#editorPanel')).toBeVisible();
  await expect(page.locator('.tab-item')).toHaveCount(2);
  await page.locator('#btn-show-console').click();
  await expect(page.locator('#terminalPanel')).toBeVisible();
  await page.locator('.view-tab[data-type="console"] .view-tab-close').click();
  await expect(page.locator('#editorPanel')).toBeVisible();
  await page.locator('#btn-settings').click();
  await expect(page.locator('#workspace-aux-view')).toBeVisible();
  await expect(page.locator('.settings-categories button')).toHaveCount(7);
  await page.locator('.view-tab[data-type="settings"] .view-tab-close').click();
  await expect(page.locator('#editorPanel')).toBeVisible();
});

test('editor e abas não exibem linhas decorativas acima ou abaixo', async ({ page }) => {
  await openApp(page);
  const decoration = async (selector) => page.locator(selector).evaluate((element) => {
    const style = window.getComputedStyle(element);
    return { shadow: style.boxShadow, top: style.borderTopWidth, bottom: style.borderBottomWidth };
  });
  expect((await decoration('.tab-item.active')).shadow).toBe('none');
  expect((await decoration('.tab-bar')).bottom).toBe('0px');
  expect((await decoration('#editorPanel')).top).toBe('0px');
  expect((await decoration('#editorPanel')).bottom).toBe('0px');
  await page.locator('#btn-show-console').click();
  expect((await decoration('.view-tab.active')).shadow).toBe('none');
});

test('paletas mudam a interface inteira e a sintaxe; lua e sol alternam diretamente', async ({ page }) => {
  await openApp(page);
  await setCode(page, 'Algoritmo "Cor"\nVar\n  nome: caractere\nInicio\n  escreva("texto", 42) // comentário\nfimalgoritmo');
  const colors = async () => page.evaluate(() => {
    const color = (selector, property = 'color') => window.getComputedStyle(window.document.querySelector(selector))[property];
    return [color('body', 'backgroundColor'), color('.workspace-sidebar', 'backgroundColor'), color('.editor-panel', 'backgroundColor'), color('.tab-item.active', 'backgroundColor'), color('.cm-keyword'), color('.cm-string'), color('.cm-comment')];
  });
  const dark = await colors();
  await page.locator('#btn-scale').click();
  await page.locator('#workspace-theme-menu button').filter({ hasText: 'Dracula' }).click();
  const dracula = await colors();
  expect(dracula.slice(0, 4)).not.toEqual(dark.slice(0, 4));
  expect(dracula.slice(4)).not.toEqual(dark.slice(4));
  expect(new Set(dracula.slice(4)).size).toBeGreaterThan(1);
  await page.locator('#btn-theme').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('#btn-theme [data-lucide="moon"]')).toBeVisible();
  await page.locator('#btn-theme').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('#btn-theme [data-lucide="sun"]')).toBeVisible();
});

test('console em painel e nova aba sincroniza saída e fontes independentes', async ({ page }) => {
  await openApp(page);
  await setCode(page, programs.output);
  await page.locator('#btn-settings').click();
  await page.locator('.settings-categories button').filter({ hasText: 'Console' }).click();
  await page.locator('#workspace-setting-console-presentation').selectOption('panel');
  await page.locator('.view-tab[data-type="settings"] .view-tab-close').click();
  await page.locator('#debug-run').click();
  await expect(page.locator('#editorPanel')).toBeVisible();
  await expect(page.locator('#terminalPanel')).toBeVisible();
  await expect(page.locator('#terminal-output')).toContainText('atalho funcionando');
  await page.locator('#editor-font-increase').click();
  await expect(page.locator('#editor-font-value')).toHaveText('15px');
  await expect(page.locator('#console-font-value')).toHaveText('13px');
  await page.locator('#console-font-increase').click();
  await expect(page.locator('#console-font-value')).toHaveText('14px');
  await page.locator('#btn-settings').click();
  await page.locator('.settings-categories button').filter({ hasText: 'Console' }).click();
  await page.locator('#workspace-setting-console-presentation').selectOption('browser-tab');
  await page.locator('.view-tab[data-type="settings"] .view-tab-close').click();
  const popupPromise = page.waitForEvent('popup');
  await page.locator('#debug-run').click();
  const popup = await popupPromise;
  await expect(popup.locator('#output')).toContainText('atalho funcionando');
  await popup.close();
});

test('todos os dez temas têm paletas e sintaxe próprias', async ({ page }) => {
  await openApp(page);
  await setCode(page, 'algoritmo "Tema"\nvar\n  n: inteiro\ninicio\n  escreval("Olá", 12) // nota\nfimalgoritmo');
  const themes = ['dark', 'light', 'dracula', 'nord', 'dark-monokai', 'github-dark', 'github-light', 'one-dark', 'solarized-dark', 'solarized-light'];
  const palettes = [];
  for (const theme of themes) {
    const palette = await page.evaluate((name) => {
      const select = window.document.getElementById('setting-theme');
      select.value = name; select.dispatchEvent(new window.Event('change', { bubbles: true }));
      const read = (selector, property) => window.getComputedStyle(window.document.querySelector(selector))[property];
      return [read('body', 'backgroundColor'), read('.workspace-sidebar', 'backgroundColor'), read('.editor-panel', 'backgroundColor'), read('.cm-keyword', 'color'), read('.cm-string', 'color'), read('.cm-number', 'color')];
    }, theme);
    expect(new Set(palette.slice(3)).size).toBeGreaterThan(1);
    palettes.push(palette.join('|'));
  }
  expect(new Set(palettes).size).toBe(themes.length);
});

test('novos temas claros e escuros mudam superfícies e sintaxe', async ({ page }) => {
  await openApp(page);
  await setCode(page, 'algoritmo "Tema"\nvar\n  n: inteiro\ninicio\n  escreval("Olá", 12)\nfimalgoritmo');
  const themes = ['catppuccin-mocha', 'rose-pine', 'gruvbox-dark', 'catppuccin-latte', 'gruvbox-light', 'paper'];
  const palettes = [];
  for (const theme of themes) {
    const palette = await page.evaluate((name) => {
      const select = window.document.getElementById('setting-theme');
      select.value = name; select.dispatchEvent(new window.Event('change', { bubbles: true }));
      const color = (selector, property = 'backgroundColor') => window.getComputedStyle(window.document.querySelector(selector))[property];
      return [color('body'), color('.workspace-sidebar'), color('.editor-panel'), color('.tab-item.active'), color('.cm-keyword', 'color'), color('.cm-string', 'color')];
    }, theme);
    expect(new Set(palette.slice(0, 4)).size).toBeGreaterThan(2);
    expect(palette[4]).not.toBe(palette[5]);
    await expect(page.locator('html')).toHaveAttribute('data-color-mode', themes.indexOf(theme) < 3 ? 'dark' : 'light');
    palettes.push(palette.join('|'));
  }
  expect(new Set(palettes).size).toBe(themes.length);
});

test('fontes independentes persistem e espaçamento acompanha o zoom do editor', async ({ page }) => {
  await openApp(page);
  await page.locator('#btn-settings').click();
  await page.locator('.settings-categories button').filter({ hasText: 'Editor' }).click();
  await page.locator('#workspace-setting-editor-font-family').selectOption('fira-code');
  await page.locator('#workspace-setting-letter-spacing').fill('2');
  await page.locator('#workspace-setting-line-spacing').fill('33');
  await page.locator('.settings-categories button').filter({ hasText: 'Console' }).click();
  await page.locator('#workspace-setting-console-font-family').selectOption('ibm-plex');
  await page.locator('.view-tab[data-type="settings"] .view-tab-close').click();
  const metrics = () => page.evaluate(() => ({
    editorFamily: window.getComputedStyle(window.document.querySelector('.editor-panel .CodeMirror')).fontFamily,
    consoleFamily: window.getComputedStyle(window.document.getElementById('terminal-output')).fontFamily,
    spacing: parseFloat(window.getComputedStyle(window.document.querySelector('.editor-panel .CodeMirror')).letterSpacing),
    lineHeight: parseFloat(window.getComputedStyle(window.document.querySelector('.editor-panel .CodeMirror-line')).lineHeight),
  }));
  const before = await metrics();
  expect(before.editorFamily).toContain('Fira Code');
  expect(before.consoleFamily).toContain('IBM Plex Mono');
  expect(before.spacing).toBeCloseTo(2, 1);
  expect(before.lineHeight).toBeCloseTo(33, 1);
  await page.locator('#editor-font-increase').click();
  const larger = await metrics();
  expect(larger.spacing).toBeGreaterThan(before.spacing);
  expect(larger.lineHeight).toBeGreaterThan(before.lineHeight);
  expect(larger.spacing / before.spacing).toBeCloseTo(15 / 14, 2);
  await page.locator('#editor-font-decrease').click();
  expect((await metrics()).spacing).toBeCloseTo(before.spacing, 1);
  await page.reload();
  expect((await metrics()).editorFamily).toContain('Fira Code');
  expect((await metrics()).consoleFamily).toContain('IBM Plex Mono');
  expect((await metrics()).spacing).toBeCloseTo(2, 1);
  await page.locator('#btn-settings').click();
  await page.locator('.settings-categories button').filter({ hasText: 'Console' }).click();
  await page.locator('#workspace-setting-console-presentation').selectOption('window');
  await page.locator('.view-tab[data-type="settings"] .view-tab-close').click();
  const popupPromise = page.waitForEvent('popup');
  await page.locator('#btn-show-console').click();
  const popup = await popupPromise;
  await expect(popup.locator('body')).toHaveAttribute('data-console-font', 'ibm-plex');
  await expect.poll(() => popup.evaluate(async () => (await window.document.fonts.load('13px "IBM Plex Mono"')).length > 0)).toBe(true);
  await popup.close();
});

test('configuração antiga de espaçamento mantém a aparência após atualização', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('visualg-font-size', '20');
    localStorage.setItem('visualg-editor-letter-spacing', '2');
    localStorage.setItem('visualg-editor-line-spacing', '40');
  });
  await openApp(page);
  const read = () => page.locator('.editor-panel .CodeMirror').evaluate((element) => window.getComputedStyle(element).letterSpacing);
  expect(parseFloat(await read())).toBeCloseTo(2, 1);
  await expect(page.locator('#setting-letter-spacing')).toHaveValue('1.4');
  await page.locator('#editor-font-increase').click();
  expect(parseFloat(await read())).toBeGreaterThan(2);
});

test('atalhos e roda alteram somente a fonte da área em foco', async ({ page }) => {
  await openApp(page);
  await page.locator('.CodeMirror').click();
  await page.keyboard.press('Control+Shift+Equal');
  await expect(page.locator('#editor-font-value')).toHaveText('15px');
  await page.keyboard.press('Control+Minus');
  await expect(page.locator('#editor-font-value')).toHaveText('14px');
  await page.keyboard.down('Control');
  await page.mouse.move(540, 220);
  await page.mouse.wheel(0, -100);
  await page.keyboard.up('Control');
  await expect(page.locator('#editor-font-value')).toHaveText('15px');
  await page.keyboard.press('Control+0');
  await expect(page.locator('#editor-font-value')).toHaveText('14px');
  await page.locator('#btn-show-console').click();
  await page.locator('#terminalPanel').click();
  await page.keyboard.press('Control+Equal');
  await expect(page.locator('#console-font-value')).toHaveText('14px');
  await expect(page.locator('#editor-font-value')).toHaveText('14px');
});

test('aba de arquivo marca alteração, salva e oferece menu contextual', async ({ page }) => {
  await openApp(page);
  await setCode(page, programs.output);
  await expect(page.locator('.tab-item.active')).toHaveClass(/modified/);
  await page.locator('.tab-item.active').click({ button: 'right' });
  await expect(page.locator('#file-context-menu')).toContainText('Fechar aba');
  await page.locator('#editorPanel').click();
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#btn-download-workspace').click();
  await downloadPromise;
  await expect(page.locator('.tab-item.active')).not.toHaveClass(/modified/);
});
