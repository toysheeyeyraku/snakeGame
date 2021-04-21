const { client } = require('websocket');
const {shuffle} = require( './utils.js');
const {Zerno} =  require('./zerno.js');
const {Snake} =  require('./snake.js');

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
class Game {
    
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.snakes = [];
        this.clients =[];
        this.spawnZerno();
        
    }
    addClinet(ws){
        this.clients.push(ws);
        ws.send(JSON.stringify({command : 'initialize', width: this.width, height: this.height}))
        this.createSnake(ws);
    }
    deleteClient(ws){
        let indx = this.clients.indexOf(ws);
        this.clients[indx] = null;
        this.snakes[indx] = null;
    }
    notifyAll(data){
        this.clients.forEach(element => {
            if (element != null){
                element.send(JSON.stringify(data));
            }
        });
    }
    createSnake(ws){
        let snake = new Snake();
        let indx = this.clients.indexOf(ws);
        this.snakes.push(snake);
        ws.send(JSON.stringify({command : 'color', color : this.snakes[indx].color}))
    }
    
    tick() {
        
        this.snakes.forEach(element =>{
            if (element != null){
                this.calcSnake(element);
            }
        })
        if (this.zerno == null){
            this.spawnZerno();
        }
        this.sendDrawScene();
        
    }
    sendDrawScene(){
        let cmd = {
            command : 'render',
            data :{

            }
        }
        cmd.data.snakes = this.snakes;
        cmd.data.zerno = this.zerno;

        this.notifyAll(cmd);
    }
    calcSnake(snake){
        let snakeBody = snake.body;
        let lastElement = JSON.parse( JSON.stringify( snakeBody[0]));
        
        lastElement.x += snake.direction.x;
        lastElement.y += snake.direction.y;
        
        snakeBody.insert(0, lastElement)
        
        if (this.zerno != null && snake.isIn(this.zerno.pos.x, this.zerno.pos.y)){
            this.zerno=null;
        }else{
            snakeBody.splice(-1, 1);
        }
    }
    controllerPressed(ws, key) {
        
        if (key != 'w' && key != 'a' && key != 's' && key != 'd') {
            return;
        }
        let indx = this.clients.indexOf(ws);
        
        let pos = this.snakes[indx].body[0] ;
        if (key == 'w') {
            if (this.snakes[indx].isIn(pos.x -1, pos.y)){
                return ;
            }
            this.snakes[indx].direction.x = -1;
            this.snakes[indx].direction.y = 0;
        }
        if (key == 's') {
            if (this.snakes[indx].isIn(pos.x +1, pos.y)){
                return ;
            }
            this.snakes[indx].direction.x = 1;
            this.snakes[indx].direction.y = 0;
        }
        if (key == 'a') {
            if (this.snakes[indx].isIn(pos.x, pos.y-1)){
                return ;
            }
            this.snakes[indx].direction.y = -1;
            this.snakes[indx].direction.x = 0;
        }
        if (key == 'd') {
            if (this.snakes[indx].isIn(pos.x, pos.y+1)){
                return ;
            }
            this.snakes[indx].direction.y = 1;
            this.snakes[indx].direction.x = 0;
        }
    }

    spawnZerno() {
        let arr = [];
        for (let i =0;i<this.width;i++){
            for (let j=0;j<this.height;j++){
                let isIn = false;
                this.snakes.forEach((element)=>{
                    if (element != null){
                        if (element.isIn(i,j)){
                            isIn =true;
                        }
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
    
   
}

module.exports = {Game}