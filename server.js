var express = require('express');
var app = express();
var compression = require('compression');
var helmet = require('helmet');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var nconf = require('nconf');
const fs = require('fs');
app.use(compression());
app.use(helmet());
app.use(express.static('public'));

var environment = process.env.NODE_ENV


const json = fs.readFileSync(__dirname + '/config.json', 'utf8')

var jsonObj = json ? JSON.parse(json) : {};

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

http.listen(jsonObj.http.port, function () {

    console.log('listening on *:3001');

});


var ami = new require('asterisk-manager')(jsonObj.asterisk.port, jsonObj.asterisk.host, jsonObj.asterisk.userName, jsonObj.asterisk.password, true);

// In case of any connectiviy problems we got you coverd.
ami.keepConnected();

//handle when someone hangup Phone
ami.on('hangup', function (evt) {
    io.sockets.emit('hangup', evt);
});

//handle when someone dial Phone
ami.on('dial', function (evt) {
    io.sockets.emit('dial', evt);
});