var bcrypt = require('bcryptjs');
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('users', {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    },{
        timestamps: false
    });

    User.beforeCreate((user, options) => {
        return bcrypt.hash(user.password, 10)
            .then(hash => {
                user.password = hash;
            })
            .catch(err => { 
                throw new Error(); 
            });
    });

  return User;
};