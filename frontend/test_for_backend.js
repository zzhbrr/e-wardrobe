const socket = require('socket.io-client').io('ws://localhost:8000');


// socket.on('getAllClothesSuccess', (data) => {
//    console.log(data); 
// });
// socket.emit('getAllClothes', {uid:0, username:'zz', type:'shoe'});

// socket.on('getClothesDetailSuccess', (data) => {
//    console.log(data); 
// });
// socket.emit('getClothesDetail', {pid:12});

socket.on('getOutfitsSuccess', (data) => {
   console.log(data);
});
socket.emit('getOutfits', {askType:'all', uid: 0});
socket.on('getAllClothesRetURLSuccess', (data) => {
   console.log(data);
});