const express = require('express');
const index = require('./src/web');
const cluster = require('cluster');
const port = process.env.PORT || 8080;
const app = express();
if(cluster.isMaster){
    let cpuCount = require('os').cpus().length;
    for(let i = 0; i < cpuCount; i += 1){
        cluster.fork();
    }
    cluster.on('exit', worker =>{
        console.log(`worker ${worker.id} died :(`);
        cluster.fork();
    });
}else{
    app.use(express.static('public'));

    app.use('*', index);

    app.listen(port,  ()=>{
        console.log(`Express server listening on port = ${port}`)
    })
}