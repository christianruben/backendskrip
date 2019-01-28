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
});

route.post('/teacher', verifyToken, (req, res, next)=>{
    /**
     * create schedule teacher
     */
});

route.delete('/student', verifyToken, (req, res, next)=>{
    /**
     * delete schedule student
     */
});

route.delete('/teacher', verifyToken, (req, res, next)=>{
    /**
     * delete schedule teacher
     */
});

route.put('/student', verifyToken, (req, res, next)=>{
    /**
     * update schedule student
     */
});

route.put('/teacher', verifyToken, (req, res, next)=>{
    /**
     * update schedule teacher
     */
});

module.exports = route;