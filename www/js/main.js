var ws_url = 'http://apprepuestos.com/web_services/WS/';
var usuario = userget();

function alert_top(type,text){
  $(".alert-layer").remove();
  switch (type) {
    case 'success':
    html='<div class="alert-layer"><div class="alert-content alert-success"><div class="container"><span class="texto-alerta">'+text+'<span><span class="closebtn">×</span></div></div></div>';
    break;
    case 'error':
    html='<div class="alert-layer"><div class="alert-content alert-error"><div class="container"><span class="texto-alerta">'+text+'<span><span class="closebtn">×</span></div></div></div>';
    break;
    case 'info':
    html='<div class="alert-layer"><div class="alert-content alert-info"><div class="container"><span class="texto-alerta">'+text+'<span><span class="closebtn">×</span></div></div></div>';
    break;
    default:
    
    break;
  }
  $("body").append(html);
  $(".alert-layer").fadeIn();
}
$(document).on("click",'.alert-layer, .alert-layer .closebtn',function(){
  $(".alert-layer").fadeOut(250,function(){$(this).remove()});
});

$(document).ready(function() {
  if (usuario.id_taller>0) {
    $('#link-mensajes').attr('href', 'mensajes_taller.html');
    $('#link-home').attr('href', 'solicitudes.html');
  }

  w = $(this).width();
  html = '<div class="sticky-bottom-banner" style="display: none;"><div id="contenedor-sponsor" style="height: 53px;background: #fff;"></div><span class="icon-close-small">X</span></div>';
  $('body').append(html);
  $('#contenedor-sponsor').width(w-60);
  $('.sticky-bottom-banner').fadeIn('slow');

  $('.icon-close-small').click(function() {
    $('.sticky-bottom-banner').fadeOut('fast');
  });

  
  w = $(this).width();
  if (w>400) {
    w = (w/6);
    w = (120+w);
  }else{
    w = (w/6);
    w = (100+w);
  }
  $('.icon-close-small').css('margin-right', '-'+w+'px');

});