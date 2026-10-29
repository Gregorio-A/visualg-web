import { expect, test } from '@playwright/test';

test('abre uma pasta no desktop, edita um arquivo e salva no disco', async ({ page }) => {
  await page.addInitScript(() => {
    const files = new Map([['aulas/media.alg', 'Algoritmo "Media"\nInicio\nfimalgoritmo']]);
    window.__projectDisk = { files, saves: [] };
    window.visualgDesktopProject = {
      choose: async () => ({ name: 'projeto' }),
      close: async () => {},
      list: async (relative) => ({ entries: relative ? [
        { name: 'media.alg', path: 'aulas/media.alg', directory: false, editable: true },
      ] : [
        { name: 'aulas', path: 'aulas', directory: true, editable: false },
      ], truncated: false }),
      read: async (relative) => ({ content: files.get(relative), revision: 'original' }),
      write: async (relative, content, revision) => {
        if (revision !== 'original') throw new Error('Revisão incorreta');
        files.set(relative, content);
        window.__projectDisk.saves.push(relative);
        return { revision: 'saved' };
      },
    };
  });

  await page.goto('/');
  await expect(page.locator('#desktop-project-toolbar')).toBeVisible();
  await page.locator('#btn-open-directory').click();
  await expect(page.locator('#desktop-project-label')).toHaveText('projeto');
  await page.getByRole('button', { name: 'aulas', exact: true }).click();
  await page.getByRole('button', { name: 'media.alg', exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.VisualGEditor.getValue())).toContain('Media');
  await page.evaluate(() => {
    window.VisualGEditor.setValue('Algoritmo "Alterado"\nInicio\nfimalgoritmo');
    window.document.getElementById('btn-save').click();
  });
  await expect.poll(() => page.evaluate(() => window.__projectDisk.files.get('aulas/media.alg'))).toContain('Alterado');
  expect(await page.evaluate(() => window.__projectDisk.saves)).toEqual(['aulas/media.alg']);
});
