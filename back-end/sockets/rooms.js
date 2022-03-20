module.exports = (io) => io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room, color }) => {
    socket.join(room);

    socket.emit('serverMessage', {
      message: `Bem Vindo ${username} a sala Secreta -> ${room}`,
      className: 'server-emit-me'
    });

    socket.broadcast.to(room).emit('serverMessage', {
      message: `${username} acabou de entrar na sala`,
      className: 'server-emit-room room-in'
    });

    // socket.on('roomClientMessage', ({ room, message }) => {
    //   io.to(room).emit('serverMessage', {
    //     message: `${username}: ${message}`,
    //     className: 'emit-room'
    //   })
    // });

    socket.on('roomClientMessage', ({ room, message, username }) => {
      socket.broadcast.to(room).emit('serverMessage', {
        username,
        message,
        className: 'emit-room',
        color
      });
    });

    socket.on('roomClientMessage', ({ room, message, username }) => {
      socket.emit('serverMessage', {
        username,
        message,
        className: 'emit-me'
      });
    });

    socket.on('disconnect', () => {
      socket.broadcast.to(room).emit('serverMessage', {
        message: `${username} acabou de sair da sala`,
        className: 'server-emit-room room-out'
      });
    });
  });  
});
