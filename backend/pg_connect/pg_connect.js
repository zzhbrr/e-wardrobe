var pg = require('pg');
const db_config = require('./pg_config');

const pg_client = new pg.Client(db_config);
pg_client.connect();
module.exports = pg_client;