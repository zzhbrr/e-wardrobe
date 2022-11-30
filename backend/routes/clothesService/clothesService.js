sql_clothes = require('./sql_clothesService');

productID = 0;

// function PID2url(dict, add_name, pid, pg_client) {
//     pg_client.query(sql_clothes.getProductURLByPID(pid), (err, res) => {
//         if (err) throw err;
//         if (res.rows.length === 0) {
//             console.log('no product with pid: ' + pid);
//         } else {
//             // dict.add(add_name, res.rows[0].img_src);
//             dict['add_name'] = res.rows[0].img_src;
//         }
//     })
// }

module.exports = {
    getOutfits: function getOutfits(socket, pg_client) {
        socket.on('getOutfits', (data) => {
            if (data.askType === 'all') {
                pg_client.query(sql_clothes.getOutfitsByUID(data.uid), (err, res) => {
                    if (err) throw err;
                    // for (let i = 0; i < res.rows.length; i++) {
                    //     PID2url(res.rows[i], 'coat_src', res.rows[i].coat_id, pg_client);
                    //     PID2url(res.rows[i], 'bottom_src', res.rows[i].bottom_id, pg_client);
                    //     PID2url(res.rows[i], 'ornament_src', res.rows[i].ornament_id, pg_client);
                    //     PID2url(res.rows[i], 'shoe_src', res.rows[i].shoe_id, pg_client);
                    //     PID2url(res.rows[i], 'top_src', res.rows[i].top_id, pg_client);
                    // }
                    // console.log(`get ${res.rows.length} outfits`);
                    socket.emit('getOutfitsSuccess', {message: '获取成功', outfits: res.rows});
                })
            } else {
                pg_client.query(sql_clothes.getOutfitsByOID(data.oid), (err, res) => {
                    if (err) throw err;
                    // res.rows[0].img_src = PID2url(res.rows[0].pid, pg_client);
                    PID2url(res.rows[0], 'coat_src', res.rows[0].coat_id, pg_client);
                    PID2url(res.rows[0], 'bottom_src', res.rows[0].bottom_id, pg_client);
                    PID2url(res.rows[0], 'ornament_src', res.rows[0].ornament_id, pg_client);
                    PID2url(res.rows[0], 'shoe_src', res.rows[0].shoe_id, pg_client);
                    PID2url(res.rows[0], 'top_src', res.rows[0].top_id, pg_client);
                    socket.emit('getOutfitsSuccess', {message: '获取成功', outfits: res.rows[0]});
                })
            }
        })
    }, 

    PID2url: function PID2url(socket, pg_client) {
        socket.on('PID2url', (data) => {
            pg_client.query(sql_clothes.getProductURLByPID(data.pid), (err, res) => {
                if (err) throw err;
                if (res.rows.length === 0) {
                    console.log('no product with pid: ' + data.pid);
                } else {
                    console.log("PID2url success")
                    socket.emit('PID2urlSuccess', {message: '获取成功', img_src: res.rows[0].img_src, type_src: data.type_src, index: data.index});
                }
            })
        })
    }
}