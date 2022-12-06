sql = require('./sql_userService');

module.exports = {
    userLogin: function(socket, pg_client, onlineUsers) {
        function checkIfUserIsLoggedIn(username) {
            // return false;
            for (let i = 0; i < onlineUsers.length; i++) {
                if (onlineUsers[i].username.replace(/\s+/g, "") === username.replace(/\s+/g, "")) {
                    return true;
                }
            }
            return false;
            username = username.replace(/\s+/g, "");
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
                            socket.emit('loginSuccess', {message: '登录成功', username: data.username, uid: res.rows[0].uid});
                            console.log(`log: ${data.username} 成功登录`);
                        }
                    } else {
                        socket.emit('loginFailed', {message: '密码错误'});
                    }
                }

            })
        });

        socket.on('autoLogin', (data) => {
            console.log('in autoLogin');
            console.log(data.username);
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
            // console.log('in register');
            pg_client.query('SELECT COUNT(*) FROM admin.users_tmp', function(err, res) {
                UID_count = res.rows[0].count;
                sql_register = `SELECT * FROM admin.users_tmp WHERE username='${data.username}'`;
                pg_client.query(sql.checkoutUsername(data.username), (err, res) => {
                    if (err) throw err;
                    // console.log('in register: UID_count: ' + UID_count);
                    if (res.rows.length === 0) {
                        // console.log(sql.alterAddUser(data.username, data.password, data.email))
                        pg_client.query(sql.alterAddUser(UID_count, data.username, data.password, data.email), (err, res) => {
                            if (err) throw err;
                            socket.emit('registerSuccess', {message: '注册成功'});
                            UID_count = UID_count + 1;
                        })
                    } else {
                        socket.emit('registerFailed', {message: '用户名已存在'});
                    }
                })
            });
        })
    }, 

    userInfo: function(socket, pg_client) {
        socket.on('userInfoAsk', (data) => {
            console.log("in userinfoAsk")
            console.log(data)
            pg_client.query(sql.checkoutUsername(data.userName), (err, res) => {
                if (err) throw err;
                if (res.rows.length === 0) {
                    console.log("userinfoAsk failed")
                    socket.emit('userInfoAskFailed', {message: '用户不存在'});
                } else {
                    res.rows[0].userName = data.userName;
                    console.log("userinfoAsk success")
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
                if (data.gender === 0) data.gender = "男";
                else if (data.gender === 1) data.gender = "女";
                socket.emit('userInfoChangeSuccess', {message: '修改成功', uid:data.uid, username:data.username, gender:data.gender, age:data.age, profession:data.profession});
            })
        });
    }, 
    userLogout: function(socket, pg_client, onlineUsers) {
        socket.on('logout', (data) => {
            console.log('in logout');
            let index = onlineUsers.indexOf(data.username);
            // console.log(index);
            // console.log(data.username+'1');
            // console.log(onlineUsers[0]+'1');
            // console.log(data.username === onlineUsers[0])
            if (index === -1) {
                socket.emit('logoutFailed', {message: '用户未登录'});
            } else {
                console.log('logout success');
                onlineUsers.splice(index, 1);
                console.log(`log: ${data.username} 成功登出`);
                socket.emit('logoutSuccess', {message: '登出成功', uid: data.uid, username: data.username});
            }
        })
    }
}