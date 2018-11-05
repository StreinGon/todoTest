"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const Rolemodel = require('../models/role');
function createRoleOfUser(rights) {
    return new Rolemodel({
        rights,
        _id: new mongoose.Types.ObjectId(),
    });
}
exports.default = createRoleOfUser;
//# sourceMappingURL=roleServices.js.map