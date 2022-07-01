const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('app', {
  closeWindow: () => ipcRenderer.send('close-window'),
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  toggleFullScreen: () => ipcRenderer.send('toggle-fullscreen'),
  isFullScreen: () => ipcRenderer.send('is-fullscreen'),
  setFullScreenListener: (callback) =>
    ipcRenderer.on('is-fullscreen-reply', callback),
  removeFullScreenListener: (callback) =>
    ipcRenderer.removeListener('is-fullscreen-reply', callback),
  printPreview: (arg) => ipcRenderer.send('print-preview', arg),
  printToPdf: () => ipcRenderer.send('print-to-pdf'),
  print: () => ipcRenderer.send('print'),
});
