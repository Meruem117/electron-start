const {
    app,
    BrowserWindow,
    Menu,
    ipcMain,
    nativeTheme
} = require('electron')
const path = require('path')
const components = require('./components')
const utils = require('./scripts')

function createWindow() {
    let win = new BrowserWindow({
        width: 1600,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            devTools: true,
            // contextIsolation: false,
            // enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.setTitle('Electron')
    win.loadFile(path.join(__dirname, 'index.html'))
    win.webContents.openDevTools()
    Menu.setApplicationMenu(components.menu.menuItem(win))

    win.on('closed', () => {
        win = null
    })
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

function testFile() {
    utils.file.fsWriteFile()
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

app.on('window-all-closed', () => {
    app.quit()
})