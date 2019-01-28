const express = require('express');
const route = express.Router();
const verifyToken = require('../verification');

route.get('/', verifyToken, (req, res, next)=>{
    // get list news
});

route.get('/:id', verifyToken, (req, res, next)=>{
    // get detail news
});

route.post('/', verifyToken, (req, res, next)=>{
    // craete news
});

route.delete('/', verifyToken, (req, res, next)=>{
    // delete news
});

route.put('/', verifyToken, (req, res, next)=>{
    // update news
});

module.exports = route;