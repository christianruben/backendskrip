const express = require('express');
const route = express.Router();
const verifyToken = require('../verification');

route.get('/', verifyToken, (req, res, next)=>{
    /**
     * get study list
     */
});

route.get('/class/:id', verifyToken, (req, res, next)=>{
    /**
     * get study list from one class
     */
});

route.get('/:id', verifyToken, (req, res, next)=>{
    /**
     * get study detail
     */
});

route.post('/', verifyToken, (req, res, next)=>{
    /**
     * update study information
     */
    if(req.admin){

    }else{
        res.status(402).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.delete('/', verifyToken, (req, res, next)=>{
    /**
     * delete study
     */
    if(req.admin){

    }else{
        res.status(402).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.put('/', verifyToken, (req, res, next)=>{
    /**
     * update study
     */
    if(req.admin){

    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

module.exports = route;