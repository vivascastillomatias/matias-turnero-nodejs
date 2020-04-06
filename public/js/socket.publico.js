var socket = io();

socket.on('connect', function() {
    console.log('conectado al servidor');
})

socket.on('disconnect', function() {
    console.log('desconectado del servidor');
})

socket.on('ActualizarPantalla', function(res){
    actualizarPantalla(res);
})

socket.emit('ActualizarPantalla',null, function(res){
    //PEDIR DATOS PARA ACTUALIZACION
});

function actualizarPantalla(res) {
    var pantalla = res.ticketsPantalla;
    
    var t_lbl1;
    var e_lbl1;
    if (pantalla[0].numero >= 0) {
        t_lbl1 = pantalla[0].numero;
        e_lbl1 = pantalla[0].escritorio;
    } else {
        t_lbl1 = '-';
        e_lbl1 = '-';
    }
    $("#lblTicket1").text('Ticket '+ t_lbl1);
    $("#lblEscritorio1").text('Escritorio '+ e_lbl1);

    var t_lbl2;
    var e_lbl2;
    if (pantalla[1].numero >= 0) {
        t_lbl2 = pantalla[1].numero;
        e_lbl2 = pantalla[1].escritorio;
    } else {
        t_lbl2 = '-';
        e_lbl2 = '-';
    }
    $("#lblTicket2").text('Ticket '+ t_lbl2);
    $("#lblEscritorio2").text('Escritorio '+ e_lbl2);

    var t_lbl3;
    var e_lbl3;
    if (pantalla[2].numero >= 0) {
        t_lbl3 = pantalla[2].numero;
        e_lbl3 = pantalla[2].escritorio;
    } else {
        t_lbl3 = '-';
        e_lbl3 = '-';
    }
    $("#lblTicket3").text('Ticket '+ t_lbl3);
    $("#lblEscritorio3").text('Escritorio '+ e_lbl3);
    

    var t_lbl4;
    var e_lbl4;
    if (pantalla[3].numero >= 0) {
        t_lbl4 = pantalla[3].numero;
        e_lbl4 = pantalla[3].escritorio;
    } else {
        t_lbl4 = '-';
        e_lbl4 = '-';
    }
    $("#lblTicket4").text('Ticket '+ t_lbl4);
    $("#lblEscritorio4").text('Escritorio '+ e_lbl4);

    var x = document.getElementById("timbre"); 
    x.play();
    
}