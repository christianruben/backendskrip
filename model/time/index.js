const connection = require('../connection');

function createTime({time_name, time_start, time_end}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, tidak berhasil menyimpan"
    }
    connection.execute(`INSERT INTO(time_name, time_start, time_end) VALUES(?, ?, ?)` [time_name, time_start, time_end], (err, res)=>{
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

function deleteTime({id}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, tidak berhasil menyimpan"
    }
    connection.execute(`DELETE FROM tbl_time WHERE time_id = ?`, [id], (err, res)=>{
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

function listTime({search, orderby, order, index, len}, callback){
    if(search.trim().length > 0){
        connection.execute(`SELECT * FROM tbl_time WHERE time_name LIKE ? ORDER BY ${orderby} ${order} LIMIT ?,?`, [search.trim(), index, len], callback);
    }else{
        connection.execute(`SELECT * FROM tbl_time LIMIT ?,?`, [index, len], callback);
    }
}

function updateTime({id, time_name, time_start, time_end}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, tidak berhasil memperbaharui"
    }
    connection.execute(`UPDATE tbl_time SET time_name = ?, time_start = ?, time_end = ? WHERE time_id = ?`, [time_name, time_start, time_end, id], (err, res)=>{
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

module.exports = {
    createTime,
    deleteTime,
    listTime,
    updateTime
}