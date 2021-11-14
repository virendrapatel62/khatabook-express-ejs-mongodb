const { User } = require("../models");
const passwordHash = require("password-hash");

const loginPagehandler = (request, response) => {
  response.render("pages/login");
};
const registerPageHandler = (request, response) => {
  response.render("pages/register");
};

const loginFormHandler = (request, response) => {
  console.log(request.body);
  const { email, password } = request.body;
  response.json("POST Request Handlers");
};

function validateUserRegistrationData(formValues) {
  const { name, email, password, password2, phone } = formValues;
  let errorMessage = null;
  if (!name || !name.trim()) {
    errorMessage = "Name is required";
  } else if (!email || !email.trim()) {
    errorMessage = "Email is required";
  } else if (
    !password ||
    !password.trim() ||
    !password2 ||
    !password2.trim() ||
    password.trim() !== password2.trim()
  ) {
    errorMessage = "password and password2 must be same.";
  } else if (!phone || !phone.trim()) {
    errorMessage = "Phone is required";
  }

  return {
    error: errorMessage,
    user: errorMessage
      ? null
      : {
          email: email.trim(),
          name: name.trim(),
          phone: phone.trim(),
          password: password.trim(),
        },
  };
}

const registerFormHandler = (request, response) => {
  console.log(request.body);
  const formValues = request.body;

  const { error, user } = validateUserRegistrationData(formValues);
  if (error) {
    const context = { error, formValues };
    return response.render("pages/register", context);
  }

  User.create({
    ...user,
    password: passwordHash.generate(user.password),
  })
    .then((user) => {
      response.redirect("/login");
    })
    .catch((error) => {
      const context = { error: error.message, formValues };
      return response.render("pages/register", context);
    });
};

module.exports = {
  loginPagehandler,
  registerPageHandler,
  registerFormHandler,
  loginFormHandler,
};
