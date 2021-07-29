const {
    dialog
} = require("electron")

function showMessageBox() {
    dialog.showMessageBox({
        title: "electron",
        type: "info",
        message: "确定保存?",
        buttons: ['Yes', 'No']
    })
    // .then(res => {
    //     if (res.response === 0) {
    //         options.sureCallback ? options.sureCallback() : false;
    //     } else {
    //         options.cancelCallback ? options.cancelCallback() : false;
    //     }
    // })
}

function showSaveDialog() {
    dialog.showSaveDialog({
        title: "保存",
        defaultPath: "*.txt",
        filters: [{
                name: '文档文件',
                extensions: ['*.txt']
            },
            {
                name: '所有文件',
                extensions: ['*']
            }
        ]
    })
    // .then(res => {
    //     options.successCallback ? options.successCallback(res) : false;
    // })
}

module.exports = {
    showMessageBox,
    showSaveDialog
}