"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { RoleModel } = require('../models/role');
function createRoleOfUser(rights) {
    return new RoleModel({
        rights,
    });
}
exports.createRoleOfUser = createRoleOfUser;
//# sourceMappingURL=roleServices.js.map