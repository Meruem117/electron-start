const {
    Menu,
    BrowserWindow
} = require('electron')
const path = require('path')

// 菜单
function setMenu() {
    const currentWin = BrowserWindow.getFocusedWindow()
    const menuTemplate = Menu.buildFromTemplate([{
            label: 'Home',
            click() {
                console.log('Home')
            }
        },
        {
            label: 'About',
            submenu: [{
                label: 'Detail',
                accelerator: process.platform === 'darwin' ? "Cmd+W" : "Ctrl+W", // 快捷键
                click() { // 点击事件
                    const win = new BrowserWindow({
                        width: 1600,
                        height: 900,
                        webPreferences: {
                            nodeIntegration: true,
                            contextIsolation: false,
                            enableRemoteModule: true,
                        }
                    })
                    win.loadFile(path.join(__dirname, '../pages/new.html'))
                }
            }]
        }
    ])
    Menu.setApplicationMenu(menuTemplate)
}

module.exports = {
    setMenu
}