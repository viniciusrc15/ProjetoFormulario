module.exports = function(app){
	app.post('/informacoes', function(req, res){
		var inf = req.body;
		res.render('informacoes',{dados: inf});
	})
}