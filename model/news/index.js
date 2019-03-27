const connection = require('../connection');
const util = require('../../util');

/**
 * @author kristian ruben sianturi
 * manage data in tbl_news
 */

function createNews({title, content, writer}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, berita tidak tersimpan"
    }
    connection.execute(`INSERT INTO tbl_news(title, content, writer, datecreated) VALUES(?, ?, ?, ?)`, [title, content, writer, util.getDateNow()], (err, res)=>{
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
                callback(result);
            }
        }
    });
}

function updateNews({id,title, content}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, berita tidak tersimpan"
    }
    connection.execute(`UPDATE tbl_news SET title = ?, content = ?, dateupdated = ? WHERE news_id = ?`, [title, content, util.getDateNow(), id], (err, res)=>{
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
                callback(result);
            }
        }
    });
}

function listNews({search, orderby, order, index, len}, callback){
    if(search.trim().length > 0){
        let src = `%${search}%`;
        connection.execute(`SELECT * FROM tbl_news WHERE title LIKE ? OR content LIKE ? ORDER BY ${orderby} ${order} LIMIT ${index},${len}`, [src, src],callback);
    }else{
        connection.execute(`SELECT * FROM tbl_news ORDER BY ${orderby} ${order} LIMIT ?,?`, [index, len], callback);
    }
}


function getAllRows(search, callback){
    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.execute(`SELECT count(*) as countall FROM tbl_news WHERE title LIKE ? OR content LIKE ?`, [src, src], callback);
    }else{
        connection.execute(`SELECT count(*) as countall FROM tbl_news`, [], callback);
    }
}

function getNews({id}, callback){
    connection.execute(`SELECT * FROM tbl_news WHERE news_id = ?`, [id], callback);
}

function deleteNews({id}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, gagal menghapus berita"
    }
    connection.execute(`DELETE FROM tbl_news WHERE news_id IN(?)`, [id], (err, res)=>{
        if(err){
            result = {
                status: -1,
                err: "Terjadi kesalahan pada sistem"
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

module.exports = {
    listNews,
    createNews,
    updateNews,
    getNews,
    deleteNews
};