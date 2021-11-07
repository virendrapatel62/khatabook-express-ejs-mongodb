const express = require("express");
const { homepageHandler } = require("../controllers");
const {
  loginPagehandler,
  registerPageHandler,
} = require("../controllers/accounts");
const router = express.Router();

router.get("/", homepageHandler);
router.get("/login", loginPagehandler);
router.get("/register", registerPageHandler);

module.exports = router;
