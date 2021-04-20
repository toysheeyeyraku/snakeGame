const WebSocket = require("ws");
const wss = new WebSocket.Server({port : 8072});

function initializeConnection(ws){
    ws.on("close", () => {
        console.log("Connection closed");
    });
    ws.on('message', function incoming(data) {
        console.log(data);
        ws.send(data +'lol')
      });
}

wss.on("connection", ws => {
    console.log('new connection')
    initializeConnection(ws);
   
} )


var express = require('express')
var app = express();

app.listen(8080, () => {
    console.log("Started")
})
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    
})

app.get('/css/*', (req, res) => {
    
    let url = req.originalUrl;
    url.replace('/', '\\');
    res.sendFile(__dirname+ url)
    
})

app.get('/js/*', (req, res) => {
    
    let url = req.originalUrl;
    url.replace('/', '\\');
    res.sendFile(__dirname+ url)
});


