const {
    Notification
} = require('electron')

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

// 通知
function showNotification() {
    const notification = new Notification({
        title: NOTIFICATION_TITLE,
        body: NOTIFICATION_BODY
    })
    notification.show()
}

module.exports = {
    showNotification
}