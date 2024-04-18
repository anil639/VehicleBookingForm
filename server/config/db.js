const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();
const mysqlDb = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "mysql",
});

module.exports = mysqlDb;
