const connection = require('../connection');
const util = require('../../util');

/**
 * @author kristian ruben sianturi
 * manage data in tbl_class
 */

function createClass({class_name, department}, callback){
    let result = {
        status : 0,
        err: "Nama Kelas sudah ada dalam database"
    }
    connection.poolSelect(`SELECT * FROM tbl_class WHERE class_name = ?`, [class_name], (res)=>{
        if(err){
            result = {
                status: -1,
                err: "Terjadi Kesalahan pada server"
            }
            callback(result);
        }else{
            if(res.res.length > 0){
                callback(result);
            }else{
                connection.poolManipulate(`INSERT INTO tbl_class(class_name, department_id, datecreated) VALUES(?,?,?)`, [class_name, department, util.getDateNow()], (res)=>{
                    if(res.err){
                        result = {
                            status: -1,
                            err: "Terjadi Kesalahan pada server"
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
                                err: "Terjadi kesalahan, gagal menyimpan data"
                            }
                            callback(result);
                        }
                    }
                });
            }
        }
    });
}

function deleteClass({id}, callback){
    let result = {
        status: 0,
        err: "Gagal menghapus"
    }
    connection.poolManipulate(`DELETE FROM tbl_class WHERE class_id IN(?)`, [id], (res)=>{
        if(res.err){
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

function loadAll(callback){
    connection.poolSelect(`SELECT class_name, class_id, department_id FROM tbl_class ORDER BY class_id ASC`, [], callback);
}

function listClass({search, orderby, order, index, len}, callback){
    if(search.trim().length > 0){
        let src = `%${search}%`;
        connection.poolSelect(`SELECT class_name, class_id, department_id FROM tbl_class WHERE class_name LIKE ? ORDER BY ${orderby} ${order} LIMIT ${inde},${len}`, [src], callback);
    }else{
        connection.poolSelect(`SELECT class_name, class_id, department_id FROM tbl_class ORDER BY ${orderby} ${order} LIMIT ?,?`, [index, len], callback);
    }
}


function getAllRows(search, callback){
    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.poolSelect(`SELECT count(*) as countall FROM tbl_class WHERE class_name LIKE ?`, [src], callback);
    }else{
        connection.poolSelect(`SELECT count(*) as countall FROM tbl_class`, [], callback);
    }
}


module.exports = {
    createClass,
    deleteClass,
    listClass,
    loadAll,
    getAllRows
};