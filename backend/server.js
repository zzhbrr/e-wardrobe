const express = require('express');
const app = express();
var cors = require('cors');
console.log('backend running\n');
pg_client = require('./pg_connect/pg_connect').pg_client;

var server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})
// const io = require('socket.io')(server);
app.use(cors())
const port = 8000;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    }
);

io.on('connection', function(socket) {
    
});
