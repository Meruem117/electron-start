const electron = require("electron");
const ipcRenderer = electron.ipcRenderer;
const dialog = electron.remote.dialog;
const BrowserWindow = electron.remote.BrowserWindow;
const app = electron.remote.app;
const fs = require('fs');

let textarea = document.querySelector("#text");

ipcRenderer.on("action", (err, data) => {
    console.log(data)
    switch (data) {
        case "new":
            newFile();
            break;
        case "open":
            openFile();
            break;
        case "save":
            saveFile();
            break;
        case "saveOther":
            saveOtherFile();
            break;
        case "print":
            printFile();
            break;
        case "quit":
            quitFile();
            break;
        case "delete":
            deleteFile()
            break;
    }
})

let isSave = true; //是否保存
let savePath = ''; //当前保存路径
let title = document.title;
let tagTitle = " * ";
textarea.addEventListener("input", (e) => { //输入框变动时，触发没有保存
    document.title = title + tagTitle;
    isSave = false;
})

function dialogShowMessageBox(options) { //{message,buttons=['ok','no'],type="info",title="electron简易记事本",sureCallback=null,cancelCallback=null}
    dialog.showMessageBox({
        title: options.title ? options.title : "electron简易记事本",
        type: options.type ? options.type : "info",
        message: options.message ? options.message : "确定保存？",
        buttons: options.buttons ? options.buttons : ['ok', 'no']
    }).then(res => {
        if (res.response === 0) {
            options.sureCallback ? options.sureCallback() : false;
        } else {
            options.cancelCallback ? options.cancelCallback() : false;
        }
    })
}

function dialogShowSaveDialog(options) { //{title,defaultPath,filters,successCallback}
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

function fsWriteFile(options) { //{savePath,text,callback}
    fs.writeFile(options.savePath, options.text, {}, (err, data) => {
        if (err) throw err;
        document.title = title;
        isSave = true;
        options.callback ? options.callback(data) : false;
    })
}

function newFile() { //1.新建文件
    if (isSave) {
        textarea.value = "";
        document.title = title;
    } else {
        if (savePath === "") {
            let options = {
                sureCallback: () => {
                    let params = {
                        successCallback: (res) => {
                            if (res.canceled) {
                                return
                            }
                            fsWriteFile({
                                savePath: res.filePath,
                                text: textarea.value,
                                callback: (data) => {
                                    savePath = res.filePath;
                                }
                            })
                        }
                    }
                    dialogShowSaveDialog(params);
                },
            }
            dialogShowMessageBox(options);
        } else {
            let options = {
                sureCallback: () => {
                    fsWriteFile({
                        savePath: savePath,
                        text: textarea.value,
                        callback: (err, data) => {
                            textarea.value = "";
                        }
                    })
                },
            }
            dialogShowMessageBox(options);
        }
    }
}

function openFile() { //2.打开
    dialog.showOpenDialog({
        properties: ['openFile']
    }).then(res => {
        if (res.canceled) {
            return
        }
        savePath = res.filePaths[0];
        isSave = true;
        fs.readFile(savePath, 'utf8', (err, data) => {
            textarea.value = data;
        })
    })
}

function saveFile() { //3.保存
    if (savePath === "") {
        let options = {
            successCallback: (res) => {
                if (res.canceled) {
                    return
                }
                fsWriteFile({
                    savePath: res.filePath,
                    text: textarea.value,
                    callback: (data) => {
                        savePath = res.filePath;
                    }
                })
            }
        }
        dialogShowSaveDialog(options)
    } else {
        fsWriteFile({
            savePath: savePath,
            text: textarea.value
        })
    }
}

function saveOtherFile() { //4.另存为
    let options = {
        successCallback: (res) => {
            if (res.canceled) {
                return
            }
            fsWriteFile({
                savePath: res.filePath,
                text: textarea.value,
                callback: (data) => {
                    savePath = res.filePath;
                }
            })
        }
    }
    dialogShowSaveDialog(options)
}

function printFile() { //5. 打印
    BrowserWindow.getFocusedWindow().webContents.print();
}

function quitFile() { //6.退出
    app.quit()
}

function deleteFile() { //7.删除
    textarea.value = "";
    document.title = title;
    isSave = true;
}