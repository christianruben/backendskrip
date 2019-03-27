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
    connection.execute(`INSERT INTO tbl_schedule(class_id, day_id, teacher_id, study_id, type, time, datecreated) VALUES(?,?,?,?,?,?,?,?)`, [Class, day, teacher, study, type, time, util.getDateNow()], (err,res)=>{
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

function updateSchedule({Class, day, teacher, time, end}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, gagal memperbaharui"
    }
    connection.execute(`UPDATE tbl_schedule SET class_id = ?, day_id = ?, teacher_id = ?, study_id = ?, time = ? WHERE schedule_id = ?`, [Class, day, teacher, study, time, id], (err, res)=>{
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

function listScheduleAll({search, orderby, order, index, len}, callback){
    let query = `SELECT 
                    ts.schedule_id,
                    tti.time_id,
                    tst.study_name, 
                    tti.time_start, 
                    tti.time_end, 
                    td.day_name,
                    tc.class_name,
                    tt.name as teacher
                    FROM tbl_schedule as ts 
                        INNER JOIN tbl_time as tti ON ts.time = tti.time_id
                        INNER JOIN tbl_study as tst ON tst.study_id = ts.study_id 
                        INNER JOIN tbl_day as td ON ts.day_id = td.day_id
                        INNER JOIN tbl_class as tc ON ts.class_id = tc.class_id
                        INNER JOIN tbl_teacher as tt ON tt.teacher_id = ts.teacher_id
                        WHERE tst.study_name LIKE ? OR tt.name LIKE ? OR tc.class_name LIKE ? OR ts.day_name LIKE ? ORDER BY ${orderby} ${order} LIMIT ${index},${len}`;

    if(search.trim().length > 0){
        let src = search.trim();
        connection.execute(query, [src, src, src, src], callback);
    }else{
        query = `SELECT 
        ts.schedule_id,
        tti.time_id,
        tst.study_name, 
        tti.time_start, 
        tti.time_end, 
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
        
        connection.execute(query, [], callback);
    }
    
}

function getAllRowsSchedule(search, callback){
    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.execute(`SELECT 
                    count(*) as countall
                    FROM tbl_schedule as ts 
                        INNER JOIN tbl_time as tti ON ts.time = tti.time_id
                        INNER JOIN tbl_study as tst ON tst.study_id = ts.study_id 
                        INNER JOIN tbl_day as td ON ts.day_id = td.day_id
                        INNER JOIN tbl_class as tc ON ts.class_id = tc.class_id
                        INNER JOIN tbl_teacher as tt ON tt.teacher_id = ts.teacher_id
                        WHERE tst.study_name LIKE ? OR tt.name LIKE ? OR tc.class_name LIKE ? OR ts.day_name LIKE ? `, [src, src, src, src], callback);
    }else{
        connection.execute(`SELECT
        count(*) as countall
        FROM tbl_schedule as ts 
            INNER JOIN tbl_time as tti ON ts.time = tti.time_id
            INNER JOIN tbl_study as tst ON tst.study_id = ts.study_id 
            INNER JOIN tbl_day as td ON ts.day_id = td.day_id
            INNER JOIN tbl_class as tc ON ts.class_id = tc.class_id
            INNER JOIN tbl_teacher as tt ON tt.teacher_id = ts.teacher_id`, [], callback);
    }
}

function listScheduleClass({Class, search, orderby, order, orderby2, order2, index, len}, callback){
    let query = `SELECT 
                    ts.schedule_id,
                    tti.time_id,
                    tst.study_name, 
                    tti.time_start, 
                    tti.time_end, 
                    td.day_name,
                    tc.class_name,
                    tt.name as teacher
                    FROM tbl_schedule as ts 
                        INNER JOIN tbl_time as tti ON ts.time = tti.time_id
                        INNER JOIN tbl_study as tst ON tst.study_id = ts.study_id 
                        INNER JOIN tbl_day as td ON ts.day_id = td.day_id
                        INNER JOIN tbl_class as tc ON ts.class_id = tc.class_id
                        INNER JOIN tbl_teacher as tt ON tt.teacher_id = ts.teacher_id
                        WHERE tst.study_name LIKE ? AND ts.class_id = ? ORDER BY ${orderby} ${order}, ${orderby2} ${order2} LIMIT ${index},${len}`;
    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.execute(query, [src, Class], callback);
    }else{
        query = `SELECT 
                    ts.schedule_id,
                    tti.time_id,
                    tst.study_name, 
                    tti.time_start, 
                    tti.time_end, 
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
                        ORDER BY ${orderby} ${order}, ${orderby2} ${order2} LIMIT ${index},${len}`;
        console.log(Class, index, len);
        connection.execute(query, [Class], callback);
    }
}

function getAllRowsScheduleClass(Class, search, callback){
    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.execute(`SELECT 
                    count(*) as countall
                    FROM tbl_schedule as ts 
                        INNER JOIN tbl_time as tti ON ts.time = tti.time_id
                        INNER JOIN tbl_study as tst ON tst.study_id = ts.study_id 
                        INNER JOIN tbl_day as td ON ts.day_id = td.day_id
                        INNER JOIN tbl_class as tc ON ts.class_id = tc.class_id
                        INNER JOIN tbl_teacher as tt ON tt.teacher_id = ts.teacher_id
                        WHERE tst.study_name LIKE ? AND ts.class_id = ? `, [src, Class], callback);
    }else{
        connection.execute(`SELECT
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
        connection.execute(query, [src, id], callback);
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
        connection.execute(query, [id], callback);
    }
}

function getAllRowsScheduleTeacher(id, search, callback){
    if(search.trim().length > 0){
        let src = `%${search.trim()}%`;
        connection.execute(`SELECT 
                    count(*) as countall
                    FROM tbl_schedule as ts 
                        INNER JOIN tbl_study as tst ON tst.study_id = ts.study_id 
                        INNER JOIN tbl_day as td ON ts.day_id = td.day_id
                        INNER JOIN tbl_class as tc ON ts.class_id = tc.class_id
                        WHERE tst.study_name LIKE ? AND ts.teacher_id = ?`, [src, id], callback);
    }else{
        connection.execute(`SELECT
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
    connection.execute(query, [id], callback);
}

module.exports = {
    getDetailSchedule,
    listScheduleTeacher,
    listScheduleClass,
    deleteSchedule,
    updateSchedule,
    setType,
    createSchedule,
    listScheduleAll
};