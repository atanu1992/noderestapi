const config = require('config');
var bcrypt = require('bcryptjs');
const Token = require('../models/mongo/token');
var encryption = require('../../config/encrypt_decrypt');
const mysql = require('../models/mysql');
var useragent = require('express-useragent');
var jwt = require('jsonwebtoken');
// var mongoose = require('../../config/mongo_connect');

// Authenticate user login credentials
exports.authenticateUser = async function (req, res) {
  var source = req.headers['user-agent'],
    ua = useragent.parse(source);
  let details = await checkUser(req.body);
  if (details !== undefined && details.isError === undefined) {

    let time = new Date().getTime();
    let loginId = Math.random().toString(36).substring(2, 15) + String(time).substring(2, 10) + Math.random().toString(36).substring(2, 15);
    let secret_key = config.get('configuration.encryptedId');
    // create a token
    let encryptedId = encryption.encrypt(String(secret_key));
    var jwtToken = jwt.sign({ id: encryptedId }, secret_key, {
      expiresIn: 60 * 2 // expires in 2 minutes
    });

    let encryptedLoginId = encryption.encrypt(String(secret_key));
    var refreshToken = jwt.sign({ id: encryptedLoginId }, secret_key, {
      expiresIn: 60 * 3 // expires in 3 minutes
    });

      Token.create({
        token: jwtToken,
        refreshtoken: refreshToken,
        loginId: loginId,
        user_id: details.id,
        os: ua.os,
        browser: ua.browser,
        platform: ua.platform,
        loginTime: (new Date().getTime()),
      }, function (err, token) {
          if (err) {
            return res.status(200).json({ 'success': false, 'message': 'Something went wrong' });
          }
          res.header('Authorization', `Bearer ${token.token}`);
          res.header('x-token', `${token.refreshtoken}`);
          return res.status(200).json({ 'success': true, 'message': 'successfull login' });
      });
  } else {
    return res.status(200).json({ 'success': false, 'message': details.message });
  }
};

async function checkUser(data) {
  let email = data.email;
  let password = data.password;
  return mysql.users
    .findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        var passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
          let error = { 'isError': true, 'message': 'Invalid credentials' };
          return error;
        } else {
          return user;
        }
      } else {
        let error = { 'isError': true, 'message': 'Invalid credentials' };
        return error;
      }
    })
    .catch((err) => {
      let error = {
        'isError': true, 'error_no': err.original.errno,
        'error_code': err.original.code,
        'message': 'Something went wrong'
      };
      return error;
    });
}

async function generateToken(_id = null, user_agent=null) {
    let time = new Date().getTime();
    let loginId = Math.random().toString(36).substring(2, 15) + String(time).substring(2, 10) + Math.random().toString(36).substring(2, 15);
    let secret_key = config.get('configuration.encryptedId');
    // create a token
    // console.log('mongo  ',Token);
    let encryptedId = encryption.encrypt(String(secret_key));
    var jwtToken = jwt.sign({ id: encryptedId }, secret_key, {
      expiresIn: 60 * 2 // expires in 2 minutes
    });

    let encryptedLoginId = encryption.encrypt(String(secret_key));
    var refreshToken = jwt.sign({ id: encryptedLoginId }, secret_key, {
      expiresIn: 60 * 3 // expires in 3 minutes
    });

          Token.create({
            token: jwtToken,
            refreshtoken: refreshToken,
            loginId: loginId,
            user_id: _id,
            os: user_agent.os,
            browser: user_agent.browser,
            platform: user_agent.platform,
            loginTime: (new Date().getTime()),
          }, function (err, token) {
              if (err) {
                let error = { 'isError': true, 'message': 'Something went wrong' };
                return error;
              }
              let tokenResp = {'jwttoken': token.token, 'refreshToken': token.refreshtoken };
              return tokenResp;
          });
}

exports.registerUser = (req, res) => {
  const users = req.body;
  return mysql.sequelize.transaction(t => {
    // chain all your queries here. make sure you return them.
    return mysql.users.create(users, { transaction: t }).then(user => {
      const currentId = user.id;
    });
  }).then(result => {
    res.status(200).json({ 'success': true, 'message': 'register successfully' });
  }).catch(err => {
    res.status(200).json({ 'success': false, 'message': 'failed to register', 'sqlMessage': err.message });
  });
};
