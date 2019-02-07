const express = require('express');
const route = express.Router();
const verifyToken = require('../verification');

route.get('/', verifyToken, (req, res, next)=>{
    // get list news
});

route.get('/teacher/:id', verifyToken, (req, res, next)=>{
    // get detail news
});

route.get('/student/:id', verifyToken, (req, res, next)=>{

});

route.get('/me', verifyToken, (req, res, next)=>{
    
});

route.post('/', verifyToken, (req, res, next)=>{
    // craete news
    if(req.admin){

    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.delete('/', verifyToken, (req, res, next)=>{
    // delete news
    if(req.admin){

    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.put('/', verifyToken, (req, res, next)=>{
    // update news
    if(req.admin){

    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

module.exports = route;