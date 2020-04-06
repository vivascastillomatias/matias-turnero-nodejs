var socket = io();
var h4 = $('h4');

socket.on('connect', function() {
    console.log('conectado al servidor');
})

socket.on('disconnect', function() {
    console.log('desconectado del servidor');
})


var searchParams = new URLSearchParams(window.location.search);

console.log(searchParams.has('escritorio'));

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario para atender los tickets')
}

var escritorio = searchParams.get('escritorio');

$('h1').html('Escritorio '+escritorio);

$('button').click(function () { 
    socket.emit('atenderTicket',{escritorio: escritorio}, function(res){

        console.log(res);

        if (res.ok) {
            h4.text('Atendiendo Ticket '+res.ticket.numero);
        } else {
            h4.text(res.message);
        }
    });
});