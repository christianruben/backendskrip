const connection = require('../connection');
const util = require('../../util');

/**
 * @author kristian ruben sianturi
 * manage data in tbl_schedule
 */

function createSchedule({Class, day, teacher, study, type, time}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalaha, gagal menyimpan"
    }
    connection.poolManipulate(`INSERT INTO tbl_schedule(class_id, day_id, teacher_id, study_id, type, time, datecreated) VALUES(?,?,?,?,?,?,?,?)`, [Class, day, teacher, study, type, time, util.getDateNow()], (res)=>{
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

function setType({type, id}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, gagal memperbaharui"
    }
    connection.poolManipulate(`UPDATE tbl_schedule SET type = ? WHERE schedule_id = ?`, [type, id], (res)=>{
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

function updateSchedule({id, Class, day, teacher, study, type, time}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, gagal memperbaharui"
    }
    connection.poolManipulate(`UPDATE tbl_schedule SET class_id = ?, day_id = ?, teacher_id = ?, study_id = ?, type = ?, time = ? WHERE schedule_id = ?`, [Class, day, teacher, study, type, time, id], (res)=>{
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

function deleteSchedule({id}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalaha, gagal menghapus"
    }
    connection.poolManipulate(`DELETE FROM tbl_schedule WHERE schedule_id = ?`, [id], (res)=>{
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

function listScheduleAll({search, orderby, order, index, len}, callback){
    let query = `SELECT 
                    ts.schedule_id,
                    tti.time_id,
                    tst.study_name, 
                    CONCAT(tti.time_start, ' - ', tti.time_end) as study_time,
                    td.day_name,
                    tc.class_name,
                    tt.name as teacher
                    FROM tbl_schedule as ts 
                        INNER JOIN tbl_time as tti ON ts.time = tti.time_id
                        INNER JOIN tbl_study as tst ON tst.study_id = ts.study_id 
                        INNER JOIN tbl_day as td ON ts.day_id = td.day_id
                        INNER JOIN tbl_class as tc ON ts.class_id = tc.class_id
                        INNER JOIN tbl_teacher as tt ON tt.teacher_id = ts.teacher_id
                        WHERE tst.study_name LIKE ? OR tt.name LIKE ? OR tc.class_name LIKE ? OR td.day_name LIKE ? ORDER BY ${orderby} ${order} LIMIT ${index},${len}`;

    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.poolSelect(query, [src, src, src, src], callback);
    }else{
        query = `SELECT 
        ts.schedule_id,
        tti.time_id,
        tst.study_name, 
        CONCAT(tti.time_start, ' - ', tti.time_end) as study_time,
        td.day_name,
        tc.class_name,
        tt.name as teacher
        FROM tbl_schedule as ts 
            INNER JOIN tbl_time as tti ON ts.time = tti.time_id
            INNER JOIN tbl_study as tst ON tst.study_id = ts.study_id 
            INNER JOIN tbl_day as td ON ts.day_id = td.day_id
            INNER JOIN tbl_class as tc ON ts.class_id = tc.class_id
            INNER JOIN tbl_teacher as tt ON tt.teacher_id = ts.teacher_id
            ORDER BY ${orderby} ${order} LIMIT ${index},${len}`;
        
        connection.poolSelect(query, [], callback);
    }
    
}

function getAllRowsSchedule(search, callback){
    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.poolSelect(`SELECT 
                    count(*) as countall
                    FROM tbl_schedule as ts 
                        INNER JOIN tbl_time as tti ON ts.time = tti.time_id
                        INNER JOIN tbl_study as tst ON tst.study_id = ts.study_id 
                        INNER JOIN tbl_day as td ON ts.day_id = td.day_id
                        INNER JOIN tbl_class as tc ON ts.class_id = tc.class_id
                        INNER JOIN tbl_teacher as tt ON tt.teacher_id = ts.teacher_id
                        WHERE tst.study_name LIKE ? OR tt.name LIKE ? OR tc.class_name LIKE ? OR td.day_name LIKE ? `, [src, src, src, src], callback);
    }else{
        connection.poolSelect(`SELECT
        count(*) as countall
        FROM tbl_schedule as ts 
            INNER JOIN tbl_time as tti ON ts.time = tti.time_id
            INNER JOIN tbl_study as tst ON tst.study_id = ts.study_id 
            INNER JOIN tbl_day as td ON ts.day_id = td.day_id
            INNER JOIN tbl_class as tc ON ts.class_id = tc.class_id
            INNER JOIN tbl_teacher as tt ON tt.teacher_id = ts.teacher_id`, [], callback);
    }
}

function listScheduleClass({Class, search, orderby, order, index, len}, callback){
    let query = `SELECT 
                    ts.schedule_id,
                    tti.time_id,
                    tst.study_name, 
                    CONCAT(tti.time_start, ' - ', tti.time_end) as study_time,
                    td.day_name,
                    tc.class_name,
                    tt.name as teacher
                    FROM tbl_schedule as ts 
                        INNER JOIN tbl_time as tti ON ts.time = tti.time_id
                        INNER JOIN tbl_study as tst ON tst.study_id = ts.study_id 
                        INNER JOIN tbl_day as td ON ts.day_id = td.day_id
                        INNER JOIN tbl_class as tc ON ts.class_id = tc.class_id
                        INNER JOIN tbl_teacher as tt ON tt.teacher_id = ts.teacher_id
                        WHERE tst.study_name LIKE ? AND ts.class_id = ? ORDER BY ${orderby} ${order} LIMIT ${index},${len}`;
    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.poolSelect(query, [src, Class], callback);
    }else{
        query = `SELECT 
                    ts.schedule_id,
                    tti.time_id,
                    tst.study_name,
                    CONCAT(tti.time_start, ' - ', tti.time_end) as study_time,
                    td.day_name,
                    tc.class_name,
                    tt.name as teacher
                    FROM tbl_schedule as ts 
                        INNER JOIN tbl_time as tti ON ts.time = tti.time_id
                        INNER JOIN tbl_study as tst ON tst.study_id = ts.study_id 
                        INNER JOIN tbl_day as td ON ts.day_id = td.day_id
                        INNER JOIN tbl_class as tc ON ts.class_id = tc.class_id
                        INNER JOIN tbl_teacher as tt ON tt.teacher_id = ts.teacher_id
                        WHERE ts.class_id = ? 
                        ORDER BY ${orderby} ${order} LIMIT ${index},${len}`;
        connection.poolSelect(query, [Class], callback);
    }
}

function getAllRowsScheduleClass(Class, search, callback){
    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.poolSelect(`SELECT 
                    count(*) as countall
                    FROM tbl_schedule as ts 
                        INNER JOIN tbl_time as tti ON ts.time = tti.time_id
                        INNER JOIN tbl_study as tst ON tst.study_id = ts.study_id 
                        INNER JOIN tbl_day as td ON ts.day_id = td.day_id
                        INNER JOIN tbl_class as tc ON ts.class_id = tc.class_id
                        INNER JOIN tbl_teacher as tt ON tt.teacher_id = ts.teacher_id
                        WHERE tst.study_name LIKE ? AND ts.class_id = ? `, [src, Class], callback);
    }else{
        connection.poolSelect(`SELECT
        count(*) as countall
        FROM tbl_schedule as ts 
            INNER JOIN tbl_time as tti ON ts.time = tti.time_id
            INNER JOIN tbl_study as tst ON tst.study_id = ts.study_id 
            INNER JOIN tbl_day as td ON ts.day_id = td.day_id
            INNER JOIN tbl_class as tc ON ts.class_id = tc.class_id
            INNER JOIN tbl_teacher as tt ON tt.teacher_id = ts.teacher_id
            WHERE ts.class_id = ? `, [Class], callback);
    }
}

function listScheduleTeacher({id, search, orderby, order, index, len}, callback){
    let query = `SELECT 
                    ts.schedule_id,
                    tst.study_name, 
                    ts.schedule_time_start as time_start, 
                    ts.schedule_time_end as time_end, 
                    td.day_name,
                    tc.class_name
                    FROM tbl_schedule as ts 
                        INNER JOIN tbl_study as tst ON tst.study_id = ts.study_id 
                        INNER JOIN tbl_day as td ON ts.day_id = td.day_id
                        INNER JOIN tbl_class as tc ON ts.class_id = tc.class_id
                        WHERE tst.study_name LIKE ? AND ts.teacher_id = ? ORDER BY ${orderby} ${order} LIMIT  ${index},${len}`;
    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.poolSelect(query, [src, id], callback);
    }else{
        query = `SELECT 
                    ts.schedule_id,
                    tst.study_name, 
                    ts.schedule_time_start as time_start, 
                    ts.schedule_time_end as time_end, 
                    td.day_name,
                    tc.class_name
                    FROM tbl_schedule as ts 
                        INNER JOIN tbl_study as tst ON tst.study_id = ts.study_id 
                        INNER JOIN tbl_day as td ON ts.day_id = td.day_id
                        INNER JOIN tbl_class as tc ON ts.class_id = tc.class_id
                        WHERE ts.teacher_id = ? 
                        ORDER BY ${orderby} ${order} LIMIT  ${index},${len}`;
        connection.poolSelect(query, [id], callback);
    }
}

function getAllRowsScheduleTeacher(id, search, callback){
    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.poolSelect(`SELECT 
                    count(*) as countall
                    FROM tbl_schedule as ts 
                        INNER JOIN tbl_study as tst ON tst.study_id = ts.study_id 
                        INNER JOIN tbl_day as td ON ts.day_id = td.day_id
                        INNER JOIN tbl_class as tc ON ts.class_id = tc.class_id
                        WHERE tst.study_name LIKE ? AND ts.teacher_id = ?`, [src, id], callback);
    }else{
        connection.poolSelect(`SELECT
        count(*) as countall
        FROM tbl_schedule as ts 
            INNER JOIN tbl_study as tst ON tst.study_id = ts.study_id 
            INNER JOIN tbl_day as td ON ts.day_id = td.day_id
            INNER JOIN tbl_class as tc ON ts.class_id = tc.class_id
            WHERE ts.teacher_id = ? `, [id], callback);
    }
}

function getDetailSchedule({id}, callback){
    let query = `SELECT 
                    ts.schedule_time_start as time_start,
                    ts.schedule_time_end as time_end,
                    tst.study_name,
                    td.day_name as day,
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
    connection.poolSelect(query, [id], callback);
}

module.exports = {
    getDetailSchedule,
    listScheduleTeacher,
    listScheduleClass,
    deleteSchedule,
    updateSchedule,
    setType,
    createSchedule,
    listScheduleAll,
    getAllRowsSchedule,
    getAllRowsScheduleClass,
    getAllRowsScheduleTeacher
};