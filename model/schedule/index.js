const connection = require('../connection');

export default class {
    addSchedule({studyid, teacherid, classid, dayid, timestart, timeend, semesterid, roomid}, callback){

    }

    deleteSchedule({scheduleid}, callback){

    }

    updateSchedule({scheduleid, studyid, teacherid, classid, dayid, timestart, timeend, semesterid, roomid}, callback){

    }

    getScheduleList({search, sortby, sort, index, rows}, callback){

    }

    getScheduleListByClass({classid, search, sortby, sort, index, rows}, callback){

    }

    getScheduleListByDay({dayid, search, sortby, sort, index, rows}, callback){

    }
}