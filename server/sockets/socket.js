const { io } = require('../server.js')

io.on('connection', (client) => {
    console.log('usuario conectado');

    client.emit('enviarMensaje',{ mensaje: 'Bienvenido al chat'});

    client.on('disconnect', ()=> {
        console.log('usuario desconectado');
    })

    client.on('enviarMensaje', (data,callback)=> {
        console.log(data);

        client.broadcast.emit('enviarMensaje', data);
        
        /*
        if (data.user) {
            callback({
                resp: 'todo salio bien'
            })
        } else {
            callback({
                resp: 'todo salio mal'
            })
        }*/
    })
})
