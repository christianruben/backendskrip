const express = require('express');
const route = express.Router();
const verifyToken = require('../verification');
const model_schedule = require('../../model/schedule');

route.get('/', verifyToken, (req, res)=>{
    if(req.admin){
        let search = req.query.search;
        let sortby = req.query.sortby;
        let sort   = req.query.sort;
        let rows   = req.query.rows;
        let index  = (req.query.page - 1) * rows;
        let data_rows;
        model_schedule.listScheduleAll({search: search, orderby: sortby, order: sort, index: index, len: rows}, (result)=>{
            if(result.err){
                return res.status(500).send({response: null, message: result.err.message});
            }else{
                data_rows = result.res;
                model_schedule.getAllRowsSchedule(search, (result)=>{
                    if(result.err){
                        return res.status(500).send({response: null, message: result.err.message});
                    }
                    return res.status(200).send({response: {table: data_rows, len: result.res[0].countall}});
                });
            }
        });
    }else{
        return res.status(401).send({auth: false, msg: "authoration failed"});
    }
});

route.get('/:id', verifyToken, (req, res)=>{
    let id = req.params.id;
    model_schedule.getDetailSchedule({id: id}, (result)=>{
        if(result.err){
            return res.status(500).send({response: null, message: result.err.message});
        }
        if(result.res.length > 0){
            return res.status(200).send({response: result.res, message: null});
        }else{
            return res.status(400).send({response: null, message: 'Jadwal Tidak ditemukan'});
        }
    }); 
});

route.get('/teacher', verifyToken, (req, res)=>{
    /**
     * get schedule teacher list
     */
    if(req.teacher){
        let id = req.ownId;
        let search = req.query.search;
        let sortby = req.query.sortby;
        let sort   = req.query.sort;
        let rows   = req.query.rows;
        let index  = (req.query.page - 1) * rows;
        let data_rows;
        model_schedule.listScheduleTeacher({id: id, search: search, orderby: sortby, order: sort, index: index, len: rows}, (result)=>{
            if(result.err){
                return res.status(500).send({response: null, message: result.err.message});
            }else{
                data_rows = result.res;
                model_schedule.getAllRowsScheduleTeacher(search, (result)=>{
                    if(result.err){
                        return res.status(500).send({response: null, message: result.err.message});
                    }
                    return res.status(200).send({response: {table: data_rows, len: result.res[0].countall}});
                });
            }
        });
    }else{
        return res.status(401).send({auth: false, msg: "authoration failed"});
    }
});

route.get('/student/class/:id', verifyToken, (req, res)=>{
    /**
     * get schedule student by class
     */
    if(req.teacher){
        let id = req.query.id;
        let search = req.query.search;
        let sortby = req.query.sortby;
        let sort   = req.query.sort;
        let rows   = req.query.rows;
        let index  = (req.query.page - 1) * rows;
        let data_rows;
        model_schedule.listScheduleClass({Class: id, search: search, orderby: sortby, order: sort, index: index, len: rows}, (result)=>{
            if(result.err){
                return res.status(500).send({response: null, message: result.err.message});
            }else{
                data_rows = result.res;
                model_schedule.getAllRowsScheduleTeacher(search, (result)=>{
                    if(err){
                        return res.status(500).send({response: null, message: result.err.message});
                    }
                    return res.status(200).send({response: {table: data_rows, len: result.res[0].countall}});
                });
            }
        });
    }else{
        return res.status(401).send({auth: false, msg: "authoration failed"});
    }
});

route.post('/', verifyToken, (req, res)=>{
    if(req.admin){
        let classid = req.body.classid;
        let dayid = req.body.dayid;
        let teacherid = req.body.teacherid;
        let studyid = req.body.studyid;
        let type = req.body.type;
        let time = req.body.time;
        
        model_schedule.createSchedule({Class: classid, day: dayid, teacher: teacherid, study: studyid, type: type, time: time}, response=>{
            if(response.status == 1){
                return res.status(200).send({response: true, message: null});
            }else{
                return res.status(500).send({response: false, message: response.err});
            }
        });
    }else{
        return res.status(402).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.delete('/', verifyToken, (req, res)=>{
    if(req.admin){
        let id = req.body.id;
        model_schedule.deleteSchedule({id: id}, response=>{
            if(response.status == 1){
                return res.status(200).send({response: true, message: null});
            }else{
                return res.status(500).send({response: false, message: response.err});
            }
        });
    }else{
        return res.status(402).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.put('/', verifyToken, (req, res)=>{
    if(req.admin){
        let id = req.body.id;
        let classid = req.body.classid;
        let dayid = req.body.dayid;
        let teacherid = req.body.teacherid;
        let studyid = req.body.studyid;
        let type = req.body.type;
        let time = req.body.time;

        model_schedule.updateSchedule({id: id, Class: classid, day: dayid, teacher: teacherid, study: studyid, type: type, time: time}, response=>{
            if(response.status == 1){
                return res.status(200).send({response: true, message: null});
            }else{
                return res.status(500).send({response: false, message: response.err});
            }
        });
    }else{
        return res.status(402).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

module.exports = route;