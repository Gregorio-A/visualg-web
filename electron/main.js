import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import started from 'electron-squirrel-startup';
import { appendDataFile, readDataFile } from './data-files.mjs';
import { ProjectFiles } from './project-files.mjs';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const CSP = [
  "default-src 'self'",
  "base-uri 'none'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'none'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src https://www.youtube-nocookie.com",
].join('; ');

let mainWindow = null;
const projectFiles = new ProjectFiles();

function assertTrustedIpcSender(event) {
  if (!mainWindow || event.sender !== mainWindow.webContents ||
      event.senderFrame !== mainWindow.webContents.mainFrame) {
    throw new Error('Chamada IPC recusada: origem nao autorizada');
  }
}

ipcMain.handle('visualg-data-file:read', async (event, filename) => {
  assertTrustedIpcSender(event);
  return readDataFile(path.join(app.getPath('userData'), 'visualg-data'), filename);
});

ipcMain.handle('visualg-data-file:append', async (event, filename, value) => {
  assertTrustedIpcSender(event);
  return appendDataFile(path.join(app.getPath('userData'), 'visualg-data'), filename, value);
});

ipcMain.handle('visualg-project:choose', async (event) => {
  assertTrustedIpcSender(event);
  const result = await dialog.showOpenDialog(mainWindow, { title: 'Abrir pasta de algoritmos', properties: ['openDirectory'] });
  return result.canceled || !result.filePaths.length ? null : projectFiles.open(result.filePaths[0]);
});
ipcMain.handle('visualg-project:close', (event) => { assertTrustedIpcSender(event); projectFiles.close(); });
ipcMain.handle('visualg-project:list', (event, relative) => { assertTrustedIpcSender(event); return projectFiles.list(relative); });
ipcMain.handle('visualg-project:read', (event, relative) => { assertTrustedIpcSender(event); return projectFiles.read(relative); });
ipcMain.handle('visualg-project:write', (event, relative, content, revision) => {
  assertTrustedIpcSender(event);
  return projectFiles.write(relative, content, revision);
});
ipcMain.handle('visualg-project:create-file', (event, parent, name) => {
  assertTrustedIpcSender(event);
  return projectFiles.createFile(parent, name);
});
ipcMain.handle('visualg-project:create-directory', (event, parent, name) => {
  assertTrustedIpcSender(event);
  return projectFiles.createDirectory(parent, name);
});
ipcMain.handle('visualg-project:rename', (event, relative, name) => {
  assertTrustedIpcSender(event);
  return projectFiles.rename(relative, name);
});
ipcMain.handle('visualg-project:remove', (event, relative) => {
  assertTrustedIpcSender(event);
  return projectFiles.remove(relative);
});

const createWindow = () => {
  const packagedEntry = path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`);
  const allowedEntry = MAIN_WINDOW_VITE_DEV_SERVER_URL
    ? new URL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
    : new URL(pathToFileURL(packagedEntry).href);
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      webviewTag: false,
      spellcheck: false,
      devTools: Boolean(MAIN_WINDOW_VITE_DEV_SERVER_URL),
    },
  });

  const allowedConsole = new URL('console-window.html', allowedEntry).href;
  mainWindow.webContents.setWindowOpenHandler((details) => {
    if (details.url === 'https://github.com/Gregorio-A/visualg-web/issues') {
      shell.openExternal(details.url).catch(() => {});
      return { action: 'deny' };
    }
    if (details.url !== allowedConsole) return { action: 'deny' };
    return {
      action: 'allow',
      overrideBrowserWindowOptions: {
        width: 1000,
        height: 720,
        webPreferences: {
          contextIsolation: true,
          nodeIntegration: false,
          sandbox: true,
          webSecurity: true,
          preload: undefined,
        },
      },
    };
  });
  mainWindow.webContents.on('did-create-window', (child) => {
    child.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
    child.webContents.on('will-navigate', (event, url) => {
      if (url !== allowedConsole) event.preventDefault();
    });
  });
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const target = typeof navigationUrl === 'string' ? navigationUrl : navigationUrl.url;
    try {
      const destination = new URL(target);
      const sameDevelopmentOrigin = allowedEntry.protocol !== 'file:' &&
        destination.origin === allowedEntry.origin;
      const samePackagedDocument = allowedEntry.protocol === 'file:' &&
        destination.protocol === 'file:' && destination.pathname === allowedEntry.pathname;
      if (sameDevelopmentOrigin || samePackagedDocument) return;
    } catch (_error) {
      // Invalid destinations are denied below.
    }
    event.preventDefault();
  });

  mainWindow.webContents.session.setPermissionRequestHandler((_contents, _permission, callback) => callback(false));
  mainWindow.webContents.session.setPermissionCheckHandler(() => false);
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [CSP],
      },
    });
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(packagedEntry);
  }

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
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
