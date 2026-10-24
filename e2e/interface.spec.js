import { expect, test } from '@playwright/test';

const programs = {
  output: ['Algoritmo "Atalhos"', 'Inicio', '  escreval("atalho funcionando")', 'fimalgoritmo'].join('\n'),
  input: ['Algoritmo "Entrada"', 'Var', '  nome: caractere', 'Inicio', '  leia(nome)', '  escreval("Olá, ", nome)', 'fimalgoritmo'].join('\n'),
  invalid: ['Algoritmo "Erro"', 'Inicio', '  valor <- 10', 'fimalgoritmo'].join('\n'),
};

async function openApp(page) {
  await page.goto('/');
  await expect(page.locator('#editor-empty-state')).toBeVisible();
  if (await page.locator('#btn-empty-restore-tabs').isEnabled()) await page.locator('#btn-empty-restore-tabs').click();
  else await createFileThroughWelcome(page);
  await expect(page.locator('.CodeMirror')).toBeVisible();
  await expect.poll(() => page.evaluate(() => Boolean(window.VisualGWorkspace))).toBe(true);
}

async function createFileThroughWelcome(page) {
  const tabsBeforeCreate = await page.locator('.tab-item').count();
  await page.locator('#btn-empty-new').click();
  const dialog = page.locator('.workspace-create-dialog[open]');
  await expect(dialog).toBeVisible();
  await dialog.locator('button[type="submit"]').click();
  await expect(dialog).toBeHidden();
  await expect(page.locator('.tab-item')).toHaveCount(tabsBeforeCreate + 1);
  await expect.poll(() => page.evaluate(() => window.TabManager.getActiveTab()?.fileName || '')).toContain('MeuAlgoritmo');
}

async function useConsolePresentation(page, mode) {
  await page.addInitScript((presentation) => localStorage.setItem('visualg-console-presentation', presentation), mode);
}

test('editor envolve seleções, busca, substitui e seleciona ocorrências', async ({ page }) => {
  await openApp(page);
  await page.evaluate(() => {
    const cm = window.VisualGEditor.instance;
    cm.setValue('escreval(ola)\nnota + nota + nota');
    cm.setSelection({ line:0, ch:9 }, { line:0, ch:12 });
    cm.focus();
  });
  await page.keyboard.insertText('"');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('escreval("ola")\nnota + nota + nota');

  await page.locator('.CodeMirror').click();
  await page.keyboard.press('Control+f');
  await page.locator('.cm-search-widget input[type="search"]').fill('ola');
  await expect(page.locator('.cm-search-current')).toBeVisible();
  await page.keyboard.press('Escape');
  await page.locator('.CodeMirror').click();
  await page.evaluate(() => { const cm = window.VisualGEditor.instance; cm.setCursor({ line:1, ch:1 }); cm.focus(); });
  await page.keyboard.press('Control+d');
  expect(await page.evaluate(() => window.VisualGEditor.instance.listSelections().length)).toBe(2);
  await page.keyboard.press('Control+Shift+l');
  expect(await page.evaluate(() => window.VisualGEditor.instance.listSelections().length)).toBe(3);
  await page.evaluate(() => { const cm = window.VisualGEditor.instance; cm.setValue('um dois tres'); cm.setCursor({ line:0, ch:4 }); });
  const altClick = await page.evaluate(() => {
    const cm = window.VisualGEditor.instance;
    const point = cm.charCoords({ line:0, ch:8 }, 'window');
    return { x:point.left + 2, y:(point.top + point.bottom) / 2 };
  });
  await page.keyboard.down('Alt');
  await page.mouse.click(altClick.x, altClick.y);
  await page.keyboard.up('Alt');
  expect(await page.evaluate(() => window.VisualGEditor.instance.listSelections().length)).toBe(2);
  await page.evaluate(() => { const cm = window.VisualGEditor.instance; cm.setValue('escreval("ola")\nnota + nota + nota'); cm.setCursor({ line:1, ch:1 }); cm.focus(); });
  await page.keyboard.press('Control+h');
  await page.locator('.cm-search-widget input[type="search"]').fill('nota');
  await page.locator('.cm-search-widget input[type="text"]').fill('valor');
  await page.locator('.cm-search-widget button[title="Substituir todas as ocorrências"]').click();
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('escreval("ola")\nvalor + valor + valor');
});

test('autoindentação preserva comentários, cursor e permite desfazer', async ({ page }) => {
  await openApp(page);
  await page.evaluate(() => {
    const cm = window.VisualGEditor.instance;
    cm.setValue('Algoritmo "Teste"\nInicio\nse verdadeiro entao\nescreval("faca") // comentario\nfimse\nfimalgoritmo');
    cm.setCursor({ line:3, ch:12 });
  });
  await page.locator('#btn-tab-indent').click();
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('Algoritmo "Teste"\nInicio\n  se verdadeiro entao\n    escreval("faca") // comentario\n  fimse\nfimalgoritmo');
  expect(await page.evaluate(() => window.VisualGEditor.instance.getCursor().line)).toBe(3);
  await page.keyboard.press('Control+z');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toContain('escreval("faca") // comentario');
  expect(await page.evaluate(() => window.VisualGEditor.getValue())).toContain('\nse verdadeiro entao\n');
});

test('inicia na tela de boas-vindas e permite restaurar as abas salvas', async ({ page }) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem('visualg-workspace-v1')) localStorage.setItem('visualg-workspace-v1', JSON.stringify({
      version: 1, activeTabId: 'saved-1', updatedAt: new Date().toISOString(),
      tabs: [{ id: 'saved-1', name: 'Sessão anterior', fileName: 'sessao.alg', code: 'Algoritmo "Sessão anterior"\nInicio\nfimalgoritmo', dirty: false }],
    }));
  });
  await page.goto('/');
  await expect(page.locator('#editor-empty-state')).toBeVisible();
  await expect(page.locator('#workspace-file-list')).toContainText('sessao.alg');
  await expect(page.locator('.tab-item')).toBeHidden();
  await expect(page.locator('#btn-empty-new')).toBeVisible();
  await expect(page.locator('#btn-empty-import')).toBeVisible();
  await expect(page.locator('#btn-empty-docs')).toBeVisible();
  await expect(page.locator('#btn-empty-restore-section')).toHaveCount(0);
  await expect(page.locator('#btn-empty-restore-tabs')).toBeEnabled();
  const savedTabsBeforeReload = await page.evaluate(() => JSON.parse(localStorage.getItem('visualg-workspace-v1')).tabs);
  await page.reload();
  await expect(page.locator('#editor-empty-state')).toBeVisible();
  await expect(page.locator('#workspace-file-list')).toContainText('sessao.alg');
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('visualg-workspace-v1')).tabs)).toEqual(savedTabsBeforeReload);
  await page.locator('#btn-empty-restore-tabs').click();
  await expect(page.locator('.tab-item')).toContainText('sessao.alg');
  await expect(page.locator('#editor-empty-state')).toBeHidden();
});

test('selecionar arquivo na lateral fecha a tela inicial e abre seu conteúdo', async ({ page }) => {
  const code = 'Algoritmo "Arquivo visível"\nInicio\n  escreval("conteúdo preservado")\nfimalgoritmo';
  await page.addInitScript((source) => localStorage.setItem('visualg-workspace-v1', JSON.stringify({
    version: 1, activeTabId: 'saved-file', updatedAt: new Date().toISOString(),
    tabs: [{ id: 'saved-file', name: 'Arquivo visível', fileName: 'arquivo-visivel.alg', code: source, dirty: false }],
  })), code);
  await page.goto('/');
  await expect(page.locator('#editor-empty-state')).toBeVisible();
  await expect(page.locator('.tab-item')).toBeHidden();
  await page.locator('.file-item').filter({ hasText: 'arquivo-visivel.alg' }).click();
  await expect(page.locator('#editor-empty-state')).toBeHidden();
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe(code);
});

test('mostra códigos recentes na tela inicial e reabre o arquivo escolhido', async ({ page }) => {
  const code = 'Algoritmo "Recente"\nInicio\n  escreval("ok")\nfimalgoritmo';
  await page.addInitScript((source) => localStorage.setItem('visualg-workspace-v1', JSON.stringify({
    version: 1, activeTabId: 'saved-recent', updatedAt: new Date().toISOString(),
    tabs: [{ id: 'saved-recent', name: 'Recente', fileName: 'recente.alg', code: source, dirty: false }],
  })), code);
  await page.goto('/');
  await expect(page.locator('#editor-recent-files')).toBeVisible();
  await page.locator('#editor-recent-list button', { hasText: 'recente.alg' }).click();
  await expect(page.locator('#editor-empty-state')).toBeHidden();
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe(code);
});

test('fechar aba mantém arquivo novo no projeto', async ({ page }) => {
  await openApp(page);
  await page.locator('#btn-add-tab').click();
  const tabsBeforeNew = await page.locator('.tab-item').count();
  await createFileThroughWelcome(page);
  await expect(page.locator('.tab-item')).toHaveCount(tabsBeforeNew + 1);
  const createdFile = page.locator('#workspace-file-list .file-item').filter({ hasText: 'MeuAlgoritmo (cópia 1).alg' });
  await expect(createdFile).toBeVisible();
  await page.locator('.tab-item.active .tab-close').click();
  await expect(page.locator('.tab-item')).toHaveCount(tabsBeforeNew);
  await expect(createdFile).toBeVisible();
});

test('arquivo com código continua no projeto após fechar e recarregar', async ({ page }) => {
  await openApp(page);
  await page.locator('#btn-add-tab').click();
  await createFileThroughWelcome(page);
  const code = 'Algoritmo "Guardado"\nInicio\n  escreval("salvo")\nfimalgoritmo';
  await page.evaluate((source) => window.VisualGEditor.setValue(source), code);
  const createdFile = page.locator('#workspace-file-list .file-item').filter({ hasText: 'MeuAlgoritmo (cópia 1).alg' });
  await expect(createdFile).toBeVisible();
  await page.locator('.tab-item.active .tab-close').click();
  await page.reload();
  await page.locator('.file-item').filter({ hasText: 'MeuAlgoritmo (cópia 1).alg' }).click();
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe(code);
});

test('trocar arquivos mantém uma aba, preserva os códigos e a ordem por nome após recarregar', async ({ page }) => {
  const first = 'Algoritmo "Primeiro"\nInicio\nescreval("A")\nfimalgoritmo';
  const second = 'Algoritmo "Segundo"\nInicio\nescreval("B")\nfimalgoritmo';
  await page.addInitScript(({ firstCode, secondCode }) => {
    if (!localStorage.getItem('visualg-workspace-v1')) localStorage.setItem('visualg-workspace-v1', JSON.stringify({ version:1, activeTabId:'tab-1', updatedAt:new Date().toISOString(), tabs:[{ id:'tab-1', fileName:'primeiro.alg', code:firstCode, used:true }] }));
    if (!localStorage.getItem('visualg-closed-files-v1')) localStorage.setItem('visualg-closed-files-v1', JSON.stringify([{ id:'tab-2', fileName:'segundo.alg', code:secondCode, used:true, closed:true }]));
  }, { firstCode:first, secondCode:second });
  await page.goto('/');
  const fileNames = page.locator('#workspace-file-list > .file-item:not(.file-folder) .file-label');
  await expect(fileNames).toHaveText(['primeiro.alg', 'segundo.alg']);
  for (let repeat = 0; repeat < 3; repeat++) {
    await page.locator('#workspace-file-list .file-item').filter({ hasText:'segundo.alg' }).click();
    await expect.poll(() => page.evaluate(() => window.TabManager.getTabs().map((tab) => tab.code))).toEqual([second]);
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('visualg-closed-files-v1')).find((tab) => tab.fileName === 'primeiro.alg')?.code)).toBe(first);
    await expect(fileNames).toHaveText(['primeiro.alg', 'segundo.alg']);
    await page.reload();
    await expect.poll(() => page.evaluate(() => window.TabManager.getTabs().map((tab) => tab.code))).toEqual([second]);
    await expect(page.locator('#workspace-file-list .file-item:not(.file-folder)')).toHaveCount(2);
    await page.locator('#workspace-file-list .file-item').filter({ hasText:'primeiro.alg' }).click();
    await expect.poll(() => page.evaluate(() => window.TabManager.getTabs().map((tab) => tab.code))).toEqual([first]);
    await expect(fileNames).toHaveText(['primeiro.alg', 'segundo.alg']);
    await page.reload();
    await expect.poll(() => page.evaluate(() => window.TabManager.getTabs().map((tab) => tab.code))).toEqual([first]);
  }
  await page.locator('#workspace-file-search').fill('segundo');
  await expect(fileNames).toHaveText(['segundo.alg']);
});

