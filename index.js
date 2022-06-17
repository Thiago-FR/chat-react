const express = require('express');
require('dotenv').config();
// const path = require('path');
const app = express();

const PORT = process.env.PORT;

const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});

require('./sockets/rooms')(io);

// app.get('/', (_req, res) => {
//   res.sendFile(path.join(__dirname, './public', 'index.html'));
// });

http.listen(PORT, () => {
  console.log('Servidor ouvindo na porta 3001');
});