// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron');
const fs = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('add-game-install', async function (event, arg) {
  let addons = {
    retail: [],
  };

  function loadAddons (path) {
    // Retail addons.
    let retail = fs.readdirSync(path + '/_retail_/Interface/AddOns/');
    addons.retail = retail;

    return addons;
  }

  function isValidWoWFolder (path) {
    try {
      let stat = fs.statSync(path + '/_retail_'); // WoW folder must contain _retail_
      return true;
    } catch (e) {
    }

    return false;
  }

  let path = arg.path;

  let valid = isValidWoWFolder(path);

  if (!valid) {
    console.log('Game instance is invalid: ' + path);
    return;
  }

  // Check for game add-ons.

  loadAddons(path);
  event.sender.send('load-game-addons', {addons});
});