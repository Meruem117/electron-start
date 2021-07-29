const {
    Notification
} = require('electron')
const {
    NOTIFICATION_TITLE,
    NOTIFICATION_BODY
} = require('../constant')

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