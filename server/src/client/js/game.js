import {shuffle} from './utils.js';

export class Game {

    constructor(width, height, ws) {
        this.width = width;
        this.height = height;
        this.ws = ws;
        this.initializeGameScene();

    }

    initializeGameScene() {
        $('#gameScene').attr('style', `display: grid; grid-template-columns:repeat(${this.height}, 50px); grid-template-rows:repeat(${this.width}, 50px);`)
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                $('#gameScene').append(`<div id="gameCell${i}${j}"" style="border: 1px solid #1C6EA4;" class="box"></div>`)
            }
        }
    }

    drawScene(data) {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                $(`#gameCell${i}${j}`).removeClass('snake-body-fill');
                $(`#gameCell${i}${j}`).removeClass('zerno');
                $(`#gameCell${i}${j}`).attr("style", `background-color:#ffffff`)
            }
        }
        data.snakes.forEach((element)=>{
            if (element != null){
                this.drawSnake(element);
            }
        })
        if (data.zerno != null) {
            $(`#gameCell${data.zerno.pos.x}${data.zerno.pos.y}`).addClass('zerno');
            $(`#gameCell${data.zerno.pos.x}${data.zerno.pos.y}`).attr("style", `background-color:green`)
        }
    }
    drawSnake(snake){
        snake.body.forEach(element => {
            $(`#gameCell${element.x}${element.y}`).addClass('snake-body-fill');
            $(`#gameCell${element.x}${element.y}`).attr("style", `background-color:${snake.color}`)
        });
    }
    
    controllerPressed(key) {
        
        if (key != 'w' && key != 'a' && key != 's' && key != 'd') {
            return;
        }
        
        this.ws.send(JSON.stringify({command : 'pressed', key: key}))
        
    }

    

   
}