"use strict"

const
	net    = require('net'),
	ldj    = require('./ldj'),
	netClient = net.connect({port: 5432}),
	ldjClient = ldj.connect(netClient);

ldjClient.on('message', (msg) => {
	if(msg.type === 'watching') {
		console.log("Now watching " + msg.file);
	} else if(msg.type === 'changed') {
		let date = new Date(msg.timestamp);
		console.log("File " + msg.file + " changed at " + date);
	} else {
		throw Error('Unrecognized type: ' + msg.type);
	}
});