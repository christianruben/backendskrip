const connection = require('../connection');
const util = require('../../util');

class Account{
    createAccount({idAccount, typeAccount, levelAccount, username, password, status}, callback){
        connection.query(`SELECT username, idAccount FROM ${table} WHERE username = ? OR AccountID = ?`, [username, idAccount], (err, results, fields)=>{
            if(err){
                console.log(err);
                throw err;
            }
            if(results.length <= 0){
                connection.query(`INSERT INTO ${table} () VALUES(?,?,?,?,?,?,?)`, 
                                [idAccount, typeAccount, levelAccount, username, util.passEncrypt(password), status, util.getDateNow()],
                                (err, results)=>{
                                    if(err){
                                        console.error(err);
                                        return;
                                    }
                                    callback(true, results);
                                });
            }else{
                callback(false, {msg:"This account is already created"});
            }
        });
    }

    updateAccountPasswordByAdmin({id, password}, callback){
        connection.query(`UPDATE ${table} SET password = ? WHERE id = ?`, [password, id], (err, results)=>{
            if(err){
                console.error(err);
                throw err;
            }
            callback(results.affectedRows);
        });
    }

    updateAccountPassword({id, oldPassword, password}, callback){
        connection.query(`SELECT password ${table} WHERE ids = ?`, [id], (err, results, fields)=>{
            if(err){
                console.error(err);
                throw err;
            }
            if(results.length > 0){
                util.passValidate(results[0].password, oldPassword, (result)=>{
                    if(result){
                        connection.query(`UPDATE ${table} SET password = ? WHERE id = ?`, [password, id], (err, results)=>{
                            if(err){
                                console.error(err);
                                throw err;
                            }
                            callback(true, results.affectedRows);
                        });
                    }else{
                        callback(false, {msg: "Cannot update account"});
                    }
                });
            }else{
                callback(false, {msg: "Account is not finded, update failed"});
            }
        });
    }

    updateAccount({id,levelAccount, username, status}, callback){
        connection.query(`UPDATE ${table} SET WHERE`, [], (err, results)=>{
            if(err){
                console.error(err);
                throw err;
            }
            callback(results.affectedRows);
        });
    }

    deleteAccount({id}, callback){
        connection.query(`DELETE FROM ${table} WHERE `, [], (err, results)=>{
            if(err){
                console.error(err);
                throw err;
            }
            callback(results.affectedRows);
        });
    }

    listAccount({search, sortby, sort, index, rows}, callback){
        if(search.trim().length > 0){
            connection.query(`SELECT * FROM ${table} WHERE username = ? ORDER BY ${sortby} ${sort} LIMIT ${index},${rows}`, [search], (err, results, fields)=>{
                if(err) {
                    console.error(err);
                    throw err;
                }
                callback(results, fields);
            });
        }else{
            connection.query(`SELECT * FROM ${table} ORDER BY ${sortby} ${sort} LIMIT ${index},${rows}`, (err, results, fields)=>{
                if(err) {
                    console.error(err);
                    throw err;
                }
                callback(results, fields);
            });
        }
    }

    Auth({username, password}, callback){
        if(username.trim().length > 0 && password.trim().length > 0){
            connection.query(`SELECT AccountType, AccountLevel FROM ${table} WHERE username = ? AND password = ?`, [username, password], (err, results, fields)=>{
                if(err){
                    console.error(err);
                    throw err;
                }
                if(results.length > 0){
                    callback({status: true, message: 'account match', data: {}});
                }else{
                    callback({status: false, message: 'username or password is not match, please fill field correctly'});
                }
            });
        }else{
            callback({status: false, message: "username or password is empty, please fill field"});
        }
    }
}

module.exports = Account;