var useragent = require('express-useragent');
module.exports = function(req,res,next) {
    var source = req.headers['user-agent'],
    ua = useragent.parse(source);
    if(ua.isBot) {
      return res.status(401).end();
    }
    next();
};