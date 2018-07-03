var mysql = require('mysql');
  
var connection = mysql.createConnection({

    host: process.env.DB_HOST || "localhost",
    port: 3306,
    user: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "paknplay_db"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;