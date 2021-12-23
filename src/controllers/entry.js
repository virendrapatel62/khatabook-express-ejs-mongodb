const { Khatabook } = require("../models");

const khatabookSelectorHandler = async (request, response) => {
  const user = request.session.user;
  const khatabooks = await Khatabook.find({ user: user._id }).select("title");
  const context = {
    request,
    khatabooks,
  };
  return response.render("pages/entries", context);
};

module.exports = { khatabookSelectorHandler };
