$(document).ready(function() {
	$('#form-solicitud').submit(function() {
		check_date = true;
		valor = $('[name="anio"]').val();
		year = new Date().getFullYear();

		if (valor<1970 || valor>year) {
			check_date = false;
		}

		if (check_date) {
			$.ajax({
				url: ws_url+'save_solicitud_motos',
				type: 'POST',
				dataType: 'JSON',
				data: $(this).serialize()+'&usuario='+usuario.id,
			})
			.done(function(response) {
				if (response.error==0) {
					alert_top('success',response.mensaje);
					$('#form-solicitud').trigger("reset");
				}else{
					alert_top('error',response.mensaje);
				}
			})
			.fail(function() {
				alert_top('error','Ocurrió un problema tecnico, intenta nuevamente');
			});
		}else{
			alert_top('error','Seleccionar un año válido');
			$('[name="anio"]').focus();
		}

		return false;
	});

});