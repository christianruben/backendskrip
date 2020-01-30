const express = require('express');
const route = express.Router();
const model_study = require('../../model/study');
const verifyToken = require('../verification');

route.get('/', verifyToken, (req, res, next)=>{
    /**
     * get study list
     */
    let search = req.query.search;
    let sortby = req.query.sortby;
    let sort   = req.query.sort;
    let rows   = req.query.rows;
    let index  = (req.query.page - 1) * rows;
    let data_rows;
    model_study.listStudy({search: search, orderby: sortby, order: sort, index: index, len: rows}, (result)=>{
        if(result.err){
            return res.status(500).send({response: null, message: result.err.message});
        }
        data_rows = result.res;
        model_study.getAllRows(search, (result)=>{
            if(result.err){
                return res.status(500).send({response: null, message: result.err.message});
            }
            return res.status(200).send({response: {table: data_rows, len: result.res[0].countall}});
        });
    })
});

route.get('/light', verifyToken, (req, res)=>{
    let search      = req.query.search;
    let data_rows   = [];
    model_study.listLightStudy({search: search}, (result)=>{
        if(result.err){
            data_rows = [];
        }else{
            let arr = JSON.parse(JSON.stringify(result.res));
            arr.forEach(element => {
                data_rows.push({value: element.study_name, id: element.study_id});
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

    model_study.getStudy({id: id}, (result)=>{
        if(result.err){
            return res.status(500).send({data: false, message: result.err.message});
        }
        if(result.res.length > 0){
            return res.status(200).send({data: result[0], message: null});
        }else{
            return res.status(200).send({data: false, message: 'Pelajaran tidak ditemukan'});
        }
    });
});

route.post('/', verifyToken, (req, res, next)=>{
    /**
     * update study information
     */
    if(req.admin){
        let studyname = req.body.studyname;
        let studycode = req.body.studycode;

        model_study.createStudy({study_name: studyname, study_code: studycode}, response=>{
            if(response.status == 1){
                return res.status(200).send({data: true, message: null});
            }else{
                return res.status(500).send({data: false, message: response.err});
            }
        });
    }else{
        return res.status(402).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.delete('/', verifyToken, (req, res, next)=>{
    /**
     * delete study
     */
    if(req.admin){
        let id = req.body.id;

        model_study.deleteStudy({id: id}, response=>{
            if(response.status == 1){
                return res.status(200).send({data: true, message: null});
            }else{
                return res.status(500).send({data: false, message: response.err});
            }
        });
    }else{
        return res.status(402).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.put('/', verifyToken, (req, res, next)=>{
    /**
     * update study
     */
    if(req.admin){
        console.log(req.body.studyname);
        let id          = req.body.id;
        let studyname   = req.body.studyname;
        let studycode   = req.body.studycode;

        model_study.updateStudy({study_name: studyname, study_code: studycode, id: id}, response=>{
            if(response.status){
                return res.status(200).send({data: true, message: null});
            }else{
                return res.status(500).send({data: false, message: response.err});
            }
        });
    }else{
        return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

module.exports = route;