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
        },
        {
            label: '文件(F)',
            submenu: [{
                    label: '新建(N)',
                    click: () => {
                        currentWin.webContents.send('action', 'new')
                    }
                },
                {
                    label: '打开(O)',
                    click: () => {
                        currentWin.webContents.send('action', 'open')
                    }
                }, {
                    label: '保存(S)',
                    click: () => {
                        currentWin.webContents.send('action', 'save')
                    }
                }, {
                    label: '另存为(A)',
                    click: () => {
                        currentWin.webContents.send('action', 'saveOther')
                    }
                }, {
                    type: 'separator'
                }, {
                    label: '打印(P)',
                    click: () => {
                        currentWin.webContents.send('action', 'print')
                    }
                }, {
                    type: 'separator'
                }, {
                    label: '退出(X)',
                    click: () => {
                        currentWin.webContents.send('action', 'quit')
                    }
                }
            ]
        }, {
            label: '编辑(E)',
            submenu: [{
                label: '剪切(X)',
                role: 'cut',
            }, {
                label: '复制(C)',
                role: 'copy',
            }, {
                label: '粘贴(V)',
                role: 'paste',
            }, {
                label: '删除(D)',
                click: () => {
                    currentWin.webContents.send('action', 'delete')
                }
            }, {
                type: 'separator'
            }, {
                label: '全选(A)',
                role: 'selectAll'
            }]
        },
        {
            label: '操作',
            submenu: [{
                label: '撤回',
                role: 'undo'
            }, {
                label: '前进',
                role: 'redo'
            }]
        },
        {
            label: '重载',
            role: "reload"
        }
    ])
    Menu.setApplicationMenu(menuTemplate)
}

module.exports = {
    setMenu
}