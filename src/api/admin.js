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
    res.status(200).send("Admin get by id = ");
});

route.post('/',verifyToken, (req, res, next)=>{
    /**
     * create admin
     */
    res.status(200).send("Admin created");
});

route.delete('/',verifyToken, (req, res, next)=>{
    /**
     * delete admin
     */
    res.status(200).send("Admin deleted");
});

route.put('/',verifyToken, (req, res, next)=>{
    /**
     * update admin
     */
    res.status(200).send("Admin updated");
});

route.put('/picture/:id',verifyToken, (req, res, next)=>{
    /**
     * update admin picture
     */
    res.status(200).send("Admin picture updated");
});

module.exports = route;