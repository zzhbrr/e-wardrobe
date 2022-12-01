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
    addArticle: function addArticle(socket, pg_client) {
        socket.on('addArticle', (data) => {
            console.log('add article: ' + data.title);
            pg_client.query('SELECT COUNT(eid) FROM admin.essay', function(err, res) {
                EID_count = res.rows[0].count;
                sql_addArticle = `INSERT INTO admin.essay (eid, title, content_src, uid, time) 
                                    VALUES (${EID_count}, '${data.title}', '${data.content_src}', '${data.uid}', current_timestamp(0));`;
                pg_client.query(sql_addArticle, (err, res) => {
                    if (err) throw err;
                    pg_client.query(`SELECT to_char(time, 'YYYY/MM/DD HH24:MI:SS') AS time FROM admin.essay WHERE eid=${EID_count}`, (err, res3) => {
                        if (err) throw err;
                        socket.emit('addArticleSuccess', {eid:EID_count, title: data.title, content_src: data.content_src, uid: data.uid, time: res3.time});
                    })
                });
            });
        });
    }
}