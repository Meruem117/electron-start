const {
    fileRead,
    openNewWindow
} = require('./js/util')

window.onload = () => {
    openNewWindow()
}

window.addEventListener('contextmenu', () => {
    alert(111)
})