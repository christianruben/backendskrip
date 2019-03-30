const express = require('express');
const route = express.Router();
const model_news = require('../../model/news');
const verifyToken = require('../verification');

route.get('/', verifyToken, (req, res, next)=>{
    // get list news
    let search_query    = req.params.search;
    let rows = 10;
    let index  = (req.query.page - 1) * rows;
    let data_rows;
    
    model_news.listNews({search: search_query, orderby: "datecreated", order: "ASC", len: rows}, (result)=>{
        if(result.err){
            return res.status(500).send({response: null, message: result.err.message})
        }
        data_rows = result;
        model_news.getAllRows(search_query, (result)=>{
            if(result.err){
                return res.status(500).send({response: null, message: result.err.message})
            }
            return res.status(200).send({response: {table: data_rows, len: result.res[0].countall}});
        });
    });
    
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