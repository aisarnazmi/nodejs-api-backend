const mysql = require('mysql2');

const configIfams = configs.connections.mysql.ifams;

const poolIfams = mysql.createPool(configIfams).promise();

const query = (sqlQuery, sqlValues = undefined) => {
    return poolIfams.execute(sqlQuery, sqlValues);
}

module.exports = {
    query:query
}