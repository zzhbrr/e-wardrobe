const userService = require('./userService/userService');
const clothesService = require('./clothesService/clothesService');
const articleService = require('./articleService/articleService');
const groupService = require('./groupService/groupService');
const historyService = require('./historyService/historyService');

module.exports = function(socket, io, pg_client, onlineUsers) {

    userService.userLogin(socket, pg_client, onlineUsers);
    userService.userRegister(socket, pg_client);
    userService.userInfo(socket, pg_client);

    clothesService.getOutfits(socket, pg_client);
    clothesService.getClothes(socket, pg_client);

    articleService.getArticles(socket, pg_client);

    groupService.getGroups(socket, pg_client);

    historyService.getHistory(socket, pg_client);
}