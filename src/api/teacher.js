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
        let NIP = req.body.nip;
        let name = req.body.name;
        let gender = req.body.gender;
        let religion = req.body.religion;
        let bornPlace = req.body.bornPlace;
        let bornDate = req.body.bornDate;
        let address = req.body.address;
        let phoneNumber = req.body.relationship;
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
        let NIP = req.body.nip;
        let name = req.body.name;
        let gender = req.body.gender;
        let religion = req.body.religion;
        let bornPlace = req.body.bornPlace;
        let bornDate = req.body.bornDate;
        let address = req.body.address;
        let phoneNumber = req.body.relationship;
    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

module.exports = route;