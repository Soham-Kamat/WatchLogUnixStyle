
// index.html file -> render watch log DONE
// establish a connection between client and server DONE
// on connection -> calculate lastlines from logfile and send it to index.html file DONE
// check for new updates to logfile -> if any send new updates to index.html 
// use websockets to send data to all clients -> store all connections DONE

const express = require('express')
const fs=require('fs')
const http=require('http')
const WebSocket=require('ws')
const { lastLines, newLines } = require('./utils.js');
const { newlines} =require('./utils.js');

const app=express()
PORT=3000

// app.use(express.static('public'));

app.use('/log', express.static('public/html'));

const server = http.createServer(app);

const wss = new WebSocket.Server({ server })

connections=[]
LOGFILE='logfile';
// wss.on('request',function(request){
// })

wss.on('connection', ws => {

    lastLines(LOGFILE)
    .then( lines=>{
        //lastline=lines[lines.length()-1];
        ws.send(JSON.stringify({lines}));
    })
    .catch( err =>{
        ws.send(JSON.stringify({lines}));
    })

    ws.on('close', function close(ws) {
     console.log("close");
    });
})

let lastline="";
fs.watchFile(LOGFILE,(curr,prev) =>{
    if(prev.mtimeMs!=curr.mtimeMs){
        newLines(LOGFILE,lastline)
        .then(lines =>{
            wss.clients.forEach(client =>{
                client.send(JSON.stringify({lines}));
            })
        })
        .catch(err =>{
            wss.clients.forEach(client =>{
                client.send(JSON.stringify(err));
            })
        })
    }
})


server.listen(PORT,()=>{
    console.log("listening at http://localhost:3000");
})
