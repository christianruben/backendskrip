const express = require('express');
const route = express.Router();
const queue_model = require('../../model/queue');

route.get('/', (req, res, next)=>{
    let queue_id = req.query.queue_id;
    queue_model.isQueueAvailable(queue_id, (result)=>{
        if(result.status === 0){
            res.status(400).send(result.msg);
        }else if(result.status === -1){
            res.status(500).send(result.msg);
        }else{
            res.status(200);
        }
    })
});

module.exports = route;