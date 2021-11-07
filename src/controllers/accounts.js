const loginPagehandler = (request, response) => {
  response.render("pages/login");
};
const registerPageHandler = (request, response) => {
  response.render("pages/register");
};

module.exports = {
  loginPagehandler,
  registerPageHandler,
};
