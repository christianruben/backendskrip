const express = require('express');
const route = express.Router();
const model_student = requie('../model/student');
const model_account = require('../../model/account');
const verifyToken = require('../verification');

route.get('/', verifyToken, (req, res, next)=>{
    // get all list student
    let search = req.query.search;
    let sortby = req.query.sortby;
    let sort   = req.query.sort;
    let rows   = req.query.rows;
    let index  = (req.query.page - 1) * rows;
    let data_rows;
    model_student.listStudent({search: search, orderby: sortby, order: sort, index: index, len: rows}, (err, result, field)=>{
        if(err){
            return res.status(500).send({response: null, message: err.message})
        }
        data_rows = result;
        model_student.getAllRows(search, (err, result, field)=>{
            if(err){
                return res.status(500).send({response: null, message: err.message})
            }
            return res.status(200).send({response: {table: data_rows, len: result[0].countall}});
        })
    });
});

route.get('/:id', verifyToken, (req, res, next)=>{
    // get student by his id
    let id = req.params.id;
    model_account.getAccountStudent({id: id}, (err, result, field)=>{
        if(err){
            return res.status(500).send({result: null, message: 'Terjadi kesalahan dalam permintaan'});
        }

        if(result.length > 0){
            let {username, picture, name, relationship, phone_number, address, born_date, religion} = result[0];
            
            return res.status(200).send({result: {
                    username: username,
                    picture: picture,
                    name: name,
                    relationship: relationship,
                    phonenumber: phone_number,
                    address: address,
                    borndate: born_date,
                    religion: religion
                }, message: null
            })
        }else{
            return res.status(404).send({result: null, message: 'profile tidak ditemukan'})
        }
    });
});

route.get('/class/:id', verifyToken, (req, res, next)=>{
    // get list student by class id
    let classid = req.params.id;
    let search = req.query.search;
    let sortby = req.query.sortby;
    let sort   = req.query.sort;
    let rows   = req.query.rows;
    let index  = (req.query.page - 1) * rows;
    let data_rows;
    model_student.listClassStudent({classid: classid, search: search, orderby: sortby, order: sort, index: index, len: rows}, (err, result, field)=>{
        if(err){
            return res.status(500).send({response: null, message: err.message})
        }
        data_rows = result;
        model_student.getAllRowsClass(classid, search, (err, result, field)=>{
            if(err){
                return res.status(500).send({response: null, message: err.message})
            }
            return res.status(200).send({response: {table: data_rows, len: result[0].countall}});
        })
    });
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