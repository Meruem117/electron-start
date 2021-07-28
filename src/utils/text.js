const {
    ipcRenderer,
    remote
} = require('electron')
const {
    Menu,
    MenuItem,
    dialog
} = remote

let currentFile = null // 当前文档保存的路径
let isSaved = true // 当前文档是否已保存
let textEditor = document.getElementById('text') // 获得TextArea文本框的引用

document.title = "Notepad - Untitled" // 设置文档标题，影响窗口标题栏名称

// 给文本框增加右键菜单
const contextMenuTemplate = [{
        role: 'undo'
    }, // Undo菜单项
    {
        role: 'redo'
    }, // Redo菜单项
    {
        type: 'separator'
    }, // 分隔线
    {
        role: 'cut'
    }, // Cut菜单项
    {
        role: 'copy'
    }, // Copy菜单项
    {
        role: 'paste'
    }, // Paste菜单项
    {
        role: 'delete'
    }, // Delete菜单项
    {
        type: 'separator'
    }, // 分隔线
    {
        role: 'selectall'
    } // Select All菜单项
]

const contextMenu = Menu.buildFromTemplate(contextMenuTemplate)
textEditor.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    contextMenu.popup(remote.getCurrentWindow());
})