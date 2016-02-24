'use strict';

const
	async = require('async'),
	file  = require('file'),
	rdfParser = require('./lib/rdf-parser.js'),

	work = async.queue((path, done) => {
		rdfParser(path, (err, doc) => {
			console.log(doc);
			done();
		})
	}, 1000);

file.walk(__dirname + '/cache', (err, dirPath, dirs, files) => {
	files.forEach((path) => {
		work.push(path);
	});
});