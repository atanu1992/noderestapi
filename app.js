const express = require('express');
const bodyParser =  require('body-parser');
const botCheck = require('./config/bot-check');
const helmet  = require('helmet');
const morgan  = require('morgan');
const cors  = require('cors');
const app = express();
// var mongoose = require('./config/mongo_connect');
// header protection
app.use(helmet());
app.use(morgan('combined'));
// csp
// app.use(helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'"]
//     }
// }));
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/practice',{useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
     // we're connected!
     console.log('connected to mongodb');
   });

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({origin:true,credentials: true,
     // exposedHeaders: ['Content-Length','X-Token']
}));

// bot user check
app.use(botCheck);
// routes
const v1Routes = require('./routes/v1/index');
app.use('/api/v1/',botCheck,v1Routes);

module.exports = app;