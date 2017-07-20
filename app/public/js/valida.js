jQuery(function($){
   //defina as máscaras de seus campos, o 9 indica um caracter numérico qualquer
   $("#dtNascimento").mask("99/99/9999");
   $(".telefone").mask("(99) 99999-9999");
   $("#cep").mask("99999-999");
   $("#rg").mask("**99999-999");
   $("#cpf").mask("99999999999");
   //Mascara gerada pelo plugin plugin price-format
});

$(document).ready( function() {
    //valida CPF
    $.validator.addMethod("cpf", function(value, element) {
        value = jQuery.trim(value);

        value = value.replace('.','');
        value = value.replace('.','');
        cpf = value.replace('-','');
        while(cpf.length < 11) cpf = "0"+ cpf;
        var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
        var a = [];
        var b = new Number;
        var c = 11;
        for (i=0; i<11; i++){
           a[i] = cpf.charAt(i);
           if (i < 9) b += (a[i] * --c);
        }
        if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11-x }
            b = 0;
        c = 11;
        for (y=0; y<10; y++) b += (a[y] * c--);
            if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }
        var retorno = true;
        if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) retorno = false;
        return this.optional(element) || retorno;
    }, "Informe um CPF válido");

    //Faz upload de assinatura
    var arquivo = $("#assinatura");
    arquivo.on('change', function (event) {
      if (arquivo[0].files.length == 0)
        return false;

    var data = new FormData();
    //console.log(data);
    data.append('assinatura', arquivo[0].files[0]); 
    console.log(data);
    $.ajax({
        url: "/salvarAssinatura",
        data: data,
        contentType: false,
        processData: false,
        type: "POST",
        success: function(data){

                }
        });
        return false;
    });
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
            // Controla Select de Estado e cidades
            $.getJSON('js/estados_cidades.json', function (data) {
            	var items = [];
            	var options = '<option value="">Escolha um estado</option>';	
                //Percorre json trazendo dados
            	$.each(data, function (key, val) {
            		options += '<option value="' + val.nome + '">' + val.nome + '</option>';
            	});					
                //inclui no id select
            	$("#uf").html(options);				
                //muda conteudo select conforme intens dentro das opçoes
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
                    //retorna pro select conforme opçoes
            		$("#cidade").html(options_cidades);
            	}).change();		
            });
                //Controla Select de 1° opção de curso 
                $.getJSON('js/opcoes_cursos.json', function (data) {
                    var items = [];
                    var options = '<option value="">Escolha o 1° curso</option>';    
                    $.each(data, function (key, val) {
                        options += '<option value="' + val.curso + '">' + val.curso + '</option>';
                    });                 
                    $("#idCursoPri").html(options);             
                    $("#idCursoPri").change(function () {               
                        var options_idUnidade = '';
                        var str = "";                   
                        $("#idCursoPri option:selected").each(function () {
                            str += $(this).text();
                        });
                        $.each(data, function (key, val) {
                            if(val.curso == str) {                           
                                $.each(val.unidade, function (key_course, val_course) {
                                    options_idUnidade += '<option value="' + val_course + '">' + val_course + '</option>';
                                });                         
                            }
                        });
                        $("#idUnidade").html(options_idUnidade);
                    }).change();        
                });
                //Controla Select de 2° opção de curso
                $.getJSON('js/opcoes_cursos.json', function (data) {
                    var items = [];
                    var options = '<option value="">Escolha uma 2° opção curso</option>';    
                    $.each(data, function (key, val) {
                        options += '<option value="' + val.curso + '">' + val.curso + '</option>';
                    });                 
                    $("#idCursoSec").html(options);             
                    $("#idCursoSec").change(function () {               
                        var options_idUnidade = '';
                        var str = "";                   
                        $("#idCursoSec option:selected").each(function () {
                            str += $(this).text();
                        });
                        $.each(data, function (key, val) {
                            if(val.curso == str) {                           
                                $.each(val.unidade, function (key_course, val_course) {
                                    options_idUnidade += '<option value="' + val_course + '">' + val_course + '</option>';
                                });                         
                            }
                        });
                        $("#idUnidadSec").html(options_idUnidade);
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
			dtNascimento:{
				required: true, dateITA:true
			},
			telContato:{
				required: true
			},
			rua:{
				required: true, minlength: 5
			},
            email:{ 
                required: true,
                email: true
            },
            cpf: {
                cpf: true, 
                required: true
            },
            conf_email: {
                required: true,
                equalTo: "#email"
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
            rg:{
                required: true
            },
            idEstado:{
                required: true
            },
            idCidade:{
                required: true
            },
            idCursoPri:{
                required: true
            },
            idUnidade:{
                required: true
            },
            idCursoSec:{
                required: true
            },
            idUnidadSec:{
                required: true
            }
        },
		// Define as mensagens de erro PERSONALIZADAS para cada regra
		messages:{
			idEstado:{
				digits: "Por favor, selecione um Estado."
			},
			idCidade:{
				digits: "Por favor, selecione uma Cidade."
			},
            idCursoPri:{
                digits: "Por favor, selecione um Estado."
            },
            idUnidade:{
                digits: "Por favor, selecione uma Cidade."
            },
            idCursoSec:{
                digits: "Por favor, selecione um Estado."
            },
            idUnidadSec:{
                digits: "Por favor, selecione uma Cidade."
            },
            cpf: { 
                cpf: 'CPF inválido.'
            },
            rg:{
                digits: "Por favor, informe o RG corretamente."
            },
            telContato:{
                required: "Por favor, digite o telefone corretamente."
            },   
            email:{ 
                required: "Entre com seu email.",
                email: "Entre com um email válido."
            },
            conf_email: {
                required: "Confirme seu email.",
                equalTo: "O email digitado não confere."
            }
        },
    });
});