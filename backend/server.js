const express = require('express');
const app = express();
var cors = require('cors');
// var pg_client = require('./pg_connect/pg_connect');
pg_pool = require('./pg_connect/pg_connect');

var server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})
app.use(cors())
const port = 8000;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    }
);

var onlineUsers = [];
pg_pool.connect(function(err, client, done) { 
    if(err) return console.error('数据库连接出错', err);
    io.on('connection', (socket) => {
        setTimeout(() => {
            socket.emit('back_connect', 'connect');
        }, 10000000);
        console.log('a user connected');
        require('./routes')(socket, io, client, onlineUsers);
    });
});
   
// pg_client.query("SELECT distinct(tablename) FROM pg_tables WHERE SCHEMANAME = 'admin'", (err, res) => {
//     console.log(err, res.rows)
// })

// pg_client.query("SELECT * FROM admin.history", (err, res) => {
//     console.log(err, res.rows)
// })