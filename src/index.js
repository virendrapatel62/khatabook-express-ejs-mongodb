const express = require("express");
const path = require("path");
const router = require("./routers");
const { createConnection } = require("./db");
const { User, Khatabook, Customer, Entry } = require("./models");

// Mongo Db Connection
createConnection()
  .then(() => console.log("Mongo DB Connected"))
  .catch((err) => console.log(`Connection Error : ${err.message}`));

//   Expresss Js Configuration
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

app.use(router);
