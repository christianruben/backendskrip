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
});

route.delete('/', verifyToken, (req, res, next)=>{
    /**
     * delete exam information
     */
});

route.put('/', verifyToken, (req, res, next)=>{
    /**
     * update exam information
     */
});

module.exports = route;