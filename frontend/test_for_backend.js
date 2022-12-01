const socket = require('socket.io-client').io('ws://localhost:8000');

//--------------------------------------------------------------------------------------------------------------------------------------------------------
// socket.on('getAllClothesSuccess', (data) => {
//    console.log(data); 
// });
// socket.emit('getAllClothes', {uid:0, username:'zz', type:'shoe'});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// socket.on('getClothesDetailSuccess', (data) => {
//    console.log(data); 
// });
// socket.emit('getClothesDetail', {pid:12});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// socket.on('getOutfitsSuccess', (data) => {
//    console.log(data);
// });
// socket.emit('getOutfits', {askType:'all', uid: 0});
// socket.on('getOutfitsRetURLSuccess', (data) => {
//    console.log(data);
// });
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// socket.on('getClothesCommentsSuccess', (data) => {
//    console.log(data);
// });
// socket.emit('getClothesComments', {pid: 11});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// socket.on('getAllArticlesSuccess', (data) => {
//    console.log(data);
// });
// socket.emit('getAllArticles', {uid: 0});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// socket.on('getArticleDetailSuccess', (data) => {
//    console.log(data);
// });
// socket.emit('getArticleDetail', {eid: 0});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// socket.on('getArticleCommentsSuccess', (data) => {
//    console.log(data);
// });
// socket.emit('getArticleComments', {eid: 0});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// socket.on('getGroupDetailSuccess', (data) => {
//    console.log(data);
// });
// socket.emit('getGroupDetail', {gid: 0});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// socket.on('getGroupMembersSuccess', (data) => {
//    console.log(data);
// });
// socket.emit('getGroupMembers', {gid: 0});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// socket.on('getGroupEssaySuccess', (data) => {
//    console.log(data);
// });
// socket.emit('getGroupEssay', {gid: 0});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
socket.on('getWorldEssaySuccess', (data) => {
   console.log(data);
});
socket.emit('getWorldEssay', {num:4});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// socket.on('getAllHistorySuccess', (data) => {
//    console.log(data);
// });
// socket.on('getAllHistoryRetURLSuccess', (data) => {
//    console.log(data);
// });
// socket.emit('getAllHistory', {uid: 0});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// // 测试login logout功能
// socket.on('loginSuccess', (data) => {
//     console.log(data);
// });
// socket.on('loginFailed', (data) => {
//     console.log(data);
// });
// socket.emit('login', {username:'zz', password:require('md5')('zz')});

// socket.on('logoutSuccess', (data) => {
//     console.log(data);
// });
// socket.on('logoutFailed', (data) => {
//     console.log(data);
// });
// socket.emit('logout', {username: 'zz', uid: 0});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// // 测试 getUserGroups 接口
// socket.on('getUserGroupsSuccess', (data) => {
//       console.log(data);
// });
// socket.emit('getUserGroups', {uid: 1});