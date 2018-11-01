var MongoClient = require('mongodb').MongoClient;

var data = {
    db: null
};

exports.connect = function (url, done) {
    if (data.db) {
        return done();
    }
    MongoClient.connect('mongodb://localhost:27017/data', {useNewUrlParser: true},
        function (err, db) {
            if (err) {
                return done(err);
            }
            data.db = db.db('tasks')
        })
};

exports.get = function () {
    return data.db;
};