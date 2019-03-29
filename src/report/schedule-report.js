const express = require('express');
const route = express.Router();
const queue_model = require('../../model/queue');
const schedule_model = require('../../model/schedule');

route.get('/', (req, res, next)=>{
    // let queue_id = req.query.queue_id;
    // queue_model.isQueueAvailable(queue_id, (result)=>{
    //     if(result.status === 0){
    //         res.status(400).send(result.msg);
    //     }else if(result.status === -1){
    //         res.status(500).send(result.msg);
    //     }else{
        schedule_model.listScheduleClass({Class: 1, search: "", orderby: "time", order: "ASC", orderby2: "day_id", order2: "ASC", index: 0, len: 10}, (err, result, field)=>{
            if(err){
                res.status(500).send("Terjadi kesalahan dalam server");
            }else{
                let table = {senin:[], selasa: [], rabu: [], kamis: [], jumat: []};
                result.forEach(element => {
                    if(element.day_name === "senin"){
                        table.senin.push(element);
                    }else if(element.day_name === "selasa"){
                        table.selasa.push(element);
                    }else if(element.day_name === "rabu"){
                        table.rabu.push(element);
                    }else if(element.day_name === "kamis"){
                        table.kamis.push(element);
                    }else if(element.day_name === "jumat"){
                        table.jumat.push(element);
                    }
                });
                let rows = Math.max(table.senin.length, table.selasa.length, table.rabu.length, table.kamis.length, table.jumat.length);
                res.status(200).render('schedule', {title: "Schedule", schedule: table, rows: rows});
            }
        });
    //     }
    // })
});

route.post('/request', (req, res, next)=>{
    // let type = req.body.type;
    // if(type === "siswa"){

    // }else if(type === "guru"){

    // }else{
    //     res.status(400).send({})
    // }
});

module.exports = route;