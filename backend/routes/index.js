const userService = require('./userService/userService');

module.exports = function(socket, io, pg_client, onlineUsers) {

    userService.userLogin(socket, pg_client, onlineUsers);
    userService.userRegister(socket, pg_client);
}