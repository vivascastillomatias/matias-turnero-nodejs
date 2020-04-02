var socket = io();

//Escuchar informacion
socket.on('connect', function() {
    console.log('conectado al servidor');
})
socket.on('disconnect', function() {
    console.log('desconectado del servidor');
})

socket.on('enviarMensaje', function(data) {
    console.log(data);
})

//Enviar informacion
socket.emit('enviarMensaje', { user: 'Matias', mensaje: 'hola mundo'}, function (data) {
    console.log(data.resp);
})