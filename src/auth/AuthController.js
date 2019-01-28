const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

route.use(bodyParser.urlencoded({extended: false}));
route.use(bodyParser.json());

route.post('/login', (req, res, next)=>{
    let id = 0;
    let account = 'student';
    let level = 1;
    let token = jwt.sign({id: id, account: account, level: level}, config.secret, {
        expiresIn: 60*60*24*30 // default
    })
    res.status(200).send({auth: true, token: token});
});

route.get('/logout', (req, res, next)=>{
    res.status(200).send({auth: false, token: null});
});

module.exports = route;
