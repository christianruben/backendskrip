const connection = require('../connection');
const util = require('../../util');

const Auth = (username, password, callback)=>{
    let result = {
        status: 0,
        err: "akun tidak dapat di temukan"
    }
    connection.execute('SELECT * FROM tbl_admin WHERE username = ?', [username], (err, res, field)=>{
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
                                id: res[0].admin_id
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
    connection.execute('SELECT admin_id FROM tbl_admin WHERE username = ?', [username], (err, res, field)=>{
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
                connection.execute('INSERT INTO tbl_admin(firstname, lastname, username, password, picture, datecreate) VALUES(?, ?, ?, ?, ?, ?)', [firstname, secondname, username, encryptpass, image, datenow], (err, res)=> {
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
    connection.execute('UPDATE tbl_admin SET firstname = ?, lastname = ?, username = ? WHERE admin_id = ?', [firstname, secondname, username, id], (err, res)=>{
        if(err){
            result = {
                status: -1,
                err: "Terjadi kesalahan pada server"
            }
            callback(result);
        }else{
            if(res.affectedRows > 0){
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
    connection.execute('UPDATE tbl_admin SET picture = ? WHERE admin_id = ?', [image, id], (err, res)=>{
        if(err){
            result = {
                status: -1,
                err: "Terjadi kesalahan pada server"
            }
            callback(result);
        }else{
            if(res.affectedRows > 0){
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
    connection.execute('SELECT admin_id FROM tbl_admin WHERE admin_id = ? and password = ?', [id, encryptlastpass], (err, res, field) => {
        if(err){
            result = {
                status: -1,
                err: "Terjadi kesalahan pada server"
            }
            callback(result);
        }else{
            if(res.length > 0){
                connection.execute('UPDATE tbl_admin SET password = ? WHERE id = ?', [encryptnewpass, id], (err, res)=>{
                    if(err){
                        result = {
                            status: -1,
                            err: err
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
    connection.execute('DELETE FROM tbl_admin WHERE admin_id = ?', [id], (err, res)=>{
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

const AdminList = ({search, orderby, order, index, len}, callback)=>{
    if(search.trim().length > 0){
        let src = `%${search}%`;
        connection.execute(`SELECT * FROM tbl_admin WHERE firstname LIKE N? OR lastname LIKE N? ORDER BY ${orderby} ${order} LIMIT ?,?`, [src, src, index, len], callback);
    }else{
        connection.execute(`SELECT * FROM tbl_admin ORDER BY ${orderby} ${order} LIMIT ?,?`, [index, len], callback);
    }
}

module.exports = {
    Auth,
    CreateAdmin,
    UpdateAdmin,
    UpdateAdminImage,
    UpdateAdminPass,
    DeleteAdmin,
    AdminList
};