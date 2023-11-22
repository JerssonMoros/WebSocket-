const express = require('express');
const cors = require('cors');
const { Socket } = require('dgram');
const { socketController } = require('../sockets/controller');

require('dotenv').config();

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer( this.app );
        this.io = require('socket.io')( this.server );
        this.paths = {}

        // Middlewares
        this.middlewares();

        // Rutas de la app
        this.routes();
        
        //Sockets
        this.sockets();
    }

    middlewares(){

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    sockets() {
        this.io.on( 'connection' , socketController )
    }
    
    routes(){
        // this.app.use(this.paths.users, require('../routes/user'));
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }
};

module.exports = Server;

