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
            sql_getGroupMembersByPublishNum = `SELECT left_table.left_uid AS uid, left_table.left_username AS username, right_table.right_pulishnum AS publish_num
                                                FROM (SELECT admin.users_tmp.uid AS left_uid, username AS left_username 
                                                        FROM admin.users_tmp, admin.group_user 
                                                        WHERE admin.users_tmp.uid = admin.group_user.uid AND gid = ${data.gid}) AS left_table
                                                    FULL JOIN
                                                    (SELECT admin.essay.uid AS right_uid, COUNT(*) AS right_pulishnum
                                                        FROM admin.essay_group, admin.essay 
                                                        WHERE admin.essay_group.eid = admin.essay.eid AND admin.essay_group.gid = ${data.gid}
                                                        GROUP BY admin.essay.uid) AS right_table
                                                    ON left_table.left_uid = right_table.right_uid
                                                    ORDER BY right_table.right_pulishnum DESC NULLS LAST;`;
            pg_client.query(sql_getGroupMembersByPublishNum, (err, res) => {
                if (err) throw err;
                socket.emit('getGroupMembersSuccess', {members: res.rows});
            })
        });

        socket.on('getGroupEssay', (data) => {
            sql_getGroupEssay = `SELECT admin.essay.eid, title, time, admin.essay.uid, username
                                    FROM admin.essay, admin.users_tmp, admin.essay_group 
                                    WHERE admin.essay.eid = admin.essay_group.eid AND admin.essay.uid = admin.users_tmp.uid
                                        AND admin.essay_group.gid = ${data.gid};`;
            sql_getGroupEssayByReplyTime = `SElECT left_table.left_eid AS eid, left_table.left_title AS title, left_table.left_time AS time, left_table.left_uid AS uid, left_table.left_username AS username, right_table.right_recent_reply AS recently_reply_time
                                            FROM (SELECT admin.essay.eid AS left_eid, title AS left_title, time AS left_time, admin.essay.uid AS left_uid, username AS left_username
                                                    FROM admin.essay, admin.users_tmp, admin.essay_group
                                                    WHERE admin.essay.eid = admin.essay_group.eid AND admin.essay.uid = admin.users_tmp.uid AND admin.essay_group.gid = ${data.gid}) AS left_table
                                                FULL JOIN
                                                (SELECT MAX(admin.essaycomment.time) AS right_recent_reply, admin.essaycomment.eid AS right_eid
                                                    FROM admin.essay_group, admin.essaycomment
                                                    WHERE admin.essay_group.gid = ${data.gid} AND admin.essaycomment.eid = admin.essay_group.eid
                                                    GROUP BY admin.essaycomment.eid) AS right_table
                                                ON left_table.left_eid = right_table.right_eid
                                                ORDER BY right_table.right_recent_reply DESC NULLS LAST;`;
                                        
            pg_client.query(sql_getGroupEssayByReplyTime, (err, res) => {
                if (err) throw err;
                socket.emit('getGroupEssaySuccess', {essays: res.rows});
            })
        });

        socket.on('getWorldEssay', (data) => {
            sql_getWorldEssayByReplyTime = `SElECT left_table.left_eid AS eid, left_table.left_title AS title, left_table.left_time AS time, left_table.left_uid AS uid, left_table.left_username AS username, right_table.right_recent_reply AS recently_reply_time
                                            FROM (SELECT admin.essay.eid AS left_eid, title AS left_title, time AS left_time, admin.essay.uid AS left_uid, username AS left_username
                                                    FROM admin.essay, admin.users_tmp, admin.essay_group
                                                    WHERE admin.essay.eid = admin.essay_group.eid AND admin.essay.uid = admin.users_tmp.uid) AS left_table
                                                FULL JOIN
                                                (SELECT MAX(admin.essaycomment.time) AS right_recent_reply, admin.essaycomment.eid AS right_eid
                                                    FROM admin.essay_group, admin.essaycomment
                                                    WHERE admin.essaycomment.eid = admin.essay_group.eid
                                                    GROUP BY admin.essaycomment.eid) AS right_table
                                                ON left_table.left_eid = right_table.right_eid
                                                ORDER BY right_table.right_recent_reply DESC NULLS LAST;`;
            pg_client.query(sql_getWorldEssayByReplyTime, (err, res) => {
                if (err) throw err;
                let num = Math.min(res.rows.length, data.num);
                socket.emit('getWorldEssaySuccess', {essays: res.rows.slice(0, num), num: num});
            })
    });

        socket.on('getUserGroups', (data) => {
            sql_getUserGroups = `SELECT admin.group_user.gid, group_name, intro
                                    FROM admin.group_user, admin.interst_group 
                                    WHERE admin.group_user.gid = admin.interst_group.gid AND admin.group_user.uid = ${data.uid}`;
            pg_client.query(sql_getUserGroups, (err, res) => {
                if (err) throw err;
                socket.emit('getUserGroupsSuccess', {groups: res.rows});
            })
        });
    }
}