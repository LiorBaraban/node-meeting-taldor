// A more complex example
// Express
// File System Module 
// Event Emitter Module
// =======================

const express = require('express');
const app = express();
const fs = require('fs');
const notificationService = require('./services/_notification-service');
require('./services/email-handler');
require('./services/sms-handler');


app.get('/', (req, res) => {
    res.send({
        message: 'express server works!'
    });
});

app.get('/employees', (req, res) => {
    const employeeLogic = require('./business-logics/employee-logic');
    const employees = employeeLogic.getAllEmployees();
    notificationService.emit('notify', 'somone got all employees');

    res.status(200).send(employees);
})

app.use('/employeeCard/:empId', (req, res, next) => {
    notificationService.emit('notify', `rqeuested employee status report on ${req.params.empId}`);
    next();
})

app.get('/employeeCard/:empId', (req, res) => {

    const employeeId = req.params.empId;
    const employeeLogic = require('./business-logics/employee-logic');
    const employee = employeeLogic.getEmployee(employeeId);

    console.log('send an IO command to OS and set a callback to be called by the event loop once finished');


    if (!fs.existsSync('./files')) {
        fs.mkdirSync('./files');
    }

    const filePath = `./files/${employeeId}`;

    const fileContent = `This is ${employee.name}'s Employee Card`;

    // #region Sync File Reading
    // fs.writeFileSync(filePath, fileContent)
    // const fileData = fs.readFileSync(filePath);
    // res.status(200).attachment('employeeReport.txt').send(fileContent);
    // console.log('finished GET employeeCard');
    // #endregion
    
    // #region Async File Reading
    // fs.writeFile(filePath, fileContent, () => {
    //     // console.log('file written')
    //     fs.readFile(filePath, (err, data) => {
    //         // console.log('file is read');
    //         if (err) {
    //             res.stat(500).send(err);
    //         }
    //         res.status(200)
    //             .attachment('employeeReport.txt')
    //             .send(data);
    //     });
    // });

    // #endregion
    if (!fs.exists(filePath)){
        fs.writeFileSync(filePath, fileContent);
    } 

    res.writeHead(200);
    
    const ws = fs.createWriteStream(filePath);
    const rs = fs.createReadStream(filePath);
    const rsws = rs.pipe(ws);
    rsws.write(` ${Date.now()}\n`);
    rs.pipe(res);
})

app.listen(3000, () => {
    console.log('server is listening');
});
