const mysql = require("mysql2");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "alexShim13",
  database: "cschat",
  port: 3306,
};

// Create a connection to the database
const connection = mysql.createConnection(dbConfig);

// Start MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;