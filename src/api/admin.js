const express = require('express');
const route = express.Router();
const model_admin = require('../../model/admin');
const verifyToken = require('../verification');
const upload = require('../upload');

route.get('/', (req, res)=>{
    /**
     * get list of admin
     */
    if(req.admin){
        let search = req.query.search;
        let sortby = req.query.sortby;
        let sort   = req.query.sort;
        let rows   = req.query.rows;
        let index  = (req.query.page - 1) * rows;
        let data_rows;
        model_admin.AdminList({search: search, orderby: sortby, order: sort, index: index, len: rows}, (err, result, field)=>{
            if(err){
                return res.status(500).send({response: null, message: err.message})
            }
            data_rows = result;
            model_admin.getAllRows(search, (err, result, field)=>{
                if(err){
                    return res.status(500).send({response: null, message: err.message});
                }
                return res.status(200).send({response: {table: data_rows, len: Math.floor(result[0].countall/rows)}});
            });
        });
    }else{
        return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.get('/:id',verifyToken, (req, res)=>{
    /**
     * get admin detail
     */
    if(req.admin){
        let id = req.params.id;
        model_admin.getAdmin({id: id}, (err, result, field)=>{
            if(err){
                return res.status(500).send({response: null, message: err.message})
            }

            if(result.length > 0){
                const {firstname, lastname, username, picture} = result[0];
                return res.status(200).send({
                    response: {
                        username: username,
                        name: `${firstname} ${lastname}`,
                        picture: picture
                    },
                    message: null
                })
            }else{
                return res.status(404).send({response: null, message: 'profile tidak ditemukan'})
            }
        })
    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.post('/',verifyToken, upload.single('imgusr'), (req, res)=>{
    /**
     * create admin
     */
    if(req.admin){
        let filename = "";
        if(req.file.filename){
            filename = req.file.filename;
        }
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let username = req.body.username;
        let password = req.body.password;

        model_admin.CreateAdmin({firstname: firstname, lastname: lastname, username: username, password: password, image: filename}, response=>{
            if(response.status == 1){
                return res.status(200).send({response: true, message: null});
            }else{
                return res.status(500).send({response: false, message: response.err});
            }
        })
    }else{
        return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.delete('/:id',verifyToken, (req, res)=>{
    /**
     * delete admin
     */
    if(req.admin){
        let id = req.params.id;
        model_admin.DeleteAdmin({id: id}, response=>{
            if(response.status == 1){
                return res.status(200).send({response: true, message: null});
            }else{
                return res.status(500).send({response: false, message: response.err});
            }
        });
    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.put('/',verifyToken, (req, res)=>{
    /**
     * update admin
     */
    if(req.admin){
        let id = req.body.id;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let username = req.body.username;
        model_admin.UpdateAdmin({id: id, firstname: firstname, lastname: lastname, username: username}, response=>{
            if(response.status == 1){
                return res.status(200).send({response: true, message: null});
            }else{
                return res.status(500).send({response: false, message: response.err})
            }
        })
    }else{
        return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.put('/picture/:id',verifyToken, upload.single('imgusr'), (req, res)=>{
    /**
     * update admin picture
     */
    if(req.admin){
        let filename = "";
        if(req.file){
            filename = req.file.filename;
        }
        let id = req.params.id;
        model_admin.UpdateAdminImage({id: id, image: filename}, response=>{
            if(response.status == 1){
                return res.status(200).send({response: true, message: null});
            }else{
                return res.status(500).send({response: false, message: response.err})
            }
        });
    }else{
        return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.put('/password/:id', verifyToken, (req, res)=>{
    if(req.admin){
        let id = req.params.id;
        let password = req.body.password;
        let newpassword = req.body.newpassword;
        model_admin.UpdateAdminPass({id: id, lastpass: password, newpass: newpassword}, response=>{
            if(response.status == 1){
                return res.status(200).send({response: true, message: null});
            }else{
                return res.status(500).send({response: false, message: response.err})
            }
        });
    }else{
        return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

module.exports = route;