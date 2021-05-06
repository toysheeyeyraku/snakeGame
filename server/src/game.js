const { shuffle } = require('./utils.js');
const { Zerno } = require('./zerno.js');
const { Snake } = require('./snake.js');

class Game {
    snakes = new Map();
    constructor(width, height, emitter) {
        this.width = width;
        this.height = height;
        this.emitter = emitter;
        this.spawnZerno();
        this.currentIndex=-1;
    }
    getNextIndex(){
        this.currentIndex++;
        return this.currentIndex;
    }
    deleteSnake(indx) {
        this.snakes.delete(indx);
    }
    
    createSnake() {
        let indx = this.getNextIndex();
        let snake = new Snake(indx);
        this.snakes.set(indx, snake);
    }

    tick() {
        let notAllowedFields = [];
        this.snakes.forEach((element) =>{
            notAllowedFields.push(...element.body)
        });
        console.log(JSON.stringify(notAllowedFields))
        this.snakes.forEach(element => {
            if (element != null) {
                this.calcSnake(element, notAllowedFields);
            }
        })
        if (this.zerno == null) {
            this.spawnZerno();
        }
        

    }
    getData() {
        let data ={};
        let dataSnakes = [];
        this.snakes.forEach((element) => {
            dataSnakes.push(element)
        })
        data.snakes = dataSnakes;
        data.zerno = this.zerno;
        return data;
        
    }
    calcSnake(snake, notAllowedFields) {
        this.calcLosing(snake, notAllowedFields);
        let snakeBody = snake.body;
        let lastElement = JSON.parse(JSON.stringify(snakeBody[0]));

        lastElement.x += snake.direction.x;
        lastElement.y += snake.direction.y;

        snakeBody.insert(0, lastElement)

        if (this.zerno != null && snake.isIn(this.zerno.pos.x, this.zerno.pos.y)) {
            this.emitter.emit("snakeTakeZernoCommand", snake.indx, this);
            this.zerno = null;
        } else {
            snakeBody.splice(-1, 1);
        }
        
    }
    
    getSnakeColor(indx){
        console.log(indx);
        return this.snakes.get(indx).color;
    }
    
    controllerPressed(indx, key) {

        if (key != 'w' && key != 'a' && key != 's' && key != 'd') {
            return;
        }
        
        if (!this.snakes.has(indx)){
            return;
        }

        let pos = this.snakes.get(indx).body[0];
        if (key == 'w') {
            if (this.snakes.get(indx).isIn(pos.x - 1, pos.y) && this.snakes.get(indx).direction.x == 1) {
                return;
            }
            this.snakes.get(indx).direction.x = -1;
            this.snakes.get(indx).direction.y = 0;
        }
        if (key == 's') {
            if (this.snakes.get(indx).isIn(pos.x + 1, pos.y) && this.snakes.get(indx).direction.x == -1) {
                return;
            }
            this.snakes.get(indx).direction.x = 1;
            this.snakes.get(indx).direction.y = 0;
        }
        if (key == 'a') {
            if (this.snakes.get(indx).isIn(pos.x, pos.y - 1) && this.snakes.get(indx).direction.y == 1) {
                return;
            }
            this.snakes.get(indx).direction.y = -1;
            this.snakes.get(indx).direction.x = 0;
        }
        if (key == 'd') {
            if (this.snakes.get(indx).isIn(pos.x, pos.y + 1) && this.snakes.get(indx).direction.y == -1) {
                return;
            }
            this.snakes.get(indx).direction.y = 1;
            this.snakes.get(indx).direction.x = 0;
        }
    }

    spawnZerno() {
        let arr = [];
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                let isIn = false;
                this.snakes.forEach((element) => {
                    if (element != null) {
                        if (element.isIn(i, j)) {
                            isIn = true;
                        }
                    }
                })
                if (!isIn) {
                    arr.push({ x: i, y: j })
                }
            }
        }
        arr = shuffle(arr);
        let selectedIndex = Math.floor(Math.random() * arr.length);

        this.zerno = new Zerno();
        this.zerno.pos = arr[selectedIndex];
    }

    start(period){
        this.ticking = setInterval(() => {
            this.tick();
        }, period);
    }

    stop(){
        clearInterval(this.ticking);
    }

    calcLosing(snake, notAllowedFields){
        let snakeBody = snake.body;
        if (snakeBody[0].x < 0 || snakeBody[0].x > this.width || snakeBody[0].y < 0 || snakeBody[0].y > this.height){
            this.deleteSnake(snake.indx);
            this.emitter.emit("snakeDied", snake.indx, this)
            return;
        }
        let count=0;
        notAllowedFields.forEach((element)=>{
           if (element.x === snakeBody[0].x && element.y === snakeBody[0].y){
               count++;
           }
        })
        console.log(count)
        if (count >1){
            this.deleteSnake(snake.indx);
            this.emitter.emit("snakeDied", snake.indx, this)
        }
    }
}

module.exports = { Game }