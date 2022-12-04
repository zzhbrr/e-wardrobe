const qiniu = require('qiniu');

const access_key = 'a-K6FHTYvyul18TT1oA4_hbftG793npf1smmOwkL';
const secret_key = 'mtG7SqQCvrICKaz9paa4e3PXrLiMNutD7XQSGtl6';
const bucket = 'e-wardrobe';
let mac = new qiniu.auth.digest.Mac(access_key, secret_key);

module.exports = {
    getToken: function (socket) {
        socket.on('getToken', function (data) {
            console.log('getToken');
            let options = {
                scope: bucket,
                expires: 7200
            };

            let putPolice = new qiniu.rs.PutPolicy(options);
            let uploadToken = putPolice.uploadToken(mac);

            console.log('uploadToken: ', uploadToken);
            socket.emit('getTokenSuccess', {token: uploadToken});
        });
    }
}