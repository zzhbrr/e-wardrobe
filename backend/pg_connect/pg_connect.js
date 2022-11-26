var pg = require('pg');
const db_config = require('./pg_config');

console.log('pg_client builing');
const pg_client = new pg.Client(db_config);
// pg_client.connect();
// module.exports = pg_client;
var pool = new pg.Pool(db_config);
module.exports = pool;