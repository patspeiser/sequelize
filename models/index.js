var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
	logging: false
})

var makeURLTitle = function(title){
  title = title.replace(/\s+/g, '_')
  title = title.replace(/[\W]+/g, '')
  return title;
};

//create pages schema
var Page = db.define('page', {
	title: { type: Sequelize.STRING, allowNull: false },
	urlTitle: { type: Sequelize.STRING, allowNull: false },
	content: { type: Sequelize.TEXT, allowNull: false, notEmpty: true},
	date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
	status: Sequelize.ENUM('open', 'closed'),
	route: { type: Sequelize.VIRTUAL, set: function(){
			return '/wiki/' + this.urlTitle;	
		}
	}
} , {
	hooks: { 
			beforeValidate: function(page, options){
				console.log(page.title);
				page.urlTitle = makeURLTitle(page.title);
			}
	}
});

var User = db.define('user', {
	name: {type: Sequelize.STRING, allowNull: false },
	email: { type: Sequelize.STRING, allowNull: false, isEmail: true }
})

module.exports = {
	Page: Page,
	User: User,
	makeURLTitle: makeURLTitle
}

