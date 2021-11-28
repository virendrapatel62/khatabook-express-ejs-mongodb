const express = require("express");
const path = require("path");
const router = require("./routers");
const { createConnection } = require("./db");
const cookieParser = require("cookie-parser");

// Mongo Db Connection
createConnection()
  .then(() => console.log("Mongo DB Connected"))
  .catch((err) => console.log(`Connection Error : ${err.message}`));

//   Expresss Js Configuration
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());
const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

app.use(router);

app.get("/set", (req, res) => {
  res.cookie("name", "virendra");
  res.cookie("time", new Date().toTimeString());
  res.render("sample");
});
app.get("/get", (req, res) => {
  res.render("sample", { request: req });
});
