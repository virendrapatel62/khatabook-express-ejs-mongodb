const mongoose = require("mongoose");
function createConnection() {
  const DB_NAME = "khatabook_express";
  const connectionString = `mongodb://localhost:27017/${DB_NAME}`;
  return mongoose.connect(connectionString);
}

module.exports = { createConnection };
