/*const { client } = require('websocket');
const {shuffle} = require( './utils.js');
const {Zerno} =  require('./zerno.js');
const {Snake} =  require('./snake.js');
require("google-closure-library");
goog.require("goog.cr");
function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }*/
class Game {
    clients = [];
    snakes =[];
    constructor(width, height) {
        this.width = width;
        this.height = height;
        
        //this.spawnZerno();
        
    }
    addClinet(ws){
        this.clients.push(ws);
        let indx = clients.indexOf(ws);
        this.notifyAll({command : 'create', indx : indx})
    }
    deleteClient(ws){
        let indx = this.clients.indexOf(ws);
        this.notifyAll({command : 'delete', indx : indx})
    }
    notifyAll(data){
        this.clients.forEach(element => {
            if (element != null){
                element.send(JSON.stringify(data));
            }
        });
    }
    /*createSnake(ws){
        let snake = new Snake();
        let indx = this.clients.indexOf(ws);
        this.snakes.push(snake);
        this.clients.forEach(element => {
            if (element != ws && element != null){
                element.send(JSON.stringify({command : 'create', indx : indx}));
            }
        });
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
                let isIn = false;
                this.snakes.forEach((element)=>{
                    if (element.isIn(i,j)){
                        isIn =true;
                    }
                })
                if (!isIn){
                    arr.push({x: i, y: j})
                }
            }
        }
        arr = shuffle(arr);
        let selectedIndex = Math.floor(Math.random() * arr.length);

        this.zerno = new Zerno();
        this.zerno.pos=arr[selectedIndex];
    }
    */
   
}

module.exports = {Game}