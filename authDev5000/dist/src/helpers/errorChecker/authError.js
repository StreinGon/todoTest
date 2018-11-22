"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customResponse_1 = require("@src/helpers/customResponse/customResponse");
const statusCodeConstants_1 = require("@src/constants/statusCodeConstants");
exports.authError = (error, request, response, next) => {
    if (error.status === 401) {
        return customResponse_1.customResponse(response, 401, statusCodeConstants_1.UNAUTHORIZED);
    }
    return next();
};
//# sourceMappingURL=authError.js.map