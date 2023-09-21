const { Pool } = require('pg');

// get credentials from env
const configIfams = configs.connections.postgresql.ifams;

// connect to database using credentials from env-dev.json
const poolIfams = new Pool({
    user: configIfams.user,
    host: configIfams.host,
    database: configIfams.database,
    password: configIfams.password,
    port: configIfams.port
});

// listener on connections error
poolIfams.on('error', (err, client) => {
    // display error log
    console.log('[ERROR] Postgresql:', err);
});

const query =  async (sqlQuery, sqlValues = undefined) => {
    return await poolIfams.query(sqlQuery, sqlValues);
}

module.exports = {
    query:query
}