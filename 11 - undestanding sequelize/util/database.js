const mysql = require('mysql2');

const poll = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodecomplete',
    password: 'root'
});

module.exports = poll.promise();