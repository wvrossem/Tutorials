"use strict"

const
	net    = require('net'),
	client = net.connect({port: 5432});

client.on('data', (data) => {
	let msg = JSON.parse(data);

	if(msg.type === 'watching') {
		console.log("Now watching " + msg.file);
	} else if(msg.type === 'changed') {
		let date = new Date(msg.timestamp);
		console.log("File " + msg.file + " changed at " + date);
	} else {
		throw Error('Unrecognized type: ' + msg.type);
	}
});