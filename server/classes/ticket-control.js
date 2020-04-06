const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio
    }
}


class TicketControl {
    constructor() {

        this.ultimo = 1;
        this.hoy = new Date().getDate();
        this.tickets = [];

        this.ticketVacio = {numero: -1, escritorio: -1}
        this.ticketsPantalla = [this.ticketVacio, this.ticketVacio, this.ticketVacio,this.ticketVacio];

        let data = require('../data/data.json')

        if (data.hoy === this.hoy) {
            //console.log('Del mismo dia');
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ticketsPantalla = data.ticketsPantalla;
        }else{
            //console.log('dia diferente');
            this.reiniciarConteo();
        }
    }

    atenderTicket(escritorio){
        if (this.tickets.length === 0) {
            return {
                ok: false,
                message:'No hay tickets'
            }
        }

        let numTicket = this.tickets[0].numero;

        this.tickets.shift(); //Elimina el primer elemento de un arreglo

        let atenderTicket =  new Ticket(numTicket, escritorio);

        this.ticketsPantalla.unshift(atenderTicket);

        if (this.ticketsPantalla.length > 4) {
            this.ticketsPantalla.splice(-1,1); //Borra un elemento(1) a partir de la posicion anteultima (-1). BORRA EL ULTIMO ELEMENTO
        }

        console.log('PANTALLA:', this.ticketsPantalla);

        this.grabarArchivo();

        return {
            ok: true,
            ticket:atenderTicket
        } 

    }

    siguiente(){

        this.ultimo+= 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        console.log(this.tickets);
        return this.ultimo;
    }

    getUltimo(){
        return this.ultimo;
    }

    getTicketsPantalla(){
        return this.ticketsPantalla;
    }

    reiniciarConteo(){
        this.tickets = [];
        this.ticketsPantalla = [this.ticketVacio, this.ticketVacio, this.ticketVacio,this.ticketVacio];
        this.ultimo = 0;
        this.grabarArchivo();
    }
    
    
    grabarArchivo(){
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ticketsPantalla: this.ticketsPantalla
        }
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}