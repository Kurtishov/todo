var secret = require("../config.js").secret;
var jwt = require('jsonwebtoken');
var JWTMiddleware = function(req, res, next) {

    var token = req.body.token || req.query.token || req.headers['Authorization'];

    if (token) {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;console.log(decoded);
                next();
            }
        })} else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}

module.exports = JWTMiddleware;