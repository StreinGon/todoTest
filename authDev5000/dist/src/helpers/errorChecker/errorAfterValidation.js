"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customResponse_1 = require("@src/helpers/customResponse/customResponse");
function errorAftervalidation(errors, res) {
    let errorMsgTest = '';
    errors.array().forEach((mes) => {
        if (errorMsgTest === '') {
            errorMsgTest += mes.msg;
        }
        else {
            errorMsgTest += `,  ${mes.msg}`;
        }
    });
    return customResponse_1.customResponse(res, 422, errorMsgTest);
}
exports.errorAftervalidation = errorAftervalidation;
//# sourceMappingURL=errorAfterValidation.js.map