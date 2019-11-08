// File System Module - fs
// =======================

const express = require('express');
const app = express();
const fs = require('fs');
const notificationService = require('./notification-service')

app.get('/', (req, res) => {
    res.send({
        message: 'express server works!'
    });
});

app.get('/employees', (req, res) => {
    const employeeLogic = require('./employee-logic');
    const employees = employeeLogic.getAllEmployees();

    res.status(200).send(employees);
})

app.use('/employeeStatusReport/:empId', (req, res, next) => {
    console.log(`rqeuested employee status report on ${req.params.empId}`);
    next();
})

app.get('/employeeStatusReport/:empId', (req, res) => {

    console.log('send an IO command to OS and set a callback to be called by the event loop once finished');

    // fs.readFile('./file-to-stream.txt', (err, data) => {
    //     if (err) {
    //         res.stat(500).send(err);
    //     }

    //     console.log('IO finished, event loop is now running the callback');
    //     res.status(200)
    //         .attachment('file.txt')
    //         .send(data);
    // });

    
    const readStream = fs.createReadStream('./file-to-stream.txt');
    readStream.pipe(res);
    
    readStream.on('open',()=>{
        notificationService.emit('notify','the file is open');
    })

    readStream.on('data',()=>{
        notificationService.emit('notify','data chunk is read!');
    })

    readStream.on('close',()=>{
        notificationService.emit('notify','the file is closed');
    })


    
    // Pipe to writable stream - backup The File
    // if(!fs.existsSync('./Backup')){
    //     fs.mkdirSync('./Backup');
    // }
    // readStream.pipe(fs.createWriteStream('./Backup/file-to-stream-backup.txt'));


    res.status(200).attachment('file.txt')
})

app.listen(3000, () => {
    console.log('server is listening');
});
