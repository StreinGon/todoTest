"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
const validatorsConstants_1 = require("@src/constants/validatorsConstants");
exports.addCategory = [
    check_1.query('categoryName')
        .custom(value => /^[a-zA-Z0-9]+$/.test(value))
        .withMessage(validatorsConstants_1.CATEGORY_MUST_CONTAIN),
];
exports.getCategory = [
    check_1.query('categoryName')
        .custom(value => /^[a-zA-Z0-9]+$/.test(value))
        .withMessage(validatorsConstants_1.CATEGORY_MUST_CONTAIN),
];
exports.addTodoToCategory = [
    check_1.query('categoryName')
        .custom(value => /^[a-zA-Z0-9]+$/.test(value))
        .withMessage(validatorsConstants_1.CATEGORY_MUST_CONTAIN),
    check_1.query('todoID')
        .custom((value) => {
        return !/\s/.test(value);
    })
        .withMessage(validatorsConstants_1.ID_MUST_CONTAIN),
    check_1.query('todoID')
        .isLength({ min: 24, max: 24 })
        .withMessage(validatorsConstants_1.MAX_LENGTH),
    check_1.query('todoID')
        .custom(value => /^[a-zA-Z0-9]+$/.test(value))
        .withMessage(validatorsConstants_1.ID_MUST_CONTAIN),
];
//# sourceMappingURL=categoryValidators.js.map