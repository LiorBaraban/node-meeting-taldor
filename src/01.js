// 01 - Simple Node Server
// =======================
const http = require('http');

console.log('creating server...');

http.createServer((req,res)=>{
    if (req.url == '/'){
        res.writeHead(200 ,{ 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            message: "node server works!"
        }));
    }

    if (req.url == '/employees'){
        const emlpoyeeLogic = require('./business-logics/employee-logic');
        const employees = emlpoyeeLogic.getAllEmployees();

        res.writeHead(200 ,{ 'Content-Type': 'application/json' })
        res.end(JSON.stringify(employees));
    }

}).listen(3000);

console.log('server is up');