module.exports = {
    getGroups: function getGroups(socket, pg_client) {
        socket.on('getGroupDetail', (data) => {
            sql_getGroupDetail = `SELECT * FROM admin.interst_group WHERE gid = ${data.gid}`;
            pg_client.query(sql_getGroupDetail, (err, res) => {
                if (err) throw err;
                socket.emit('getGroupDetailSuccess', {groupName: res.rows[0].group_name, intro: res.rows[0].intro});
            })
        });

        socket.on('getGroupMembers', (data) => {
            sql_getGroupMembers = `SELECT admin.group_user.uid, username 
                                    FROM admin.users_tmp, admin.group_user
                                    WHERE admin.users_tmp.uid = admin.group_user.uid AND gid = ${data.gid}`;
            pg_client.query(sql_getGroupMembers, (err, res) => {
                if (err) throw err;
                socket.emit('getGroupMembersSuccess', {members: res.rows});
            })
        });

        socket.on('getGroupEssay', (data) => {
            sql_getGroupEssay = `SELECT admin.essay.eid, title, time, admin.essay.uid, username
                                    FROM admin.essay, admin.users_tmp, admin.essay_group, admin.interst_group 
                                    WHERE admin.essay.eid = admin.essay_group.eid AND admin.essay.uid = admin.users_tmp.uid AND admin.essay_group.gid = admin.interst_group.gid
                                        AND admin.essay_group.gid = ${data.gid};`;
            pg_client.query(sql_getGroupEssay, (err, res) => {
                if (err) throw err;
                socket.emit('getGroupEssaySuccess', {essays: res.rows});
            })
        });
    }
}