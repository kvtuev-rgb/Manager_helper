const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
  readFileContent: (filePath) => ipcRenderer.invoke('read-file-content', filePath),
});
