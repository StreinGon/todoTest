"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharp = require('sharp');
const { validationResult } = require('express-validator/check');
const fs = require('mz/fs');
const path = require('path');
const nodezip = require('node-zip');
const zip = new nodezip();
const { errorAftervalidation } = require('../../helpers/errorChecker/errorAfterValidation');
const { customResponse } = require('../../helpers/customResponse/customResponse');
const todoServices = require("../../services/todoServices");
const imageServices = require("../../services/imageServices");
const constants = require('../../constants');
const downloadAllAssets = (req, res) => {
    const array = [];
    return fs.readdir('public/uploads').then((items) => {
        items.forEach((file) => {
            const promiseTest = fs
                .readFile(path.join('public/uploads', String(file)))
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
exports.downloadAllAssets = downloadAllAssets;
const getImage = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorAftervalidation(errors, res);
    }
    const index = req.url.indexOf('?');
    const imageName = req.url.slice(1, index);
    const height = parseInt(req.query.height, 10);
    const width = parseInt(req.query.width, 10);
    return sharp(`${constants.otherConstants.UPLOADS}${imageName}`)
        .resize(width, height)
        .toBuffer()
        .then((data) => {
        return res.end(data, 'binary');
    })
        .catch((error) => { return customResponse(res, 422, "Image name Error", error); });
};
exports.getImage = getImage;
const addImage = (req, res) => {
    const { id: idTodo } = req.query;
    if (!idTodo) {
        return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
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
            return customResponse(res, 200, constants.statusConstants.TODO_UPDATED, todo);
        }
        return customResponse(res, 422, 'Add image error,check your files or id of todo');
    })
        .catch((err) => {
        if (err)
            return err;
    });
};
exports.addImage = addImage;
//# sourceMappingURL=imageController.js.map