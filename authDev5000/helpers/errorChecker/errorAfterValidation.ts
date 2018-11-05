const customResponse = require('../../helpers/customResponse/customResponse');

function errorAftervalidation(errors, Errormsg, res) {
  let ErrormsgTest = '';
  errors.array().forEach((mes) => {
    if (ErrormsgTest === '') {
      ErrormsgTest += mes.msg;
    } else {
      ErrormsgTest += `,  ${mes.msg}`;
    }
  });
  return customResponse(res, 422, ErrormsgTest);
}
export default errorAftervalidation;
