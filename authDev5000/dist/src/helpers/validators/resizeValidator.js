"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
const validatorsconstants_1 = require("@src/constants/validatorsconstants");
exports.resizeValidators = [
    check_1.query('width')
        .custom(value => /^[0-9]+$/.test(value))
        .withMessage(validatorsconstants_1.WIDTH),
    check_1.query('height')
        .custom(value => /^[0-9]+$/.test(value))
        .withMessage(validatorsconstants_1.HEIGHT),
];
//# sourceMappingURL=resizeValidator.js.map