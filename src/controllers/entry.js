const { Khatabook, Customer, Entry, PAYMENT_METHODS } = require("../models");

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
    PAYMENT_METHODS,
    render: "entry-creator",
  };
  return response.render("pages/entries", context);
};

const createEntryHandler = async (request, response) => {
  // handling entry
  // type ==> gave or got
  console.log(request.body);
  const body = request.body;
  let { customer } = request.params;
  const amount = +body.amount;
  const date = new Date(body.date);
  const type = body.type;
  const paymentMethod = body.paymentMethod;

  try {
    const entry = {
      paymentMethod,
      customer,
      youGave: type === "gave" ? amount : 0,
      youGot: type === "got" ? amount : 0,
      date: isNaN(date.getTime()) ? new Date() : date,
    };

    await Entry.create(entry);
  } catch (error) {
    console.log(error.message);
  }
  return response.redirect(request.originalUrl);
};

module.exports = {
  khatabookSelectorHandler,
  customerSelectorPage,
  entryCreatorPage,
  createEntryHandler,
};
