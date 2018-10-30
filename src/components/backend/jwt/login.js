var MongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcrypt');
var url = require("./config.js").mongodbURL;
var secret = require("./config.js").secret;
var jwt = require('jsonwebtoken');

var login = function(req,res) {
    MongoClient.connect(url, function(err, db){
        if (err) throw err;
        handle(db,req,res);
    });
}

module.exports = login;

function handle( db, req, res) {
    var usersCollection = db.collection('users');
    var password = req.body.password;
    var email = req.body.email;
    var error = null;
    if(password == null || email == null){
        error = 'missing parameters'
    }

    if(error){
        res.json({register: 0, error: error.errors});
    } else {
        usersCollection.findOne({ email: email }, function(err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ login: 0, message: 'Authentication failed. Incorrect creds.' });
            } else if (user) {
                if (!bcrypt.compareSync(password, user.password)) {
                    res.json({ login: 0, message: 'Authentication failed. Incorrect creds.' });
                } else {
                    var token = jwt.sign(user, secret, {
                        expiresIn : 60*60*24*7 // expires in 7 days
                    });
                    res.json({
                        login: 1,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            }
        });
    }
}