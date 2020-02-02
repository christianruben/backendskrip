const express = require('express');
const route = express.Router();
const model_department = require('../../model/department');
const verifyToken = require('../verification');

route.get('/', verifyToken, (req, res, next)=>{
    if(req.admin){
        let search = req.query.search;
        let sortby = req.query.sortby;
        let sort   = req.query.sort;
        let rows   = req.query.rows;
        let index  = (req.query.page - 1) * rows;
        let data_rows;
        model_department.departmentList({search: search, orderby: sortby, order: sort, index: index, len: rows}, (result)=>{
            if(result.err){
                return res.status(500).send({response: null, message: result.err.message});
            }else{
                data_rows = result.res;
                model_department.getAllRows(search, (result)=>{
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

route.get('/light', verifyToken, (req, res)=>{
    let search = req.query.search;
    let data_rows = [];

    model_department.listLightDepartment({search: search}, (result)=>{
        if(result.err){
            data_rows = [];
        }else{
            let arr = JSON.parse(JSON.stringify(result.res));
            arr.forEach(element => {
                data_rows.push({value: element.department_name, id: element.time_id});
            });
        }
        return res.status(200).send({response: data_rows});
    })
});

route.post('/', verifyToken, (req, res, next)=>{
    if(req.admin){
        let name = req.body.name;
        model_department.createDepartment({department_name: name}, (result)=>{
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

route.delete('/', verifyToken, (req, res, next)=>{
    if(req.admin){
        let id = req.body.id;
        model_department.deleteDepartment({id: id}, (result)=>{
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

route.put('/', verifyToken, (req, res, next)=>{
    if(req.admin){
        let id = req.body.id;
        let name = req.body.name;
        model_department.updateDepartment({department_id: id, department_name: name}, (result)=>{
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