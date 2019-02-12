$(document).ready(function() {
	$.get(ws_url+'get_solicitudes', function(data) {
		$('#list-solicitudes').html(data);
	});

});


$(document).on('click', '.enviar-msj', function() {
	localStorage.setItem('receptor',JSON.stringify($(this).data('cliente')));
	location.href='chat.html';
});