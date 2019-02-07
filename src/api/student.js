const express = require('express');
const route = express.Router();
const verifyToken = require('../verification');

route.get('/', verifyToken, (req, res, next)=>{
    // get all list student
});

route.get('/:id', verifyToken, (req, res, next)=>{
    // get student by his id
});

route.get('/class/:id', verifyToken, (req, res, next)=>{
    // get list student by class id
    
});

route.post('/', verifyToken, (req, res, next)=>{
    // create student data
    if(req.admin){

    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.delete('/', verifyToken, (req, res, next)=>{
    // delete student
    if(req.admin){

    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.put('/', verifyToken, (req, res, next)=>{
    // update student
    if(req.admin || req.student){

    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.put('/picture/:id', verifyToken, (req, res, next)=>{
    // update picture
    if(req.admin || req.student){

    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

module.exports = route;