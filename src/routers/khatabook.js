const express = require("express");
const {
  khatabookPageHandler,
  khatabookFormhandler,
} = require("../controllers/khatabook");
const khatabookRouter = express.Router();

khatabookRouter.get("/", khatabookPageHandler);
khatabookRouter.post("/", khatabookFormhandler);

module.exports = { khatabookRouter };
