var ObjectID = require('mongodb').ObjectID
var db = require('./db');

exports.all = function (cb) {

    db.get().collection('tasks').find().toArray(function (err, docs) {
        cb(err, docs);
    })
}

exports.findbyId = function (id, cb) {
    db.get().collection('tasks').findOne({_id: ObjectID(id)}, function (err, doc) {
        cb(err, doc);
    })
}

exports.create = function (task, cb) {
    db.get().collection('tasks').insert(task, function (err, result) {
        cb(err, result);
    })
}

exports.update = function (id, data, cb) {
    db.get().collection('tasks').update(
        {_id: ObjectID(id)},
        {$set:(data)},
        function (err, result) {
            cb && cb(err, result);
        }
    )
}

exports.delete = function (id, cb) {
    db.get().collection('tasks').deleteOne(
        {_id: ObjectID(id)},
        function (err, result) {
            cb(err, result);
        }
    )
}

exports.updateAll = function(id, data, cb) {
    db.get().collection('tasks').updateMany(
        {},
        {$set: data},
        function (err, result) {
            cb && cb(err, result);
        }
    )
};

