


class ClientManager{
    clients = [];
    constructor(game, scoreManager){
        this.game = game;
        this.scoreManager = scoreManager;
    }

    addClient(ws){
        this.clients.push(ws);
        this.scoreManager.addPlayer();
        this.game.createSnake();
        this.notify(ws, { command: 'initialize', width: this.game.width, height: this.game.height });
        let indx = this.clients.indexOf(ws);
        this.notify(ws, { command: 'yourId', id : indx });
        this.notify(ws, { command: 'yourColor', color : this.game.getSnakeColor(indx)});
        this.updateScoresInClients();
    }


    deleteClient(ws) {
        let indx = this.clients.indexOf(ws);
        this.clients[indx] = null;
        this.scoreManager.deletePlayer(indx);
    }

    getIndex(ws) {
        let indx = this.clients.indexOf(ws);
        return indx;
    }

    notifyAll(data) {
        this.clients.forEach(element => {
            if (element != null) {
                element.send(JSON.stringify(data));
            }
        });
    }

    notify(ws, cmd){
        ws.send(JSON.stringify(cmd));
    }

    deleteClient(ws) {
        let indx = this.getIndex(ws);
        this.game.deleteSnake(indx);
    }
    
    renderAll(){
        this.notifyAll({command : 'render', data : this.game.getData()})
    }

    buttonPress(ws, key){
        let indx = this.getIndex(ws);
        this.game.controllerPressed(indx, key);
    }

    updateScore(indx, value){
        this.scoreManager.plusScore(indx, value);

    }

    updateScoresInClients(){
        this.notifyAll({command : 'scores', data : this.scoreManager.getAllScores()})
    }

    snakeDied(indx){
        this.notify(this.clients[indx], {command : 'snakeDied', data : indx})
    }
}

module.exports = {ClientManager}