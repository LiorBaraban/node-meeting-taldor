// 02 - Express Server
// ===================
// npm i express

const express = require('express');
const app = express();

app.get('/', (req,res)=>{
    res.send({
        message: 'express server works!'
    });
});

app.get('/employees',(req,res)=>{
    const employeeLogic = require('./business-logics/employee-logic');
    const employees = employeeLogic.getAllEmployees();

    res.status(200).send(employees);
})


app.listen(3000, ()=>{
    console.log('server is listening');
});
