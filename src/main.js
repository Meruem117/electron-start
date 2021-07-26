const {
    app,
    BrowserWindow,
    ipcMain,
    nativeTheme
} = require('electron')
const path = require('path')
const utils = require('./utils')

function createWindow() {
    const win = new BrowserWindow({
        width: 1600,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            // contextIsolation: false,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile('index.html')

    ipcMain.handle('dark-mode:toggle', () => {
        if (nativeTheme.shouldUseDarkColors) {
            nativeTheme.themeSource = 'light'
        } else {
            nativeTheme.themeSource = 'dark'
        }
        return nativeTheme.shouldUseDarkColors
    })

    ipcMain.handle('dark-mode:system', () => {
        nativeTheme.themeSource = 'system'
    })
}

app.whenReady()
    .then(() => {
        createWindow()
        utils.menu.setMenu()
        // utils.notification.showNotification()
    })

app.on('window-all-closed', () => {
    app.quit()
})