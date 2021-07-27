// const utils = require('./utils')

// 监听在线/离线事件
function updateOnlineStatus() {
    document.getElementById('status').innerHTML = navigator.onLine ? 'Online' : 'Offline'
}
window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

window.onload = () => {
    updateOnlineStatus()
    console.log('window is load')
}

// 右键点击事件
window.addEventListener('contextmenu', () => {
    alert('右键点击了')
})

// 拖拽文件
// document.getElementById('drag').ondragstart = (event) => {
//     event.preventDefault()
//     window.electron.startDrag('clock.png')
// }

// 深色模式
document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    const isDarkMode = await window.darkMode.toggle()
    document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
    await window.darkMode.system()
    document.getElementById('theme-source').innerHTML = 'System'
})