const spdy = require('spdy');
const express = require('express');
const index = require('./src/web');
const cluster = require('cluster');
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 8080;
const app = express();

const options = {
    key: fs.readFileSync(__dirname + '/localhost.key'),
    cert: fs.readFileSync(__dirname + '/localhost.crt')
}
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

    // spdy
    // .createServer(options, app)
    // .listen(port, (error) => {
    //     if (error) {
    //     console.error(error)
    //     return process.exit(1)
    //     } else {
    //     console.log('Listening on port: ' + port + '.')
    //     }
    // })
}