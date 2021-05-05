class Mongo {    
    constructor(){
       // var MongoClient = require('mongodb').MongoClient;
        //var self = this;
        //MongoClient.connect('mongodb://root:rootPassXXX@127.0.0.1:27017/admin', function (err, db) {
        //    if (err) {
         //       console.error(err);
         //   }        
         //   self.database = db.db('game')         
       // });
    }


    storeScore(scores) {
       // this.database.collection('scores').insertOne({ scores: scores })
    }
}
module.exports = { Mongo }