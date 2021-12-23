const express = require("express");
const { khatabookSelectorHandler } = require("../controllers/entry");
const { userAuthMiddleware } = require("../middlewares");
const entryRouter = express.Router();

// localhost:3000/entries

entryRouter.get("/", userAuthMiddleware, khatabookSelectorHandler);

module.exports = {
  entryRouter,
};
