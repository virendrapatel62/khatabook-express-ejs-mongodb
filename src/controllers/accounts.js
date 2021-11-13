const loginPagehandler = (request, response) => {
  response.render("pages/login");
};
const registerPageHandler = (request, response) => {
  response.render("pages/register");
};

const registerFormHandler = (request, response) => {
  console.log(request.body);
  let errorMessage = null;
  const { name, email, password, password2, phone } = request.body;
  console.log({ name, email, password, password2, phone });

  if (
    !password ||
    !password.trim() ||
    !password2 ||
    !password2.trim() ||
    password.trim() !== password2.trim()
  ) {
    errorMessage = "password and password2 must be same.";
  }

  if (errorMessage) {
    response.render("pages/register", { errorMessage });
  }

  response.redirect("/login");
};

module.exports = {
  loginPagehandler,
  registerPageHandler,
  registerFormHandler,
};
