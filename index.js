const express = require('express');
require('dotenv').config();
// const path = require('path');
const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT;

// app.use(express.static('public'));

const io = require('socket.io')(http, {
  cors: {
    origin: process.env.HOST,
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