var express = require('express');
var Band = require('./shared/classes/band.js');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var authLogin = require('./server/services/loginService.js');
var hbs = require('express-hbs');
var registerUser = require('./server/services/userRegistrationService.js');
var bandService = require('./server/services/bandService.js');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var config;
try{
    config = require('./config.json');
}
catch (e){
    config = {
        db: {
            host: 'localhost',
            user: 'root',
            password: 'test',
            database: 'band'
        }
    };
}

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
app.use(express.static('static'));

//db connection
var connection = mysql.createConnection(config.db);

//session setup
var sessionStore = new MySQLStore({}, connection);
 
app.use(session({
    secret: "omgthisissosecret23847wdfh28wbervw34a87gvbarev",
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 360000
    }
}));

app.get('/login', function (req, res){
    res.render('login');
});

var checkSession = function (req, res, next){
    if( req.session.userId === undefined ){
        res.redirect('/login');
    }
    else{
        return next();
    }
};

app.get('/', checkSession, function (req, res){
    res.redirect('/main');
});

app.get('/register', checkSession, function (req, res){
    res.render('register');
});

app.get('/main', checkSession, function (req, res){
    res.render('main');
});

app.get('/bands', checkSession, function (req, res){
    res.render('bands');
});

app.get('/bands/register', checkSession, function (req, res){
    res.render('registerBand');
});

app.post('/api/login', function (req, res){
    if (!req.body) {
        res.sendStatus(400);
    }
    authLogin(req.body.username, req.body.password, connection)
    .then(function (result) {
        if (result == true) {
            req.session.userId = 1; //TODO: Un-Hardcode me pls
            res.sendStatus(200);
        }
        else {
            req.session.userId = undefined;
            res.sendStatus(400);
        }
    })
    .catch(function (e) {
        res.sendStatus(500, {
            error: e
        });
    });
});

app.post('/api/register', function (req, res){
    if (!req.body) {
        res.sendStatus(400);
    }
    registerUser(req.body.username, req.body.password, req.body.email, connection)
    .then(function (result) {
        if (result == true) {
            res.sendStatus(200);
        }
        else {
            res.status(400);
            res.send(result);
        }
    })
    .catch(function (e) {
        res.sendStatus(500, {
            error: e
        });
    });
});

app.post('/api/bands/register', function (req, res){
    if (!req.body) {
        res.sendStatus(400);
    }
    bandService.registerBand(req.body.userId, req.body.bandName, req.body.description, connection)
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

app.get('/api/bands', function (req, res) {
    if (req.query.userid == undefined) {
        res.sendStatus(400);
    }
    bandService.getAllBands(req.query.userid, connection)
    .then(function (result) {
        if (result != false) {
            res.status(200);
            res.send(result);
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

app.get('/api/bands/:bandId', function (req, res) {
    if (req.params == undefined) {
        res.sendStatus(400);
    }
    bandService.getBand(req.params.bandId, connection)
    .then(function (result) {
        if (result != false) {
            res.status(200);
            res.send(result);
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

