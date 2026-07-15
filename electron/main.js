import { app, BrowserWindow, ipcMain } from 'electron';
import fs from 'node:fs/promises';
import path from 'node:path';
import started from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const resolveDataFile = (filename) => {
  if (typeof filename !== 'string' || filename.trim() === '') {
    throw new Error('Nome de arquivo de dados invalido');
  }

  const root = path.join(app.getPath('userData'), 'visualg-data');
  const resolved = path.resolve(root, filename);
  if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) {
    throw new Error('O arquivo de dados deve ficar dentro da pasta de dados do VisuAlg.dev');
  }
  return { root, resolved };
};

ipcMain.handle('visualg-data-file:read', async (_event, filename) => {
  const { resolved } = resolveDataFile(filename);
  try {
    const content = await fs.readFile(resolved, 'utf8');
    const values = content.split(/\r?\n/);
    if (values.length > 0 && values[values.length - 1] === '') values.pop();
    return values;
  } catch (error) {
    if (error && error.code === 'ENOENT') return null;
    throw error;
  }
});

ipcMain.handle('visualg-data-file:append', async (_event, filename, value) => {
  const { root, resolved } = resolveDataFile(filename);
  await fs.mkdir(root, { recursive: true });
  await fs.mkdir(path.dirname(resolved), { recursive: true });
  await fs.appendFile(resolved, `${String(value)}\n`, 'utf8');
});

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
