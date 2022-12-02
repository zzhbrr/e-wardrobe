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
var UID_count = -1, EID_count = -1, GID_count = -1, OID_count = -1, PID_count = -1;

pg_pool.connect(function(err, client, done) { 
    if(err) return console.error('数据库连接出错', err);
    client.query('SELECT COUNT(*) FROM admin.users_tmp', function(err, res) {UID_count = res.rows[0].count;});
    client.query('SELECT COUNT(eid) FROM admin.essay', function(err, res) {EID_count = res.rows[0].count;});
    client.query('SELECT COUNT(gid) FROM admin.interst_group', function(err, res) {GID_count = res.rows[0].count;});
    client.query('SELECT COUNT(oid) FROM admin.outfit', function(err, res) {OID_count = res.rows[0].count;});
    client.query('SELECT COUNT(pid) FROM admin.product', function(err, res) {PID_count = res.rows[0].count;});
    io.on('connection', (socket) => {
        setTimeout(() => {
            socket.emit('back_connect', 'connect');
        }, 10000000);
        console.log('a user connected');
        while(UID_count === -1 || EID_count === -1 || GID_count === -1 || OID_count === -1 || PID_count === -1) {}
        console.log('UID_count: ' + UID_count);
        console.log('EID_count: ' + EID_count);
        console.log('GID_count: ' + GID_count);
        console.log('OID_count: ' + OID_count);
        console.log('PID_count: ' + PID_count);
        require('./routes')(socket, client, onlineUsers, UID_count, EID_count, GID_count, OID_count, PID_count);
    });
});