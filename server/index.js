const WebSocket = require("ws");
const wss = new WebSocket.Server({port : 8072});
const {Game} = require('./src/game')
function insert(index, item) {
    this.splice(index, 0, item);
}
Array.prototype.insert = insert;
var game = new Game(30,30);

setInterval(() =>{
    game.tick();
}, 1000);
function initializeConnection(ws){
    ws.on("close", () => {
        game.deleteClient(ws);
    });
    game.addClinet(ws);
    ws.on('message', function incoming(data) {
        let d = JSON.parse(data);
        if (d.command === 'pressed'){
            game.controllerPressed(ws, d.key);
        }
    });
}

wss.on("connection", ws => {
    
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


