const mysql = require('mysql2/promise');
require('dotenv').config();
const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "senha123",
    database: "SIE"
});

module.exports = connection;
