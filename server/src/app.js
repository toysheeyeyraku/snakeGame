const WebSocket = require("ws");
const { Game } = require('./game')
const { EventEmitter } = require('events');
const {ClientManager} = require('./clientManager.js');
const {ScoreManager} = require('./scoreManager.js')
var cookieParser = require('cookie-parser')

var game;
var clientManager;
function initializeGame(){
    function insert(index, item) {
        this.splice(index, 0, item);
    }
    Array.prototype.insert = insert;
    let emitter = new EventEmitter();
    
    game = new Game(10, 10, emitter);
    clientManager = new ClientManager(game, new ScoreManager());
    emitter.on('snakeTakeZernoCommand', (indx) => {
        clientManager.updateScore(indx, 1);
        clientManager.updateScoresInClients();
    })
    game.start(1000);

    setInterval(() => {
        clientManager.renderAll();
    }, 1000);
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
    let webPort = process.env.WEB_PORT || 8072
    const wss = new WebSocket.Server({ port: webPort });
    wss.on("connection", ws => {
        initializeConnection(ws);
    })
}

function initializeWeb(){
    var express = require('express')
    var app = express();
    //app.use(express.cookieParser());
    const publicDirectoryPath = __dirname + '/client';

    //Cookie
    /*app.use(cookieParser())
    app.get('/', (req, res, next) =>{
        var cookie = req.cookies.playerId;
        if (cookie === undefined) {
            res.cookie('playerId','player1', { maxAge: 900000, httpOnly: true });
        }
        next();
    })*/
    app.use((req, res, next) => {
        console.log("GLOVO");
        next();
    })
    app.use(express.static(publicDirectoryPath))
    
    let appPort = process.env.APP_PORT || 8080

    console.log(JSON.stringify(process.env))
    console.log(appPort)
    app.listen(appPort, () => {
        console.log("Started")
    })
    
}
function main() {
    
    initializeGame();
    initializeSockets();
    initializeWeb();

}

module.exports = { main }