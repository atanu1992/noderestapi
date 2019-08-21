var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
    user_id: Number,
    loginId: {type: String, required: true},
    loginTime: {type: Date, required: true},
    browser: {type: String, default: null},
    platform: {type: String, default: null},
    ip: {type: String, default: null},
    country: {type: String, default: null},
    city: {type: String, default: null},
    latitude: {type: String, default: null},
    longitude: {type: String, default: null},
    fail_attempt: {type: String, default: null},
    token: {type: String, default: null},
    status: {type: String, enum :['0','1'], default: '0'}
});
mongoose.model('logindetails', UserSchema);

module.exports = mongoose.model('logindetails');