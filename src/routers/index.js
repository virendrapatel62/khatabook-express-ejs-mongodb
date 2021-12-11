const express = require("express");
const { khatabookRouter } = require("./khatabook");
const { homepageHandler } = require("../controllers");
const {
  loginPagehandler,
  registerPageHandler,
  registerFormHandler,
  loginFormHandler,
} = require("../controllers/accounts");
const { userAuthMiddleware } = require("../middlewares");
const router = express.Router();

router.get("/", userAuthMiddleware, homepageHandler);
router.get("/login", loginPagehandler);
router.post("/login", loginFormHandler);
router.get("/register", registerPageHandler);
router.post("/register", registerFormHandler);

module.exports = {
  khatabookRouter,
  commonRouter: router,
};
