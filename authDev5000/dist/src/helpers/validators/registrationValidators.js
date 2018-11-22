"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
const userServices = require("@src/services/userServices");
const validatorsConstants_1 = require("@src/constants/validatorsConstants");
exports.registrationValidator = [
    check_1.check('mail')
        .isEmail()
        .withMessage(validatorsConstants_1.MAIL.INCORRECT),
    check_1.check('mail')
        .custom(value => !/^[а-яА-Я]+$/.test(value))
        .withMessage(validatorsConstants_1.MAIL.LATIN),
    check_1.check('username')
        .custom(value => !/\s/.test(value))
        .withMessage(validatorsConstants_1.USERNAME.NO_SPACES),
    check_1.check('username')
        .custom(value => /^[a-zA-Z]+$/.test(value))
        .withMessage(validatorsConstants_1.USERNAME.NO_SPECIAL),
    check_1.check('username')
        .isLength({ min: 5 })
        .withMessage(validatorsConstants_1.USERNAME.MIN),
    check_1.check('password')
        .custom(value => !/\s/.test(value))
        .withMessage(validatorsConstants_1.PASSWORD.NO_SPACES),
    check_1.check('password')
        .isLength({ min: 5 })
        .withMessage(validatorsConstants_1.PASSWORD.MIN),
];
exports.checkForExistingEmail = check_1.body('mail')
    .custom((value) => {
    return userServices.find({ mail: value }).then((user) => {
        if (user) {
            return Promise.reject(new Error(validatorsConstants_1.MAIL.ALREADY_IN_USE));
        }
        return Promise.resolve(true);
    });
});
//# sourceMappingURL=registrationValidators.js.map