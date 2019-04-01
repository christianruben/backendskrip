const express = require('express');
const route = express.Router();
const verifyToken = require('../verification');
const model_report = require('../../model/report');

route.get('/', verifyToken, (req, res, next)=>{
    if(req.teacher || req.admin){

    }else{
        return res.status(500).send({response: null, message: "authenticate failed"});
    }
});

route.get('/:id', (req, res)=>{
    
});

route.post('/', verifyToken, (req, res)=>{
    if(req.teacher){
        const studentid = req.body.studentid;
        const teacherid = req.ownerid;
        const valabs    = req.body.abs;
        const valhw     = req.body.hw;
        const valms     = req.body.ms;
        const valsms    = req.body.sms;
        const smsid     = req.body.smsid;
        const studyid   = req.body.studyid;
        model_report.createReport(
            {
                student_id: studentid, 
                teacher_id: teacherid, 
                abs: valabs, 
                hw: valhw, 
                mid: valms, 
                sem: valsms, 
                semester_id: smsid, 
                study_id: studyid
            }, result=>{
                if(result.err){
                    return res.status(500).send({response: null, message: result.err.message});
                }
                
            }
        );
    }else{
        return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});
