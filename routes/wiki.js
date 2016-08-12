var router = require('express').Router();
var models = require('../models');

var Page = models.Page;
var User = models.User;

module.exports = router;

router.get('/', function(req, res){
	res.redirect('/');
});

router.post('/', function(req, res){
	var title = req.body.title;
	var content = req.body.pageContent;

	var page = Page.build({
		title: title,
		content: content,
	});
	page.save().then( function(stuff){
		res.json(stuff)
	}).catch( function(){
		res.redirect('/');
	})
})

router.get('/add', function(req, res){
	res.render('addpage.html');
})

router.get('/:page', function(req, res, next){
	var page = req.params.page;
	Page.findOne({
		where: {
			urlTitle: page
		}
	})
	.then( function(foundPage){
		res.render('wikipage', {page: foundPage});
	}).then( function(data){
	
	})
	.catch(next);		
});
