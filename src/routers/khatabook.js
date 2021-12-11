const express = require("express");
const {
  khatabookPageHandler,
  khatabookFormhandler,
  khatabookDeleteHandler,
} = require("../controllers/khatabook");
const { userAuthMiddleware } = require("../middlewares");
const khatabookRouter = express.Router();

// /khatabook

khatabookRouter.get("/", userAuthMiddleware, khatabookPageHandler);
khatabookRouter.post("/", userAuthMiddleware, khatabookFormhandler);
khatabookRouter.post("/delete", userAuthMiddleware, khatabookDeleteHandler);

module.exports = { khatabookRouter };
