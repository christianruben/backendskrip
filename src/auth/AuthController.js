const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

route.use(bodyParser.urlencoded({extended: false});
route.use(bodyParser.json());

route.post('/register', (req, res, next)=>{
    let hashedPassword = bcrypt.hashSync(req.body.secretkey, 8);
    
});