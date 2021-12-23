const { Khatabook, Customer } = require("../models");

const khatabookSelectorHandler = async (request, response) => {
  const user = request.session.user;
  const khatabooks = await Khatabook.find({ user: user._id }).select("title");
  const context = {
    request,
    khatabooks,
    render: "khatabook-selector",
  };
  return response.render("pages/entries", context);
};

const customerSelectorPage = async (request, response) => {
  const khatabookId = request.params.khatabook;
  const customers = await Customer.find({ khatabook: khatabookId });
  const context = {
    request,
    customers,
    selectedKhatabook: khatabookId,
    render: "customer-selector",
  };
  return response.render("pages/entries", context);
};
const entryCreatorPage = async (request, response) => {
  let { customer, khatabook } = request.params;
  customer = await Customer.findById(customer);
  khatabook = await Khatabook.findById(khatabook);
  const context = {
    request,
    selectedKhatabook: khatabook,
    selectedCustomer: customer,
    render: "entry-creator",
  };
  return response.render("pages/entries", context);
};

const createEntryHandler = (request, response) => {
  // handling entry
  // type ==> gave or got
  console.log(request.body);
  const amount = +request.body.amount;
  const type = +request.body.type;
  return response.redirect(request.originalUrl);
};

module.exports = {
  khatabookSelectorHandler,
  customerSelectorPage,
  entryCreatorPage,
  createEntryHandler,
};
