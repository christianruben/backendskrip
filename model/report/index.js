const connection = require('../connection');

class Report{
    createReport({studyid, teacherid, studentid, report, note}, callback){
        
    }

    deleteReport({reportid}, callback){

    }

    updateReport({reportid, studyid, studentid, report, note}, callback){

    }

    listReportByStudent({studentid, search, sortby, sort, index, rows}, callback){

    }

    listReportByStudy({studyid, search, sortby, sort, index, rows}, callback){

    }

    listReportByTeacher({teacherid, search, sortby, sort, index, rows}, callback){
        
    }
}

module.exports = Report;