test('troca pela lista guarda edições pendentes e recolhe abas antigas', async ({ page }) => {
  const codes = ['Algoritmo "Alfa"\nInicio\nfimalgoritmo', 'Algoritmo "Beta"\nInicio\nfimalgoritmo', 'Algoritmo "Gama"\nInicio\nfimalgoritmo'];
  const edited = 'Algoritmo "Beta"\nInicio\nescreval("edição recente")\nfimalgoritmo';
  await page.addInitScript((sources) => {
    if (!localStorage.getItem('visualg-workspace-v1')) localStorage.setItem('visualg-workspace-v1', JSON.stringify({ version:1, activeTabId:'file-a', updatedAt:new Date().toISOString(), tabs:sources.map((code, index) => ({ id:'file-' + 'abc'[index], fileName:['alfa.alg', 'beta.alg', 'gama.alg'][index], code, used:true })) }));
  }, codes);
  await page.goto('/');
  await page.locator('#workspace-file-list .file-item').filter({ hasText:'beta.alg' }).click();
  await expect.poll(() => page.evaluate(() => window.TabManager.getTabs().map((tab) => tab.code))).toEqual([codes[1]]);
  await page.evaluate((source) => window.VisualGEditor.setValue(source), edited);
  await page.locator('#workspace-file-list .file-item').filter({ hasText:'alfa.alg' }).click();
  await expect.poll(() => page.evaluate(() => window.TabManager.getTabs().map((tab) => tab.code))).toEqual([codes[0]]);
  await page.reload();
  await page.locator('#workspace-file-list .file-item').filter({ hasText:'beta.alg' }).click();
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe(edited);
  await expect(page.locator('.tab-item')).toHaveCount(1);
  await expect(page.locator('#workspace-file-list > .file-item:not(.file-folder) .file-label')).toHaveText(['alfa.alg', 'beta.alg', 'gama.alg']);
});

test('fechar uma aba na tela inicial não substitui seu código pelo modelo', async ({ page }) => {
  const source = 'Algoritmo "Salvo"\nInicio\nescreval("preservado")\nfimalgoritmo';
  await page.addInitScript((code) => { if (!localStorage.getItem('visualg-workspace-v1')) localStorage.setItem('visualg-workspace-v1', JSON.stringify({ version:1, activeTabId:'saved-active', updatedAt:new Date().toISOString(), tabs:[{ id:'saved-active', fileName:'salvo.alg', code, used:true }] })); }, source);
  await page.goto('/');
  await expect(page.locator('#editor-empty-state')).toBeVisible();
  await page.evaluate(() => window.TabManager.closeTab('saved-active'));
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('visualg-closed-files-v1')).find((item) => item.fileName === 'salvo.alg').code)).toBe(source);
  await page.reload();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('visualg-closed-files-v1')).find((item) => item.fileName === 'salvo.alg').code)).toBe(source);
  await expect(page.locator('#workspace-file-list .file-item').filter({ hasText:'salvo.alg' })).toHaveCount(1);
});

test('abas de ferramentas permanecem visíveis depois de fechar o último código', async ({ page }) => {
  await useConsolePresentation(page, 'tab');
  await openApp(page);
  await page.evaluate(() => {
    window.VisualGWorkspace.showSettings();
    window.VisualGWorkspace.showDoc('introducao');
    window.VisualGWorkspace.showConsole();
  });
  await expect(page.locator('.view-tab[data-type="settings"]')).toHaveCount(1);
  await expect(page.locator('.view-tab[data-type="console"]')).toHaveCount(1);
  await expect(page.locator('.view-tab[data-type="docs"]')).toHaveCount(1);

  await page.evaluate(() => window.TabManager.getTabs().slice().forEach((tab) => window.TabManager.closeTab(tab.id)));
  await expect(page.locator('.editor-column')).toHaveClass(/start-screen-active/);
  for (const type of ['settings', 'console', 'docs']) {
    await expect(page.locator('.view-tab[data-type="' + type + '"]')).toBeVisible();
  }
  await page.locator('.view-tab[data-type="settings"]').click();
  await expect(page.locator('.workspace-settings')).toBeVisible();
  await page.locator('.view-tab[data-type="docs"]').click();
  await expect(page.locator('#workspace-aux-view')).toBeVisible();
  await page.locator('.view-tab[data-type="console"]').click();
  await expect(page.locator('#workspace-aux-view')).toBeHidden();
});

test('IDs repetidos são reparados sem descartar códigos diferentes', async ({ page }) => {
  const codeA = 'Algoritmo "A"\nInicio\nfimalgoritmo';
  const codeB = 'Algoritmo "B"\nInicio\nfimalgoritmo';
  const codeC = 'Algoritmo "C"\nInicio\nfimalgoritmo';
  await page.addInitScript(({ first, second, third }) => {
    if (!localStorage.getItem('visualg-workspace-v1')) localStorage.setItem('visualg-workspace-v1', JSON.stringify({ version:1, activeTabId:'tab-1', updatedAt:new Date().toISOString(), tabs:[
      { id:'tab-1', fileName:'programa.alg', code:first, used:true },
      { id:'tab-1', fileName:'programa.alg', code:second, used:true },
    ] }));
    if (!localStorage.getItem('visualg-closed-files-v1')) localStorage.setItem('visualg-closed-files-v1', JSON.stringify([{ id:'tab-1', fileName:'programa.alg', code:third, closed:true }]));
  }, { first:codeA, second:codeB, third:codeC });
  await page.goto('/');
  await expect.poll(() => page.evaluate(() => new Set(window.TabManager.getTabs().map((tab) => tab.id)).size)).toBe(2);
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('visualg-closed-files-v1')).length)).toBe(1);
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('visualg-closed-files-v1'))[0].id)).not.toBe('tab-1');
  await page.reload();
  await expect.poll(() => page.evaluate(() => window.TabManager.getTabs().map((tab) => tab.code))).toEqual([codeA, codeB]);
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('visualg-closed-files-v1'))[0].code)).toBe(codeC);
});

test('menu de contexto usa pílulas ajustáveis sem sliders e permite fonte maior que 50', async ({ page }) => {
  await page.setViewportSize({ width:858, height:699 });
  await openApp(page);
  await page.locator('.CodeMirror').click({ button:'right' });
  const menu = page.locator('#editor-quick-menu');
  await expect(menu).toBeVisible();
  const fontSelector = menu.locator('.editor-quick-field').filter({ hasText:'Fonte' }).locator('select');
  const font = menu.locator('.editor-quick-field').filter({ hasText:'Tamanho da fonte' });
  const selectorBox = await fontSelector.boundingBox();
  const numericBox = await font.locator('.editor-quick-numeric-control').boundingBox();
  expect(Math.abs(selectorBox.x - numericBox.x)).toBeLessThanOrEqual(1);
  await expect(menu.locator('input[type="range"]')).toHaveCount(0);
  await expect(font.locator('input[type="number"]')).toBeHidden();
  const fontPill = font.locator('.editor-quick-value-pill');
  await fontPill.hover();
  await page.mouse.wheel(0, -100);
  await expect(fontPill).toHaveText('15');
  await expect(page.locator('#setting-font-size')).toHaveValue('15');
  await page.mouse.wheel(0, 100);
  await expect(fontPill).toHaveText('14');
  const initialFontBox = await fontPill.boundingBox();
  await page.mouse.move(initialFontBox.x + initialFontBox.width / 2, initialFontBox.y + initialFontBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(initialFontBox.x + initialFontBox.width / 2 + 290, initialFontBox.y + initialFontBox.height / 2);
  await page.mouse.up();
  await expect(fontPill).toHaveText('72');
  await expect(page.locator('#setting-font-size')).toHaveValue('72');
  const fontPillBox = await fontPill.boundingBox();
  await page.mouse.move(fontPillBox.x + fontPillBox.width / 2, fontPillBox.y + fontPillBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(fontPillBox.x + fontPillBox.width / 2 + 5, fontPillBox.y + fontPillBox.height / 2);
  await page.mouse.up();
  await expect(fontPill).toHaveText('73');
  await font.locator('button[aria-label^="Aumentar"]').click();
  await expect(fontPill).toHaveText('74');
  await font.locator('button[aria-label^="Diminuir"]').click();
  await expect(page.locator('#setting-font-size')).toHaveValue('73');
  await font.locator('button[aria-label^="Diminuir"]').click();
  await expect(fontPill).toHaveText('72');
  const tabSize = menu.locator('.editor-quick-field').filter({ hasText:'Tamanho da tabulação' });
  await tabSize.locator('button[aria-label^="Aumentar"]').click();
  await expect(page.locator('#setting-tab-size')).toHaveValue('4');
  await tabSize.locator('button[aria-label^="Diminuir"]').click();
  await expect(page.locator('#setting-tab-size')).toHaveValue('2');
  const spacing = menu.locator('.editor-quick-field').filter({ hasText:'Espaçamento entre letras' });
  const spacingPill = spacing.locator('.editor-quick-value-pill');
  await spacingPill.focus();
  await page.keyboard.press('End');
  await expect(spacingPill).toHaveText('10');
  await page.reload();
  await expect.poll(() => page.evaluate(() => localStorage.getItem('visualg-font-size'))).toBe('72');
  await expect(page.locator('input[type="range"]')).toHaveCount(0);
});

test('pílulas das configurações têm ajustes incrementais e cabem sem sobreposição', async ({ page }) => {
  await page.setViewportSize({ width:900, height:760 });
  await openApp(page);
  await page.evaluate(() => window.VisualGWorkspace.showSettings('Editor'));
  await page.locator('.settings-categories button').filter({ hasText:'Editor' }).click();
  const fontGroup = page.locator('.workspace-setting-group').filter({ hasText:'Tamanho da fonte' }).first();
  await fontGroup.locator('button[aria-label^="Aumentar"]').click();
  await expect(fontGroup.locator('input[type="number"]')).toHaveValue('15');
  await expect(fontGroup.locator('input[type="range"]')).toHaveCount(0);
  await expect(fontGroup.locator('output')).toHaveText('15 px');
  const fontPill = fontGroup.locator('.workspace-setting-value');
  await fontPill.hover();
  await page.mouse.wheel(0, -100);
  await expect(fontGroup.locator('input[type="number"]')).toHaveValue('16');
  await expect(fontPill).toHaveText('16 px');
  await page.mouse.wheel(0, 100);
  await expect(fontGroup.locator('input[type="number"]')).toHaveValue('15');
  await expect(fontPill).toHaveText('15 px');
  const boxes = await fontGroup.locator('.workspace-setting-control-row > :not([hidden])').evaluateAll((nodes) => nodes.map((node) => {
    const rect = node.getBoundingClientRect();
    return { left:rect.left, right:rect.right };
  }));
  for (let index = 1; index < boxes.length; index++) {
    expect(boxes[index].left).toBeGreaterThanOrEqual(boxes[index - 1].right - 1);
  }
  const numericInput = fontGroup.locator('input[type="number"]');
  const tabGroup = page.locator('.workspace-setting-group').filter({ has:page.locator('#workspace-setting-tab-size') });
  await expect(tabGroup.locator('.workspace-setting-value')).toHaveAttribute('aria-valuemax', '4');
  await tabGroup.locator('button[aria-label^="Aumentar"]').click();
  await expect(page.locator('#workspace-setting-tab-size')).toHaveValue('4');
  await tabGroup.locator('button[aria-label^="Diminuir"]').click();
  await expect(page.locator('#workspace-setting-tab-size')).toHaveValue('2');
});

test('criação rápida preserva códigos e IDs únicos após recarregar', async ({ page }) => {
  await openApp(page);
  const initialCount = await page.evaluate(() => window.TabManager.getTabs().length);
  await page.evaluate(() => {
    for (let index = 0; index < 12; index++) {
      window.TabManager.createTab(`Algoritmo "Arquivo${index}"\nInicio\nescreval(${index})\nfimalgoritmo`, { fileName:`arquivo-${index}.alg`, forceNew:true });
    }
  });
  await page.reload();
  await expect.poll(() => page.evaluate(() => window.TabManager.getTabs().length)).toBe(initialCount + 12);
  await expect.poll(() => page.evaluate(() => new Set(window.TabManager.getTabs().map((tab) => tab.id)).size)).toBe(initialCount + 12);
  for (let index = 0; index < 12; index++) {
    await expect.poll(() => page.evaluate((i) => window.TabManager.getTabs().find((tab) => tab.fileName === `arquivo-${i}.alg`)?.code, index)).toContain(`escreval(${index})`);
  }
});

test('falha ao arquivar impede o fechamento e preserva o código', async ({ page }) => {
  await openApp(page);
  const code = 'Algoritmo "Seguro"\nInicio\nescreval("não perder")\nfimalgoritmo';
  await setCode(page, code);
  const id = await page.evaluate(() => window.TabManager.getActiveTab().id);
  await page.evaluate(() => {
    const original = window.Storage.prototype.setItem;
    window.__restoreSetItem = () => { window.Storage.prototype.setItem = original; };
    window.Storage.prototype.setItem = function (key, value) {
      if (key === 'visualg-closed-files-v1') throw new Error('Armazenamento cheio');
      return original.call(this, key, value);
    };
  });
  await expect.poll(() => page.evaluate((tabId) => window.TabManager.closeTab(tabId), id)).toBe(false);
  await expect.poll(() => page.evaluate((tabId) => window.TabManager.getTabs().find((tab) => tab.id === tabId)?.code, id)).toBe(code);
  await page.evaluate(() => window.__restoreSetItem());
  await page.reload();
  await expect.poll(() => page.evaluate((tabId) => window.TabManager.getTabs().find((tab) => tab.id === tabId)?.code, id)).toBe(code);
});

test('sessão ilegível é preservada antes de iniciar outra', async ({ page }) => {
  const damaged = '{"tabs":[{"code":"Algoritmo \\"Salvo"';
  await page.addInitScript((raw) => { if (!localStorage.getItem('visualg-workspace-v1')) localStorage.setItem('visualg-workspace-v1', raw); }, damaged);
  await page.goto('/');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('visualg-workspace-corrupt-v1'))).toBe(damaged);
  await expect.poll(() => page.evaluate(() => window.TabManager.freshWorkspace)).toBe(false);
  await expect(page.locator('#workspace-file-list')).not.toContainText('idade.alg');
});

