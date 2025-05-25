const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'military_assets1',
  password: 'vishnu',
  port: 5432,
});

module.exports = pool;
