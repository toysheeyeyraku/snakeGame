
const {Mongo} = require('./mongo/mongo.js')

class ScoreManager {
    scores = []
    constructor(){
        this.mongo = new Mongo();
    }
    addPlayer(){
        this.scores.push(0);
        this.mongo.storeScore(this.scores);
    }

    deletePlayer(indx){
        this.scores[indx] = null;
        this.mongo.storeScore(this.scores);
    }

    getScore(indx){
        return this.scores[indx];
    }

    plusScore(indx, value){
        this.scores[indx] += value;
        this.mongo.storeScore(this.scores);
    }

    getAllScores(){
        return this.scores;
    }
}

module.exports = {ScoreManager}