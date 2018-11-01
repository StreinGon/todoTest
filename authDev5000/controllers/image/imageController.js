const sharp = require("sharp");
const { validationResult } = require("express-validator/check");
const fs = require("mz/fs");
const path = require("path");
const zip = new require("node-zip")();

const errorAfterValidation = require("../../helpers/errorChecker/errorAfterValidation");
const customResponse = require("../../helpers/customResponse/customResponse");
const todoServices = require("../../services/todoServices.js");
const imageServices = require("../../services/imageServices.js");
const constants = require("../../constants");

const downloadAllAssets = (req, res, next) => {
  fs.readdir("public/uploads").then(items => {
    items.forEach(file => {
      zip.file(
        `${String(file)}.png`,
        fs.readFileSync(path.join("public/uploads", String(file)))
      );
    });
    const data = zip.generate({ base64: false, compression: "DEFLATE" });
    res.end(data, "binary");
  });
};

const getImage = (req, res, next) => {
  const errors = validationResult(req);
  const Errormsg = "";
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, Errormsg, res);
  }
  const { imageName } = req.query.imageName;
  const height = parseInt(req.query.height);
  const width = parseInt(req.query.width);
  return sharp(`${constants.otherConstants.UPLOADS}${imageName}`)
    .resize(width, height)
    .toBuffer()
    .then(data => {
      return res.end(data, "binary");
    })
    .catch(err => err);
};
const addImage = (req, res) => {
  const { id: idTodo } = req.query;
  if (!idTodo) {
    return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
  }

  return todoServices
    .find({ _id: idTodo })
    .then(todo => {
      if (req.files && todo.length >= 1) {
        req.files.forEach(file => {
          const photo = imageServices.createImage({
            name: file.filename,
            destination: file.destination,
            originalname: file.originalname,
            url: `${req.headers.host}/image/${file.filename}`
          });

          todo[0].image.push(photo._id);
          photo.save();
        });
        todo[0].save();
        return customResponse(
          res,
          200,
          constants.statusConstants.TODO_UPDATED,
          todo
        );
      }
      return customResponse(
        res,
        422,
        "Add image error,check your files or id of todo"
      );
    })
    .catch(err => {
      if (err) return err;
    });
};
module.exports = { addImage, getImage, downloadAllAssets };
