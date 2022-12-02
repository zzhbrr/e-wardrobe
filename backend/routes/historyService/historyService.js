function PID2url(socket, pg_client, pid, index, type) {
    pg_client.query(sql_clothes.getProductURLByPID(pid), (err, res) => {
        if (err) throw err;
        if (res.rows.length === 0) {
            console.log('no product with pid: ' + data.pid);
        } else {
            socket.emit('getAllHistoryRetURLSuccess', {img_src: res.rows[0].img_src, type: type, index: index});
        }
    })
}

module.exports = {
    getHistory: function getHistory(socket, pg_client) {
        socket.on('getAllHistory', (data) => {
            sql_getHistory = `SELECT * FROM admin.history 
                                WHERE uid = ${data.uid}`;
            pg_client.query(sql_getHistory, (err, res) => {
                if (err) throw err;
                for (let i = 0; i < res.rows.length; i++) {
                    PID2url(socket, pg_client, res.rows[i].coat_id, i, 'coat');
                    PID2url(socket, pg_client, res.rows[i].down_wear_id, i, 'bottom');
                    PID2url(socket, pg_client, res.rows[i].decration_id, i, 'ornament');
                    PID2url(socket, pg_client, res.rows[i].shoe_id, i, 'shoe');
                    PID2url(socket, pg_client, res.rows[i].up_wear_id, i, 'top');
                }
                socket.emit('getAllHistorySuccess', {history: res.rows});
            })
        });
    }, 
    updateHistory: function updateHistory(socket, pg_client) {
        socket.on('addHistory', (data) => {
            pg_client.query(`SELECT COUNT(hid) FROM admin.history WHERE admin.history.uid=${data.uid}`, function(err, res) {
                if (err) throw err;
                hid_count = Number(res.rows[0].count);
                sql_addHistory = `INSERT INTO admin.history (uid, hid, h_year, h_month, h_day, climate, situation, up_wear_id, down_wear_id, coat_id, shoe_id, decration_id) 
                                    VALUES (${data.uid}, ${hid_count}, ${data.year}, ${data.month}, ${data.day}, '${data.climate}', '${data.situation}', ${data.top_id}, ${data.bottom_id}, ${data.coat_id}, ${data.shoe_id}, ${data.ornament_id})`;
                pg_client.query(sql_addHistory, (err, res) => {
                    if (err) throw err;
                    socket.emit('addHistorySuccess', {uid:data.uid, hid:hid_count, year:data.year, month:data.month, day:data.day, climate:data.climate, situation:data.situation, top_id:data.top_id, bottom_id:data.bottom_id, coat_id:data.coat_id, shoe_id:data.shoe_id, ornament_id:data.ornament_id});
                })
            })
        });
    }
}