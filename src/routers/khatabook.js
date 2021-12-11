const express = require("express");
const {
  khatabookPageHandler,
  khatabookFormhandler,
} = require("../controllers/khatabook");
const { userAuthMiddleware } = require("../middlewares");
const khatabookRouter = express.Router();

khatabookRouter.get("/", userAuthMiddleware, khatabookPageHandler);
khatabookRouter.post("/", userAuthMiddleware, khatabookFormhandler);

module.exports = { khatabookRouter };
