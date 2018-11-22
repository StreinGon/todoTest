"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customResponse_1 = require("@src/helpers/customResponse/customResponse");
const statusCodeConstants_1 = require("@src/constants/statusCodeConstants");
exports.jsonError = (error, request, response, next) => {
    if (error instanceof SyntaxError) {
        return customResponse_1.customResponse(response, 400, statusCodeConstants_1.INVALID_JSON);
    }
    return next();
};
//# sourceMappingURL=JSONerror.js.map