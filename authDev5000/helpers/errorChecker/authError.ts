
const authError = (error, request, response, next) => {
  if (error.status === 401) {
    return response.status(401).json({ message: 'Unauthorized' });
  }
  return next();
};
export { authError };
