function checkoutUsername(username) {return `select * from admin.users_tmp where username='${username}';`}

function alterAddUser(uid, username, password, email) {return `insert into admin.users_tmp (uid, username, password, email) values (${uid}, '${username}', '${password}', '${email}');`}

function alterChangeUserInfo(uid, username, gender, age, profession) {
    return `UPDATE admin.users_tmp SET gender='${gender}', age=${age}, profession='${profession}' WHERE username='${username}';`
}

module.exports = {
    checkoutUsername: checkoutUsername, 
    alterAddUser: alterAddUser, 
    alterChangeUserInfo: alterChangeUserInfo
}