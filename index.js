const express = require('express');
const cors = require('cors')
require('dotenv').config();
// const path = require('path');
const app = express();


const PORT = process.env.PORT;

// app.use(express.static('public'));
// app.use((_req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
//   res.header('Access-Control-Allow-Headers', '*');
//   next();
// });

app.use(cors());

const http = require('http').createServer(app);

const io = require('socket.io')(http);

require('./sockets/rooms')(io);

// app.get('/', (_req, res) => {
//   res.sendFile(path.join(__dirname, './public', 'index.html'));
// });

http.listen(PORT, () => {
  console.log('Servidor ouvindo na porta 3001');
});