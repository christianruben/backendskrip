const mysql = require("mysql2");
const config = require('./config.js');

const connection = mysql.createConnection(
    config
);

module.exports = connection;