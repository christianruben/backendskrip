const connection = require('../connection');
const util = require('../../util');

export default class {
    createNews({title, content, creator, shared, status, isPinned, tag}, callback){
        connection.query(`INSERT INTO ${table}(title, content, creator, shared, status, isPinned, tag, datecreated) VALUES(?,?,?,?,?,?,?,?)`, [title, content, creator, shared, status, isPinned, tag, util.getDateNow()], (err, results)=>{
            if(err){
                console.error(err);
                throw err;
            }
            callback(true);
        });
    }

    updateNews({id, title, content, creator, shared, tag}, callback){
        connection.query(`UPDATE ${table} SET title = ?, content = ?, creatorupdate = ?, shared = ?, tag = ?, dateupdated = ? WHERE id = ?`,[title, content, creator, shared, tag, util.getDateNow(), id], (err, results)=>{
            if(err){
                console.error(err);
                throw err;
            }
            callback(true);
        });
    }

    changeNewsStatus({id, status}, callback){
        connection.query(`UPDATE ${table} SET status = ? dateupdated = ? WHERE id = ?`, [status, util.getDateNow(), id], (err, results)=>{
            if(err){
                console.error(err);
                throw err;
            }
            callback(true);
        });
    }

    switchNewsPinned({id, isPinned}, callback){
        connection.query(`UPDATE ${table} SET isPinned = ? dateupdated = ? WHERE id = ?`, [isPinned, util.getDateNow(), id], (err, results)=>{
            if(err){
                console.error(err);
                throw err;
            }
            callback(true);
        });
    }

    deleteNews({id}, callback){
        connection.query(`DELETE FROM ${table} WHERE id IN(?)`, [id], (err, results)=>{
            if(err){
                console.error(err);
                throw err;
            }
            callback(true);
        });
    }

    newsList({search, orderby, order, index, rows}, callback){
        connection.query(`SELECT * FROM ${table} WHERE title LIKE ? OR content LIKE ? ORDER BY ${orderby} ${order} LIMIT ${index}, ${rows}`, [`%${search}%`,`%${search}%`], (err, results, fields)=>{
            if(err){
                console.error(err);
                throw err;
            }
            callback(results, fields);
        });
    }

    newListByTag({tag, search, orderby, index, order, rows}, callback){
        connection.query(`SELECT * FROM ${table} WHERE title LIKE ? OR content LIKE ? AND tag LIKE ? ORDER BY ${orderby} ${order} LIMIT ${index}, ${rows}`, [`%${search}%`,`%${search}%`, `%${tag}%`], (err, results, fields)=>{
            if(err){
                console.error(err);
                throw err;
            }
            callback(results, fields);
        });
    }
}