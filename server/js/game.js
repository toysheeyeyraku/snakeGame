import {shuffle} from './utils.js';
import {Zerno} from './zerno.js';
export class Game {

    constructor(snake, width, height) {
        this.width = width;
        this.height = height;
        this.snake = snake;
        this.spawnZerno();
        this.initializeGameScene();
        this.drawScene();
    }

    initializeGameScene() {
        $('#gameScene').attr('style', `display: grid; grid-template-columns:repeat(${this.height}, 50px); grid-template-rows:repeat(${this.width}, 50px);`)
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                $('#gameScene').append(`<div id="gameCell${i}${j}"" style="border: 1px solid #1C6EA4;" class="box"></div>`)
            }
        }
    }

    drawScene() {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                $(`#gameCell${i}${j}`).removeClass('snake-body-fill');
                $(`#gameCell${i}${j}`).removeClass('zerno');
            }
        }
        this.snake.body.forEach(element => {
            $(`#gameCell${element.x}${element.y}`).addClass('snake-body-fill');
        });
        if (this.zerno != null) {
            $(`#gameCell${this.zerno.pos.x}${this.zerno.pos.y}`).addClass('zerno');
        }
    }

    tick() {
        let snakeBody = this.snake.body;
        let lastElement = JSON.parse( JSON.stringify( snakeBody[0]));
        
            
        

        lastElement.x += this.snake.direction.x;
        lastElement.y += this.snake.direction.y;
        
        snakeBody.insert(0, lastElement)
        
        if (this.snake.isIn(this.zerno.pos.x, this.zerno.pos.y)){
            
            this.zerno=null;
        }else{
            snakeBody.splice(-1, 1);
        }
        if (this.zerno == null){
            this.spawnZerno();
        }
        this.drawScene();
    }
    controllerPressed(key) {
        
        if (key != 'w' && key != 'a' && key != 's' && key != 'd') {
            return;
        }
        
        
        let pos = this.snake.body[0] ;
        if (key == 'w') {
            if (this.snake.isIn(pos.x -1, pos.y)){
                return ;
            }
            this.snake.direction.x = -1;
            this.snake.direction.y = 0;
        }
        if (key == 's') {
            if (this.snake.isIn(pos.x +1, pos.y)){
                return ;
            }
            this.snake.direction.x = 1;
            this.snake.direction.y = 0;
        }
        if (key == 'a') {
            if (this.snake.isIn(pos.x, pos.y-1)){
                return ;
            }
            this.snake.direction.y = -1;
            this.snake.direction.x = 0;
        }
        if (key == 'd') {
            if (this.snake.isIn(pos.x, pos.y+1)){
                return ;
            }
            this.snake.direction.y = 1;
            this.snake.direction.x = 0;
        }
    }

    spawnZerno() {
        let arr = [];
        for (let i =0;i<this.width;i++){
            for (let j=0;j<this.height;j++){
                if (!this.snake.isIn(i,j)){
                    arr.push({x: i, y: j});
                }
            }
        }
        arr = shuffle(arr);
        let selectedIndex = Math.floor(Math.random() * arr.length);

        this.zerno = new Zerno();
        this.zerno.pos=arr[selectedIndex];
    }

   
}