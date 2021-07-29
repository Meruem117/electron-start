const {
    Menu,
    BrowserWindow
} = require('electron')
const path = require('path')
const {
    ACTION,
    NEW_FILE,
    OPEN_FILE,
    SAVE_FILE,
    SAVE_AS_ANOTHER_FILE,
    EXIT
} = require('../constant')

// 菜单
function menuItem(currentWin) {
    // const currentWin = BrowserWindow.getFocusedWindow()
    return Menu.buildFromTemplate([{
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
                click: () => {
                    let win = new BrowserWindow({
                        width: 1600,
                        height: 900,
                        webPreferences: {
                            nodeIntegration: true,
                            contextIsolation: false,
                            enableRemoteModule: true,
                        }
                    })
                    win.loadFile(path.join(__dirname, '../pages/new.html'))
                    win.on('closed', () => {
                        win = null
                    })
                }
            }]
        },
        {
            label: '文件',
            submenu: [{
                    label: '新建',
                    accelerator: process.platform === 'darwin' ? "Cmd+N" : "Ctrl+N",
                    click: () => {
                        currentWin.webContents.send(ACTION, NEW_FILE)
                    }
                },
                {
                    label: '打开',
                    accelerator: process.platform === 'darwin' ? "Cmd+O" : "Ctrl+O",
                    click: () => {
                        currentWin.webContents.send(ACTION, OPEN_FILE)
                    }
                }, {
                    label: '保存',
                    accelerator: process.platform === 'darwin' ? "Cmd+S" : "Ctrl+S",
                    click: () => {
                        currentWin.webContents.send(ACTION, SAVE_FILE)
                    }
                }, {
                    label: '另存为',
                    accelerator: process.platform === 'darwin' ? "Cmd+Shift+S" : "Ctrl+Shift+S",
                    click: () => {
                        currentWin.webContents.send(ACTION, SAVE_AS_ANOTHER_FILE)
                    }
                }, {
                    type: 'separator'
                }, {
                    label: 'Exit',
                    click: () => {
                        currentWin.webContents.send(ACTION, EXIT)
                    }
                }
            ]
        }, {
            label: 'Edit',
            submenu: [{
                    label: 'Undo',
                    role: 'undo'
                },
                {
                    label: 'Redo',
                    role: 'redo'
                },
                {
                    label: 'Cut',
                    role: 'cut'
                },
                {
                    label: 'Copy',
                    role: 'copy'
                },
                {
                    label: 'Paste',
                    role: 'paste'
                },
                {
                    label: 'Reload',
                    role: "reload"
                }
            ]
        }
    ])
    // Menu.setApplicationMenu(menuTemplate)
}

module.exports = {
    menuItem
}