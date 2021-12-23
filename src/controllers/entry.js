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
  console.log("SELECTED KHATABOOK IS", khatabookId);
  const customers = await Customer.find({ khatabook: khatabookId });
  console.log(customers);
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

  console.log({ customer, khatabook });
  const context = {
    request,
    selectedKhatabook: khatabook,
    selectedCustomer: customer,
    render: "entry-creator",
  };
  return response.render("pages/entries", context);
};

module.exports = {
  khatabookSelectorHandler,
  customerSelectorPage,
  entryCreatorPage,
};
