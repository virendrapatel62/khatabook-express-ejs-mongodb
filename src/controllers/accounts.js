const loginPagehandler = (request, response) => {
  response.render("pages/login");
};
const registerPageHandler = (request, response) => {
  response.render("pages/register");
};

const registerFormHandler = (request, response) => {
  console.log(request.body);
  response.redirect("/login");
};

module.exports = {
  loginPagehandler,
  registerPageHandler,
  registerFormHandler,
};
