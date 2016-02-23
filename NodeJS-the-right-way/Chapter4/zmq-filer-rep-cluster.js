'use strict';

const	
	cluster = require('cluster'),
	fs = require('fs'),
	zmq = require('zmq');

if(cluster.isMaster) {

	let
		router = zmq.socket('router').bind('tcp://127.0.0.1:5433'),
		dealer = zmq.socket('dealer').bind('ipc://filer-dealer.ipc');

	router.on('message', function() {
		let frames = Array.prototype.slice.call(arguments);
		dealer.send(frames);
	});

	dealer.on('message', function() {
		let frames = Array.prototype.slice.call(arguments);
		router.send(frames);
	});

	cluster.on('online', (worker) => {
		console.log('Worker ' + worker.process.pid + ' is online');
	})

	for(let i = 0; i < 3; i++) {
		cluster.fork();
	}

} else {

	let responder = zmq.socket('rep').connect('ipc://filer-dealer.ipc');

	responder.on('message', (data) => {
		let request = JSON.parse(data);
		console.log('Worker ' + process.pid + ' received request for ' + request.path);

		fs.readFile(request.path, (err, data) => {
        	responder.send(JSON.stringify({
            	content: data.toString(),
            	timestamp: Date.now(),
            	pid: process.pid
        	}))
        });
    } );
}