var bcrypt = require('bcrypt');
var url = require("./config.js").mongodbURL;
var secret = require("./config.js").secret;
var jwt = require('jsonwebtoken');
var db = require('../db');

function login(req, res) {
    var usersCollection = db.get().collection('users');
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

module.exports = login;