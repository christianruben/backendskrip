const express = require('express');
const route = express.Router();
const verifyToken = require('../verification');
const model_teacher = require('../../model/teacher');
const model_account = require('../../model/account');
const upload        = require('../upload');

route.get('/', verifyToken, (req, res)=>{
    /**
     * get study list
     */
    let search = req.query.search;
    let sortby = req.query.sortby;
    let sort   = req.query.sort;
    let rows   = req.query.rows;
    let index  = (req.query.page - 1) * rows;
    let data_rows;
    model_teacher.listTeacher({search: search, orderby: sortby, order: sort, index: index, len: rows}, (result)=>{
        if(result.err){
            return res.status(500).send({response: null, message: result.err.message});
        }
        data_rows = result.res;
        model_teacher.getAllRows(search, (result)=>{
            if(result.err){
                return res.status(500).send({response: null, message: result.err.message})
            }
            return res.status(200).send({response: {table: data_rows, len: result.res[0].countall}, message: null});
        })
    });
});

route.get('/light', verifyToken, (req, res)=>{
    let search = req.query.search;
    let data_rows = [];
    model_teacher.listLightTeacher({search: search}, (err, result, field)=>{
        if(err){
            data_rows = [];
        }else{
            let arr = JSON.parse(JSON.stringify(result));
            arr.forEach(element => {
                data_rows.push({value: `${element.NIP} - ${element.name}`, id: element.teacher_id});
            });
        }
        return res.status(200).send({response: data_rows});
    })
});

route.get('/:id', verifyToken, (req, res, next)=>{
    /**
     * get study detail
     */
    let id = req.params.id;
    model_account.getAccountTeacher({id: id}, (err, result, field)=>{
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

route.post('/', verifyToken, upload.single('imgusr'), (req, res, next)=>{
    /**
     * update study information
     */
    // if(!req.file){
    //     return res.status(204).send({auth: false, message: "Upload failed", data: null});
    // }
    let filename = "";
    if(req.file){
        filename = req.file.filename;
    }
    if(req.admin){
        let NIP             = req.body.nip;
        let name            = req.body.name;
        let gender          = req.body.gender.toLowerCase();
        let religion        = req.body.religion;
        let bornPlace       = req.body.bornPlace;
        let bornDate        = req.body.bornDate;
        let address         = req.body.address;
        let phoneNumber     = req.body.phoneNumber;
        let relationship    = req.body.relationship.toLowerCase();
        model_teacher.createTeacher(
            {
                nip: NIP, 
                name: name, 
                gender: gender, 
                religion: religion, 
                born_place: bornPlace, 
                born_date: bornDate, 
                address: address,
                phone_number: phoneNumber,
                relationship: relationship
            }, (response)=>{
                if(response.status == 1){
                    model_account.createAccount({idowner: response.userid, level: 2, username: `${name}${NIP}`, password: `${phoneNumber}${NIP}`, picture: filename}, (result)=>{
                        if(result.status == 1){
                            return res.status(200).send({data: true, message: null});
                        }else{
                            return res.status(500).send({data: false, message: result.err});
                        }
                    })
                }else{
                    return res.status(500).send({data: false, message: response.err});
                }
            }
        )
    }else{
        return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.delete('/', verifyToken, (req, res, next)=>{
    /**
     * delete study
     */
    if(req.admin){
        const id = req.body.id;
        model_teacher.deleteTeacher({id: id}, response=>{
            if(response.status == 1){
                model_account.deleteAccount({id: id, level: 2}, response=>{
                    if(response.status == 1){
                        return res.status(200).send({data: true, message: null});
                    }else{
                        return res.status(500).send({data: false, message: response.err});
                    }
                });
                return res.status(200).send({data: true, message: null});
            }else{
                return res.status(500).send({data: false, message: response.err});
            }
        })
    }else{
        return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.put('/', verifyToken, upload.single('imgusr'), (req, res, next)=>{
    /**
     * update study
     */
    let filename = null;
    if(req.file){
        filename = req.file.filename;
    }
    if(req.admin || req.teacher){
        let id              = req.body.id;
        let NIP             = req.body.nip;
        let name            = req.body.name;
        let gender          = req.body.gender.toLowerCase();
        let religion        = req.body.religion;
        let bornPlace       = req.body.bornPlace;
        let bornDate        = req.body.bornDate;
        let address         = req.body.address;
        let phoneNumber     = req.body.phoneNumber;
        let relationship    = req.body.relationship.toLowerCase();

        model_teacher.updateTeacher(
            {
                id: id,
                nip: NIP,
                name: name,
                gender: gender,
                religion: religion,
                born_date: bornDate,
                born_place: bornPlace,
                address: address,
                phone_number: phoneNumber,
                relationship: relationship
            }, (response)=>{
                if(response.status == 1){
                    if(filename){
                        model_account.updatePicture({id: id, level: 2, picture: filename}, response=>{
                            if(response.status == 1){
                                return res.status(200).send({data: true, message: null});
                            }else{
                                return res.status(500).send({data: false, message: response.err});
                            }
                        })
                    }
                    return res.status(200).send({data: true, message: null});
                }else{
                    return res.status(500).send({data: false, message: response.err});
                }
            }
        );
    }else{
        return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

module.exports = route;