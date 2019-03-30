const express = require('express');
const route = express.Router();
const model_time = require('../../model/time');
const verifyToken = require('../verification');

route.get('/', verifyToken, (req, res)=>{
    if(req.admin){
        let search = req.query.search;
        let sortby = req.query.sortby;
        let sort   = req.query.sort;
        let rows   = req.query.rows;
        let index  = (req.query.page - 1) * rows;
        let data_rows;
        model_time.listTime({search: search, orderby: sortby, order: sort, index: index, len: rows}, (result)=>{
            if(result.err){
                return res.status(500).send({response: null, message: result.err.message});
            }else{
                data_rows = result.res;
                model_time.getAllRows(search, (result)=>{
                    if(result.err){
                        return res.status(500).send({response: null, message: result.err.message});
                    }
                    return res.status(200).send({response: {table: data_rows, len: result.res[0].countall}});
                });
            }
        });
    }else{
        return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.post('/', verifyToken, (req, res)=>{
    if(req.admin){
        let name = req.body.name;
        let timeStart = req.body.time_start;
        let timeEnd = req.body.time_end;
        model_time.createTime({time_name: name, time_start: timeStart, time_end: timeEnd}, (result)=>{
            if(result.err){
                return res.status(500).send({response: null, message: result.err.message});
            }else{
                return res.status(200).send({response: true, message: null});
            }
        });
    }else{
        return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.put('/', verifyToken, (req, res)=>{
    if(req.admin){
        let id = req.body.id;
        let name = req.body.name;
        let timeStart = req.body.time_start;
        let timeEnd = req.body.time_end;
        model_time.updateTime({id: id, time_name: name, time_start: timeStart, time_end: timeEnd}, (result)=>{
            if(result.err){
                return res.status(500).send({response: null, message: result.err.message});
            }else{
                return res.status(200).send({response: true, message: null});
            }
        });
    }else{
        return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.delete('/', verifyToken, (req, res)=>{
    if(req.admin){
        let id = req.body.id;
        model_time.deleteTime({id: id}, (result)=>{
            if(result.err){
                return res.status(500).send({response: null, message: result.err.message});
            }else{
                return res.status(200).send({response: true, message: null});
            }
        });
    }else{
        return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

module.exports = route;