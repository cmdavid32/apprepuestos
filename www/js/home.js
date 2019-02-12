$(document).ready(function() {
	$.get(ws_url+'get_marcas', function(data) {
		for (var i = 0; i < data.length; i++) {
			html =  '<option value="'+data[i].id_marca+'">'+data[i].marca+'</option>';
			$('[name="marca"]').append(html);
		}
	});

	$('[name="marca"]').change(function() {
		$.post(ws_url+'get_modelo', {marca: $(this).val()}, function(response) {
			$('[name="modelo"]').removeAttr('readonly');
			$('[name="modelo"]').html('');
			for (var i = 0; i < response.length; i++) {
				html =  '<option value="'+response[i].id_modelo+'">'+response[i].modelo+'</option>';
				$('[name="modelo"]').append(html);
			}
		});
	});

	$('#form-solicitud').submit(function() {
		check_date = true;
		valor = $('[name="anio"]').val();
		year = new Date().getFullYear();

		if (valor<1970 || valor>year) {
			check_date = false;
		}

		if (check_date) {
			$.ajax({
				url: ws_url+'save_solicitud',
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
