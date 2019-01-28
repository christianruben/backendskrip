const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');
route.use(bodyParser.urlencoded({extended: false}));
route.use(bodyParser.json());

route.get('/', (req, res, next)=>{
    /**
     * get exam list
     */
});

route.get('/class/:id', (req, res, next)=>{
    /**
     * get exam for one class
     */
});

route.get('/:id', (req, res, next)=>{
    /**
     * get exam detail
     */
});

route.post('/', (req, res, next)=>{
    /**
     * create exam information
     */
});

route.delete('/', (req, res, next)=>{
    /**
     * delete exam information
     */
});

route.put('/', (req, res, next)=>{
    /**
     * update exam information
     */
});