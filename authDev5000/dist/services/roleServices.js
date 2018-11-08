"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { RoleModel } = require('../models/role');
function createRoleOfUser(rights) {
    return new RoleModel({
        rights,
        _id: new mongoose_1.default.Types.ObjectId(),
    });
}
exports.createRoleOfUser = createRoleOfUser;
//# sourceMappingURL=roleServices.js.map