const express = require('express');
const route = express.Router();
const verifyToken = require('../verification');

route.get('/', verifyToken, (req, res, next)=>{
    /**
     * get exam list
     */
});

route.get('/class/:id', verifyToken, (req, res, next)=>{
    /**
     * get exam for one class
     */
});

route.get('/:id', verifyToken, (req, res, next)=>{
    /**
     * get exam detail
     */
});

route.post('/', verifyToken, (req, res, next)=>{
    /**
     * create exam information
     */
    if(req.admin){

    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.delete('/', verifyToken, (req, res, next)=>{
    /**
     * delete exam information
     */
    if(req.admin){

    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.put('/', verifyToken, (req, res, next)=>{
    /**
     * update exam information
     */
    if(req.admin){

    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

module.exports = route;