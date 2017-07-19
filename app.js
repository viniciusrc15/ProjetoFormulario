//Importa configurãção do servidor
var app = require("./config/server");

//Ouve na porta 8080, se tiver bloqueadoa porta é so mudar o parâmetro
app.listen(8080,function(){
	console.log("Aplicação rodando em Express");
});