test('importar o mesmo nome duas vezes cria cópias sem substituir códigos', async ({ page }) => {
  await openApp(page);
  const first = 'Algoritmo "EntradaUm"\nInicio\nescreval(1)\nfimalgoritmo';
  const second = 'Algoritmo "EntradaDois"\nInicio\nescreval(2)\nfimalgoritmo';
  await page.locator('#file-input').setInputFiles({ name:'entrada.alg', mimeType:'text/plain', buffer:Buffer.from(first) });
  await expect.poll(() => page.evaluate(() => window.TabManager.getTabs().filter((tab) => tab.fileName === 'entrada.alg').length)).toBe(1);
  await page.locator('#file-input').setInputFiles({ name:'entrada.alg', mimeType:'text/plain', buffer:Buffer.from(second) });
  await expect.poll(() => page.evaluate(() => window.TabManager.getTabs().filter((tab) => /^entrada(?: \(cópia \d+\))?\.alg$/.test(tab.fileName || '')).length)).toBe(2);
  await page.reload();
  await expect.poll(() => page.evaluate(() => window.TabManager.getTabs().filter((tab) => /^entrada(?: \(cópia \d+\))?\.alg$/.test(tab.fileName || '')).map((tab) => tab.code).sort())).toEqual([first, second].sort());
});

test('selecionar outro arquivo aberto na lateral também sai da tela inicial', async ({ page }) => {
  const first = 'Algoritmo "Primeiro"\nInicio\nfimalgoritmo';
  const second = 'Algoritmo "Segundo"\nInicio\n  escreval("segundo arquivo")\nfimalgoritmo';
  await page.addInitScript(({ firstCode, secondCode }) => localStorage.setItem('visualg-workspace-v1', JSON.stringify({
    version: 1, activeTabId: 'first-tab', updatedAt: new Date().toISOString(),
    tabs: [
      { id: 'first-tab', name: 'Primeiro', fileName: 'primeiro.alg', code: firstCode, dirty: false },
      { id: 'second-tab', name: 'Segundo', fileName: 'segundo.alg', code: secondCode, dirty: false },
    ],
  })), { firstCode: first, secondCode: second });
  await page.goto('/');
  await expect(page.locator('#editor-empty-state')).toBeVisible();
  await page.locator('.file-item').filter({ hasText: 'segundo.alg' }).click();
  await expect(page.locator('#editor-empty-state')).toBeHidden();
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe(second);
});

test('menu de ações rápidas permanece acima dos arquivos e mostra todas as ações excedentes', async ({ page }) => {
  await openApp(page);
  const toolbar = page.locator('.sidebar-actions');
  await toolbar.evaluate((element) => { element.style.width = '100px'; element.style.flex = '0 0 100px'; });
  const trigger = page.locator('#sidebar-actions-more');
  await expect(trigger).toBeVisible();
  await trigger.click();
  const menu = page.locator('#sidebar-actions-menu');
  await expect(menu).toBeVisible();
  await expect(menu.getByRole('menuitem')).toHaveCount(4);
  await expect(menu).toContainText('Exportar arquivo');
  await expect(menu).toContainText('Criar novo arquivo');
  await expect(menu).toContainText('Criar nova pasta');
  await expect(menu).toContainText('Duplicar arquivo');
  await expect(menu.locator('.sidebar-actions-menu-heading')).toHaveText('Ações rápidas');
  const menuStyle = await menu.evaluate((element) => {
    const style = window.getComputedStyle(element);
    return { background: style.backgroundColor, borderRadius: style.borderRadius, shadow: style.boxShadow };
  });
  expect(menuStyle.background).not.toBe('rgba(0, 0, 0, 0)');
  expect(menuStyle.borderRadius).toBe('9px');
  expect(menuStyle.shadow).not.toBe('none');
  expect(await menu.evaluate((element) => element.parentElement === element.ownerDocument.body)).toBe(true);
  expect(await menu.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return element.ownerDocument.elementFromPoint(rect.left + 12, rect.top + 12)?.closest('#sidebar-actions-menu') === element;
  })).toBe(true);
});

test('ações rápidas são recalculadas ao voltar da documentação para Arquivos', async ({ page }) => {
  await openApp(page);
  await page.locator('.sidebar-actions').evaluate((element) => { element.style.width = '100px'; element.style.flex = '0 0 100px'; });
  await expect(page.locator('#sidebar-actions-more')).toBeVisible();
  await page.locator('#btn-sidebar-docs').click();
  await expect(page.locator('#sidebar-docs-panel')).toBeVisible();
  await page.locator('#btn-sidebar-files').click();
  await expect(page.locator('#sidebar-files-panel')).toBeVisible();
  const trigger = page.locator('#sidebar-actions-more');
  await expect(trigger).toBeVisible();
  await trigger.click();
  const menu = page.locator('#sidebar-actions-menu');
  await expect(menu).toBeVisible();
  await expect(menu.getByRole('menuitem')).toHaveCount(4);
  await expect(menu).toContainText('Duplicar arquivo');
});

test('restaura laterais recolhidas ao arrastar para dentro a partir da borda, sem botões extras', async ({ page }) => {
  await openApp(page);
  await expect(page.locator('#restore-left-edge, #restore-right-edge')).toHaveCount(0);
  const leftDivider = await page.locator('#left-resizer').boundingBox();
  await page.mouse.move(leftDivider.x + leftDivider.width / 2, leftDivider.y + 100);
  await page.mouse.down();
  await page.mouse.move(4, leftDivider.y + 100, { steps: 5 });
  await page.mouse.up();
  await expect(page.locator('body')).toHaveClass(/sidebar-left-collapsed/);
  await page.mouse.move(4, 420);
  await page.mouse.down();
  await page.mouse.move(64, 420, { steps: 4 });
  await page.mouse.up();
  await expect(page.locator('body')).not.toHaveClass(/sidebar-left-collapsed/);

  const rightDivider = await page.locator('#right-resizer').boundingBox();
  const viewportWidth = await page.evaluate(() => window.innerWidth);
  await page.mouse.move(rightDivider.x + rightDivider.width / 2, rightDivider.y + 100);
  await page.mouse.down();
  await page.mouse.move(viewportWidth - 4, rightDivider.y + 100, { steps: 5 });
  await page.mouse.up();
  await expect(page.locator('body')).toHaveClass(/sidebar-right-collapsed/);
  const width = viewportWidth;
  await page.mouse.move(width - 4, 420);
  await page.mouse.down();
  await page.mouse.move(width - 64, 420, { steps: 4 });
  await page.mouse.up();
  await expect(page.locator('body')).not.toHaveClass(/sidebar-right-collapsed/);
});

test('abrir um arquivo fechado na lateral sai da tela inicial e arquiva a aba anterior', async ({ page }) => {
  const previous = 'Algoritmo "Anterior"\nInicio\nfimalgoritmo';
  const archived = 'Algoritmo "Arquivado"\nInicio\n  escreval("arquivo arquivado")\nfimalgoritmo';
  await page.addInitScript(({ previousCode, archivedCode }) => {
    localStorage.setItem('visualg-workspace-v1', JSON.stringify({
      version: 1, activeTabId: 'active-tab', updatedAt: new Date().toISOString(),
      tabs: [{ id: 'active-tab', name: 'Anterior', fileName: 'anterior.alg', code: previousCode, dirty: false }],
    }));
    localStorage.setItem('visualg-closed-files-v1', JSON.stringify([
      { id: 'closed-tab', name: 'Arquivado', fileName: 'arquivado.alg', code: archivedCode, closed: true },
    ]));
  }, { previousCode: previous, archivedCode: archived });
  await page.goto('/');
  await expect(page.locator('#editor-empty-state')).toBeVisible();
  await page.locator('.file-item').filter({ hasText: 'arquivado.alg' }).click();
  await expect(page.locator('#editor-empty-state')).toBeHidden();
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe(archived);
  await expect(page.locator('.tab-item')).toHaveCount(1);
  await expect.poll(() => page.evaluate(() => window.TabManager.getTabs().map((tab) => tab.code))).toEqual([archived]);
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('visualg-closed-files-v1')).find((tab) => tab.fileName === 'anterior.alg')?.code)).toBe(previous);
});

async function setCode(page, code) {
  await page.evaluate((source) => window.VisualGEditor.setValue(source), code);
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe(code);
}

test('abre e executa um exemplo da galeria', async ({ page }) => {
  await openApp(page);
  await page.locator('#btn-sidebar-docs').click();
  await page.locator('#btn-examples-sidebar').click();
  await expect(page.locator('#workspace-aux-view')).toBeVisible();
  await page.locator('.workspace-example-card', { hasText: 'Olá, mundo!' }).getByRole('button', { name: 'Executar' }).click();
  await expect(page.locator('#terminal-output')).toContainText('Olá, mundo!');
  await expect(page.locator('#debug-status')).toContainText('Finalizado');
});

test('abre a documentação no centro e navega de volta ao editor', async ({ page }) => {
  await openApp(page);
  await page.locator('#btn-sidebar-docs').click();
  await page.locator('.doc-item', { hasText: 'Introdução' }).click();
  await expect(page.locator('#workspace-aux-view')).toBeVisible();
  await expect(page.locator('#workspace-aux-view')).toContainText('VisuAlg');
  await page.locator('.docs-page-navigation-next').click();
  await expect(page.locator('#workspace-aux-view')).toContainText('VisuAlg.dev');
  await expect(page.locator('.view-tab[data-type="docs"]')).toHaveCount(1);
  await expect(page.locator('.docs-article img')).toHaveCount(3);
  await expect.poll(() => page.locator('.docs-article img').evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0))).toBe(true);
  await page.locator('#btn-nav-back').click();
  await expect(page.locator('.docs-article')).toContainText('Introdução ao VisuAlg Web');
  await page.locator('#btn-nav-back').click();
  await expect(page.locator('#editorPanel')).toBeVisible();
  await page.locator('#btn-nav-forward').click();
  await expect(page.locator('#workspace-aux-view')).toBeVisible();
  await page.locator('.doc-item', { hasText: 'Status do projeto' }).click();
  await expect(page.locator('.docs-article')).toContainText('6 de outubro de 2026');
  await expect(page.locator('.docs-article img')).toHaveCount(2);
  await expect.poll(() => page.locator('.docs-article img').evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0))).toBe(true);
});

