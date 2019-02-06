const connection = require('../connection');
const util = require('../../util');

export default class{
    createTeacher({firstname, lastname, email, phonenumber, address, dateborn, placeborn, picture, status}, callback){
        connection.query(`INSERT INTO ${table}() VALUES(?,?,?,?,?,?,?,?,?,?)`, [firstname, lastname, email, phonenumber, address, dateborn, placeborn, picture, status, util.getDateNow()], (err, results)=>{
            if(err){
                console.error(err);
                throw err;
            }
            callback(true);
        });
    }

    updateTeacher({id, firstname, lastname, email, phonenumber, address, dateborn, placeborn, status}, callback){
        connection.query(`UPDATE ${table} SET firstname = ?, lastname = ?, email = ?, phonenumber = ?, address = ?, dateborn = ?, placeborn = ?, status = ?, dateupdate = ? WHERE id = ?`, [firstname, lastname, email, phonenumber, address, dateborn, placeborn, status, util.getDateNow(), id], (err, results)=>{
            if(err){
                console.error(err);
                throw err;
            }
            callback(results.affectedRows);
        });
    }

    updateTeacherPicture({id, picture}, callback){
        connection.query(`UPDATE ${table} SET picture = ? dateupdate = ? WHERE id = ?`, [picture, util.getDateNow(), id], (err, results)=>{
            if(err){
                console.error(err);
                throw err;
            }
            callback(results.affectedRows);
        });
    }

    deleteTeacher({id}, callback){
        connection.query(`DELETE FROM ${table} WHERE id IN(?)`, id, (err, results)=>{
            if(err){
                console.error(err);
                throw err;
            }
            callback(results.affectedRows);
        });
    }

    teacherList({search, orderby, order, index, rows}, callback){
        if(search.trim().length > 0){
            connection.query(`SELECT * FROM ${table} WHERE firstname = ? OR lastname = ? OR address = ? OR phonenumber = ? OR placeborn = ? OR dateborn = ? OR email = ? ORDER BY ${orderby} ${order} LIMIT ${index},${rows}`, [search, search, search, search, search, search, search], (err, results, fields)=>{
                if(err){
                    console.error(err);
                    throw err;
                }
                callback(results, fields);
            });
        }else{
            connection.query(`SELECT * FROM ${table} ORDER BY ${orderby} ${order} LIMIT ${index},${rows}`, (err, results, fields)=>{
                if(err){
                    console.error(err);
                    throw err;
                }
                callback(results, fields);
            });
        }
    }
}