$(document).ready(function() {
	$('#form-registro').submit(function() {
		console.log(ws_url);
		contra_check = true;
		user_check = false;
		pass1 = $('[name="pass1"]').val();
		pass2 = $('[name="pass2"]').val();
		username = $('[name="nombre"]').val();

		if (pass2 == pass1) {
			contra_check = true;
		}

		if (contra_check) {
			$.ajax({
				url: ws_url+'crear_cuenta',
				type: 'POST',
				dataType: 'JSON',
				data: $(this).serialize(),
			}).done(function(response) {
				if (response.error==1) {
					alert_top('error',response.mensaje);
					$('#login-load').addClass('d-none');
				}else{
					alert_top('success',response.mensaje);
					$('#login-load').addClass('d-none');
					location.href="login.html";
				}
			})
			.fail(function() {
				alert_top('error','Ocurrió un problema, intente más tarde');
			});
		}else{
			alert_top('error','Las contraseñas deben coincidir');
		}
		
		return false;
	});

});