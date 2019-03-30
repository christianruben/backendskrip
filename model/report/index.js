const connection = require('../connection');
const util = require('../../util');

/**
 * @author kristian ruben sianturi
 * manage data in tbl_val_report
 */

function createReport({student_id, teacher_id, abs, hw, mid, sem, semester_id, study_id}, callback){
    let result = {
        status: 0,
        err: "Terjadi kesalahan, nilai tidak tersimpan"
    }
    connection.poolSelect(`SELECT * FROM tbl_val_report WHERE student_id = ? AND teacher_id = ? AND study_id = ? AND semester_id = ?`, [student_id, teacher_id, study_id, semester_id], (res)=>{
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

module.exports = {
    createReport
};