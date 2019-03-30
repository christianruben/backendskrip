const connection = require('../connection');
const util = require('../../util');

/**
 * @author kristian ruben sianturi
 * manage data in tbl_admin
 */

const Auth = (username, password, callback)=>{
    let result = {
        status: 0,
        err: "akun tidak dapat di temukan"
    }
    connection.poolSelect('SELECT * FROM tbl_admin WHERE username = ?', [username], (res)=>{
        if(res.err){
            result = {
                status: -1,
                err: "Terjadi kesalahan pada server"
            }
            callback(result);
        }else{
            if(res.res.length > 0){
                let hashpass = res.res[0].password;
                util.passValidate(hashpass, password, (stat)=>{
                    if(stat){
                        result = {
                            status: 1,
                            err: null,
                            data: {
                                id: res.res[0].admin_id
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

const CreateAdmin = ({firstname, secondname, username, password, image}, callback)=>{
    let datenow = util.getDateNow();
    let encryptpass = util.passEncrypt(password);
    let result = {
        status: 0,
        err: "Username yang dimasukan sudah terdaftar"
    }
    connection.execute('SELECT admin_id FROM tbl_admin WHERE username = ?', [username], (res)=>{
        if(res.err){
            result = {
                status: -1,
                err: "Terjadi kesalahan pada server"
            }
            callback(result);
        }else{
            if(res.res.length > 0){
                callback(result);
            }else{
                connection.poolManipulate('INSERT INTO tbl_admin(firstname, lastname, username, password, picture, datecreate) VALUES(?, ?, ?, ?, ?, ?)', [firstname, secondname, username, encryptpass, image, datenow], (res)=> {
                    if(res.err){
                        result = {
                            status: -1,
                            err: "Terjadi kesalahan pada server"
                        }
                        callback(result);
                    }else{
                        if(res.res.affectedRows > 0){
                            result = {
                                status: 1,
                                err: null
                            }
                            callback(result);
                        }else{
                            result = {
                                status: 0,
                                err: "Terjadi, data tidak berhasil disimpan"
                            }
                            callback(result);
                        }
                    }
                });
            }
        }
    })
}

const UpdateAdmin = ({id, firstname, secondname, username}, callback)=>{
    let result = {
        status: 0,
        err: "Gagal untuk update"
    }
    connection.poolManipulate('UPDATE tbl_admin SET firstname = ?, lastname = ?, username = ? WHERE admin_id = ?', [firstname, secondname, username, id], (res)=>{
        if(res.err){
            result = {
                status: -1,
                err: "Terjadi kesalahan pada server"
            }
            callback(result);
        }else{
            if(res.res.affectedRows > 0){
                result = {
                    status: 0,
                    err: null
                }
                callback(result);
            }else{
                callback(result);
            }
        }
    });
}

const UpdateAdminImage = ({id, image}, callback)=>{
    let result = {
        status: 0,
        err: "Gagal untuk update photo"
    }
    connection.poolManipulate('UPDATE tbl_admin SET picture = ? WHERE admin_id = ?', [image, id], (res)=>{
        if(res.err){
            result = {
                status: -1,
                err: "Terjadi kesalahan pada server"
            }
            callback(result);
        }else{
            if(res.res.affectedRows > 0){
                result = {
                    status: 0,
                    err: null
                }
                callback(result);
            }else{
                callback(result);
            }
        }
    });
}

const UpdateAdminPass = ({id, lastpass, newpass}, callback)=>{
    let encryptlastpass = util.passEncrypt(lastpass);
    let encryptnewpass = util.passEncrypt(newpass);
    // 0 = error 1 = success
    let result = {
        status: 0, // error
        err: "password lama anda salah",
    }
    connection.poolSelect('SELECT admin_id FROM tbl_admin WHERE admin_id = ? and password = ?', [id, encryptlastpass], (res) => {
        if(res.err){
            result = {
                status: -1,
                err: "Terjadi kesalahan pada server"
            }
            callback(result);
        }else{
            if(res.res.length > 0){
                connection.execute('UPDATE tbl_admin SET password = ? WHERE id = ?', [encryptnewpass, id], (res)=>{
                    if(res.err){
                        result = {
                            status: -1,
                            err: res.err
                        }
                        callback(result);
                    }else{
                        result = {
                            status : 1,
                            err: null
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

const DeleteAdmin = ({id}, callback)=>{
    let result = {
        status: 0,
        err: "Gagal menghapus"
    }
    connection.poolManipulate('DELETE FROM tbl_admin WHERE admin_id = ?', [id], (res)=>{
        if(res.err){
            result = {
                status: -1,
                err: "Terjadi kesalahan pada server"
            }
            callback(result);
        }else{
            if(res.res.affectedRows > 0){
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

const AdminList = ({search, orderby, order, index, len}, callback)=>{
    if(search.trim().length > 0){
        let src = `%${search}%`;
        connection.poolSelect(`SELECT * FROM tbl_admin WHERE firstname LIKE ? OR lastname LIKE ? ORDER BY ${orderby} ${order} LIMIT  ${index},${len}`, [src, src], callback);
    }else{
        connection.poolSelect(`SELECT * FROM tbl_admin ORDER BY ${orderby} ${order} LIMIT ?,?`, [index, len], callback);
    }
}


function getAllRows(search, callback){
    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.poolSelect(`SELECT count(*) as countall FROM tbl_admin WHERE firstname LIKE ? OR lastname LIKE ? username LIKE ?`, [src, src, src], callback);
    }else{
        connection.poolSelect(`SELECT count(*) as countall FROM tbl_admin`, [], callback);
    }
}

const getAdmin = ({id}, callback)=>{
    connection.poolSelect(`SELECT * FROM tbl_admin WHERE admin_id = ?`, [id], callback);
}

module.exports = {
    Auth,
    CreateAdmin,
    UpdateAdmin,
    UpdateAdminImage,
    UpdateAdminPass,
    DeleteAdmin,
    AdminList,
    getAdmin,
    getAllRows
};