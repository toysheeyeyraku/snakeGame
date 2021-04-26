const assert = require('chai').assert;
const { Game } = require('../src/game')
const { EventEmitter } = require('events');
describe('App', function () {
    it('take Zerno Test', function (done) {
        this.timeout(300);
        function insert(index, item) {
            this.splice(index, 0, item);
        }
        Array.prototype.insert = insert;
        var answer=0;
        let emitter = new EventEmitter();
        emitter.on('snakeTakeZernoCommand', (indx, game) => {
            game.stop();
            if (indx != 0) {
                throw 'Error';
            }
            answer=1;
        })
        let game = new Game(30, 30, emitter);
        game.zerno.pos.x = 10;
        game.zerno.pos.y = 5;
        game.createSnake();
        game.start(10);
        setTimeout(function () {
            if (answer == 1){
                done();
            
            }
            
        }, 100);

    })

})