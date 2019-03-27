const connection = require('../connection');
const util = require('../../util');

/**
 * @author kristian ruben sianturi
 * manage data in tbl_user
 */

function createAccount({idowner, level, username, password, picture}, callback){
    let datenow = util.getDateNow();
    let hashpass = util.passEncrypt(password);
    let result = {
        status: 0,
        err: "Username yang dimasukan sudah terdaftar"
    }
    connection.execute(`SELECT user_id FROM tbl_user WHERE username = ?`, [username], (err, res, field)=>{
        if(err){
            result = {
                status: -1,
                err: "Terjadi kesalahan pada server"
            }
            callback(result);
        }else{
            if(res.length > 0){
                callback(result);
            }else{
                connection.execute('INSERT INTO tbl_user(owner_id, level, username, password, picture, datecreated) VALUES(?, ?, ?, ?, ?, ?)', [idowner, level, username, hashpass, picture, datenow], (err, res)=> {
                    if(err){
                        console.log(err)
                        result = {
                            status: -1,
                            err: "Terjadi kesalahan pada server"
                        }
                        callback(result);
                    }else{
                        if(res.affectedRows > 0){
                            result = {
                                status: 1,
                                err: null
                            }
                            callback(result);
                        }else{
                            result = {
                                status: 0,
                                err: "Terjadi kesalahan, data tidak berhasil disimpan"
                            }
                            callback(result);
                        }
                    }
                });
            }
        }
    });
}

function Auth(username, password, callback){
    let result = {
        status: 0,
        err: "akun tidak dapat di temukan"
    }
    connection.execute('SELECT * FROM tbl_user WHERE username = ?', [username], (err, res, field)=>{
        if(err){
            result = {
                status: -1,
                err: "Terjadi kesalahan pada server"
            }
            callback(result);
        }else{
            if(res.length > 0){
                let hashpass = res[0].password;
                util.passValidate(hashpass, password, (stat)=>{
                    if(stat){
                        result = {
                            status: 1,
                            err: null,
                            data: {
                                id: res[0].user_id,
                                ownid: res[0].owner_id,
                                level: res[0].level
                            }
                        }
                        callback(result);
                    }else{
                        result = {
                            status: 0,
                            err: "username dan password tidak cocok "
                        }
                        callback(result);
                    }
                });
            }else{
                callback(result);
            }
        }
    });
}

function update({id, username}, callback){
    let result = {
        status: 0,
        err: "Username yang dimasukan sudah terdaftar"
    }
    connection.execute(`SELECT user_id FROM user WHERE username = ?`, [username], (err, res, field)=>{
        if(err){
            result = {
                status: -1,
                err: "Terjadi kesalahan pada server"
            }
            callback(result);
        }else{
            if(res.length > 0){
                callback(result);
            }else{
                connection.execute(`UPDATE user SET username = ? WHERE user_id = ?`, [username, id], (err, res)=> {
                    if(err){
                        result = {
                            status: -1,
                            err: "Terjadi kesalahan pada server"
                        }
                        callback(result);
                    }else{
                        if(res.affectedRows > 0){
                            result = {
                                status: 1,
                                err: null
                            }
                            callback(result);
                        }else{
                            result = {
                                status: 0,
                                err: "Terjadi kesalahan, data tidak berhasil di perbaharui"
                            }
                            callback(result);
                        }
                    }
                });
            }
        }
    });
}

function updatePicture({id, picture}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, gagal perbaharui photo"
    }
    connection.execute(`UPDATE user SET picture = ? WHERE user_id = ?`, [picture, id], (err, res)=> {
        if(err){
            result = {
                status: -1,
                err: "Terjadi kesalahan pada server"
            }
            callback(result);
        }else{
            if(res.affectedRows > 0){
                result = {
                    status: 1,
                    err: null
                }
                callback(result);
            }else{
                callback(result);
            }
        }
    });
}

function deleteAccount({id}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, gagal menghapus"
    }
    connection.execute(`DELETE FROM user WHERE user_id IN(?)`, [id], (err, res)=>{
        if(err){
            result = {
                status: -1,
                err: "Terjadi kesalahan pada server"
            }
            callback(result);
        }else{
            if(res.affectedRows > 0){
                result = {
                    status: 1,
                    err: null
                }
                callback(result);
            }else{
                callback(result);
            }
        }
    });
}

function listAccountTeacher({search, orderby, order, index, len}, callback){
    if(search.trim().length > 0){
        let src = `%${search}%`;
        connection.execute(`SELECT u.user_id, u.username, tt.name FROM user as u INNER JOIN tbl_teacher as tt ON u.owner_id = tt.teacher_id WHERE u.username = N? OR tt.name = N? ORDER BY ${orderby} ${order} LIMIT ?,?`, [src, src, index, len], callback);
    }else{
        connection.execute(`SELECT u.user_id, u.username, tt.name FROM user as u INNER JOIN tbl_teacher as tt ON u.owner_id = tt.teacher_id ORDER BY ${orderby} ${order} LIMIT ?,?`, [index, len], callback);
    }
}

function listAccountStudent({search, orderby, order, index, len}, callback){
    if(search.trim().length > 0){
        let src = `%${search}%`;
        connection.execute(`SELECT u.user_id, u.username, u.picture, ts.name FROM user as u INNER JOIN tbl_student as ts ON u.owner_id = ts.student_id WHERE u.username = N? OR tt.name = N? ORDER BY ${orderby} ${order} LIMIT ?,?`, [src, src, index, len], callback);
    }else{
        connection.execute(`SELECT u.user_id, u.username, u.picture, ts.name FROM user as u INNER JOIN tbl_student as ts ON u.owner_id = ts.student_id ORDER BY ${orderby} ${order} LIMIT ?,?`, [index, len], callback);
    }
}

function getAccountTeacher({id}, callback){
    connection.execute(`SELECT u.user_id, tt.teacher_id, u.username, u.picture, tt.name, tt.relationship, tt.phone_number, tt.address, tt.born_date, tt.religion FROM user as u INNER JOIN tbl_teacher as tt ON u.owner_id = tt.teacher_id WHERE u.user_id = ?`, [id], callback);
}

function getAccountStudent({id}, callback){
    connection.execute(`SELECT u.user_id, u.username, u.picture, tt.name FROM user as u INNER JOIN tbl_student as ts ON u.owner_id = ts.student_id WHERE u.user_id = ?`, [id], callback);
}

module.exports = {
    createAccount,
    Auth,
    update,
    updatePicture,
    deleteAccount,
    listAccountTeacher,
    listAccountStudent,
    getAccountStudent,
    getAccountTeacher
};