const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8072 });
const { Game } = require('./game')
const { EventEmitter } = require('events');
const {ClientManager} = require('./clientManager.js');
var game;
var clientManager;
function initializeGame(){
    function insert(index, item) {
        this.splice(index, 0, item);
    }
    Array.prototype.insert = insert;
    let emitter = new EventEmitter();
    game = new Game(30, 30, emitter);
    clientManager = new ClientManager(game);
    game.start(200);

    setInterval(() => {
        clientManager.renderAll();
    }, 200);
}

function initializeSockets(){
    function initializeConnection(ws) {
        ws.on("close", () => {
            clientManager.deleteClient(ws);
        });
        clientManager.addClient(ws);

        let emitter = new EventEmitter();

        emitter.on('pressed', (data) => {
            let d = JSON.parse(data);
            clientManager.buttonPress(ws, d.key);
        })

        ws.on('message', function incoming(data) {
            let d = JSON.parse(data);
            emitter.emit(d.command, data);
            
        });
    }
    wss.on("connection", ws => {
        initializeConnection(ws);
    })
}

function initializeWeb(){
    var express = require('express')
    var app = express();

    app.listen(8080, () => {
        console.log("Started")
    })
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/client/index.html');

    })

    app.get('/css/*', (req, res) => {

        let url = req.originalUrl;
        url.replace('/', '\\');
        res.sendFile(__dirname + '/client/' + url)

    })

    app.get('/js/*', (req, res) => {

        let url = req.originalUrl;
        url.replace('/', '\\');
        res.sendFile(__dirname + '/client/' + url)
    });
}
function main() {
    
    initializeGame();
    initializeSockets();
    initializeWeb();

}

module.exports = { main }