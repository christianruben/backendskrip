const express = require('express');
const route = express.Router();

route.get('/', (req, res, next)=>{
    /**
     * 
     */
    res.status(200).send('<h1>Hello world</h1>');
});

route.get('/admin', (req, res, next)=>{
});

module.exports = route;