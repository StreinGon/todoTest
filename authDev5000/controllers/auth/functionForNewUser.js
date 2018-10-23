const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator/check");

const roleServices = require("../../services/roleServices.js");
const customResponse = require("../../helpers/customResponse/customResponse");
const userServices = require("../../services/userServices.js");
const errorAfterValidation = require("../../helpers/errorChecker/errorAfterValidation");

const saltRounds = 10;

const functionForNewUser = (req, res) => {
  const errors = validationResult(req);
  let Errormsg = "";
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, Errormsg, res);
  }
  const newRole = roleServices.createRoleOfUser(0);
  const hash = bcrypt.hashSync(req.body.password, saltRounds);
  return newRole.save(function(err) {
    if (err) return handleError(err);
    return userServices
      .createNewUser(req.body.username, hash, req.body.mail, newRole._id)
      .then(() => customResponse(res, 200, "Registration succesfull"));
  });
};
module.exports = functionForNewUser;
