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
});

route.delete('/', verifyToken, (req, res, next)=>{
    // delete student
});

route.put('/', verifyToken, (req, res, next)=>{
    // update student
});

route.put('/picture/:id', verifyToken, (req, res, next)=>{
    // update picture
});

module.exports = route;