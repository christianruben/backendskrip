const express = require('express');
const route = express.Router();
const upload        = require('../upload');
const model_student = require('../../model/student');
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
    model_student.listStudent({search: search, orderby: sortby, order: sort, index: index, len: rows}, (result)=>{
        if(result.err){
            return res.status(500).send({response: null, message: result.err.message})
        }
        data_rows = result.res;
        model_student.getAllRows(search, (result)=>{
            if(result.err){
                return res.status(500).send({response: null, message: result.err.message})
            }
            return res.status(200).send({response: {table: data_rows, len: result.res[0].countall}});
        })
    });
});

route.get('/:id', verifyToken, (req, res, next)=>{
    // get student by his id
    let id = req.params.id;
    model_account.getAccountStudent({id: id}, (result)=>{
        if(result.err){
            return res.status(500).send({result: null, message: 'Terjadi kesalahan dalam permintaan'});
        }
        if(result.res.length > 0){
            let {username, picture, name, phone_number, address, born_date, religion} = result.res[0];
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
    model_student.listClassStudent({classid: classid, search: search, orderby: sortby, order: sort, index: index, len: rows}, (result)=>{
        if(result.err){
            return res.status(500).send({response: null, message: result.err.message})
        }
        data_rows = result.res;
        model_student.getAllRowsClass(classid, search, (result)=>{
            if(result.err){
                return res.status(500).send({response: null, message: result.err.message})
            }
            return res.status(200).send({response: {table: data_rows, len: result.res[0].countall}});
        })
    });
});

route.post('/', verifyToken, upload.single('imgusr'), (req, res, next)=>{
    // create student data
    if(req.admin){
        let filename = "";
        if(req.file){
            filename = req.file.filename;
        }
        let NIS         = req.body.nis;
        let name        = req.body.name;
        let gender      = req.body.gender.toLowerCase();
        let religion    = req.body.religion;
        let bornPlace   = req.body.bornPlace;
        let bornDate    = req.body.bornDate;
        let fatherName  = req.body.fatherName;
        let motherName  = req.body.motherName;
        let address     = req.body.address;
        let phoneNumber = req.body.phoneNumber;
        let classid     = req.body.classid;
        model_student.createStudent(
            {
                nis: NIS, 
                name: name, 
                gender: gender, 
                religion: religion, 
                born_place: bornPlace, 
                born_date: bornDate, 
                father_name: fatherName, 
                mother_name: motherName, 
                address: address, 
                phone_number: phoneNumber, 
                class_id: classid
            }, response=>{
                if(response.status == 1){
                    if(filename){
                        model_account.createAccount({idowner: response.userid, level: 1, username: `${name}${NIS}`, password: `${phoneNumber}${NIS}`, picture: filename}, response=>{
                            if(response.status == 1){
                                return res.status(200).send({data: true, message: null});
                            }else{
                                return res.status(500).send({data: false, message: response.err});
                            }
                        });
                    }else{
                        model_student.deleteStudent({id: response.userid}, response=>{
                            if(response.status == 1){
                                return res.status(200).send({data: true, message: null});
                            }else{
                                return res.status(500).send({data: false, message: response.err});
                            }
                        })
                    }
                }else{
                    return res.status(500).send({data: false, message: response.err});
                }
            }
        )
    }else{
        res.status(402).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.delete('/', verifyToken, (req, res, next)=>{
    // delete student
    if(req.admin){
        let id = req.body.id;
        model_student.deleteStudent({id: id}, response=>{
            if(response.status == 1){
                model_account.deleteAccount({id: id, level: 1}, response=>{
                    if(response.status == 1){
                        return res.status(200).send({data: true, message: null});
                    }else{
                        return res.status(500).send({data: false, message: response.err});
                    }
                });
            }else{
                return res.status(500).send({data: false, message: response.err});
            }
        });
    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.put('/', verifyToken, upload.single('imgusr'), (req, res, next)=>{
    // update student
    if(req.admin || req.student){
        let filename = null;
        if(req.file){
            filename = req.file.filename;
        }
        let id          = req.body.id
        let NIS         = req.body.nis;
        let name        = req.body.name;
        let gender      = req.body.gender.toLowerCase();
        let religion    = req.body.religion;
        let bornPlace   = req.body.bornPlace;
        let bornDate    = req.body.bornDate;
        let fatherName  = req.body.fatherName;
        let motherName  = req.body.motherName;
        let address     = req.body.address;
        let phoneNumber = req.body.phoneNumber;
        let classid     = req.body.classid;
        model_student.updateStudent(
            {
                id: id, 
                nis: NIS, 
                name: name, 
                gender: gender, 
                religion: religion, 
                born_place: bornPlace, 
                born_date: bornDate, 
                father_name: fatherName, 
                mother_name: motherName,
                address: address,
                phone_number: phoneNumber,
                classid: classid
            }, response=>{
                if(response.status == 1){
                    if(filename){
                        model_account.updatePicture({id: id, level: 1, picture: filename}, response=>{
                            if(response.status == 1){
                                return res.status(200).send({data: true, message: null});
                            }else{
                                return res.status(500).send({data: false, message: response.err});
                            }
                        });
                    }else{
                        return res.status(200).send({data: true, message: null});
                    }
                }else{
                    return res.status(500).send({data: false, message: response.err});
                }
            }
        )
    }else{
        return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

module.exports = route;