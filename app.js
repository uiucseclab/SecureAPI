var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Trip = require('./models/trip');
var encryption = require('./encryption');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

mongoose.connect('mongodb://localhost:27017/trips');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.text());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    console.log('request made');
    next();
});

app.post('/trip', function (req, res) {
    console.log(req.body);
    var decryptedBody = encryption.decrypt(req.body);
    console.log(decryptedBody);

    var json = JSON.parse(decryptedBody);
    console.log(json.meters);
    

    var trip = new Trip(json);
    trip.save(function (err) {
        if (err)
            res.send(err);
    
        res.json({message: 'Trip saved!'});
    });

});

app.get('/trips', function (req, res) {
    console.log("getting trips");
    Trip.find(function (err, trips) {
        if (err)
            res.send(err);
        var responseString = JSON.stringify(trips);
        var encryptedString = encryption.encrypt(responseString);
        
        res.send(encryptedString);
    });
});


app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
