const express = require("express");
const path = require("path");
const router = require("./routers");
const { createConnection } = require("./db");
const cookieParser = require("cookie-parser");
const session = require("express-session");

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
app.use(
  session({
    secret: "123456@123#@#$",
  })
);
const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

app.use(router);

app.get("/page/:name/:age", (req, res) => {
  const { name, age } = req.params;
  req.session.user = {
    name,
    age,
  };
  res.render("sample");
});

app.get("/page1", (req, res) => {
  console.log(req.session);
  res.render("sample", { request: req });
});

app.get("/page2", (req, res) => {
  res.render("sample");
});
