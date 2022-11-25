var pg = require('pg');

// 数据库配置

var config = {
    user: 'zzh', 
    database: 'Group3', 
    password: 'zzhzzh1@1',
    host: '172.17.0.2',
    port: 15432
}

// 创建连接池

var pool = new pg.Pool(config);

// 查询

var sql = 'select * from departments;';

console.log('sql: ' + sql);

pool.query(sql, function(result) {

console.log(result);

});

