const cluster = require('cluster');
const http = require('http');
const fs = require('fs');

const port = process.env.PORT || 3000;
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
    const app = require('./app');
    http.createServer(app).listen(port, ()=>{
        console.log(`Express server listening on port = ${port}`)
    })
    // https.createServer({
    //     key: fs.readFileSync('localhost.key'),
    //     cert: fs.readFileSync('localhost.crt')
    // }, app).listen(port, ()=>{
    //     console.log(`Express server listening on port = ${port}`)
    // });
}