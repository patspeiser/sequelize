var express = require('express');
var app = express();
var swig = require('swig');
var DB = require('./models/index.js');
var bodyParser = require('body-Parser');
var router = require('./routes/wiki.js');

module.exports = app;

swig.setDefaults({cached: false});
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname +'/views');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/node_modules/'));

app.get('/', function(req, res){
	res.send('at /');
});

app.use('/wiki', router);
