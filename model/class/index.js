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
    connection.execute(`SELECT * FROM tbl_class WHERE class_name = ?`, [class_name], (err, res, field)=>{
        if(err){
            result = {
                status: -1,
                err: "Terjadi Kesalahan pada server"
            }
            callback(result);
        }else{
            if(res.length > 0){
                callback(result);
            }else{
                connection.execute(`INSERT INTO tbl_class(class_name, department_id, datecreated) VALUES(?,?,?)`, [class_name, department, util.getDateNow()], (err, res)=>{
                    if(err){
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
    connection.execute(`DELETE FROM tbl_class WHERE class_id IN(?)`, [id], (err, res)=>{
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

function loadAll(callback){
    connection.execute(`SELECT class_name, class_id, department_id FROM tbl_class ORDER BY class_id ASC`, [], callback);
}

function listClass({search, orderby, order, index, len}, callback){
    if(search.trim().length > 0){
        let src = `%${search}%`;
        connection.execute(`SELECT class_name, class_id, department_id FROM tbl_class WHERE class_name LIKE ? ORDER BY ${orderby} ${order} LIMIT ${inde},${len}`, [src], callback);
    }else{
        connection.execute(`SELECT class_name, class_id, department_id FROM tbl_class ORDER BY ${orderby} ${order} LIMIT ?,?`, [index, len], callback);
    }
}


function getAllRows(search, callback){
    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.execute(`SELECT count(*) as countall FROM tbl_class WHERE class_name LIKE ?`, [src], callback);
    }else{
        connection.execute(`SELECT count(*) as countall FROM tbl_class`, [], callback);
    }
}


module.exports = {
    createClass,
    deleteClass,
    listClass,
    loadAll,
    getAllRows
};