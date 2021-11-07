const homepageHandler = (request, response) => {
  response.render("pages/index");
};

module.exports = { homepageHandler };
