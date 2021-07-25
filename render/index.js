const fs = require('fs')

window.onload = function () {
    const btn = this.document.querySelector('#btn')
    const content = this.document.querySelector('#content')
    btn.onclick = function () {
        fs.readFile('demo.txt', (err, data) => {
            content.innerHTML = data
        })
    }
}