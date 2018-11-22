"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
const validatorsConstants_1 = require("@src/constants/validatorsConstants");
exports.changeTodoAsAdminValidator = [
    check_1.query('idUser')
        .custom(value => !/\s/.test(value))
        .withMessage(validatorsConstants_1.ID_MUST_CONTAIN),
    check_1.query('idUser')
        .isLength({ min: 24, max: 25 })
        .withMessage(validatorsConstants_1.MAX_LENGTH),
    check_1.query('idUser')
        .custom(value => /^[a-zA-Z0-9]+$/.test(value))
        .withMessage(validatorsConstants_1.ID_MUST_CONTAIN),
    check_1.query('idTodo')
        .custom(value => !/\s/.test(value))
        .withMessage(validatorsConstants_1.ID_MUST_CONTAIN),
    check_1.query('idTodo')
        .isLength({ min: 24, max: 25 })
        .withMessage(validatorsConstants_1.MAX_LENGTH),
    check_1.query('idTodo')
        .custom(value => /^[a-zA-Z0-9]+$/.test(value))
        .withMessage(validatorsConstants_1.ID_MUST_CONTAIN),
];
//# sourceMappingURL=changeTodoAsAdminValidator.js.map