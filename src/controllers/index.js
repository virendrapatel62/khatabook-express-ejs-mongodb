const homepageHandler = (request, response) => {
  console.log(request.session);
  response.render("pages/index", { request });
};

module.exports = { homepageHandler };
