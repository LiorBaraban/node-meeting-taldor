// Simple Video Streaming Server
// Express, FS, 

const express = require('express');
const app = express();
const fs = require('fs');
app.get('/video', (req, res) => {
    const filePath = './assets/sample-video.mp4';
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (!!range){
        console.log('streaming request');
        const [startString, endString] = range.replace(/bytes=/,'').split('=');

        const start = parseInt(startString,10);
        const end = endString ? parseInt(endString,10) : fileSize-1;
        const chunkSize = (end-start)+1;

        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4',
        }

        res.writeHead(206, head);
        fs.createReadStream(filePath, {start, end}).pipe(res);

    } else{
        console.log('initial request');
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(206, head)
        fs.createReadStream(path).pipe(res);
    }
})

app.listen(3000,() => {
    console.log('server is listening');
})



// In the html:
// ===============
// <video id="videoPlayer" controls>
//   <source src="http://localhost:3000/video" type="video/mp4">
// </video>
