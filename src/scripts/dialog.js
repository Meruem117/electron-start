const {
    remote
} = require("electron")
const {
    dialog
} = remote

function showMessageBox(options) {
    dialog.showMessageBox({
        title: options.title ? options.title : "electron",
        type: options.type ? options.type : "info",
        message: options.message ? options.message : "确定保存?",
        buttons: options.buttons ? options.buttons : ['Yes', 'No']
    }).then(res => {
        if (res.response === 0) {
            options.sureCallback ? options.sureCallback() : false;
        } else {
            options.cancelCallback ? options.cancelCallback() : false;
        }
    })
}

function showSaveDialog(options) {
    dialog.showSaveDialog({
        title: options.title ? options.title : "保存",
        defaultPath: options.defaultPath ? optionsdefaultPath : "*.txt",
        filters: options.filters ? options.filters : [{
                name: '文档文件',
                extensions: ['*.txt']
            },
            {
                name: '所有文件',
                extensions: ['*']
            }
        ]
    }).then(res => {
        options.successCallback ? options.successCallback(res) : false;
    })
}

module.exports = {
    showMessageBox,
    showSaveDialog
}