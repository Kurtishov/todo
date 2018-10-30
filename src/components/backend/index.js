var express = require('express');
var bodyParser = require('body-parser');
var TaskController = require('./TaskController')
var db = require('./db');
var cors = require('cors');
// var userHandlers = require('userController.js')
// var User = require('./api/models/userModel');
// var jsonwebtoken = require("jsonwebtoken");

var app = express();
console.log('______________ bodyParser', bodyParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/endpoint', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.get('/', function (req, res) {
    res.send('Authorization is here');
})

app.use(cors('http://localhost:3000/'));
app.get('/tasks', TaskController.all);
app.get('/tasks:id', TaskController.findById);
app.post('/tasks', TaskController.create);
app.put('/tasks/:id', TaskController.update);
app.put('/tasks/all/update', TaskController.updateAll);
app.delete('/tasks/:id', TaskController.delete);

/*app.post('auth/register', userHandlers.register);
app.post(userHandlers.sing_in);*/

db.connect('mongodb://localhost:27017/data', {useNewUrlParser: true})
app.listen(4016, () => {
    console.log('Listening at http://localhost:4016' )
})