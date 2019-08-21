const config = require('config');
const mongo = require('../models/mongo');

    exports.addLoginDetails = (req, res) => {
        mongo.logindetails.create({
            user_id: req.body.user_id,
            loginId: req.body.login_id,
            loginTime: req.body.login_time,
            browser: req.body.browser,
            device: req.body.device,
            ip: req.body.geoip,
            country: req.body.country,
            city: req.body.city,
            fail_attempt: req.body.fail_attempt,
            token: req.body.token,
            status: req.body.status
        }, function (err, token) {
            if (err) {
                let error = { 'isError': true, 'message': 'Something went wrong' };
                return error;
            }
            res.status(200).json({code:200,msg:'login details added successfully'});
    });

}

exports.addRegisterDetails = (req, res) => {
    mongo.logindetails.create({
        user_id: req.body.user_id,
        loginId: req.body.login_id,
        loginTime: req.body.login_time,
        browser: req.body.browser,
        device: req.body.device,
        ip: req.body.geoip,
        country: req.body.country,
        city: req.body.city,
        fail_attempt: req.body.fail_attempt,
        token: req.body.token,
        status: req.body.status
    }, function (err, token) {
        if (err) {
            let error = { 'isError': true, 'message': 'Something went wrong' };
            return res.status(200).json(error);
        }
        return res.status(200).json({code:200,msg:'login details added successfully'});
});

}