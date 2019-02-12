if (userget()) {
  if (userget().id_taller>0) {
    location.href="solicitudes.html";
  }else{
    location.href="seleccion.html";
  }

}

$(document).ready(function() {
  $('#login-form').submit(function() {
    if ($('[name="taller"]').is(':checked')) {
      controller = 'login_taller';
      url = 'solicitudes.html';
    }else{
      controller = 'login';
      url = 'seleccion.html';
    }
    $.ajax({
      url: ws_url+controller,
      type: 'POST',
      dataType: 'JSON',
      data: $(this).serialize(),
      beforeSend:function(load) {
        $('#login-load').removeClass('d-none');
      }
    })
    .done(function(response) {
     if (response.error==1) {
      alert_top('error',response.message);
      $('#login-load').addClass('d-none');
    }else{
      localStorage.setItem("APP_USER",JSON.stringify(response.result));
      location.href=url;
    }
  })
    .fail(function() {
      console.log("error");
    });

    return false;
  });

});