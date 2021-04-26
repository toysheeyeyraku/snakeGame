class ClientManager{
    clients = [];
    constructor(game){
        this.game = game;
    }
    addClient(ws){
        this.clients.push(ws);
        this.game.createSnake();
        this.notify(ws, { command: 'initialize', width: this.game.width, height: this.game.height });
    }


    deleteClient(ws) {
        let indx = this.clients.indexOf(ws);
        this.clients[indx] = null;
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
}

module.exports = {ClientManager}