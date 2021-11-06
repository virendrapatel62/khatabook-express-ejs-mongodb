const express = require("express");
const { createConnection } = require("./db");
const { User, Khatabook, Customer, Entry } = require("./models");

// Mongo Db Connection
createConnection()
  .then(() => console.log("Mongo DB Connected"))
  .catch((err) => console.log(`Connection Error : ${err.message}`));

//   Expresss Js Configuration
const app = express();
const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

app.get("/", (request, response) => {
  response.json({ message: "App is working." });
});
