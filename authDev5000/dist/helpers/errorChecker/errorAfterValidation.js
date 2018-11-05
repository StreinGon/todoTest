"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customResponse = require('../../helpers/customResponse/customResponse');
function errorAftervalidation(errors, Errormsg, res) {
    let ErrormsgTest = '';
    errors.array().forEach((mes) => {
        if (ErrormsgTest === '') {
            ErrormsgTest += mes.msg;
        }
        else {
            ErrormsgTest += `,  ${mes.msg}`;
        }
    });
    return customResponse(res, 422, ErrormsgTest);
}
exports.default = errorAftervalidation;
//# sourceMappingURL=errorAfterValidation.js.map