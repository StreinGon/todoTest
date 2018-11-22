"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
const todoServices = require("@src/services/todoServices");
const customResponse_1 = require("@src/helpers/customResponse/customResponse");
const loggerMessage_1 = require("@src/helpers/loggerMessage");
const userCheck_1 = require("@src/helpers/userCheck/userCheck");
const errorAfterValidation_1 = require("@src/helpers/errorChecker/errorAfterValidation");
const statusCodeConstants_1 = require("@src/constants/statusCodeConstants");
exports.getTodolist = (req, res) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.VALIDATION_ERRORS);
        return errorAfterValidation_1.errorAftervalidation(errors, res);
    }
    userCheck_1.userCheck(req, res);
    const currentUser = req.user;
    const { startFrom } = req.query;
    const { amount } = req.query;
    const { sortType } = req.query;
    const amountInt = parseInt(amount, 10);
    const startFromInt = parseInt(startFrom, 10);
    const { sortDirection } = req.query;
    const sortParametr = `${sortDirection === 'descending' ? '-' : ''}${sortType}`;
    return todoServices
        .find({ todoOwner: currentUser._id })
        .skip(startFromInt)
        .limit(amountInt)
        .populate('priority')
        .sort(sortParametr)
        .exec((err, todo) => {
        loggerMessage_1.loggerMessage(req, null, null);
        if (!amount || !startFrom) {
            return customResponse_1.customResponse(res, 200, statusCodeConstants_1.TODOLIST, {
                todoList: todo,
            });
        }
        return customResponse_1.customResponse(res, 200, statusCodeConstants_1.TODOLIST, {
            todoList: todo,
            countAlltodo: todo.length,
            startFrom: startFromInt,
            amount: amountInt,
        });
    });
};
//# sourceMappingURL=todosController.js.map