// Cluster Mode
// =============

const cluster = require('cluster');

if (cluster.isMaster){
    // create workers
    console.log(`pid ${process.pid} : started master`);
    const clusterSize = 4;
    console.log(`cluster size is ${clusterSize}`);
    
    for(var i = 0; i < clusterSize; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

} else { // a worker is created:
    console.log(`pid ${process.pid} : started worker`);
    // create 'Employees' Server from 02.js
    require('./02.js');
}