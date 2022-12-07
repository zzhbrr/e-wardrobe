sql_clothes = require('./sql_clothesService');

productID = 0;


function PID2url(socket, pg_client, pid, index, type) {
    pg_client.query(sql_clothes.getProductURLByPID(pid), (err, res) => {
        if (err) throw err;
        if (res.rows.length === 0) {
            console.log('no product with pid: ' + pid);
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
            console.log(data)
            pg_client.query(sql_getAllClothes, (err, res) => {
                if (err) throw err;
                console.log('get ' + res.rows.length + ' ' + data.type + 's');
                socket.emit('getAllClothesSuccess', {message: '获取成功', clothes: res.rows, type: data.type});
            })
        })

        socket.on('getClothesDetail', (data) => {
            sql_getClothesDetail = `SELECT * 
                                    FROM admin.product FULL JOIN admin.band
                                    ON admin.product.pid = admin.band.pid 
                                    WHERE admin.product.pid = ${data.pid};`;
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

        socket.on('getClothesEssays', (data) => {
            sql_getClothesEssays = `SELECT to_char(time, 'YYYY/MM/DD HH24:MI:SS') AS time, content_src, username, admin.users_tmp.uid
                                        FROM admin.essay, admin.prod_essay, admin.users_tmp
                                        WHERE admin.essay.eid = admin.prod_essay.eid AND admin.essay.uid = admin.users_tmp.uid
                                            AND pid = ${data.pid};`;
            pg_client.query(sql_getClothesEssays, (err, res) => {
                if (err) throw err;
                console.log('get ' + res.rows.length + ' essays');
                socket.emit('getClothesEssaysSuccess', {essays: res.rows});
            })

        });

        socket.on('getClothesComments', (data) => {
            sql_getClothesComments = `SELECT to_char(c_time, 'YYYY/MM/DD HH24:MI:SS') AS time, content, username, admin.users_tmp.uid
                                        FROM admin.users_tmp, admin.p_comment
                                        WHERE admin.p_comment.uid = admin.users_tmp.uid
                                            AND pid = ${data.pid};`;
            pg_client.query(sql_getClothesComments, (err, res) => {
                if (err) throw err;
                console.log('get ' + res.rows.length + ' essays');
                socket.emit('getClothesCommentsSuccess', {comments: res.rows});
            })

        });
    }, 
    updateOutfits: function updateOutfits(socket, pg_client) {
        socket.on('addOutfits', (data) => {
            pg_client.query('SELECT MAX(oid) AS max_oid FROM admin.outfit', function(err, res) {
                OID_count = res.rows[0].max_oid + 1;
                // console.log('OID_count is ' + OID_count + " now");
                if (data.top_id === undefined || data.top_id === -1) data.top_id = 0;
                if (data.bottom_id === undefined || data.bottom_id === -1) data.bottom_id = 0;
                if (data.coat_id === undefined || data.coat_id === -1) data.coat_id = 0;
                if (data.shoe_id === undefined || data.shoe_id === -1) data.shoe_id = 0;
                if (data.ornament_id === undefined || data.ornament_id === -1) data.ornament_id = 0;
                
                console.log('top_id='+data.top_id + ' bottom_id='+data.bottom_id + ' coat_id='+data.coat_id + ' shoe_id='+data.shoe_id + ' ornament_id='+data.ornament_id + ' uid='+data.uid + ' username='+data.username);
                sql_addOutfits = `INSERT INTO admin.outfit (oid, top_id, bottom_id, coat_id, shoe_id, ornament_id, uid, username) 
                                    VALUES (${OID_count}, ${data.top_id}, ${data.bottom_id}, ${data.coat_id}, ${data.shoe_id}, ${data.ornament_id}, ${data.uid}, '${data.username}');`;
                pg_client.query(sql_addOutfits, (err, res) => {
                    if (err) throw err;
                    console.log('add outfit success: ' + 'top_id='+data.top_id + ' bottom_id='+data.bottom_id + ' coat_id='+data.coat_id + ' shoe_id='+data.shoe_id + ' ornament_id='+data.ornament_id + ' uid='+data.uid + ' username='+data.username);
                    socket.emit('addOutfitsSuccess', {oid: OID_count, top_id: data.top_id, bottom_id: data.bottom_id, coat_id: data.coat_id, shoe_id: data.shoe_id, ornament_id: data.ornament_id, uid: data.uid, username: data.username});
                })
            });
        });
        socket.on('deleteOutfit', (data) => {
            sql_deleteOutfits = `DELETE FROM admin.outfit WHERE oid = ${data.oid};`;
            pg_client.query(sql_deleteOutfits, (err, res) => {
                if (err) throw err;
                socket.emit('deleteOutfitSuccess', {oid: data.oid});
            });
        });
        socket.on('changeOutfit', (data) => {
            let s = "";
            let isFirst = true;
            for (let key in data.change) {
                if (!isFirst) {s += `,`;}
                else isFirst=false;
                s += `${key} = ${data.change[key]} `;
                console.log(key, data.change[key]);
            }
            sql_changeOutfits = `UPDATE admin.outfit SET ` + s + `WHERE oid = ${data.oid} RETURNING *`;
            pg_client.query(sql_changeOutfits, (err, res) => {
                if (err) throw err;
                console.log('change outfit success');
                socket.emit('changeOutfitSuccess', {oid: data.oid, top_id: res.rows[0].top_id, bottom_id: res.rows[0].bottom_id, 
                    coat_id: res.rows[0].coat_id, shoe_id: res.rows[0].shoe_id, ornament_id: res.rows[0].ornament_id});
            })
        });
    }, 
    updateClothes: function updateClothes(socket, pg_client) {
        socket.on('addClothes', (data) => {
            pg_client.query('SELECT MAX(pid) AS max_pid FROM admin.product', function(err, res) {
                PID_count = res.rows[0].max_pid + 1;
                console.log('PID_count is ' + PID_count + " now");
                sql_addClothes = `INSERT INTO admin.product (pid, img_src, p_type, color, season, climate, situation, texture)
                                    VALUES (${PID_count}, '${data.img_src}', '${data.type}', '${data.color === undefined ? '' : data.color}', 
                                    '${data.season === undefined ? '' : data.season}', '${data.climate === undefined ? '' : data.climate}', '${data.situation  === undefined ? '' : data.situation}', 
                                    '${data.texture  === undefined ? '' : data.texture}') 
                                    RETURNING *;`;
                pg_client.query(sql_addClothes, (err, res) => {
                    if (err) throw err;
                    console.log(`add clothes ${PID_count} success`);
                    pg_client.query(`INSERT INTO admin.user_product(uid, pid) VALUES (${data.uid}, ${PID_count})`, (err, res1) => {
                        if (err) throw err;
                        socket.emit('addClothesSuccess', {pid: PID_count, img_src: res.rows[0].img_src.replace(/\s+/g, ""), type: res.rows[0].p_type.replace(/\s+/g, ""), season: res.rows[0].season.replace(/\s+/g, ""), climate: res.rows[0].climate.replace(/\s+/g, ""), situation: res.rows[0].situation.replace(/\s+/g, ""), texture: res.rows[0].texture.replace(/\s+/g, "")});
                    });
                })
            });
        });
        socket.on('deleteClothes', (data) => {
            pg_client.query(`DELETE FROM admin.product WHERE pid = ${data.pid} RETURNING *;`, (err, res) => {
                if (err) throw err;
                socket.emit('deleteClothesSuccess', {message: '删除成功', type:res.rows[0].p_type.replace(/\s+/g, "")});
            });
        });
        socket.on('changeClothesInfo', (data) => {
            let s = "";
            let isFirst = true;
            for (let key in data.change) {
                if (!isFirst) {s += `,`;}
                else isFirst=false;
                s += `${key} = ${data.change[key]} `;
                console.log(key, data.change[key]);
            }
            sql_changeClothesInfo = `UPDATE admin.product SET ` + s + `WHERE pid = ${data.pid} RETURNING *`;
            pg_client.query(sql_changeClothesInfo, (err, res) => {
                if (err) throw err;
                console.log('change clothes success');
                socket.emit('changeClothesInfoSuccess', {pid: data.pid, img_src: res.rows[0].img_src, season: res.rows[0].season, climate: res.rows[0].climate, situation: res.rows[0].situation, texture: res.rows[0].texture});
            })
        });
        socket.on('addClothesComments', (data) => {
            pg_client.query(`SELECT MAX(seq_id) AS max_seqid FROM admin.p_comment WHERE pid = ${data.pid}`, function(err, res) {
                SeqID_count = res.rows[0].max_seqid + 1;
                console.log('SeqID_count is ' + SeqID_count + " now");
                sql_addClothesComments = `INSERT INTO admin.p_comment (pid, seq_id, uid, content, c_time) 
                                            VALUES (${data.pid}, ${SeqID_count}, ${data.uid}, '${data.content}', current_timestamp(0))
                                            RETURNING *;`;
                pg_client.query(sql_addClothesComments, (err, res) => {
                    if (err) throw err;
                    console.log('add clothes comments success');
                    socket.emit('addClothesCommentsSuccess', {pid: res.rows[0].pid, seqid: res.rows[0].seq_id, uid: res.rows[0].uid, content: res.rows[0].content, c_time: res.rows[0].c_time});
                })
            });
        });
        socket.on('deleteClothesComments', (data) => {
            console.log('in deleteClothesComments');
            pg_client.query(`DELETE FROM admin.p_comment WHERE pid = ${data.pid} AND seq_id = ${data.seqid};`, (err, res) => {
                if (err) throw err;
                socket.emit('deleteClothesCommentsSuccess', {message: '删除成功'});
            });
        });

    }
}