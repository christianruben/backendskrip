const express = require('express');
const route = express.Router();
const verifyToken = require('../verification');

route.get('/', verifyToken, (req, res, next)=>{
    // get all list student
});

route.get('/:id', verifyToken, (req, res, next)=>{
    // get student by his id
});

route.get('/class/:id', verifyToken, (req, res, next)=>{
    // get list student by class id
    
});

route.post('/', verifyToken, (req, res, next)=>{
    // create student data
    if(req.admin){
        let NIS = req.body.nis;
        let name = req.body.name;
        let gender = req.body.gender;
        let religion = req.body.religion;
        let bornPlace = req.body.bornPlace;
        let bornDate = req.body.bornDate;
        let fatherName = req.body.fatherName;
        let motherName = req.body.motherName;
        let address = req.body.address;
        let phoneNumber = req.body.phoneNumber;
        let classid = req.body.classid;
    }else{
        res.status(402).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.delete('/', verifyToken, (req, res, next)=>{
    // delete student
    if(req.admin){
        let studentid = req.body.studentid;
    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.put('/', verifyToken, (req, res, next)=>{
    // update student
    if(req.admin || req.student){
        let NIS = req.body.nis;
        let name = req.body.name;
        let gender = req.body.gender;
        let religion = req.body.religion;
        let bornPlace = req.body.bornPlace;
        let bornDate = req.body.bornDate;
        let fatherName = req.body.fatherName;
        let motherName = req.body.motherName;
        let address = req.body.address;
        let phoneNumber = req.body.phoneNumber;
        let classid = req.body.classid;
    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

module.exports = route;