const fs = require('fs')
const {
    remote
} = require('electron')
const {
    BrowserWindow
} = remote

// 读取文件
function fileRead() {
    const btn = this.document.querySelector('#btn')
    const content = this.document.querySelector('#content')
    btn.onclick = () => {
        fs.readFile('demo.txt', (err, data) => {
            content.innerHTML = data
        })
    }
}

// 打开新窗口
function openNewWindow() {
    const btn = this.document.querySelector('#btn')
    btn.onclick = () => {
        let newWin = new BrowserWindow({
            width: 800,
            height: 600
        })
        newWin.loadFile('src/page/new.html')
        newWin.on('closed', () => {
            newWin = null
        })
    }
}

window.onload = () => {
    openNewWindow()
}

window.addEventListener('contextmenu', () => {
    alert(111)
})