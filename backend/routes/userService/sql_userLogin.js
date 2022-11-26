function checkoutUsername(username) {return `select * from admin.users_tmp where username='${username}';`}

function alterAddUser(uid, username, password, email) {return `insert into admin.users_tmp (uid, username, password, email) values (${uid}, '${username}', '${password}', '${email}');`}

module.exports = {
    checkoutUsername: checkoutUsername, 
    alterAddUser: alterAddUser
}