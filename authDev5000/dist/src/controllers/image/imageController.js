"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = require("sharp");
const check_1 = require("express-validator/check");
const fs_1 = require("mz/fs");
const path_1 = require("path");
const nodezip = require("node-zip");
const errorAfterValidation_1 = require("@src/helpers/errorChecker/errorAfterValidation");
const customResponse_1 = require("@src/helpers/customResponse/customResponse");
const loggerMessage_1 = require("@src/helpers/loggerMessage");
const todoServices = require("@src/services/todoServices");
const imageServices = require("@src/services/imageServices");
const constants = require("@src/constants/index");
const otherConstants_1 = require("@src/constants/otherConstants");
const statusCodeConstants_1 = require("@src/constants/statusCodeConstants");
const zip = new nodezip();
exports.downloadAllAssets = (req, res) => {
    const array = [];
    return fs_1.default.readdir(otherConstants_1.UPLOADS).then((items) => {
        items.forEach((file) => {
            const promiseTest = fs_1.default
                .readFile(path_1.default.join(otherConstants_1.UPLOADS, String(file)))
                .then((data) => {
                zip.file(`${String(file)}.png`, data);
            });
            array.push(promiseTest);
        });
        return Promise.all(array).then(() => {
            const data = zip.generate({ base64: false, compression: 'DEFLATE' });
            return res.end(data, 'binary');
        });
    }).catch((err) => err);
};
exports.getImage = (req, res) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.VALIDATION_ERRORS);
        return errorAfterValidation_1.errorAftervalidation(errors, res);
    }
    const index = req.url.indexOf('?');
    const imageName = req.url.slice(1, index);
    const height = parseInt(req.query.height, 10);
    const width = parseInt(req.query.width, 10);
    return sharp_1.default(`${constants.otherConstants.UPLOADS}${imageName}`)
        .resize(width, height)
        .toBuffer()
        .then((data) => {
        loggerMessage_1.loggerMessage(req, null, null);
        return res.end(data, 'binary');
    })
        .catch((error) => {
        loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.IMAGE_NAME_ERROR);
        return customResponse_1.customResponse(res, 422, statusCodeConstants_1.IMAGE_NAME_ERROR, error);
    });
};
exports.addImage = (req, res) => {
    const { id: idTodo } = req.query;
    if (!idTodo) {
        loggerMessage_1.loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
        return customResponse_1.customResponse(res, 422, constants.statusConstants.NOT_FOUND);
    }
    return todoServices
        .find({ _id: idTodo })
        .then((todo) => {
        if (req.files && todo.length >= 1) {
            req.files.forEach((file) => {
                const photo = imageServices.createImage({
                    name: file.filename,
                    destination: file.destination,
                    originalname: file.originalname,
                    url: `${req.headers.host}/image/${file.filename}`,
                });
                todo[0].image.push(photo._id);
                photo.save();
            });
            todo[0].save();
            loggerMessage_1.loggerMessage(req, todo, null);
            return customResponse_1.customResponse(res, 200, constants.statusConstants.TODO_UPDATED, todo);
        }
        loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.ADD_IMAGE_ERROR);
        return customResponse_1.customResponse(res, 422, statusCodeConstants_1.ADD_IMAGE_ERROR);
    })
        .catch((err) => {
        if (err)
            return err;
    });
};
//# sourceMappingURL=imageController.js.map