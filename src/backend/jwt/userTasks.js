var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = require("./config.js").mongodbURL;

/**
 * userTasks module for handling requests on /user_tasks
 * Request should contain the following parameters
 * JWT token
 */
var userTasks = function(req,res) {
    MongoClient.connect(url, function(err, db){
        if (err) throw err;
        handle(db,req,res);
    });
};

module.exports = userTasks;
/**
 * handle - handle deleteTask request
 *
 */
function handle(db, req, res) {
    var tasksCollection = db.collection('tasks');
    var taskId = new ObjectID(new ObjectID(req.decoded._id));
    var toBeSearched =
        {
            user_id: taskId
        };
    tasksCollection.find(toBeSearched).toArray(function(err, documents) {
        if(err) throw JSON.stringify({err: err});
        db.close();
        res.json(documents);
    });
}
