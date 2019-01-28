const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');
route.use(bodyParser.urlencoded({extended: false}));
route.use(bodyParser.json());

route.get('/', (req, res, next)=>{
    /**
     * get list of admin
     */
});

route.get('/:id', (req, res, next)=>{
    /**
     * get admin detail
     */
});

route.post('/', (req, res, next)=>{
    /**
     * create admin
     */
});

route.delete('/', (req, res, next)=>{
    /**
     * delete admin
     */
});

route.put('/:id', (req, res, next)=>{
    /**
     * update admin
     */
});

route.put('/picture/:id', (req, res, next)=>{
    /**
     * update admin picture
     */
});
