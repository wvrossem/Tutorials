"use strict";

const
	net = require('net'),

	server = net.createServer((c) => {

		console.log('Subscriber connected.');

		c.write('{"type":"changed","file":"targ');

		let timer = setTimeout(() => {
			c.write('et.txt","timestamp":1358175758495}' + "\n");
			c.end();
		}, 1000);

		c.on('end', () => {
			clearTimeout(timer);
			console.log('subsciber disconnected');
		});

	});

server.listen(5432, () => {
	console.log('Listening for subscribers to connect');
});