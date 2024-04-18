const mysql = require("mysql2/promise");

const mysqlDb = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "vehicleDetails",
});

module.exports = mysqlDb;
