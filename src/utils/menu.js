const {
    Menu,
    BrowserWindow
} = require('electron')
const path = require('path')

// 菜单
function setMenu() {
    const menuTemplate = Menu.buildFromTemplate([{
            label: 'home',
            click() {
                console.log('Home')
            }
        },
        {
            label: 'about',
            submenu: [{
                label: 'detail',
                accelerator: process.platform === 'darwin' ? "Cmd+N" : "Ctrl+N", // 快捷键
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