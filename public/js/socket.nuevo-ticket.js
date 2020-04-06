
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('conectado al servidor');
})

socket.on('disconnect', function() {
    console.log('desconectado del servidor');
})


$('button').click(function (e) { 

    socket.emit('siguienteTicket',null, function(res){
        console.log(`siguiente ticket ${res}`);
        label.text(res);
    });
    
});

socket.on('ActualizacionTicket', function(res){
    label.text(res.actual);
})