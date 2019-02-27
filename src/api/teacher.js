const express = require('express');
const route = express.Router();
const verifyToken = require('../verification');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/uploads');
    },
    filename: (req, file, cb)=>{
        cb(null, `${file.fieldname}-${Date.now()}.jpg`);
    }
});

let upload = multer({storage: storage});

route.get('/', verifyToken, (req, res, next)=>{
    /**
     * get study list
     */
    let search = req.query.search;
    let sortby = req.query.sortby;
    let sort   = req.query.sort;
    let rows   = req.query.rows;
    let index  = (req.query.page - 1) * rows;

});

route.get('/:id', verifyToken, (req, res, next)=>{
    /**
     * get study detail
     */
    let id = req.path.id;

});

route.post('/', verifyToken, (req, res, next)=>{
    /**
     * update study information
     */
    if(req.admin){

    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.delete('/', verifyToken, (req, res, next)=>{
    /**
     * delete study
     */
    if(req.admin){

    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.put('/', verifyToken, (req, res, next)=>{
    /**
     * update study
     */
    if(req.admin || req.teacher){

    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

module.exports = route;