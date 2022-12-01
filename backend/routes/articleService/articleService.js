module.exports = {
    getArticles: function getArticles(socket, pg_client) {
        socket.on('getAllArticles', (data) => {
            console.log(`req article: ${data.uid}`)
            sql_getAllArticles = `  SELECT eid, title, time 
                                    FROM admin.essay 
                                    WHERE uid = ${data.uid};`;
            pg_client.query(sql_getAllArticles, (err, res) => {
                if (err) throw err;
                socket.emit('getAllArticlesSuccess', {articles: res.rows});
            })
        });
        
        socket.on('getArticleDetail', (data) => {
            sql_getArticleDetail = `SELECT * 
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
            sql_getArticleComments = `SELECT time, content, username, admin.users_tmp.uid 
                                      FROM admin.essaycomment, admin.users_tmp
                                      WHERE admin.essaycomment.uid = admin.users_tmp.uid AND eid = '${data.eid}';`;
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

    }
}