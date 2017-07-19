//reinderiza post '/informacoes' para informacoes.ejs
module.exports = function(app){
	app.post('/informacoes', function(req, res){
		var inf = req.body;
		//var htmlToPdf = require('html-to-pdf');
		res.render('informacoes',{dados: inf});
	})
}