var appRouter = function(apiRoutes) {
    var register = require("../register.js");
    var login = require("../login.js");
    var userTasks = require("../userTasks.js");
    var JWTMiddleware = require('../middlewares/JWTMiddleware.js');

    /**
     * Register route
     * Forms parameters:
     * username
     * password
     * email (email format)
     */
    apiRoutes.post("/register", function(req,res){
        // we use the register.js module to handle the request
        register(req,res);
    });

    /**
     * user_tasks route
     * Form's parameters:
     * user's _id
     */
    apiRoutes.post("/user_tasks", JWTMiddleware, function(req,res){
        // we use the user_tasks.js module to handle the request
        userTasks(req,res);
    });

    /**
     * login route
     * Form's parameters:
     * email
     * password
     * (not username cause its not unique)
     */
    apiRoutes.post("/login", function(req,res){
        // we use the router.js module to handle the request
        login(req,res);
    });
}

module.exports = appRouter;
