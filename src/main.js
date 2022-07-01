const { app, BrowserWindow } = require('electron');
const path = require('path');
const { ipcMain } = require('electron');
const iconPath = path.join(__dirname, 'img', 'icon.ico');
const os = require('os');
const { dialog } = require('electron');
const { Menu, MenuItem } = require('electron');
const windowStateKeeper = require('electron-window-state');
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

let mainWindow = null;
let printWindow = null;

const createPrintWindow = (data) => {
  printWindow.show();
  printWindow.loadURL(data);
  printWindow.on('close', (e) => {
    e.preventDefault();
    printWindow.hide();
  });

  ipcMain.on('print', (e) => {
    const options = {
      silent: false,
    };
    printWindow.webContents.print(options, (success, errorType) => {
      if (success) {
        dialog
          .showMessageBox(printWindow, {
            message: 'Printed Successfuly!',
            type: 'none',
            title: 'Printing Success',
          })
          .then((res) => printWindow.hide());
      } else {
        return;
      }
    });
  });

  ipcMain.on('print-to-pdf', (e) => {
    const pdfPath = path.join(os.homedir(), 'temp.pdf');
    printWindow.webContents
      .printToPDF({})
      .then((data) => {
        fs.writeFile(pdfPath, data, (error) => {
          if (error) throw error;
          console.log(`Wrote PDF successfully to ${pdfPath}`);
        });
      })
      .catch((error) => {
        console.log(`Failed to write PDF to ${pdfPath}: `, error);
      });
  });
};

const createWindow = () => {
  // Create the browser window.

  let mainWindowState = windowStateKeeper({
    dafaultWidth: 800,
    defaultHeight: 600,
  });

  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    titleBarStyle: 'hidden',
    icon: iconPath,
    minWidth: 400,
    show: false,
    backgroundColor: '#1a1b1e',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindowState.manage(mainWindow);

  mainWindow.webContents.on('context-menu', (event, params) => {
    const template = [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'selectAll' },
    ];
    const menu = Menu.buildFromTemplate(template);
    const copy = new MenuItem({
      role: 'copy',
      label: 'Copy',
    });

    // Add each spelling suggestion
    for (const suggestion of params.dictionarySuggestions) {
      menu.append(
        new MenuItem({
          label: suggestion,
          click: () => mainWindow.webContents.replaceMisspelling(suggestion),
        })
      );
    }

    // Allow users to add the misspelled word to the dictionary
    if (params.misspelledWord) {
      menu.append(
        new MenuItem({
          label: 'Add to dictionary',
          click: () =>
            mainWindow.webContents.session.addWordToSpellCheckerDictionary(
              params.misspelledWord
            ),
        })
      );
    }

    menu.popup();
  });

  mainWindow.on('ready-to-show', () => mainWindow.show());

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  console.log(process.env);

  printWindow = new BrowserWindow({
    width: 640,
    height: 480,
    icon: iconPath,
    show: false,
    parent: mainWindow,
    modal: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    minWidth: 320,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  ipcMain.on('close-window', (event) => {
    mainWindow.close();
  });

  ipcMain.on('minimize-window', (event) => {
    mainWindow.minimize();
  });

  ipcMain.on('maximize-window', (event) => {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
  });

  ipcMain.on('toggle-fullscreen', (event) => {
    mainWindow.isFullScreen()
      ? mainWindow.setFullScreen(false)
      : mainWindow.setFullScreen(true);
  });

  ipcMain.on('is-fullscreen', (event) => {
    mainWindow.isFullScreen()
      ? event.reply('is-fullscreen-reply', true)
      : event.reply('is-fullscreen-reply', false);
  });

  ipcMain.on('print-preview', (event, arg) => {
    const data = 'data:text/html,' + encodeURIComponent(arg);

    createPrintWindow(data);
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
