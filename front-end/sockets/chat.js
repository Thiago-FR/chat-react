module.exports = (io) => io.on('connection', (socket) => {
  socket.on('clientMessage', (message) => {
    console.log(`Mensagem ${message}`);
    io.emit('serverMessage', `${socket.id}: ${message}`);
    // socket.broadcast.emit('serverMessage', `Iiiiiirraaaa! ${socket.id} acabou de se conectar :D`);
    // Para enviar uma mensagem para todos os outros clientes, exceto para quem disparou um evento
  });
});