test('a documentação destaca desafios antes do sumário e seus links abrem os artigos', async ({ page }) => {
  await openApp(page);
  await page.locator('#btn-sidebar-docs').click();
  await expect(page.locator('.doc-item').first()).toContainText('Desafios do Dia');
  await page.locator('.docs-title').hover();
  await page.locator('#btn-docs-sidebar').click();
  await expect(page.locator('.docs-article')).toContainText('Sumário');
  await page.locator('.docs-article a[href="#doc:introducao"]').click();
  await expect(page.locator('.docs-article')).toContainText('Introdução ao VisuAlg Web');
  await page.locator('.docs-page-navigation-previous').click();
  await expect(page.locator('.docs-article')).toContainText('Sumário');
  await page.locator('.doc-item', { hasText: 'Editor e arquivos' }).click();
  await expect(page.locator('.docs-article')).toContainText('Ctrl+Shift+L');
  await expect(page.locator('.docs-article')).toContainText('F11 permanece reservado');
});

test('relatar problema explica o destino antes de abrir Issues', async ({ page }) => {
  await openApp(page);
  await page.locator('#btn-report-bug').click();
  const dialog = page.locator('#report-issue-dialog');
  await expect(dialog).toBeVisible();
  await expect.poll(() => dialog.evaluate((node) => {
    const rect = node.getBoundingClientRect();
    return Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2) < 2
      && Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2) < 2;
  })).toBe(true);
  await expect(dialog).toContainText('github.com/Gregorio-A/visualg-web/issues');
  await page.evaluate(() => {
    window.__openedIssueTabs = [];
    window.open = (url, target, features) => { window.__openedIssueTabs.push({ url, target, features }); return null; };
  });
  await dialog.locator('[data-report-cancel]').click();
  await expect(dialog).toBeHidden();
  await page.locator('#btn-report-bug').click();
  await dialog.locator('[value="continue"]').click();
  await expect.poll(() => page.evaluate(() => window.__openedIssueTabs.length)).toBe(1);
  await expect.poll(() => page.evaluate(() => window.__openedIssueTabs[0])).toEqual({
    url: 'https://github.com/Gregorio-A/visualg-web/issues', target: '_blank', features: 'noopener,noreferrer',
  });
});

test('modal de criar arquivo permanece centralizado na janela', async ({ page }) => {
  await openApp(page);
  await page.locator('#btn-new-workspace-file').click();
  const dialog = page.locator('#new-workspace-file-dialog');
  await expect(dialog).toBeVisible();
  await expect.poll(() => dialog.evaluate((node) => {
    const rect = node.getBoundingClientRect();
    return Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2) < 2
      && Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2) < 2;
  })).toBe(true);
  await dialog.locator('[data-create-cancel]').click();
});

test('configurações usam fontes em px e abrem o console em modal grande por padrão', async ({ page }) => {
  await openApp(page);
  await expect(page.locator('#setting-console-presentation')).toHaveValue('modal');
  await page.locator('#btn-settings').click();
  await page.locator('.settings-categories button', { hasText: 'Aparência' }).click();
  await expect(page.locator('.settings-content')).not.toContainText('Tamanho geral');
  await expect(page.locator('.settings-content .settings-preview')).toHaveCount(0);
  await page.locator('.settings-categories button', { hasText: 'Editor' }).click();
  const fontOptions = page.locator('#workspace-setting-editor-font-family option');
  await expect(fontOptions.filter({ hasText: 'Comic Neue (divertida)' })).toHaveCount(1);
  await expect(fontOptions.filter({ hasText: 'Fredoka (arredondada)' })).toHaveCount(1);
  await expect(fontOptions.filter({ hasText: 'Patrick Hand (manuscrita)' })).toHaveCount(1);
});

test('desafio do dia abre os dois níveis e mantém a solução fechada até solicitar', async ({ page }) => {
  await openApp(page);
  await expect(page.locator('#daily-challenge-home')).toContainText('Desafio do Dia');
  await expect(page.locator('#daily-challenge-home .daily-challenge-home-row')).toHaveCount(2);
  await page.locator('#btn-sidebar-docs').click();
  await page.locator('.daily-challenge-sidebar-link').click();
  await expect(page.locator('.docs-article h1')).toContainText('Desafios do Dia');
  await expect(page.locator('.daily-challenge-choice')).toHaveCount(2);
  await page.locator('.daily-challenge-choice').first().getByRole('button', { name: 'Abrir desafio' }).click();
  const solution = page.locator('.daily-challenge-solution');
  await expect(solution).toBeVisible();
  await expect(solution).not.toHaveAttribute('open', '');
  await solution.locator('summary').click();
  await expect(solution.locator('pre code')).toBeVisible();
  await expect(solution.getByRole('button', { name: 'Copiar código' })).toBeVisible();
  await solution.getByRole('button', { name: 'Abrir no editor' }).click();
  await expect(page.locator('#editorPanel')).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toContain('algoritmo');
  await page.locator('#btn-sidebar-docs').click();
  await page.locator('.daily-challenge-sidebar-link').click();
  await expect(page.locator('.daily-challenge-choice')).toHaveCount(2);
  const tomorrow = await page.evaluate(() => {
    const today = window.VisualGChallengeClock.now();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).getMonth() === today.getMonth() ? today.getDate() + 1 : null;
  });
  if (tomorrow !== null) {
    await expect(page.locator('.daily-challenge-day').filter({ hasText: new RegExp('^' + tomorrow + '$') })).toBeDisabled();
  }
});

test('temas claros mantêm contraste legível e o Clássico substitui sua variante separada', async ({ page }, testInfo) => {
  await openApp(page);
  await expect(page.locator('.logo-version')).toHaveText('1.0');
  await expect(page.locator('#setting-theme option[value="visualg-classic-high-contrast"]')).toHaveCount(0);
  await page.locator('#btn-scale').click();
  for (const [groupName, count] of [['Escuros', 11], ['Claros', 11]]) {
    const group = page.locator('.theme-subgroup').filter({ hasText:groupName });
    await expect(group.locator('button')).toHaveCount(count);
  }
  const lightThemes = page.locator('.theme-subgroup').filter({ hasText: 'Claros' }).locator('button');
  await expect(lightThemes).toHaveText([
    'VisuAlg Light', 'Paper & Ink', 'Nord', 'Kanagawa Lotus', 'GitHub Light',
    'One Light', 'Solarized Light', 'Alto contraste', 'Catppuccin Latte',
    'Rosé Pine Dawn', 'Gruvbox'
  ]);
  await page.locator('#btn-scale').click();
  await expect(page.locator('#workspace-theme-menu')).toHaveCount(0);
  await page.evaluate(() => {
    window.VisualGEditor.setValue('Algoritmo "Contraste"\nInicio\n  escreval("Teste (visual)")\nfimalgoritmo');
    window.VisualGEditor.instance.setCursor({ line: 2, ch: 10 });
  });
  const themes = ['light', 'github-light', 'solarized-light', 'high-contrast', 'catppuccin-latte', 'gruvbox-light', 'paper', 'nord-light', 'one-light', 'rose-pine-dawn', 'kanagawa-lotus', 'visualg-classic', 'visualg-3', 'steam-classic'];
  for (const theme of themes) {
    await page.evaluate((id) => {
      const select = window.document.getElementById('setting-theme');
      select.value = id;
      select.dispatchEvent(new window.Event('change', { bubbles: true }));
    }, theme);
    const ratios = await page.evaluate(() => {
      const root = window.getComputedStyle(window.document.documentElement);
      const parse = (value) => {
        const text = value.trim();
        if (text.startsWith('#')) {
          const hex = text.slice(1);
          return hex.length === 3 ? hex.split('').map((part) => parseInt(part + part, 16)) : [0, 2, 4].map((index) => parseInt(hex.slice(index, index + 2), 16));
        }
        const parts = text.match(/[\d.]+/g);
        return parts ? parts.slice(0, 3).map(Number) : null;
      };
      const luminance = (color) => color.map((channel) => { const value = channel / 255; return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4; }).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0);
      const contrast = (first, second) => { const values = [luminance(parse(first)), luminance(parse(second))].sort((a, b) => b - a); return (values[0] + .05) / (values[1] + .05); };
      const token = (name) => root.getPropertyValue('--' + name);
      const canvas = token('ide-canvas');
      const panel = token('ide-panel');
      return {
        foreground: contrast(token('ide-foreground'), canvas),
        muted: contrast(token('ide-muted'), panel),
        accent: contrast(token('ide-accent'), canvas),
        error: contrast(token('ide-error'), canvas),
        selection: contrast(token('ide-selected-foreground'), token('ide-selected')),
        syntax: ['syn-keyword', 'syn-type', 'syn-string', 'syn-number', 'syn-comment', 'syn-operator', 'syn-builtin', 'syn-atom', 'syn-variable'].map((name) => [name, contrast(token(name), canvas)])
      };
    });
    for (const [name, value] of Object.entries(ratios)) {
      if (name === 'syntax') for (const [token, ratio] of value) expect(ratio, `${theme} ${token}`).toBeGreaterThanOrEqual(4.5);
      else expect(value, `${theme} ${name}`).toBeGreaterThanOrEqual(4.5);
    }
    await page.screenshot({ path: testInfo.outputPath(`${theme}.png`) });
  }
});

test('alterna dois arquivos e preserva a edição', async ({ page }) => {
  await openApp(page);
  await page.locator('.file-item').filter({ hasText: 'idade.alg' }).click();
  const updated = 'Algoritmo "IdadeEditada"\nInicio\n  escreval("comparação")\nfimalgoritmo';
  await setCode(page, updated);
  await page.locator('.file-item').filter({ hasText: 'resistencia-equivalente.alg' }).click();
  await page.locator('.file-item').filter({ hasText: 'idade.alg' }).click();
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe(updated);
  await page.reload();
  await page.locator('.file-item').filter({ hasText: 'idade.alg' }).click();
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe(updated);
});

test('reabre arquivo fechado e reutiliza a aba de documentação', async ({ page }) => {
  await openApp(page);
  await page.evaluate(() => window.TabManager.getTabs().slice().forEach((tab) => window.TabManager.closeTab(tab.id)));
  await expect(page.locator('.tab-item')).toHaveCount(0);
  await page.locator('.file-item').filter({ hasText: 'idade.alg' }).click();
  await expect(page.locator('.tab-item')).toHaveCount(1);

  await page.locator('#btn-sidebar-docs').click();
  await page.locator('.doc-item', { hasText: 'Introdução' }).click();
  await page.locator('.doc-item', { hasText: 'História' }).click();
  await expect(page.locator('.view-tab[data-type="docs"]')).toHaveCount(1);
  await expect(page.locator('.docs-article')).toContainText('história');
});

test('executa com F9, avança com F8 e permite parar', async ({ page }) => {
  await useConsolePresentation(page, 'panel');
  await openApp(page);
  await setCode(page, programs.output);
  await page.keyboard.press('F9');
  await expect(page.locator('#terminal-output')).toContainText('atalho funcionando');

  await setCode(page, programs.output);
  await page.keyboard.press('F8');
  await expect(page.locator('#debug-status')).toContainText('Pausado na linha 3');
  await expect(page.locator('#btn-stop')).toBeEnabled();
  await page.keyboard.press('F8');
  await expect(page.locator('#terminal-output')).toContainText('atalho funcionando');

  await setCode(page, programs.input);
  await page.keyboard.press('F9');
  await expect(page.locator('#terminal-input-area')).toBeVisible();
  await page.locator('#debug-run').click();
  await expect(page.locator('#terminal-input-area')).toBeHidden();
  await expect(page.locator('#debug-status')).toContainText('Finalizado');
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
  await openApp(page);
  await setCode(page, programs.input);
  await page.keyboard.press('F9');
  await expect(page.locator('#consoleInputOverlay')).toBeVisible();
  await page.locator('#console-input-modal').fill('Grace');
  await page.locator('#console-input-modal-ok').click();
  await expect(page.locator('#terminal-output')).toContainText('Olá, Grace');
});

