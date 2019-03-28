const express = require('express');
const route = express.Router();
const verifyToken = require('../verification');
const model_class = require('../../model/class')

route.get('/', verifyToken, (req, res, next)=>{
    // get list news
    if(!req.admin){
        return res.status(500).send({response: null, message: 'Failed to authenticate token.'});
    }
    model_class.loadAll((err, result, field)=>{
        if(err){
            return res.status(500).send({response: null, message: err});
        }
        if(res){
            let arr = JSON.parse(JSON.stringify(result));
            let send = {name:[], id: [], dept: []}
            arr.forEach(element => {
                send.name.push(element.class_name)
                send.id.push(element.class_id)
                send.dept.push(element.department_id)
            });
            return res.status(200).send({response: send, message: err});
        }else{
            return res.status(500).send({response: null, message: 'Tidak ada data'});
        }
    })
});

route.get('/:id', verifyToken, (req, res, next)=>{
    // get detail news
});

route.post('/', verifyToken, (req, res, next)=>{
    // craete news
    if(req.admin){

    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.delete('/', verifyToken, (req, res, next)=>{
    // delete news
    if(req.admin){

    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.put('/', verifyToken, (req, res, next)=>{
    // update newst
    if(req.admin){

    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

module.exports = route;