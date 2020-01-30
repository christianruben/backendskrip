const connection = require('../connection');
const util = require('../../util');

/**
 * @author kristian ruben sianturi
 * manage data in tbl_val_report
 */

function createReport({student_id, teacher_id, abs, hw, mid, sem, semester_id, class_id, study_id}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, nilai tidak tersimpan"
    }
    connection.poolSelect(`SELECT * FROM tbl_val_report WHERE student_id = ? AND teacher_id = ? ANS class_id = ? AND study_id = ? AND semester_id = ?`, [student_id, teacher_id, class_id, study_id, semester_id], (res)=>{
        if(res.err){
            result = {
                status: -1,
                err: "Terjadi Kesalahan pada server"
            }
            callback(result);
        }else{
            if(res.res.length > 0){
                result = {
                    status: 0,
                    err: "nilai murid sudah terisi"
                }
                callback(result);
            }else{
                connection.poolManipulate(`INSERT INTO tbl_val_report(student_id, teacher_id, absensi, homework, mid_semester, semester, semester_id, study_id, datecreated) VALUES(?,?,?,?,?,?,?,?,?,?)`, [student_id, teacher_id, abs, hw, mid, sem, semester_id, study_id, util.getDateNow()], (res)=>{
                    if(res.err){
                        result = {
                            status: -1,
                            err: "Terjadi Kesalahan pada server"
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
        }
    });
}

function getReportByStudentId({student_id, semester_id}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, tidak dapat menampilkan permintaan"
    }
    connection.poolSelect(`SELECT tstu.student_name, tt.teacher_name, tvr.absensi, tvr.homework, tvr.mid_semester, tvr.semester,  
        FROM tbl_val_report as tvr INNER JOIN tbl_semester as ts ON tvr.semester_id = ts.semester_id 
        INNER JOIN tbl_study as tst ON ts.study_id = tst.study_id
        INNER JOIN tbl_teacher as tt ON ts.teacher_id = tt.teacher_id
        INNER JOIN tbl_student as tstu ON ts.student_id = stsu.student_id
        WHERE student_id = ? AND semester_id = ? ORDER BY tst.study_name ASC`, [student_id, semester_id], callback);
}

function getListReportPerSemester({teacher_id, index, len}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalaha, tidak dapat menampilkan permintaan"
    }
    connection.poolSelect(`SELECT ts.semester_name, ts.semester_id
    FROM tbl_val_report as tvr INNER JOIN tbl_semester as ts ON tvr.semester_id = ts.semester_id
    WHERE tvr.teacher_id = ? GROUP BY tvr.semester_id ORDER BY tvr.semester_id ASC LIMIT ${index}, ${len}`, [teacher_id], callback);
}

function getListReportPerClass({teacher_id, semester_id, index, len}, callback){
    connection.poolSelect(`SELECT tc.class_name, tc.class_id, tvr.semester_id
    FROM tbl_val_report as tvr INNER JOIN tbl_class as tc ON tvr.class_id = tc.class_id
    WHERE tvr.teacher_id = ? AND tvr.semester_id = ? GROUP BY tvr.class_id ORDER BY tvr.class_id ASC LIMIT ${index}, ${len}`, [teacher_id, semester_id], callback);
}

function getListReportPerStudent({teacher_id, semester_id, class_id, index, len}, callback){
    connection.poolSelect(`SELECT tstu.student_name, tstu.student_id, tvr.study_id
    FROM tbl_val_report as tvr INNER JOIN tbl_student as tstu ON tvr.student_id = tstu.student_id
    WHERE tvr.teacher_i = ? AND tvr.semester_id = ? AND tvr.class_id = ? ORDER BY tvr.student_id ASC LIMIT ${index}, ${len}`, [teacher_id, semester_id, class_id], callback);
}

function getDetailReportByStudent({teacher_id, semester_id, class_id, student_id}, callback){
    connection.poolSelect(`SELECT tvr.absensi, tvr.homework, tvr.mid_semester, tvr.semester, tvr.student_id, tvr.semester_id, tvr.class_id
    FROM tbl_val_report as tvr WHERE tvr.teacher_id = ? AND tvr.semester_id = ? AND tvr.class_id = ? AND tvr.student_id = ? AND tvr.study_id = ?`, [teacher_id, semester_id, class_id, student_id], callback);
}

module.exports = {
    createReport,
    getReportByStudentId,
    getListReportPerSemester,
    getListReportPerClass,
    getListReportPerStudent,
    getDetailReportByStudent
};