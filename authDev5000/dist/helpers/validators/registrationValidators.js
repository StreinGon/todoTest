"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { body } = require('express-validator/check');
const { check } = require('express-validator/check');
const userServices = require("../../services/userServices");
const registrationValidator = [
    check('mail')
        .isEmail()
        .withMessage('Incorrect mail'),
    check('mail')
        .custom(value => !/^[а-яА-Я]+$/.test(value))
        .withMessage('Only latin chars'),
    check('username')
        .custom(value => !/\s/.test(value))
        .withMessage('No spaces are allowed in the username'),
    check('username')
        .custom(value => /^[a-zA-Z]+$/.test(value))
        .withMessage('No special simbols are allowed in the username,Only latin chars'),
    check('username')
        .isLength({ min: 5 })
        .withMessage('Username must be at least 5 chars long'),
    check('password')
        .custom(value => !/\s/.test(value))
        .withMessage('No spaces are allowed in the password'),
    check('password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 chars long'),
];
exports.registrationValidator = registrationValidator;
const checkForExistingEmail = body('mail').custom((value) => {
    return userServices.find({ mail: value }).then((user) => {
        if (user) {
            return Promise.reject(new Error('E-mail already in use'));
        }
        return Promise.resolve(true);
    });
});
exports.checkForExistingEmail = checkForExistingEmail;
//# sourceMappingURL=registrationValidators.js.map