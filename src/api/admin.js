const express = require('express');
const route = express.Router();
const verifyToken = require('../verification');

route.get('/',verifyToken, (req, res, next)=>{
    /**
     * get list of admin
     */
    if(req.admin){
        res.status(200).send("Admin get");
    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.get('/:id',verifyToken, (req, res, next)=>{
    /**
     * get admin detail
     */
    if(req.admin){
        res.status(200).send("Admin get by id = ");
    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.post('/',verifyToken, (req, res, next)=>{
    /**
     * create admin
     */
    if(req.admin){
        res.status(200).send("Admin created");
    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.delete('/',verifyToken, (req, res, next)=>{
    /**
     * delete admin
     */
    if(req.admin){
        res.status(200).send("Admin deleted");
    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.put('/',verifyToken, (req, res, next)=>{
    /**
     * update admin
     */
    if(req.admin){
        res.status(200).send("Admin updated");
    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.put('/picture/:id',verifyToken, (req, res, next)=>{
    /**
     * update admin picture
     */
    if(req.admin){
        res.status(200).send("Admin picture updated");
    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

module.exports = route;