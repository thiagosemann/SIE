const mysql = require('mysql2/promise');
require('dotenv').config();
const connection = mysql.createPool({
    host: "10.121.60.193",
    user: "root",
    password: "senha123",
    database: "SIE"
});

module.exports = connection;
