const config = require('config');
const keys = config.get('configuration.jwtKey');
const encryptId = config.get('configuration.encryptedId');
const tokenKey = keys.primaryKey + keys.secondaryKey;
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
var models = require('../api/v1/models');

module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("Bearer");
    opts.secretOrKey = tokenKey;
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        models.users.findOne({
            where: {
                id: jwt_payload.id
            }
        }).then(user => done(null, user)).catch(err => {
            console.log('err ', err);
            done(null, false)
        });
    })
    );
};