const crypt = require('bcryptjs');
const cpto = require('crypto');

function randomValHex(len){
    return cpto.randomBytes(Math.ceil(len/2)).toString('hex').slice(0, len);
}

function getDateNow(){
    let d = new Date();
    let strM = "";
    let strD = "";
    let month = d.getMonth() + 1;
    let day = d.getDay();
    let year = d.getFullYear();
    
    if(month < 10) strM = `0${month}`;
    if(day < 10) strD = `0${day}`;

    return [year, strM, strD].join("-");
}

function getTimeNow(){
    let d = new Date();
    let strH = "";
    let strM = "";
    let strS = "";
    let hour = d.getUTCHours();
    let minute = d.getUTCMinutes();
    let second = d.getUTCSeconds();

    if(hour < 10) strH = `0${hour}`;
    if(minute < 10) strM = `0${minute}`;
    if(strS < 10) strS = `0${second}`;

    return [strH, strM, strS].join(":");
}

function passEncrypt(plainPassword){
    let salt = crypt.genSaltSync(10);
    let hash = crypt.hashSync(plainPassword, salt);
    return hash;
}

function passValidate(hashPass, plainPass, cb){
    let result = {
        status: 0
    }
    crypt.compare(plainPass, hashPass, (err, res)=>{
        if(err){
            cb(false)
        }
        if(res){
            cb(res);
        }else{
            cb(res);
        }
    });
}

module.exports = {
    randomValHex,
    getDateNow,
    getTimeNow,
    passEncrypt,
    passValidate
}