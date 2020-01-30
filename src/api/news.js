const express = require('express');
const route = express.Router();
const model_news = require('../../model/news');
const verifyToken = require('../verification');

route.get('/', verifyToken, (req, res, next)=>{
    // get list news
    let search = req.query.search;
    let sortby = req.query.sortby;
    let sort   = req.query.sort;
    let rows   = req.query.rows;
    let index  = (req.query.page - 1) * rows;
    let data_rows;
    
    model_news.listNews({search: search, orderby: sortby, order: sort, index: index, len: rows}, (result)=>{
        if(result.err){
            return res.status(500).send({response: null, message: result.err.message})
        }
        data_rows = result.res;
        model_news.getAllRows(search, (result)=>{
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

    model_news.getNews({id: news_id}, response=>{
        if(response.err){
            return res.status(500).send({response: null, message: result.err.message});
        }
        if(response.res.length > 0){
            const news = response.res[0];
            return res.status(200).send({response: {
                title: news.title,
                content: news.content,
                date: news.datecreated
            }, message: null});
        }else{
            return res.status(404).send({response: null, message: "Berita tidak di temukan"});
        }
    });
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
        model_news.deleteNews({id: newsid}, response=>{
            if(response.err){
                return res.status(500).send({response: null, message: response.err.message});
            }
            return res.status(200).send({response: true, message: null});
        });
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