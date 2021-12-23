const express = require("express");
const {
  khatabookSelectorHandler,
  customerSelectorPage,
} = require("../controllers/entry");
const { userAuthMiddleware } = require("../middlewares");
const entryRouter = express.Router();

// localhost:3000/entries

entryRouter.get("/", userAuthMiddleware, khatabookSelectorHandler);
entryRouter.get(
  "/khatabook/:khatabook",
  userAuthMiddleware,
  customerSelectorPage
);

module.exports = {
  entryRouter,
};
