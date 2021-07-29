const {
    contextBridge,
    ipcRenderer
} = require('electron')
const {
    ACTION,
    NEW_FILE,
    OPEN_FILE,
    SAVE_FILE,
    SAVE_AS_ANOTHER_FILE,
    EXIT
} = require('./constant')

// 深色模式
contextBridge.exposeInMainWorld('darkMode', {
    toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
    system: () => ipcRenderer.invoke('dark-mode:system')
})

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
})

// 监听action
ipcRenderer.on(ACTION, (event, message) => {
    switch (message) {
        case NEW_FILE:
            break
        case OPEN_FILE:
            break
        case SAVE_FILE:
            break
        case SAVE_AS_ANOTHER_FILE:
            break
        case EXIT:
            break
        default:
            break
    }
})
