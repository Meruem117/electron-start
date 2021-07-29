const fs = require('fs')

function openFile(path) {
    fs.open(path, 'r', (err, data) => {
        if (err) throw err
        document.getElementById('content').innerHTML = data
    })
}

// 写入文件
function writeFile(path, text) { //{savePath,text,callback}
    fs.writeFile(path, text, (err, data) => {
        if (err) throw err
    })
}

module.exports = {
    openFile
}