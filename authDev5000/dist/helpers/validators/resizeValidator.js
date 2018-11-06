"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { query } = require('express-validator/check');
const resizeValidators = [
    query('width')
        .custom(value => /^[0-9]+$/.test(value))
        .withMessage('width must contain only numbers'),
    query('height')
        .custom(value => /^[0-9]+$/.test(value))
        .withMessage('height must contain only numbers'),
];
exports.resizeValidators = resizeValidators;
//# sourceMappingURL=resizeValidator.js.map