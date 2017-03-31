var express = require('express');
var app = express();
var Band = require('./shared/classes/band.js');
var mysql = require('mysql');
var bodyParser = require('body-parser')
var authLogin = require('./server/services/loginService.js');

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'test',
    database : 'band',
});

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
    console.log('USERNAME: ' + req.body.username);
    if (!req.body) {
        res.sendStatus(400)
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

app.use(express.static('client'));
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
});

