const express = require('express');
const route = express.Router();
const verifyToken = require('../verification');
const schedule_model = require('../../model/schedule');

route.get('/', (req, res, next)=>{
    req.admin = true;
    if(req.admin){
        schedule_model.listScheduleAll({search: "", orderby: "schedule_id", order: "ASC", index: 0, len: 20}, (err, result, field)=>{
            if(err){
                return res.status(500).send({auth: false, msg: "internal server error"});
            }else{
                res.status(200).send({auth: true, msg: null, data: result})
            }
        });
    }else{
        res.status(400).send({auth: false, msg: "authoration failed"});
    }
});

route.get('/student', verifyToken, (req, res, next)=>{
    /**
     * get schedule student list
     */
});

route.get('/teacher', verifyToken, (req, res, next)=>{
    /**
     * get schedule teacher list
     */
});

route.get('/student/class/:id', verifyToken, (req, res, next)=>{
    /**
     * get schedule student by class
     */
});

route.post('/student', verifyToken, (req, res, next)=>{
    /**
     * create schedule student
     */
    if(req.admin){

    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.post('/teacher', verifyToken, (req, res, next)=>{
    /**
     * create schedule teacher
     */
    if(req.admin){

    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.delete('/student', verifyToken, (req, res, next)=>{
    /**
     * delete schedule student
     */
    if(req.admin){

    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.delete('/teacher', verifyToken, (req, res, next)=>{
    /**
     * delete schedule teacher
     */
    if(req.admin){
        
    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.put('/student', verifyToken, (req, res, next)=>{
    /**
     * update schedule student
     */
    if(req.admin){

    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.put('/teacher', verifyToken, (req, res, next)=>{
    /**
     * update schedule teacher
     */
    if(req.admin){

    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

module.exports = route;