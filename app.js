var express = require('express');
var app = express();
var Band = require('./shared/classes/band.js');

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

app.use(express.static('client'));
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
});