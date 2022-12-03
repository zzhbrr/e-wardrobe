module.exports = {
    getArticles: function getArticles(socket, pg_client) {
        socket.on('getAllArticles', (data) => {
            console.log(`req article: ${data.uid}`)
            sql_getAllArticles = `  SELECT eid, title, to_char(time, 'YYYY/MM/DD HH24:MI:SS') AS time 
                                    FROM admin.essay 
                                    WHERE uid = ${data.uid}
                                    ORDER BY time DESC;`;
            pg_client.query(sql_getAllArticles, (err, res) => {
                if (err) throw err;
                socket.emit('getAllArticlesSuccess', {articles: res.rows});
            })
        });
        
        socket.on('getArticleDetail', (data) => {
            sql_getArticleDetail = `SELECT eid, title, content_src, to_char(time, 'YYYY/MM/DD HH24:MI:SS') AS time, admin.users_tmp.uid, username
                                    FROM admin.essay, admin.users_tmp
                                    WHERE admin.essay.uid = admin.users_tmp.uid AND eid = '${data.eid}';`;
            pg_client.query(sql_getArticleDetail, (err, res) => {
                if (err) throw err;
                if (res.rows.length === 0) {
                    console.log('no article with eid: ' + data.eid);
                } else {
                    socket.emit('getArticleDetailSuccess', {eid: res.rows[0].eid, title:res.rows[0].title, 
                        content_src:res.rows[0].content_src, uid: res.rows[0].uid, username: res.rows[0].username, time: res.rows[0].time});
                }
            })
        });
        
        socket.on('getArticleComments', (data) => {
            sql_getArticleComments = `SELECT to_char(time, 'YYYY/MM/DD HH24:MI:SS') AS time, content, username, admin.users_tmp.uid 
                                      FROM admin.essaycomment, admin.users_tmp
                                      WHERE admin.essaycomment.uid = admin.users_tmp.uid AND eid = '${data.eid}'
                                      ORDER BY time DESC;`;
            pg_client.query(sql_getArticleComments, (err, res) => {
                if (err) throw err;
                if (res.rows.length === 0) {
                    console.log('no comments for article with eid: ' + data.eid);
                } else {
                    socket.emit('getArticleCommentsSuccess', {comments: res.rows});
                }
            })
        });

        // socket.on('getRelatedProducts', (data) => {
        //     sql_getRelatedProducts = `SELECT pid, name, price, image_src`;
        //     pg_client.query(sql_getRelatedProducts, (err, res) => {
        //         if (err) throw err;
        //         if (res.rows.length === 0) {
        //             console.log('no related products for article with eid: ' + data.eid);
        //         } else {
        //             socket.emit('getRelatedProductsSuccess', {products: res.rows});
        //         }
        //     })

        // });

    }, 
    updateArticle: function updateArticle(socket, pg_client) {
        socket.on('addArticle', (data) => {
            console.log('add article: ' + data.title);
            pg_client.query('SELECT MAX(eid) AS max_eid FROM admin.essay', function(err, res) {
                // console.log(res.rows[0].max_eid);
                EID_count = res.rows[0].max_eid + 1;
                sql_addArticle = `INSERT INTO admin.essay (eid, title, content_src, uid, time) 
                                    VALUES (${EID_count}, '${data.title}', '${data.content_src}', '${data.uid}', current_timestamp(0))
                                    RETURNING to_char(time, 'YYYY/MM/DD HH24:MI:SS') AS time;`;
                pg_client.query(sql_addArticle, (err, res) => {
                    if (err) throw err;
                    for (let i = 0; i < data.relatedproducts.length; i++) 
                        pg_client.query('INSERT INTO admin.prod_essay(pid, eid) VALUES ($1, $2)', [data.relatedproducts[i].pid, EID_count]);
                    for (let i = 0; i < data.relatedgroups.length; i++)
                        pg_client.query('INSERT INTO admin.essay_group(gid, eid) VALUES ($1, $2)', [data.relatedgroups[i].gid, EID_count]);
                    socket.emit('addArticleSuccess', {eid:EID_count, title: data.title, content_src: data.content_src, uid: data.uid, time: res.rows[0].time});
                });
            });
        });

        socket.on('changeArticle', (data) => {
            let s = "";
            let isFirst = true;
            for (let key in data.change) {
                if (!isFirst) {s += `,`;}
                else isFirst=false;
                s += `${key} = ${data.change[key]} `;
                console.log(key, data.change[key]);
            }
            s += `, time = current_timestamp(0)`;
            sql_changeArticle = `UPDATE admin.essay SET ` + s + `WHERE eid = ${data.eid} RETURNING *`;
            pg_client.query(sql_changeArticle, (err, res) => {
                if (err) throw err;
                socket.emit('changeArticleSuccess', {eid: data.eid, title:res.rows[0].title, content_src:res.rows[0].content_src, time: res.rows[0].time});
            });
        });

        socket.on('addCommentToArticle', (data) => {
            console.log('add comment to article: ' + data.eid);
            pg_client.query(`SELECT MAX(ecid) AS max_ecid FROM admin.essaycomment WHERE eid=${data.eid}`, function(err, res) {
                console.log('max_ecid: ' + res.rows[0].max_ecid);
                ECID_count = res.rows[0].max_ecid + 1;
                sql_addCommentToArticle = `INSERT INTO admin.essaycomment (ecid, eid, uid, content, time) 
                                            VALUES (${ECID_count}, '${data.eid}', '${data.uid}', '${data.content}', current_timestamp(0))
                                            RETURNING to_char(time, 'YYYY/MM/DD HH24:MI:SS') AS time;`;
                pg_client.query(sql_addCommentToArticle, (err, res) => {
                    if (err) throw err;
                    socket.emit('addCommentToArticleSuccess', {ecid:ECID_count, eid: data.eid, uid: data.uid, content: data.content, time: res.rows[0].time});
                });
            });
        });

        socket.on('deleteArticle', (data) => {
            console.log('delete article: ' + data.eid);
            pg_client.query(`DELETE FROM admin.essay WHERE eid = '${data.eid}';`, (err, res) => {
                if (err) throw err;
                socket.emit('deleteArticleSuccess', {eid: data.eid});
            });
        });
    }
}