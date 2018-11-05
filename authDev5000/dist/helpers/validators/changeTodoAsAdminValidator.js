"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { query } = require('express-validator/check');
const changeTodoAsAdminValidator = [
    query('idUser')
        .custom(value => !/\s/.test(value))
        .withMessage('id must contain only numbers and latin chars'),
    query('idUser')
        .isLength({ min: 24, max: 24 })
        .withMessage('Length of id must be 24 chars'),
    query('idUser')
        .custom(value => /^[a-zA-Z0-9]+$/.test(value))
        .withMessage('id must contain only numbers and latin chars'),
    query('idTodo')
        .custom(value => !/\s/.test(value))
        .withMessage('id must contain only numbers and latin chars'),
    query('idTodo')
        .isLength({ min: 24, max: 24 })
        .withMessage('Length of id must be 24 chars'),
    query('idTodo')
        .custom(value => /^[a-zA-Z0-9]+$/.test(value))
        .withMessage('id must contain only numbers and latin chars'),
];
exports.default = changeTodoAsAdminValidator;
//# sourceMappingURL=changeTodoAsAdminValidator.js.map