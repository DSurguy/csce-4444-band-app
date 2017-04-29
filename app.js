var express = require('express');
var fileUpload = require('express-fileupload');
var Band = require('./shared/classes/band.js');
var BandMember = require('./shared/classes/bandMember.js');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var loginService = require('./server/services/loginService.js');
var hbs = require('express-hbs');
var registerUser = require('./server/services/userRegistrationService.js');
var bandService = require('./server/services/bandService.js');
var merchService = require('./server/services/merchService.js');
var friendService = require('./server/services/friendService.js');
var notificationService = require('./server/services/notificationService.js');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var path = require('path');

var imageFilesRoot= path.resolve('static/media');

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
app.use(fileUpload());

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

app.get('/bands/search', checkSession, function (req, res){
    res.render('searchBands');
});

app.get('/bands/:bandId', checkSession, function (req, res){
    res.render('band');
});

app.get('/notifications', checkSession, function (req, res){
    res.render('notifications');
});

app.get('/friends', checkSession, function (req, res){
    res.render('friends');
});

app.get('/friends/add', checkSession, function (req, res){
    res.render('addFriend');
});

app.get('/bands/:bandId/applications/', checkSession, function (req, res){
    res.render('applications');
});

app.get('/bands/:bandId/addmerch/', checkSession, function (req, res){
    res.render('addMerch');
});

app.get('/bands/:bandId/inventory', checkSession, function (req, res){
    res.render('inventory');
})

app.post('/api/login', function (req, res){
    if (!req.body) {
        res.sendStatus(400);
    }
    loginService.authLogin(req.body.username, req.body.password, connection)
    .then(function (result) {
        if (result) {
            req.session.userId = result; 
            res.sendStatus(200);
        }
        else {
            req.session.userId = undefined;
            res.sendStatus(400);
        }
    })
    .catch(function (e) {
        res.status(500).send({error:e});
    });
});

app.post('/api/logout', checkSession, function (req, res){
    req.session.destroy();
    res.status(200).redirect('/login');
});

app.post('/api/register', function (req, res){
    if (!req.body) {
        res.sendStatus(400);
    }
    registerUser(req.body.username, req.body.password, req.body.firstName, req.body.lastName, req.body.bio, req.body.email, connection)
    .then(function (result) {
        if (result) {
            res.sendStatus(200);
        }
        else {
            res.status(400);
            res.send(result);
        }
    })
    .catch(function (e) {
        res.status(500).send({error:e});
    });
});

app.post('/api/bands/register', checkSession, function (req, res){
    if (!req.body) {
        res.sendStatus(400);
    }
    bandService.registerBand(req.session.userId, req.body.bandName, req.body.description, req.body.genre, connection)
    .then(function (result) {
        if (result) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(400);
        }
    })
    .catch(function (e) {
        res.status(500).send({error:e});
    });
});

app.get('/api/bands', checkSession, function (req, res) {
    bandService.getAllBands(req.session.userId, connection)
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

app.get('/api/bands/:bandId', checkSession, function (req, res) {
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
        res.status(500).send({error:e});
    });
});

app.get('/api/friends', checkSession, function (req, res) {
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
        res.status(500).send({error:e});
    });
});

app.post('/api/friends/search', checkSession, function (req, res) {
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
        res.status(500).send({error:e});
    });
});

app.post('/api/friends/updatestatus', checkSession, function (req, res) {
    if (!req.body) {
        res.status(500).send({
            error: 'Bad Request'
        });
    }
    else{
        friendService.updateFriendStatus(req.session.userId, parseInt(req.body.toUserId, 10), parseInt(req.body.status, 10), connection)
        .then(function (result) {
            res.status(200).end();
        })
        .catch(function (e) {
            res.status(500).send({error:e});
        });
    }
});

app.post('/api/bands/search', checkSession, function (req, res) {
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
        res.status(500).send({error:e});
    });
});

