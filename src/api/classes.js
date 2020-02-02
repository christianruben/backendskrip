const express = require('express');
const route = express.Router();
const verifyToken = require('../verification');
const model_class = require('../../model/class')

route.get('/', verifyToken, (req, res)=>{
    // get list news
    if(!req.admin){
        return res.status(500).send({response: null, message: 'Failed to authenticate token.'});
    }else{
        let search = req.query.search;
        let sortby = req.query.sortby;
        let sort   = req.query.sort;
        let rows   = req.query.rows;
        let index  = (req.query.page - 1) * rows;
        let data_rows;
        model_class.listClass({search: search, orderby: sortby, order: sort, index: index, len: rows}, result=>{
            if(result.err){
                return res.status(500).send({response: null, message: result.err});
            }
            data_rows = result.res;
            model_class.getAllRows(search, result=>{
                if(result.err){
                    return res.status(500).send({response: null, message: result.err});
                }
                return res.status(200).send({response: {table: data_rows, len: result.res[0].countall}});
            });
        });
    }
});

route.get('/light', verifyToken, (req, res)=>{
    let search = req.query.search;
    let data_rows = [];

    model_class.listLightClass({search: search}, (result)=>{
        if(result.err){
            data_rows = [];
        }else{
            let arr = JSON.parse(JSON.stringify(result.res));
            arr.forEach(element => {
                data_rows.push({value: `${element.class_name}`, id: element.class_id});
            });
        }
        return res.status(200).send({response: data_rows});
    })
});

route.get('/all', verifyToken, (req, res)=>{
    if(!req.admin){
        return res.status(500).send({response: null, message: 'Failed to authenticate token.'});
    }
    model_class.loadAll((result)=>{
        if(result.err){
            return res.status(500).send({response: null, message: result.err});
        }
        if(result.res){
            let arr = JSON.parse(JSON.stringify(result.res));
            let send = []
            arr.forEach(element => {
                send.push({'name': element.class_name, 'id': element.class_id, 'dept': element.department_id})
            });
            return res.status(200).send({response: JSON.stringify(send), message: null});
        }else{
            return res.status(500).send({response: null, message: 'Tidak ada data'});
        }
    })
})

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