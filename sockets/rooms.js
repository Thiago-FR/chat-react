module.exports = (io) => io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    socket.join(room);

    socket.emit('serverMessage', `Bem Vindo ${username} a sala Secreta -> ${room}`);

    socket.broadcast.to(room).emit('serverMessage', `${username} acabou de entrar na sala`);

    socket.on('roomClientMessage', ({ message, room }) => {
      io.to(room).emit('serverMessage', `${username}: ${message}`)
    });

    socket.on('disconnect', () => {
      socket.broadcast.to(room).emit('serverMessage', `${username} acabou de sair na sala`);
    });
  });  
});
