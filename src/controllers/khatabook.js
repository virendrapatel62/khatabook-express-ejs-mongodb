const { Khatabook } = require("../models");

const serveKahatabookForm = (request, response) => {
  response.render("pages/new-khatabook", { request });
};

const createKhatabookHandler = (request, response) => {
  const { body } = request;
  const title = body?.title;
  const user = request.session?.user;
  // do validation
  Khatabook.create({
    title,
    user: user._id,
  })
    .then(() => {
      response.render("pages/new-khatabook", {
        request,
        successMessage: "Khatabook created",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  serveKahatabookForm,
  createKhatabookHandler,
};
