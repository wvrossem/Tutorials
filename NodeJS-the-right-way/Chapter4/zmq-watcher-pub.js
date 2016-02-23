'use strict';

const
    fs = require('fs'),
    zmq = require('zmq'),

    publisher = zmq.socket('pub'),

    filename = process.argv[2];

fs.watch(filename, () => {

    publisher.send(JSON.stringify({
        type: 'changed',
        file: filename,
        timestamp: Date.now()
    }))
});

publisher.bind('tcp://*:5432', (err) => {
    console.log('Listening for zmq subscribers');
});