app.post('/api/bands/:bandId/submitApplication', checkSession, function (req, res) {
    if (!req.body) {
        res.sendStatus(400);
    }
    bandService.submitApplication(req.session.userId, req.params.bandId, req.body.instrument, req.body.message, req.body.applicationStatus, connection)
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

app.post('/api/bands/cancelApplication', checkSession, function (req, res) {
    if (!req.body) {
        res.sendStatus(400);
    }
    bandService.cancelApplication(req.session.userId, (req.body.bandId).replace('modal',''), connection)
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

app.get('/api/notifications', checkSession, function (req, res){
    if( typeof req.query.count !== 'undefined' ){
        notificationService.getNotificationCount(connection, req.session.userId, (typeof req.query.unread !== 'undefined') )
        .then(function (count){
            res.status(200).send({count: count});
        })
        .catch(function (err){
            res.status(500).send({
                error: err.stack
            });
        });
    }
    else{
        notificationService.getNotifications(connection, req.session.userId, (typeof req.query.unread !== 'undefined'))
        .then(function (notifications){
            res.status(200).send(notifications);
        })
        .catch(function (err){
            res.status(500).send({
                error: err.stack
            });
        });
    }
});

app.get('/api/bands/:bandId/applications', checkSession, function (req, res) {
    if (req.params == undefined) {
        res.sendStatus(400);
    }
    bandService.getAllApplications(req.session.userId, req.params.bandId, connection)
    .then(function (result) {
            res.status(200);
            res.send(result);
    })
    .catch(function (e) {
        res.status(500).send({error:e});
    });
});

app.post('/api/bands/:bandId/processapplication', checkSession, function (req, res) {
    if (req.params == undefined) {
        res.sendStatus(400);
    }
    if (!req.body) {
        res.sendStatus(400);
    }
    bandService.processApplication(req.session.userId, req.params.bandId, req.body.applicationId, req.body.processStatus, req.body.applicationStatus, connection)
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
        res.status(500).send({error:e});
    });
});

app.get('/api/bands/:bandId/role', checkSession, function (req, res) {
    if (req.params == undefined) {
        res.sendStatus(400);
    }
    bandService.getBandMemberRole(req.session.userId, req.params.bandId, connection)
    .then(function (result) {
        if (result) {
            // passing integer result for role, so I had to use this deprecated res format...
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

app.post('/api/bands/:bandId/addmerch', checkSession, function (req, res) {
    if (req.params == undefined) {
        res.sendStatus(400);
    }
    if (!req.body) {
        res.sendStatus(400);
    }

    // Check that the user has rights to add merch
    bandService.getBandMemberRole(req.session.userId, req.params.bandId, connection)
    .then(function (result) {
        if (result.role === BandMember.ROLE.OWNER || result.role === BandMember.ROLE.MANAGER) {
            return merchService.uploadImage(req.params.bandId, req.files.merchImage, imageFilesRoot);
        }
        else {
            //TODO: Fix these promise chains to chain properly.
            return Promise.resolve(false);
        }
    })
    .then(function (relativePath) {
        if (relativePath) {
            return merchService.createItem(req.session.userId, req.params.bandId, req.body.name, req.body.description, req.body.price, req.body.merchType, req.body.color, relativePath, req.body.size, req.body.quantity, connection);
        }
        else {
            return Promise.resolve(false);
        }
    })
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

app.get('/api/bands/:bandId/inventory', checkSession, function (req, res) {
    if (req.params == undefined) {
        res.sendStatus(400);
    }
    // Check that the user has rights to view merch
    bandService.getBandMemberRole(req.session.userId, req.params.bandId, connection)
    .then(function (result) {
        if (result.role != BandMember.ROLE.NONE) {
            return merchService.getItems(req.session.userId, req.params.bandId, connection);
        }
        else {
            return Promise.resolve(false);
        }
    })
    .then(function (result) {
        return result == false ? false : merchService.getImages(result);
    })
    .then(function (result) {
        return result == false ? false : merchService.getInventory(result, connection);
    })
    .then(function (result) {
        res.status(200);
        res.send(result || []);
    })
    .catch(function (e) {
        res.status(500).send({error:e});
    });
});

app.post('/api/bands/:bandId/updateinventory', checkSession, function (req, res) {
    if (req.params == undefined) {
        res.sendStatus(400);
    }
    // Check that the user has rights to update merch
    bandService.getBandMemberRole(req.session.userId, req.params.bandId, connection)
    .then(function (result) {
        if (result.role === BandMember.ROLE.OWNER || result.role === BandMember.ROLE.MANAGER) {
            return merchService.updateInventory(req.session.userId, req.params.bandId, connection);
        }
        else {
            return Promise.resolve(false);
        }
    })
    .then(function (result) {
        res.status(200);
        res.send(result);
    })
    .catch(function (e) {
        res.status(500).send({error:e});
    });
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});