test('imprimir código abre a impressão do navegador com o arquivo formatado para papel', async ({ page }, testInfo) => {
  await page.addInitScript(() => { window.print = () => { window.__printCalled = true; }; });
  await openApp(page);
  const code = `Algoritmo "Impressão"
Var
  texto: caractere
Inicio
  texto <- "<código & seguro ${'x'.repeat(100)}>"
  escreval(texto)
fimalgoritmo`;
  await page.evaluate((source) => window.VisualGEditor.setValue(source), code);
  const expectedName = await page.evaluate(() => {
    const tab = window.TabManager.getActiveTab();
    return tab.fileName || (tab.name || 'programa') + '.alg';
  });

  await page.locator('#btn-print').click();
  const printDialog = page.locator('#print-options-dialog');
  await expect(printDialog).toBeVisible();
  const dialogBox = await printDialog.boundingBox();
  const viewport = page.viewportSize();
  expect(Math.abs(dialogBox.x + dialogBox.width / 2 - viewport.width / 2)).toBeLessThan(2);
  expect(Math.abs(dialogBox.y + dialogBox.height / 2 - viewport.height / 2)).toBeLessThan(2);
  await expect(printDialog.locator('input[value="color"]')).toBeChecked();
  await printDialog.locator('#btn-print-confirm').click();

  await expect.poll(() => page.evaluate(() => window.__printCalled)).toBe(true);
  await expect(page.locator('#print-code')).toHaveAttribute('data-source', code);
  await expect(page.locator('#print-file-name')).toHaveText(expectedName);
  const printedCodeText = await page.locator('.print-line-content').evaluateAll((nodes) => nodes.map((node) => node.textContent).join(''));
  expect(printedCodeText).toContain('<código & seguro ');
  await expect(page.locator('.print-line-number')).toHaveCount(8);
  await expect(page.locator('.print-line-number').nth(4)).toHaveText('5');
  const splitLine = page.locator('.print-line').filter({ has:page.locator('.print-line-number', { hasText:'5' }) });
  await expect(splitLine).toHaveCount(2);
  await expect(page.locator('#print-code .cm-string').first()).toHaveCount(1);
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('#print-document')).toBeVisible();
  await expect.poll(() => page.locator('#print-code').evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThan(0);
  await page.evaluate(() => window.dispatchEvent(new window.Event('afterprint')));

  await page.emulateMedia({ media:'screen' });
  await page.locator('#btn-print').click();
  await printDialog.locator('input[value="monochrome"]').check();
  await printDialog.locator('#btn-print-confirm').click();
  await expect(page.locator('#print-code')).toHaveClass(/print-monochrome/);
  await expect.poll(() => page.evaluate(() => window.__printCalled)).toBe(true);
  await page.evaluate(() => window.dispatchEvent(new window.Event('afterprint')));

  const longSource = Array.from({ length:180 }, (_, index) => 'escreval("linha ' + (index + 1) + ' ' + 'conteudo '.repeat(12) + '")').join('\n');
  await page.evaluate((source) => window.VisualGEditor.setValue(source), longSource);
  await page.locator('#btn-print').click();
  await printDialog.locator('#btn-print-confirm').click();
  await expect(page.locator('#print-code')).toHaveAttribute('data-source', longSource);
  const reconstructedLines = await page.locator('.print-line').evaluateAll((rows) => {
    const lines = [];
    rows.forEach((row) => {
      const number = row.querySelector('.print-line-number').textContent;
      const previous = lines[lines.length - 1];
      if (!previous || previous.number !== number) lines.push({ number, text:'' });
      lines[lines.length - 1].text += row.querySelector('.print-line-content').textContent;
    });
    return lines.map((line) => line.text);
  });
  expect(reconstructedLines).toEqual(longSource.split('\n'));
  await page.emulateMedia({ media:'print' });
  if (testInfo.project.use.browserName === 'chromium') {
    const pdf = await page.pdf({ format:'A4', printBackground:true });
    const pageCount = (pdf.toString('latin1').match(/\/Type\s*\/Page(?!s)\b/g) || []).length;
    expect(pageCount).toBeGreaterThan(1);
  }
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
  await expect.poll(() => page.evaluate(() => window.TabManager.getPersistenceState().status)).toBe('saved');
  const tabsBeforeNew = await page.locator('.tab-item').count();
  await page.locator('#btn-add-tab').click();
  await createFileThroughWelcome(page);
  await setCode(page, second);
  await expect.poll(() => page.evaluate(() => window.TabManager.getPersistenceState().status)).toBe('saved');
  const tabsBeforeReload = await page.locator('.tab-item').count();
  expect(tabsBeforeReload).toBeGreaterThan(tabsBeforeNew);
  await page.reload();
  await expect(page.locator('.tab-item')).toHaveCount(tabsBeforeReload);
  await page.locator('#btn-empty-restore-tabs').click();
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe(second);

  await page.locator('#btn-history').click();
  await expect(page.locator('#btn-restore-recovery')).toBeEnabled();
  await page.locator('#btn-restore-recovery').click();
  await expect(page.locator('.tab-item')).toHaveCount(1);
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).not.toBe(second);
});

test('mostra, esconde e persiste painéis', async ({ page }) => {
  await openApp(page);
  await page.locator('#btn-toggle-right').click();
  await expect(page.locator('#right-sidebar')).toBeHidden();
  await page.reload();
  await expect(page.locator('#right-sidebar')).toBeHidden();
  await page.locator('#btn-toggle-right').click();
  await expect(page.locator('#right-sidebar')).toBeVisible();
});

test('erro clicável reabre o editor e leva à linha correta', async ({ page }) => {
  await openApp(page);
  await setCode(page, programs.invalid);
  const activeTabId = await page.evaluate(() => window.TabManager.getActiveTab().id);
  await page.keyboard.press('F9');
  const errorLink = page.locator('.console-error-link');
  await expect(errorLink).toBeVisible();
  const debugMessage = page.locator('#problems-list .message-card.error > span').first();
  await expect.poll(() => debugMessage.evaluate((element) => element.getBoundingClientRect().width)).toBeGreaterThan(150);
  await expect(debugMessage).toHaveCSS('word-break', 'normal');
  await expect(page.locator('.console-overlay')).toBeVisible();
  await errorLink.click();
  await expect(page.locator('.console-overlay')).toBeHidden();
  await expect.poll(() => page.evaluate(() => window.TabManager.getActiveTab().id)).toBe(activeTabId);
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
  await useConsolePresentation(page, 'panel');
  await openApp(page);
  await setCode(page, ['Algoritmo "Pausa"', 'Inicio', '  escreval("primeiro")', '  escreval("segundo")', 'fimalgoritmo'].join('\n'));
  await page.evaluate(() => window.VisualGEditor.instance.setCursor({ line: 2, ch: 0 }));
  await page.locator('#debug-more').click();
  await page.locator('#btn-toggle-breakpoints').click();
  await page.locator('#debug-run').click();
  await expect(page.locator('#debug-status')).toContainText('Pausado na linha 3');
  await expect(page.locator('#terminal-output')).not.toContainText('primeiro');
  await page.locator('#debug-continue').click();
  await expect(page.locator('#terminal-output')).toContainText('primeiro');
  await expect(page.locator('#terminal-output')).toContainText('segundo');
});

test('fechar aba preserva arquivo, excluir envia ao histórico e restaura', async ({ page }) => {
  await openApp(page);
  await page.locator('#btn-add-tab').click();
  await createFileThroughWelcome(page);
  const createdFile = page.locator('#workspace-file-list .file-item').filter({ hasText: 'MeuAlgoritmo (cópia 1).alg' });
  await setCode(page, programs.output);
  await page.locator('.tab-item.active .tab-close').click();
  await expect(createdFile).toBeVisible();
  await page.reload();
  await page.locator('.file-item').filter({ hasText: 'MeuAlgoritmo (cópia 1).alg' }).click();
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe(programs.output);
  await page.locator('.file-item').filter({ hasText: 'MeuAlgoritmo (cópia 1).alg' }).locator('.file-close').click();
  await expect(page.locator('#workspace-file-list')).not.toContainText('MeuAlgoritmo (cópia 1).alg');
  await page.locator('#btn-history').click();
  await page.locator('#workspace-trash button').filter({ hasText: 'MeuAlgoritmo (cópia 1).alg' }).click();
  await expect(page.locator('#workspace-file-list')).toContainText('MeuAlgoritmo (cópia 1).alg');
});

test('botão Histórico abre a janela de recuperação', async ({ page }) => {
  await openApp(page);
  await page.locator('#btn-history').click();
  await expect(page.locator('#recoveryOverlay')).toBeVisible();
  await expect(page.locator('#workspace-trash')).toContainText('Arquivos removidos (30 dias)');
  await expect(page.locator('#workspace-trash')).toContainText('Versões anteriores das abas (30 dias)');
});

test('histórico restaura uma versão anterior do código', async ({ page }) => {
  await openApp(page);
  await setCode(page, 'Algoritmo "VersaoA"\nInicio\n  escreval("A")\nfimalgoritmo');
  await page.evaluate(() => window.TabManager.saveWorkspace());
  await setCode(page, 'Algoritmo "VersaoB"\nInicio\n  escreval("B")\nfimalgoritmo');
  await page.evaluate(() => { window.localStorage.setItem('visualg-workspace-recovery-checkpoint-v1', '0'); window.TabManager.saveWorkspace(); });
  await page.locator('#btn-history').click();
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
  const letterPill = page.locator('#workspace-setting-letter-spacing-pill');
  await letterPill.focus(); await page.keyboard.press('Home');
  for (let index = 0; index < 12; index++) await page.keyboard.press('ArrowRight');
  const linePill = page.locator('#workspace-setting-line-spacing-pill');
  await linePill.focus(); await page.keyboard.press('Home');
  for (let index = 0; index < 15; index++) await page.keyboard.press('ArrowRight');
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
  await page.locator('.console-dialog-header').getByRole('button', { name:'Voltar ao editor' }).click();
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

test('layout móvel mantém todas as seções utilizáveis com meia tela disponível', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 422 });
  await openApp(page);

  const expectInsideViewport = async (selector) => {
    const box = await page.locator(selector).boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(390.5);
    expect(box.y + box.height).toBeLessThanOrEqual(422.5);
  };

  for (const id of ['btn-home', 'btn-show-console', 'btn-theme', 'btn-scale', 'btn-settings', 'btn-menu']) {
    await expect(page.locator(`#${id}`)).toBeVisible();
    const box = await page.locator(`#${id}`).boundingBox();
    expect(box.width).toBeGreaterThanOrEqual(40);
    expect(box.height).toBeGreaterThanOrEqual(40);
  }

  await page.locator('#btn-menu').click();
  await expectInsideViewport('#mobile-menu');
  await expect(page.locator('#mobile-run')).toBeVisible();
  await page.locator('#mobile-files').click();
  await expect(page.locator('#workspace-sidebar')).toBeVisible();
  await expectInsideViewport('#workspace-sidebar');

  await page.locator('#btn-menu').click();
  await page.locator('#mobile-debug').click();
  await expect(page.locator('#variablesPanel')).toBeVisible();
  expect((await page.locator('#variablesPanel').boundingBox()).height).toBeGreaterThanOrEqual(100);
  await expectInsideViewport('#right-sidebar');

  await page.locator('#btn-settings').click();
  await expect(page.locator('.workspace-settings')).toBeVisible();
  await expect(page.locator('.settings-categories')).toHaveCSS('flex-direction', 'row');
  await page.locator('.settings-categories button').filter({ hasText: 'Editor' }).click();
  await expect(page.locator('.workspace-setting-group').filter({ hasText:'Tamanho da fonte' }).locator('.workspace-setting-value')).toBeVisible();
  await expectInsideViewport('#workspace-aux-view');

  await page.locator('#btn-scale').click();
  await expectInsideViewport('#workspace-theme-menu');
  const paletteScroll = await page.locator('#workspace-theme-menu').evaluate((element) => ({ client: element.clientHeight, scroll: element.scrollHeight }));
  expect(paletteScroll.client).toBeLessThanOrEqual(paletteScroll.scroll);
  await page.locator('#btn-scale').click();

  await page.locator('#btn-menu').click();
  await page.locator('#mobile-docs').click();
  await expect(page.locator('.docs-article')).toBeVisible();
  await expectInsideViewport('#workspace-aux-view');

  await page.locator('#btn-menu').click();
  await page.locator('#mobile-examples').click();
  await expect(page.locator('.workspace-example-card').first()).toBeVisible();
  await expectInsideViewport('#workspace-aux-view');

  await page.setViewportSize({ width: 844, height: 390 });
  await page.locator('#btn-home').click();
  await expect(page.locator('.editor-column')).toBeVisible();
  await expect(page.locator('#workspace-sidebar')).toBeHidden();
  await expect(page.locator('#right-sidebar')).toBeHidden();
  await expect(page.locator('#btn-menu')).toBeVisible();
  await page.locator('#btn-menu').click();
  const landscapeMenu = await page.locator('#mobile-menu').boundingBox();
  expect(landscapeMenu.y + landscapeMenu.height).toBeLessThanOrEqual(390.5);
});

