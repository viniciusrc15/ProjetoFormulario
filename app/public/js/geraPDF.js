$(document).ready( function() {
	$(document).ready( function() {
		$('#geraPdf').click(function() {
			var doc = new jsPDF('landscape', 'pt', 'a4');
			doc.addHTML($('#conteudo'), function() {
				doc.save("informacoes.pdf");
			});
		});
	});
});