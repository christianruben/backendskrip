const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');
route.use(bodyParser.urlencoded({extended: false}));
route.use(bodyParser.json());

route.get('/student', (req, res, next)=>{
    /**
     * get schedule student list
     */
});

route.get('/teacher', (req, res, next)=>{
    /**
     * get schedule teacher list
     */
});

route.get('/student/class/:id', (req, res, next)=>{
    /**
     * get schedule student by class
     */
});

route.post('/student', (req, res, next)=>{
    /**
     * create schedule student
     */
});

route.post('/teacher', (req, res, next)=>{
    /**
     * create schedule teacher
     */
});

route.delete('/student', (req, res, next)=>{
    /**
     * delete schedule student
     */
});

route.delete('/teacher', (req, res, next)=>{
    /**
     * delete schedule teacher
     */
});

route.put('/student', (req, res, next)=>{
    /**
     * update schedule student
     */
});

route.put('/teacher', (req, res, next)=>{
    /**
     * update schedule teacher
     */
});