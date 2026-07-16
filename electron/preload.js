const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('visualgDesktopDataFiles', Object.freeze({
  read(filename) {
    return ipcRenderer.invoke('visualg-data-file:read', filename);
  },
  append(filename, value) {
    return ipcRenderer.invoke('visualg-data-file:append', filename, value);
  },
}));
