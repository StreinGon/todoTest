const { validationResult } = require("express-validator/check");

const customResponse = require("../../helpers/customResponse/customResponse");
const errorAfterValidation = require("../../helpers/errorChecker/errorAfterValidation");
const userServices = require("../../services/userServices.js");
const imageServices = require("../../services/imageServices.js");
const constants = require("../../constants");

const getUser = (req, res) => {
  const errors = validationResult(req);
  const Errormsg = "";
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, Errormsg, res);
  }
  const { id } = req.query;
  const check = userServices.getUser(req.user._id, id);
  return check.then(user => {
    if (!user || user.length < 1) {
      return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
    }
    return imageServices.find({ _id: user.avatar }).then(image => {
      return customResponse(res, 200, constants.statusConstants.TODO_SENDED, {
        user,
        image
      });
    });
  });
};
module.exports = { getUser };
