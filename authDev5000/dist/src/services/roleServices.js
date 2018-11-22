"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const role_1 = require("@src/models/role");
function createRoleOfUser(rights) {
    return new role_1.RoleModel({
        rights,
    });
}
exports.createRoleOfUser = createRoleOfUser;
//# sourceMappingURL=roleServices.js.map