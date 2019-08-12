let jwt = require('jsonwebtoken');

module.exports.verifyToken = function(req, res, next) {
    var refreshHeader = req.headers['x-access-token']; 
    var bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined' && typeof refreshHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ")
        if(bearer[0] !== '' && bearer[0] !== 'Bearer') {
            res.sendStatus(403);
        }
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, 'secretkey', (err, result) => {
        if(err) { res.sendStatus(403) }
        else{ next() }
        });
    }else {
        res.sendStatus(403);
    }
   }