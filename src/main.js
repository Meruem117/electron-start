const {
    app,
    BrowserWindow,
    ipcMain,
    Menu,
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

let template = [{
    label: '文件(F)',
    submenu: [{
        label: '新建(N)',
        click: () => {
            BrowserWindow.getFocusedWindow().webContents.send('action', 'new');
        }
    }, {
        label: '打开(O)',
        click: () => {
            BrowserWindow.getFocusedWindow().webContents.send('action', 'open');
        }
    }, {
        label: '保存(S)',
        click: () => {
            BrowserWindow.getFocusedWindow().webContents.send('action', 'save');
        }
    }, {
        label: '另存为(A)',
        click: () => {
            BrowserWindow.getFocusedWindow().webContents.send('action', 'saveOther');
        }
    }, {
        type: 'separator'
    }, {
        label: '打印(P)',
        click: () => {
            BrowserWindow.getFocusedWindow().webContents.send('action', 'print');
        }
    }, {
        type: 'separator'
    }, {
        label: '退出(X)',
        click: () => {
            BrowserWindow.getFocusedWindow().webContents.send('action', 'quit');
        }
    }]
}, {
    label: '编辑(E)',
    submenu: [{
        label: '剪切(O)',
        role: 'cut',
    }, {
        label: '复制(S)',
        role: 'copy',
    }, {
        label: '粘贴(A)',
        role: 'paste',
    }, {
        label: '删除(L)',
        click: () => {
            BrowserWindow.getFocusedWindow().webContents.send('action', 'delete');
        }
    }, {
        type: 'separator'
    }, {
        label: '全选(A)',
        role: 'selectAll'
    }]
}, {
    label: '操作(O)',
    submenu: [{
        label: '撤回',
        role: 'undo'
    }, {
        label: '前进',
        role: 'redo'
    }]
}, {
    label: '重载',
    role: "reload"
}]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

app.whenReady()
    .then(() => {
        createWindow()
        // mac
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow()
        })
        handleTheme()
    })
    // .then(() => {
    //     scripts.menu.setMenu()
    // })

app.on('window-all-closed', () => {
    app.quit()
})