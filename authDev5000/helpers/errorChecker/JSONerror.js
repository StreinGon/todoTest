const JSONerrorChecker = (error, request, response, next) => {
  if (error instanceof SyntaxError && error.status === 400) {
    return response.status(400).json({ message: "Invalid json" });
  }
  return next();
};
module.exports = JSONerrorChecker;
