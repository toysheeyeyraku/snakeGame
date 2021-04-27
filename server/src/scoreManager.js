
class ScoreManager {
    scores = []
    
    addPlayer(){
        this.scores.push(0);
    }

    deletePlayer(indx){
        this.scores[indx] = null;
    }

    getScore(indx){
        return this.scores[indx];
    }

    plusScore(indx, value){
        this.scores[indx] += value;
    }

    getAllScores(){
        return this.scores;
    }
}

module.exports = {ScoreManager}