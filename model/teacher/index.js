const connection = require('../connection');
const util = require('../../util');

function createTeacher({nip, name, gender, religion, born_place, born_date, address, phone_number, relationship}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, tidak berhasil menyimpan"
    }
    connection.execute(`SELECT * FROM tbl_teacher WHERE NIP = ?`, [nip], (err, res, field)=>{
        if(err){
            result = {
                status: -1,
                err: "Terjadi kesalahan dalam server"
            }
            callback(result);
        }else{
            if(res.length > 0){
                result = {
                    status: 0,
                    err: "NIP telah terdaftar"
                }
                callback(result);
            }else{
                let val = [nip, name, gender, religion, born_place, born_date, address, phone_number, relationship, util.getDateNow()];
                connection.execute(`INSERT INTO tbl_teacher(NIP, name, gender, religion, born_place, born_date, address, phone_number, relationship, datecreated) VALUES(?,?,?,?,?,?,?,?,?,?)`,val, (err, res)=>{
                    if(err){
                        result = {
                            status: -1,
                            err: "Terjadi kesalahan dalam server"
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
                })
            }
        }
    });
}

function updateTeacher({id, nip, name, religion, born_place, born_date, address, phone_number, relationship}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, tidak berhasil menyimpan"
    }
    connection.execute(`SELECT * FROM tbl_teacher WHERE NIP = ?`, [nip], (err, res, field)=>{
        if(err){
            result = {
                status: -1,
                err: "Terjadi kesalahan dalam server"
            }
            callback(result);
        }else{
            if(res.length > 0){
                result = {
                    status: 0,
                    err: "NIP telah terdaftar"
                }
                callback(result);
            }else{
                let val = [nip, name, gender, religion, born_place, born_date, address, phone_number, relationship, id];
                connection.execute(`UPDATE tbl_teacher SET NIP = ?, name = ?, religion = ?, born_place = ?, born_date = ?, address = ?, phonenumber = ?, relationship = ? WHERE teacher_id = ?`,val, (err, res)=>{
                    if(err){
                        result = {
                            status: -1,
                            err: "Terjadi kesalahan dalam server"
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
                })
            }
        }
    });
}

function deleteTeacher({id}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, gagal menghapus"
    }
    connection.execute(`DELETE FROM tbl_teacher WHERE teacher_id IN(?)`, [id], (err, res)=>{
        if(err){
            result = {
                status: -1,
                err: "Terjadi kesalahan dalam server"
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

function listTeacher({search, orderby, order, index, len}, callback){
    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.execute(`SELECT * FROM tbl_teacher WHERE NIP LIKE N? OR name LIKE N? OR born_place LIKE N? OR address LIKE N? OR phone_number LIKE N? ORDER BY ${orderby} ${order} LIMIT ?,?`,[src, src, src, src, src, index, len], callback);
    }else{
        connection.execute(`SELECT * FROM tbl_teacher ORDER BY ${orderby} ${order} LIMIT ?,?`, [index, len], callback);
    }
}


module.exports = {
    createTeacher,
    updateTeacher,
    deleteTeacher,
    listTeacher
};