jQuery(function($){
   //defina as máscaras de seus campos, o 9 indica um caracter numérico qualquer
   $("#dtNascimento").mask("99/99/9999");
   $(".telefone").mask("(99) 9999-9999");
   $("#cep").mask("99999-999");
   $(".hora").mask("99:99");
   //Mascara gerada pelo plugin plugin price-format
   
   
});

$(document).ready( function() {

	function limpa_formulário_cep() {
                // Limpa valores do formulário de cep.
                $("#rua").val("");
                $("#bairro").val("");
                $("#cidade").val("");
                $("#uf").val("");
            }
            
            //Quando o campo cep perde o foco.
            $("#cep").blur(function() {

                //Nova variável "cep" somente com dígitos.
                var cep = $(this).val().replace(/\D/g, '');

                //Verifica se campo cep possui valor informado.
                if (cep != "") {

                    //Expressão regular para validar o CEP.
                    var validacep = /^[0-9]{8}$/;

                    //Valida o formato do CEP.
                    if(validacep.test(cep)) {

                        //Preenche os campos com "..." enquanto consulta webservice.
                        $("#rua").val("...");
                        $("#bairro").val("...");
                        $("#cidade").val("...");
                        $("#uf").val("...");

                        //Consulta o webservice viacep.com.br/
                        $.getJSON("http://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
                        	if (!("erro" in dados)) {
                                //Atualiza os campos com os valores da consulta.
                                $("#rua").val(dados.logradouro);
                                $("#bairro").val(dados.bairro);
                                //$("#cidade").val(dados.localidade);
                                var campCidade = '<option value="' + dados.localidade + '">' + dados.localidade + '</option>';
                                $("#cidade").html(campCidade);
                                //$("#uf").val(dados.uf);
                                var campUf = '<option value="' + dados.uf + '">' + dados.uf + '</option>';
                                $("#uf").html(campUf);
                            } //end if.
                            else {
                                //CEP pesquisado não foi encontrado.
                                limpa_formulário_cep();
                                alert("CEP não encontrado.");
                            }
                        });
                    } //end if.
                    else {
                        //cep é inválido.
                        limpa_formulário_cep();                        	
                        alert("Formato de CEP inválido.");
                    }
                } //end if.
                else {
                    //cep sem valor, limpa formulário.
                    limpa_formulário_cep();
                }
            });

            $.getJSON('estados_cidades.json', function (data) {

            	var items = [];
            	var options = '<option value="">escolha um estado</option>';	

            	$.each(data, function (key, val) {
            		options += '<option value="' + val.nome + '">' + val.nome + '</option>';
            	});					
            	$("#uf").html(options);				

            	$("#uf").change(function () {				

            		var options_cidades = '';
            		var str = "";					

            		$("#uf option:selected").each(function () {
            			str += $(this).text();
            		});

            		$.each(data, function (key, val) {
            			if(val.nome == str) {							
            				$.each(val.cidades, function (key_city, val_city) {
            					options_cidades += '<option value="' + val_city + '">' + val_city + '</option>';
            				});							
            			}
            		});

            		$("#cidade").html(options_cidades);

            	}).change();		

            });

	//Todos os campos com a classe hora serão validados como time
	$.validator.addClassRules({
		hora: {time:true}
	});

	//Inicio das regras de validação
	$("#formulario").validate({
		// Define as regras
		rules:{
			nome:{
				required: true, minlength: 5
			},
			sexo:{
				required: true
			},
			dtNascimento:{
				required: true, dateITA:true
			},
			telContato:{
				required: true
			},
			rua:{
				required: true, minlength: 5
			},
			numero:{
				required: true, digits: true
			},
			bairro:{
				required: true
			},
			cep:{
				required: true
			},
			idEstado:{
				required: true
			},
			idCidade:{
				required: true
			}
			
		},
		// Define as mensagens de erro PERSONALIZADAS para cada regra
		messages:{
			idEstado:{
				digits: "Selecione um Estado"
			},
			idCidade:{
				digits: "Selecione uma Cidade"
			},
			telContato:{
				required: "Digite a merda do telefone"
			}
		},
	});
});
