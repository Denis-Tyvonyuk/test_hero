const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "",
  password: "",
  database: "hero_db",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = db;
