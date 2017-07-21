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

$(document).ready( function() {
	$(document).ready( function() {
		/*
		 * Aqui é função que o botão chama */

		$('#geraPDF').click(function() {

			alert("Vamos conseguir");
			
			PDFJS.workerSrc = "js/pdfjs/build/pdf.worker.js";
			PDFJS.disableWorker = true; 
			PDFJS.getDocument('informacoes.pdf');
			PDFJS.getDocument('informacoes.pdf').then(function(pdf) {

				var scale = 1.5;
				var viewport = page.getViewport(scale);

				var canvas = document.getElementById('the-canvas');
				var context = canvas.getContext('2d');
				canvas.height = viewport.height;
				canvas.width = viewport.width;

				var renderContext = {
				  canvasContext: context,
				  viewport: viewport
				};
				page.render(renderContext);
			 
			});
			
		});
	});
});
