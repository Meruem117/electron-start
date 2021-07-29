const fs = require('fs')

// 写入文件
function fsWriteFile(path, text) { //{savePath,text,callback}
    fs.writeFile(path, text, (err, data) => {
        if (err) {
            throw err
        }
        // if (err) throw err;
        // document.title = title;
        // isSave = true;
        // options.callback ? options.callback(data) : false;
    })
}

// 新建文件
function newFile() {
    if (isSave) {
        textarea.value = ""
        document.title = title
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

module.exports = {
    fsWriteFile
}