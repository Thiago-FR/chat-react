const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);

// app.use(express.static(__dirname + '/public'));

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
});

require('./sockets/rooms')(io);

// app.get('/', (_req, res) => {
//   res.sendFile(path.join(__dirname, './public', 'index.html'));
// });

http.listen(3001, () => {
  console.log('Servidor ouvindo na porta 3001');
});