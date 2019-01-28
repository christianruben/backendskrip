const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');
route.use(bodyParser.urlencoded({extended: false}));
route.use(bodyParser.json());

route.get('/', (req, res, next)=>{
    /**
     * get study list
     */
});

route.get('/class/:id', (req, res, next)=>{
    /**
     * get study list from one class
     */
});

route.get('/:id', (req, res, next)=>{
    /**
     * get study detail
     */
});

route.post('/', (req, res, next)=>{
    /**
     * update study information
     */
});

route.delete('/', (req, res, next)=>{
    /**
     * delete study
     */
});

route.put('/', (req, res, next)=>{
    /**
     * update study
     */
});