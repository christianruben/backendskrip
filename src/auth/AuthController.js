const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const admin_model = require('../../model/admin');

const util = require('../../util');

route.post('/login', (req, res, next)=>{
    let token = jwt.sign({id: id, level: level}, config.secret, {
        expiresIn: 60*60 // default
    });
    
});

route.post('/login/admin', (req, res, next)=>{
    let username = req.body.username, password = req.body.password;
    admin_model.Auth(username, password, (result)=>{
        if(result.status === 0){
            return res.status(401).send({auth: false, message: result.err});
        }else if(result.status === -1){
            return res.status(500).send({auth: false, message: result.err});
        }else{
            let token = jwt.sign({id: result.data.id, level: 3}, config.secret, {});
            return res.status(200).send({auth: true, token: token});
        }
    });
});

route.get('/logout', (req, res)=>{
    res.status(200).send({auth: false, token: null});
});

module.exports = route;
