const { shuffle } = require('./utils.js');
const { Zerno } = require('./zerno.js');
const { Snake } = require('./snake.js');

class Game {
    snakes = [];
    constructor(width, height, emitter) {
        this.width = width;
        this.height = height;
        this.emitter = emitter;
        this.spawnZerno();

    }
   
    deleteSnake(indx) {
        this.snakes[indx] = null;
    }
    
    createSnake() {
        let snake = new Snake(this.snakes.length);
        this.snakes.push(snake);

    }

    tick() {

        this.snakes.forEach(element => {
            if (element != null) {
                this.calcSnake(element);
            }
        })
        if (this.zerno == null) {
            this.spawnZerno();
        }
        

    }
    getData() {
        let data ={};
        data.snakes = this.snakes;
        data.zerno = this.zerno;
        return data;
        
    }
    calcSnake(snake) {
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

    
    controllerPressed(indx, key) {

        if (key != 'w' && key != 'a' && key != 's' && key != 'd') {
            return;
        }
        

        let pos = this.snakes[indx].body[0];
        if (key == 'w') {
            if (this.snakes[indx].isIn(pos.x - 1, pos.y)) {
                return;
            }
            this.snakes[indx].direction.x = -1;
            this.snakes[indx].direction.y = 0;
        }
        if (key == 's') {
            if (this.snakes[indx].isIn(pos.x + 1, pos.y)) {
                return;
            }
            this.snakes[indx].direction.x = 1;
            this.snakes[indx].direction.y = 0;
        }
        if (key == 'a') {
            if (this.snakes[indx].isIn(pos.x, pos.y - 1)) {
                return;
            }
            this.snakes[indx].direction.y = -1;
            this.snakes[indx].direction.x = 0;
        }
        if (key == 'd') {
            if (this.snakes[indx].isIn(pos.x, pos.y + 1)) {
                return;
            }
            this.snakes[indx].direction.y = 1;
            this.snakes[indx].direction.x = 0;
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
}

module.exports = { Game }