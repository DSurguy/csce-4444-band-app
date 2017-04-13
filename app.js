var express = require('express');
var Band = require('./shared/classes/band.js');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var loginService = require('./server/services/loginService.js');
var hbs = require('express-hbs');
var registerUser = require('./server/services/userRegistrationService.js');
var bandService = require('./server/services/bandService.js');
var friendService = require('./server/services/friendService.js');
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
        maxAge: 3600000
    }
}));

app.get('/login', function (req, res){
    res.render('login');
});
app.get('/register', function (req, res){
    res.render('register');
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


app.get('/main', checkSession, function (req, res){
    res.render('main');
});

app.get('/bands', checkSession, function (req, res){
    res.render('bands');
});

app.get('/bands/register', checkSession, function (req, res){
    res.render('registerBand');
});

app.get('/bands/band/:bandId', checkSession, function (req, res){
    res.render('band');
});

app.get('/friends', checkSession, function (req, res){
    res.render('friends');
});

app.get('/friends/add', checkSession, function (req, res){
    res.render('addFriend');
});

app.get('/bands/search', checkSession, function (req, res){
    res.render('searchBands');
});

app.post('/api/login', function (req, res){
    if (!req.body) {
        res.sendStatus(400);
    }
    loginService.authLogin(req.body.username, req.body.password, connection)
    .then(function (result) {
        if (result != false) {
            req.session.userId = result; 
            res.sendStatus(200);
        }
        else {
            req.session.userId = undefined;
            res.sendStatus(400);
        }
    })
    .catch(function (e) {
        res.status(500).send({error:e})
    });
});

app.post('/api/logout', function (req, res){
    req.session.destroy();
    res.status(200).redirect('/login');
});

app.post('/api/register', function (req, res){
    if (!req.body) {
        res.sendStatus(400);
    }
    registerUser(req.body.username, req.body.password, req.body.firstName, req.body.lastName, req.body.bio, req.body.email, connection)
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
        res.status(500).send({error:e})
    });
});

app.post('/api/bands/register', function (req, res){
    if (!req.body) {
        res.sendStatus(400);
    }
    bandService.registerBand(req.session.userId, req.body.bandName, req.body.description, req.body.genre, connection)
    .then(function (result) {
        if (result == true) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(400);
        }
    })
    .catch(function (e) {
        res.status(500).send({error:e})
    });
});

app.get('/api/bands', function (req, res) {
    bandService.getAllBands(req.session.userId, connection)
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
        res.status(500).send({error:e})
    });
});

app.get('/api/bands/band/:bandId', function (req, res) {
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
        res.status(500).send({error:e})
    });
});

app.get('/api/friends', function (req, res) {
    friendService.getAllFriends(req.session.userId, connection)
    .then(function (result) {
        if (result) {
            res.status(200);
            res.send(result);
        }
        else {
            res.sendStatus(400);
        }
    })
    .catch(function (e) {
        res.status(500).send({error:e})
    });
});

app.post('/api/friends/search', function (req, res) {
    if (!req.body) {
        res.sendStatus(400);
    }
    friendService.search(req.session.userId, req.body.searchString, connection)
    .then(function (result) {
        if (result) {
            res.status(200);
            res.send(result);
        }
        else {
            res.sendStatus(400);
        }
    })
    .catch(function (e) {
        res.status(500).send({error:e})
    });
});

app.post('/api/friends/updatestatus', function (req, res) {
    if (!req.body) {
        res.sendStatus(400);
    }
    friendService.updateFriendStatus(req.session.userId, (req.body.toUserId).replace('modal',''), req.body.status, connection)
    .then(function (result) {
        if (result) {
            res.status(200);
            res.send(result);
        }
        else {
            res.sendStatus(400);
        }
    })
    .catch(function (e) {
        res.status(500).send({error:e});
    });
});

app.post('/api/bands/search', function (req, res) {
    if (!req.body) {
        res.sendStatus(400);
    }
    bandService.search(req.session.userId, req.body.searchString, connection)
    .then(function (result) {
        if (result) {
            res.status(200);
            res.send(result);
        }
        else {
            res.sendStatus(400);
        }
    })
    .catch(function (e) {
        res.status(500).send({error:e})
    });
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});

