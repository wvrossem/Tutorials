"use strict";

const 
	fs       = require('fs'),
	spawn    = require('child_process').spawn,
	filename = process.argv[2];

if(!filename) {
	throw Error("A filename must be specified");
}

fs.watch(filename, () => {
	let 
		ls = spawn('ls', ['-lh', filename]),
		output = '';

	ls.stdout.on('data', (chunk) => {
		output += chunk.toString();
	})

	ls.on('close', () => {
		let parts = output.split(/\s+/);
		console.dir([parts[8], parts[7]]);
	})

	console.log("Waching " + filename + " for changes");
});