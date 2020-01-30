const connection = require('../connection');
const util = require('../../util');

function createDays({day_name}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, hari tidak tersimpan"
    }
    connection.poolManipulate(`INSERT INTO tbl_day(day_name) VALUES(?)`, [day_name], (res)=>{
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

function updateDays({days_id, day_name}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, hari tidak tersimpan"
    }
    connection.poolManipulate(`UPDATE tbl_day SET day_name = ? WHERE day_id = ?`, [day_name, days_id], (res)=>{
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

function deleteDays({id}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, gagal menghapus hari"
    }
    connection.poolManipulate(`DELETE FROM tbl_day WHERE day_id IN(?)`, [id], (res)=>{
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

function DaysList({search, orderby, order, index, len}, callback){
    if(search.trim().length > 0){
        let src = `%${search}%`;
    }else{
        
    }    
}

module.exports = {
    createDays,
    updateDays,
    deleteDays,
    DaysList
}