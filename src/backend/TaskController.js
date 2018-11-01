var Tasks = require('./TasksModel');

exports.all = function (req, res) {
    Tasks.all(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
}

exports.findById = function (req, res) {
    Tasks.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}

exports.create = function (req, res) {
    var task = {
        title: req.body.title,
        isDone: req.body.isDone = false,
    };
    Tasks.create(task, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(task);
    })
}

function getObjectForUpdate(data) {
    return Object.keys(data).reduce(function (acc, d) {
        acc[d] = data[d];
        return acc;
    }, {})
}

exports.update = function (req, res) {
    Tasks.update(req.params.id, getObjectForUpdate(req.body), function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500)
        }
        res.sendStatus(200);
    })
}

exports.delete = function (req, res) {
    console.log('______________ req.params', req.params);
    Tasks.delete(req.params.id, function (err, result) {
        if (err) {
            console.log(err);
            res.sendStatus(500,).json({message: 'Delete error'});
        }
        res.sendStatus(200);
    })
}

exports.updateAll = function (req, res) {
    Tasks.all(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        console.log('______________ docs', docs);

        const state = docs.every(doc => doc.isDone);

        Tasks.updateAll({}, {isDone: !state}, function (err) {
            if (err) return res.status(500).send('db error');

            Tasks.all(function(err, data) {
                res.send(data);
            })


        });
    });
};