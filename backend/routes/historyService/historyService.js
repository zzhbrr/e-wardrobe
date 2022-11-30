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
    }
}