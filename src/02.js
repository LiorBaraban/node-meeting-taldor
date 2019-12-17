module.exports = (() => {
    // 02 - Express Server
    // Blocking / NonBlocking The Event Loop
    // ===================
    // npm i express
    // npm i autocannon - for benchmarking

    // > autocannon -c 100 -p 10 -d 5 <URL>

    // const express = require('express');
    // const app = express();

    const app = require('express')();

    app.get('/', (req, res) => {
        res.send({
            message: 'express server works!'
        });
    });

    app.get('/employees', (req, res) => {
        console.log(`started handling request at /employees`);

        const employeeLogic = require('./business-logics/employee-logic');
        const employees = employeeLogic.getAllEmployees();

        res.status(200).send(employees);
    })

    app.get('/employeesSlowBlocking', (req, res) => {
        console.log(`started handling request at /employeesSlowBlocking`);

        const employeeLogic = require('./business-logics/employee-logic');
        const employees = employeeLogic.getAllEmployees();

        // slow the response - blocking the event loop
        const durationInMS = 1000;
        const start = Date.now();
        while (Date.now() - start < durationInMS) {
            // blocking event loop...
        }

        res.status(200).send(employees);
    })

    app.get('/employeesSlowNonBlocking', (req, res) => {
        console.log(`started handling request at /employeesSlowNonBlocking`);

        const employeeLogic = require('./business-logics/employee-logic');
        const employees = employeeLogic.getAllEmployees();

        // slow the response, but don't block the EL
        const durationInMS = 1000;
        setTimeout(() => {
            res.status(200).send(employees);
        }, durationInMS);

    })

    app.listen(3000, () => {
        console.log(`pid ${process.pid} - server is listening`);
    });


})(); 