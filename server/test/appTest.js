const assert = require('chai').assert;
const {Game} = require('../src/game')
const { EventEmitter } = require('events');
describe('App', function(){
    it('direction test', function(){
    
        function insert(index, item) {
            this.splice(index, 0, item);
        }
        Array.prototype.insert = insert;

        let emitter = new EventEmitter();
        emitter.on('snakeTakeZernoCommand', (indx, game) =>{
            game.stop();
            if (indx != 0){
                throw 'Error';
            }
        })
        let game = new Game(30, 30, emitter);
        game.zerno.pos.x=10;
        game.zerno.pos.y=5;
        game.createSnake();
        game.start(10);

       
    })

    it('direction test', function(){
    
       assert("w", "w")

       
    })
    
})