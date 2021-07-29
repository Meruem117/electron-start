const {
    app,
    BrowserWindow,
    ipcMain,
    nativeTheme
} = require('electron')
const path = require('path')
const scripts = require('./scripts')

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
    win.loadFile(path.join(__dirname, 'index.html'))
    // win.on('closed', () => {
    //     win = null
    // })
}

function handleTheme() {
    // 主题切换
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
        // mac
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow()
        })
        handleTheme()
    })
    .then(() => {
        scripts.menu.setMenu()
    })

app.on('window-all-closed', () => {
    app.quit()
})