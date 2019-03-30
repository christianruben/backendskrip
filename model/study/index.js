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
    connection.poolSelect(`SELECT * FROM tbl_study WHERE study_code = ?`, [study_code], (res)=>{
        if(res.err){
            result = {
                status: -1,
                err: "Terjadi kesalahan dalam server"
            }
            callback(result);
        }else{
            if(res.res.length > 0){
                result = {
                    status: 0,
                    err: "kode pelajaran sudah terdaftar"
                }
                callback(result);
            }else{
                connection.poolManipulate(`INSERT INTO tbl_study(study_name, study_code, datecreated) VALUES(?,?,?)`, [study_name, study_code, util.getDateNow()], (res)=>{
                    if(res.err){
                        result = {
                            status: -1,
                            err: "Terjadi kesalahan dalam server"
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
        }
    });
}

function updateStudy({study_name, study_code, id}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, gagal memperbaharui"
    }
    connection.poolSelect(`SELECT * FROM tbl_study WHERE study_code = ?`, [study_code], (res)=>{
        if(res.err){
            result = {
                status: -1,
                err: "Terjadi kesalahan dalam server"
            }
            callback(result);
        }else{
            if(res.res.length < 0){
                result = {
                    status: 0,
                    err: "kode pelajaran belum terdaftar"
                }
                callback(result);
            }else{
                connection.poolManipulate(`UPDATE tbl_study SET study_name = ?, study_code = ? WHERE study_id = ?`, [study_name, study_code, id], (res)=>{
                    if(res.err){
                        result = {
                            status: -1,
                            err: "Terjadi kesalahan dalam server"
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
        }
    });
}

function deleteStudy({id}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, gagal menghapus"
    }
    connection.poolManipulate(`DELETE FROM tbl_study WHERE study_id IN(?)`, [id], (res)=>{
        if(res.err){
            result = {
                status: -1,
                err: "Terjadi kesalahan dalam server"
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

function listLightStudy({search}, callback){
    let src = `%${search.trim()}%`;
    connection.poolSelect(`SELECT study_name, study_id FROM tbl_study WHERE study_name LIKE ? ORDER BY study_id ASC`,[src], callback);
}

function listStudy({search, orderby, order, index, len}, callback){
    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.poolSelect(`SELECT * FROM tbl_study WHERE study_name LIKE ? OR study_code LIKE ? ORDER BY ${orderby} ${order} LIMIT ${index},${len}`, [src, src], callback);
    }else{
        connection.poolSelect(`SELECT * FROM tbl_study ORDER BY ${orderby} ${order} LIMIT ${index},${len}`, [], callback);
    }
}


function getAllRows(search, callback){
    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.poolSelect(`SELECT count(*) as countall FROM tbl_study WHERE study_name LIKE ? OR study_code LIKE ?`, [src, src], callback);
    }else{
        connection.poolSelect(`SELECT count(*) as countall FROM tbl_study`, [], callback);
    }
}

function getStudy({id}, callback){
    connection.poolSelect(`SELECT * FROM tbl_study WHERE study_id = ?`, [id], callback);
}

module.exports = {
    createStudy,
    updateStudy,
    deleteStudy,
    listStudy,
    getStudy,
    getAllRows,
    listLightStudy
};