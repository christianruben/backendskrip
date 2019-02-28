const connection = require('../connection');
const util = require('../../util');

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

function listClass({search, orderby, order, index, len}, callback){
    if(search.trim().length > 0){
        let src = `%${search}%`;
        connection.execute(`SELECT * FROM tbl_class WHERE class_name LIKE N? ORDER BY ${orderby} ${order} LIMIT ?,?`, [src, index, len], callback);
    }else{
        connection.execute(`SELECT * FROM tbl_class ORDER BY ${orderby} ${order} LIMIT ?,?`, [index, len], callback);
    }
}


module.exports = {
    createClass,
    deleteClass,
    listClass
};