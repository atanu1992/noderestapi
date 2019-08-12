var config      = require('config');
var dbUrl       = config.get('configuration.mongodb.CONNECTION_STRING');
var mongoose    = require('mongoose');
    mongoose.connect(dbUrl, { 
        useNewUrlParser: true
});

mongoose.Promise = global.Promise;
module.exports = mongoose;