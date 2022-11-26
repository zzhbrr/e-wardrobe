sql = require('./sql_userService');
UID = 0;
module.exports = {
    userLogin: function(socket, pg_client, onlineUsers) {
        function checkIfUserIsLoggedIn(username) {
            // return false;
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
    }, 

    userInfo: function(socket, pg_client) {
        socket.on('userInfoAsk', (data) => {
            pg_client.query(sql.checkoutUsername(data.userName), (err, res) => {
                if (err) throw err;
                if (res.rows.length === 0) {
                    socket.emit('userInfoAskFailed', {message: '用户不存在'});
                } else {
                    res.rows[0].userName = data.userName;
                    socket.emit('userInfoAskSuccess', {message: '查询成功', userInfo: res.rows[0]});
                }
            })
        });
        socket.on('userInfoChange', (data) => {
            // console.log('in userInfoChange');
            // console.log(data);
            if (data.gender === '男') data.gender = 0;
            else if (data.gender === '女') data.gender = 1;
            pg_client.query(sql.alterChangeUserInfo(data.uid, data.username, data.gender, data.age, data.profession), (err, res) => {
                if (err) throw err;
                console.log(`User ${data.username} changed info`);
                socket.emit('userInfoChangeSuccess', {message: '修改成功'});
            })
        });
    }
}