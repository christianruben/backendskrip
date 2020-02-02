const connection = require('../connection');
const util = require('../../util');

function createSemester({semester_name}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, tidak berhasil menyimpan"
    }
    connection.poolManipulate(`INSERT INTO tbl_semester(semester_id, semester_name, datecreated) VALUES(?, ?, ?)` [semester_name, util.getDateNow()], (res)=>{
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

function deleteSemester({id}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, tidak berhasil menyimpan"
    }
    connection.poolManipulate(`DELETE FROM tbl_semester WHERE semester_id = ?`, [id], (res)=>{
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

function listLightSemester({search}, callback){
    let src = `%${search.trim()}%`;
    connection.poolSelect(`SELECT semester_id, semester_name FROM tbl_semester WHERE semester_name COLLATE utf8_general_ci LIKE ? ORDER BY semester_id ASC`,[src], callback);
}

function getAllList(callback){
    connection.poolSelect(`SELECT * FROM tbl_semester ORDER BY semester_id ASC`, [], callback);
}

function semesterList({search, orderby, order, index, len}, callback){
    if(search.trim().length > 0){
        connection.poolSelect(`SELECT * FROM tbl_semester WHERE semester_name LIKE ? ORDER BY ${orderby} ${order} LIMIT ${index},${len}`, [search.trim()], callback);
    }else{
        connection.poolSelect(`SELECT * FROM tbl_semester ORDER BY ${orderby} ${order} LIMIT ${index},${len}`, [], callback);
    }
}

function getAllRows(search, callback){
    if(search.trim().length > 0){
        connection.poolSelect(`SELECT count(*) as rowcount FROM tbl_semester WHERE semester_name LIKE ? `, [search.trim()], callback);
    }else{
        connection.poolSelect(`SELECT count(*) as rowcount FROM tbl_semester`, [], callback);
    }
}

function updateSemester({id, semester_name}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, tidak berhasil memperbaharui"
    }
    connection.poolManipulate(`UPDATE tbl_semester SET semester_name = ? WHERE semester_id = ?`, [semester_name, id], (res)=>{
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
    })
}

module.exports = {
    createSemester,
    deleteSemester,
    updateSemester,
    semesterList,
    getAllList,
    getAllRows,
    listLightSemester
}