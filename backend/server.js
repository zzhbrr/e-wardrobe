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
// const io = require('socket.io')(server);
app.use(cors())
const port = 8000;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    }
);
pg_pool.connect(function(err, client, done) { 
    if(err) {
    return console.error('数据库连接出错', err);
    }
    // 简单输出个 Hello World
    client.query("SELECT distinct(tablename) FROM pg_tables WHERE SCHEMANAME = 'admin'", function(err, result) {
        done();// 释放连接（将其返回给连接池）
    if(err) {
        return console.error('查询出错', err);
    }
    console.log(result.rows);
    });
   });
   
// pg_client.query("SELECT distinct(tablename) FROM pg_tables WHERE SCHEMANAME = 'admin'", (err, res) => {
//     console.log(err, res.rows)
// })

// pg_client.query("SELECT * FROM admin.history", (err, res) => {
//     console.log(err, res.rows)
// })