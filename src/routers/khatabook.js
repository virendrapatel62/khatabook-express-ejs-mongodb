const express = require("express");
const {
  serveKahatabookForm,
  createKhatabookHandler,
} = require("../controllers/khatabook");
const khatabookRouter = express.Router();

khatabookRouter.get("/create", serveKahatabookForm);
khatabookRouter.post("/create", createKhatabookHandler);

module.exports = { khatabookRouter };
