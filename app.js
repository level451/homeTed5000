//comment this line to use the regular console.log
console = require('@level451/newConsole')
loadLocalSettings()
ted = require('./ted5000');
ted.on('secondData', (d) => {
    process.stdout.write('.')
    //console.log(d)
})



function loadLocalSettings() {
    global.localSettings = {
        "home": {
            "address": "level451.com:2112"
        }
    }
}