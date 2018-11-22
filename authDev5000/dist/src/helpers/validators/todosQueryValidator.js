"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
const validatorsconstants_1 = require("@src/constants/validatorsconstants");
exports.todosQueryValidator = [
    check_1.query('amount')
        .optional()
        .isNumeric()
        .withMessage(validatorsconstants_1.AMOUNT.numeric),
    check_1.query('amount')
        .optional()
        .custom(value => value > 0)
        .withMessage(validatorsconstants_1.AMOUNT.positive),
    check_1.query('startFrom')
        .optional()
        .custom(value => value > 0)
        .withMessage(validatorsconstants_1.START_FROM.positive),
    check_1.query('startFrom')
        .optional()
        .isNumeric()
        .withMessage(validatorsconstants_1.START_FROM.numeric),
];
//# sourceMappingURL=todosQueryValidator.js.map