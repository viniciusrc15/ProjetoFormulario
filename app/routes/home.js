//reinderiza get '/' para home.ejs
module.exports = function(app){
	app.get('/', function(req, res){
		res.render("home");
	});
}