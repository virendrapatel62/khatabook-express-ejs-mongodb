const express = require("express");
const {
  khatabookSelectorHandler,
  customerSelectorPage,
  entryCreatorPage,
} = require("../controllers/entry");
const { userAuthMiddleware } = require("../middlewares");
const entryRouter = express.Router();

// localhost:3000/entries

entryRouter.get(
  "/khatabook/:khatabook/customer/:customer",
  userAuthMiddleware,
  entryCreatorPage
);

entryRouter.get("/", userAuthMiddleware, khatabookSelectorHandler);
entryRouter.get(
  "/khatabook/:khatabook",
  userAuthMiddleware,
  customerSelectorPage
);

module.exports = {
  entryRouter,
};
