const userService = require('./userService/userService');
const clothesService = require('./clothesService/clothesService');

module.exports = function(socket, io, pg_client, onlineUsers) {

    userService.userLogin(socket, pg_client, onlineUsers);
    userService.userRegister(socket, pg_client);
    userService.userInfo(socket, pg_client);

    clothesService.getOutfits(socket, pg_client);
    clothesService.getClothes(socket, pg_client);
}