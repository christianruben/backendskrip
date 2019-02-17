const connection = require('../connection');
const util = require('../../util');

class Student{
    InsertStudent({firstname, secondname, born, bornplace, fathername, mothername, address, photo}, callback){
        connection.query(`INSERT INTO ${table}() VALUES(?,?,?,?,?,?,?,?,?)`, [firstname, secondname, born, bornplace, fathername, mothername, address, photo, util.getDateNow()], (err, results)=>{
            if(err){
                console.error(err);
                throw err;
            }
            callback(true);
        });
    }

    UpdateStudent({id, firstname, secondname, born, bornplace, fathername, mothername, address}, callback){
        connection.query(`UPDATE ${table} SET firstname = ?, secondname = ?, born = ?, bornplace = ?, fathername = ?, mothername = ?, address = ?, dateupdate = ? WHERE id = ?`, [firstname, secondname, born, bornplace, fathername, mothername, address, util.getDateNow(), id], (err, results)=>{
            if(err){
                console.error(err);
                throw err;
            }
            callback(results.affectedRows);
        });
    }

    UpdateStudentPhoto({id, photo}, callback){
        connection.query(`UPDATE ${table} SET picture = ?, dateupdate = ? WHERE id = ?`, [photo, util.getDateNow(), id], (err, results)=>{
            if(err){
                console.error(err);
                throw err;
            }
            callback(results.affectedRows);
        });
    }

    DeleteStudent({id}, callback){
        connection.query(`DELETE FROM ${table} WHERE id IN(?)`, [id], (err, results)=>{
            if(err){
                console.error(err);
                throw err;
            }
            callback(results.affectedRows);
        });
    }
    
    StudentList({search, sortby, sort, index, rows}, callback){
        if(search.trim().length > 0){
            connection.query(`SELECT * FROM ${table} WHERE firstname = ? OR secondname = ? OR born = ? OR bornplace = ? OR fathername = ? OR mothername = ? OR address = ? ORDER BY ${sortby} ${sort} LIMIT ${index},${rows}`, [search,search,search,search,search,search,search], (err, results, fields)=>{
                if(err){
                    console.error(err);
                    throw err;
                }
                callback(results, fields);
            });
        }else{
            connection.query(`SELECT * FROM ${table}ORDER BY ${sortby} ${sort} LIMIT ${index},${rows}`, (err, results, fields)=>{
                if(err){
                    console.error(err);
                    throw err;
                }
                callback(results, fields);
            });
        }
    }
}

module.exports = Student;