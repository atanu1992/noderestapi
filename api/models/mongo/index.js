const fs = require('fs');
const path = require('path');
var mongoose = require('../../../config/mongo_connect');
const modelsPath = path.resolve(__dirname)
fs.readdirSync(modelsPath).forEach(file => {
    if(file != 'index.js') {
        require(modelsPath + '/' + file);
    }
})