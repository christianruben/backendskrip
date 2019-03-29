const connection = require('../connection');
const util = require('../../util');

/**
 * @author kristian ruben sianturi
 * manage data in tbl_teacher
 */
const selectField = `tt.teacher_id, tt.NIP, tt.name, tt.gender, tt.religion, tt.born_place, tt.born_date, tt.address, tt.address, tt.phone_number, tt.relationship`;

function createTeacher({nip, name, gender, religion, born_place, born_date, address, phone_number, relationship}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, tidak berhasil menyimpan"
    }
    connection.execute(`SELECT count(*) as countrow FROM tbl_teacher WHERE NIP = ${nip}`, [nip], (err, resnow, field)=>{
        if(err){
            result = {
                status: -1,
                err: "Terjadi kesalahan dalam server"
            }
            callback(result);
        }else{
            if(resnow[0].countrow > 0){
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
                                err: null,
                                userid: res.insertId
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

function updateTeacher({id, nip, name, gender, religion, born_place, born_date, address, phone_number, relationship}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, tidak berhasil memperbaharui"
    }
    connection.execute(`SELECT * FROM tbl_teacher WHERE teacher_id = ?`, [id], (err, res, field)=>{
        if(err){
            result = {
                status: -1,
                err: "Terjadi kesalahan dalam server"
            }
            callback(result);
        }else{
            if(res.length <= 0){
                result = {
                    status: 0,
                    err: "Update gagal, data tidak ditemukan"
                }
                callback(result);
            }else{
                let val = [nip, name, gender, religion, born_place, born_date, address, phone_number, relationship, id];
                connection.execute(`UPDATE tbl_teacher SET NIP = ?, name = ?, gender = ?, religion = ?, born_place = ?, born_date = ?, address = ?, phone_number = ?, relationship = ? WHERE teacher_id = ?`,val, (err, res)=>{
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

function listLightTeacher({search}, callback){
    let src = `%${search.trim()}%`;
    connection.execute(`SELECT name, teacher_id, NIP FROM tbl_teacher WHERE NIP LIKE ? ORDER BY NIP ASC`,[src], callback);
}

function listTeacher({search, orderby, order, index, len}, callback){
    if(search.length > 0){
        let src = `%${search.trim()}%`;
        connection.execute(`SELECT ${selectField}, tu.picture, DATE_FORMAT(born_date, "%Y-%m-%d") as dateborn FROM tbl_teacher as tt INNER JOIN tbl_user as tu ON tt.teacher_id = tu.owner_id WHERE NIP LIKE ? OR name LIKE ? OR born_place LIKE ? OR address LIKE ? OR phone_number LIKE ? ORDER BY ${orderby} ${order} LIMIT ${index},${len}`,[src, src, src, src, src], callback);
    }else{
        connection.execute(`SELECT ${selectField}, tu.picture, DATE_FORMAT(born_date, "%Y-%m-%d") as dateborn FROM tbl_teacher as tt INNER JOIN tbl_user as tu ON tt.teacher_id = tu.owner_id ORDER BY ${orderby} ${order} LIMIT  ${index},${len}`, [], callback);
    }
}

function getAllRows(search, callback){
    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.execute(`SELECT count(*) as countall FROM tbl_teacher WHERE NIP LIKE ? OR name LIKE ? OR born_place LIKE ? OR address LIKE ? OR phone_number LIKE ?`, [src, src, src, src, src], callback);
    }else{
        connection.execute(`SELECT count(*) as countall FROM tbl_teacher`, [], callback);
    }
}


module.exports = {
    createTeacher,
    updateTeacher,
    deleteTeacher,
    listTeacher,
    getAllRows,
    listLightTeacher
};