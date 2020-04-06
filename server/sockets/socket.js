const { io } = require('../server.js')
const {TicketControl} = require('../classes/ticket-control.js');


let ticketControl = new TicketControl();
io.on('connection', (client) => {

    client.emit('ActualizacionTicket', {
        actual: ticketControl.getUltimo(),
        ticketsPantalla: ticketControl.getTicketsPantalla()
    });

    client.on('siguienteTicket', async(data, callback)=> {
        let siguiente = await ticketControl.siguiente();
        callback(siguiente);

        //Actualizar todas los turneros
        client.broadcast.emit('ActualizacionTicket',{
            actual: ticketControl.getUltimo()
        });
    })

    client.on('atenderTicket', (data, callback)=>{
        if (!data.escritorio) {
            return callback({
                ok: false,
                message: 'El escritorio es necesario'
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        client.broadcast.emit('ActualizacionTicket',{
            actual: ticketControl.getUltimo()
        });
        callback(atenderTicket);

        //Comprobar si no hay mas tickets, para no sonar alarma de pantalla
        if (atenderTicket.ok) {
            //pantalla publica
            client.broadcast.emit('ActualizarPantalla',{
                ticketsPantalla: ticketControl.getTicketsPantalla()
            });
        }

    })

})
