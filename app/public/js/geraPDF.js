/*//Responsavel por gerar PDF
$(document).ready( function() {
	//Imprime certo porem hora sim hora nao
	console.log($(window).load());
	$('#geraPdf').click(function() {
<<<<<<< HEAD
		var doc = new jsPDF('Landscap', 'pt', 'a4');
=======
		var doc = new jsPDF('Landscape', 'pt', 'a4');
>>>>>>> 2396c2d5bc27b28b4adc99a8c07208d4ce04a942
		doc.addHTML($('#conteudo'), function() {
			doc.save("informacoes.pdf");
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

}); */

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