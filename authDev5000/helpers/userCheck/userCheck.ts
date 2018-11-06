const customResponse = require('../customResponse/customResponse');
const constants = require('../../constants');

const userCheck = (req, res) => {
  const currentUser = req.user;
  if (currentUser._id === null || currentUser._id === undefined) {
    return customResponse(res, 401, constants.statusConstants.UNAUTHORIZED);
  }
};
export { userCheck };
