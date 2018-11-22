"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customResponse_1 = require("@src/helpers/customResponse/customResponse");
const constants = require("@src/constants/index");
exports.userCheck = (req, res) => {
    const currentUser = req.user;
    if (currentUser._id === null || currentUser._id === undefined) {
        return customResponse_1.customResponse(res, 401, constants.statusConstants.UNAUTHORIZED);
    }
};
//# sourceMappingURL=userCheck.js.map