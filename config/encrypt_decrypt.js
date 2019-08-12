const config  = require('config');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
var primaryPassword = config.get('configuration.jwtKey.primaryKey');
var secondaryPassword = config.get('configuration.jwtKey.secondaryKey');
var encryptPassword = config.get('configuration.encryptedId');
var password = primaryPassword+secondaryPassword;

function encrypt(text,refreshToken = null){
    if(refreshToken != null) { password = encryptPassword; }
    var cipher = crypto.createCipher(algorithm, password);
    return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
  }
  
  function decrypt(text,refreshToken = null) {
    if(refreshToken != null) { password = encryptPassword; }
    var cipher = crypto.createDecipher(algorithm, password);
    return cipher.update(text, 'hex', 'utf8') + cipher.final('utf8');
  }

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;