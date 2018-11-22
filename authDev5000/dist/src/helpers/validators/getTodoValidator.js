"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
const validatorsConstants_1 = require("@src/constants/validatorsConstants");
exports.getTodoValidator = [
    check_1.query('id')
        .custom((value) => {
        return !/\s/.test(value);
    })
        .withMessage(validatorsConstants_1.ID_MUST_CONTAIN),
    check_1.query('id')
        .isLength({ min: 24, max: 25 })
        .withMessage(validatorsConstants_1.MAX_LENGTH),
    check_1.query('id')
        .custom(value => /^[a-zA-Z0-9]+$/.test(value))
        .withMessage(validatorsConstants_1.ID_MUST_CONTAIN),
];
//# sourceMappingURL=getTodoValidator.js.map