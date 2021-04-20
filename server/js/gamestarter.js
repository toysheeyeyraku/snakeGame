import { shuffle, insert } from './utils.js'
import { Snake } from './snake.js'
import { Game } from './game.js'
Array.prototype.insert = insert;

let game = new Game(new Snake(), 20, 10);
document.addEventListener('keypress', (event) => {
    const keyName = event.key;
    game.controllerPressed(keyName)

});
setInterval(() => {
    game.tick();
}, 100)

/*const ws = new WebSocket("ws://localhost:8072");
ws.addEventListener("message", ({ data }) => {
    console.log(JSON.stringify(data) + 'receivedData')

})
ws.addEventListener("close", () => {
    console.log('close');
})
ws.addEventListener("open", () => {
    console.log('connected');

    ws.send('loler');

})*/