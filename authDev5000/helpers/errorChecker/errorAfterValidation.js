const customResponse = require("../../helpers/customResponse/customResponse");

function errorAftervalidation(errors, Errormsg, res) {
  errors.array().forEach(mes => {
    if (Errormsg == "") {
      Errormsg += mes.msg;
    } else {
      Errormsg += "," + mes.msg;
    }
  });
  return customResponse(res, 422, Errormsg);
}
module.exports = errorAftervalidation;
