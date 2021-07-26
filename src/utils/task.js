const {
    app
} = require('electron')

// Windows任务栏
function setUserTasks() {
    app.setUserTasks([{
        program: process.execPath,
        arguments: '--new-window',
        iconPath: process.execPath,
        iconIndex: 0,
        title: 'New Window',
        description: 'Create a new window'
    }])
}

function clearUserTasks() {
    app.setUserTasks([])
}

module.exports = {
    setUserTasks,
    clearUserTasks
}