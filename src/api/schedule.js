const express = require('express');
const route = express.Router();
const verifyToken = require('../verification');

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