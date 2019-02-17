const connection = require('../connection');

class Exam{
    createExam({study, date, timestart, timeend, detail, room, cls, watcher}, callback){

    }

    updateExam({id, date, timestart, timeend, detail, room, cls, watcher}, callback){

    }

    deleteExam({id}, callback){

    }

    ExamList({search, orderby, order, rows}, callback){

    }

    ExamListByClass({search, orderby, order, rows}, callback){

    }
}

module.exports = Exam;