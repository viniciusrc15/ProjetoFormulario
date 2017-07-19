$(document).ready( function() {
	$(document).ready( function() {
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
	});
});
