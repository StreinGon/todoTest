"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const { RoleModel } = require('../typegoouseClasses/role');
function createRoleOfUser(rights) {
    return new RoleModel({
        rights,
        _id: new mongoose.Types.ObjectId(),
    });
}
exports.createRoleOfUser = createRoleOfUser;
//# sourceMappingURL=roleServices.js.map