const {
    Menu,
    BrowserWindow
} = require('electron')

// 菜单
const menuTemplate = [{
        label: 'home'
    },
    {
        label: 'about',
        submenu: [{
            label: 'detail',
            accelerator: 'ctrl+n', // 快捷键
            click: () => { // 点击事件
                const win = new BrowserWindow({
                    width: 1600,
                    height: 900,
                    webPreferences: {
                        nodeIntegration: true,
                        contextIsolation: false, // to use require
                        enableRemoteModule: true, // to use remote
                    }
                })
                win.loadFile('index.html')
            }
        }]
    }
]
const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)