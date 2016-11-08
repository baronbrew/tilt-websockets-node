#!/usr/bin/env node

var path = require('path');
var pkg = require(path.join(__dirname, 'package.json'));
var Bleacon = require('bleacon');


var activeSockets = [];
var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({ port: 8000 });

wss.on('connection', function connection(ws) {
    activeSockets.push(ws);
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

});


// Parse command line options

var program = require('commander');

Bleacon.on('discover', function (bleacon) {
    tilt = {
        "a495bb10c5b14b44b5121370f02d74de": "Red",
        "a495bb20c5b14b44b5121370f02d74de": "Green",
        "a495bb30c5b14b44b5121370f02d74de": "Black",
        "a495bb40c5b14b44b5121370f02d74de": "Purple",
        "a495bb50c5b14b44b5121370f02d74de": "Orange",
        "a495bb60c5b14b44b5121370f02d74de": "Blue",
        "a495bb70c5b14b44b5121370f02d74de": "Pink"
    };
    if (tilt[bleacon.uuid] != null) {
        var message = bleacon;
        message.timeStamp = Date.now();
        activeSockets.forEach(function (element) {
            try {
                element.send(JSON.stringify(message));
            } catch (e) {

            }

        }, this);

        console.log(tilt[bleacon.uuid] + ' ' + bleacon.major + ',' + bleacon.minor);
    }

});

Bleacon.startScanning();

//
console.log('Scanning:');