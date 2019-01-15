// Modules to control application life and create native browser window
const dispatcher = require('./src/main/js/dispatcher');
const InstanceActions = require('./src/main/js/actions/InstanceActions');
const {app, BrowserWindow, ipcMain} = require('electron');
const fs = require('fs');
const APP_DEBUG = true;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Load React DevTools
  if (APP_DEBUG) {
    BrowserWindow.addDevToolsExtension('./devtools/react/3.6.0_0');
  }

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

function createApplication () {
  createWindow();

  const wowbench = new WoWBench(mainWindow);

  dispatcher.register(wowbench.handle.bind(wowbench));

  ipcMain.on('refresh-game-instance', (event, arg) => {
    InstanceActions.RefreshInstance(arg);
  });
  ipcMain.on('verify-game-instance', (event, arg) => {
    let path = arg;
    let sender = event.sender;
    InstanceActions.VerifyInstance(path, sender);
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createApplication);

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

class WoWBench {
  constructor (mainWindow) {
    this.mainWindow = mainWindow;
  }

  /**
   * Check if the folder is a valid WoW instance.
   * @param path
   * @returns {boolean}
   */
  isValidWoWFolder (path) {
    try {
      let stat = fs.statSync(path + '/_retail_'); // WoW folder must contain _retail_
      return true;
    } catch (e) {}

    return false;
  }

  /**
   * Verify and load a Game Instance.
   * @param event
   */
  verifyGameInstance (event) {
    let path = event.instance.path;
    let instance;
    let isValid = this.isValidWoWFolder(path);

    if (isValid) {
      if (typeof event.instance !== "undefined") {
        instance = event.instance
      } else {
        instance = {}
        instance.path = path;
      }

      instance.accounts = this.loadGameAccounts(path);
      instance.aceProfiles = this.loadAceProfiles(path);
      instance.weakAuras = this.loadWAs(path);
      instance.addons = this.loadGameAddons(path);

      this.mainWindow.webContents.send('add-game-instance', instance);
    }
  }

  loadGameAccounts(path) {
      let accounts;

      // Retail Accounts
      accounts = fs.readdirSync(path + '/_retail_/WTF/Account');

      return accounts;
  }

  /**
   * Get the list of addons in the game instance.
   * @param path
   */
  loadGameAddons(path) {
    let addons = {}

    // Retail addons.
    let retail = fs.readdirSync(path + '/_retail_/Interface/AddOns/');
    addons.retail = retail;

    return addons;
  }

  loadAceProfiles(path) {

  }

  loadWAs(path) {

  }

  handle (event) {
    switch (event.type) {
      case 'REFRESH_GAME_INSTANCE':
      case 'VERIFY_GAME_INSTANCE':
        this.verifyGameInstance(event);
        break;
      default: break;
    }
  }
}
