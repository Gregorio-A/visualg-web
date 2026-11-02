const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('visualgDesktopDataFiles', Object.freeze({
  read(filename) {
    return ipcRenderer.invoke('visualg-data-file:read', filename);
  },
  append(filename, value) {
    return ipcRenderer.invoke('visualg-data-file:append', filename, value);
  },
}));

contextBridge.exposeInMainWorld('visualgDesktopProject', Object.freeze({
  choose: () => ipcRenderer.invoke('visualg-project:choose'),
  close: () => ipcRenderer.invoke('visualg-project:close'),
  list: (relative) => ipcRenderer.invoke('visualg-project:list', relative),
  search: (query) => ipcRenderer.invoke('visualg-project:search', query),
  read: (relative) => ipcRenderer.invoke('visualg-project:read', relative),
  write: (relative, content, revision) => ipcRenderer.invoke('visualg-project:write', relative, content, revision),
  createFile: (parent, name) => ipcRenderer.invoke('visualg-project:create-file', parent, name),
  createDirectory: (parent, name) => ipcRenderer.invoke('visualg-project:create-directory', parent, name),
  rename: (relative, name) => ipcRenderer.invoke('visualg-project:rename', relative, name),
  move: (relative, parent) => ipcRenderer.invoke('visualg-project:move', relative, parent),
  remove: (relative) => ipcRenderer.invoke('visualg-project:remove', relative),
  gitSnapshot: () => ipcRenderer.invoke('visualg-project:git-snapshot'),
  gitCommitDiff: (revision) => ipcRenderer.invoke('visualg-project:git-commit-diff', revision),
}));
