usuario = userget();
receptor = receptorget();
(function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    $(function () {
        var getMessageText, message_side, sendMessage;
        message_side = 'right';
        sendMessage = function (text,message_side) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message = new Message({
                text: text,
                message_side: message_side
            });
            message.draw();
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };

        $('#send_message').click(function(event) {
            var mensaje =  $('[name="mensaje"]').val();
            validate = true;
            if (mensaje=="") {
                validate = false;
                alert_top('error','El mensaje no debe estar vacío');
            }

            if (validate) {
             $.ajax({
                 url: ws_url+'crear_mensaje',
                 type: 'POST',
                 dataType: 'JSON',
                 data: {de: (usuario.id?usuario.id:usuario.id_taller),para:receptor,texto:mensaje,tipo:usuario.tipo_usuario},
             })
             .done(function(response) {
                if (response.error==0) {
                    sendMessage(mensaje,'right');
                    $('#last_msj').val(response.insert);
                }else{
                    alert_top('error','Ocurrió un problema intente nuevamente');
                }
            })
             .fail(function(error) {
                 console.log(error);
             });

         }
     });


        $(document).ready(function() {
            $.post(ws_url+'get_name_chat', {id: receptor,tipo:(usuario.id?'1':'2')}, function(response) {
                $('#username').text(response[0].username);
            });
            // Si es usuario 
            if (usuario.id) {
               $.ajax({
                url: ws_url+'get_chat',
                type: 'POST',
                dataType: 'JSON',
                data: {current: usuario.id,other:receptor,tipo:(usuario.id?'1':'2')},
            })
               .done(function(respuesta) {
                for (var i = 0; i < respuesta.length; i++) {
                    if (respuesta[i].tipo==2) {
                        sendMessage(respuesta[i].mensaje,'left');
                    }else{
                       sendMessage(respuesta[i].mensaje,'right');
                   }
                   $('#last_msj').val(respuesta[i].id_mensaje);
               }
           })
               .fail(function() {
                console.log("error");
            });
           }else{
            $.ajax({
                url: ws_url+'get_chat',
                type: 'POST',
                dataType: 'JSON',
                data: {current: usuario.id_taller,other:receptor,tipo:(usuario.id?'1':'2')},
            })
            .done(function(respuesta) {
                for (var i = 0; i < respuesta.length; i++) {
                    if (respuesta[i].tipo==1) {
                        sendMessage(respuesta[i].mensaje,'left');
                    }else{
                       sendMessage(respuesta[i].mensaje,'right');
                   }
                   $('#last_msj').val(respuesta[i].id_mensaje);
               }
               $('#last_msj').val(respuesta[i].id_mensaje);
           })
            .fail(function() {
                console.log("error");
            });
        }
    });

        function real_time_msj(){
            last_msj = $('#last_msj').val();
            $.post(ws_url+'get_real_chat', {current: (usuario.id?usuario.id:usuario.id_taller),other:receptor,tipo:(usuario.id?'1':'2'),max: last_msj}, function(respuesta) {
                if (respuesta.length>0) {
                    sendMessage(respuesta[0].mensaje,'left');
                    $('#last_msj').val(respuesta[0].id_mensaje);
                }else{
                }
            });
        }

        setInterval(function(){ 
            real_time_msj();
        }, 3000);


    });
}.call(this));



