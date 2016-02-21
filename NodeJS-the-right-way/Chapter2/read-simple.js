const fs = require('fs');

fs.readFile('x', (err, data) => {
	if(err) {
		console.dir(err);
		throw err;
	}

	console.log(data.toString());
});