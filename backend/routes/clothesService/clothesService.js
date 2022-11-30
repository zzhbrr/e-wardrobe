sql_clothes = require('./sql_clothesService');

productID = 0;


function PID2url(socket, pg_client, pid, index, type) {
    pg_client.query(sql_clothes.getProductURLByPID(pid), (err, res) => {
        if (err) throw err;
        if (res.rows.length === 0) {
            console.log('no product with pid: ' + data.pid);
        } else {
            socket.emit('getOutfitsRetURLSuccess', {img_src: res.rows[0].img_src, type: type, index: index});
        }
    })
}

module.exports = {
    getOutfits: function getOutfits(socket, pg_client) {
        socket.on('getOutfits', (data) => {
            if (data.askType === 'all') {
                pg_client.query(sql_clothes.getOutfitsByUID(data.uid), (err, res) => {
                    if (err) throw err;
                    for (let i = 0; i < res.rows.length; i++) {
                        PID2url(socket, pg_client, res.rows[i].coat_id, i, 'coat');
                        PID2url(socket, pg_client, res.rows[i].bottom_id, i, 'bottom');
                        PID2url(socket, pg_client, res.rows[i].ornament_id, i, 'ornament');
                        PID2url(socket, pg_client, res.rows[i].shoe_id, i, 'shoe');
                        PID2url(socket, pg_client, res.rows[i].top_id, i, 'top');
                    }
                    console.log(`get ${res.rows.length} outfits`);
                    socket.emit('getOutfitsSuccess', {message: '获取成功', outfits: res.rows});
                })
            } else {
                pg_client.query(sql_clothes.getOutfitsByOID(data.oid), (err, res) => {
                    if (err) throw err;
                    PID2url(socket, pg_client, res.rows[0].coat_id, 0, 'coat');
                    PID2url(socket, pg_client, res.rows[0].bottom_id, 0, 'bottom');
                    PID2url(socket, pg_client, res.rows[0].ornament_id, 0, 'ornament');
                    PID2url(socket, pg_client, res.rows[0].shoe_id, 0, 'shoe');
                    PID2url(socket, pg_client, res.rows[0].top_id, 0, 'top');
                    socket.emit('getOutfitsSuccess', {message: '获取成功', outfits: res.rows[0]});
                })
            }
        })
    }, 
    getClothes: function getClothes(socket, pg_client) {
        socket.on('getAllClothes', (data) => {
            sql_getAllClothes = `SELECT admin.product.pid AS pid, img_src, p_type AS type 
                    FROM admin.product INNER JOIN admin.user_product 
                    ON admin.product.pid = admin.user_product.pid
                    WHERE uid = ${data.uid} AND p_type = '${data.type}';`;
            sql_test1 = `SELECT * 
                        FROM admin.product NATURAL JOIN admin.user_product
                        ON admin.product.pid=admin.user_product.pid;`;
            // console.log('in getAllClothes');
            pg_client.query(sql_getAllClothes, (err, res) => {
                if (err) throw err;
                console.log('get ' + res.rows.length + ' ' + data.type + 's');
                socket.emit('getAllClothesSuccess', {message: '获取成功', clothes: res.rows, type: data.type});
            })
        })

        socket.on('getClothesDetail', (data) => {
            sql_getClothesDetail = `SELECT * FROM admin.product WHERE pid = ${data.pid};`;
            pg_client.query(sql_getClothesDetail, (err, res) => {
                if (err) throw err;
                if (res.rows.length === 0) {
                    console.log('no product with pid: ' + data.pid);
                    socket.emit('getClothesDetailFailed', {message: '未找到该衣物'});
                } else {
                    socket.emit('getClothesDetailSuccess', {img_src: res.rows[0].img_src, 
                        season: res.rows[0].season, climate: res.rows[0].climate, 
                        situation: res.rows[0].situation, band: res.rows[0].band, texture: res.rows[0].texture, band: res.rows[0].band_name});
                }
            })
        });

        socket.on('getClothesComments', (data) => {
            sql_getClothesComments = `SELECT time, content_src, username, admin.users_tmp.uid
                                        FROM admin.essay, admin.prod_essay, admin.users_tmp
                                        WHERE admin.essay.eid = admin.prod_essay.eid AND admin.essay.uid = admin.users_tmp.uid
                                            AND pid = ${data.pid};`;
            pg_client.query(sql_getClothesComments, (err, res) => {
                if (err) throw err;
                console.log('get ' + res.rows.length + ' comments');
                socket.emit('getClothesCommentsSuccess', {comments: res.rows});
            })

        })
    }
}