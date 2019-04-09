//comment this line to use the regular console.log
loadLocalSettings()

console = require('@level451/newConsole')
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
const connector = require('@level451/connector');
connector.connect(localSettings.home.address,true,'Ted5000','ted5000');
