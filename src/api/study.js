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
});

route.delete('/', verifyToken, (req, res, next)=>{
    /**
     * delete study
     */
});

route.put('/', verifyToken, (req, res, next)=>{
    /**
     * update study
     */
});

module.exports = route;