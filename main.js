const {
    app,
    BrowserWindow
} = require('electron')
const path = require('path')

function createWindow() {
    const win = new BrowserWindow({
        width: 1600,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // to use require
            enableRemoteModule: true, // to use remote
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
    // require('./src/render/menu')

    app.on('window-all-closed', () => {
        app.quit()
    })
})