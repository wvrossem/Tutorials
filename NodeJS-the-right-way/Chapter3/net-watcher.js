'use strict';

const 
	fs  = require('fs'),
	net = require('net'),

	filename = process.argv[2],

	server = net.createServer((c) => {

		console.log('Subscriber connected');
		c.write("Watching " + filename + " for changes \n");

		let watcher = fs.watch(filename, () => {
			c.write('File ' + filename + ' changed at ' + Date.now() + '\n');
		});

		c.on('close', () => {
			console.log('Subscriber disconnected');
			watcher.close();
		})
	});

if(!filename) {
	throw Error('File required');
}

server.listen(5432, () => {
	console.log("Waiting for subscribers");
});
