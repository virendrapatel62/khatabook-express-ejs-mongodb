const { Khatabook, Customer, Entry } = require("../models");

const dashboardPageHandler = async (request, response) => {
  const loggedInUser = request.session?.user?._id;
  const khatabooks = await Khatabook.find({ user: loggedInUser });

  for (let khatabook of khatabooks) {
    const count = await Customer.countDocuments({ khatabook: khatabook.id });
    khatabook.customerCount = count;

    // cal calculate total get and give
    const customers = await Customer.find({ khatabook: khatabook })
      .select("id")
      .then((customers) => customers.map((customer) => customer._id));

    console.log(customers);

    const gaveGotSummary = await Entry.aggregate()
      .match({ customer: { $in: customers } })
      .group({
        _id: "$customer",
        totalGave: { $sum: "$youGave" },
        totalGot: { $sum: "$youGot" },
      })
      .then((result) =>
        result.reduce(
          (acc, item) => {
            acc.totalGave += item.totalGave;
            acc.totalGot += item.totalGot;
            return acc;
          },
          { totalGave: 0, totalGot: 0 }
        )
      );

    const { totalGave, totalGot } = gaveGotSummary;
    if (totalGave > totalGot) {
      khatabook.youWillGive = 0;
      khatabook.youWillGet = totalGave - totalGot;
    } else if (totalGave < totalGot) {
      khatabook.youWillGet = 0;
      khatabook.youWillGive = totalGot - totalGave;
    } else {
      khatabook.youWillGet = 0;
      khatabook.youWillGive = 0;
    }
  }

  const context = {
    request,
    khatabooks,
  };
  response.render("pages/dashboard", context);
};

module.exports = { dashboardPageHandler };
