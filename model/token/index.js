const connection = require('../connection');
const util = require('../../util');

class Token{
    insertToken({accessToken, refreshToken}, callback){
        connection.query("INSERT INTO tokenbase(accessToken, refreshToken, datecreated) VALUES(?,?,?)", [accessToken, refreshToken, util.getDateNow()], (err, results)=>{
            if(err){
                callback(false);
            }
            callback(true);
        });
    }

    updateToken({oldAccessToken, accessToken, refreshToken}, callback){
        connection.query("UPDATE tokenbase SET accessToken = ?, refreshToken = ?, dateupdated = ? WHERE accessToken = ?", [accessToken, refreshToken, util.getDateNow(), oldAccessToken], (err, results)=>{
            if(err){
                callback(false);
            }
            callback(results.affectedRows);
        });
    }

    deleteToken({accessToken}, callback){
        connection.query("DELETE FROM tokenbase WHERE accessToken = ?", [accessToken, refreshToken], (err, results)=>{
            if(err){
                callback(false);
            }
            callback(results.affectedRows);
        });
    }

    getToken({accessToken}, callback){
        connection.query("SELECT accessToken, refreshToken FROM tokenbase WHERE accessToken = ?", [accessToken], (err, results)=>{
            if(err){
                callback(false, {refreshToken: null, accessToken: null});
            }
            if(results.length > 0){
                callback(true, {refreshToken: results[0].refreshToken, accessToken: results[0].accessToken});
            }else{
                callback(false, {refreshToken: null, accessToken: null});
            }
        });
    }
}

module.exports = Token;