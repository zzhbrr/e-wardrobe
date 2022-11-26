const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, { /* options */ });

io.on("connection", (data) => {
  console.log('a user connected');
});

httpServer.listen(8000);