let rooms = [];
let socketAdmin = null;

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room, color }) => {
    newRoom = rooms.find((sala) => sala.room && sala.room === room)
    if (newRoom) {
      newRoom.members += 1;
      newRoom.users = [...newRoom.users, { username }];
    } else rooms.push({ users: [{ username }], room, members: 1 });

    if (socketAdmin) socketAdmin.emit('add', rooms);
    socket.join(room);

    socket.emit('serverMessage', {
      message: `Bem Vindo ${username} a sala Secreta ↪ ${room} ↩`,
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

    socket.on('roomClientMessage', ({ room, message, username, isAudio }) => {
      socket.broadcast.to(room).emit('serverMessage', {
        username,
        message,
        className: 'emit-room',
        color,
        isAudio,
      });
    });

    socket.on('roomClientMessage', ({ message, username, isAudio }) => {
      socket.emit('serverMessage', {
        username,
        message,
        className: 'emit-me',
        isAudio,
      });
    });

    socket.on('exit', () => {
      socket.disconnect(room);
    });

    socket.on('disconnect', () => {
      newRoom = rooms.find((sala) => sala.room && sala.room === room)
      if (newRoom.members > 1) {
        const { users } = newRoom;
        newRoom.members -= 1;
        newRoom.users = users.filter((user) => user.username !== username);
      } else rooms = rooms.filter((sala) => sala.room !== room);
      
      socket.broadcast.to(room).emit('serverMessage', {
        message: `${username} acabou de sair da sala`,
        className: 'server-emit-room room-out'
      });

      if (socketAdmin)  socketAdmin.emit('add', rooms);
    });
  });

  socket.on('joinAdmin', () => {
    socket.join('adminMaster')
    socketAdmin = socket;
    socket.emit('add', rooms);
  });
});
