// 00 - Hello World Node Server
// =============================
const http = require('http');

const server = http.createServer((req, res)=>{
    console.log('incoming request');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
})

server.listen(3000, () => {
    console.log('server is listening!');
});





