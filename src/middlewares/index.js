function userAuthMiddleware(request, response, next) {
  if (request.session?.user) {
    return next();
  }

  response.redirect("/login");
}

module.exports = { userAuthMiddleware };
