const connection = require('../connection');
const util = require('../../util');

function createDepartment({department_name}, callback){
    let datenow = util.getDateNow();
    let result = {
        status: 0,
        err: "Terjadi kesalahan, jurusan tidak tersimpan"
    }
    connection.poolManipulate(`INSERT INTO tbl_department(department_name, datecreated) VALUES(?, ?)`, [department_name, datenow], (res)=>{
        if(res.err){
            result = {
                status: -1,
                err: "Terjadi Kesalahan pada server"
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

function updateDepartment({department_id, department_name}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, jurusan tidak terperbaharui"
    }
    connection.poolManipulate(`UPDATE tbl_department SET department_name = ? WHERE department_id = ?`, [department_name, department_id], (res)=>{
        if(res.err){
            result = {
                status: -1,
                err: "Terjadi Kesalahan pada server"
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

function deleteDepartment({id}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, gagal menghapus jurusan"
    }
    connection.poolManipulate(`DELETE FROM tbl_department WHERE department_id IN(?)`, [id], (res)=>{
        if(res.err){
            result = {
                status: -1,
                err: "Terjadi kesalahan pada sistem"
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

function getAllList(callback){
    connection.poolSelect(`SELECT * FROM tbl_department ORDER BY department_id ASC`, [], callback);
}

function listLightDepartment({search}, callback){
    let src = `%${search.trim()}%`;
    connection.poolSelect(`SELECT department_id, department_name FROM tbl_department WHERE department_name COLLATE utf8_general_ci LIKE ? ORDER BY department_id ASC`,[src], callback);
}

function departmentList({search, orderby, order, index, len}, callback){
    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.poolSelect(`SELECT * FROM tbl_department WHERE department_name COLLATE utf8_general_ci LIKE ? ORDER BY ${orderby} ${order} LIMIT ${index},${len}`, [src], callback);
    }else{
        connection.poolSelect(`SELECT * FROM tbl_department ORDER BY ${orderby} ${order} LIMIT ${index},${len}`, [], callback);
    }
}

function getAllRows(search, callback){
    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.poolSelect(`SELECT count(*) as countall FROM tbl_department WHERE department_name COLLATE utf8_general_ci LIKE ? `, [src], callback);
    }else{
        connection.poolSelect(`SELECT count(*) as countall FROM tbl_department`, [], callback);
    }
}

module.exports = {
    createDepartment,
    updateDepartment,
    deleteDepartment,
    listLightDepartment,
    departmentList,
    getAllList,
    getAllRows
}