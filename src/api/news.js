const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');
route.use(bodyParser.urlencoded({extended: false}));
route.use(bodyParser.json());

route.get('/', (req, res, next)=>{
    // get list news
});

route.get('/:id', (req, res, next)=>{
    // get detail news
});

route.post('/', (req, res, next)=>{
    // craete news
});

route.delete('/', (req, res, next)=>{
    // delete news
});

route.put('/:id', (req, res, next)=>{
    // update news
});