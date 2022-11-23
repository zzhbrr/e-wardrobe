const express = require('express');
const app = express();
var cors = require('cors');

var server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})
app.use(cors())
const port = 8000;

