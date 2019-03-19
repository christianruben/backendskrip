const express = require('express');
const route = express.Router();
const newstbl = require('../../model/news');
const verifyToken = require('../verification');

route.get('/', verifyToken, (req, res, next)=>{
    // get list news
    let search_query    = req.params.search;
    let index           = req.params.index;
    let orderby         = req.params.orderby;
    
});

route.get('/:id', verifyToken, (req, res, next)=>{
    // get detail news
    let news_id = req.params.newsid;

});

route.post('/', verifyToken, (req, res, next)=>{
    // craete news
    if(req.admin){
        let title = req.body.title;
        let content = req.body.content;
    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.delete('/', verifyToken, (req, res, next)=>{
    // delete news
    if(req.admin){
        let newsid = req.query.newsid;
    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

route.put('/', verifyToken, (req, res, next)=>{
    // update news
    if(req.admin){
        let newsid = req.body.news_id;
        let title  = req.body.title;
        let content = req.body.content;
    }else{
        res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
});

module.exports = route;