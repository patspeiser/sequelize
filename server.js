var http = require('http');
var server = http.createServer(require('./app'));
var DB = require('./models/index.js');

DB.User.sync({})
.then(function(){
		return DB.Page.sync({})
})
.then(function(){
	server.listen(process.env.PORT, function(){
		console.log('listening on... ' + process.env.PORT);
	});
})
.catch(console.error);
