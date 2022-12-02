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
// socket.on('getClothesEssaysSuccess', (data) => {
//    console.log(data);
// });
// socket.emit('getClothesEssays', {pid: 11});
socket.emit('getClothesComments', {pid: 11});
socket.on('getClothesCommentsSuccess', (data) => {
    console.log(data);
});
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
// socket.on('getWorldEssaySuccess', (data) => {
//    console.log(data);
// });
// socket.emit('getWorldEssay', {num:4});
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
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// socket.on('getUserCreatGroupsSuccess', (data) => {
//       console.log(data);
// });
// socket.emit('getUserCreatGroups', {uid: 1});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// socket.on('addOutfitsSuccess', (data) => {
//       console.log(data);
// });
// socket.emit('addOutfits', {uid: 1, username: 'asd', top_id: 8, bottom_id: 9, shoe_id: 10, coat_id: 11, ornament_id: 12});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// socket.on('addArticleSuccess', (data) => {
//       console.log(data);
// });
// socket.emit('addArticle', {uid:2, title:'test', content_src: 'null'});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// socket.on('createGroupSuccess', (data) => {
//       console.log(data);
// });
// socket.emit('createGroup', {uid:2, group_name:'test', intro: 'just for test'});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// socket.on('joinGroupSuccess', (data) => {
//       console.log(data);
// });
// socket.emit('joinGroup', {uid:2, gid: 1});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// socket.on('addHistorySuccess', (data) => {
//       console.log(data);
// });
// socket.emit('addHistory', {uid:2, year:2022, month:12, day:1, climate:'阴', situation:'约会', top_id: 8, bottom_id: 9, shoe_id: 10, coat_id: 11, ornament_id: 12});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// const qiniu = require('qiniu-js')
// async function upload(req, res) {
//    try {
//      const { filename } = req.files[0]
//      const { qiniuConf = JSON.stringify(QI_NIU_CONFIG) } = req.body
//      const filePath = path.join(ORIGINAL_IMG_PATH, filename)
//      const url = await uploadImageToQiniu(filePath, JSON.parse(qiniuConf))
//      res.send(
//        successRes({
//          url,
//        })
//      )
//    } catch (err) {
//      res.send(errorRes(err))
//    }
//  }
//  async function uploadImageToQiniu(imagePath, qiniuConf) {
//    return new Promise((resolve, reject) => {
//      const { accessKey, secretKey, scope, domain } = qiniuConf
//      const config = new qiniu.conf.Config()
//      const formUploader = new qiniu.form_up.FormUploader(config)
//      const putExtra = new qiniu.form_up.PutExtra()
//      const token = getToken(accessKey, secretKey, scope)
 
//      // 上传内容
//      const key = path.parse(imagePath).name
//      const uploadItem = path.normalize(imagePath)
//      formUploader.putFile(token, key, uploadItem, putExtra, function (respErr, respBody) {
//        if (respErr) {
//          reject(respErr)
//        } else {
//          const { key } = respBody
//          resolve(`${domain}/${key}`)
//          // 删除image文件中的图片文件
//          setTimeout(() => {
//            clearImageFile()
//          }, 0)
//        }
//      })
//    })
//  }