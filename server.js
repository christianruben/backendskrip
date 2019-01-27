const cluster = require('cluster');
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
    const server = app.listen(port, ()=>{
        console.log(`Express server listening on port = ${port}`)
    });
}