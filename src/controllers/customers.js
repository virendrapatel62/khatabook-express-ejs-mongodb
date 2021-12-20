const { Khatabook, Customer } = require("../models");

const showCustomers = async (request, response) => {
  const user = request.session.user;
  const khatabook = request.query.khatabook;
  const khatabooks = await Khatabook.find({ user: user._id }).select("title");
  let customers = [];
  if (khatabook) {
    customers = await Customer.find({ khatabook: khatabook });
  }

  const context = { request, khatabooks, customers };
  response.render("pages/customers", context);
};

const serveCustomerCreationForm = async (request, response) => {
  console.log(request.message);
  const user = request.session.user;
  const khatabooks = await Khatabook.find({ user: user._id }).select("title");

  const error = request.session.error;
  console.log({ error });
  request.session.error = null;

  const context = { request, khatabooks, error };
  response.render("pages/customer-creation-form", context);
};

const createCustomer = async (request, response) => {
  const { khatabook, customerName: name, phone } = request.body;
  let error = null;
  if (!khatabook) {
    error = { message: "Please Select Khatabook" };
  } else if (!(name && name.trim())) {
    error = { message: "Please Enter Customer Name" };
  } else if (!(phone && phone.trim())) {
    error = { message: "Please Enter Phone" };
  }
  if (!error) {
    try {
      await Customer.create({
        khatabook,
        name,
        phone,
      });
    } catch (error) {
      request.session.error = { message: error.message };
    }
  }

  request.session.error = error;
  response.redirect("/customers/create");
};

module.exports = {
  serveCustomerCreationForm,
  createCustomer,
  showCustomers,
};
