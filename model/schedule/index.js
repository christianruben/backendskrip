const connection = require('../connection');
const util = require('../../util');

function createSchedule({Class, day, teacher, study, type, start, end}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalaha, gagal menyimpan"
    }
    connection.execute(`INSERT INTO tbl_schedule(class_id, day_id, teacher_id, study_id, type, schedule_time_start, schedule_time_end, datecreated) VALUES(?,?,?,?,?,?,?,?)`, [Class, day, teacher, study, type, start, end, util.getDateNow()], (err,res)=>{
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

function setType({type, id}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, gagal memperbaharui"
    }
    connection.execute(`UPDATE tbl_schedule SET type = ? WHERE schedule_id = ?`, [type, id], (err, res)=>{
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

function updateSchedule({Class, day, teacher, study, start, end}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, gagal memperbaharui"
    }
    connection.execute(`UPDATE tbl_schedule SET class_id = ?, day_id = ?, teacher_id = ?, study_id = ?, schedule_time_start = ?, schedule_time_end = ? WHERE schedule_id = ?`, [Class, day, teacher, study, start, end, id], (err, res)=>{
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

function deleteSchedule({id}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalaha, gagal menghapus"
    }
    connection.execute(`DELETE FROM tbl_schedule WHERE schedule_id = ?`, [id], (err, res)=>{
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

function listScheduleClass({Class, search, orderby, order, index, len}, callback){
    let query = `SELECT 
                    ts.schedule_id,
                    tst.study_name, 
                    ts.schedule_time_start, 
                    ts.schedule_time_end, 
                    td.day_name,
                    tc.class_name
                    FROM tbl_schedule as ts 
                        INNER JOIN tbl_study as tst ON tst.study_id = ts.study_id 
                        INNER JOIN tbl_day as td ON ts.day_id = td.day_id
                        INNER JOIN tbl_class as tc ON ts.class_id = tc.class_id
                        WHERE tst.study_name LIKE N? AND ts.class_id = ? ORDER BY ${orderby} ${order} LIMIT ?,?`;
    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.execute(query, [src, Class, index, len], callback);
    }else{
        query = `SELECT 
                    ts.schedule_id,
                    tst.study_name, 
                    ts.schedule_time_start, 
                    ts.schedule_time_end, 
                    td.day_name,
                    tc.class_name
                    FROM tbl_schedule as ts 
                        INNER JOIN tbl_study as tst ON tst.study_id = ts.study_id 
                        INNER JOIN tbl_day as td ON ts.day_id = td.day_id
                        INNER JOIN tbl_class as tc ON ts.class_id = tc.class_id
                        WHERE ts.class_id = ? 
                        ORDER BY ${orderby} ${order} LIMIT ?,?`;
        connection.execute(query, [Class, index, len], callback);
    }
}

function listScheduleTeacher({id, search, orderby, order, index, len}, callback){
    let query = `SELECT 
                    ts.schedule_id,
                    tst.study_name, 
                    ts.schedule_time_start, 
                    ts.schedule_time_end, 
                    td.day_name,
                    tc.class_name
                    FROM tbl_schedule as ts 
                        INNER JOIN tbl_study as tst ON tst.study_id = ts.study_id 
                        INNER JOIN tbl_day as td ON ts.day_id = td.day_id
                        INNER JOIN tbl_class as tc ON ts.class_id = tc.class_id
                        WHERE tst.study_name LIKE N? AND ts.teacher_id = ? ORDER BY ${orderby} ${order} LIMIT ?,?`;
    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.execute(query, [src, id, index, len], callback);
    }else{
        query = `SELECT 
                    ts.schedule_id,
                    tst.study_name, 
                    ts.schedule_time_start, 
                    ts.schedule_time_end, 
                    td.day_name,
                    tc.class_name
                    FROM tbl_schedule as ts 
                        INNER JOIN tbl_study as tst ON tst.study_id = ts.study_id 
                        INNER JOIN tbl_day as td ON ts.day_id = td.day_id
                        INNER JOIN tbl_class as tc ON ts.class_id = tc.class_id
                        WHERE ts.teacher_id = ? 
                        ORDER BY ${orderby} ${order} LIMIT ?,?`;
        connection.execute(query, [id, index, len], callback);
    }
}

function getDetailSchedule({id}, callback){
    let query = `SELECT 
                    ts.schedule_time_start,
                    ts.schedule_time_end,
                    tst.study_name,
                    td.day_name,
                    tc.class_name,
                    tt.name,
                    u.picture
                    FROM tbl_schedule as ts 
                        INNER JOIN tbl_study as tst ON tst.study_id = ts.study_id 
                        INNER JOIN tbl_day as td as ts ON ts.day_id = td.day_id
                        INNER JOIN tbl_class as tc ON ts.class_id = tc.class_id
                        INNER JOIN tbl_teacher as tt ON tt.teacher_id = ts.teacher_id
                        INNER JOIN user as u ON u.owner_id = ts.teacher_id AND u.level = 2
                            WHERE ts.schedule_id = ?`;
    connection.execute(query, [id], callback);
}

module.exports = Schedule;