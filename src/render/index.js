const fs = require('fs')
const {
    remote,
    Menu
} = require('electron')
const {
    BrowserWindow
} = remote

// 读取文件
function fileRead() {
    const btn = this.document.querySelector('#btn')
    const content = this.document.querySelector('#content')
    btn.onclick = function () {
        fs.readFile('demo.txt', (err, data) => {
            content.innerHTML = data
        })
    }
}

// 打开新窗口
function openNewWindow() {
    const btn = this.document.querySelector('#btn')
    let newWin = null
    btn.onclick = () => {
        newWin = new BrowserWindow({
            width: 800,
            height: 600
        })
        newWin.loadFile('src/html/new.html')
        newWin.on('closed', () => {
            newWin = null
        })
    }
}

// 菜单
const menuTemplate = [{
        label: 'home'
    },
    {
        label: 'about',
        submenu: [{
            label: 'detail'
        }]
    }
]
const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)

window.onload = function () {
    openNewWindow()
}