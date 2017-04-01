var express = require('express');
var Band = require('./shared/classes/band.js');
var mysql = require('mysql');
var bodyParser = require('body-parser')
var authLogin = require('./server/services/loginService.js');
var hbs = require('express-hbs');
var authUserRegistration = require('./server/services/userRegistrationService.js');
var config = require('./config.json');

var app = express();

/* Setup Views */
// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials',
  layoutsDir: __dirname + '/views/layouts',
  defaultLayout: __dirname + '/views/layouts/base'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));

var connection = mysql.createConnection(config.db);

var fakeBands = {
    1: new Band({
        id: 1,
        name: 'TestBand',
        ownerId: 0, //owned by user with id 0
        ownerName: 'Jimbo'
    })
};

app.get('/bands', function (req, res) {
    var bandIds = Object.keys(fakeBands);
    res.send({bands:bandIds.map(function (id){
        return fakeBands[id];
    })});
});

app.get('/bands/:id', function (req, res) {
    res.send({band: fakeBands[req.params.id]});
});

app.post('/api/login', function (req, res) {
    if (!req.body) {
        res.sendStatus(400);
        res.send(false);
    }
    authLogin(req.body.username, req.body.password, connection)
    .then(function (result) {
        if (result == true) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(400);
        }
    })
    .catch(function (e) {
        res.sendStatus(500, {
            error: e
        });
    });
});

app.get('/login', function (req, res){
    res.render('login');
});

app.get('/register', function (req, res){
    res.render('register');
});

app.get('/main', function (req, res){
    res.render('main');
});

app.use(express.static('static'));

app.post('/api/registration', function (req, res) {
    if (!req.body) {
        res.sendStatus(400);
        res.send(false);
    }
    authLogin(req.body.username, req.body.password, req.body.email, connection)
    .then(function (result) {
        if (result == true) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(400);
        }
    })
    .catch(function (e) {
        res.sendStatus(500, {
            error: e
        });
    });
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});

