const connection = require('../connection');
const util = require('../../util');

/**
 * @author Kristian Ruben Sianturi
 * manage data in tbl_room
 */

 function createRoom({name}, callback){
     let result = {
         status: 0,
         err: "Terjadi kesalahan, gagal menyimpan"
     }

     connection.poolManipulate(`INSERT INTO tbl_room(name, datecreated) VALUES(?,?)`, [name, util.getDateNow()], (res)=>{
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

 function updateRoom({id, name}, callback){
     let result = {
         status: 0,
         err: "Terjadi kesalahan, gagal memperbaharui"
     }
     connection.poolManipulate(`PDATE tbl_room SET name = ? WHERE room_id = ?`, [name, id], (res)=>{
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

 function deleteRoom({id}, callback){
     let result = {
         status: 0,
         err: "Terjadi kesalahan, gagal menghapus"
     }
     connection.poolManipulate(`DELETE FROM tbl_room WHERE room_id = ?`, [id], (res)=>{
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

 function listClass({search, orderby, order, index,len}, callback){
     let query = `SELECT
                    class_id,
                    class_name
                    FROM tbl_room
                        WHERE class_name LIKE ? ORDER BY ${orderby} ${order} LIMIT ${index},${len}`;

    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.poolSelect(query, [src], callback);
    }else{
        query = `SELECT
                    class_id,
                    class_name
                    FROM tbl_room
                        ORDER BY ${orderby} ${order} LIMIT ${index},${len}`;
        
        connection.poolSelect(query, [], callback);
    }
 }
module.exports = {
    createRoom,
    updateRoom,
    listClass,
    deleteRoom
};