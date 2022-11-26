sql = require('./sql_userLogin');
UID = 0;
module.exports = {
    userLogin: function(socket, pg_client, onlineUsers) {
        function checkIfUserIsLoggedIn(username) {
            return false;
            if (onlineUsers.indexOf(username) === -1) {
                return false;
            } else {
                return true;
            }
        }
        socket.on('login', (data) => {
            pg_client.query(sql.checkoutUsername(data.username), (err, res) => {
                if (err) throw err;
                if (res.rows.length === 0) {
                    socket.emit('loginFailed', {message: '用户不存在'});
                } else {
                    // console.log(res)
                    if(res.rows[0].password.replace(/\s+/g, "") == data.password) { // 在数据库中存储的密码会有尾空格
                        if (checkIfUserIsLoggedIn(data.username)) {
                            socket.emit('loginFailed', {message: '用户已登录'});
                        } else {
                            onlineUsers.push(data.username);
                            socket.emit('loginSuccess', {message: '登录成功', username: data.username});
                            console.log(`log: ${data.username} 成功登录`);
                        }
                    } else {
                        socket.emit('loginFailed', {message: '密码错误'});
                    }
                }

            })
        });

        socket.on('autoLogin', (data) => {
            // console.log('in autoLogin');
            // console.log(username);
            if (checkIfUserIsLoggedIn(data.username)) {
                socket.emit('autoLoginSuccess');
                onlineUsers.push(data.username);
            } else {
                // console.log('autologin failed')
                socket.emit('autoLoginFailed', {message: '用户未登录'});
            }
        })
    }, 
    userRegister: function(socket, pg_client) {
        socket.on('register', (data) => {
            pg_client.query(sql.checkoutUsername(data.username), (err, res) => {
                if (err) throw err;
                if (res.rows.length === 0) {
                    // console.log(sql.alterAddUser(data.username, data.password, data.email))
                    pg_client.query(sql.alterAddUser(UID, data.username, data.password, data.email), (err, res) => {
                        if (err) throw err;
                        socket.emit('registerSuccess', {message: '注册成功'});
                        UID = UID + 1;
                    })
                } else {
                    socket.emit('registerFailed', {message: '用户名已存在'});
                }
            })
        })
    }
}