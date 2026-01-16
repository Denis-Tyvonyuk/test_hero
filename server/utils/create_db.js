let mysql = require("mysql2");

let con = mysql.createConnection({
  host: "localhost",
  user: "",
  password: "",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE hero_db", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
