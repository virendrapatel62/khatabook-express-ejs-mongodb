const express = require("express");
const {
  serveCustomerCreationForm,
  createCustomer,
  showCustomers,
} = require("../controllers/customers");

const { userAuthMiddleware } = require("../middlewares");
const customerRouter = express.Router();

// /customers

customerRouter.get("/create", userAuthMiddleware, serveCustomerCreationForm);
customerRouter.post("/create", userAuthMiddleware, createCustomer);
customerRouter.get("/", userAuthMiddleware, showCustomers);

module.exports = { customerRouter };
