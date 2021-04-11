$(function () {
	$('[data-toggle="tooltip"]').tooltip();
	
	$(".fancybox").fancybox({
		openEffec: 'none',
		closeEffect: 'none',
		padding: 0,
		closeClick: true
	});
	
	$("#freeform_telefone").blur(function() {
		$("#fone_mask").hide();
		
		var fone = $(this).val();
		fone = fone.replace("(", "").replace(")", "").replace(" ", "");
		var valido = false;		
		
		for(i = 1; i < fone.length-1; i++) {
		    if(fone.charAt(i) != fone.charAt(i-1)) {
			    valido = true;
		    }
		}
		
		if(fone.length==0) {
			valido = true;	
		}
		
		if(!valido) {
			$("#fone_mask").show();
			$(this).val("");
		}
	});
		
	/*
	 * Contato
	 */
	$('#assunto-item').on('click', 'a', function(e){
		if($(this).data('assunto')) {
			e.preventDefault();
			$('input[name="recipient_email"]').val($(this).data('assunto'));
			$('input[name="assunto"]').val($(this).text());
			$('#assunto span').text($(this).text());
		}
	});
		
		
		
		
		
	/*
	* Formulários de contato
	*/
	var token_rdstation = '6a1a845b1f09c09fc6261b3e0c45f575';

	var $form_c = $('#contato'),
		 $generalErrors = $('#error-form'),
		 $successForm = $('#success-form');
	
	$form_c.submit(function(e){
	   $('#contato .form-group').removeClass('has-error');
	   $('#contato .help-block').remove();
	   $generalErrors.addClass('hidden').html('');
	   $successForm.addClass('hidden');
	   $('.carregar-c').removeClass('hidden');
	   $('.btn-enviar').prop('disabled', true);
	
	   $.post(
	       $form_c.attr('action'),
	       $form_c.serialize(),
	       function(data){
	           if (data.success == false){
	               $.each(data.errors, function(i, item){
	                   var $errorHolder = $('[name="' + i + '"]').parent('.form-group'),
	                   	  error = ($.isArray(item) ? item.join('<br/>') : item);
	
	                   if ($errorHolder.length > 0){
	                       $errorHolder.addClass('has-error').append('<span class="help-block">' + error + '</span>');
	                   }
	                   else{
	                       $generalErrors.append(error).removeClass('hidden');
	                   }
	               });
	               
	               $('.carregar-c').addClass('hidden');
	               $('.btn-enviar').prop('disabled', false);
	           }
	           else if (data.success){
						var data_array = [
							{name: 'Nome Fantasia', value: $form_c.find('input[name="empresa"]').val()},
							{name: 'Ramo de Atividade', value: $form_c.find('input[name="ramo"]').val()},
							{name: 'Endereço', value: $form_c.find('input[name="endereco"]').val()},
							{name: 'Número', value: $form_c.find('input[name="numero"]').val()},
							{name: 'País', value: $form_c.find('input[name="pais"]').val()},
							{name: 'Estado', value: $form_c.find('input[name="estado"]').val()},
							{name: 'Cidade', value: $form_c.find('input[name="cidade"]').val()},
							{name: 'nome', value: $form_c.find('input[name="nome"]').val()},
							{name: 'email', value: $form_c.find('input[name="mail"]').val()},
							{name: 'telefone', value: $form_c.find('input[name="telefone"]').val()},
							{name: 'mensagem', value: $form_c.find('textarea[name="mensagem"]').val()},
							{name: 'assunto', value: $form_c.find('input[name="assunto"]').val()},
							{name: 'idioma', value: $form_c.find('input[name="idioma"]').val()},
							{name: 'identificador', value: 'Formulário de Contato'},
							{name: 'token_rdstation', value: token_rdstation}
						];
						
						RdIntegration.post(data_array);
		           
						$successForm.removeClass('hidden');
						$form_c.find('.form-control').val('');
						$('.carregar-c').addClass('hidden');
						$('.btn-enviar').prop('disabled', false);
	           }
	       }
	   );
	   e.preventDefault();
	   return false;
	});	
	
	
	/*
	* Carrosel owl
	*/
	$(".owl-carousel").owlCarousel({
		navText:['',''],
		dots:false,
		loop:true,
		responsiveClass:true,
		responsive:{
       		 0:{
            items:1,
            nav:true
	        },
	        768:{
	            items:2,
	            nav:true
	        },
	        992:{
	            items:3,
	            nav:true,
	            
	        },
	         1200:{
	            items:5,
	            nav:true,
	            
	        }
	    }
	});
	
	
	/*
	* Formulário de newsletter
	*/
	var $form_news = $('.newsletter form'), form_news_send = false;
	$form_news.on('submit', function(ev) {
		if(form_news_send == false){
		  var  nome = $form_news.find('input[name="name"]').val(),
			 	 email = $form_news.find('input[name="email"]').val();
			
			if(nome != '' && email != ''){
				form_news_send = true;
				 
				var data_array = [
						 { name: 'identificador', value: 'Newsletter - Site'},
						 { name: 'idioma', value: $form_news.find('input[name="idioma"]').val()},
						 { name: 'nome', value: nome},
						 { name: 'email', value: email},
					    { name: 'token_rdstation', value: token_rdstation}
					 ];
			
			  RdIntegration.post(data_array, function () {
				  $form_news.submit(); 
			  });
		  }
		  ev.preventDefault();
		  return false;
		}
	});

});