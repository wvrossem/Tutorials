'use strict';

const
    fs = require('fs'),
    zmq = require('zmq'),

    responder = zmq.socket('rep');

responder.on('message', (data) => {

    let request = JSON.parse(data);
    console.log('Received request to get: ' + request.path);

    fs.readFile(request.path, (err, data) => {
        console.log('Sending response content');
        responder.send(JSON.stringify({
            content: data.toString(),
            timestamp: Date.now(),
            pid: process.pid
        }))
    } );
});

responder.bind('tcp://*:5432', (err) => {

    console.log('Listening for zmq requests');
});

process.on('SIGINT', () => {
    console.log('Shutting down');
    responder.close();
})