test('botões do topo e ações compactas funcionam no celular', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 422 });
  await useConsolePresentation(page, 'tab');
  await openApp(page);

  await page.locator('#btn-show-console').click();
  await expect(page.locator('#terminalPanel')).toBeVisible();
  await page.locator('#btn-show-console').click();
  await expect(page.locator('#editorPanel')).toBeVisible();

  const initialTheme = await page.locator('html').getAttribute('data-theme');
  await page.locator('#btn-theme').click();
  await expect.poll(() => page.locator('html').getAttribute('data-theme')).not.toBe(initialTheme);

  await page.locator('#btn-settings').click();
  await expect(page.locator('.workspace-settings')).toBeVisible();
  await page.locator('#btn-settings').click();
  await expect(page.locator('#editorPanel')).toBeVisible();

  await setCode(page, programs.output);
  await page.locator('#btn-menu').click();
  await page.locator('#mobile-step').click();
  await expect(page.locator('#btn-stop')).toBeEnabled();
  await page.locator('#btn-menu').click();
  await expect(page.locator('#mobile-stop')).toBeEnabled();
  await page.locator('#mobile-stop').click();
  await expect(page.locator('#btn-stop')).toBeDisabled();

  await page.locator('#btn-menu').click();
  await page.locator('#mobile-run').click();
  await expect(page.locator('#terminal-output')).toContainText('atalho funcionando');
  await expect(page.locator('#terminalPanel')).toBeVisible();
  await page.locator('.view-tab[data-type="console"] .view-tab-close').click();
  await expect(page.locator('#editorPanel')).toBeVisible();

  await page.locator('#btn-menu').click();
  await page.locator('#mobile-docs').click();
  await expect(page.locator('.view-tab[data-type="docs"]')).toBeVisible();
  await page.locator('#btn-menu').click();
  await expect(page.locator('#mobile-nav-back')).toBeEnabled();
  await page.locator('#mobile-nav-back').click();
  await expect(page.locator('#editorPanel')).toBeVisible();

  await page.locator('#btn-home').click();
  await expect(page.locator('#editorPanel')).toBeVisible();

  await page.locator('#btn-menu').click();
  const algDownload = page.waitForEvent('download');
  await page.locator('#mobile-save-alg').click();
  await expect.poll(async () => (await algDownload).suggestedFilename()).toMatch(/\.alg$/);

  await page.locator('#btn-menu').click();
  const txtDownload = page.waitForEvent('download');
  await page.locator('#mobile-save-txt').click();
  await expect.poll(async () => (await txtDownload).suggestedFilename()).toMatch(/\.txt$/);

  await page.locator('#btn-menu').click();
  const chooser = page.waitForEvent('filechooser');
  await page.locator('#mobile-open').click();
  await chooser;
});

test('editor móvel oferece autocomplete por toque e atalhos acima do teclado', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 422 });
  await openApp(page);
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.instance.getOption('lineWrapping'))).toBe(true);
  await page.evaluate(() => {
    const cm = window.VisualGEditor.instance;
    cm.setValue('');
    cm.setCursor({ line: 0, ch: 0 });
    cm.focus();
  });

  await expect(page.locator('#mobile-code-toolbar')).toHaveAttribute('aria-hidden', 'false');
  await page.keyboard.insertText('e');
  await expect(page.locator('.visualg-hints')).toHaveCount(0);
  await expect(page.locator('#mobile-autocomplete-suggestions')).toBeVisible();
  await page.locator('#mobile-autocomplete-suggestions').getByRole('button', { name: /escreva\(\)/ }).click();
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('escreva()');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.instance.getCursor().ch)).toBe(8);

  await page.evaluate(() => {
    const cm = window.VisualGEditor.instance;
    cm.setValue('');
    cm.setCursor({ line: 0, ch: 0 });
    cm.focus();
    cm.getInputField().dispatchEvent(new window.CompositionEvent('compositionstart', { bubbles: true, data: '' }));
  });
  for (const character of 'digitação móvel') await page.keyboard.insertText(character);
  await page.evaluate(() => {
    const input = window.VisualGEditor.instance.getInputField();
    input.dispatchEvent(new window.CompositionEvent('compositionend', { bubbles: true, data: 'digitação móvel' }));
  });
  await page.waitForTimeout(350);
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('digitação móvel');

  await page.evaluate(() => {
    const cm = window.VisualGEditor.instance;
    cm.setValue('Algoritmo "Variáveis"\nVar\n  idadeAluno, indice: inteiro\nInicio\n  idadeA\nfimalgoritmo');
    cm.setCursor({ line: 4, ch: 8 });
    cm.focus();
  });
  await page.keyboard.insertText('l');
  const mobileVariable = page.locator('#mobile-autocomplete-suggestions').getByRole('button', { name: /idadeAluno/ });
  await expect(mobileVariable).toBeVisible();
  await mobileVariable.click();
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.instance.getLine(4))).toBe('  idadeAluno');

  await page.evaluate(() => {
    const cm = window.VisualGEditor.instance;
    cm.setValue('');
    cm.setCursor({ line: 0, ch: 0 });
    cm.focus();
  });
  await page.getByTitle('Inserir parênteses').click();
  await expect.poll(() => page.evaluate(() => ({ value: window.VisualGEditor.getValue(), cursor: window.VisualGEditor.instance.getCursor().ch }))).toEqual({ value: '()', cursor: 1 });
  await page.getByTitle('Inserir aspas').click();
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('("")');

  await page.evaluate(() => {
    const cm = window.VisualGEditor.instance;
    cm.setValue('');
    cm.setCursor({ line: 0, ch: 0 });
    cm.focus();
  });
  await page.keyboard.type('(');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('()');
  await page.evaluate(() => {
    const cm = window.VisualGEditor.instance;
    cm.setValue('');
    cm.setCursor({ line: 0, ch: 0 });
    cm.focus();
  });
  await page.keyboard.type('[');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('[]');

  await page.setViewportSize({ width: 390, height: 260 });
  const toolbar = await page.locator('#mobile-code-toolbar').boundingBox();
  expect(toolbar.y + toolbar.height).toBeLessThanOrEqual(260.5);

  await page.evaluate(() => {
    const cm = window.VisualGEditor.instance;
    cm.setValue(Array.from({ length: 80 }, (_, index) => `escreval(${index})`).join('\n'));
    cm.setCursor({ line: 79, ch: 12 });
    cm.focus();
  });
  await expect.poll(() => page.evaluate(() => {
    const cm = window.VisualGEditor.instance;
    const cursor = cm.cursorCoords(cm.getCursor(), 'window');
    const toolbarTop = window.document.querySelector('#mobile-code-toolbar').getBoundingClientRect().top;
    return cursor.bottom <= toolbarTop - 4;
  })).toBe(true);

  await page.evaluate(() => {
    const wrapper = window.VisualGEditor.instance.getWrapperElement();
    const box = wrapper.getBoundingClientRect();
    const event = new window.Event('touchstart', { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'touches', { value: [{ clientX: box.left + 170, clientY: box.top + 120 }] });
    wrapper.dispatchEvent(event);
  });
  await expect(page.locator('#mobile-cursor-loupe')).toBeVisible();
  const loupe = await page.locator('#mobile-cursor-loupe').boundingBox();
  expect(loupe.width).toBeGreaterThanOrEqual(190);
  expect(loupe.y).toBeLessThan(150);
  await page.evaluate(() => {
    const wrapper = window.VisualGEditor.instance.getWrapperElement();
    const event = new window.Event('touchend', { bubbles: true });
    Object.defineProperty(event, 'touches', { value: [] });
    wrapper.dispatchEvent(event);
  });
  await expect(page.locator('#mobile-cursor-loupe')).toBeHidden();
});

test('pares respeitam contexto, fechamento existente, seleção e Backspace', async ({ page }) => {
  await openApp(page);
  async function prepare(source, ch) {
    await page.evaluate(({ code, column }) => {
      const cm = window.VisualGEditor.instance;
      cm.setValue(code);
      cm.setCursor({ line: 0, ch: column });
      cm.focus();
    }, { code: source, column: ch });
  }
  for (const [opening, closing] of [['(', ')'], ['[', ']'], ['{', '}'], ['"', '"']]) {
    await prepare('x <- ', 5);
    await page.keyboard.type(opening);
    await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe(`x <- ${opening}${closing}`);
    await expect.poll(() => page.evaluate(() => window.VisualGEditor.instance.getCursor().ch)).toBe(6);
    await page.keyboard.type(closing);
    await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe(`x <- ${opening}${closing}`);
    await expect.poll(() => page.evaluate(() => window.VisualGEditor.instance.getCursor().ch)).toBe(7);
    await prepare('x <- ', 5);
    await page.keyboard.type(opening);
    await page.keyboard.press('Backspace');
    await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('x <- ');

    await prepare(`x <- ${closing}`, 5);
    await page.keyboard.type(opening);
    await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe(`x <- ${opening}${closing}`);
  }

  await prepare('escreval("texto")', 10);
  await page.keyboard.type('(');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('escreval("(texto")');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.instance.getCursor().ch)).toBe(11);
  await prepare('escreva(valor)', 8);
  await page.keyboard.type('[');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('escreva([valor)');
  await prepare('// comentário ', 14);
  await page.keyboard.type('[');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('// comentário [');
  await prepare('{ comentário }', 4);
  await page.keyboard.type('(');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('{ co(mentário }');
  await prepare('se ', 3);
  await page.keyboard.type('(');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('se ()');
  await prepare('valor <- 2 + ', 13);
  await page.keyboard.type('(');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('valor <- 2 + ()');
  await page.keyboard.type(')');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('valor <- 2 + ()');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.instance.getCursor().ch)).toBe(15);

  await page.evaluate(() => {
    const cm = window.VisualGEditor.instance;
    cm.setValue('escreva(valor)');
    cm.setSelection({ line: 0, ch: 8 }, { line: 0, ch: 13 });
    cm.focus();
  });
  await page.keyboard.type('(');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('escreva((valor))');

  await page.evaluate(() => {
    const cm = window.VisualGEditor.instance;
    cm.setValue('escreval()');
    cm.setCursor({ line: 0, ch: 9 });
    cm.replaceSelection('"texto (copiado)"', 'end', 'paste');
  });
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('escreval("texto (copiado)")');
  await page.evaluate(() => {
    const cm = window.VisualGEditor.instance;
    cm.setSelection({ line: 0, ch: 9 }, { line: 0, ch: 26 });
    cm.focus();
  });
  await page.keyboard.press('Backspace');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('escreval()');
});

test('Tab indenta linhas selecionadas e atalhos ajustam o recuo', async ({ page }) => {
  await openApp(page);
  await page.evaluate(() => {
    const cm = window.VisualGEditor.instance;
    cm.setValue('se x > 0 entao\nescreval(x)\nfimse');
    cm.setSelection({ line: 0, ch: 0 }, { line: 2, ch: 5 });
    cm.focus();
  });
  await page.keyboard.press('Tab');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('  se x > 0 entao\n  escreval(x)\n  fimse');
  await page.keyboard.press('Shift+Tab');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('se x > 0 entao\nescreval(x)\nfimse');
  await page.keyboard.press('Control+]');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('  se x > 0 entao\n  escreval(x)\n  fimse');
  await page.keyboard.press('Control+[');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('se x > 0 entao\nescreval(x)\nfimse');
  await page.keyboard.press('Control+/');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toContain('// se x > 0 entao');
  await page.keyboard.press('Control+/');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('se x > 0 entao\nescreval(x)\nfimse');
});

