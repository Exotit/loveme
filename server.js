var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');

// Load environment variables from .env file
dotenv.load();

// Models
var User = require('./models/User');

// Controllers
var userController = require('./controllers/user');
var chapterController = require('./controllers/chapter');

var app = express();


mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function (err) {
    console.log(err);
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    //  process.exit(1);
});
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    req.isAuthenticated = function () {
        var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
        try {
            return jwt.verify(token, process.env.TOKEN_SECRET);
        } catch (err) {
            return false;
        }
    };

    if (req.isAuthenticated()) {
        var payload = req.isAuthenticated();
        User.findById(payload.sub, function (err, user) {
            req.user = user;
            next();
        });
    } else {
        next();
    }
});

app.put('/account', userController.ensureAuthenticated, userController.accountPut);
app.get('/chapter/:chapter', chapterController.getChapter);
app.get('/chapter/:chapter/slide/:slide', chapterController.getSlide);
app.delete('/account', userController.ensureAuthenticated, userController.accountDelete);
app.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink);
app.post('/auth/facebook', userController.authFacebook);
app.get('/auth/facebook/callback', userController.authFacebookCallback);

app.get('*', function (req, res) {
    res.redirect('/#' + req.originalUrl);
});
//test
// Production error handler
if (app.get('env') === 'production') {
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.sendStatus(err.status || 500);
    });
}

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
