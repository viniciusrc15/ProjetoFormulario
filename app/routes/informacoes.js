module.exports = function(app){
	app.post('/informacoes', function(req, res){
		var inf = req.body;
		console.log(inf);
		res.render('informacoes',{noticia: inf});
	})
}