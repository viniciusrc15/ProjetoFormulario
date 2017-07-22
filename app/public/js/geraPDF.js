//Responsavel por gerar PDF
$(document).ready( function() {
	//Imprime certo porem hora sim hora nao
	console.log($(window).load());
	$('#geraPdf').click(function() {
		var doc = new jsPDF('Landscap', 'pt', 'a4');
		doc.addHTML($('body'), function() {
			doc.save("informacoes.pdf");
		});
	});
});
	/*
		imprime desconfigurado

		$('#geraPdf').click(function() {
			var doc = new jsPDF('Portrait', 'pt', 'a4');;
			var elementHandler = {
            	'#fim': function (element, renderer) {
                	return true;
				}
			};
			
			console.log($('#conteudo').html());

			doc.fromHTML($('#conteudo').html(), 5, 5, {
				'width': 500,
				'elementHandlers': elementHandler
			}, function(){doc.save("informacoes.pdf");});
		});
	fim coment

}); 

$(document).ready( function() {
	$(document).ready( function() {
		$('#geraPdf').click(function() {
			var doc = new jsPDF('p','pt', 'a3');
			var elementHandler = {
            	'#fim': function (element, renderer) {
                	return true;
				}
			};
			
			console.log($('#conteudo').html());

			doc.fromHTML($('#conteudo').html(), 15, 15, {
				'width': 500,
				'elementHandlers': elementHandler
			}, function(){doc.save("informacoes.pdf");});
		});
	});
});
	*/
