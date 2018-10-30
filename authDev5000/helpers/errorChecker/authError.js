const authError = (error, request, response, next) => {
  if (error instanceof AuthenticationError && error.status === 401) {
    return response.status(401).json({ message: "Unauthorized" });
  }
  return next();
};
module.exports = authError;
