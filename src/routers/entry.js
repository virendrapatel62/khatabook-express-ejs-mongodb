const express = require("express");
const {
  khatabookSelectorHandler,
  customerSelectorPage,
  entryCreatorPage,
  createEntryHandler,
} = require("../controllers/entry");
const { userAuthMiddleware } = require("../middlewares");
const entryRouter = express.Router();

// localhost:3000/entries

entryRouter.get(
  "/khatabook/:khatabook/customer/:customer",
  userAuthMiddleware,
  entryCreatorPage
);
entryRouter.post(
  "/khatabook/:khatabook/customer/:customer",
  userAuthMiddleware,
  createEntryHandler
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
