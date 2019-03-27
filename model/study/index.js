const connection = require('../connection');
const util = require('../../util');

/**
 * @author kristian ruben sianturi
 * manage data in tbl_study
 */

function createStudy({study_name, study_code}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, gagal menyimpan"
    }
    connection.execute(`SELECT * FROM tbl_study WHERE study_code = ?`, [study_code], (err, res, field)=>{
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
                    err: "kode pelajaran sudah terdaftar"
                }
                callback(result);
            }else{
                connection.execute(`INSERT INTO tbl_study(study_name, study_code, datecreated) VALUES(?,?,?)`, [study_name, study_code, util.getDateNow()], (err, res)=>{
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
        }
    });
}

function updateStudy({study_name, study_code, id}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, gagal memperbaharui"
    }
    connection.execute(`SELECT * FROM tbl_study WHERE study_code = ?`, [study_code], (err, res, field)=>{
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
                    err: "kode pelajaran sudah terdaftar"
                }
                callback(result);
            }else{
                connection.execute(`UPDATE tbl_study SET study_name = ?, study_code = ? WHERE study_id = ?`, [study_name, study_code, id], (err, res)=>{
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
        }
    });
}

function deleteStudy({id}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, gagal menghapus"
    }
    connection.execute(`DELETE FROM tbl_study WHERE study_id IN(?)`, [id], (err, res)=>{
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

function listStudy({search, orderby, order, index, len}, callback){
    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.execute(`SELECT * FROM tbl_study WHERE study_name LIKE ? OR study_code LIKE ? ORDER BY ${orderby} ${order} LIMIT ${index},${len}`, [src, src], callback);
    }else{
        connection.execute(`SELECT * FROM tbl_study ORDER BY ${orderby} ${order} LIMIT ?,?`, [index, len], callback);
    }
}


function getAllRows(search, callback){
    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.execute(`SELECT count(*) as countall FROM study_name LIKE ? OR study_code LIKE ?`, [src, src], callback);
    }else{
        connection.execute(`SELECT count(*) as countall FROM tbl_student`, [], callback);
    }
}

function getStudy({id}, callback){
    connection.execute(`SELECT * FROM tbl_study WHERE study_id = ?`, [id], callback);
}

module.exports = {
    createStudy,
    updateStudy,
    deleteStudy,
    listStudy,
    getStudy
};