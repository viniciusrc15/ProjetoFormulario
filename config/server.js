//Importa módulos
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');

//executa func express
app = express();

//seta views ejs e caminho
app.set('view engine','ejs');
app.set('views','./app/views');

//Arquivos estaticos e body-parser
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));

//mapeia caminho rotas
consign()
	.include('app/routes')
	.into(app);

//exporta configurção servidor 
module.exports =  app;