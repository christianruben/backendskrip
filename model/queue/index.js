const connection = require('../connection');
const util = require('../../util');
const jwt = require('jsonwebtoken');

let secret = "qwerty12345";

/**
 * @author kristian ruben sianturi
 * insert data to tbl_queue
 * queue_id is using for link report
 * if queue_id is not in tbl_queue link is not found
 * if queue_id is expired link will display page is expired
 * if queue_id is available link will show report
 */

function setQueueId(type, callback){
    let result = {
        status: 0,
        q: null
    }
    let queue_id = jwt.sign({type: type}, secret, {expiresIn:15*60})
    connection.execute(`INSERT INTO tbl_queue(queue_id, datecreated) VALUES(?,?)`, [queue_id, util.getDateNow()], (err, res)=>{
        if(err){
            result = {
                status: -1,
                q: null
            }
            callback(result);
        }else{
            if(res.affectedRows > 0){
                result = {
                    status: 1,
                    q: queue_id
                }
                callback(result);
            }else{
                callback(result);
            }
        }
    });
}

function isQueueAvailable(queue_id, callback){
    let result = {
        status: 0,
        msg: "Halaman tidak ditemukan"
    }
    connection.execute(`SELECT * FROM tbl_queue WHERE queue_id = ?`, [queue_id], (err, res, field)=>{
        if(err){
            result = {
                status: -1,
                msg: "Terjadi kesalahan dalam server"
            }
            callback(result);
        }else{
            if(res.length > 0){
                jwt.verify(queue_id, secret, (err, decoded)=>{
                    if(err){
                        result = {
                            status: -1,
                            msg: "Halaman yang diminta telah kadarluasa atau link tidak sesuai"
                        }
                        connection.execute(`DELETE FROM tbl_queue WHERE queue_id = ?`, [queue_id], (err, res)=>{
                            if(err){
                                callback(result);
                            }else{
                                if(res.affectedRows > 0){
                                    result = {
                                        status: 0,
                                        msg: "Halaman ini telah kadarluasa"
                                    }
                                    callback(result);
                                }else{
                                    callback(result);
                                }
                            }
                        });
                    }else{
                        result = {
                            status: 1,
                            msg: null
                        }
                        callback(result);
                    }
                });
            }else{
                callback(result);
            }
        }
    });
}

module.exports = {
    setQueueId,
    isQueueAvailable
}