const express = require('express');
const route = express.Router();
const verifyToken = require('../verification');

route.get('/',verifyToken, (req, res, next)=>{
    /**
     * get list of admin
     */
    res.status(200).send("Admin get");
});

route.get('/:id',verifyToken, (req, res, next)=>{
    /**
     * get admin detail
     */
});

route.post('/',verifyToken, (req, res, next)=>{
    /**
     * create admin
     */
});

route.delete('/',verifyToken, (req, res, next)=>{
    /**
     * delete admin
     */
});

route.put('/',verifyToken, (req, res, next)=>{
    /**
     * update admin
     */
});

route.put('/picture/:id',verifyToken, (req, res, next)=>{
    /**
     * update admin picture
     */
});

module.exports = route;