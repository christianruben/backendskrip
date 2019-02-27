const connection = require('../connection');
const util = require('../../util');

const insertToken = ({accessToken, refreshToken}, callback)=>{
    console.log(refreshToken);
    connection.query("INSERT INTO token_ref(token, token_refresh, datecreated) VALUES(?,?,?)", [accessToken, refreshToken, util.getDateNow()], (err, results)=>{
        if(err){
            console.log(err);
            callback(false);
        }
        console.log(results);
        if(results.affectedRows > 0){
            callback(true);
        }else{
            callback(false);
        }
    });
}

const updateToken = ({oldAccessToken, accessToken, refreshToken}, callback)=>{
    connection.query("UPDATE tokenbase SET accessToken = ?, refreshToken = ? WHERE accessToken = ?", [accessToken, refreshToken, oldAccessToken], (err, results)=>{
        if(err){
            callback(false);
        }
        callback(results.affectedRows);
    });
}

const deleteToken = ({accessToken}, callback)=>{
    connection.query("DELETE FROM token_ref WHERE token = ?", [accessToken], (err, results)=>{
        if(err){
            callback(false);
        }
        callback(results.affectedRows > 0);
    });
}

const getToken = ({accessToken}, callback)=>{
    connection.query("SELECT token_id,token, token_refresh FROM tokenbase WHERE token = ?", [accessToken], (err, results)=>{
        if(err){
            callback(false, {tokenid:null, refreshToken: null, accessToken: null});
        }
        if(results.length > 0){
            callback(true, {tokenid:results[0].token_id, refreshToken: results[0].token_refresh, accessToken: results[0].token});
        }else{
            callback(false, {tokenid:null, refreshToken: null, accessToken: null});
        }
    });
}

module.exports = {
    insertToken,
    updateToken,
    deleteToken,
    getToken
};