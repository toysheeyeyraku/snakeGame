import { shuffle, insert } from './utils.js'
import { Snake } from './snake.js'
import { Game } from './game.js'
Array.prototype.insert = insert;


document.addEventListener('keypress', (event) => {
    const keyName = event.key;
    game.controllerPressed(keyName)

});
var game ;
var color;
const ws = new WebSocket("ws://localhost:8072");
ws.addEventListener("message", ({ data }) => {
    let d = JSON.parse(data);
    console.log(JSON.stringify(data))
    if (d.command === 'initialize'){
        game = new Game(d.width, d.height, ws);
    }
    if (d.command === 'color'){
        color = d.color;
    }
    if (d.command ==='render'){
        
        game.drawScene(d.data)
    }

    if (d.command === 'yourId'){
        game.setId(d.id);
    }
    if (d.command === 'scores'){
        game.changeScores(d.data);
    }
    if (d.command === 'snakeDied'){
        alert('You losed');
    }
})
ws.addEventListener("close", () => {
    
})
ws.addEventListener("open", () => {
    

   

})