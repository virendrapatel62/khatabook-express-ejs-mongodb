const express = require("express");
const {
  serveCustomerCreationForm,
  createCustomer,
} = require("../controllers/customers");

const { userAuthMiddleware } = require("../middlewares");
const customerRouter = express.Router();

// /customers

customerRouter.get("/create", userAuthMiddleware, serveCustomerCreationForm);
customerRouter.post("/create", userAuthMiddleware, createCustomer);

module.exports = { customerRouter };
