class Mongo {



    storeScore(scores) {

        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect('mongodb://root:rootPassXXX@127.0.0.1:27017/admin', function (err, db) {
            if (err) {
                console.error(err);
            }
            let a = db.db('game')
            a.collection('scores').insertOne({ scores: scores })
        });

    }
}
module.exports = { Mongo }