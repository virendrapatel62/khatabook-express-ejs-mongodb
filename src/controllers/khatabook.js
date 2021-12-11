const { Khatabook } = require("../models");

const khatabookPageHandler = async (request, response) => {
  console.log(request.errorMessage);
  const loggedInUser = request.session?.user?._id;
  const khatabooks = await Khatabook.find({ user: loggedInUser });
  response.render("pages/khatabook", { request, khatabooks });
};

const khatabookFormhandler = (request, response) => {
  const { body } = request;
  const title = body?.title;
  const user = request.session?.user;
  // do validation
  Khatabook.create({
    title,
    user: user._id,
  })
    .then(() => {
      request.errorMessage = "Hello World..";
      response.redirect("/khatabook");
    })
    .catch((err) => {
      console.log(err);
    });
};

const khatabookDeleteHandler = (request, response) => {
  const khatabook = request.body.khatabook;

  Khatabook.deleteOne({ _id: khatabook }).then(() => {
    response.redirect("/khatabook");
  });
};

module.exports = {
  khatabookFormhandler,
  khatabookPageHandler,
  khatabookDeleteHandler,
};
