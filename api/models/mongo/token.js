var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  token: String,
  refreshtoken: String,
  loginId: String,
  user_id: String,
  os: String,
  browser: String,
  platform: String,
  loginTime: { type : String }
});
mongoose.model('Token', UserSchema);

module.exports = mongoose.model('Token');