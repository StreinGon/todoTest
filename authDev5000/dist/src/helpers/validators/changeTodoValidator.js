"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
const validatorsConstants_1 = require("@src/constants/validatorsConstants");
const otherConstants_1 = require("@src/constants/otherConstants");
exports.changeTodoValidator = [
    check_1.query('id')
        .custom(value => !/\s/.test(value))
        .withMessage(validatorsConstants_1.ID_MUST_CONTAIN),
    check_1.query('id')
        .isLength({ min: 24, max: 25 })
        .withMessage(validatorsConstants_1.MAX_LENGTH),
    check_1.query('id')
        .custom(value => /^[a-zA-Z0-9]+$/.test(value))
        .withMessage(validatorsConstants_1.ID_MUST_CONTAIN),
    check_1.body('onFact')
        .optional()
        .custom(value => /^[1-9]+$/.test(value))
        .withMessage(validatorsConstants_1.ONFACT_MUST_BE),
    check_1.body('title')
        .optional()
        .isLength({ min: 5 })
        .withMessage(validatorsConstants_1.TITLE_MUST_BE),
    check_1.body('title')
        .optional()
        .custom(value => !/\s/.test(value))
        .withMessage(validatorsConstants_1.TITLE_NO_SPACES),
    check_1.body('title')
        .optional()
        .custom(value => /^[a-zA-Z]+$/.test(value))
        .withMessage(validatorsConstants_1.SPECIAL_SIMBOLS_IN_TITLE),
    check_1.body('description')
        .optional()
        .custom(value => /^[a-zA-Z0-9]+$/.test(value))
        .withMessage(validatorsConstants_1.DESCRIPTION.NO_SPECIAL),
    check_1.body('description')
        .optional()
        .isLength({ min: 5 })
        .withMessage(validatorsConstants_1.DESCRIPTION.MIN),
    check_1.body('status')
        .optional()
        .custom((value) => {
        return value === otherConstants_1.TODO.status.started ||
            value === otherConstants_1.TODO.status.ended ||
            value === otherConstants_1.TODO.status.blocked;
    })
        .withMessage(validatorsConstants_1.STATUS_MUST_BE),
    check_1.body('success')
        .optional()
        .custom(value => value === 'true' || value === 'false')
        .withMessage(validatorsConstants_1.STATUS_MUST_BE),
    check_1.body('priority')
        .optional()
        .custom(value => /^[0-2]$/.test(value))
        .withMessage(validatorsConstants_1.PRIORITY_ONLY),
];
//# sourceMappingURL=changeTodoValidator.js.map