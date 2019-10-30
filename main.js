// Modules to control application life and create native browser window
const { globalShortcut, app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron')
const fileHelper = require('./util/fileElectron');
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

class DesktopApp {
  constructor() {
    this.app = app;
    this.ipcMain = ipcMain;
    this.setUpApp();
    this.setUpAllListener();
  }
  
  createWindow () {
      win = new BrowserWindow({
        width: 1600,
        height: 900,
        webPreferences: {
          nodeIntegration: true,
          preload: path.join(__dirname, 'preload.js')
        },
      })
      globalShortcut.register('f5', function() {
        console.log('f5 is pressed')
        win.reload()
      })
      globalShortcut.register('CommandOrControl+R', function() {
        console.log('CommandOrControl+R is pressed')
        win.reload()
      })
      win.loadFile('index.html')
    
      win.webContents.openDevTools()
    
      win.on('closed', () => {
        win = null
      })
    }
    
    setUpApp(){
      this.app.on('ready', this.createWindow)

      this.app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
          this.app.quit()
        }
      })
      
      this.app.on('activate', () => {
        if (win === null) {
          this.createWindow()
        }
      })

    }

    setUpFileWriteListener(){
      this.ipcMain.on('file-write', (event, data) => {
        fileHelper.writeHexByteFile(data.fileData, data.fileName, data.fileDirectory);
        event.sender.send('file-written', {newFileName: data.fileName});
      })
    }

    setUpFileListener(){
      ipcMain.on('get-bytes', (event, data) => {
        let btnName = data.encrypt ? "encrypt" : "decrypt";
        let id = data.encrypt ? "en-ui" : "de-ui";
        let byteArray = fileHelper.getHexByteArray(data.path);
        event.sender.send('got-bytes', {
          btnName: btnName,
          id: id,
          byteArray: byteArray
        });
      }); 
    }

    setUpAllListener() {
      this.setUpFileListener();
      this.setUpFileWriteListener();
    }
}

module.exports = DesktopApp;