var MongoClient = require('mongodb').MongoClient;
var url = require("./config.js").mongodbURL;
var bcrypt = require('bcrypt');
var UserModel = require("./models/user.js");
var db = require('../db');

function register(req, res) {
    var usersCollection = db.get().collection('users');
    var username = req.body.username;
    var password = bcrypt.hashSync(req.body.password, 10); // 10 is about the salt generation
    var email = req.body.email;
    var toBeInsert = { username: username, password: password, email: email };
    var newUser = new UserModel(toBeInsert);
    var error = newUser.validateSync();

    if(error){
        res.json({register: 0, error: error.errors});
    }
    else{
        usersCollection.insert(toBeInsert,function(err, data) {
            console.log('______________ data', data);
            if(err) throw JSON.stringify({err: err});
            res.json({register: data});
        });
    }
}

module.exports = register;