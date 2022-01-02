const { Khatabook, Customer } = require("../models");

const dashboardPageHandler = async (request, response) => {
  const loggedInUser = request.session?.user?._id;
  const khatabooks = await Khatabook.find({ user: loggedInUser });

  for (let khatabook of khatabooks) {
    const count = await Customer.countDocuments({ khatabook: khatabook.id });
    khatabook.customerCount = count;
  }

  const context = {
    request,
    khatabooks,
  };
  response.render("pages/dashboard", context);
};

module.exports = { dashboardPageHandler };