test('editor móvel preserva rolagem manual com teclado e cursores em posições diferentes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 720 });
  await page.addInitScript(() => {
    const viewport = new window.EventTarget();
    Object.defineProperties(viewport, {
      height: { get: () => window.__testKeyboardHeight || window.innerHeight },
      width: { get: () => window.innerWidth },
      offsetTop: { get: () => 0 },
      offsetLeft: { get: () => 0 },
    });
    Object.defineProperty(window, 'visualViewport', { configurable: true, value: viewport });
    window.__testResizeKeyboard = (height) => {
      window.__testKeyboardHeight = height;
      viewport.dispatchEvent(new window.Event('resize'));
    };
    window.__testScrollViewport = () => viewport.dispatchEvent(new window.Event('scroll'));
  });
  await openApp(page);

  for (const lineCount of [4, 120]) {
    for (const line of [0, Math.floor(lineCount / 2), lineCount - 1]) {
      await page.evaluate(({ count, cursorLine }) => {
        const cm = window.VisualGEditor.instance;
        cm.setValue(Array.from({ length: count }, (_, index) => `escreval("linha ${index}")`).join('\n'));
        cm.setCursor({ line: cursorLine, ch: 5 });
        cm.focus();
        window.__testResizeKeyboard(window.innerHeight - 250);
      }, { count: lineCount, cursorLine: line });
      await expect.poll(() => page.evaluate(() => window.VisualGEditor.instance.getCursor().line)).toBe(line);
      await expect(page.locator('body')).toHaveClass(/mobile-keyboard-open/);
      if (lineCount > 4) {
        const scrollPosition = await page.evaluate(() => {
          const scroller = window.VisualGEditor.instance.getScrollerElement();
          scroller.scrollTop = 150;
          window.__testScrollViewport();
          return scroller.scrollTop;
        });
        await page.waitForTimeout(150);
        expect(await page.evaluate(() => window.VisualGEditor.instance.getScrollerElement().scrollTop)).toBeCloseTo(scrollPosition, 0);
      }
      await page.evaluate(() => window.__testResizeKeyboard(null));
    }
  }

  await page.evaluate(() => {
    const cm = window.VisualGEditor.instance;
    cm.setSelection({ line: 60, ch: 0 }, { line: 60, ch: 8 });
    cm.focus();
    window.__testResizeKeyboard(window.innerHeight - 250);
  });
  await page.keyboard.insertText('escreva');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.instance.getLine(60).startsWith('escreva'))).toBe(true);
  const manualPosition = await page.evaluate(() => {
    const cm = window.VisualGEditor.instance;
    const scroller = cm.getScrollerElement();
    scroller.scrollTop = 150;
    const wrapper = cm.getWrapperElement();
    const start = new window.Event('touchstart', { bubbles: true });
    Object.defineProperty(start, 'touches', { value: [{ clientX: 160, clientY: 350 }] });
    wrapper.dispatchEvent(start);
    const move = new window.Event('touchmove', { bubbles: true });
    Object.defineProperty(move, 'touches', { value: [{ clientX: 160, clientY: 240 }] });
    wrapper.dispatchEvent(move);
    wrapper.dispatchEvent(new window.Event('touchend', { bubbles: true }));
    window.__testScrollViewport();
    window.__testResizeKeyboard(window.innerHeight - 320);
    return scroller.scrollTop;
  });
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => window.VisualGEditor.instance.getScrollerElement().scrollTop)).toBeCloseTo(manualPosition, 0);
  await page.evaluate(() => window.__testResizeKeyboard(null));
  await page.waitForTimeout(150);
  expect(await page.evaluate(() => window.VisualGEditor.instance.getScrollerElement().scrollTop)).toBeCloseTo(manualPosition, 0);
});

test('console mantém saída, entrada e saída do painel acessíveis acima do teclado', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 422 });
  await useConsolePresentation(page, 'tab');
  await openApp(page);
  await setCode(page, programs.input);
  await page.locator('#btn-menu').click();
  await page.locator('#mobile-run').click();
  await expect(page.locator('#terminal-input')).toBeVisible();
  await page.locator('#terminal-input').focus();
  await page.setViewportSize({ width: 390, height: 260 });

  const input = await page.locator('#terminal-input').boundingBox();
  const tabs = await page.locator('.tab-bar').boundingBox();
  expect(tabs.y).toBeGreaterThanOrEqual(0);
  expect(input.y + input.height).toBeLessThanOrEqual(260.5);
  await expect(page.locator('#mobile-code-toolbar')).toHaveAttribute('aria-hidden', 'true');
  await page.locator('.view-tab[data-type="console"] .view-tab-close').click();
  await expect(page.locator('#editorPanel')).toBeVisible();

  await page.evaluate(() => window.localStorage.setItem('visualg-console-presentation', 'modal'));
  await page.locator('#btn-show-console').click();
  await expect(page.locator('.console-dialog-header').getByRole('button', { name:'Parar execução' })).toBeVisible();
  await expect(page.locator('.console-dialog-header').getByRole('button', { name:'Voltar ao editor' })).toBeVisible();
  const dialog = await page.locator('.console-dialog').boundingBox();
  expect(dialog.y + dialog.height).toBeLessThanOrEqual(260.5);
  await page.locator('.console-dialog-header').getByRole('button', { name:'Voltar ao editor' }).click();
  await expect(page.locator('#editorPanel')).toBeVisible();
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
  await expect.poll(async () => (await page.locator('#workspace-sidebar').boundingBox()).width).toBeGreaterThan(before.width + 40);
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
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.instance.getLine(2))).toBe('  escreva()');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.instance.getCursor().ch)).toBe(10);
  await page.keyboard.press('Control+Shift+P');
  const tabsBeforeNew = await page.locator('.tab-item').count();
  await page.locator('#command-input').fill('Novo arquivo');
  await page.locator('#command-results button').first().click();
  const createDialog = page.locator('.workspace-create-dialog[open]');
  await expect(createDialog).toBeVisible();
  await createDialog.locator('button[type="submit"]').click();
  await expect(page.locator('.tab-item')).toHaveCount(tabsBeforeNew + 1);
});

test('sugestões respeitam argumentos, blocos, comandos simples e cursor', async ({ page }) => {
  await openApp(page);
  for (const [prefix, expected, cursor] of [
    ['escrev', 'escreva()', 8], ['escreva', 'escreval()', 9],
    ['lei', 'leia()', 5], ['limp', 'limpatela', 9],
    ['enq', 'enquanto  faca\n  \nfimenquanto', 10],
  ]) {
    await page.evaluate(() => { const editor = window.VisualGEditor.instance; editor.setValue(''); editor.focus(); });
    await page.keyboard.insertText(prefix);
    await expect(page.locator('.visualg-hints')).toBeVisible();
    await page.keyboard.press('Enter');
    await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe(expected);
    if (cursor !== undefined) await expect.poll(() => page.evaluate(() => window.VisualGEditor.instance.getCursor().ch)).toBe(cursor);
  }
  await page.evaluate(() => { const editor = window.VisualGEditor.instance; editor.setValue('escrev()'); editor.setCursor({ line:0, ch:6 }); editor.focus(); });
  await page.keyboard.press('Control+Space');
  await page.keyboard.press('Enter');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toBe('escreva()');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.instance.getCursor().ch)).toBe(8);
});

test('documentação móvel amplia imagens e mantém navegação no rodapé', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 720 });
  await openApp(page);
  await page.evaluate(() => window.VisualGWorkspace.showDoc('introducao'));
  await expect(page.locator('.docs-article h1')).toContainText('Introdução');
  await expect(page.locator('.docs-page-navigation')).toBeVisible();
  await expect(page.locator('.docs-page-navigation-previous')).toBeEnabled();
  await expect(page.locator('.docs-figure')).toHaveCount(3);
  await expect(page.locator('.docs-figure').first().locator('figcaption')).not.toBeEmpty();
  await page.locator('.docs-figure').first().getByRole('button', { name: /Ampliar/ }).click();
  await expect(page.locator('.docs-image-viewer')).toBeVisible();
  await expect(page.locator('.docs-image-viewer img')).toHaveAttribute('alt', /Visão geral/);
  await page.keyboard.press('Escape');
  await expect(page.locator('.docs-image-viewer')).toHaveCount(0);
  await page.locator('.docs-page-navigation-next').click();
  await expect.poll(() => page.locator('#workspace-aux-view').evaluate((node) => node.scrollTop)).toBe(0);
  await expect(page.locator('.view-tab[data-type="docs"]')).toHaveCount(1);
  await page.evaluate(() => window.VisualGWorkspace.showDoc('sumario'));
  await expect(page.locator('.docs-page-navigation-previous')).toBeEnabled();
  await page.locator('.docs-page-navigation-previous').click();
  await expect(page.locator('.docs-article h1')).toContainText('Desafios do Dia');
  await expect(page.locator('.docs-page-navigation-previous')).toBeDisabled();
  await page.evaluate(() => window.VisualGWorkspace.showDoc('status'));
  await expect(page.locator('.docs-page-navigation-next')).toBeDisabled();
  await expect(page.locator('.view-tab[data-type="docs"]')).toHaveCount(1);
});

test('linha do tempo mostra composição vertical no celular e imagem no tablet', async ({ page }) => {
  await page.setViewportSize({ width:375, height:720 });
  await openApp(page);
  await page.evaluate(() => window.VisualGWorkspace.showDoc('historia'));
  await expect(page.locator('.docs-timeline-mobile li')).toHaveCount(5);
  await expect(page.locator('.docs-timeline-mobile')).toBeVisible();
  await expect(page.locator('.docs-figure-timeline .docs-image-frame')).toBeHidden();
  await page.locator('.docs-figure-timeline .docs-image-open').click();
  await expect(page.locator('.docs-image-viewer')).toBeVisible();
  await page.locator('.docs-image-close').click();
  await page.setViewportSize({ width:820, height:900 });
  await expect(page.locator('.docs-timeline-mobile')).toBeHidden();
  await expect(page.locator('.docs-figure-timeline .docs-image-frame')).toBeVisible();
});

test('configurações usam pílula arrastável no lugar do campo numérico', async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 720 });
  await openApp(page);
  await page.evaluate(() => window.VisualGWorkspace.showSettings('Editor'));
  await page.locator('.settings-categories button').filter({ hasText: 'Editor' }).click();
  const font = page.locator('#workspace-setting-font-size');
  const pill = page.locator('.workspace-setting-group').filter({ has: font }).locator('.workspace-setting-value');
  const slider = page.locator('.workspace-setting-group').filter({ has: font }).locator('input[type="range"]');
  await expect(font).toBeHidden();
  await expect(slider).toHaveCount(0);
  await expect(pill).toHaveText('14 px');
  const initialPillBox = await pill.boundingBox();
  await page.mouse.move(initialPillBox.x + initialPillBox.width / 2, initialPillBox.y + initialPillBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(initialPillBox.x + initialPillBox.width / 2 + 40, initialPillBox.y + initialPillBox.height / 2);
  await page.mouse.up();
  await expect(font).toHaveValue('22');
  await expect(pill).toHaveText('22 px');
  const pillBox = await pill.boundingBox();
  await page.mouse.move(pillBox.x + pillBox.width / 2, pillBox.y + pillBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(pillBox.x + pillBox.width / 2 - 20, pillBox.y + pillBox.height / 2);
  await page.mouse.up();
  await expect(font).toHaveValue('18');
  await page.setViewportSize({ width: 1600, height: 900 });
  const wideColumns = await page.locator('.settings-content-layout').evaluate((node) => window.getComputedStyle(node).gridTemplateColumns.split(' ').length);
  expect(wideColumns).toBe(1);
});

test('configurações móveis sincronizam as pílulas de espaçamento', async ({ page }) => {
  await page.setViewportSize({ width:390, height:720 });
  await openApp(page);
  await page.locator('#btn-menu').click();
  await page.locator('#mobile-settings').click();
  await expect(page.locator('.workspace-settings')).toBeVisible();
  await page.locator('.settings-categories button').filter({ hasText:'Editor' }).click();
  const letters = page.locator('#workspace-setting-letter-spacing');
  const letterPill = page.locator('.workspace-setting-group').filter({ has:letters }).locator('.workspace-setting-value');
  await letterPill.focus(); await page.keyboard.press('Home');
  for (let index = 0; index < 12; index++) await page.keyboard.press('ArrowRight');
  await expect(letters).toHaveValue('2');
  const lines = page.locator('#workspace-setting-line-spacing');
  const linePill = page.locator('.workspace-setting-group').filter({ has:lines }).locator('.workspace-setting-value');
  await expect(lines).toBeHidden();
  await linePill.focus(); await page.keyboard.press('Home');
  for (let index = 0; index < 14; index++) await page.keyboard.press('ArrowRight');
  await expect(linePill).toHaveText('32 px');
});

