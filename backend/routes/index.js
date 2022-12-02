const userService = require('./userService/userService');
const clothesService = require('./clothesService/clothesService');
const articleService = require('./articleService/articleService');
const groupService = require('./groupService/groupService');
const historyService = require('./historyService/historyService');

module.exports = function(socket, pg_client, onlineUsers) {

    userService.userLogin(socket, pg_client, onlineUsers);
    userService.userRegister(socket, pg_client);
    userService.userInfo(socket, pg_client);
    userService.userLogout(socket, pg_client, onlineUsers);

    clothesService.getOutfits(socket, pg_client);
    clothesService.getClothes(socket, pg_client);
    clothesService.updateOutfits(socket, pg_client);

    articleService.getArticles(socket, pg_client);
    articleService.updateArticle(socket, pg_client);

    groupService.getGroups(socket, pg_client);
    groupService.updateGroup(socket, pg_client);

    historyService.getHistory(socket, pg_client);
    historyService.updateHistory(socket, pg_client);
}