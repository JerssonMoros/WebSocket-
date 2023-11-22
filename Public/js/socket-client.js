const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar  = document.querySelector('#btnEnviar');

const socket = io();

socket.on('connect', () => {
    console.log('Conectado')
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';

});

socket.on('disconnect', () => {
console.log('Desconectado')
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
});

socket.on('enviar-mensaje', ( payload ) => {
   console.log('AQUI', payload) 
});

btnEnviar.addEventListener( 'click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        user: 'dnjskbfjka',
        fecha: new Date().getTime()
    }
    socket.emit( 'enviar-mensaje', payload, ( id ) => {
        console.log('Mensaje desde el server', id)
    });
})