const customResponse = require("../customResponse/customResponse");
const userCheck = (req, res) => {
  const currentUser = req.user;
  if (currentUser._id === null || currentUser._id === undefined) {
    return customResponse(res, 401, constants.statusConstants.UNAUTHORIZED);
  }
};
module.exports = userCheck;
