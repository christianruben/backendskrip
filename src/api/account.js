const express = require('express');
const route = express.Router();
const verifyToken = require('../verification');
const user_model = require('../../model/account');
const admin_model   = require('../../model/admin');
const upload        = require('../upload');

route.get('/', verifyToken, (req, res, next)=>{
    // get list news

});

route.get('/teacher/:id', verifyToken, (req, res, next)=>{
    // get detail news
    const id = req.params.id;
    user_model.getAccountTeacher({id: id}, (err, res, field)=>{
        if(err){
            return res.status(500).send({auth: false, message: 'Failed to load data', data: null});
        }else{
            if(res.length > 0){
                let data = {
                    name: res[0].name,
                    picture: res[0].picture,
                    username: res[0].username
                }
                return res.status(200).send({auth: true, message: null, data: data});
            }else{
                return res.status(400).send({auth: false, message: 'Cannot find', data: null});
            }
        }
    });
});

route.get('/student/:id', verifyToken, (req, res, next)=>{
    const id = req.params.id;
    user_model.getAccountTeacher({id: id}, (err, res, field)=>{
        if(err){
            return res.status(500).send({auth: false, message: 'Failed to load data', data: null});
        }else{
            if(res.length > 0){
                let data = {
                    name: res[0].name,
                    picture: res[0].picture,
                    username: res[0].username
                }
                return res.status(200).send({auth: true, message: null, data: data});
            }else{
                return res.status(400).send({auth: false, message: 'Cannot find', data: null});
            }
        }
    });
});

route.get('/me', verifyToken, (req, res, next)=>{
    if(req.admin){
        admin_model.getAdmin({id:req.userId}, (err, res, field)=>{
            if(err){
                return res.status(500).send({auth: false, message: 'Failed to load data', data: null});
            }else{
                if(res.length > 0){
                    let data = {
                        name: `${res[0].firstname} ${res[0].lastname}`,
                        picture: res[0].picture
                    }
                    return res.status(200).send({auth: true, message: null, data: data});
                }else{
                    return res.status(400).send({auth: false, message: 'Cannot find', data: null});
                }
            }
        });
    }else{
        if(req.teacher){
            user_model.getAccountTeacher({id: req.userId}, (err, res, field)=>{
                if(err){
                    return res.status(500).send({auth: false, message: 'Failed to load data', data: null});
                }else{
                    if(res.length > 0){
                        let data = {
                            name: res[0].name,
                            picture: res[0].picture,
                            username: res[0].username
                        }
                        return res.status(200).send({auth: true, message: null, data: data});
                    }else{
                        return res.status(400).send({auth: false, message: 'Cannot find', data: null});
                    }
                }
            });
        }
        if(req.student){
            user_model.getAccountStudent({id: req.userId}, (err, res, field)=>{
                if(err){
                    return res.status(500).send({auth: false, message: 'Failed to load data', data: null});
                }else{
                    if(res.length > 0){
                        let data = {
                            name: res[0].name,
                            picture: res[0].picture,
                            username: res[0].username
                        }
                        return res.status(200).send({auth: true, message: null, data: data});
                    }else{
                        return res.status(400).send({auth: false, message: 'Cannot find', data: null});
                    }
                }
            });
        }
    }
});

route.post('/', verifyToken, upload.single('imgusr'), (req, res, next)=>{
    // craete news
    if(req.admin){
        let ownerid = req.body.ownerid;
        let level = req.body.level;
        let username = req.body.username;
        let filename = req.file.filename;
    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.delete('/', verifyToken, (req, res, next)=>{
    // delete news
    if(req.admin){
        let id = req.body.id;
        user_model.deleteAccount({id: id}, (result)=>{
            if(result.status === -1){
                return res.status(500).send({auth: false, message: result.msg, data: null});
            }else if(result.status === 0){
                return res.status(400).send({auth: false, message: result.msg, data: null});
            }else{
                let data = {
                    redirect: true,
                }
                return res.status(200).send({auth: true, message: null, data: data});
            }
        });
    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.put('/', verifyToken, (req, res, next)=>{
    // update news
    if(req.admin){
        let userid = req.body.userId;
        let username = req.body.username;
    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.put('/picture', verifyToken, upload.single('imgusr'), (req, res, next)=>{
    if(!req.file){
        return res.status(204).send({auth: false, message: "Upload failed", data: null});
    }
    let filename = req.file.filename;
    let userid = req.body.iduser;
    user_model.updatePicture({id: userid, picture: picture}, (result)=>{
        if(result.status === 0){
            return res.status(400).send({auth: false, message: result.msg, data: null});
        }else if(result.status === -1){
            return res.status(500).send({auth: false, message: result.msg, data: null});
        }else{
            return res.status(200).send({auth: true, message: null, data: {redirect: true}});
        }
    });
});

module.exports = route;