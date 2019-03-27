const request = require('request');
const EventEmitter = require('events').EventEmitter;
//var ted ={}
//util.inherits(EventEmitter,ted)
const ted = new EventEmitter();
const connector = require('@level451/connector');
connector.on('connected',()=>{
    connector.sendObjectData('ted',ted)
})
module.exports = ted;
var secondData = {}

setInterval(function(){Promise.all([go(0),go(1),go(2),go(3)]).then(function(){
    ted.emit('secondData',secondData)
    secondData={}
})},2000)

function go(MTU){
    return new Promise(function(resolve,reject){
        request('http://ted5000/history/rawsecondhistory.raw?MTU='+MTU+'&COUNT=1&INDEX=1', function (err, resp, body) {
            try{
                let buff = new Buffer.from(body, 'base64');
                if (!secondData.time){secondData.time = new Date(buff[0] + 2000, buff[1] - 1, buff[2], buff[3], buff[4], buff[5])}
                secondData[MTU]= {power:buff.readInt32LE(6, 4),volt:(buff.readInt16LE(14, 2) / 10),cost:buff.readInt32LE(10, 4)}

            } catch(err){

            }

            if (err) {
                console.log(err)
                reject(err);
            } else {
                resolve();
            }
//            tedEmitter.emit('secondData',buff.readInt32LE(6, 4))

        })
    }
)}
ted.test  = (d)=>{
    console.log('test function',d)
    //setTimeout(function(){return 'timer'},500)
    return ('hey returned:'+d)
}

ted.asyncTest = async function(...args){
    console.log(args)
    await new Promise(resolve => setTimeout(resolve, 5000))
    console.log(args)
    return args[2]+' = '+args[1]+args[0]
}

ted.on('secondData',(d)=>{

    connector.remoteEmit('ted','secondData',d)
})
ted.asyncTest('test in data').then(function(x){console.log('fullfill',x)})