test('pinch zoom não reduz a altura da aplicação ao tamanho da área ampliada', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 720 });
  await page.addInitScript(() => {
    const viewport = new window.EventTarget();
    Object.defineProperties(viewport, {
      height: { get: () => window.innerHeight / (window.__testZoom || 1) },
      width: { get: () => window.innerWidth / (window.__testZoom || 1) },
      offsetTop: { get: () => 0 }, offsetLeft: { get: () => 0 },
      scale: { get: () => window.__testZoom || 1 },
    });
    Object.defineProperty(window, 'visualViewport', { configurable:true, value:viewport });
    window.__setTestZoom = (scale) => { window.__testZoom = scale; viewport.dispatchEvent(new window.Event('resize')); };
  });
  await page.goto('/');
  await expect(page.locator('#editor-empty-state')).toBeVisible();
  await page.evaluate(() => window.__setTestZoom(2));
  await expect.poll(() => page.evaluate(() => window.document.body.getBoundingClientRect().height)).toBe(720);
  await page.evaluate(() => window.__setTestZoom(1));
  await openApp(page);
  for (const screen of ['editor', 'docs', 'settings', 'console']) {
    if (screen === 'docs') await page.evaluate(() => window.VisualGWorkspace.showDoc('historia'));
    if (screen === 'settings') await page.evaluate(() => window.VisualGWorkspace.showSettings('Editor'));
    if (screen === 'console') await page.evaluate(() => window.VisualGWorkspace.showConsole());
    await page.evaluate(() => window.__setTestZoom(2));
    await expect.poll(() => page.evaluate(() => ({ height:window.document.body.getBoundingClientRect().height, keyboard:window.document.body.classList.contains('mobile-keyboard-open') }))).toEqual({ height:720, keyboard:false });
    await page.evaluate(() => window.__setTestZoom(1));
    await expect.poll(() => page.evaluate(() => window.document.body.getBoundingClientRect().height)).toBe(720);
  }
  await page.setViewportSize({ width:720, height:390 });
  await expect.poll(() => page.evaluate(() => window.document.body.getBoundingClientRect().height)).toBe(390);
  await page.setViewportSize({ width:390, height:720 });
  await expect.poll(() => page.evaluate(() => window.document.body.getBoundingClientRect().height)).toBe(720);
});

test('zoom nativo do Chromium mantém o shell após ampliar e reduzir', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium');
  await page.setViewportSize({ width:390, height:720 });
  await openApp(page);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setPageScaleFactor', { pageScaleFactor:2 });
  await expect.poll(() => page.evaluate(() => window.visualViewport.scale)).toBe(2);
  await expect.poll(() => page.evaluate(() => window.document.body.getBoundingClientRect().height)).toBe(720);
  await expect(page.locator('body')).not.toHaveClass(/mobile-keyboard-open/);
  await cdp.send('Emulation.setPageScaleFactor', { pageScaleFactor:1 });
  await expect.poll(() => page.evaluate(() => window.visualViewport.scale)).toBe(1);
  await expect(page.locator('.CodeMirror')).toBeVisible();
});

test('autocompletar sugere variáveis declaradas no computador', async ({ page }) => {
  await openApp(page);
  await page.evaluate(() => {
    const cm = window.VisualGEditor.instance;
    cm.setValue('Algoritmo "Variáveis"\nVar\n  totalGeral, tentativaAtual: inteiro\n  nomeCompleto: caractere\nInicio\n  total\nfimalgoritmo');
    cm.setCursor({ line: 5, ch: 7 });
    cm.focus();
  });
  await page.keyboard.type('G');
  await expect(page.locator('.visualg-hints')).toBeVisible();
  await expect(page.locator('.visualg-hints').getByRole('button', { name: /totalGeral/ })).toBeVisible();
  await page.keyboard.press('Enter');
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.instance.getLine(5))).toBe('  totalGeral');
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
  const backArrow = await page.locator('#btn-nav-back svg').innerHTML();
  expect(await page.locator('#btn-nav-forward svg').innerHTML()).not.toBe(backArrow);
});

test('abas de documentação, console e configurações ocupam a área principal e fecham', async ({ page }) => {
  await useConsolePresentation(page, 'tab');
  await openApp(page);
  await page.locator('#btn-sidebar-docs').click();
  await page.locator('.doc-item', { hasText: 'Introdução' }).click();
  await expect(page.locator('#editorPanel')).toBeHidden();
  await expect(page.locator('#workspace-aux-view')).toBeVisible();
  await expect.poll(() => page.locator('#workspace-aux-view').evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThan(500);
  await page.locator('.view-tab[data-type="docs"] .view-tab-close').click();
  await expect(page.locator('#editorPanel')).toBeVisible();
  await expect(page.locator('#btn-nav-back')).toBeDisabled();
  await page.locator('.doc-item', { hasText: 'História' }).click();
  const tabsBeforeNew = await page.locator('.tab-item').count();
  await page.locator('#btn-add-tab').click();
  await createFileThroughWelcome(page);
  await expect(page.locator('#editorPanel')).toBeVisible();
  await expect(page.locator('.tab-item')).toHaveCount(tabsBeforeNew + 1);
  await page.locator('#btn-show-console').click();
  await expect(page.locator('#terminalPanel')).toBeVisible();
  await page.locator('.view-tab[data-type="console"] .view-tab-close').click();
  await expect(page.locator('#editorPanel')).toBeVisible();
  await page.locator('#btn-settings').click();
  await expect(page.locator('#workspace-aux-view')).toBeVisible();
  await expect(page.locator('.settings-categories button')).toHaveCount(8);
  await page.locator('.view-tab[data-type="settings"] .view-tab-close').click();
  await expect(page.locator('#editorPanel')).toBeVisible();
});

test('laterais continuam controláveis enquanto configurações está aberta', async ({ page }) => {
  await openApp(page);
  await page.locator('#btn-settings').click();
  await expect(page.locator('.workspace-settings')).toBeVisible();
  const columns = () => page.locator('.ide-shell').evaluate((element) => window.getComputedStyle(element).gridTemplateColumns.split(' ').length);
  await expect.poll(columns).toBe(5);

  await page.locator('#btn-toggle-left').click();
  await expect(page.locator('#workspace-sidebar')).toBeHidden();
  await page.locator('#btn-toggle-left').click();
  await expect(page.locator('#workspace-sidebar')).toBeVisible();

  await page.locator('#btn-toggle-right').click();
  await expect(page.locator('#right-sidebar')).toBeHidden();
  await page.locator('#btn-toggle-right').click();
  await expect(page.locator('#right-sidebar')).toBeVisible();

  await page.locator('.view-tab[data-type="settings"] .view-tab-close').click();
  await expect(page.locator('#editorPanel')).toBeVisible();
  await expect(page.locator('#workspace-sidebar')).toBeVisible();
  await expect(page.locator('#right-sidebar')).toBeVisible();
});

test('editor e abas não exibem linhas decorativas acima ou abaixo', async ({ page }) => {
  await useConsolePresentation(page, 'tab');
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
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dracula');
  await expect.poll(colors).not.toEqual(dark);
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
  await page.locator('.CodeMirror').click();
  await page.keyboard.press('Control+Shift+Equal');
  await expect(page.locator('#setting-font-size')).toHaveValue('15');
  await expect(page.locator('#setting-console-font-size')).toHaveValue('13');
  await expect(page.locator('#console-font-increase')).toHaveCount(0);
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

test('temas principais têm paletas e sintaxe próprias', async ({ page }) => {
  await openApp(page);
  await setCode(page, 'algoritmo "Tema"\nvar\n  n: inteiro\ninicio\n  escreval("Olá", 12) // nota\nfimalgoritmo');
  const themes = ['dark', 'light', 'dracula', 'nord', 'dark-monokai', 'github-dark', 'github-light', 'one-dark', 'solarized-dark', 'solarized-light', 'nord-light', 'one-light', 'rose-pine-dawn', 'kanagawa-lotus'];
  const palettes = [];
  for (const theme of themes) {
    const palette = await page.evaluate((name) => {
      const select = window.document.getElementById('setting-theme');
      select.value = name; select.dispatchEvent(new window.Event('change', { bubbles: true }));
      const root = window.getComputedStyle(window.document.documentElement);
      const read = (token) => root.getPropertyValue('--' + token).trim();
      return ['ide-chrome', 'ide-panel', 'ide-canvas', 'syn-keyword', 'syn-string', 'syn-number'].map(read);
    }, theme);
    expect(new Set(palette.slice(3)).size).toBeGreaterThan(1);
    palettes.push(palette.join('|'));
  }
  expect(new Set(palettes).size).toBe(themes.length);
});

test('novos temas claros e escuros mudam superfícies e sintaxe', async ({ page }) => {
  await openApp(page);
  await setCode(page, 'algoritmo "Tema"\nvar\n  n: inteiro\ninicio\n  escreval("Olá", 12)\nfimalgoritmo');
  const themes = ['catppuccin-mocha', 'rose-pine', 'gruvbox-dark', 'catppuccin-latte', 'gruvbox-light', 'paper', 'nord-light', 'one-light', 'rose-pine-dawn', 'kanagawa-lotus'];
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
  const letterPill = page.locator('#workspace-setting-letter-spacing-pill');
  await letterPill.focus(); await page.keyboard.press('Home');
  for (let index = 0; index < 12; index++) await page.keyboard.press('ArrowRight');
  const linePill = page.locator('#workspace-setting-line-spacing-pill');
  await linePill.focus(); await page.keyboard.press('Home');
  for (let index = 0; index < 15; index++) await page.keyboard.press('ArrowRight');
  await page.locator('.settings-categories button').filter({ hasText: 'Console' }).click();
  await page.locator('#workspace-setting-console-font-family').selectOption('ibm-plex');
  await page.locator('.view-tab[data-type="settings"] .view-tab-close').click();
  const metrics = () => page.evaluate(() => ({
    editorFamily: window.getComputedStyle(window.document.querySelector('.editor-panel .CodeMirror')).fontFamily,
    consoleFamily: window.getComputedStyle(window.document.getElementById('terminal-output')).fontFamily,
    spacing: parseFloat(window.getComputedStyle(window.document.querySelector('.editor-panel .CodeMirror')).letterSpacing),
    lineHeight: parseFloat(window.getComputedStyle(window.document.querySelector('.editor-panel .CodeMirror-line')).lineHeight),
    lineHeightTransition: window.getComputedStyle(window.document.querySelector('.editor-panel .CodeMirror-line')).transitionDuration,
  }));
  const before = await metrics();
  expect(before.editorFamily).toContain('Fira Code');
  expect(before.consoleFamily).toContain('IBM Plex Mono');
  expect(before.spacing).toBeCloseTo(2, 1);
  expect(before.lineHeight).toBeCloseTo(33, 1);
  expect(before.lineHeightTransition).toBe('0.18s');
  await page.locator('.CodeMirror').click();
  await page.keyboard.press('Control+Shift+Equal');
  await page.waitForTimeout(220);
  const larger = await metrics();
  expect(larger.spacing).toBeGreaterThan(before.spacing);
  expect(larger.lineHeight).toBeGreaterThan(before.lineHeight);
  expect(larger.spacing / before.spacing).toBeCloseTo(15 / 14, 2);
  await page.keyboard.press('Control+Minus');
  await page.waitForTimeout(220);
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
  await page.locator('.CodeMirror').click();
  await page.keyboard.press('Control+Shift+Equal');
  expect(parseFloat(await read())).toBeGreaterThan(2);
});

test('atalhos e roda alteram somente a fonte da área em foco', async ({ page }) => {
  await useConsolePresentation(page, 'panel');
  await openApp(page);
  await page.locator('.CodeMirror').click();
  await page.keyboard.press('Control+Shift+Equal');
  await expect(page.locator('#setting-font-size')).toHaveValue('15');
  await page.keyboard.press('Control+Minus');
  await expect(page.locator('#setting-font-size')).toHaveValue('14');
  await page.keyboard.down('Control');
  await page.mouse.move(540, 220);
  await page.mouse.wheel(0, -100);
  await page.keyboard.up('Control');
  await expect(page.locator('#setting-font-size')).toHaveValue('15');
  await page.keyboard.press('Control+0');
  await expect(page.locator('#setting-font-size')).toHaveValue('14');
  await page.locator('#btn-show-console').click();
  await page.locator('#terminal-output').click();
  await page.keyboard.press('Control+Equal');
  await expect(page.locator('#setting-console-font-size')).toHaveValue('14');
  await expect(page.locator('#setting-font-size')).toHaveValue('14');
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
