"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
const todoServices = require("@src/services/todoServices");
const validatorsConstants_1 = require("@src/constants/validatorsConstants");
exports.addTodoValidator = [
    check_1.body('investigation')
        .custom(value => /^[1-9]+$/.test(value))
        .withMessage(validatorsConstants_1.INVESTIGATION_INTEGER),
    check_1.body('priority')
        .custom(value => /^[0-2]$/.test(value))
        .withMessage(validatorsConstants_1.PRIORITY_ONLY),
    check_1.body('title')
        .isLength({ min: 5 })
        .withMessage(validatorsConstants_1.TITLE_MUST_BE),
    check_1.body('title')
        .custom(value => !/\s/.test(value))
        .withMessage(validatorsConstants_1.TITLE_NO_SPACES),
    check_1.body('title')
        .custom(value => /^[a-zA-Z]+$/.test(value))
        .withMessage(validatorsConstants_1.SPECIAL_SIMBOLS_IN_TITLE),
    check_1.body('description')
        .custom(value => /^[a-zA-Z]+$/.test(value))
        .withMessage(validatorsConstants_1.DESCRIPTION.NO_SPECIAL),
    check_1.body('description')
        .isLength({ min: 5 })
        .withMessage(validatorsConstants_1.DESCRIPTION.MIN),
];
exports.checkForExistingTitle = check_1.body('title')
    .custom((value) => {
    return todoServices.find({ todoName: value })
        .then((task) => {
        if (task && task.length !== 0) {
            return Promise.reject(new Error('Task with your title is already being performed'));
        }
        return true;
    });
});
exports.checkForExistingDescription = [check_1.body('description')
        .custom((value) => {
        return todoServices.find({ task: value })
            .then((todo) => {
            if (todo && todo.length !== 0) {
                return Promise.reject(new Error('Task with your description is already being performed'));
            }
            return true;
        });
    }),
];
//# sourceMappingURL=addTodoValidators.js.map