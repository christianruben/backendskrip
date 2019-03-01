const connection = require('../connection');
const util = require('../../util');

/**
 * @author kristian ruben sianturi
 * manage data in tbl_student
 */

function createStudent({nis, name, gender, religion, born_place, born_date, father_name, mother_name, address, phone_number, class_id}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, NIS yang dimasukan sudah terdaftar sebelumnya"
    }
    connection.execute(`SELECT * FROM tbl_student WHERE nis = ?`, [nis], (err, res, field)=>{
        if(err){
            result = {
                status: -1,
                err: "Terjadi kesalahan dalam server"
            }
            callback(result);
        }else{
            if(res.length > 0){
                callback(result);
            }else{
                let val = [nis, name, gender, religion, born_place, born_date, father_name, mother_name, address, phone_number, class_id, util.getDateNow()];
                connection.execute(`INSERT INTO tbl_student(NIS, name, gender, religion, born_place, born_date, father_name, mother_name, address, phone_number, class_id, datecreated)`, val, (err, res)=>{
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
                            result = {
                                status: 0,
                                err: "Terjadi kesalahan, Data tidak berhasil di simpan"
                            }
                            callback(result);
                        }
                    }
                });
            }
        }
    });
}

function updateClass({id, class_id}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, gagal memperbaharui"
    }
    connection.execute(`UPDATE tbl_student SET class_id = ? WHERE student_id = ?`, [class_id, id], (err, res)=>{
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

function updateStudent({id, name, gender, religion, born_place, born_date, father_name, mother_name, address, phone_number}, callback){
    let val = [name, gender, religion, born_place, born_date, father_name, mother_name, address, phone_number, id];
    let result = {
        status: 0,
        err: "Terjadi kesalahan, gagal memperbaharui"
    }
    connection.execute(`UPDATE tbl_student SET name = ?, gender = ?, religion = ?, born_place = ?, born_date = ?, father_name = ?, mother_name = ?, address = ?, phone_number = ? WHERE student_id = ?`, val, (err, res)=>{
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

function deleteStudent({id}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, gagal menghapus"
    }
    connection.execute(`DELETE FROM tbl_student WHERE student_id IN(?)`, [id], (err, res)=>{
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

function listStudent({search, orderby, order, index, len}, callback){
    if(search.trim().length > 0){
        let src = `%${search}%`;
        connection.execute(`SELECT * FROM tbl_student WHERE name LIKE N? OR religion LIKE N? OR born_place LIKE N? OR father_name LIKE N? OR mother_name LIKE N? OR address LIKE N? OR phone_number LIKE N? ORDER BY ${orderby} ${order} LIMIT ?,?`, [src,src,src,src,src,src,src,index,len], callback);
    }else{
        connection.execute(`SELECT * FROM tbl_student ORDER BY ${orderby} ${order} LIMIT ?,?`, [index, len], callback);
    }
}

function getStudent({id}, callback){
    connection.execute(`SELECT * FROM tbl_student WHERE student_id = ?`, [id], callback);
}

module.exports = {
    createStudent,
    updateClass,
    updateStudent,
    deleteStudent,
    listStudent,
    getStudent
};